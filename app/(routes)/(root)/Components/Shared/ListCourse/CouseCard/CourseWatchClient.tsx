"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import {
    CheckCircle2,
    Circle,
    Clock,
    Lock,
    PlayCircle,
    ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDurationLabel, getLevelLabel } from "@/lib/course-helpers";
import { cn } from "@/lib/utils";

import type { CourseWatchClientProps } from "./courseWatch.types";

export function CourseWatchClient({
    course,
    chapters,
    currentChapterId,
    hasPurchased,
}: CourseWatchClientProps) {
    const sortedChapters = [...chapters].sort(
        (a, b) => a.position - b.position,
    );

    const currentChapter =
        sortedChapters.find((c) => c.id === currentChapterId) ??
        sortedChapters[0];

    const [completedIds, setCompletedIds] = useState<Set<string>>(
        () =>
            new Set(
                sortedChapters.filter((c) => c.isCompleted).map((c) => c.id),
            ),
    );
    const [isUpdating, setIsUpdating] = useState(false);

    // Guard: si el curso no tiene capítulos, currentChapter viene undefined.
    if (!currentChapter) {
        return (
            <div className="rounded-2xl border border-border/60 bg-card p-10 text-center text-sm text-muted-foreground">
                Este curso aún no tiene capítulos disponibles.
            </div>
        );
    }

    const isCurrentLocked = !currentChapter.isFree && !hasPurchased;
    const isCurrentCompleted = completedIds.has(currentChapter.id);

    const currentIndex = sortedChapters.findIndex(
        (c) => c.id === currentChapter.id,
    );
    const nextChapter = sortedChapters[currentIndex + 1];

    const completedCount = completedIds.size;
    const totalCount = sortedChapters.length;
    const progressPercent =
        totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    async function toggleCompleted() {
        if (isCurrentLocked || isUpdating) return;

        const nextValue = !isCurrentCompleted;
        setIsUpdating(true);

        // Optimista: actualizamos la UI antes de la respuesta del servidor
        setCompletedIds((prev) => {
            const next = new Set(prev);
            if (nextValue) next.add(currentChapter.id);
            else next.delete(currentChapter.id);
            return next;
        });

        try {
            await axios.patch(
                `/api/course/${course.id}/chapter/${currentChapter.id}/progress`,
                { isCompleted: nextValue },
            );
            toast.success(
                nextValue ? "Capítulo completado" : "Marcado como pendiente",
            );
        } catch {
            // revertir si falla
            setCompletedIds((prev) => {
                const next = new Set(prev);
                if (nextValue) next.delete(currentChapter.id);
                else next.add(currentChapter.id);
                return next;
            });
            toast.error("No se pudo actualizar el progreso");
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="flex flex-wrap">
                {/* Video */}
                <div className="flex-1 min-w-0 basis-[420px]">
                    <div className="relative aspect-video bg-black">
                        {isCurrentLocked ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/90 px-6 text-center">
                                <Lock className="h-8 w-8 text-white/70" />
                                <p className="text-sm font-medium text-white">
                                    Este capítulo es exclusivo para estudiantes
                                    inscritos
                                </p>
                                <Button
                                    size="sm"
                                    className="mt-1 font-semibold"
                                    asChild
                                >
                                    <Link href={`/cursos/${course.slug}`}>
                                        <ShoppingCart className="h-4 w-4" />
                                        Comprar curso
                                    </Link>
                                </Button>
                            </div>
                        ) : currentChapter.videoUrl ? (
                            <video
                                key={currentChapter.id}
                                src={currentChapter.videoUrl}
                                controls
                                className="h-full w-full"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircle className="h-10 w-10 text-white/30" />
                            </div>
                        )}
                    </div>

                    <div className="p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h2 className="text-base font-bold text-foreground sm:text-lg">
                                    {currentChapter.title}
                                </h2>
                                {currentChapter.description && (
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                        {currentChapter.description}
                                    </p>
                                )}
                            </div>
                            <Button
                                variant={
                                    isCurrentCompleted ? "outline" : "default"
                                }
                                size="sm"
                                disabled={isCurrentLocked || isUpdating}
                                onClick={toggleCompleted}
                                className="shrink-0 font-semibold"
                            >
                                {isCurrentCompleted ? (
                                    <>
                                        <CheckCircle2 className="h-4 w-4" />
                                        Completado
                                    </>
                                ) : (
                                    "Marcar como completado"
                                )}
                            </Button>
                        </div>

                        {nextChapter && (
                            <div className="mt-3 flex justify-end">
                                <Button size="sm" variant="secondary" asChild>
                                    <Link
                                        href={`/cursos/${course.slug}?chapter=${nextChapter.id}`}
                                    >
                                        Siguiente capítulo
                                        <PlayCircle className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Lista de capítulos */}
                <div className="flex w-full flex-col border-t border-border/60 sm:w-[320px] sm:border-l sm:border-t-0">
                    <div className="border-b border-border/60 p-4">
                        <p className="mb-2 text-sm font-semibold text-foreground">
                            Contenido del curso
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 flex-1 rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary transition-all"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {completedCount}/{totalCount}
                            </span>
                        </div>
                    </div>

                    <ul className="max-h-[460px] overflow-y-auto">
                        {sortedChapters.map((chapter) => {
                            const isActive = chapter.id === currentChapter.id;
                            const isCompleted = completedIds.has(chapter.id);
                            const isLocked = !chapter.isFree && !hasPurchased;

                            return (
                                <li
                                    key={chapter.id}
                                    className="border-b border-border/60 last:border-b-0"
                                >
                                    <Link
                                        href={`/cursos/${course.slug}?chapter=${chapter.id}`}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 transition-colors",
                                            isActive
                                                ? "border-l-2 border-l-primary bg-primary/10"
                                                : "hover:bg-muted/50",
                                        )}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                                        ) : isLocked ? (
                                            <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                        ) : (
                                            <Circle
                                                className={cn(
                                                    "h-4 w-4 shrink-0",
                                                    isActive
                                                        ? "text-primary"
                                                        : "text-muted-foreground",
                                                )}
                                            />
                                        )}
                                        <span
                                            className={cn(
                                                "min-w-0 flex-1 truncate text-sm",
                                                isActive
                                                    ? "font-semibold text-primary"
                                                    : isLocked
                                                      ? "text-muted-foreground"
                                                      : "text-foreground",
                                            )}
                                        >
                                            {chapter.title}
                                        </span>
                                        {chapter.duration && (
                                            <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                {chapter.duration}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center justify-between border-t border-border/60 p-3 text-xs text-muted-foreground">
                        <span>{getLevelLabel(course.level)}</span>
                        <span>{getDurationLabel(course.duration)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}