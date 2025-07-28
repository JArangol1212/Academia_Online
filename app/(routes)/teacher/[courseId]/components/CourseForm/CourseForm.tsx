
"use client"

import { Cog } from "lucide-react";
import { TitleBlock } from "../TitleBlock/TitleBlock";
import { CourseFormProps } from "./CourseForm.types";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { formSchema } from "./CourseForm.form";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";




export function CourseForm(props: CourseFormProps) {

      const { course } = props

      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  title: course.title || "",
                  slug: course.slug || "",
                  description: course.description || "",
                  category: course.category || "",
                  level: course.level || ""


            },
      })

      // 2. Define a submit handler.
      const onSubmit = async (values: z.infer<typeof formSchema>) => {

            try {
                  axios.patch(`/api/course/${course.id}`, values)
                  
                  
                  toast("Curso actualizado correcatamente")

            } catch (error) {
                  console.log(error)
                  toast.error("Ups, algo ha ido mal")
                  
            }
      }



      return (

            <div className="p-6 bg-white rounded-md">


                  {/*Pasamos el TitleBlok esto es para crear el componente visual de Configuracion del curso */}

                  <TitleBlock title="Configuracion del Curso" icon={Cog} />


                  <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                          control={form.control}
                                          name="title"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Titulo del Curso</FormLabel>
                                                      <FormControl>
                                                            <Input placeholder="Curso de ReactJS" {...field} />
                                                      </FormControl>
                                                      <FormDescription>
                                                            Esto es lo que el usuario verá como titulo del curso
                                                      </FormDescription>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <FormField
                                          control={form.control}
                                          name="slug"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Url del Curso</FormLabel>
                                                      <FormControl>
                                                            <Input placeholder="Curso React-js" {...field} disabled />
                                                      </FormControl>
                                                      <FormDescription>
                                                            Es unica t no se puede modificar
                                                      </FormDescription>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <FormField
                                          control={form.control}
                                          name="category"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Categoria</FormLabel>
                                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                  <SelectTrigger>
                                                                        <SelectValue placeholder="Selecciona la categoria del curso" />
                                                                  </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                  <SelectItem value="Frontend">Frontend</SelectItem>
                                                                  <SelectItem value="Backend">Backend</SelectItem>
                                                                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                                                                  <SelectItem value="Infraestructura">Insfraestructura</SelectItem>
                                                                  <SelectItem value="Diseño UX/UI">Diseño UX/UI</SelectItem>
                                                            </SelectContent>
                                                      </Select>

                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <FormField
                                          control={form.control}
                                          name="level"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Nivel del Curso</FormLabel>
                                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                  <SelectTrigger>
                                                                        <SelectValue placeholder="Selecciona el Curso" />
                                                                  </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                  <SelectItem value="Principiante">Pricinpiante</SelectItem>
                                                                  <SelectItem value="Intermedio">Intermedio</SelectItem>
                                                                  <SelectItem value="Avanzado">Avanzado</SelectItem>

                                                            </SelectContent>
                                                      </Select>

                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                                    <FormField
                                          control={form.control}
                                          name="description"
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>Descripcion</FormLabel>
                                                      <FormControl>
                                                            <Textarea
                                                                  placeholder="Pon la descripcion del curso"
                                                                  className="resize-none"
                                                                  {...field}
                                                            />
                                                      </FormControl>
                                                      <FormDescription>
                                                         Descripcion completa del curso
                                                      </FormDescription>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

                              </div>
                              <Button type="submit">Guardar Informacion Basica</Button>
                        </form>

                  </Form>
            </div>


      )
}