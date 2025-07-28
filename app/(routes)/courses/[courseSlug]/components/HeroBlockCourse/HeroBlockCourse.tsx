"use client"


import { useState } from "react";
import { HeroBlockCourseProps } from "./HeroBlockCourse.types";
import { IconBadge } from "@/components/shared";
import { Calendar, ChartNoAxesColumn, Timer } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function HeroBlockCourse(props: HeroBlockCourseProps) {

      const { cuorse, purchaseCourse } = props

      const router = useRouter()

      const { title, id, description, price, level, imageUrl, updatedAt, slug, chapters } = cuorse


      const [isLoading, setIsLoading] = useState(false)

      const enrollCourse = async ()=>{
            setIsLoading(true)
            if(price ==="Gratis"){
                  try {
                         await axios.post(`/api/course/${id}/enroll`)
                         toast("Incripción exitosa")
                        //  router.push(`/courses/${slug}/${chapters[0].id}`)
                  } catch (error) {
                        console.log(error)
                        toast.error("Error al suscribirse")
                        
                  }
                  finally{
                        setIsLoading(true)
                  }
            } else{
                  try {
                         const response = await axios.post(`/api/course/${id}/checkout`)

                         

                    window.location.assign(response.data.url)

                  console.log(response)
                        
                  } catch (error) {

                        console.log(error)
                        toast.error("Error al Inscribirse")

                        
                  } finally{
                        setIsLoading(true)
                  }
                 
            }
      }
      const redirectToCourse =() =>{
            router.push(`/courses/${slug}/${chapters[0].id}`)
      }

      return (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                        <h2 className="text-3xl font-semibold">{title}</h2>
                        <p className="text-balance mt-2">{description}</p>

                        <div className="flex flex-col gap-3 mt-5 text-gray-600">
                              <IconBadge icon={Timer} text="8h 40min"/>
                              
                              <IconBadge icon={Calendar} 
                              text={`Última actualizacion :${ new Date(updatedAt).toLocaleDateString("es-ES")}`}/>


                              <IconBadge icon={ChartNoAxesColumn} text={level || ""}/>
                        </div>
                        
                        <h2 className="text-xl font-semibold my-4">{formatPrice(price)}</h2>
                       
                       {purchaseCourse ? 
                       <Button
                       onClick={redirectToCourse}
                        className="hover:bg-violet-400 text-white font-semibold" disabled={isLoading} >
                        Ver Curso
                        </Button>: 
                         <Button
                         onClick={enrollCourse}
                          className="hover:bg-violet-400 text-white font-semibold" disabled={isLoading}>
                              Inscribirse ahora

                         </Button>
                         }
                  </div>
                  <Image src={imageUrl || "/academia.jpg"}
                  alt={title}
                  width={500}
                  height={400}
                  className="rounded-md">

                  </Image>

            </div>
      )
}