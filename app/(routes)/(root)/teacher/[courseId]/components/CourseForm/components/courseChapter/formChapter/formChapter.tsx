"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react"; // 👈

import { formChapterProps } from "./formChapter.types";
import { formSchemaChapter } from "./formChapter.form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ChapterVideo } from "./chapterVideo/chapterVideo";

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

    const [videoUrl, setVideoUrl] = useState<string | null>(null); // 👈

    const form = useForm<z.infer<typeof formSchemaChapter>>({
        resolver: zodResolver(formSchemaChapter),
        defaultValues: {
            title: "",
            description: "",
            isFree: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchemaChapter>) => {
        try {
            const url = courseId
                ? `/api/course/${courseId}/chapter`
                : `/api/course/chapter`;

            const response = await axios.post(url, {
                title: values.title,
                description: values.description,
                isFree: values.isFree,
                videoUrl: videoUrl ?? null, // 👈
                courseId: courseId ?? null,
            });

            onChapterCreated(response.data);
            toast("Capítulo creado 🎉");
            setShowInputChapter(false);
            form.reset();
            router.refresh();
        } catch (error) {
            toast.error("Hubo un error");
        }
    };

    return (
        <Form {...form}>
            <div className="flex flex-col gap-3">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Nombre del capítulo"
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

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Descripción del capítulo"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isFree"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel className="mt-0">
                                Capítulo gratuito
                            </FormLabel>
                        </FormItem>
                    )}
                />

                {/* 👈 Video sin chapterId, solo captura la URL */}
                <ChapterVideo
                    videoUrl={videoUrl}
                    onVideoChange={(url) => setVideoUrl(url)}
                />

                <Button
                    type="button"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={!form.formState.isValid}
                >
                    Crear capítulo
                </Button>
            </div>
        </Form>
    );
}