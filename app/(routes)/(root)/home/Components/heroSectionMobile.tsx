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
    MapPin,
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
        <section className="mx-auto flex flex-col gap-3 bg-background px-4 pt-5 pb-15 md:hidden">
            {/* Top bar */}
            <header className="flex items-center text-xs gap-1">
                <MapPin className="w-4 h-4" />
                <span
                    className=" text-primary-text
                    "
                >
                    Monteria / Lorica, Col
                </span>
            </header>

            {/* Hero copy */}
            <div className="flex flex-col gap-3">
                <div>
                    <span className="text-white/80 text-4xl">Domina tu</span>
                    <h1 className="text-4xl leading-tight text-foreground ">
                        instrumento favorito
                    </h1>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground ">
                    Cursos online de música guiados por profesores expertos, a
                    tu ritmo y desde cualquier lugar.
                </p>
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
                        <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-black/5" />
                        <div className="absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-black/10" />

                        {/* Contenido */}
                        <div className="relative flex flex-col gap-3 px-1.5">
                            <span className="w-fit rounded-full  px-3 py-1 text-xs font-medium text-white/70 p-2 bg-white/10 mt-2">
                                {slide.tag}
                            </span>
                            <h3 className="text-xl font-bold text-white/80 text-balance">
                                {slide.title}
                            </h3>
                            <div className="flex items-end gap-1">
                                <span className="text-md text-primary-text">
                                    {slide.upTo}
                                </span>
                                <span className="text-4xl font-extrabold leading-none text-foreground">
                                    {slide.amount}
                                </span>
                                <span className="mb-1 text-xl font-bold text-fore">
                                    %
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-primary-text">
                                    {slide.note}
                                </span>
                                <button className="rounded-xl bg-white/40 px-3 py-1.5 mb-1 text-sm font-semibold text-black">
                                    Mas Informacion
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
                    <h2 className="text-lg font-bold text-white/70">
                        Categorías
                    </h2>
                    <Button variant="outline" className="h-8 px-4 text-sm text-foreground/60 border-foreground/60">
                        Ver todo
                    </Button>
                </div>
                <div className="flex  justify-evenly w-full gap-3  pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {categories.map(({ label, Icon }) => (
                        <button
                            key={label}
                            className="group flex flex-col items-center gap-2 rounded-3xl bg-card px-2 py-3 text-center transition hover:bg-primary/5"
                        >
                            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-background text-primary-text transition group-hover:bg-primary/10">
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
