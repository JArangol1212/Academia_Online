import prisma from "@/config/Prisma";
import { Chapter, Course } from "@prisma/client";


export const getHomeCourses = async(): Promise<(Course & { chapters:Chapter[]})[] | null> =>{

     try {
         const courses = await prisma.course.findMany({

            where:{
                  isPublished:true
            },
            orderBy:{
                  createdAt:"desc"
            },
            include:{
                  chapters:{
                        where:{
                              isPublished:true
                        }
                  }
            }
         })
         return courses
      
     } catch (error) {
      console.log("[GET_HOME_COURSES]", error)

      return null
      
     } 
}
