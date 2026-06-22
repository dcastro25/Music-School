// app/myCourses/page.tsx
import { prisma } from "@/lib/prisma";
import { CourseCard } from "../teacher/ListCourse/CouseCard/CourseCard"; 

export default async function MyCourse() {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="grid gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}