import { Chapter, UserProgress } from "@prisma/client"

export type ChapterCourseProps={

    chapters:Chapter[] | null
    courseSlug:string
    chapterCourse:string
    userProgress:UserProgress[]

}