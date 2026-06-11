import { Chapter } from "@/app/generated/prisma/client";

export type formChapterProps = {
    setShowInputChapter: (value: boolean) => void;
    addModule: (title: string) => void;
    courseId?: string;
    onChapterCreated: (newChapter: Chapter) => void; // 👈 nueva propiedad
}