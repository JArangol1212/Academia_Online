import Stripe from "stripe"

if(!process.env.STRIPE_SECRET_KEY){
      throw new Error("No se ha difinido el Stripe secret key")
}

export const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY!,{
 apiVersion:"2025-05-28.basil",
 typescript:true
})