"use client";

import Image from "next/image";
import Link from "next/link";
import { Music, Heart, ArrowUp, Settings } from "lucide-react";

const footerLinks = {
    cursos: [
        { label: "Acordeon", href: "#cursos" },
        { label: "Caja Vallenata", href: "#cursos" },
        { label: "Guacharaca", href: "#cursos" },
        { label: "Canto Vallenato", href: "#cursos" },
        { label: "Composicion", href: "#cursos" },
    ],
    escuela: [
        { label: "Sobre Nosotros", href: "#nosotros" },
        { label: "Metodologia", href: "#metodo" },
        { label: "Instrumentos", href: "#instrumentos" },
        { label: "Testimonios", href: "#testimonios" },
        { label: "Preguntas Frecuentes", href: "#faq" },
    ],
    recursos: [
        { label: "Blog Vallenato", href: "#" },
        { label: "Historia del Vallenato", href: "#" },
        { label: "Videos Tutoriales", href: "#" },
        { label: "Galeria de Fotos", href: "#" },
        { label: "Contacto", href: "#contacto" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-background-secondary relative overflow-hidden ">

            {/* Línea */}
            <div className="h-1 bg-linear-to-r from-transparent via-foreground/30 to-transparent" />

            <div className="container mx-auto px-4 py-10 md:py-10">

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-8 text-center sm:text-left">

                    {/* BRAND */}
                    <div className="lg:col-span-2 flex flex-col items-center sm:items-start">
                        <Link
                            href="/"
                            className="flex items-center gap-3 mb-5"
                        >
                            <Image
                                src="/img/logo.jpg"
                                alt="Hector Ibañez Escuela Vallenata"
                                width={50}
                                height={50}
                                className="rounded-xl"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-foreground">
                                    Hector Ibañez
                                </h3>
                                <p className="text-[10px] text-ring/60 tracking-[0.25em] uppercase">
                                    Escuela Vallenata
                                </p>
                            </div>
                        </Link>

                        <p className="text-ring mb-5 max-w-xs text-sm leading-relaxed">
                            Formando artistas del vallenato desde 2009. Preservamos la tradición musical del Caribe colombiano.
                        </p>

                        <div className="flex items-center gap-2 text-foreground/80 text-sm">
                            <Music className="h-4 w-4" />
                            <span>Fundación Leyenda Vallenata</span>
                        </div>
                    </div>

                    {/* SECCIONES */}
                    {[ 
                        { title: "Cursos", data: footerLinks.cursos },
                        { title: "Escuela", data: footerLinks.escuela },
                        { title: "Recursos", data: footerLinks.recursos },
                    ].map((section) => (
                        <div key={section.title}>
                            <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                                {section.title}
                            </h4>

                            <ul className="space-y-2">
                                {section.data.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-ring hover:text-foreground transition-colors text-sm"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* BOTTOM */}
                <div className="border-t border-ring/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">

                    <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-ring">
                        <p>© 2026 Escuela Vallenata Hector Ibañez</p>

                        <Link
                            href="/admin"
                            className="flex items-center gap-1 text-xs hover:text-ring/80"
                        >
                            <Settings className="h-3 w-3" />
                            Admin
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="text-sm text-ring flex items-center gap-1">
                            Hecho con <Heart className="h-3.5 w-3.5" /> Lorica Colombia
                        </p>

                        <a
                            href="#inicio"
                            className="w-9 h-9 rounded-full flex items-center justify-center text-ring hover:bg-foreground/10 transition-all duration-300"
                        >
                            <ArrowUp className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}