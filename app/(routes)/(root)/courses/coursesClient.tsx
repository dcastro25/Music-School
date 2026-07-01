"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Mic, Music, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "../Components/Shared/ListCourse/CouseCard";
import type {
    CoursesClientProps,
    CourseCategory,
    CourseWithChapters,
} from "./courseClientType";
import { CoursesHero } from "../Components/Shared/ListCourse/CouseCard/CourseHero";
import { Footer } from "../Components/Footer";

const iconMap = {
    sparkles: Sparkles,
    music: Music,
    mic: Mic,
    book: BookOpen,
};

export function CoursesClient({ courses, categories }: CoursesClientProps) {
    const [activeCategory, setActiveCategory] = useState<
        CourseCategory | "todos"
    >("todos");

    const filteredCourses = useMemo(() => {
        if (activeCategory === "todos") return courses;
        return courses.filter((c) => c.category === activeCategory);
    }, [courses, activeCategory]);

    function handleCategoryChange(id: CourseCategory | "todos") {
        setActiveCategory(id);
    }

    return (
        <section
            id="cursos"
            className="relative overflow-hidden py-14 sm:py-20"
        >
            <div
                className="absolute inset-0 note-pattern opacity-[0.04]"
                aria-hidden
            />
            <CoursesHero />
            <div className="container relative mx-auto px-4">

                <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                            Nuestros Cursos
                        </span>
                    </div>
                    <h2 className="mb-4 text-3xl font-bold leading-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
                        Descubre tu camino en la música
                    </h2>
                    <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Cursos diseñados para todos los niveles. Filtra por
                        categoría y encuentra el ideal para ti, con profesores
                        expertos y metodología comprobada.
                    </p>
                </div>

                <div className="mb-10 flex flex-wrap justify-center gap-2 sm:mb-14 sm:gap-3">
                    {categories.map((cat) => {
                        const Icon = iconMap[cat.icon];
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                aria-pressed={isActive}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                        : "border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary"
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {filteredCourses.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-muted-foreground">
                            No hay cursos disponibles en esta categoría.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-6 items-stretch">
                        {filteredCourses.map((course, i) => (
                            <div
                                key={course.id}
                                className="w-[calc(50%-0.375rem)] sm:w-78 flex"
                            >
                                <CourseCard
                                    course={course}
                                    index={i}
                                    className="h-full flex flex-col"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-14 text-center sm:mt-16">
                    <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:flex-row sm:p-8">
                        <div className="text-center sm:text-left">
                            <h3 className="mb-1 text-lg font-bold text-foreground">
                                ¿No sabes cuál curso elegir?
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Te ayudamos a encontrar el curso perfecto para
                                ti.
                            </p>
                        </div>
                        <Button
                            size="lg"
                            className="whitespace-nowrap px-8 font-semibold shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
                        >
                            Asesoría gratuita
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );

}
