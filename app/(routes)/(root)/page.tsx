
import { prisma } from "@/lib/prisma";
import { Footer } from "./Components/Footer";
import { HomeContent } from "./home";

export default async function Home() {
    const courses = await prisma.course.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <HomeContent courses={courses} />
            <Footer />
        </div>
    );
}