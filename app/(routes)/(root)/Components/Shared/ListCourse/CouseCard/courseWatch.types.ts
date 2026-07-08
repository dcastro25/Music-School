export type ChapterWithProgress = {
    id: string;
    title: string;
    description: string | null;
    videoUrl: string | null;
    position: number;
    isFree: boolean;
    duration: string | null;
    isCompleted: boolean;
};

export type CourseWatchData = {
    id: string;
    slug: string;
    courseName: string;
    description: string | null;
    level: string;
    duration: string;
    imageUrl: string | null;
};

export interface CourseWatchClientProps {
    course: CourseWatchData;
    chapters: ChapterWithProgress[];
    currentChapterId: string;
    // true si existe un Purchase de este usuario para este curso
    hasPurchased: boolean;
}