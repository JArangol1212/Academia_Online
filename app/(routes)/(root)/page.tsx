
import { getHomeCourses } from "@/actions/getHomeCourses";
import { ExploreCourses } from "./components";
import { ListCourses } from "@/components/shared";



export default async function Home() {

 const listCourses = await getHomeCourses()

 console.log(listCourses)

  return (
    <div>
      
      <ExploreCourses/>
      <ListCourses title="Top Cursos" courses={listCourses}/>
    </div>
  );
}
