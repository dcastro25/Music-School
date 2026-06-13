"use client";

import { Suspense, useCallback, useState } from "react";
import { DataTable } from "./DataTable";
import { HeaderTeacher } from "./components/Header/Header";
import { Course } from "@/app/generated/prisma/client";

type TeacherPageClientProps = {
    initialCourses: Course[];
};

export function TeacherPageClient({ initialCourses }: TeacherPageClientProps) {
    const [courses, setCourses] = useState<Course[]>(initialCourses);

    const handleCourseCreated = useCallback((newCourse: Course) => {
        setCourses((prev) => [newCourse, ...prev]);
    }, []);

    return (
        <div>
            <HeaderTeacher onCourseCreated={handleCourseCreated} />
            <Suspense fallback={null}>
                {" "}
                <DataTable DataTable={courses} />
            </Suspense>
        </div>
    );
}
