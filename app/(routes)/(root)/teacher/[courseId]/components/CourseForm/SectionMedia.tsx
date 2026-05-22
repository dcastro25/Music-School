"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageIcon, Link } from "lucide-react";
import { toast } from "sonner";
import { FormValues } from "./FormCourse.form";

interface SectionMediaProps {
    imagePreview: string;
    onImageUrlChange: (val: string) => void;
}

export function SectionMedia({ imagePreview, onImageUrlChange }: SectionMediaProps) {
    const form = useFormContext<FormValues>();

    return (
        <section className="rounded-xl border border-border bg-card p-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
                <ImageIcon className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">Imagen y configuración</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* URL de imagen */}
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field, fieldState }) => (
                        <FormItem className="space-y-1.5">
                            <FormLabel className="text-xs font-medium text-primary uppercase tracking-wide">
                                URL de imagen
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                    <Input
                                        className={`h-10 pl-8 bg-input border text-foreground placeholder:text-muted-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors ${
                                            fieldState.error ? "border-destructive" : "border-border"
                                        }`}
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                        value={field.value}
                                        onChange={(e) => onImageUrlChange(e.target.value)}
                                    />
                                </div>
                            </FormControl>
                            <p className="text-[11px] text-muted-foreground">
                                Ingresa la URL completa de la imagen (JPG, PNG, GIF)
                            </p>
                            {fieldState.error && (
                                <p className="text-[11px] text-destructive flex items-center gap-1">
                                    ⚠ {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />

                {/* Slug */}
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field, fieldState }) => (
                        <FormItem className="space-y-1.5">
                            <FormLabel className="text-xs font-medium text-primary uppercase tracking-wide">
                                Slug <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className={`h-10 bg-input border text-foreground placeholder:text-muted-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors font-mono text-sm ${
                                        fieldState.error ? "border-destructive" : "border-border"
                                    }`}
                                    placeholder="guitarra-para-principiantes"
                                    {...field}
                                />
                            </FormControl>
                            <p className="text-[11px] text-muted-foreground">
                                Se genera automáticamente, pero puedes editarlo
                            </p>
                            {fieldState.error && (
                                <p className="text-[11px] text-destructive flex items-center gap-1">
                                    ⚠ {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />
            </div>

            {/* Preview */}
            {imagePreview && (
                <div className="rounded-lg border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/40 border-b border-border">
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">Vista previa</p>
                    </div>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full max-h-56 object-cover"
                        onError={() => {
                            toast.error("No se pudo cargar la imagen");
                            onImageUrlChange("");
                        }}
                    />
                </div>
            )}
        </section>
    );
}