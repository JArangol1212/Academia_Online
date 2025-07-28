import { CourseCard } from "./CoueseCard"
import { ListCourseProps } from "./ListCourses.types"



export function ListCourses(props:ListCourseProps){

      const {courses} = props
      
      if(courses.length===0){
            return <p> No hay cursos creados</p>
      }


      return (
            <div className=" flex flex-col my-4 mx-6 border rounded-lg bg-white p-4 gap-10">
               
               {courses.map((course)=>(

                  <div key={course.id}>

                        {/* Aca pasamos el components Course Card que acabamos de crear */}
                        <CourseCard courses={course}/>
                        <div className="border-t border-gray-200 w-full mt-4"/>
                  </div>
               ))}
            </div>
      )
}