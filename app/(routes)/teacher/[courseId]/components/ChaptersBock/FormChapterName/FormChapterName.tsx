
"use client"
 
import { z } from "zod"
 


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,

  FormField,
  FormItem,

  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./FormChapterName.form"
import { FormChapterNameProps } from "./FormChapterName.types"
import axios from "axios"

import { toast } from "sonner"
import { useRouter } from "next/navigation"


export function FormChapterName(props:FormChapterNameProps){

      const {idCourse,setShowInputChapter} = props
      const router = useRouter()

       const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
 
  // 2. Define a su bmit handler.
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
      try {
            axios.post(`/api/course/${idCourse}/chapter`,{
                  title:values.title
            })
            toast("Capitulo Creado")
            setShowInputChapter(false)
            router.refresh()
            
      } catch (error) {
            console.log(error)
            toast.error("Ops, algo salio mal")
            
      }
  }

      return (

            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="Ej: Introduccion a la programación" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" >Crear</Button>
      </form>
    </Form>
  )
      
}