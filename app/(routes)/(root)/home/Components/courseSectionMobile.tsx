"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import {
    ArrowRight,
    Sparkles,
    Music,
    Headphones,
    BookOpen,
} from "lucide-react";
import { CourseCard } from "../../Components/Shared/ListCourse/CouseCard";
import type { CourseWithChapters } from "../../courses/courseClientType";
interface MobileCourseCarouselProps {
    courses: CourseWithChapters[];
}

const CATEGORIES = [
    { id: "todos", label: "Todos", Icon: Sparkles },
    { id: "instrumentos", label: "Instrumentos", Icon: Music },
    { id: "canto", label: "Canto", Icon: Headphones },
    { id: "teoria", label: "Teoría", Icon: BookOpen },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const CARD_WIDTH = 220;
const CARD_GAP = 12;


export function MobileCourseCarousel({ courses }: MobileCourseCarouselProps) {
    const [activeCategory, setActiveCategory] = useState<CategoryId>("todos");
    const [activeDot, setActiveDot] = useState(0);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const publishedCourses = useMemo(
        () => courses.filter((c) => c.isPublished),
        [courses],
    );

    const filteredCourses = useMemo(() => {
        if (activeCategory === "todos") return publishedCourses;
        return publishedCourses.filter((c) => c.category === activeCategory);
    }, [publishedCourses, activeCategory]);

    function handleCategory(id: CategoryId) {
        setActiveCategory(id);
        setActiveDot(0);
        if (wrapperRef.current) {
            wrapperRef.current.scrollLeft = 0;
        }
    }

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const CARD_W = CARD_WIDTH + CARD_GAP;

        function onScroll() {
            const idx = Math.round(el!.scrollLeft / CARD_W);
            setActiveDot(Math.min(idx, filteredCourses.length - 1));
        }

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [filteredCourses.length]);

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

    return (
        <section className="block md:hidden py-10 relative overflow-hidden">
            <div className="absolute inset-0 note-pattern opacity-20 pointer-events-none" />
            <div className="absolute top-20 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-40 h-40 bg-(--gold-400)/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative px-4">
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

                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 -mx-4 px-4">
                    {CATEGORIES.map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            onClick={() => handleCategory(id)}
                            className={`
                                flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                                text-xs font-semibold whitespace-nowrap shrink-0
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
                            <div className="flex gap-3 w-max pb-2">
                                {filteredCourses.map((course, i) => (
                                    <div
                                        key={course.id}
                                        className="shrink-0 w-55 snap-start [transform:translateZ(0)] [backface-visibility:hidden] isolate"
                                    >
                                        <CourseCard course={course} index={i} />
                                    </div>
                                ))}
                                <div className="w-4 shrink-0" aria-hidden />
                            </div>
                        </div>

                        <div className="flex justify-center gap-1.5 mt-4" aria-hidden>
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
                        px-4 py-2.5 rounded-full shrink-0
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