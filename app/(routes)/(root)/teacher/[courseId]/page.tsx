import { prisma } from "@/lib/prisma";
import React from "react";
import { FormCreateCourse } from "../components/Header/FormCreateCourse";
import { CourseForm} from "./components/CourseForm";
// import { HeaderCourse } from "./components";



export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {

//   const { courseId } = params;

//   const course = await prisma.course.findUnique({
//     where: {
//       id: courseId,
//     },
//     include: {
//       chapters: true,
//     },
//   });

//   if (!course) {
//     return <p>Este Curso No Existe</p>;
//   }

  return (
    <div className="m-6">
      {/* <p>{courseId}</p> */}

      {/* aquí sí renderizas OTROS componentes */}
      {/* <HeaderCourse idCourse={courseId} isPublished={course.isPublished} /> */}

        <CourseForm/>
    </div>
  );
}

// import { CourseForm } from "./components/CourseForm";

// export default function CoursePage() {
//   return (
//     <div className="m-6">
//       <FormCreateCourse/
//     </div>
//   );
// }