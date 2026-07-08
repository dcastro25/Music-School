import { prisma } from "@/lib/prisma";

import { TeacherPageClient } from "./TeacherPageClient";
import { currentUser } from "@clerk/nextjs/server";

export default async function TeacherPage() {
    const user = await currentUser();
    if (!user) {
        return <p>Not sing in</p>;
    }
    const courses = await prisma.course.findMany({
        // where: {
        // userId:user.id,
        // },
    });

    return <TeacherPageClient initialCourses={courses} />;
}
