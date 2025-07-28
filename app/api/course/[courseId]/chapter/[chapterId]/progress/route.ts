import prisma from "@/config/Prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
      req:Request, 
      {params}: {params:Promise<{courseId:string; chapterId:string}>}
){

      const {userId} = await auth()
      const {courseId, chapterId} = await params
      const {isCompleted} = await req.json()
     
      try {
              if(!userId){
            return new NextResponse("Unauthorized", {status:401})

      }

      const chapter = await prisma.chapter.findUnique({
            where:{
                  id:chapterId
            },
            select:{
                  courseId:true
            }
      })
      if(!chapter || chapter.courseId !== courseId){
            return new NextResponse("Chapter not fount",{status:404})

      }

      // Agregar verificación de compra 

      const purchase = await prisma.purchase.findFirst({
            where:{
                  userId:userId,
                  courseId:courseId
            }
      })

      if(!purchase ){
            return new NextResponse("Debes comprar el curso para acceder a este contenido ",{
                  status:403
            })
      }


      
      const userProgress = await prisma.userProgress.upsert({
            where:{
                  userId_chapterId:{
                        userId:userId,
                        chapterId:chapterId
                  },

            }, 
            update:{
                  isCompleted:isCompleted
            },
            create:{
                  userId:userId,
                  chapterId:chapterId,
                  isCompleted:isCompleted
            }
      })
      return NextResponse.json(userProgress)
            
      } catch (error) {
            console.log("[COURSE_PROGRESS_UPDATE]",error)
            return new NextResponse("Internal server error", {status:500})
            
      }
    


}