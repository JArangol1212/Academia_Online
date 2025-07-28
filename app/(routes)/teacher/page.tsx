import { currentUser } from "@clerk/nextjs/server"
import Header from "./components/Header/Header"
import prisma from "@/config/Prisma"
import { ListCourses } from "./components/ListCourses/ListCourses"






export default async function TeacherPage() {

      const user = await currentUser()

  if(!user) {

      return <p> Not signed in</p>
  }
   
  // Listado de todos los cursos del profesor 
  const course = await prisma.course.findMany(
    {
        where:{
            userId: user.id
        }
    }
  )

  
      return (

            <div> 

            <Header/>

            <ListCourses courses={course}/>
            </div>
      )
}