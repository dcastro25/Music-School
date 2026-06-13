"use client";

import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CourseForm } from "../../[courseId]/components/CourseForm";
import { useState } from "react";
import { Course } from "@/app/generated/prisma/client";

type HeaderTeacherProps = {
    onCourseCreated?: (course: Course) => void;
};

export function HeaderTeacher({ onCourseCreated }: HeaderTeacherProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex border border-border/30 bg-background-secondary justify-between py-2 px-10">
            <p>Crear Nuevo curso</p>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default">
                        Crear Curso
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Crea tu curso</DialogTitle>
                    </DialogHeader>
                    <CourseForm
                        onSuccess={() => setOpen(false)}
                        onCourseCreated={onCourseCreated}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
