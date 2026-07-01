
import { Prisma } from "@/app/generated/prisma/client"

export type CourseWithChapters = Prisma.CourseGetPayload<{
  include: {
    chapters: true
  }
}>

export type CourseCardProps = {
  course: CourseWithChapters
}