"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ImageIcon, Upload, Video } from "lucide-react";
import { useModules } from "../../hooks/useModules";
import { useTags } from "../../hooks/useTag";

export function CourseMedia() {
    const { modules } = useModules();
    const { tags } = useTags();

    return (
        <div className="space-y-6">
            <Card className="border-background-secondary bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                        <ImageIcon className="h-5 w-5 text-primary" />
                        Imagen de Portada
                    </CardTitle>
                    <CardDescription>
                        La primera impresión es crucial
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="group relative aspect-video rounded-xl border-2 border-dashed border-border/50 bg-muted/30 hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer overflow-hidden">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                                <Upload className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-foreground">
                                    Arrastra o haz clic
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG hasta 5MB
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Recomendado: 1280x720px
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border/30 bg-background-secondary backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                        <Video className="h-5 w-5 text-accent" />
                        Video Promocional
                    </CardTitle>
                    <CardDescription>
                        Un video aumenta las conversiones
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="group relative aspect-video rounded-xl border-2 border-dashed border-border/50 bg-muted/30 hover:border-accent/50 hover:bg-muted/50 transition-all cursor-pointer overflow-hidden">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <div className="rounded-full bg-accent/10 p-4 group-hover:bg-accent/20 transition-colors">
                                <Video className="h-8 w-8 text-accent" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-foreground">
                                    Subir video
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    MP4, WebM hasta 100MB
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Duración: 2-5 minutos
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-border/50 bg-background-secondary backdrop-blur-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Vista Rápida
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Módulos
                        </span>
                        <span className="font-semibold text-foreground">
                            {modules.length}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Lecciones
                        </span>
                        <span className="font-semibold text-foreground">
                            {modules.reduce(
                                (acc, m) => acc + m.lessons.length,
                                0,
                            )}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Duración total
                        </span>
                        <span className="font-semibold text-foreground">
                            {modules.reduce(
                                (acc, m) =>
                                    acc +
                                    m.lessons.reduce(
                                        (a, l) => a + l.duration,
                                        0,
                                    ),
                                0,
                            )}{" "}
                            min
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Etiquetas
                        </span>
                        <span className="font-semibold text-foreground">
                            {tags.length}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
