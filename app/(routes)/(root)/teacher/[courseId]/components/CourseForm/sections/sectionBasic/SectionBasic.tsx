import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { generateSlug } from "../../utiils";

import { FormValues } from "../../CourseForm.form";
import { CourseChapter, CourseMedia } from "../../components";
import { CoursePrice } from "../../components";
import { useState } from "react";
import { Chapter } from "@/app/generated/prisma/client"; 

type Props = {
    form: UseFormReturn<FormValues>;
    course?: {
        id?: string;
        imageUrl?: string | null;
        price?: number | null;
        isFree?: boolean | null;
        chapters?: Chapter[];
    };
        chapterList: Chapter[];
    onChaptersChange: (chapters: Chapter[]) => void;
};

export function SectionBasic({ form, course, chapterList, onChaptersChange, }: Props) {

    return (
        <TabsContent value="basic" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">

                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-border/50 bg-background-secondary backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary/90">
                                <Sparkles className="h-5 w-5 text-primary" />
                                Información Principal
                            </CardTitle>
                            <CardDescription>
                                Define los datos básicos de tu curso
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            <FormField
                                control={form.control}
                                name="courseName"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <Label
                                            htmlFor="title"
                                            className="text-sm font-medium text-primary/80"
                                        >
                                            Título del Curso{" "}
                                            <span className="text-rose-400">
                                                *
                                            </span>
                                        </Label>
                                        <FormControl>
                                            <Input
                                                id="title"
                                                placeholder="Ej: Domina la Acordeon desde Cero"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    form.setValue(
                                                        "slug",
                                                        generateSlug(
                                                            e.target.value,
                                                        ),
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        <p className="text-xs text-primary-text">
                                            Máximo 100 caracteres. Sé claro y
                                            descriptivo.
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <Label
                                            htmlFor="description"
                                            className="text-sm font-medium text-foreground"
                                        >
                                            Descripción Completa{" "}
                                            <span className="text-rose-400">
                                                *
                                            </span>
                                        </Label>
                                        <FormControl>
                                            <Textarea
                                                id="description"
                                                placeholder="Describe detalladamente qué aprenderán los estudiantes..."
                                                className="min-h-40 bg-background-secondary"
                                                {...field}
                                            />
                                        </FormControl>
                                        <p className="text-xs text-primary-text">
                                            Mínimo 200 caracteres. Incluye
                                            palabras clave relevantes.
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid gap-6 sm:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <Label className="text-sm font-medium text-foreground">
                                                Categoría{" "}
                                                <span className="text-rose-400">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-background-secondary border-border/10 hover:border-ring focus:ring-primary/10">
                                                        <SelectValue placeholder="Selecciona categoría" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="instrumentos">
                                                        Instrumentos
                                                    </SelectItem>
                                                    <SelectItem value="canto">
                                                        Canto
                                                    </SelectItem>
                                                    <SelectItem value="teoria">
                                                        Teoría y Composición
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <Label className="text-sm font-medium text-foreground">
                                                Duración{" "}
                                                <span className="text-rose-400">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-background-secondary border-border/10 hover:border-ring focus:ring-primary/10">
                                                        <SelectValue placeholder="Selecciona duración" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="2_semanas">
                                                        2 semanas
                                                    </SelectItem>
                                                    <SelectItem value="1_mes">
                                                        1 mes
                                                    </SelectItem>
                                                    <SelectItem value="3_meses">
                                                        3 meses
                                                    </SelectItem>
                                                    <SelectItem value="6_meses">
                                                        6 meses
                                                    </SelectItem>
                                                    <SelectItem value="12_meses">
                                                        12 meses
                                                    </SelectItem>
                                                    <SelectItem value="personalizado">
                                                        Personalizado
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="level"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <Label className="text-sm font-medium text-foreground">
                                                Nivel{" "}
                                                <span className="text-rose-400">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-background-secondary border-border/10 hover:border-ring focus:ring-primary/10">
                                                        <SelectValue placeholder="Selecciona nivel" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="beginner">
                                                        Principiante
                                                    </SelectItem>
                                                    <SelectItem value="intermediate">
                                                        Intermedio
                                                    </SelectItem>
                                                    <SelectItem value="advanced">
                                                        Avanzado
                                                    </SelectItem>
                                                    <SelectItem value="expert">
                                                        Experto
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-3">
                    <CourseMedia
                        imageCourse={form.watch("imageUrl")}
                        onImageChange={(url: string) =>
                            form.setValue("imageUrl", url)
                        }
                    />
                    <CoursePrice
                        courseId={course?.id}
                        initialPrice={course?.price ?? 0}
                        initialIsFree={course?.isFree ?? false}
                        onPriceChange={(p) => form.setValue("price", p)}
                    />
                </div>

            </div>
            <CourseChapter
                courseId={course?.id}
                chapters={chapterList}
                onChaptersChange={onChaptersChange}  
            />
        </TabsContent>
    );
}
