"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Music2, Drum, Waves, ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/use-scroll-reveal";

const instruments = [
    {
        id: 1,
        name: "Acordeon",
        icon: Music2,
        description:
            "El rey del vallenato. Aprende a dominar este instrumento de teclas y fuelle que da vida a nuestra musica. Con el acordeon, cada nota cuenta una historia del Caribe.",
        image: "/img/vallenato-accordion-detailed-colombian-traditional.jpg",
        features: [
            "Tecnica de fuelle",
            "Digitacion avanzada",
            "Aires vallenatos",
            "Piqueria y adornos",
        ],
        funFact:
            "El acordeon llego a Colombia desde Alemania a finales del siglo XIX",
    },
    {
        id: 2,
        name: "Caja Vallenata",
        icon: Drum,
        description:
            "El corazon ritmico. Un tambor de doble parche que marca el pulso inconfundible del vallenato. Sin la caja, el vallenato pierde su esencia.",
        image: "/img/caja-vallenata-traditional-colombian-drum-percussi.jpg",
        features: [
            "Ritmo paseo",
            "Merengue vallenato",
            "Son y puya",
            "Improvisacion",
        ],
        funFact:
            "La caja vallenata tiene raices en los tambores africanos traidos al Caribe",
    },
    {
        id: 3,
        name: "Guacharaca",
        icon: Waves,
        description:
            "El sonido ancestral. Instrumento de raspado que aporta la textura unica al conjunto vallenato. Su nombre viene del ave guacharaca.",
        image: "/img/guacharaca-colombian-scraper-instrument-traditiona.jpg",
        features: [
            "Tecnica de raspe",
            "Coordinacion ritmica",
            "Patrones tradicionales",
            "Estilo propio",
        ],
        funFact:
            "La guacharaca original se fabricaba del tallo de la palma de lata",
    },
];

function InstrumentCard({
    instrument,
    index,
}: {
    instrument: (typeof instruments)[0];
    index: number;
}) {
    const { ref, isVisible } = useScrollReveal(0.15);
    const isReversed = index % 2 === 1;

    return (
        <div
            ref={ref}
            // FIX: transition-all -> transition-[opacity,transform]. Esta tarjeta entera
            // (imagen + texto + botón) se traslada en Y al entrar en viewport durante el
            // scroll; con transition-all el navegador vigila propiedades de más (sombras,
            // colores, bordes de los hijos) en cada frame, lo cual es innecesario y caro.
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center
                pt-16 sm:pt-20 lg:pt-0 first:pt-0
                transition-[opacity,transform] duration-1000 will-change-transform ${
                    isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-12"
                }`}
        >
            {/* Image */}
            <div className={`relative ${isReversed ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[3/4] sm:aspect-[4/5] max-w-[300px] sm:max-w-md mx-auto group">
                    {/* Decorative shapes */}
                    <div
                        className={`absolute -inset-2 sm:-inset-3 bg-primary/8 rounded-3xl transform ${
                            isReversed ? "-rotate-3" : "rotate-3"
                        } transition-transform duration-500 group-hover:${
                            isReversed ? "-rotate-6" : "rotate-6"
                        }`}
                    />
                    <div
                        className={`absolute -inset-2 sm:-inset-3 bg-[var(--gold-400)]/6 rounded-3xl transform ${
                            isReversed ? "rotate-2" : "-rotate-2"
                        }`}
                    />
                    <Image
                        src={instrument.image || "/placeholder.svg"}
                        alt={instrument.name}
                        fill
                        className="object-cover rounded-3xl relative z-10 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    {/* Fun fact */}
                    {/* FIX: transition-all -> transition-[opacity,transform]. Aquí sí cambian
                        ambas propiedades a la vez (opacity y translate-y), pero no hace falta
                        vigilar todas las demás. */}
                    <div className="absolute -bottom-5 sm:-bottom-6 left-3 right-3 sm:left-4 sm:right-4 bg-card p-3 sm:p-4 rounded-xl shadow-xl z-20 border border-border/50 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-[opacity,transform] duration-500 transform lg:translate-y-4 lg:group-hover:translate-y-0">
                        <p className="text-xs text-muted-foreground font-serif italic">
                            <span className="text-primary font-semibold font-sans not-italic">
                                ¿Sabías que?{" "}
                            </span>
                            {instrument.funFact}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={`flex flex-col mt-8 sm:mt-10 lg:mt-0 ${isReversed ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-3 shrink-0">
                        <instrument.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white/70">
                            {instrument.name}
                        </h3>
                        <div className="w-10 sm:w-12 h-1 bg-primary rounded-full mt-1" />
                    </div>
                </div>

                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-serif">
                    {instrument.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {instrument.features.map((feature) => (
                        <div
                            key={feature}
                            // FIX: transition-all -> transition-colors. Acá solo cambian
                            // background-color y border-color en hover, no hay transform
                            // ni opacity de por medio.
                            className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/30 transition-colors duration-300 hover:bg-primary/5 hover:border-primary/20 group/feat"
                        >
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full shrink-0 transition-transform group-hover/feat:scale-125" />
                            <span className="text-sm text-white/70 font-medium">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                {/* FIX: transition-all -> transition-transform. El hover solo mueve el
                    botón en Y (-translate-y-0.5); los cambios de color del variant del
                    Button ya tienen su propia transición interna. */}
                <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 group/btn">
                    Explorar Cursos de {instrument.name}
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
            </div>
        </div>
    );
}

export function InstrumentsSection() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

    return (
        <section
            id="instrumentos"
            className="py-10 sm:py-10 lg:py-15 bg-secondary/30 relative overflow-hidden"
        >
            <div className="absolute inset-0 note-pattern opacity-15" />
            <div className="absolute top-20 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-primary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <div
                    ref={headerRef}
                    // FIX: transition-all -> transition-[opacity,transform]
                    className={`text-center max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto mb-14 sm:mb-16 lg:mb-20 transition-[opacity,transform] duration-1000 will-change-transform ${
                        headerVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                        <Music2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                        <span className="text-xs sm:text-sm text-primary font-semibold">
                            Instrumentos
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/70 mb-4 sm:mb-5 text-balance leading-tight">
                        Los <span className="text-primary">Tres Pilares</span> del Vallenato
                    </h2>
                    <p className="text-muted-foreground font-serif text-lg">
                        Acordeon, caja y guacharaca: la trilogia sagrada que da
                        vida a nuestra musica. Aprende a dominar cada uno con
                        maestros especializados.
                    </p>
                </div>

                {/* Instruments */}
                <div className="divide-y divide-border/40 lg:divide-y-0 space-y-0 lg:space-y-28">
                    {instruments.map((instrument, index) => (
                        <InstrumentCard
                            key={instrument.id}
                            instrument={instrument}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}