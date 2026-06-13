import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { ChapterVideoProps } from "./chapterVideo.types";
import { Loader2, Video } from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Button } from "@/components/ui/button";

export function ChapterVideo(props: ChapterVideoProps) {
    const { chapterId, courseId, videoUrl, onVideoChange, readOnly } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [video, setVideo] = useState(videoUrl);
    const [isUploading, setIsUploading] = useState(false);

    const onSubmit = async (url: string) => {
        setVideo(url);
        if (chapterId && courseId) {
            try {
                await axios.patch(
                    `/api/course/${courseId}/chapter/${chapterId}`,
                    { videoUrl: url },
                );
                toast.success("Video actualizado correctamente");
            } catch {
                toast.error("Error al guardar el video");
            }
        } else {
            onVideoChange?.(url);
        }
    };

    // Modo solo lectura
    if (readOnly) {
        return (
            <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                        Video del capítulo
                    </span>
                </div>
                {video ? (
                    <video
                        src={video}
                        controls
                        className="w-full"
                        style={{ height: "250px", objectFit: "cover" }}
                    />
                ) : (
                    <div
                        className="flex items-center justify-center bg-muted/30"
                        style={{ height: "60px" }}
                    >
                        <Video className="h-5 w-5 text-muted-foreground/40" />
                        <span className="text-xs text-muted-foreground ml-2">
                            Sin video
                        </span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
                <Video className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                    Video del capítulo
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                    MP4, WebM · 512GB máx
                </span>
            </div>

            {!isEditing ? (
                <div
                    className="group relative bg-background overflow-hidden cursor-pointer"
                    style={{ height: video ? "100" : "100px" }}
                    onClick={() => setIsEditing(true)}
                >
                    {video ? (
                        <video
                            src={video}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-200"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted/30">
                            <Video className="h-6 w-6 text-muted-foreground/40" />
                        </div>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            type="button"
                            className="flex flex-col items-center gap-2 bg-primary-text/10 hover:bg-primary/10 border border-primary/30 rounded-xl px-7 py-5 cursor-pointer text-primary transition-colors duration-150"
                        >
                            <Video className="h-6 w-6" />
                            <span className="text-sm text-white/70 font-medium">
                                {video ? "Cambiar video" : "Subir video"}
                            </span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-4 space-y-3">
                    <div className="flex flex-col items-center gap-3 border border-dashed border-border/30 rounded-xl p-8 bg-background">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                            {isUploading ? (
                                <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                            ) : (
                                <Video className="h-5 w-5 text-muted-foreground" />
                            )}
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-foreground mb-1">
                                {isUploading
                                    ? "Subiendo video..."
                                    : "Arrastra tu video aquí"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {isUploading
                                    ? "Por favor espera"
                                    : "o selecciona un archivo"}
                            </p>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border/30">
                            MP4 o WebM recomendado
                        </span>
                        <UploadButton<OurFileRouter, "chapterVideo">
                            endpoint="chapterVideo"
                            appearance={{
                                button: "inline-flex items-center justify-center rounded-lg bg-transparent border border-primary/30 text-muted-foreground text-white/70 font-medium px-4 py-2 transition-all duration-200 ease-out hover:bg-primary/10 hover:border-primary/50 hover:-translate-y-[2px] active:translate-y-[1px] ut-uploading:opacity-50 ut-uploading:cursor-not-allowed",
                                allowedContent: "hidden",
                            }}
                            content={{
                                button({ ready, isUploading: uploading }) {
                                    if (uploading) return "Subiendo...";
                                    return ready
                                        ? "Seleccionar video"
                                        : "Cargando...";
                                },
                            }}
                            onUploadBegin={() => setIsUploading(true)}
                            onClientUploadComplete={async (res) => {
                                const url = res[0]?.serverData?.url;
                                if (url) await onSubmit(url);
                                setIsUploading(false);
                                setIsEditing(false);
                            }}
                            onUploadError={() => {
                                toast.error("Error al subir el video");
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
                        ? "Subiendo video..."
                        : video
                          ? "Video guardado"
                          : "Sin video — sube uno para este capítulo"}
                </span>
            </div>
        </div>
    );
}
