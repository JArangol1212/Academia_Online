"use client"

import { ChapterTitleFormProps } from "./ChapterTitleForm.types";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { Button } from "@/components/ui/button"
import {
      Form,
      FormControl,

      FormDescription,

      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./ChapterTitleForm.form";
import { Checkbox } from "@/components/ui/checkbox"
import { z } from "zod";
import { EditorDescription } from "@/components/shared/EditoraDescription/EditorDescription";
import axios from "axios";


import { toast } from "sonner";
import { useRouter } from "next/navigation";
export function ChapterTitleForm(props: ChapterTitleFormProps) {

      const { chapter, courseId } = props
      const router= useRouter()


      // 1. Define your form.
      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  title: chapter?.title || "",
                  description: chapter?.description || "",
                  isFree: chapter?.isFree || false
            },
      })

      // 2. Define a submit handler.
      const  onSubmit = async(values: z.infer<typeof formSchema>) =>{
            try {
                  await axios.patch(`/api/course/${courseId}/chapter/${chapter?.id}`,{
                        title:values.title,
                        description:values.description,
                        isFree:values.isFree
                  })
                  toast("Capitulo modificado")
                  router.refresh()
            } catch (error) {
                  console.log(error)

                  toast.error("Algo ha ido mal..!")
                  
            }
      }

      return (
            <div className="p-6 rounded-md bg-white mt-6">
                  <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6 ">
                              <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Nombre del Capitulo</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="Introduccion a  la programación" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Descripción del Capitulo</FormLabel>
                                                <FormControl>

                                                      <EditorDescription {...field} />
                                                </FormControl>

                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <FormField
                                    control={form.control}
                                    name="isFree"
                                    render={({ field }) => (
                                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                                <FormControl>
                                                      <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                      />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                      <FormLabel>
                                                           Capitulo Público
                                                      </FormLabel>
                                                      <FormDescription>
                                                           Sí quieres que este capítulo sea visible para todos los usuarios
                                                          
                                                      </FormDescription>
                                                </div>
                                          </FormItem>
                                    )}
                              />
                                <div/>
                              <Button type="submit" className="mt-4">Guardar</Button>
                        </form>
                  </Form>


            </div>
      )
}