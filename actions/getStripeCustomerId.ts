import prisma from "@/config/Prisma"

export const getStripeCustormerId= async(userId:string) =>{

      try {

            const stripeCustomer = await prisma.stripeCustomer.findUnique({
                  where:{
                        userId:userId
                  }
            })
            return stripeCustomer?.StripeCustomerId || null
      } catch (error) {
            console.log(error)
            return null
            
      }
}