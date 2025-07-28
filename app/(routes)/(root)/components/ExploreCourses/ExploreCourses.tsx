"use client"


import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ExploreCourses() {
      const router = useRouter()

      return (
            <div className="my-4 mx-6 border rounded-lg bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4">

                        <div className="p-6 flex flex-col gap-3">
                              <h1 className="text-4xl font-semibold"> Explora todos los Cursos</h1>
                             <p className="text-balance max-w-2xl">
                              
                              Empieza a aprender a programar desde cero con estos cursos. No 
                              necesitas experiencia previa, no necesitas un ordenador de última 
                              tecnología. Solo necesitas muchas ganas y un buen café 
                             </p>

                             <Button className="w-fit" onClick={()=> router.push("/courses")}> Empezar a aprender</Button>
                        </div>
                        <div className="flex items-end  mb-8">
                              <Image src="/explrore.jpg"
                              alt="Explora todos los cursos"
                              width={300}
                              height={300}
                              className="rounded-md"
                              >

                              </Image>

                        </div>
                  </div>

            </div>
      )
}