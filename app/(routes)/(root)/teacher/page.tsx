import { prisma } from "@/lib/prisma";

import { TeacherPageClient } from "./TeacherPageClient";

export default async function TeacherPage() {
    // const user = await currentUser();
    const courses = await prisma.course.findMany({
        // if (!user ){
        //     return <p>Not sing in</p>
        // }

        // where: {
        // userId:user.id,
        // },
    });

    return <TeacherPageClient initialCourses={courses} />;
}
