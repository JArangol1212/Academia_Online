import prisma from "@/config/Prisma"
import { auth } from "@clerk/nextjs/server"

import { NextRequest, NextResponse } from "next/server"




export async function PUT(
      req: NextRequest,
      { params }: { params:Promise< { courseId: string }>}
) {

  try {
       const {userId} = await auth()
       const {courseId} = await params
       const {list } = await req.json()

       if(!userId) {

            return new NextResponse("Unauthorized", {status:401})
       }

       const ownCourse = await prisma.course.findUnique({
            where:{
                  id:courseId,
                  userId:userId
            }
       })
       if(!ownCourse){
            return new NextResponse("Course not Fount", {status:404})
       }
       for(const item of list){
            await prisma.chapter.update({
                  where:{
                        id:item.id,
                  },
                  data: {
                        position: item.position
                  }
            })
       }
       return new  NextResponse("Success", {status:200})
  } catch (error) {

      console.log("[COURSE_CHAPTER_REORDER", error)
      
      return new NextResponse("Internal Server Error",{status:500})
      
  }

}