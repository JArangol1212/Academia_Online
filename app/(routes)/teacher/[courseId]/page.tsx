import prisma from "@/config/Prisma"
import { auth } from "@clerk/nextjs/server"
import { CourseForm, CourseImage, HeaderCourse } from "./components"
import { CoursePrice } from "./components/CoursePrice"
import { ChaptersBlock } from "./components/ChaptersBock"

export default async function  CoursePage({params}: {params:Promise<{courseId:string}>}){

     const {courseId} = await params

     // validamos si el usuario esta logeado

     const {userId} = await auth()

     if(!userId) {
       return <p> No tines permisos para ver este curso</p>
     }

     // validamos si el curso existe 
     const course = await prisma.course.findUnique({
      where:{
            id:courseId,
            userId:userId
      },
      include: {
            chapters:{
             orderBy: {
                  position:"asc"
             }
            }
      }
     })
     if(!course){
      return <p> Este curso no existe</p>
     }
      return (

            <div className="m-6">
                  
                  <HeaderCourse idCourse={course.id} isPublished={course.isPublished}/>


                  <CourseForm course={course}/>
            

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">


                  {/* En este campo lo vamos pasar el componente vamos a pasar el de CourseImage */}
                
                <CourseImage  idCourse={course.id} imageCourse={course.imageUrl}/>

                      {/* En este campo lo vamos pasar el componente vamos a pasar el de CoursePrice */}
                  
                  
                 <CoursePrice idCourse={course.id} priceCourse={course.price}/>



               </div>
                      {/* En este campo lo vamos pasar el componente vamos a pasar todo los niveles s*/}
                <ChaptersBlock idCourse={course.id} chapters={course.chapters} />
            </div>
          
      )
}