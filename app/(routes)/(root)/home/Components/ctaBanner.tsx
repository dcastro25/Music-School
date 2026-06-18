"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Phone } from "lucide-react";
import { useScrollReveal } from "../../hooks/use-scroll-reveal";

export function CtaBanner() {
    const { ref, isVisible } = useScrollReveal();

    const stats = [
        { value: "500+", label: "Graduados" },
        { value: "4.9/5", label: "Calificación" },
        { value: "98%", label: "Satisfacción" },
        { value: "15+", label: "Años" },
    ];

    return (
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-background-secondary">
            <div
                ref={ref}
                className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
            >
                <div
                    className="relative rounded-2xl sm:rounded-3xl overflow-hidden
                                p-6 sm:p-10 md:p-14 lg:p-16 border"
                    style={{
                        background: "var(--background)",
                        borderColor: "rgba(228,158,34,0.10)",
                    }}
                >
                    {/* Glow top-right — crece con el breakpoint */}
                    <div
                        className="absolute top-0 right-0 rounded-full pointer-events-none
                                    w-32 h-32 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(228,158,34,0.12) 0%, transparent 70%)",
                        }}
                        aria-hidden="true"
                    />
                    {/* Glow bottom-left */}
                    <div
                        className="absolute bottom-0 left-0 rounded-full pointer-events-none
                                    w-24 h-24 sm:w-44 sm:h-44 md:w-64 md:h-64 lg:w-72 lg:h-72"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(228,158,34,0.07) 0%, transparent 70%)",
                        }}
                        aria-hidden="true"
                    />

                    {/* Notas — ocultas en móvil, visibles desde md */}
                    <div
                        className="absolute top-6 left-6 hidden md:block
                                    text-6xl lg:text-8xl pointer-events-none select-none"
                        style={{ color: "rgba(228,158,34,0.08)" }}
                        aria-hidden="true"
                    >
                        ♪
                    </div>
                    <div
                        className="absolute bottom-6 right-8 hidden md:block
                                    text-5xl lg:text-6xl pointer-events-none select-none"
                        style={{ color: "rgba(228,158,34,0.08)" }}
                        aria-hidden="true"
                    >
                        ♫
                    </div>

                    <div className="relative text-center max-w-3xl mx-auto">

                        {/* Badge */}
                        <div
                            className="inline-flex items-center gap-2 rounded-full border
                                        px-3 py-1.5 sm:px-4 sm:py-2 mb-5 sm:mb-7 md:mb-8"
                            style={{
                                background: "rgba(228,158,34,0.13)",
                                borderColor: "rgba(228,158,34,0.22)",
                            }}
                        >
                            <Music
                                className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-bounce-subtle"
                                style={{ color: "var(--foreground)" }}
                            />
                            <span
                                className="text-xs sm:text-sm font-semibold"
                                style={{ color: "var(--foreground)" }}
                            >
                                Inscripciones Abiertas
                            </span>
                        </div>

                        {/* Título */}
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                                        font-bold leading-tight text-balance
                                        mb-4 sm:mb-5 md:mb-6"
                            style={{ color: "var(--card-foreground)" }}
                        >
                            <span className="text-white/70">Tu Viaje Musical </span>Comienza Hoy
                        </h2>

                        {/* Descripción */}
                        <p
                            className="font-serif leading-relaxed mx-auto
                                        text-sm sm:text-base md:text-lg
                                        max-w-sm sm:max-w-xl md:max-w-2xl
                                        mb-7 sm:mb-9 md:mb-10"
                         
                        >
                            No esperes más para cumplir tu sueño de tocar música
                            vallenata. Primera clase de prueba totalmente gratuita.
                            Inscríbete ahora y sé parte de nuestra familia.
                        </p>

                        {/* Botones — columna en móvil, fila desde sm */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center
                                        items-stretch sm:items-center mb-8 sm:mb-10 md:mb-11">
                            <Button
                                size="lg"
                                asChild
                                className="transition-all duration-300 hover:-translate-y-1
                                            text-sm sm:text-base md:text-lg
                                            px-6 sm:px-7 md:px-8
                                            py-5 sm:py-5 md:py-6"

                            >
                                <a href="#contacto" className="flex items-center justify-center gap-2">
                                    Clase de Prueba Gratis
                                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                                </a>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="bg-transparent transition-all duration-300
                                            hover:-translate-y-1
                                            text-sm sm:text-base md:text-lg
                                            px-6 sm:px-7 md:px-8
                                            py-5 sm:py-5 md:py-6"

                            >
                                <a
                                    href="tel:+573001234567"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                                    Llamar Ahora
                                </a>
                            </Button>
                        </div>

                        {/* Stats — 2 cols en móvil, 4 cols desde sm */}
                        <div
                            className="grid grid-cols-2 sm:grid-cols-4
                                        gap-y-5 gap-x-4 sm:gap-8
                                        pt-7 sm:pt-8 border-t"
                            style={{ borderColor: "rgba(228,158,34,0.12)" }}
                        >
                            {stats.map(({ value, label }) => (
                                <div key={label} className="text-center">
                                    <p
                                        className="text-xl sm:text-2xl font-bold"
                                        style={{ color: "var(--foreground)" }}
                                    >
                                        {value}
                                    </p>
                                    <p
                                        className="text-[10px] sm:text-xs uppercase tracking-wider mt-1"
                                        
                                    >
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}