"use client";
import { useRouter } from "next/navigation";
import { HeaderCourseProps } from "./HeaderCourse.type";
import { useState } from "react";
import { FormCourse } from "../CourseForm";


export function HeaderCourse(props: HeaderCourseProps) {
    const { idCourse, isPublished } = props;

    const [isLoading, setIsLoading] = useState();
    const route = useRouter;

    const [description, setDescription] = useState("");
    const [courseName, setCourseName] = useState("");

    return (
        <div>
            hola
            <FormCourse/>
        </div>
    );
}
