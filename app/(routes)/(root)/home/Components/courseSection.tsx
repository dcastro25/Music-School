"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Music,
    BookOpen,
    Headphones,
    Sparkles,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/use-scroll-reveal";
import { CourseCard } from "../../Components/Shared/ListCourse/CouseCard";
import type { CourseWithChapters } from "../../courses/courseClientType";
import { getCategoryLabel } from "@/lib/course-helpers";

const COURSES_PER_PAGE = 8;

const categories = [
    { id: "todos", label: "Todos", icon: Sparkles },
    {
        id: "instrumentos",
        label: getCategoryLabel("instrumentos"),
        icon: Music,
    },
    { id: "canto", label: getCategoryLabel("canto"), icon: Headphones },
    { id: "teoria", label: getCategoryLabel("teoria"), icon: BookOpen },
];

interface CoursesSectionProps {
    courses: CourseWithChapters[];
}

export function CoursesSection({ courses }: CoursesSectionProps) {
    const [activeCategory, setActiveCategory] = useState("todos");
    const [visibleCount, setVisibleCount] = useState(COURSES_PER_PAGE);

    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

    const publishedCourses = useMemo(
        () => courses.filter((c) => c.isPublished),
        [courses],
    );

    const filteredCourses = useMemo(() => {
        if (activeCategory === "todos") return publishedCourses;
        return publishedCourses.filter((c) => c.category === activeCategory);
    }, [publishedCourses, activeCategory]);

    const visibleCourses = filteredCourses.slice(0, visibleCount);
    const hasMore = visibleCount < filteredCourses.length;

    function handleCategoryChange(id: string) {
        setActiveCategory(id);
        setVisibleCount(COURSES_PER_PAGE);
    }

    return (
        <section
            id="cursos"
            className="py-20 relative overflow-hidden hidden md:block"
        >
            <div className="absolute inset-0 note-pattern opacity-20" />
            <div className="absolute top-40 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-0 w-64 h-64 bg-(--gold-400)/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative">
                <div
                    ref={headerRef}
                    className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
                        headerVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm text-primary font-semibold">
                            Nuestros Cursos
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-balance leading-tight">
                        Descubre Tu Camino{" "}
                        <span className="text-white/70">
                            en la Musica Vallenata
                        </span>
                    </h2>
                    <p className="text-muted-foreground font-serif text-lg leading-relaxed">
                        Ofrecemos una variedad de cursos disenados para todos
                        los niveles. Desde los primeros pasos hasta la maestria
                        del vallenato, con profesores expertos y metodologia
                        comprobada.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-14">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                activeCategory === cat.id
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-primary"
                            }`}
                        >
                            <cat.icon className="h-4 w-4" />
                            {cat.label}
                        </button>
                    ))}
                </div>

                {filteredCourses.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            No hay cursos disponibles en esta categoría
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 items-stretch">
                            {visibleCourses.map((course, i) => (
                                <div
                                    key={course.id}
                                    className="w-[calc(50%-0.375rem)] sm:w-78 flex"
                                >
                                    <CourseCard
                                        course={course}
                                        index={i}
                                    />
                                </div>
                            ))}
                        </div>

                        {hasMore && (
                            <div className="flex justify-center mt-12">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() =>
                                        setVisibleCount(
                                            (prev) => prev + COURSES_PER_PAGE,
                                        )
                                    }
                                    className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-300 px-8"
                                >
                                    Ver más cursos
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        )}
                    </>
                )}

                <div className="text-center mt-16">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-card p-6 sm:p-8 rounded-2xl border border-border/50 shadow-sm">
                        <div className="text-center sm:text-left">
                            <h3 className="font-bold text-foreground text-lg mb-1">
                                No sabes cual curso elegir?
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Te ayudamos a encontrar el curso perfecto para
                                ti
                            </p>
                        </div>
                        <Button
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 shadow-lg shadow-primary/20 whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Asesoria Gratuita
                            <ArrowRight className="h-5 w-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}