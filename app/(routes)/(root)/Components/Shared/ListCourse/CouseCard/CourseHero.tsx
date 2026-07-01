import Image from "next/image";
import { Sparkles } from "lucide-react";

export function CoursesHero() {
    return (
        <section className="container mx-auto px-4 pb-6">
            <div
                className="relative overflow-hidden rounded-3xl border"
                style={{
                    background: "var(--background-secondary)",
                    borderColor: "rgba(134,125,102,0.35)",
                }}
            >
                
                <div
                    className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full"
                    aria-hidden
                    style={{
                        background: "radial-gradient(circle, rgba(228,158,34,0.06) 0%, transparent 70%)",
                    }}
                />

                <div className="relative flex flex-col lg:flex-row lg:items-stretch">
                    
                    <div className="flex flex-col justify-center gap-5 px-8 py-10 sm:px-12 lg:flex-1">
                        
                        <div className="flex">
                            <span
                                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                                style={{
                                    background: "rgba(228,158,34,0.10)",
                                    border: "0.5px solid rgba(228,158,34,0.30)",
                                    color: "var(--primary)",
                                }}
                            >
                                <Sparkles className="h-3 w-3" />
                                Nueva temporada de cursos
                            </span>
                        </div>

                        <h1
                            className="text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
                            style={{ color: "var(--primary)" }}
                        >
                            Encuentra tu sonido,{" "}
                            <span style={{ color: "rgba(228,158,34,0.50)" }}>
                                vive la música
                            </span>
                        </h1>

                        <p
                            className="max-w-sm text-sm leading-relaxed sm:text-base"
                            style={{ color: "var(--muted-foreground)" }}
                        >
                            Desde tus primeros acordes hasta la maestría del
                            vallenato. Aprende con profesores expertos a tu
                            propio ritmo.
                        </p>
                    </div>

                    <div className="relative h-56 w-full overflow-hidden lg:h-auto lg:w-105 lg:shrink-0">

                        <div
                            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 hidden lg:block"
                            style={{
                                background: "linear-gradient(to right, var(--background-secondary), transparent)",
                            }}
                        />

                        <div
                            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 lg:hidden"
                            style={{
                                background: "linear-gradient(to bottom, var(--background-secondary), transparent)",
                            }}
                        />
                        <Image
                            src="https://i.pinimg.com/1200x/b8/3c/23/b83c23e493d4b03d7287f038cc65e452.jpg"
                            alt="Músico tocando el acordeón vallenato"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 420px"
                            className="object-cover object-center"
                            style={{ filter: "brightness(0.75) sepia(0.15)" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}