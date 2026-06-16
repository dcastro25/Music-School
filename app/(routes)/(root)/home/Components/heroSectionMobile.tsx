"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
    Bell,
    ChevronDown,
    Guitar,
    Piano,
    Drum,
    Mic,
    Music2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
    { label: "Guitarra", Icon: Guitar },
    { label: "Piano", Icon: Piano },
    { label: "Batería", Icon: Drum },
    { label: "Canto", Icon: Mic },
    { label: "Teoría", Icon: Music2 },
];

const slides = [
    {
        tag: "Popular",
        title: "Instrumentos Culturales",
        upTo: "Hasta",
        amount: "40",
        note: "Todos los cursos · T&C aplican",
        image: "/img/accordion-promo.png",
        accent: "from-amber-500/30",
    },
    {
        tag: "Nuevo",
        title: "Clases en vivo",
        upTo: "Desde",
        amount: "20",
        note: "Cupos limitados · esta semana",
        image: "/img/guitar-promo.png",
        accent: "from-rose-500/25",
    },
];

export function HeroSectionMobile() {
    const [active, setActive] = useState(0);
    const scrollerRef = useRef<HTMLDivElement>(null);

    function handleScroll() {
        const el = scrollerRef.current;
        if (!el) return;
        const index = Math.round(el.scrollLeft / el.clientWidth);
        setActive(index);
    }

    function goTo(i: number) {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
        setActive(i);
    }

    return (
        <section className="mx-auto flex flex-col gap-6 bg-background px-4 pt-8 pb-8">
            {/* Top bar */}
            <header className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">
                        Ubicación
                    </span>
                    <button className="flex items-center gap-1 text-base font-semibold text-foreground">
                        Monteria / Lorica, Col
                        <ChevronDown className="size-4 text-primary" />
                    </button>
                </div>
            </header>

            {/* Hero copy */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold leading-tight text-foreground ">
                    Domina tu instrumento favorito
                </h1>
                <p className="text-sm leading-relaxed text-muted-foreground ">
                    Cursos online de música guiados por profesores expertos, a
                    tu ritmo y desde cualquier lugar.
                </p>
            </div>

            {/* Section heading */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground text-balance">
                    #DestacadoParaTi
                </h2>
                <button className="text-sm text-muted-foreground">
                    Ver todo
                </button>
            </div>

            {/* Mobile swipeable carousel */}
            <div
                ref={scrollerRef}
                onScroll={handleScroll}
                className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {slides.map((slide) => (
                    <div
                        key={slide.title}
                        className="relative w-full shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-black isolate"
                    >
                        <Image
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 28rem"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/20" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

                        {/* Contenido */}
                        <div className="relative flex flex-col gap-3 px-1.5">
                            <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                                {slide.tag}
                            </span>
                            <h3 className="text-xl font-bold text-foreground text-balance">
                                {slide.title}
                            </h3>
                            <div className="flex items-end gap-1">
                                <span className="text-md text-white/60">
                                    {slide.upTo}
                                </span>
                                <span className="text-4xl font-extrabold leading-none text-white">
                                    {slide.amount}
                                </span>
                                <span className="mb-1 text-xl font-bold text-white">
                                    %
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-white/50">
                                    {slide.note}
                                </span>
                                <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
                                    Mas
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Carousel dots */}
            <div className="flex justify-center gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Ir a la diapositiva ${i + 1}`}
                        onClick={() => goTo(i)}
                        className={`h-2 rounded-full transition-all ${
                            active === i
                                ? "w-6 bg-primary"
                                : "w-2 bg-muted-foreground/40"
                        }`}
                    />
                ))}
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">
                        Categorías
                    </h2>
                    <Button variant="default" className="h-9 px-4 text-sm">
                        Ver todo
                    </Button>
                </div>
                <div className="flex  justify-evenly w-full gap-3  pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {categories.map(({ label, Icon }) => (
                        <button
                            key={label}
                            className="group flex flex-col items-center gap-2 rounded-3xl bg-card px-2 py-3 text-center transition hover:bg-primary/5"
                        >
                            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-background text-primary transition group-hover:bg-primary/10">
                                <Icon className="h-5 w-5" />
                            </span>
                            <span className="text-[11px] font-medium text-muted-foreground">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
