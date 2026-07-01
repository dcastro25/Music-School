import { Prisma } from "@/app/generated/prisma/client";
import type { CourseCategory } from "../../../../lib/courses";

export type { CourseCategory };

export type CourseWithChapters = Prisma.CourseGetPayload<{
    include: { chapters: true };
}>;

export type Category = {
    id: CourseCategory | "todos";
    label: string;
    icon: "sparkles" | "music" | "mic" | "book";
};

export interface CoursesClientProps {
    courses: CourseWithChapters[];
    categories: Category[];
}