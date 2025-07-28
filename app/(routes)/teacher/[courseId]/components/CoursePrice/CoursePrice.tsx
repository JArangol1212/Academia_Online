"use client"

import { DollarSign } from "lucide-react";
import { TitleBlock } from "../TitleBlock/TitleBlock";
import { CoursePriceProps } from "./CoursePrice.types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { SelectLabel } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";


export function CoursePrice(props:CoursePriceProps){

      const {idCourse, priceCourse} = props
      const [price , setPrice] = useState<string | undefined>(priceCourse || "Gratis")

      const onChangePrice = async () =>{

            try {
                  axios.patch(`/api/course/${idCourse}`,{
                        price:price
                  })
                  toast("El precio se actualizo correctamente")
            } catch (error) {
                  console.log(error)

                 toast.error("Ups, algo salio mal") 
            }
      }
      return (

            <div className="p-6 bg-white rounded-md h-fit">

                   <TitleBlock title="Precio del Curso" icon={DollarSign}/>
                   <Select onValueChange={setPrice} defaultValue={price}>
                        <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona un precio del curso"/>
                              <SelectContent>
                                    <SelectGroup>
                                          <SelectLabel> Precio del Curso</SelectLabel>
                                          <SelectItem value="Gratis">Gratis</SelectItem>
                                             <SelectItem value="19,99">19,99$</SelectItem>
                                                <SelectItem value="29,99">29.99$</SelectItem>
                                                   <SelectItem value="39,99">39,99$</SelectItem>
                                                     <SelectItem value="49,99">49,99$</SelectItem>
                                                       <SelectItem value="59,99">59,99$</SelectItem>
                                    </SelectGroup>
                              </SelectContent>

                        </SelectTrigger>
                   </Select>
                   <Button 
                   onClick={()=>onChangePrice()} disabled={!price} className="mt-3"> Guardar Precio</Button>
            </div>
      )
}