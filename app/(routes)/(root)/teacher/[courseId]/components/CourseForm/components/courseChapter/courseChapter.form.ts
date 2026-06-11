import { Chapter } from "@/app/generated/prisma/client";

export type CourseChapterProps = {
    courseId?: string;
    chapters: Chapter[];
    onChaptersChange: (chapters: Chapter[]) => void;
};

export type { Chapter };