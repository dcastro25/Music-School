"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { formChapterProps } from "./formChapter.types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(2, "Mínimo 2 caracteres").max(50),
});

export function FormChapter(props: formChapterProps) {
    const router = useRouter();

    const { setShowInputChapter, addModule, courseId, onChapterCreated } =
        props;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = courseId
                ? `/api/course/${courseId}/chapter`
                : `/api/course/chapter`;

            const response = await axios.post(url, {
                title: values.title,
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
            <div className="flex gap-2">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    placeholder="Nombre del capitulo"
                                    {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault(); // 👈 evita el submit del form padre
                                            e.stopPropagation(); // 👈 evita que el evento siga subiendo
                                            form.handleSubmit(onSubmit)(); // 👈 dispara el submit del capítulo
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="button"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={!form.formState.isValid}
                >
                    Crear
                </Button>
            </div>
        </Form>
    );
}
