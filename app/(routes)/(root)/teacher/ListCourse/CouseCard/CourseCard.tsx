"use client";

import Image from "next/image";
import { Clock, Users, Star, Check, Trophy, ArrowRight } from "lucide-react";
import { CourseCardProps } from "./CourseCard.type";
import { useState, useEffect, useRef } from "react";
import { Actions } from "./Actions";
import { Button } from "@/components/ui/button";

// ─── helpers ────────────────────────────────────────────────────────────────

function isValidUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

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
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}

// ─── types ───────────────────────────────────────────────────────────────────

interface ExtendedCourseCardProps extends CourseCardProps {
    index?: number;
}

// ─── component ───────────────────────────────────────────────────────────────

export function CourseCard({ course, index = 0 }: ExtendedCourseCardProps) {
    const {
        id,
        courseName,
        price,
        level,
        imageUrl,
        description,
        isPublished,
        duration,
    } = course as typeof course & {
        popular?: boolean;
        students?: number;
        rating?: number;
        reviews?: number;
        includes?: string[];
    };

    const [isHovered, setIsHovered] = useState(false);
    const [published, setPublished] = useState(isPublished);
    const { ref, isVisible } = useScrollReveal(0.1);

    const safeImage =
        imageUrl && isValidUrl(imageUrl)
            ? imageUrl
            : "/img/default-image-course.webp";

    const popular  = (course as any).popular   ?? false;
    const students = (course as any).students  ?? 120;
    const rating   = (course as any).rating    ?? 4.5;
    const reviews  = (course as any).reviews   ?? 0;
    const includes: string[] = (course as any).includes ?? [];

    return (
        <div
            ref={ref}
            className={`
                group relative bg-card rounded-xl sm:rounded-2xl border border-border/50
                overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 w-full
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* ── Popular badge ─────────────────────────────────────────── */}
            {popular && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
                    <span className="inline-flex items-center gap-1 bg-black text-yellow-300 text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg">
                        <Trophy className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span className="hidden sm:inline">Popular</span>
                    </span>
                </div>
            )}

            {/* ── Image ─────────────────────────────────────────────────── */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={safeImage}
                    alt={courseName}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
                    className={`object-cover transition-all duration-700 ${
                        isHovered ? "scale-110 brightness-90" : "scale-100"
                    }`}
                />

                {/* Hover overlay — oculto en móvil */}
                <div
                    className={`
                        absolute inset-0 bg-black/60 items-center justify-center
                        transition-opacity duration-500 hidden sm:flex
                        ${isHovered ? "opacity-100" : "opacity-0"}
                    `}
                >
                    <Button className="font-semibold">
                        Ver Detalles
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                </div>

                {/* Level badge */}
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-card/90 text-foreground backdrop-blur-sm text-[10px] sm:text-xs font-medium px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md">
                    {level || "Sin nivel"}
                </span>

                {/* Published badge */}
                <span
                    className={`absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-[10px] sm:text-xs font-medium px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md leading-tight ${
                        published
                            ? "bg-emerald-500/90 text-white"
                            : "bg-gray-700/90 text-gray-200"
                    }`}
                >
                    {published ? "✓ Publicado" : "Borrador"}
                </span>
            </div>

            {/* ── Content ───────────────────────────────────────────────── */}
            <div className="p-3 sm:p-4 lg:p-4 xl:p-6">
                {/* Title */}
                <h3 className="text-sm sm:text-base lg:text-base xl:text-xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2 sm:line-clamp-1">
                    {courseName}
                </h3>

                {/* Description — oculta en móvil */}
                <p className="hidden sm:block text-muted-foreground text-xs lg:text-xs xl:text-sm mb-3 sm:mb-4 xl:mb-5 line-clamp-2 leading-relaxed">
                    {description || "Sin descripción disponible"}
                </p>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3 xl:gap-4 text-[10px] sm:text-xs lg:text-xs xl:text-sm text-muted-foreground mb-3 sm:mb-4 xl:mb-5 pb-3 sm:pb-4 xl:pb-5 border-b border-border/50">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 xl:h-4 xl:w-4 text-primary/70 shrink-0" />
                        <span className="truncate max-w-[60px] sm:max-w-none">{duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 xl:h-4 xl:w-4 text-primary/70 shrink-0" />
                        <span className="hidden sm:inline">{students} est.</span>
                        <span className="sm:hidden">{students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 xl:h-4 xl:w-4 fill-primary text-primary shrink-0" />
                        <span className="font-semibold text-foreground">{rating}</span>
                        {reviews > 0 && (
                            <span className="hidden xl:inline text-xs">({reviews})</span>
                        )}
                    </div>
                </div>

                {/* Incluye — solo en sm+ */}
                {includes.length > 0 && (
                    <div
                        className={`hidden sm:block overflow-hidden transition-all duration-500 ${
                            isHovered ? "max-h-40 opacity-100 mb-4 xl:mb-5" : "max-h-0 opacity-0"
                        }`}
                    >
                        <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
                            Incluye:
                        </p>
                        <div className="grid grid-cols-1 gap-1.5">
                            {includes.filter(Boolean).map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                    <span className="text-xs text-muted-foreground">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price & CTA */}
                <div className="flex items-center justify-between gap-1 sm:gap-2">
                    <div className="min-w-0">
                        <span className="text-xs sm:text-base lg:text-base xl:text-2xl font-bold text-primary">
                            {price ? `$${price.toLocaleString("es-CO")}` : "Gratis"}
                        </span>
                        {price && (
                            <span className="text-[10px] sm:text-xs xl:text-sm text-muted-foreground ml-1">
                                COP
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                        <Button size={"xs"}>
                            Inscribirse
                        </Button>


                    </div>
                </div>
            </div>
        </div>
    );
}