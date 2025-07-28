import { Chapter, Course } from "@prisma/client"

export type ListCourseProps={

      title:string
      courses:(Course & { chapters:Chapter[] })[] | null
}