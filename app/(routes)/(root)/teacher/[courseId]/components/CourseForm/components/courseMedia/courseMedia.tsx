"use client";

import { ImageIcon, Video } from "lucide-react";
import { useModules } from "../../hooks/useModules";
import { useTags } from "../../hooks/useTag";
import { CourseImageProps } from "./courseMedia.form";
import { useState } from "react";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function CourseMedia(props: CourseImageProps) {
    const { idCourse, imageCourse, onImageChange } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(imageCourse);
    const [isUploading, setIsUploading] = useState(false);

    const { modules } = useModules();
    const { tags } = useTags();

    const onChangeImage = async (imageUrl: string) => {
        setImage(imageUrl);

        // Solo guarda en BD si ya existe el curso
        if (idCourse) {
            try {
                await axios.patch(`/api/course/${idCourse}`, { imageUrl });
                toast.success("Imagen actualizada correctamente");
            } catch {
                toast.error("Error al guardar la imagen");
                return; // si falla el guardado, no propagamos el cambio hacia arriba
            }
        }

        // Notificamos siempre al padre (curso nuevo o existente) para
        // que su estado se mantenga sincronizado con lo que hay en BD.
        onImageChange?.(imageUrl);
    };

    return (
        <div className="space-y-6">
            {/* Card imagen */}
            <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                        Imagen de portada
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                        PNG, JPG · 4MB máx
                    </span>
                </div>

                {!isEditing ? (
                    <div className="group relative aspect-video bg-background overflow-hidden cursor-pointer">
                        <Image
                            src={image || "/img/default-image-course.webp"}
                            alt="portada del curso"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover opacity-45 group-hover:opacity-30 transition-all duration-200"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="flex flex-col items-center gap-2 bg-primary-text/10 hover:bg-primary/10 border border-primary/30 rounded-xl px-7 py-5 cursor-pointer text-primary transition-colors duration-150"
                            >
                                <ImageIcon className="h-6 w-6" />
                                <span className="text-sm text-white/70 font-medium">
                                    Cambiar imagen
                                </span>
                            </button>
                            <span className="text-xs text-white/70">
                                o arrastra una imagen aquí
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 space-y-3">
                        <div className="flex flex-col items-center gap-3 border border-dashed border-border/30 rounded-xl p-8 bg-background">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                                {isUploading ? (
                                    <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                                ) : (
                                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                )}
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-foreground mb-1">
                                    {isUploading
                                        ? "Subiendo imagen..."
                                        : "Arrastra tu imagen aquí"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {isUploading
                                        ? "Por favor espera"
                                        : "o selecciona un archivo"}
                                </p>
                            </div>
                            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border/30">
                                1280 × 720 px recomendado
                            </span>
                            <UploadButton<OurFileRouter, "imageUploader">
                                endpoint="imageUploader"
                                appearance={{
                                    button: "inline-flex items-center justify-center rounded-lg bg-transparent border border-primary/30 text-muted-foreground text-white/70 font-medium px-4 py-2 transition-all duration-200 ease-out hover:bg-primary/10 hover:border-primary/50 hover:-translate-y-[2px] active:translate-y-[1px] ut-uploading:opacity-50 ut-uploading:cursor-not-allowed",
                                    allowedContent: "hidden",
                                }}
                                content={{
                                    button({ ready, isUploading: uploading }) {
                                        if (uploading) return "Subiendo...";
                                        return ready
                                            ? "Seleccionar imagen"
                                            : "Cargando...";
                                    },
                                }}
                                onUploadBegin={() => setIsUploading(true)}
                                onClientUploadComplete={async (res) => {
                                    const url = res[0]?.ufsUrl;
                                    if (url) await onChangeImage(url);
                                    setIsUploading(false);
                                    setIsEditing(false);
                                }}
                                onUploadError={() => {
                                    toast.error("Error al subir la imagen");
                                    setIsUploading(false);
                                    setIsEditing(false);
                                }}
                            />
                        </div>
                        <Button
                            type="button"
                            disabled={isUploading}
                            onClick={() => setIsEditing(false)}
                            className="w-full py-2 text-sm text-muted-foreground bg-transparent border border-border/30 rounded-lg hover:bg-muted transition-colors"
                        >
                            {isUploading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Subiendo...
                                </span>
                            ) : (
                                "Cancelar"
                            )}
                        </Button>
                    </div>
                )}

                <div className="flex items-center gap-2 px-4 py-2 border-t border-border/30">
                    {isUploading ? (
                        <Loader2 className="h-3 w-3 text-muted-foreground animate-spin" />
                    ) : (
                        <span className="text-xs text-emerald-500">✓</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                        {isUploading
                            ? "Subiendo imagen..."
                            : image
                              ? "Imagen guardada"
                              : "Sin imagen — se usará la imagen por defecto"}
                    </span>
                </div>
            </div>
        </div>
    );
}
