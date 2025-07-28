import { getPurchasedCourses } from "@/actions/getPurchasedCourses"
import { ListCourses } from "@/components/shared"

export default async function MyCoursesPage() {

      const courses = await getPurchasedCourses()


  // este Link es para ver todos los cursos ya comprados 
      return (
            <div>
                  <ListCourses title="Mis Curscos" courses={courses}/>

            </div>
      )
}