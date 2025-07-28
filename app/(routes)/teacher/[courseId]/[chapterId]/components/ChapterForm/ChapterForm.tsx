"use client"

import { Button } from "@/components/ui/button";
import { ChapterFormProps } from "./ChapterForm.types";
import { ArrowLeft, Cog, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { TitleBlock } from "../../../components/TitleBlock/TitleBlock";
import axios from "axios";
import { toast } from "sonner";
import { ChapterTitleForm } from "./ChapterTitleForm";
import { ChapterVideoForm } from "./ChapterVideoForm";


export function ChapterForm(props:ChapterFormProps){

      const {chapter,courseId}= props
      const router = useRouter()

  

      if(!chapter){
            return null
      }

      const onPublish = async (state:boolean)=>{

            try {
                  
                  axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`,{
                        isPublished:state
                  })
                  toast(state ? "Capitulo Publicado" : "Capitulo Ocultado")

                  router.refresh()

            } catch (error) {
                  console.log(error)
                  
            }
      }

      const removeChapter= async() =>{
            try {
                
                  axios.delete(`/api/course/${courseId}/chapter/${chapter.id}`)
                  
                  router.push(`/teacher/${courseId}`)

                  toast("Capitulo Eliminado")
            } catch (error) {
                  console.log(error)
                  
            }

      }


      return (

            <div> 
                  <div className="p-6 bg-white rounded-md">
                        <Button className="mb-4 " variant="outline" onClick={()=>router.push(`/teacher/${courseId}`)}>
                              <ArrowLeft className="w-4 h-4 mr-2"/>
                              Volver a la Edición del Curso
                        </Button>



                        <div className="p-6 mt-6 bg-white rounded-md flex justify-between items-center">

                              <TitleBlock title="Configuracion del Capitulo" icon={Cog}/>
                           

                           <div className=" gap-2 flex items-center">

                              {chapter.isPublished ? (
                                 <Button variant="outline" onClick={()=> onPublish(false)}>
                                    Ocultar
                                 </Button>   
                              ) : (
                                    <Button onClick={()=> onPublish(true)} >
                                          Publicar
                                    </Button>
                              )}

                              <Button variant="destructive" onClick={()=> removeChapter()}>
                                    <Trash/>
                              </Button>
                           </div>

                 
                        </div>
                        <ChapterTitleForm courseId={courseId} chapter={chapter} />


                    <ChapterVideoForm chapterId={chapter.id} courseId={courseId} videoUrl={chapter.videoUrl} />
                  </div>
            </div>
      )
}