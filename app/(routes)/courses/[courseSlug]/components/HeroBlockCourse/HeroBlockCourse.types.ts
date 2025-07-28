import { Chapter, Course } from "@prisma/client"

export type HeroBlockCourseProps={

      cuorse:Course & {chapters: Chapter[]}
      purchaseCourse:boolean
}