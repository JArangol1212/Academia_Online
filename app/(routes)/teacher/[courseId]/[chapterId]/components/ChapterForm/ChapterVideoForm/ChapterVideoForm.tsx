"use Client"

import { Pencil, Video } from "lucide-react";
import { TitleBlock } from "../../../../components/TitleBlock/TitleBlock";
import { ChapterVideoFormProps } from "./ChapterVideoForm.types";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";


export function ChapterVideoForm(props:ChapterVideoFormProps){
      const {chapterId,courseId,videoUrl} = props

      const router = useRouter()

      const [onEditVideo, setOnEditVideo] = useState(false)
 

      const onSubmit = async (url:string)=>{

            try {
                    await  axios.patch(`/api/course/${courseId}/chapter/${chapterId}`,{
            videoUrl:url
          })
          toast("Video Actualizado")

          router.refresh()
                  
            } catch (error) {
                  console.log(error)
                  toast.error("Ups, halgo a  ocurrido mal")
                  
            }
        
            

      }

      return (

            <div className="mt-6 p-6 bg-white rounded-md">

                  <TitleBlock title="Añade o modifica el video" icon={Video}/>

                {videoUrl ? (

                  <video src={videoUrl} controls className="rounded-md"/>

                ):(
                  <p> No hay video</p>
                )}
                <div className="mt-4 p-2 rounded-md border">
                  <Button variant="secondary" onClick={()=> setOnEditVideo(true)}>
                        { onEditVideo ? "Arrastra o selecciona el video": "Editar el video"}
                        <Pencil className="w.4 h-4 mr-2"/> 
                  </Button>

                  {onEditVideo && (
                        <UploadButton 
                        className="w-full bg-slate-200 rounded-md p-2 mt-2"
                        endpoint="chapterVideo"
                        onClientUploadComplete={(url) => {
                              console.log(url)
                              if(url ){
                                    onSubmit(url[0].serverData.url)
                              }
                        }}/>

                  )}

                </div>
            </div>
      )
}