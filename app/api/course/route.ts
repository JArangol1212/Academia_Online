import prisma from "@/config/Prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { courseName, slug } = await req.json();

    // Verificar si el slug ya existe
    const existing = await prisma.course.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json({ error: "El slug ya existe" }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        userId,
        title: courseName,
        slug,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
