"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
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
                "group relative bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-primary/40 transition-[transform,box-shadow,border-color,opacity] duration-500 w-full flex flex-col h-full min-w-0",
                isVisible ? "opacity-100" : "opacity-0",
                className,
            )}
            style={{ transitionDelay: `${index * 80}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* IMAGE */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={getCourseImage(imageUrl)}
                    alt={courseName}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
                    className={`object-cover transition-transform duration-700 will-change-transform [transform:translateZ(0)] ${
                        isHovered ? "sm:scale-110" : "scale-100"
                    }`}
                />

                {/* Gradiente permanente para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Badge nivel */}
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold bg-white/95 text-foreground px-2 sm:px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm">
                    {getLevelLabel(level)}
                </span>

                {/* Precio flotante sobre la imagen */}
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                    <span className="text-base sm:text-xl xl:text-2xl font-extrabold text-white drop-shadow-lg">
                        {price
                            ? `$${price.toLocaleString("es-CO")}`
                            : "Gratis"}
                    </span>
                    {price && (
                        <span className="ml-1 text-[10px] sm:text-xs font-medium text-white/80">
                            COP
                        </span>
                    )}
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-3 sm:p-4 xl:p-5 flex flex-col gap-2 sm:gap-3 flex-1">
                <h3 className="text-sm sm:text-base xl:text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                    {courseName}
                </h3>

                <p className="hidden sm:block text-muted-foreground text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {description}
                </p>

                {/* Chips de metadata */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                        <Clock className="h-3 w-3 text-primary/70 shrink-0" />
                        <span className="truncate max-w-[80px] sm:max-w-none">
                            {getDurationLabel(duration)}
                        </span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                        <BookOpen className="h-3 w-3 text-primary/70 shrink-0" />
                        {chapters.length} cap.
                    </span>
                </div>

                {/* CTA siempre abajo */}
                <div className="mt-auto pt-2 sm:pt-3">
                    <CourseDetailsDialog course={course}>
                        <Button
                            size="sm"
                            className="w-full font-semibold gap-1.5 group/btn"
                        >
                            Ver curso
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        </Button>
                    </CourseDetailsDialog>
                </div>
            </div>

            {/* Brillo sutil en el borde superior al hacer hover */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 will-change-transform" />
        </div>
    );
}