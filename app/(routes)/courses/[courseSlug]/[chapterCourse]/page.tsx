import { getCourseBySlug } from "@/actions/getCourseBySlug"
import { getIsPurchasedCourse } from "@/actions/getPurchasedCourse"
import { getUserProgress } from "@/actions/getUserProgress"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ChaptersCourse, InfoCourse } from "./components"

export default async function ChapterCoursePage({ params }: {
      params: Promise<{ courseSlug: string, chapterCourse: string }>
}) {

      const { courseSlug, chapterCourse } = await params

      const user = await currentUser()

      if (!user) {
            return redirect("/")
      }

      const decodedSlug = decodeURIComponent(courseSlug)

      const infoCourse = await getCourseBySlug(decodedSlug)

      const userProgress = await getUserProgress()


      if (!infoCourse) {
            return redirect(`$/courses/${courseSlug}`)
      }

      const isPuchasedCourse = await getIsPurchasedCourse(user.id, infoCourse.id)

      const videoUrl = infoCourse.chapters.find((chapter) => 
       chapter.id === chapterCourse)?.videoUrl?? null

      return (

            <div className="p-6">

             <div className="grid grid-cols-1 md:grid-col[65%_1fr] gap-4">
             
             <InfoCourse infoCourse={infoCourse} chapterCourseId={chapterCourse}
              userProgress={userProgress}
              purchaseCourse={isPuchasedCourse} 
              videoUrl={videoUrl}/>


            <ChaptersCourse
             chapters={infoCourse.chapters}
             courseSlug={courseSlug}
             chapterCourse={chapterCourse}
             userProgress={userProgress}/>

             </div>
             
            </div>
      )
}