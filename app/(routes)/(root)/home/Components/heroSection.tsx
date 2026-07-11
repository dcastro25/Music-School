"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Music, Users, Award, Star } from "lucide-react";
import { useCountUp } from "../../hooks/use-scroll-reveal";
import Link from "next/link";

function StatCounter({
    end,
    suffix,
    label,
    icon: Icon,
}: {
    end: number;
    suffix: string;
    label: string;
    icon: React.ElementType;
}) {
    const { count, ref } = useCountUp(end, 2000);
    return (
        <div ref={ref} className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold text-white">
                    {count}
                    {suffix}
                </span>
            </div>
            <p className="text-xs text-center text-white/40">{label}</p>
        </div>
    );
}

export function HeroSection() {
    return (
        <section
            id="inicio"
            className="relative w-full bg-[#0a0700] min-h-[calc(100vh-80px)] flex-col mt-4 hidden sm:flex"
        >
            <div className="absolute pointer-events-none top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_#b8860b0a_0%,_transparent_70%)]" />

            <div className="container mx-auto px-6 lg:px-12 xl:px-16 2xl:px-24 relative z-10 flex flex-col flex-1">
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_420px] 2xl:grid-cols-[1fr_500px] gap-10 lg:gap-16 2xl:gap-24 items-center py-12 lg:py-16">
                    <div className="flex flex-col justify-center ">
                        <div className="flex items-center gap-2 mb-5">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star
                                        key={i}
                                        className="h-3.5 w-3.5 fill-primary text-primary"
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-white/45">
                                +500 estudiantes satisfechos
                            </span>
                        </div>
                        <div className="inline-flex w-fit items-center gap-2 border border-primary/25 bg-primary/[0.08] px-4 py-1.5 rounded-full mb-6">
                            <Music className="h-3 w-3 text-primary" />
                            <span className="text-xs text-primary font-semibold uppercase tracking-widest">
                                Tradicion y Pasion Vallenata
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-6 text-white/80">
                            Aprende el Arte del{" "}
                            <span className="relative inline-block text-primary">
                                Vallenato
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 300 10"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M2 8C75 2 225 2 298 8"
                                        stroke="#d4a017"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>{" "}
                            con los Mejores Maestros
                        </h1>

                        <p className="text-base lg:text-lg 2xl:text-xl font-serif leading-relaxed text-white/55 mb-10 max-w-lg 2xl:max-w-2xl">
                            Descubre la magia de la música caribeña colombiana.
                            Cursos de acordeón, caja, guacharaca y las canciones
                            que han marcado generaciones.
                        </p>

                        <div className="flex  justify-center flex-wrap gap-10">
                            <Link href={"/courses"}>
                                <Button
                                    size="lg"
                                    variant="default"
                                    className="px-5 py-5  "
                                >
                                    Comenzar Mi Viaje Musical
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="px-8 py-5 "
                            >
                                <Play className="h-4 w-4 mr-2" />
                                Ver Presentacion
                            </Button>
                        </div>

                        <div className="flex justify-evenly items-center gap-8 lg:gap-14 py-8 mt-10 border-t border-white/10 relative z-10">
                            <StatCounter
                                end={500}
                                suffix="+"
                                label="Estudiantes Graduados"
                                icon={Users}
                            />
                            <div className="w-px h-9 bg-white/10" />
                            <StatCounter
                                end={15}
                                suffix="+"
                                label="Años de Experiencia"
                                icon={Award}
                            />
                            <div className="w-px h-9 bg-white/10" />
                            <StatCounter
                                end={50}
                                suffix="+"
                                label="Cursos Disponibles"
                                icon={Music}
                            />
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center justify-center py-16">
                        <div
                            className="relative"
                            style={{ width: "380px", height: "520px" }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(135deg, #d4a01733, transparent)",
                                    borderRadius: "28px",
                                    transform: "rotate(3deg) scale(1.02)",
                                    filter: "blur(1px)",
                                }}
                            />

                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "24px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(212,160,23,0.2)",
                                    boxShadow:
                                        "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
                                }}
                            >
                                <img
                                    src="https://i.pinimg.com/1200x/b8/3c/23/b83c23e493d4b03d7287f038cc65e452.jpg"
                                    alt="Maestro vallenato tocando acordeon"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        objectPosition: "center top",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: "45%",
                                        background:
                                            "linear-gradient(to top, rgba(10,7,0,0.85) 0%, transparent 100%)",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    position: "absolute",
                                    top: "-14px",
                                    right: "-14px",
                                    background: "#d4a017",
                                    color: "#0a0700",
                                    borderRadius: "20px",
                                    padding: "6px 14px",
                                    zIndex: 10,
                                    boxShadow:
                                        "0 4px 16px rgba(212,160,23,0.4)",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: 700,
                                    }}
                                >
                                    ✦ Nuevo Semestre
                                </span>
                            </div>

                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "-18px",
                                    left: "-18px",
                                    background: "rgba(10,7,0,0.92)",
                                    backdropFilter: "blur(12px)",
                                    border: "1px solid rgba(212,160,23,0.2)",
                                    borderRadius: "16px",
                                    padding: "12px 16px",
                                    zIndex: 10,
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "38px",
                                            height: "38px",
                                            borderRadius: "50%",
                                            background: "rgba(212,160,23,0.15)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Music
                                            className="h-4 w-4"
                                            style={{ color: "#d4a017" }}
                                        />
                                    </div>
                                    <div>
                                        <p
                                            style={{
                                                fontWeight: 700,
                                                color: "#fff",
                                                fontSize: "13px",
                                                margin: 0,
                                            }}
                                        >
                                            Clases en Vivo
                                        </p>
                                        <p
                                            style={{
                                                fontSize: "11px",
                                                color: "rgba(255,255,255,0.5)",
                                                margin: 0,
                                            }}
                                        >
                                            Presencial y Online
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    position: "absolute",
                                    top: "40px",
                                    left: "-30px",
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4,6px)",
                                    gap: "6px",
                                    zIndex: 0,
                                }}
                            >
                                {Array.from({ length: 16 }).map((_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            width: "4px",
                                            height: "4px",
                                            borderRadius: "50%",
                                            background: "rgba(212,160,23,0.2)",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
