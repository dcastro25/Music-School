"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { formChapterProps } from "./formChapter.types";
import { formSchemaChapter } from "./formChapter.form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChapterVideo } from "./chapterVideo/chapterVideo";
import { BookOpen, Check, X } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function FormChapter(props: formChapterProps) {
    const router = useRouter();
    const { setShowInputChapter, courseId, onChapterCreated } = props;
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchemaChapter>>({
        resolver: zodResolver(formSchemaChapter),
        defaultValues: { title: "", description: "" },
    });

    const onSubmit = async (values: z.infer<typeof formSchemaChapter>) => {
        try {
            setIsSubmitting(true);
            const url = courseId
                ? `/api/course/${courseId}/chapter`
                : `/api/course/chapter`;

            const response = await axios.post(url, {
                title: values.title,
                description: values.description,
                videoUrl: videoUrl ?? null,
                courseId: courseId ?? null,
            });

            onChapterCreated(response.data);
            toast.success("Capítulo creado 🎉");
            setShowInputChapter(false);
            form.reset();
            router.refresh();
        } catch {
            toast.error("Hubo un error al crear el capítulo");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`border rounded-xl bg-card border-border/50`}>
            {/* Header igual al capítulo */}
            <div className="flex items-center gap-3 p-3 border-b border-border/30">
                <div className="flex items-center justify-center w-5 h-5 shrink-0">
                    <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground shrink-0 wd-5">
                    {/* vacío para alinear con el número */}
                </span>
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        placeholder="Título del capítulo"
                                        className="border-0 bg-transparent px-0 focus-visible:ring-0 text-sm font-medium h-7"
                                        {...field}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
                <div className="flex items-center gap-1 shrink-0">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-emerald-500 hover:text-emerald-600"
                        disabled={!form.formState.isValid || isSubmitting}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        <Check className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowInputChapter(false)}
                    >
                        <X className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            {/* Contenido igual al capítulo expandido */}
            <div className="border-t border-border/30 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Descripción col-span-1 */}
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="bg-muted/30 rounded-lg border border-border/30 p-3 space-y-1">
                                    <FormLabel className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                        Descripción
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="¿Qué aprenderán en este capítulo?"
                                            className="border-0 bg-transparent px-0 focus-visible:ring-0 resize-none text-sm"
                                            rows={4}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>

                    {/* Video col-span-2 */}
                    <div className="md:col-span-1 bg-muted/30 rounded-lg border border-border/30 p-3 space-y-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                            Video
                        </p>
                        <ChapterVideo
                        
                        
                            videoUrl={videoUrl}
                            onVideoChange={(url) => setVideoUrl(url)}
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
