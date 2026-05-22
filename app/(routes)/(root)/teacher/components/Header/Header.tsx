"use client"

import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { FormCreateCourse } from "./FormCreateCourse";

export function HeaderTeacher() {
    return (
        <div className=" flex border border-border/30 bg-background-secondary justify-between py-2 px-10">

            <p>Crear Nuevo curso</p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"default"}>
                        Crear Curso
                        <Plus />
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crea tu curso</DialogTitle>
                        <FormCreateCourse />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
