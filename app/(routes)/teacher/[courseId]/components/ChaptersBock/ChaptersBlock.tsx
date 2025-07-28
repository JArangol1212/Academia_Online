"use client"

import { GripVertical, ListCheck, Loader2, Pencil, PlusCircle } from "lucide-react";
import { TitleBlock } from "../TitleBlock/TitleBlock";
import { ChaptersBlockProps } from "./ChaptersBlock.types";
import { Button } from "@/components/ui/button";
import {
      DragDropContext,
      Droppable,
      DropResult,
      Draggable
} from "@hello-pangea/dnd"
import { useEffect, useState } from "react";
import { FormChapterName } from "./FormChapterName";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ChaptersBlock(props: ChaptersBlockProps) {

      const { idCourse, chapters } = props

      const router = useRouter()

      useEffect(()=>{
            setChaptersList(chapters ??[])
      },[chapters])


      const [chaptersList, setChaptersList] = useState(chapters ?? [])

      const [showInputChapter, setShowInputChapter] = useState(false)

      const [isUpdating, setIsUpdating] = useState(false)

      // funcion para poder actualizar los capitulos del curso
      const onEditChapter = (chapterId: string) => {

            router.push(`/teacher/${idCourse}/${chapterId}`)

      }
      const onDragEnd = (result: DropResult) => {
            if (!result.destination) return

            const items = Array.from(chaptersList)
            const [reorderedItem] = items.splice(result.source.index, 1)
            items.splice(result.destination.index, 0, reorderedItem)

            const bulUpdate = items.map((chapter, index) => ({

                  id: chapter.id,
                  position: index
            }))
            onReoder(bulUpdate)
      }



      const onReoder = async (updateData: { id: string, position: number }[]) => {
            try {
                  setIsUpdating(true)
                  await axios.put(`/api/course/${idCourse}/chapter/reorder`, {
                        list: updateData
                  })
                  toast("Orden Actualizado")
                  router.refresh()
            } catch (error) {
                  console.log(error)
                  toast.error("Ups, algo ha ido mal ")

            } finally {
                  setIsUpdating(false)
            }
      }


      return (

            <div className="p-6 bg-white rounded-md h-fit relative">
                  <TitleBlock title="Capítulos del curso" icon={ListCheck}></TitleBlock>
                  <div className="flex gap-2 items-center justify-between mb-3">
                        <p>Capitulos Completos</p>
                        <Button variant="outline" size="sm" onClick={() => setShowInputChapter(true)}>
                              <PlusCircle className="w-4 h-4 mr-2" />
                              Crear Capitulo

                        </Button>



                  </div>
                  {showInputChapter && (
                        <FormChapterName
                              setShowInputChapter={setShowInputChapter}
                              idCourse={idCourse} />
                  )}

                  {isUpdating && (
                        <div className="absolute top-0 right-0 items-center justify-center w-full h-full bg-slate-500/20">

                              <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
                        </div>
                  )}

                  <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="chapters">
                              {(provided) => (
                                    <div
                                          {...provided.droppableProps}
                                          ref={provided.innerRef}
                                          className="flex flex-col gap-2"
                                    >
                                          {chaptersList?.map((chapter, index) => (
                                                <Draggable
                                                      key={chapter.id}
                                                      draggableId={chapter.id}
                                                      index={index}
                                                >
                                                      {(provided) => (
                                                            <div
                                                                  ref={provided.innerRef}
                                                                  {...provided.draggableProps}
                                                                  {...provided.dragHandleProps}
                                                                  className="flex gap-2 items-center bg-slate-100 rounded-md
                                                                  py-2 px-4 text-sm justify-between"
                                                            >
                                                                  <div className="flex gap-2 items-center">
                                                                        <GripVertical className="w-4 h-4 text-gray-500" />
                                                                        <p>{chapter.title}</p>
                                                                  </div>
                                                                  <div className="flex gap-2 items-center px-2 py-1">
                                                                        {chapter.isPublished ? (
                                                                              <p className="px-2 py-1 text-emerald-600">
                                                                                    Publicado
                                                                              </p>
                                                                        ) : (

                                                                              <p className="px-2 py-1 text-gray-700">
                                                                                    Sin Publicar
                                                                              </p>

                                                                        )}
                                                                        <div className="cursor-pointer" onClick={() => onEditChapter(chapter.id)}>
                                                                              <Pencil className="w-4 h-4 mr-2 text-gray-500" />
                                                                        </div>

                                                                  </div>
                                                            </div>
                                                      )}
                                                </Draggable>
                                          ))}
                                          {provided.placeholder}
                                    </div>
                              )}
                        </Droppable>
                  </DragDropContext>

            </div>

      )
}