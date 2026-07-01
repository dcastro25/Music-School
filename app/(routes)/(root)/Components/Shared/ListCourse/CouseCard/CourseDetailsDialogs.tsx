"use client";

import { useState } from "react";
import Image from "next/image";
import {
    BookOpen,
    CheckCircle2,
    Clock,
    CreditCard,
    Lock,
    PlayCircle,
    ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "./CartContext";
import {
    getDurationLabel,
    getCourseImage,
    getLevelLabel,
} from "@/lib/course-helpers";

import type { CourseWithChapters } from "./CourseCard.type";

interface CourseDetailsDialogProps {
    course: CourseWithChapters;
    children: React.ReactNode;
}

export function CourseDetailsDialog({
    course,
    children,
}: CourseDetailsDialogProps) {
    const { addItem, isInCart } = useCart();
    const [open, setOpen] = useState(false);
    const inCart = isInCart(course.id);

    const totalMinutes = course.chapters.reduce((sum, c) => {
        const m = Number.parseInt(c.duration ?? "0");
        return sum + (Number.isNaN(m) ? 0 : m);
    }, 0);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="flex flex-col max-h-[90vh] gap-0 overflow-hidden p-0 sm:max-w-2xl">
                {/* Cover */}
                <div className="relative aspect-16/7 w-full overflow-hidden shrink-0">
                    <Image
                        src={getCourseImage(course.imageUrl)}
                        alt={course.courseName}
                        fill
                        sizes="(max-width: 640px) 100vw, 672px"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <Badge className="bg-primary text-primary-foreground">
                                {getLevelLabel(course.level)}
                            </Badge>
                        </div>
                        <DialogTitle className="text-balance text-xl font-bold text-white sm:text-2xl">
                            {course.courseName}
                        </DialogTitle>
                    </div>
                </div>

                {/* Contenido scrolleable */}
                <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
                    <DialogHeader className="mb-4 text-left">
                        <DialogDescription className="text-pretty text-sm leading-relaxed text-muted-foreground">
                            {course.description}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Stats */}
                    <div className="mb-6 grid grid-cols-2 gap-3">
                        <Stat
                            icon={Clock}
                            label="Duración"
                            value={getDurationLabel(course.duration)}
                        />
                        <Stat
                            icon={BookOpen}
                            label="Capítulos"
                            value={`${course.chapters.length}`}
                        />
                    </div>

                    {/* Chapters */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                                Contenido del curso
                            </h4>
                            {totalMinutes > 0 && (
                                <span className="text-xs text-muted-foreground">{`${course.chapters.length} capítulos · ${totalMinutes} min`}</span>
                            )}
                        </div>
                        <ul className="overflow-hidden rounded-xl border border-border">
                            {course.chapters.map((chapter) => (
                                <li
                                    key={chapter.id}
                                    className="flex items-start gap-3 border-b border-border bg-card px-3 py-3 last:border-b-0 sm:px-4"
                                >
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                                        {chapter.position}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="truncate text-sm font-medium text-foreground">
                                                {chapter.title}
                                            </p>
                                            {chapter.isFree && (
                                                <Badge
                                                    variant="secondary"
                                                    className="h-5 px-1.5 text-[10px]"
                                                >
                                                    Gratis
                                                </Badge>
                                            )}
                                        </div>
                                        {chapter.description && (
                                            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                                                {chapter.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
                                        <span className="text-xs">
                                            {chapter.duration}
                                        </span>
                                        {chapter.isFree ? (
                                            <PlayCircle className="h-4 w-4 text-primary" />
                                        ) : (
                                            <Lock className="h-3.5 w-3.5" />
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sticky footer with price + actions */}
                <div className="shrink-0 flex flex-col gap-3 border-t border-border bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div>
                        <span className="text-2xl font-bold text-primary">
                            {course.price
                                ? `$${course.price.toLocaleString("es-CO")}`
                                : "Gratis"}
                        </span>
                        {course.price && (
                            <span className="ml-1 text-sm text-muted-foreground">
                                COP
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="flex-1 font-semibold sm:flex-none"
                            onClick={() => addItem(course)}
                            disabled={inCart}
                        >
                            {inCart ? (
                                <>
                                    <CheckCircle2 className="h-4 w-4" />
                                    En el carrito
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="h-4 w-4" />
                                    Añadir al carrito
                                </>
                            )}
                        </Button>

                        <DialogClose asChild>
                            <Button className="flex-1 font-semibold shadow-lg shadow-primary/20 sm:flex-none">
                                <CreditCard className="h-4 w-4" />
                                Pagar ahora
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function Stat({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}) {
    return (
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-3 text-center">
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">{value}</span>
            <span className="text-[11px] text-muted-foreground">{label}</span>
        </div>
    );
}