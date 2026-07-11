"use client";

import Image from "next/image";
import {
    CheckCircle,
    Heart,
    Target,
    Sparkles,
    GraduationCap,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/use-scroll-reveal";

const values = [
    {
        icon: Heart,
        title: "Pasion por la Tradicion",
        description:
            "Preservamos y transmitimos el legado del vallenato con amor y respeto por nuestras raices.",
    },
    {
        icon: Target,
        title: "Metodologia Probada",
        description:
            "Tecnicas de enseñanza desarrolladas durante mas de 15 años para un aprendizaje efectivo.",
    },
    {
        icon: Sparkles,
        title: "Ambiente Familiar",
        description:
            "Una comunidad calida donde cada estudiante es parte de nuestra familia vallenata.",
    },
    {
        icon: GraduationCap,
        title: "Certificacion Oficial",
        description:
            "Diploma avalado por instituciones culturales del Caribe colombiano.",
    },
];

const achievements = [
    "Formacion de artistas reconocidos a nivel nacional",
    "Participacion en el Festival de la Leyenda Vallenata",
    "Reconocimiento del Ministerio de Cultura",
    "Alianzas con escuelas de musica del Caribe",
    "Mas de 500 estudiantes graduados exitosamente",
];

export function About() {
    const { ref: imagesRef, isVisible: imagesVisible } = useScrollReveal();
    const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

    return (
        <section
            id="nosotros"
            className="pt-10 pb-7 bg-secondary/40 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--gold-400)]/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-10 md:pl-12 relative">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">

                    <div
                        ref={imagesRef}

                        className={`relative order-2 lg:order-1 transition-[opacity,transform] duration-1000 will-change-transform ${
                            imagesVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-12"
                        }`}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden card-hover shadow-lg">
                                    <Image
                                        src="https://i.pinimg.com/1200x/b8/3c/23/b83c23e493d4b03d7287f038cc65e452.jpg"
                                        alt="Clase de acordeon"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative aspect-square rounded-2xl overflow-hidden card-hover shadow-lg">
                                    <Image
                                        src="https://i.pinimg.com/1200x/b8/3c/23/b83c23e493d4b03d7287f038cc65e452.jpg"
                                        alt="Guacharaca tradicional"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-10">
                                <div className="relative aspect-square rounded-2xl overflow-hidden card-hover shadow-lg">
                                    <Image
                                        src="https://i.pinimg.com/1200x/b8/3c/23/b83c23e493d4b03d7287f038cc65e452.jpg"
                                        alt="Caja vallenata"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden card-hover shadow-lg">
                                    <Image
                                        src="https://i.pinimg.com/1200x/b8/3c/23/b83c23e493d4b03d7287f038cc65e452.jpg"
                                        alt="Presentacion vallenata"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card/95 border border-primary/20 text-foreground px-4 py-2 rounded-2xl shadow-2xl z-20 flex items-center gap-4">
                            <span className="text-2xl font-bold text-primary">
                                15+
                            </span>
                            <div>
                                <p className="font-semibold text-sm text-white/70">Años de</p>
                                <p className="font-semibold text-sm text-white/70">
                                    Experiencia
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div
                        ref={contentRef}
                        className={`order-1 lg:order-2 transition-[opacity,transform] duration-1000 delay-200 will-change-transform ${
                            contentVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-12"
                        }`}
                    >
                        <span className="text-primary font-semibold uppercase tracking-[0.2em] text-sm">
                            Sobre Nosotros
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/70 mt-3 mb-6 text-balance leading-tight">
                            Mas de <span className="text-foreground">15 Años</span> Formando{" "}
                            <span>
                                Artistas del Vallenato
                            </span>
                        </h2>
                        <p className="text-primary-text leading-relaxed mb-6 font-serif ">
                            La Escuela Vallenata Hector Ibañez nacio del sueño
                            de preservar y difundir nuestra musica tradicional.
                            Fundada por el maestro Hector Ibañez, reconocido
                            acordeonero y compositor, nuestra escuela se ha
                            convertido en un referente de la ensenanza musical
                            en el Caribe colombiano.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-10 font-serif">
                            Creemos que la musica vallenata es mas que melodias:
                            es historia, es cultura, es el alma de nuestra
                            tierra. Por eso, cada clase es una experiencia que
                            conecta a nuestros estudiantes con sus raices.
                        </p>

                        {/* Values */}
                        <div className="grid sm:grid-cols-2 gap-5 mb-10">
                            {values.map((value, i) => (
                                <div
                                    key={value.title}
                                    className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 card-hover"
                                    style={{ transitionDelay: `${i * 100}ms` }}
                                >
                                    <div className="flex-shrink-0 w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <value.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-0.5 text-sm">
                                            {value.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}