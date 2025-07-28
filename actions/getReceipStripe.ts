import Stripe from "stripe"
import { getStripeCustormerId } from "./getStripeCustomerId"




const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-05-28.basil"
})

export const getUserReceipts = async (userId: string) => {

      try {
            const stripeCustomerId = await getStripeCustormerId(userId)

            if (!stripeCustomerId) {
                  throw new Error("No se ha encontrado el customerId")
            }

            const paymentsIntents = await stripe.paymentIntents.list({
                  customer: stripeCustomerId,
                  limit: 10
            })

            const receipts = await Promise.all(
                  paymentsIntents.data.map(async (paymentsIntents) => {
                        let receiptUrl = null;
                        if (typeof paymentsIntents.latest_charge === "string") {
                              const charge = await stripe.charges.retrieve(
                                    paymentsIntents.latest_charge
                              );
                              receiptUrl = charge.receipt_url || null;
                        }
                        return {
                              paymentIntentId: paymentsIntents.id, // <- corregido aquí
                              receiptUrl
                        };
                  })
            )
            return receipts
      } catch (error) {
            console.log(error)
            return []

      }


}