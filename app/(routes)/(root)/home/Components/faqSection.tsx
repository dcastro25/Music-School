"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "../../hooks/use-scroll-reveal";

const faqs = [
    {
        question: "Necesito experiencia previa para inscribirme?",
        answer: "No, nuestros cursos estan disenados para todos los niveles. Tenemos programas especiales para principiantes absolutos donde aprenderas desde lo mas basico. Nuestros maestros adaptan cada clase segun tu nivel.",
    },
    {
        question: "Que instrumentos necesito para comenzar?",
        answer: "Para el curso de acordeon para principiantes, proporcionamos instrumentos de practica durante las clases. Para la guacharaca, el instrumento esta incluido en el curso. Solo necesitas traer tus ganas de aprender. Si deseas tener tu propio instrumento, te asesoramos en la compra.",
    },
    {
        question: "Ofrecen clases online?",
        answer: "Si! Ofrecemos clases tanto presenciales en Monteria como clases online en vivo a traves de videollamada . Nuestros estudiantes internacionales pueden disfrutar de la misma calidad de ensenanza desde cualquier lugar del mundo.",
    },
    {
        question: "Cuanto tiempo toma aprender a tocar un instrumento?",
        answer: "Depende del instrumento y la dedicacion del estudiante. En general, en 3 meses ya puedes tocar tus primeras canciones. Para un nivel intermedio solido, recomendamos 6-8 meses de practica constante. La maestria es un camino de toda la vida.",
    },
    {
        question: "Que edades aceptan?",
        answer: "Aceptamos estudiantes desde los 8 años en adelante. No hay limite de edad maximo. Tenemos estudiantes desde niños hasta adultos mayores que disfrutan aprendiendo musica vallenata. Nunca es tarde para comenzar.",
    },
    {
        question: "Hay presentaciones o recitales para los estudiantes?",
        answer: "Si, organizamos presentaciones trimestrales donde los estudiantes muestran su progreso. Ademas, participamos en eventos culturales y festivales locales. Es una experiencia unica que motiva mucho a nuestros alumnos.",
    },
    {
        question: "Cuales son las formas de pago?",
        answer: "Aceptamos efectivo, transferencia bancaria, Nequi, Daviplata y tarjetas de credito. Ofrecemos planes de pago mensual y descuentos por trimestre o semestre completo. Tambien tenemos un programa de becas parciales.",
    },
    {
        question: "Puedo tomar una clase de prueba?",
        answer: "Absolutamente! Ofrecemos una primera clase de prueba gratuita para que conozcas nuestro metodo, las instalaciones y al maestro. Solo necesitas agendar tu cita a traves del formulario de contacto o por WhatsApp.",
    },
];

export function FaqSection() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
    const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

    return (
        <section
            id="faq"
            className="py-15 bg-secondary/30 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div
                        ref={headerRef}
                        className={`text-center mb-16 transition-all duration-1000 ${
                            headerVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
                            <HelpCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm text-primary font-semibold">
                                Preguntas Frecuentes
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/70 mb-5 text-balance leading-tight">
                            Resolvemos Tus 
                            <span className="text-primary"> Dudas</span>
                        </h2>
                        <p className="text-muted-foreground font-serif text-lg max-w-2xl mx-auto">
                            Todo lo que necesitas saber antes de comenzar tu
                            viaje musical con nosotros.
                        </p>
                    </div>

                    {/* Accordion */}
                    <div
                        ref={contentRef}
                        className={`transition-all duration-1000 delay-200 ${
                            contentVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-3"
                        >
                            {faqs.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i}`}
                                    className="bg-card border border-border/50 rounded-xl px-6 shadow-sm data-[state=open]:shadow-md data-[state=open]:border-primary/30 transition-all duration-300"
                                >
                                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-5 hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground font-serif leading-relaxed pb-5">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-12">
                        <p className="text-muted-foreground mb-4">
                            Tienes mas preguntas?
                        </p>
                        <Button
                            asChild
                            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg shadow-primary/20"
                        >
                            <a href="#contacto">
                                Contactanos directamente
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
