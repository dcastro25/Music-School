"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./FormCreateCourse.form";
import { toast } from "sonner";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { generateSlug } from "./SlugGenerator";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const inputStyle =
    "h-11 px-3 bg-background/80 border border-border/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-foreground/50 transition-all";
const selectStyle =
    "h-11 px-3 py-2 bg-background/80 border border-border/20 rounded-lg text-foreground focus:border-foreground/50 transition-all";
const sectionCard =
    "rounded-xl border border-border/20 bg-background/70 backdrop-blur-md p-6 space-y-6 shadow-sm";
const labelStyle = "text-sm text-foreground/80";
const errorInput = "border-destructive/60 focus:border-destructive";
const errorMessage =
    "flex items-center gap-2 mt-1 px-2 py-1.5 rounded-md bg-destructive/10 text-destructive text-sm";
const requiredBadge = "text-destructive ml-1";

const CATEGORIES = [
    { value: "instrumentos", label: "Instrumentos" },
    { value: "guitarra", label: "Guitarra" },
    { value: "piano", label: "Piano" },
    { value: "bateria", label: "Batería" },
    { value: "violin", label: "Violín" },
    { value: "bajo", label: "Bajo" },
    { value: "teoria", label: "Teoría musical" },
    { value: "solfeo", label: "Solfeo" },
    { value: "produccion", label: "Producción musical" },
    { value: "mezcla", label: "Mezcla y Masterización" },
    { value: "canto", label: "Canto" },
];

const DURATIONS = [
    { value: "2_semanas", label: "2 semanas" },
    { value: "1_mes", label: "1 mes" },
    { value: "3_meses", label: "3 meses" },
    { value: "6_meses", label: "6 meses" },
    { value: "12_meses", label: "12 meses" },
    { value: "personalizado", label: "Personalizado" },
];

const LEVELS = [
    { value: "principiante", label: "Principiante" },
    { value: "intermedio", label: "Intermedio" },
    { value: "avanzado", label: "Avanzado" },
    { value: "experto", label: "Experto" },
];

export function FormCreateCourse() {
    const router = useRouter();
    const [charCount, setCharCount] = useState(0);
    const [imagePreview, setImagePreview] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            courseName: "",
            category: "",
            description: "",
            price: "",
            duration: "",
            level: "",
            imageUrl: "",
            slug: "",
        },
    });

    const handleCourseNameChange = (value: string) => {
        form.setValue("courseName", value);
        const autoSlug = generateSlug(value);
        form.setValue("slug", autoSlug);
    };

    const handleDescriptionChange = (value: string) => {
        form.setValue("description", value);
        setCharCount(value.length);
    };

    const handleImageUrlChange = (value: string) => {
        form.setValue("imageUrl", value);
        if (value.trim()) {
            setImagePreview(value);
        } else {
            setImagePreview("");
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const rest = await axios.post("/api/course", values);
            toast.success("Curso creado correctamente 🎉");
            router.push(`/teacher/${rest.data.id}`);
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
        <div className="w-full max-w-5xl mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold">Crear curso</h1>
                <p className="text-muted-foreground mt-1">
                    Completa toda la información del curso de forma detallada
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    {/* INFORMACIÓN BÁSICA */}
                    <section className={sectionCard}>
                        <h2 className="text-lg font-semibold">
                            Información básica
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="courseName"
                                render={({ field, fieldState }) => {
                                    const hasError = !!fieldState.error;
                                    return (
                                        <FormItem>
                                            <FormLabel className={labelStyle}>
                                                Nombre del curso
                                                <span className={requiredBadge}>
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className={`${inputStyle} ${hasError ? errorInput : ""}`}
                                                    placeholder="Ej: Guitarra para principiantes"
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        handleCourseNameChange(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                El slug se genera
                                                automáticamente desde el nombre
                                            </p>
                                            {hasError && (
                                                <div className={errorMessage}>
                                                    ⚠{" "}
                                                    {fieldState.error?.message}
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field, fieldState }) => {
                                    const hasError = !!fieldState.error;
                                    return (
                                        <FormItem>
                                            <FormLabel className={labelStyle}>
                                                Categoría
                                                <span className={requiredBadge}>
                                                    *
                                                </span>
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={`${selectStyle} ${hasError ? errorInput : ""}`}
                                                    >
                                                        <SelectValue placeholder="Selecciona categoría" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {CATEGORIES.map((cat) => (
                                                        <SelectItem
                                                            key={cat.value}
                                                            value={cat.value}
                                                        >
                                                            {cat.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {hasError && (
                                                <div className={errorMessage}>
                                                    ⚠{" "}
                                                    {fieldState.error?.message}
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field, fieldState }) => {
                                const hasError = !!fieldState.error;
                                return (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>
                                            Descripción
                                            <span className={requiredBadge}>
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <textarea
                                                className={`w-full min-h-32 rounded-lg px-3 py-3 ${
                                                    hasError
                                                        ? "border-destructive/60"
                                                        : "border-border/20"
                                                } bg-background/80 border resize-none`}
                                                placeholder="Describe el contenido del curso, objetivos de aprendizaje..."
                                                value={field.value}
                                                onChange={(e) =>
                                                    handleDescriptionChange(
                                                        e.target.value,
                                                    )
                                                }
                                                maxLength={1000}
                                            />
                                        </FormControl>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {charCount}/1000 caracteres
                                        </p>
                                        {hasError && (
                                            <div className={errorMessage}>
                                                ⚠ {fieldState.error?.message}
                                            </div>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />
                    </section>

                    {/* DETALLES DEL CURSO */}
                    <section className={sectionCard}>
                        <h2 className="text-lg font-semibold">
                            Detalles del curso
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field, fieldState }) => {
                                    const hasError = !!fieldState.error;
                                    return (
                                        <FormItem>
                                            <FormLabel className={labelStyle}>
                                                Precio (COP)
                                                <span className={requiredBadge}>
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    className={`${inputStyle} ${hasError ? errorInput : ""}`}
                                                    placeholder="0"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {hasError && (
                                                <div className={errorMessage}>
                                                    ⚠{" "}
                                                    {fieldState.error?.message}
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field, fieldState }) => {
                                    const hasError = !!fieldState.error;
                                    return (
                                        <FormItem>
                                            <FormLabel className={labelStyle}>
                                                Duración
                                                <span className={requiredBadge}>
                                                    *
                                                </span>
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={`${selectStyle} ${hasError ? errorInput : ""}`}
                                                    >
                                                        <SelectValue placeholder="Selecciona duración" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {DURATIONS.map((dur) => (
                                                        <SelectItem
                                                            key={dur.value}
                                                            value={dur.value}
                                                        >
                                                            {dur.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {hasError && (
                                                <div className={errorMessage}>
                                                    ⚠{" "}
                                                    {fieldState.error?.message}
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="level"
                                render={({ field, fieldState }) => {
                                    const hasError = !!fieldState.error;
                                    return (
                                        <FormItem>
                                            <FormLabel className={labelStyle}>
                                                Nivel
                                                <span className={requiredBadge}>
                                                    *
                                                </span>
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={`${selectStyle} ${hasError ? errorInput : ""}`}
                                                    >
                                                        <SelectValue placeholder="Selecciona nivel" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {LEVELS.map((lvl) => (
                                                        <SelectItem
                                                            key={lvl.value}
                                                            value={lvl.value}
                                                        >
                                                            {lvl.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {hasError && (
                                                <div className={errorMessage}>
                                                    ⚠{" "}
                                                    {fieldState.error?.message}
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                    </section>

                    {/* IMAGEN Y SLUG */}
                    <section className={sectionCard}>
                        <h2 className="text-lg font-semibold">
                            Imagen y configuración
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field, fieldState }) => {
                                    const hasError = !!fieldState.error;
                                    return (
                                        <FormItem>
                                            <FormLabel className={labelStyle}>
                                                URL de imagen
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className={`${inputStyle} ${hasError ? errorInput : ""}`}
                                                    placeholder="https://ejemplo.com/imagen.jpg"
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        handleImageUrlChange(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Ingresa la URL completa de la
                                                imagen (JPG, PNG, GIF)
                                            </p>
                                            {hasError && (
                                                <div className={errorMessage}>
                                                    ⚠{" "}
                                                    {fieldState.error?.message}
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field, fieldState }) => {
                                    const hasError = !!fieldState.error;
                                    return (
                                        <FormItem>
                                            <FormLabel className={labelStyle}>
                                                Slug (URL amigable)
                                                <span className={requiredBadge}>
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className={`${inputStyle} ${hasError ? errorInput : ""}`}
                                                    placeholder="guitarra-principiantes"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Se genera automáticamente, pero
                                                puedes editarlo
                                            </p>
                                            {hasError && (
                                                <div className={errorMessage}>
                                                    ⚠{" "}
                                                    {fieldState.error?.message}
                                                </div>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>

                        {imagePreview && (
                            <div className="mt-6 p-4 rounded-lg border border-border/20 bg-background/50">
                                <p className="text-sm text-foreground/70 mb-3">
                                    Vista previa de la imagen:
                                </p>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full max-h-64 object-cover rounded-lg"
                                    onError={() => {
                                        toast.error(
                                            "No se pudo cargar la imagen",
                                        );
                                        setImagePreview("");
                                    }}
                                />
                            </div>
                        )}
                    </section>

                    {/* BOTONES */}
                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="flex-1"
                        >
                            {form.formState.isSubmitting
                                ? "Creando..."
                                : "Crear curso"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
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
