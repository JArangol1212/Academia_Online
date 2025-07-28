import prisma from "@/config/Prisma"

export const getIsPurchasedCourse = async(userId:string, courseId:string):Promise<boolean> =>{

      try {

            const purchase = await prisma.purchase.findFirst({
                  where:{
                        userId,
                        courseId
                  }
            })
            return !!purchase
            
      } catch (error) {
            console.log("[GET IS PURCHASE COURSE]",error)
            return false

            
      }
}