import Link from "next/link";
import { ListCourseProps } from "./ListCourses.types";
import Image from "next/image";
import { IconBadge } from "../IconBadge";
import { Book, ChartNoAxesColumn } from "lucide-react";
import { ProgressCourse } from "./ProgressCourse";

export function ListCourses(props: ListCourseProps) {
  const { courses, title } = props;

  return (
    <div>
      <div className="my-4 mx-6 border rounded-lg bg-white">
        <h2 className="text-2xl font-normal px-4 pt-4">{title}</h2>
        <div className="border-b-[1px] py-2 px-4">
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {courses.map(({ id, imageUrl, title, level, price, slug, category, chapters }) => (
                <Link
                  key={id}
                  href={`/courses/${slug}`}
                  className="border rounded-lg relative transition-shadow hover:shadow-lg shadow-violet-300/40 shadow-md overflow-hidden"
                >
                  <span className="absolute top-2 right-2 z-10 px-2 py-1 bg-white text-violet-500 font-medium rounded-full text-xs shadow-md">
                    {category}
                  </span>
                  <div className="w-full h-[180px] relative">
                    <Image
                      src={imageUrl || "/academia.jpg"}
                      alt={title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width:500px) 100vw, 1200px"
                    />
                  </div>
                  <div className="p-2">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
                       
                       <div className="flex items-center gap-2  justify-between mt-2">

                             <IconBadge icon={Book}
                             text={`${chapters.length} capituloos`}/>

                             <IconBadge 
                             icon={ChartNoAxesColumn}
                             text={level || ""} />
                       </div>

                        {/*Pasamos aca el progrssCourse*/}
                        <ProgressCourse courseId={id} totalChapter={chapters.length} price={price}/>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No hay cursos disponibles en este momento.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
