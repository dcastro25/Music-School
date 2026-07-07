import { prisma } from "@/lib/prisma";
import { HomeContent } from "./home";

export default async function Home() {
    const courses = await prisma.course.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        include: { chapters: true },
    });

    return (
        <div>
            <HomeContent courses={courses} />
        </div>
    );
}   