

import { currentUser } from "@clerk/nextjs/server";

import { getCourseBySlug } from "@/actions/getCourseBySlug"
import { redirect } from "next/navigation"
import { BreadCrumbCourse } from "./components"
import { getPurchaseCourseById } from "@/actions/getPurchaseCourseById";
import { HeroBlockCourse } from "./components/HeroBlockCourse";
import { CourseContent } from "./components/CourseContent";




export default async function CourseSlugPage(
  { params }: 
  { params: Promise<{ courseSlug: string }> }
) {
  const { courseSlug }  =  await params


  const decodedSlug = decodeURIComponent(courseSlug);

   const infoCourse = await getCourseBySlug(decodedSlug)
   
   if (!infoCourse) {
    redirect("/")
   }

      const {title, id} = infoCourse

      const user = await currentUser()

      if(!user){
        redirect("/")
      }

   const purchaseCourse = await getPurchaseCourseById(user.id, id)


  console.log("Curso encontrado:", infoCourse.title)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="my-4 mx-6 border rounded-lg bg-white p-6">
       
         <BreadCrumbCourse title={title} /> 

         <HeroBlockCourse cuorse={infoCourse} purchaseCourse={purchaseCourse}/>
      </div>

       <div className="my-4 mx-6 border rounded-lg bg-white p-6">

       <CourseContent chapters={infoCourse.chapters}/>

       </div>
    </div>
  )
}
