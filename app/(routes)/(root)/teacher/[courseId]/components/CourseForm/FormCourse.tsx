"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { formSchema } from "./FormCourse.form";
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
import SectionBasic from "./SectionBasic";
import Sectiondetails from "./SectionDetails";
import { useModules } from "../../hooks/useModules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof formSchema>;

type Props = {
    course?: any;
    onSuccess?: () => void;
    onCourseCreated?: (course: any) => void;
};

export function CourseForm({ course, onSuccess, onCourseCreated }: Props) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("basic");
    const {
        addLesson,
        addModule,
        modules,
        removeLesson,
        removeModule,
        setModules,
    } = useModules();
    const [hasCertificate, setHasCertificate] = useState(true);
    const [isPublic, setIsPublic] = useState(true);
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
                router.push("/teacher")
            } else {
                // ➕ CREAR
                const res = await axios.post("/api/course", values);
                toast.success("Curso creado 🎉");

                const createdCourse = res.data?.course ?? res.data;

                if (onCourseCreated && createdCourse) {
                    onCourseCreated(createdCourse);
                }
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

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
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
                            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-muted/30 p-1 rounded-xl">
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
                                    value="details"
                                    className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
                                >
                                    <Target className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Detalles
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
                            <SectionBasic form={form} course={course}/>

                            {/* Tab: Contenido */}
                            <TabsContent value="content" className="space-y-6">
                                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-2 text-foreground">
                                                <Layers className="h-5 w-5 text-primary" />
                                                Estructura del Curso
                                            </CardTitle>
                                            <CardDescription>
                                                Organiza tu contenido en módulos
                                                y lecciones
                                            </CardDescription>
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={addModule}
                                            className="gap-2 bg-primary hover:bg-primary/90"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Añadir Módulo
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {modules.map((module, moduleIndex) => (
                                            <div
                                                key={module.id}
                                                className="rounded-xl border border-border/50 bg-muted/20 overflow-hidden"
                                            >
                                                <div className="flex items-center gap-3 p-4 bg-muted/30">
                                                    <button
                                                        type="button"
                                                        className="cursor-grab text-muted-foreground hover:text-foreground"
                                                    >
                                                        <GripVertical className="h-5 w-5" />
                                                    </button>
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary font-semibold text-sm">
                                                        {moduleIndex + 1}
                                                    </div>
                                                    <Input
                                                        value={module.title}
                                                        onChange={(e) =>
                                                            setModules(
                                                                modules.map(
                                                                    (m) =>
                                                                        m.id ===
                                                                        module.id
                                                                            ? {
                                                                                  ...m,
                                                                                  title: e
                                                                                      .target
                                                                                      .value,
                                                                              }
                                                                            : m,
                                                                ),
                                                            )
                                                        }
                                                        className="flex-1 bg-transparent border-none text-foreground font-medium focus-visible:ring-0 px-0"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-muted-foreground hover:text-destructive"
                                                        onClick={() =>
                                                            removeModule(
                                                                module.id,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                <div className="p-4 pt-2 space-y-2">
                                                    {module.lessons.map(
                                                        (
                                                            lesson,
                                                            lessonIndex,
                                                        ) => (
                                                            <div
                                                                key={lesson.id}
                                                                className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30 hover:border-border/50 transition-colors"
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="cursor-grab text-muted-foreground hover:text-foreground"
                                                                >
                                                                    <GripVertical className="h-4 w-4" />
                                                                </button>
                                                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-muted-foreground text-xs font-medium">
                                                                    {lessonIndex +
                                                                        1}
                                                                </div>
                                                                <div
                                                                    className={`p-1.5 rounded-md ${
                                                                        lesson.type ===
                                                                        "video"
                                                                            ? "bg-blue-500/10 text-blue-400"
                                                                            : lesson.type ===
                                                                                "text"
                                                                              ? "bg-amber-500/10 text-amber-400"
                                                                              : "bg-emerald-500/10 text-emerald-400"
                                                                    }`}
                                                                >
                                                                    {lesson.type ===
                                                                        "video" && (
                                                                        <Video className="h-4 w-4" />
                                                                    )}
                                                                    {lesson.type ===
                                                                        "text" && (
                                                                        <FileText className="h-4 w-4" />
                                                                    )}
                                                                    {lesson.type ===
                                                                        "quiz" && (
                                                                        <CheckCircle2 className="h-4 w-4" />
                                                                    )}
                                                                </div>
                                                                <Input
                                                                    value={
                                                                        lesson.title
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setModules(
                                                                            modules.map(
                                                                                (
                                                                                    m,
                                                                                ) =>
                                                                                    m.id ===
                                                                                    module.id
                                                                                        ? {
                                                                                              ...m,
                                                                                              lessons:
                                                                                                  m.lessons.map(
                                                                                                      (
                                                                                                          l,
                                                                                                      ) =>
                                                                                                          l.id ===
                                                                                                          lesson.id
                                                                                                              ? {
                                                                                                                    ...l,
                                                                                                                    title: e
                                                                                                                        .target
                                                                                                                        .value,
                                                                                                                }
                                                                                                              : l,
                                                                                                  ),
                                                                                          }
                                                                                        : m,
                                                                            ),
                                                                        )
                                                                    }
                                                                    className="flex-1 bg-transparent border-none text-sm focus-visible:ring-0 px-0 text-foreground"
                                                                />
                                                                <Select
                                                                    value={
                                                                        lesson.type
                                                                    }
                                                                    onValueChange={(
                                                                        value:
                                                                            | "video"
                                                                            | "text"
                                                                            | "quiz",
                                                                    ) =>
                                                                        setModules(
                                                                            modules.map(
                                                                                (
                                                                                    m,
                                                                                ) =>
                                                                                    m.id ===
                                                                                    module.id
                                                                                        ? {
                                                                                              ...m,
                                                                                              lessons:
                                                                                                  m.lessons.map(
                                                                                                      (
                                                                                                          l,
                                                                                                      ) =>
                                                                                                          l.id ===
                                                                                                          lesson.id
                                                                                                              ? {
                                                                                                                    ...l,
                                                                                                                    type: value,
                                                                                                                }
                                                                                                              : l,
                                                                                                  ),
                                                                                          }
                                                                                        : m,
                                                                            ),
                                                                        )
                                                                    }
                                                                >
                                                                    <SelectTrigger className="w-28 h-8 text-xs bg-muted/50 border-border/30">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="video">
                                                                            Video
                                                                        </SelectItem>
                                                                        <SelectItem value="text">
                                                                            Texto
                                                                        </SelectItem>
                                                                        <SelectItem value="quiz">
                                                                            Quiz
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                                                    <Clock className="h-3.5 w-3.5" />
                                                                    <Input
                                                                        type="number"
                                                                        value={
                                                                            lesson.duration
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            setModules(
                                                                                modules.map(
                                                                                    (
                                                                                        m,
                                                                                    ) =>
                                                                                        m.id ===
                                                                                        module.id
                                                                                            ? {
                                                                                                  ...m,
                                                                                                  lessons:
                                                                                                      m.lessons.map(
                                                                                                          (
                                                                                                              l,
                                                                                                          ) =>
                                                                                                              l.id ===
                                                                                                              lesson.id
                                                                                                                  ? {
                                                                                                                        ...l,
                                                                                                                        duration:
                                                                                                                            parseInt(
                                                                                                                                e
                                                                                                                                    .target
                                                                                                                                    .value,
                                                                                                                            ) ||
                                                                                                                            0,
                                                                                                                    }
                                                                                                                  : l,
                                                                                                      ),
                                                                                              }
                                                                                            : m,
                                                                                ),
                                                                            )
                                                                        }
                                                                        className="w-14 h-8 text-xs text-center bg-muted/50 border-border/30"
                                                                    />
                                                                    <span className="text-xs">
                                                                        min
                                                                    </span>
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                                    onClick={() =>
                                                                        removeLesson(
                                                                            module.id,
                                                                            lesson.id,
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </Button>
                                                            </div>
                                                        ),
                                                    )}
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full mt-2 gap-2 border-dashed border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50"
                                                        onClick={() =>
                                                            addLesson(module.id)
                                                        }
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                        Añadir Lección
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}

                                        {modules.length === 0 && (
                                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                                <div className="rounded-full bg-muted p-4 mb-4">
                                                    <Layers className="h-8 w-8 text-muted-foreground" />
                                                </div>
                                                <h3 className="text-lg font-medium text-foreground mb-1">
                                                    Sin módulos aún
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    Comienza creando tu primer
                                                    módulo
                                                </p>
                                                <Button
                                                    type="button"
                                                    onClick={addModule}
                                                    className="gap-2"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Crear Primer Módulo
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Tab: Detalles */}
                            <Sectiondetails />

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
