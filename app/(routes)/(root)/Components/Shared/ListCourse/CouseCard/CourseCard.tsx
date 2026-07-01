"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BookOpen, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseDetailsDialog } from "./CourseDetailsDialogs";
import {
    getDurationLabel,
    getCourseImage,
    getLevelLabel,
} from "@/lib/course-helpers";

import type { CourseWithChapters } from "./CourseCard.type";
import { cn } from "@/lib/utils";

function useScrollReveal(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}

interface CourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
    course: CourseWithChapters;
    index?: number;
}

export function CourseCard({
    course,
    index = 0,
    className,
    ...props
}: CourseCardProps) {
    const {
        courseName,
        price,
        level,
        imageUrl,
        description,
        duration,
        chapters,
    } = course;

    const [isHovered, setIsHovered] = useState(false);
    const { ref, isVisible } = useScrollReveal(0.1);

    return (
        <div
            ref={ref}
            {...props}
            className={cn(
                "group relative bg-card rounded-xl sm:rounded-2xl border border-border/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 w-full flex flex-col h-full min-w-0",
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                className,
            )}
            style={{ transitionDelay: `${index * 80}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* IMAGE */}
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={getCourseImage(imageUrl)}
                    alt={courseName}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
                    className={`object-cover transition-all duration-700 ${
                        isHovered ? "scale-110 brightness-90" : "scale-100"
                    }`}
                />

                <div
                    className={`absolute inset-0 bg-black/60 items-center justify-center transition-opacity duration-500 hidden sm:flex ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}
                >
                </div>

                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-card/90 text-white/90 backdrop-blur-sm text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md">
                    {getLevelLabel(level)}
                </span>
            </div>

            <div className="p-3 sm:p-4 xl:p-5 flex flex-col gap-1.5 sm:gap-3 flex-1">
                <h3 className="text-sm sm:text-base xl:text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                    {courseName}
                </h3>

                <p className="hidden sm:block text-muted-foreground text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground pb-1.5 sm:pb-3 border-b border-border/60">
                    <div className="flex items-center gap-1 min-w-0">
                        <Clock className="h-3 w-3 text-primary/70 shrink-0" />
                        <span className="truncate">
                            {getDurationLabel(duration)}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                        <BookOpen className="h-3 w-3 text-primary/70 shrink-0" />
                        <span>{chapters.length} cap.</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 mt-auto">
                    <div className="min-w-0">
                        <span className="text-sm sm:text-lg font-bold text-primary">
                            {price
                                ? `$${price.toLocaleString("es-CO")}`
                                : "Gratis"}
                        </span>
                        {price && (
                            <span className="text-[10px] sm:text-xs text-muted-foreground ml-1">
                                COP
                            </span>
                        )}
                    </div>

                    <CourseDetailsDialog course={course}>
                        <Button
                            size="xs"
                            className="shrink-0 sm:hidden px-2"
                            aria-label="Más información"
                        >
                            Ver Mas
                        </Button>
                    </CourseDetailsDialog>

                    {/* Desktop: botón con texto */}
                    <CourseDetailsDialog course={course}>
                        <Button
                            size="sm"
                            className="shrink-0 hidden sm:inline-flex font-semibold"
                        >
                            <Info className="h-3.5 w-3.5" />
                            Más información
                        </Button>
                    </CourseDetailsDialog>
                </div>
            </div>
        </div>
    );
}
