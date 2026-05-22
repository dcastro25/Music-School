"use client";

import { useFormContext } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BookOpen } from "lucide-react";
import { CATEGORIES, FormValues } from "./FormCourse.form";

interface SectionBasicProps {
    charCount: number;
    onDescriptionChange: (val: string) => void;
    onCourseNameChange: (val: string) => void;
}

export function SectionBasic({
    charCount,
    onDescriptionChange,
    onCourseNameChange,
}: SectionBasicProps) {
    const form = useFormContext<FormValues>();

    return (
        <section className="rounded-xl border border-border bg-card p-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
                <BookOpen className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">
                    Información básica
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Nombre */}
                <FormField
                    control={form.control}
                    name="courseName"
                    render={({ field, fieldState }) => (
                        <FormItem className="space-y-1.5">
                            <FormLabel className="text-xs font-medium text-primary uppercase tracking-wide">
                                Nombre del curso{" "}
                                <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className={`h-10 bg-input border text-foreground placeholder:text-muted-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors ${
                                        fieldState.error
                                            ? "border-destructive"
                                            : "border-border"
                                    }`}
                                    placeholder="Ej: Guitarra para principiantes"
                                    value={field.value}
                                    onChange={(e) =>
                                        onCourseNameChange(e.target.value)
                                    }
                                />
                            </FormControl>
                            <p className="text-[11px] text-muted-foreground">
                                El slug se genera automáticamente desde el
                                nombre
                            </p>
                            {fieldState.error && (
                                <p className="text-[11px] text-destructive flex items-center gap-1">
                                    ⚠ {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />

                {/* Categoría */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field, fieldState }) => (
                        <FormItem className="space-y-1.5">
                            <FormLabel className="text-xs font-medium text-primary uppercase tracking-wide">
                                Categoría{" "}
                                <span className="text-destructive">*</span>
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger
                                        className={`h-10 bg-input border text-foreground rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-colors ${
                                            fieldState.error
                                                ? "border-destructive"
                                                : "border-border"
                                        }`}
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
                            {fieldState.error && (
                                <p className="text-[11px] text-destructive flex items-center gap-1">
                                    ⚠ {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />
            </div>

            {/* Descripción */}
            <FormField
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                    <FormItem className="space-y-1.5">
                        <FormLabel className="text-xs font-medium text-primary uppercase tracking-wide">
                            Descripción{" "}
                            <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                            <textarea
                                className={`w-full min-h-[140px] rounded-lg px-3 py-2.5 bg-input border text-foreground placeholder:text-muted-foreground resize-none text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                                    fieldState.error
                                        ? "border-destructive"
                                        : "border-border"
                                }`}
                                placeholder="Describe el contenido del curso, objetivos de aprendizaje..."
                                value={field.value}
                                onChange={(e) =>
                                    onDescriptionChange(e.target.value)
                                }
                                maxLength={1000}
                            />
                        </FormControl>
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] text-muted-foreground">
                                {charCount}/1000 caracteres
                            </p>
                            {charCount > 0 && (
                                <div className="h-1 w-24 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all"
                                        style={{
                                            width: `${(charCount / 1000) * 100}%`,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        {fieldState.error && (
                            <p className="text-[11px] text-destructive flex items-center gap-1">
                                ⚠ {fieldState.error.message}
                            </p>
                        )}
                    </FormItem>
                )}
            />
        </section>
    );
}
