
"use client"
import { FileImage, Pencil } from "lucide-react";
import { TitleBlock } from "../TitleBlock/TitleBlock";
import { CourseImageProps } from "./CourseImage.types";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";

import Image from "next/image";
import axios from "axios";

export function CourseImage(props:CourseImageProps){

      const {idCourse,imageCourse} = props
      const [isEditing, setIsEditing] = useState(false)

      const [image, setImage] = useState(imageCourse)

      const onChangeImage = async (imageUrl:string) => {
           try {

              axios.patch(`/api/course/${idCourse}`,
                  {imageUrl:imageUrl}
                  
            )
            toast("Imagen actualizada correctamente")
            
           } catch (error) {
            console.log(error)
            toast.error("Ups, algo ha ido mal")
            
           }
          
      }
       
      return (
            <div className="p-4 rounded-lg bg-white h-fit">
               
               <TitleBlock title="Imagen del Curso" icon={FileImage}/>

        {isEditing ?  (
            <div className="bg-slate-300 p-4 mt-2 rounded-lg cursor-pointer">
      
            <UploadButton 
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                  onChangeImage(res[0]?.ufsUrl)
                  setImage(res[0]?.ufsUrl)
                  setIsEditing(false)

            }}
             onUploadError={()=>{
                  toast.error("Ha ocurrido un error")
             }}/>

             </div>

        ) : (


               <Image 
               src={image || "/academia.jpg"} 
               alt="Curso"
                className="w-full h-full rounded-md"
                width={500}
                height={500} 
                />
        )}

                <Button className="w-full mt-4" variant="outline" size="sm" onClick={()=> setIsEditing(!isEditing) }>
                   <Pencil className="w-4 h-3 mr-2"/>
                     Editar Imagen
                  </Button>
            </div>
      )
}