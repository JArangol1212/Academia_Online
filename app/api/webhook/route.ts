import prisma from "@/config/Prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil" // ✅ CORREGIDO: Versión válida
})

export async function POST(req: Request) {
  try {
    // Extrae el cuerpo de la petición como texto
    const body = await req.text()
    const headerList = await headers()
    const signature = headerList.get("stripe-signature") as string

    let event: Stripe.Event

    // Valida que la petición realmente venga de Stripe
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (error) {
      console.log("Webhook signature verification failed:", error)
      return new NextResponse("Webhook Error: Invalid signature", { status: 400 })
    }

    // Solo procesar eventos de checkout completado
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      
      const userId = session?.metadata?.userId
      const courseId = session?.metadata?.courseId
      const coursePrice = session?.metadata?.price

      // Validar que todos los metadatos necesarios estén presentes
      if (!userId || !courseId || !coursePrice) {
        console.log("Missing metadata:", { userId, courseId, coursePrice })
        return new NextResponse("Webhook Error: Missing metadata", {
          status: 400
        })
      }

      const price = coursePrice ? Number(coursePrice.replace(",", ".")) : 0

      try {
        // Verificar si ya existe la compra
        const existingPurchase = await prisma.purchase.findUnique({
          where: {
            userId_courseId: {
              userId: userId as string,
              courseId: courseId as string, // ✅ CORREGIDO: Era userId antes
            }
          }
        })

        // Si no existe, crear la compra
        if (!existingPurchase) {
          await prisma.purchase.create({
            data: {
              userId: userId as string,
              courseId: courseId as string, // ✅ CORREGIDO: Era userId antes
              price: price
            }
          })
          
          console.log(`Purchase created for user ${userId} and course ${courseId}`)
        } else {
          console.log(`Purchase already exists for user ${userId} and course ${courseId}`)
        }

      } catch (error) {
        console.error("Database error:", error)
        return new NextResponse("Database Error", { status: 500 })
      }
    }

    return new NextResponse(null, { status: 200 })

  } catch (error) {
    console.error("Webhook error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
/*Resumen
---------
Recibe notificaciones de Stripe sobre pagos completados
Registra la compra en tu base de datos prisma
Evita duplicados verificando compras existentes
Da acceso al usuario al curso que compro
 */  

