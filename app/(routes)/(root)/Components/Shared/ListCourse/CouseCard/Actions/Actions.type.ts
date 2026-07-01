
export type ActionsProps = {
    courseId: string;
    CourseName: string;
    isPublished: boolean;
    onPublishChange?: (state: boolean) => void; 
};