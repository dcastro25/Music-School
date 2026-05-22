"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Loader2 } from "lucide-react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { formSchema, FormValues } from "./FormCourse.form";
import { generateSlug } from "./SlugGenerator";
import { SectionBasic } from "./SectionBasic";
import { SectionDetails } from "./SectionDetails";
import { SectionMedia } from "./SectionMedia";

export function FormCourse() {
    const router = useRouter();
    const [charCount,    setCharCount]    = useState(0);
    const [imagePreview, setImagePreview] = useState("");

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            courseName:  "",
            category:    "",
            description: "",
            price:       "",
            duration:    "",
            level:       "",
            imageUrl:    "",
            slug:        "",
        },
    });

    const handleCourseNameChange = (value: string) => {
        form.setValue("courseName", value);
        form.setValue("slug", generateSlug(value));
    };

    const handleDescriptionChange = (value: string) => {
        form.setValue("description", value);
        setCharCount(value.length);
    };

    const handleImageUrlChange = (value: string) => {
        form.setValue("imageUrl", value);
        setImagePreview(value.trim());
    };

    const onSubmit = async (values: FormValues) => {
        try {
            const res = await axios.post("/api/course", values);
            toast.success("Curso creado correctamente 🎉");
            router.push(`/teacher/${res.data.id}`);
        } catch (error: any) {
            const message = error.response?.data;
            toast.error(
                typeof message === "string" && message.length > 0
                    ? message
                    : "Ha ocurrido un error inesperado",
            );
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-10">
            {/* Encabezado */}
            <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Crear curso</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Completa toda la información del curso de forma detallada
                    </p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <SectionBasic
                        charCount={charCount}
                        onDescriptionChange={handleDescriptionChange}
                        onCourseNameChange={handleCourseNameChange}
                    />
                    <SectionDetails />
                    <SectionMedia
                        imagePreview={imagePreview}
                        onImageUrlChange={handleImageUrlChange}
                    />

                    {/* Botones */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                        >
                            {form.formState.isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creando...
                                </span>
                            ) : (
                                "Crear curso"
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 px-6"
                            onClick={() => router.back()}
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}