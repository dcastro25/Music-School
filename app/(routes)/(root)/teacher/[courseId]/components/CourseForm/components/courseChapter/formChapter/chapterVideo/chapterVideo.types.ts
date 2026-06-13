export type ChapterVideoProps = {
    chapterId?: string;
    courseId?: string;
    videoUrl?: string | null;
    onVideoChange?: (url: string) => void; 
};