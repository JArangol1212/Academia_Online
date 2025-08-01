import { CourseContentProps } from "./CourseContent.types";

export function CourseContent(props:CourseContentProps){

      const {chapters} = props

      return (
            <div>
                  <h2 className="text-3xl font-semibold mb-4 pb-4"> Contenido del curso</h2>

                  <div className="space-x-6">
                        {chapters.map((chapter, index)=>(
                              <div key={chapter.id}
                               className="flex items-start space-x-4 border p-2 rounded-lg hover:bg-gray-100 transition-all">

                                <div className="flex-shrink-0 bg-violet-400 text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center">
                                    {index + 1}

                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-medium text-gray-800">{chapter.title}</h4>

                                </div>
                                <div className="flex-shrink-0 items-center justify-center">
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium
                                    ${chapter.isPublished ? "bg-green-100 text-green-800": "bg-red-800 text-red-100"}`}
                                    >{chapter.isPublished ? "Publicado": "Sin publicar"}</span>
                                    
                                </div>
                              </div>
                        ))}

                  </div>
            </div>
      )
}