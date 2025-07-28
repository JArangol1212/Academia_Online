import prisma from "@/config/Prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Chapter, Course } from "@prisma/client";



export const getPurchasedCourses = async (): Promise<(Course & { chapters: Chapter[] })[] | null> => {
	  
      try {
            
            const user = await currentUser()

            if(!user?.id){
                  throw new Error("No se ha identificado el usuario ")
            }

            const purchaseCourses = await prisma.course.findMany({
                  where:{
                        purcharses:{
                              some:{
                                    userId:user.id
                              }
                        },
                        isPublished:true
                  },
                  include:{
                        chapters:{
                              where:{
                                    isPublished:true
                              }
                        }
                  }
            })
            return purchaseCourses
      } catch (error) {
            console.log(error)

            return []
            
      }
}