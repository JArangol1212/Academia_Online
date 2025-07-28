import prisma from "@/config/Prisma";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { userId } = await auth();
  const { courseId } = await params;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await currentUser();

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      include: {
        chapters: {
          where: {
            isPublished: true, // Solo capítulos publicados
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    if (!course.chapters || course.chapters.length === 0) {
      return new NextResponse("Course has no published chapters", { status: 400 });
    }

    // Validar que el curso tenga slug
    if (!course.slug) {
      return new NextResponse("Course slug is missing", { status: 400 });
    }

    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already Purchased", { status: 400 });
    }

    const priceCourse = course.price
      ? Number(course.price.replace(",", "."))
      : 0;

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
          },
          unit_amount: Math.round(priceCourse * 100),
        },
      },
    ];

    let stripeCustomer = await prisma.stripeCustomer.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user?.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await prisma.stripeCustomer.create({
        data: {
          userId: userId,
          StripeCustomerId: customer.id,
        },
      });
    }

    // Validar APP_URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      return new NextResponse("APP_URL is not configured", { status: 500 });
    }

    // Construir URLs de forma segura
    const baseUrl = appUrl.endsWith('/') ? appUrl.slice(0, -1) : appUrl;
    const firstChapterId = course.chapters[0].id;
    
    // Codificar el slug para manejar espacios y caracteres especiales
    const encodedSlug = encodeURIComponent(course.slug);
    
    const successUrl = `${baseUrl}/courses/${encodedSlug}/${firstChapterId}?success=1`;
    const cancelUrl = `${baseUrl}/courses/${encodedSlug}?cancelled=1`;

    // Debug - log para verificar las URLs
    console.log("Success URL:", successUrl);
    console.log("Cancel URL:", cancelUrl);

    // Validar que las URLs sean válidas antes de enviarlas a Stripe
    try {
      new URL(successUrl);
      new URL(cancelUrl);
    } catch {
      console.error("Invalid URL generated:", { successUrl, cancelUrl });
      return new NextResponse("Invalid URLs generated", { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.StripeCustomerId,
      line_items,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        courseId: course.id,
        userId: userId,
        price: course.price ? course.price.toString() : "0",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[COURSE_CHECKOUT]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}