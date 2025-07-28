
import {
      Breadcrumb,
      BreadcrumbItem,
      BreadcrumbLink,
      BreadcrumbList,
      BreadcrumbPage,
      BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import { BreadCrumbCourseProps } from "./BreadCrumCourse.types";

export function BreadCrumbCourse(props: BreadCrumbCourseProps) {

      const { title } = props

      return (
            <div>
                  <Breadcrumb>
                        <BreadcrumbList>
                              <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                              </BreadcrumbItem>
                              <BreadcrumbSeparator />
                              <BreadcrumbItem>
                                    <BreadcrumbLink href="/courses">Cursos</BreadcrumbLink>
                              </BreadcrumbItem>
                              <BreadcrumbSeparator />
                              <BreadcrumbItem>
                                    <BreadcrumbPage>{title}</BreadcrumbPage>
                              </BreadcrumbItem>
                        </BreadcrumbList>
                  </Breadcrumb>

            </div>
      )
}