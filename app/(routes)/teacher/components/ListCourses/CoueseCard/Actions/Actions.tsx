
"use client"

import { Button } from "@/components/ui/button";

import { Edit, Trash } from "lucide-react";
import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ActionsProps } from "./Actions.types";


export function Actions(props: ActionsProps) {

      const { courseId} = props

      const router = useRouter()

      const onEdit= ()=> {
            router.push(`/teacher/${courseId}`)
      }
       
      const deleteCourse = ()=> {
            axios.delete(`/api/course/${courseId}`)
            toast("Curso eliminado correctamente")

            router.refresh();

      }
      return (

            <div className=" flex flex-col gap-2  items-center w-full lg:max-w-44">

                  <Button className="w-full" onClick={onEdit}>
                        Editar <Edit className="w-4 h-4 mr-2" />
                  </Button>

                  <AlertDialog>
                        <AlertDialogTrigger asChild>
                              <Button variant="outline" className="w-full text-red-950 border-red-500 hover:bg-red-100 hover:text-red-500">
                                    Eliminar <Trash className="w-4 h-4 mr-2"/>

                              </Button>

                        </AlertDialogTrigger>
                        <AlertDialogContent>
                              <AlertDialogHeader>
                                    <AlertDialogTitle>¿ Estas seguro ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                         Esto borrará el curso y todo sus datos.
                                    </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={deleteCourse}>Eliminar</AlertDialogAction>
                              </AlertDialogFooter>
                        </AlertDialogContent>
                  </AlertDialog>


            </div>
      )
}