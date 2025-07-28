import { getPurchasedCourses } from "@/actions/getPurchasedCourses"
import { getUserProgressByCourse } from "@/actions/getUserProgressByCourse"

import { currentUser } from "@clerk/nextjs/server"
import { Award } from "lucide-react"
import { CoursesList } from "./components/CoursesList"

export default async function CetificatePage() {

      const courses = await getPurchasedCourses()

      const user = await currentUser()

      if(!user){
            return <p>Not signed in</p>

      }

      const userName = `${user.firstName} ${user.lastName}`


      if(!courses){
            return null
      }

      const coursesWithProgress = await Promise.all(
            courses.map(async(course) =>{

                  const progress = await getUserProgressByCourse(user.id, course.id)

                  return {...course, progress}
            })
      )

      return (

            <div className="m-6 p-6 border bg-white rounded-md">

                  <div className="flex items-center gap-1 mb-4">

                        <div className="p-2 rounded-full bg-violet-400">

                              <Award className="w-5 h-4 text-white"/>

                        </div>
                        <h3 className="text-xl font-semibold"> Certidicados de los cursos</h3>

                  </div>
                  <CoursesList courses={coursesWithProgress} userName={userName}/>

            
            </div>
      )
}