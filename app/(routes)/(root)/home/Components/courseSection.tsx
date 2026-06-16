"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Clock,
    Users,
    Star,
    ArrowRight,
    Music,
    BookOpen,
    Trophy,
    Headphones,
    Check,
    Sparkles,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/use-scroll-reveal";


const categories = [
    { id: "todos", label: "Todos", icon: Sparkles },
    { id: "instrumentos", label: "Instrumentos", icon: Music },
    { id: "canto", label: "Canto", icon: Headphones },
    { id: "teoria", label: "Teoria y Composicion", icon: BookOpen },
];

function CourseCard({ index }: {  index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const { ref, isVisible } = useScrollReveal(0.1);

    return (
        <div
            ref={ref}
            className={`group relative bg-card rounded-2xl border border-border/50 overflow-hidden card-hover shadow-sm transition-all duration-700 ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Popular badge */}


            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">

                {/* Overlay on hover */}
                <div
                    className={`absolute inset-0 bg-[var(--dark-900)]/60 flex items-center justify-center transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                >
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-xl transform transition-all duration-300 hover:scale-105">
                        Ver Detalles del Curso
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
                {/* Level badge */}
                <Badge className="absolute top-4 left-4 bg-card/90 text-foreground backdrop-blur-sm border-0 shadow-md">
                
                </Badge>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    
                </h3>
                <p className="text-muted-foreground text-sm mb-5 line-clamp-2 font-serif leading-relaxed">
                   
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5 pb-5 border-b border-border/50">
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-primary/70" />
                       
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-primary/70" />
                        <span> estudiantes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold text-foreground">
                            
                        </span>
                        <span className="text-xs">()</span>
                    </div>
                </div>

                {/* Includes - shown on hover with animation */}
                <div
                    className={`overflow-hidden transition-all duration-500 ${isHovered ? "max-h-40 opacity-100 mb-5" : "max-h-0 opacity-0"}`}
                >
                    <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
                        Incluye:
                    </p>

                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-primary">
                           
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">
                            COP/mes
                        </span>
                    </div>
                    <Button
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-300 bg-transparent"
                    >
                        Inscribirse
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function CoursesSection() {
  
    const [activeCategory, setActiveCategory] = useState("todos");
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

    // Get active courses from store

    const filteredCourses =
        activeCategory === "todos"


    return (
        <section id="cursos" className="py-28 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 note-pattern opacity-20" />
            <div className="absolute top-40 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-0 w-64 h-64 bg-[var(--gold-400)]/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative">
                {/* Header */}
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
                        Descubre Tu Camino en la{" "}
                        <span className="text-primary">Musica Vallenata</span>
                    </h2>
                    <p className="text-muted-foreground font-serif text-lg leading-relaxed">
                        Ofrecemos una variedad de cursos disenados para todos
                        los niveles. Desde los primeros pasos hasta la maestria
                        del vallenato, con profesores expertos y metodologia
                        comprobada.
                    </p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-14">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
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

                {/* Courses Grid */}

                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            No hay cursos disponibles en esta categoria
                        </p>
                    </div>


                {/* Bottom CTA */}
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
