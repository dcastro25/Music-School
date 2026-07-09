"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    ListVideo,
    Lock,
    PlayCircle,
    ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    getCourseImage,
    getDurationLabel,
    getLevelLabel,
} from "@/lib/course-helpers";
import { cn } from "@/lib/utils";

import type { CourseWatchClientProps } from "./courseWatch.types";

export function CourseWatchClient({
    course,
    chapters,
    currentChapterId,
    hasPurchased,
}: CourseWatchClientProps) {
    const sortedChapters = useMemo(
        () => [...chapters].sort((a, b) => a.position - b.position),
        [chapters],
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
    const prevChapter = sortedChapters[currentIndex - 1];
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
        <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4">
                <Link
                    href="/cursos"
                    className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a cursos
                </Link>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="relative hidden h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border/60 sm:block">
                            <Image
                                src={getCourseImage(course.imageUrl)}
                                alt={course.courseName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                <span className="font-medium text-foreground">
                                    {getLevelLabel(course.level)}
                                </span>
                                <span aria-hidden>·</span>
                                <span className="inline-flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {getDurationLabel(course.duration)}
                                </span>
                            </div>
                            <h1 className="truncate text-lg font-bold text-foreground sm:text-xl">
                                {course.courseName}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:w-52 sm:shrink-0">
                        <div className="h-1.5 flex-1 rounded-full bg-muted">
                            <div
                                className="h-full rounded-full bg-primary transition-all duration-500"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                            {progressPercent}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Video */}
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
                <div className="relative aspect-video bg-black">
                    {isCurrentLocked ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/90 px-6 text-center backdrop-blur-sm">
                            <Lock className="h-8 w-8 text-white/70" />
                            <p className="max-w-xs text-sm font-medium text-white">
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

                <div className="p-4 sm:p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Capítulo {currentChapter.position} de {totalCount}
                    </span>
                    <h2 className="mt-0.5 text-lg font-bold leading-snug text-foreground sm:text-xl">
                        {currentChapter.title}
                    </h2>

                    {currentChapter.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {currentChapter.description}
                        </p>
                    )}

                    {/* Marcar como completado */}
                    <div
                        className={cn(
                            "mt-5 flex flex-col items-start justify-between gap-3 rounded-xl border p-3.5 transition-colors sm:flex-row sm:items-center sm:p-4",
                            isCurrentCompleted
                                ? "border-green-500/30 bg-green-500/5"
                                : "border-border/60 bg-muted/30",
                        )}
                    >
                        <div className="flex items-center gap-2.5">
                            <span
                                className={cn(
                                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                                    isCurrentCompleted
                                        ? "bg-green-500/15 text-green-600"
                                        : "bg-muted text-muted-foreground",
                                )}
                            >
                                <CheckCircle2 className="h-4.5 w-4.5" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground">
                                    {isCurrentCompleted
                                        ? "¡Capítulo completado!"
                                        : "¿Ya terminaste este capítulo?"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {isCurrentCompleted
                                        ? "Puedes quitarlo si aún no lo terminas del todo"
                                        : "Márcalo para llevar tu progreso al día"}
                                </p>
                            </div>
                        </div>

                        <Button
                            variant={isCurrentCompleted ? "outline" : "default"}
                            size="sm"
                            disabled={isCurrentLocked || isUpdating}
                            onClick={toggleCompleted}
                            className={cn(
                                "w-full shrink-0 font-semibold sm:w-auto",
                                isCurrentCompleted &&
                                    "border-green-500/40 text-green-600 hover:bg-green-500/10 hover:text-green-600",
                            )}
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

                    {/* Navegación */}
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                        {prevChapter ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="font-medium text-muted-foreground"
                                asChild
                            >
                                <Link
                                    href={`/cursos/${course.slug}?chapter=${prevChapter.id}`}
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Anterior
                                </Link>
                            </Button>
                        ) : (
                            <span className="flex items-center gap-1 px-3 text-sm font-medium text-muted-foreground/40">
                                <ArrowLeft className="h-4 w-4" />
                                Anterior
                            </span>
                        )}

                        {nextChapter ? (
                            <Button
                                variant="outline"
                                size="sm"
                                className="font-medium"
                                asChild
                            >
                                <Link
                                    href={`/cursos/${course.slug}?chapter=${nextChapter.id}`}
                                >
                                    Siguiente
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        ) : (
                            <span className="flex items-center gap-1 px-3 text-sm font-medium text-muted-foreground/40">
                                Siguiente
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Contenido del curso, debajo del video */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
                <div className="flex items-center justify-between gap-2 border-b border-border/60 p-4 sm:p-5">
                    <div className="flex items-center gap-2">
                        <ListVideo className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-semibold text-foreground">
                            Contenido del curso
                        </p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                        {completedCount}/{totalCount} completados
                    </span>
                </div>

                <ul className="divide-y divide-border/60">
                    {sortedChapters.map((chapter) => {
                        const isActive = chapter.id === currentChapter.id;
                        const isCompleted = completedIds.has(chapter.id);
                        const isLocked = !chapter.isFree && !hasPurchased;

                        return (
                            <li key={chapter.id}>
                                <Link
                                    href={`/cursos/${course.slug}?chapter=${chapter.id}`}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 transition-colors sm:px-5",
                                        isActive
                                            ? "bg-muted/50"
                                            : "hover:bg-muted/30",
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                                            isCompleted
                                                ? "bg-green-500/15 text-green-600"
                                                : isActive
                                                  ? "bg-foreground text-background"
                                                  : "bg-muted text-muted-foreground",
                                        )}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                        ) : isLocked ? (
                                            <Lock className="h-3 w-3" />
                                        ) : (
                                            chapter.position
                                        )}
                                    </span>

                                    <span
                                        className={cn(
                                            "min-w-0 flex-1 truncate text-sm",
                                            isActive
                                                ? "font-semibold text-foreground"
                                                : isLocked
                                                  ? "text-muted-foreground"
                                                  : "text-foreground/90",
                                        )}
                                    >
                                        {chapter.title}
                                    </span>

                                    {chapter.duration && (
                                        <span className="shrink-0 text-xs text-muted-foreground">
                                            {chapter.duration}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
