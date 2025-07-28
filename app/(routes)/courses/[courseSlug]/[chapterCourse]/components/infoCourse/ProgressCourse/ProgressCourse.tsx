
"use client"
import { Progress } from "@/components/ui/progress";
import { ProgressCourseProps } from "./ProgressCourse.types";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ProgressCourse(props: ProgressCourseProps) {

      // obtenemos todos los props

      const { infoCourse, chapterCourseId, userProgress } = props
      const { id, slug, chapters } = infoCourse

      const [isCompleted, setIsCompleted] = useState(false)
    

      const router = useRouter()

      // indicar al progress buscamos el capitulo que coincida 
      // 
      useEffect(() => {

            const progress = userProgress.find((progress) => progress.chapterId === chapterCourseId)

            if (progress) {
                  setIsCompleted(progress.isCompleted)
            }
      }, [chapterCourseId, userProgress])








      const handleViewChapter = async (isCompleted: boolean) => {

       
            try {

                  await axios.patch(`/api/course/${id}/chapter/${chapterCourseId}/progress`, JSON.stringify({ isCompleted }))

                  setIsCompleted(isCompleted)
                  toast(isCompleted ? " Capitulo Completado" : "Capitulo no completado")

                  if (isCompleted) {
                        const currentIndex = chapters.findIndex((chapter) => chapter.id === chapterCourseId)
                        const nexChapter = chapters[currentIndex + 1]
                        if (nexChapter) {
                              router.push(`/courses/${slug}/${nexChapter.id}`)
                        }
                  }
                  router.refresh()
            } catch (error) {
                  console.log(error)
                  toast.error("Ups, algo ha ido mal")

            } finally {
                 
            }

      }

      const totalChapters = chapters.length

      const complitedChapters = chapters.filter((chapter) => userProgress.some((pogress) => pogress.chapterId === chapter.id && pogress.isCompleted)).length

      const progressPercentage = totalChapters > 0 ? Math.round((complitedChapters / totalChapters) * 100) : 0
      return (

            <div >

                  <div className="my-4 w-full flex items-center gap-2 flex-col p-2 border
                  rounded-md shadow-md bg-white">
                        <span className="text-sm"> Progreso del curso | {progressPercentage}%</span>

                        <Progress value={progressPercentage} className="[&>*]:bg-violet-300" />
                  </div>
                  <div className="my-4 w-full">

                        <Button
                              className="w-full"
                              onClick={() => handleViewChapter(!isCompleted)}
                              variant={isCompleted ? "outline" : "default"}
                        >
                              {isCompleted
                                    ? "Marcar como no completado"
                                    : "Marcar como completado"}
                        </Button>

                  </div>



            </div>


      )
}