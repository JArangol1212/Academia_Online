import prisma from "@/config/Prisma"

// esta funcion es para poder saber si el usuario compro el curso o no
export  const  getPurchaseCourseById = async (userId: string, courseId:string)
:Promise<boolean> =>{

      try {
            
            const purchase = await prisma.purchase.findUnique({

                  where:{
                        userId_courseId:{
                              userId,
                              courseId
                        }
                  },
                  include:{
                        course:true
                  }
            })
            return !! purchase
      } catch (error) {
            
            console.log("[GET_PURCHASE_COURDE_BY_ID", error)
            return false
            
      }
}