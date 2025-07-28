import prisma from "@/config/Prisma"
import { auth } from "@clerk/nextjs/server"

import { ChapterForm } from "./components/ChapterForm"

export default async function ChapterPage({params}:{
      params:Promise<{courseId:string, chapterId:string}>

}){

      const {courseId, chapterId} = await params

      const {userId} = await auth()

      if(!userId) {
            return <p> No tienes permiso para ver este capitulo</p>
      }

      const chapter = await prisma.chapter.findUnique({

            where:{
                  id:chapterId,
                  courseId:courseId
                  
            }
      })
      if(!chapter){
            return <p>Este Capitulo no existe</p>
      }

      return (

            <div className="m-6">
              <ChapterForm chapter={chapter} courseId={courseId}/>
            </div>
      )
} 