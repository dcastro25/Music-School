import { prisma } from "@/lib/prisma";
import { CourseForm } from "./components/CourseForm";

type Props = {
    params: Promise<{
        courseId: string;
    }>;
};

export default async function CoursePage({ params }: Props) {

    const { courseId } = await params;

    if (!courseId) {
        return <p>ID no válido</p>;
    }

    const course = await prisma.course.findUnique({
        where: {
            id: courseId,
        },
        include: {
            chapters: true,
        },
    });

    if (!course) {
        return <p>Este curso no existe</p>;
    }

    return (
        <div className="m-6">
            <CourseForm course={course} />
        </div>
    );
}
