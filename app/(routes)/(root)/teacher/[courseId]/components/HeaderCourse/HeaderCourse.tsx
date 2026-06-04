"use client";
import { useRouter } from "next/navigation";
import { CourseForm } from "../CourseForm";

export function HeaderCourse() {
    const router = useRouter();

    return (
        <div>
            <CourseForm onSuccess={() => router.refresh()} />
        </div>
    );
}
