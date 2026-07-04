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

    const { ref, isVisible } = useScrollReveal(0.1);

    return (
        <div
            ref={ref}
            {...props}
            className={cn(
                "group relative bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm w-full flex flex-col h-full min-w-0",
                "[transform:translateZ(0)] [backface-visibility:hidden] isolate",
                "opacity-100",
                "sm:transition-opacity sm:duration-500",
                "sm:hover:shadow-2xl sm:hover:-translate-y-1 sm:hover:border-primary/40 sm:transition-[transform,box-shadow,border-color,opacity] sm:duration-500",
                "sm:[&.reveal]:opacity-100 sm:[&:not(.reveal)]:opacity-0",
                isVisible && "reveal",
                className,
            )}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            <div className="relative aspect-[16/10] overflow-hidden sm:[-webkit-mask-image:-webkit-radial-gradient(white,black)]">
                <Image
                    src={getCourseImage(imageUrl)}
                    alt={courseName}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
                    className="object-cover sm:transition-transform sm:duration-700 sm:group-hover:scale-110"
                />

                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold bg-background/70 text-foreground px-2 sm:px-2.5 py-1 rounded-full shadow-md">
                    {getLevelLabel(level)}
                </span>

                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 drop-shadow-lg bg-background/70 px-3 py-0.5 rounded-full shadow-md">
                    {price === 0 ? (
                        <span className="text-xs sm:text-base font-extrabold text-green-400">
                            Gratis
                        </span>
                    ) : (
                        <>
                            <span className="text-xs sm:text-base font-extrabold text-white/90">
                                ${price.toLocaleString("es-CO")}
                            </span>
                            <span className="ml-1 text-[9px] sm:text-xs font-medium text-white/80">
                                COP
                            </span>
                        </>
                    )}
                </div>
            </div>

            <div className="p-3 sm:p-4 xl:p-5 flex flex-col gap-2 sm:gap-3 flex-1">
                <h3 className="text-sm sm:text-base xl:text-xl text-foreground sm:group-hover:text-primary sm:transition-colors sm:duration-300 line-clamp-2 leading-snug">
                    {courseName}
                </h3>

                <p className="hidden sm:block text-muted-foreground text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                        <Clock className="h-3 w-3 text-primary/70 shrink-0" />
                        <span className="truncate max-w-[80px] sm:max-w-none">
                            {getDurationLabel(duration)}
                        </span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                        <BookOpen className="h-3 w-3 text-primary/70 shrink-0" />
                        {chapters?.length ?? 0} cap.
                    </span>
                </div>

                <div className="mt-auto pt-2 sm:pt-3">
                    <CourseDetailsDialog course={course}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full font-semibold gap-1 text-xs sm:text-sm md:text-base py-0.5 sm:py-2"
                        >
                            Ver curso
                            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                    </CourseDetailsDialog>
                </div>
            </div>
        </div>
    );
}
