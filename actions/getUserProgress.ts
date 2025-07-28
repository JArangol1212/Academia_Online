

// este enpoint es para ver el progreso del cliente de curso comprado
import prisma from "@/config/Prisma"
import { currentUser } from "@clerk/nextjs/server"


export const getUserProgress = async()=> {

      try {
            
            const user = await currentUser()

            if(!user?.id){

                  throw new Error("No se ha identificado el usuario")
            }

            const progress = await prisma.userProgress.findMany({
                  where:{
                        userId:user.id
                  }
            })

            return progress

      } catch (error) {
            console.log(error)
            return[]
      }
}