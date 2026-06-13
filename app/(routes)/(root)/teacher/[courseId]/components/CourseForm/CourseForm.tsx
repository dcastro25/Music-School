"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { formSchema } from "./CourseForm.form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
    BookOpen,
    Plus,
    Trash2,
    GripVertical,
    Clock,
    Video,
    FileText,
    Settings,
    Eye,
    Save,
    Send,
    CheckCircle2,
    Globe,
    Award,
    Layers,
    Target,
} from "lucide-react";
import { SectionBasic } from "./sections";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CourseChapter } from "./components";
import { Chapter } from "@/app/generated/prisma/client";

type FormValues = z.infer<typeof formSchema>;

type Props = {
    course?: any;
    onSuccess?: () => void;
    onCourseCreated?: (course: any) => void;
};

export function CourseForm({ course, onSuccess, onCourseCreated }: Props) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("basic");

    const [hasCertificate, setHasCertificate] = useState(true);
    const [isPublic, setIsPublic] = useState(true);
    const [chapterList, setChapterList] = useState<Chapter[]>(
        course?.chapters ?? [],
    );
    const formProgress = 65;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            courseName: course?.courseName || "",
            category: course?.category || "",
            description: course?.description || "",
            price: course?.price ?? 0,
            duration: course?.duration || "",
            level: course?.level || "",
            imageUrl: course?.imageUrl || "",
            slug: course?.slug || "",
        },
    });

    useEffect(() => {
        if (course) {
            form.reset({
                courseName: course.courseName,
                category: course.category,
                description: course.description,
                price: course.price,
                duration: course.duration,
                level: course.level,
                imageUrl: course.imageUrl,
                slug: course.slug,
            });
        }
    }, [course]);

    const onSubmit = async (values: FormValues) => {
        try {
            if (course) {
                // ✏️ EDITAR
                await axios.patch(`/api/course/${course.id}`, values);
                toast.success("Curso actualizado ✏️");
                router.push("/teacher");
            } else {
                // ➕ CREAR
                const res = await axios.post("/api/course", values);
                const createdCourse = res.data?.course ?? res.data;

                // 👇 Vincular capítulos huérfanos
                const orphanChapters = chapterList.filter((c) => c.isDraft);

                await Promise.all(
                    orphanChapters.map((chapter) =>
                        axios.patch(`/api/course/${createdCourse.id}/chapter`, {
                            // 👈 FIX
                            chapterId: chapter.id,
                            courseId: createdCourse.id,
                        }),
                    ),
                );

                if (onCourseCreated && createdCourse) {
                    onCourseCreated(createdCourse);
                }

                toast.success("Curso creado 🎉");
            }

            router.refresh();
            onSuccess?.();
        } catch (error: any) {
            const message = error.response?.data;
            toast.error(
                typeof message === "string" ? message : "Error al guardar",
            );
        }
    };
    
    const onError = (errors: any) => {
        console.log("Errores de validación:", errors);
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                                <BookOpen className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h1>
                                    {course
                                        ? "Editar Curso"
                                        : "Crear Nuevo Curso"}
                                </h1>
                                <p className="text-xs text-muted-foreground">
                                    Completa todos los campos requeridos
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-2 rounded-full bg-muted/50 px-4 py-2">
                                <div className="text-sm text-muted-foreground">
                                    Progreso:
                                </div>
                                <Progress
                                    value={formProgress}
                                    className="w-24 h-2"
                                />
                                <span className="text-sm font-medium text-primary">
                                    {formProgress}%
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                            >
                                <Eye className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                    Vista previa
                                </span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                            >
                                <Save className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                    Guardar borrador
                                </span>
                            </Button>
                            <Button
                                type="submit"
                                form="course-form"
                                size="sm"
                                className="gap-2 bg-primary hover:bg-primary/90"
                            >
                                <Send className="h-4 w-4" />
                                <span>{course ? "Actualizar" : "Crear"}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <Form {...form}>
                    <form
                        id="course-form"
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                    >
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="space-y-8"
                        >
                            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 bg-muted/30 p-1 rounded-xl">
                                <TabsTrigger
                                    value="basic"
                                    className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                                >
                                    <BookOpen className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Básico
                                    </span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="content"
                                    className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
                                >
                                    <Layers className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Contenido
                                    </span>
                                </TabsTrigger>

                                <TabsTrigger
                                    value="settings"
                                    className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
                                >
                                    <Settings className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Ajustes
                                    </span>
                                </TabsTrigger>
                            </TabsList>

                            {/* Tab: Básico */}
                            <SectionBasic form={form} course={course} />

                            {/* Tab: Contenido */}
                            <TabsContent value="content" className="space-y-6">
                                <CourseChapter
                                    courseId={course?.id}
                                    chapters={chapterList}
                                    onChaptersChange={setChapterList}
                                />
                            </TabsContent>

                            {/* Tab: Ajustes */}
                            <TabsContent value="settings" className="space-y-6">
                                <div className="max-w-xl mx-auto">
                                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-foreground">
                                                <Globe className="h-5 w-5 text-primary" />
                                                Visibilidad
                                            </CardTitle>
                                            <CardDescription>
                                                Controla quién puede ver tu
                                                curso
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`p-2 rounded-lg ${isPublic ? "bg-emerald-500/10" : "bg-muted"}`}
                                                    >
                                                        <Globe
                                                            className={`h-5 w-5 ${isPublic ? "text-emerald-400" : "text-muted-foreground"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">
                                                            Curso Público
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Visible en el
                                                            catálogo
                                                        </p>
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={isPublic}
                                                    onCheckedChange={
                                                        setIsPublic
                                                    }
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm mt-6">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-foreground">
                                                <Award className="h-5 w-5 text-amber-400" />
                                                Certificado
                                            </CardTitle>
                                            <CardDescription>
                                                Recompensa a tus estudiantes
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/30">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`p-2 rounded-lg ${hasCertificate ? "bg-amber-500/10" : "bg-muted"}`}
                                                    >
                                                        <Award
                                                            className={`h-5 w-5 ${hasCertificate ? "text-amber-400" : "text-muted-foreground"}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">
                                                            Emitir Certificado
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Al completar el
                                                            curso
                                                        </p>
                                                    </div>
                                                </div>
                                                <Switch
                                                    checked={hasCertificate}
                                                    onCheckedChange={
                                                        setHasCertificate
                                                    }
                                                />
                                            </div>

                                            {hasCertificate && (
                                                <div className="p-4 rounded-xl bg-linear-to-br from-amber-500/5 to-primary/5 border border-amber-500/20">
                                                    <div className="aspect-video rounded-lg border border-dashed border-amber-500/30 bg-card/50 flex items-center justify-center">
                                                        <div className="text-center">
                                                            <Award className="h-12 w-12 text-amber-400 mx-auto mb-2" />
                                                            <p className="text-sm font-medium text-foreground">
                                                                Vista previa del
                                                                certificado
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Personaliza el
                                                                diseño
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </form>
                </Form>
            </main>
        </div>
    );
}
