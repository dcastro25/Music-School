"use client";

import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import {
    Clock,
    Users,
    Star,
    Trophy,
    ArrowRight,
    Heart,
    Sparkles,
    Music,
    Headphones,
    BookOpen,
} from "lucide-react";
import { Course } from "@/app/generated/prisma/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExtendedCourse extends Course {
    popular?: boolean;
    students?: number;
    rating?: number;
    reviews?: number;
}

interface MobileCourseCarouselProps {
    courses: ExtendedCourse[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
    { id: "todos", label: "Todos", Icon: Sparkles },
    { id: "instrumentos", label: "Instrumentos", Icon: Music },
    { id: "canto", label: "Canto", Icon: Headphones },
    { id: "teoria", label: "Teoría", Icon: BookOpen },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function formatPrice(price: number | null) {
    if (!price) return null;
    return price.toLocaleString("es-CO");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CourseCardMobileProps {
    course: ExtendedCourse;
    index: number;
    liked: boolean;
    onLike: (id: string) => void;
}

function CourseCardMobile({
    course,
    index,
    liked,
    onLike,
}: CourseCardMobileProps) {
    const { id, courseName, price, level, imageUrl, duration, isPublished } =
        course;

    const popular = course.popular ?? false;
    const students = course.students ?? 0;
    const rating = course.rating ?? 4.5;

    const safeImage =
        imageUrl && isValidUrl(imageUrl)
            ? imageUrl
            : "/img/default-image-course.webp";

    const formattedPrice = formatPrice(price);

    return (
        <div
            className="
                flex-shrink-0 w-[220px] rounded-2xl overflow-hidden
                bg-card border border-primary/20
                transition-transform duration-200 active:scale-[0.97]
                snap-start
            "
            style={{ transitionDelay: `${index * 60}ms` }}
        >
            {/* Image */}
            <div className="relative w-full aspect-[16/11] overflow-hidden bg-background">
                <Image
                    src={safeImage}
                    alt={courseName}
                    fill
                    sizes="220px"
                    className="object-cover opacity-85"
                />

                {/* Level badge */}
                <span
                    className="
                    absolute top-2 left-2 text-[10px] font-medium
                    bg-black/70 text-foreground backdrop-blur-sm
                    px-2 py-0.5 rounded-full border border-white/10
                "
                >
                    {level || "Sin nivel"}
                </span>

                {/* Heart button */}
                <button
                    onClick={() => onLike(id)}
                    aria-label={
                        liked ? "Quitar de favoritos" : "Guardar en favoritos"
                    }
                    className={`
                        absolute top-2 right-2 w-7 h-7 rounded-full
                        flex items-center justify-center
                        border border-white/10 transition-all duration-200
                        ${
                            liked
                                ? "bg-red-500/20 border-red-500/30"
                                : "bg-black/60 backdrop-blur-sm"
                        }
                    `}
                >
                    <Heart
                        className={`h-3.5 w-3.5 transition-colors duration-200 ${
                            liked
                                ? "fill-red-500 text-red-500"
                                : "text-white/60"
                        }`}
                    />
                </button>

                {/* Popular badge */}
                {popular && (
                    <div
                        className="
                        absolute bottom-2 left-2 flex items-center gap-1
                        bg-primary text-[#12121E] text-[9px] font-semibold
                        px-2 py-0.5 rounded-full uppercase tracking-wide
                    "
                    >
                        <Trophy className="h-2.5 w-2.5" />
                        Popular
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-3">
                {/* Title */}
                <h3
                    className="
                    text-[13px] font-semibold text-foreground mb-1.5
                    leading-snug line-clamp-2
                "
                >
                    {courseName}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                    <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-[11px] font-semibold text-foreground">
                            {rating}
                        </span>
                    </div>
                    <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/40" />
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3 text-primary/70" />
                        <span className="text-[11px]">{duration}</span>
                    </div>
                    <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/40" />
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3 w-3 text-primary/70" />
                        <span className="text-[11px]">{students}</span>
                    </div>
                </div>

                {/* Footer: price + CTA */}
                <div
                    className="
                    flex items-center justify-between pt-2.5
                    border-t border-primary/10
                "
                >
                    <div>
                        {formattedPrice ? (
                            <>
                                <span className="text-[17px] font-bold text-primary leading-none block">
                                    ${formattedPrice}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    COP
                                </span>
                            </>
                        ) : (
                            <span className="text-[15px] font-bold text-emerald-500">
                                Gratis
                            </span>
                        )}
                    </div>

                    <button
                        className="
                        flex items-center gap-1 text-[11px] font-semibold
                        bg-primary text-[#12121E]
                        px-3 py-1.5 rounded-full
                        transition-transform duration-150 active:scale-95
                        whitespace-nowrap
                    "
                    >
                        Inscribirse
                        <ArrowRight className="h-3 w-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MobileCourseCarousel({ courses }: MobileCourseCarouselProps) {
    const [activeCategory, setActiveCategory] = useState<CategoryId>("todos");
    const [activeDot, setActiveDot] = useState(0);
    const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

    const trackRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Drag-to-scroll state
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // ── Filtered courses ──────────────────────────────────────────────────────

    const publishedCourses = useMemo(
        () => courses.filter((c) => c.isPublished),
        [courses],
    );

    const filteredCourses = useMemo(() => {
        if (activeCategory === "todos") return publishedCourses;
        return publishedCourses.filter((c) => c.category === activeCategory);
    }, [publishedCourses, activeCategory]);

    // ── Category change ───────────────────────────────────────────────────────

    function handleCategory(id: CategoryId) {
        setActiveCategory(id);
        setActiveDot(0);
        if (wrapperRef.current) {
            wrapperRef.current.scrollLeft = 0;
        }
    }

    // ── Like toggle ───────────────────────────────────────────────────────────

    const handleLike = useCallback((id: string) => {
        setLikedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);

    // ── Dot tracking on scroll ────────────────────────────────────────────────

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const CARD_W = 220 + 12; // card width + gap

        function onScroll() {
            const idx = Math.round(el!.scrollLeft / CARD_W);
            setActiveDot(Math.min(idx, filteredCourses.length - 1));
        }

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [filteredCourses.length]);

    // ── Mouse drag ────────────────────────────────────────────────────────────

    function onMouseDown(e: React.MouseEvent) {
        const el = wrapperRef.current;
        if (!el) return;
        isDragging.current = true;
        startX.current = e.pageX - el.offsetLeft;
        scrollLeft.current = el.scrollLeft;
        el.style.cursor = "grabbing";
    }

    function onMouseMove(e: React.MouseEvent) {
        if (!isDragging.current || !wrapperRef.current) return;
        e.preventDefault();
        const x = e.pageX - wrapperRef.current.offsetLeft;
        wrapperRef.current.scrollLeft =
            scrollLeft.current - (x - startX.current) * 1.4;
    }

    function onMouseUp() {
        isDragging.current = false;
        if (wrapperRef.current) wrapperRef.current.style.cursor = "grab";
    }

    // ─────────────────────────────────────────────────────────────────────────

    return (
        <section className="block md:hidden py-10 relative overflow-hidden">
            {/* Background decorations (matching existing section style) */}
            <div className="absolute inset-0 note-pattern opacity-20 pointer-events-none" />
            <div className="absolute top-20 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-40 h-40 bg-[var(--gold-400)]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative px-4">
                {/* ── Header ───────────────────────────────────────────────── */}
                <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                        <BookOpen className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs text-primary font-semibold">
                            Nuestros Cursos
                        </span>
                    </div>
                    <button className="text-xs text-primary flex items-center gap-1 font-medium">
                        Ver todos
                        <ArrowRight className="h-3 w-3" />
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-4 leading-tight text-center">
                    Descubre tu camino{" "}
                    <span className="text-white/60">
                        en la Música Vallenata
                    </span>
                </h2>
                <p className="text-muted-foreground font-serif leading-relaxed text-center pb-6">
                    Ofrecemos una variedad de cursos disenados para todos los
                    niveles. Desde los primeros pasos hasta la maestria del
                    vallenato, con profesores expertos y metodologia comprobada.
                </p>

                {/* ── Category filters ──────────────────────────────────────── */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 -mx-4 px-4">
                    {CATEGORIES.map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            onClick={() => handleCategory(id)}
                            className={`
                                flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                                text-xs font-semibold whitespace-nowrap flex-shrink-0
                                border transition-all duration-200
                                ${
                                    activeCategory === id
                                        ? "bg-primary text-[#12121E] border-primary"
                                        : "bg-card text-muted-foreground border-primary/20 hover:border-primary/40 hover:text-primary"
                                }
                            `}
                        >
                            <Icon className="h-3.5 w-3.5" />
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── Carousel ─────────────────────────────────────────────── */}
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground text-sm ">
                        No hay cursos en esta categoría.
                    </div>
                ) : (
                    <>
                        <div
                            ref={wrapperRef}
                            className="
                                overflow-x-auto overflow-y-visible 
                                scrollbar-hide -mx-4 px-4
                                scroll-smooth snap-x snap-mandatory
                            "
                            style={{
                                cursor: "grab",
                                WebkitOverflowScrolling: "touch",
                            }}
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUp}
                            onMouseLeave={onMouseUp}
                        >
                            <div
                                ref={trackRef}
                                className="flex gap-3 w-max pb-2"
                            >
                                {filteredCourses.map((course, i) => (
                                    <CourseCardMobile
                                        key={course.id}
                                        course={course}
                                        index={i}
                                        liked={likedIds.has(course.id)}
                                        onLike={handleLike}
                                    />
                                ))}
                                {/* Trailing spacer so last card isn't clipped */}
                                <div
                                    className="w-4 flex-shrink-0"
                                    aria-hidden
                                />
                            </div>
                        </div>

                        {/* ── Dot indicators ───────────────────────────────── */}
                        <div
                            className="flex justify-center gap-1.5 mt-4"
                            aria-hidden
                        >
                            {filteredCourses.slice(0, 6).map((_, i) => (
                                <span
                                    key={i}
                                    className={`
                                        h-1 rounded-full transition-all duration-300
                                        ${
                                            i === activeDot
                                                ? "w-5 bg-primary"
                                                : "w-3 bg-primary/20"
                                        }
                                    `}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* ── Bottom CTA ────────────────────────────────────────────── */}
                <div
                    className="
                    mt-8 flex items-center justify-between gap-3
                    bg-card border border-border/50 rounded-2xl p-5
                "
                >
                    <div>
                        <p className="text-sm font-bold text-foreground mb-0.5">
                            ¿No sabes cuál elegir?
                        </p>
                        <p className="text-xs text-muted-foreground leading-snug">
                            Te ayudamos a encontrar el curso perfecto
                        </p>
                    </div>
                    <button
                        className="
                        flex items-center gap-1.5 text-xs font-semibold
                        bg-primary text-[#12121E]
                        px-4 py-2.5 rounded-full flex-shrink-0
                        shadow-lg shadow-primary/20
                        transition-transform duration-150 active:scale-95
                        whitespace-nowrap
                    "
                    >
                        Asesoría gratis
                        <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
