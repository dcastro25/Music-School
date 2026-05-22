import { CourseCard } from "./CouseCard";
import { ListCourseProps } from "./ListCourse.type";

export function ListCourses({ course }: ListCourseProps) {
    if (course.length === 0) {
        return (
            <p className="px-6 mt-6 text-muted-foreground">
                No hay cursos creados
            </p>
        );
    }

    return (
        <div className="my-4 mx-6 border border-border/30 rounded-lg bg-background-secondary p-4 md:p-6">
            <div className="grid gap-y-6 gap-x-3 md:gap-5 grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 justify-items-center">
                {course.map((c) => (
                    <CourseCard key={c.id} course={c} />
                ))}
            </div>
        </div>
    );
}