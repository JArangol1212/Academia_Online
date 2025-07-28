import prisma from "@/config/Prisma";
import { clerkClient } from "@clerk/nextjs/server";



export async function getLastPurchases(limit:number=10){

      const purchase = await prisma.purchase.findMany({

            orderBy:{createdAt:"desc"},
            take:limit,
            include:{
                  course:{
                        select:{
                              title:true,
                              slug:true,
                              imageUrl:true,
                              price:true
                        }
                  }
            }
      })

  const clerk = await clerkClient()
  const purchasesWithEmails = await Promise.all(purchase.map(async(purchase)=>{
      const user = await clerk.users.getUser(purchase.userId)
      return{

            ...purchase,
            userEmail: user.emailAddresses[0].emailAddress || "No email"
      }

  }))
  return purchasesWithEmails

}