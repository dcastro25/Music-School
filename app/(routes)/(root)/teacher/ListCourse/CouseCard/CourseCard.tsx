"use client";

import Image from "next/image";
import { Clock, Users, Star, ChevronDown } from "lucide-react";
import { CourseCardProps } from "./CourseCard.type";
import { useState } from "react";
import { Actions } from "./Actions";

function isValidUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function CourseCard({ course }: CourseCardProps) {
    const {
        id,
        courseName,
        price,
        level,
        imageUrl,
        description,
        isPublished,
        duration,
    } = course;

    const [expanded, setExpanded] = useState(false);

    const safeImage =
        imageUrl && isValidUrl(imageUrl)
            ? imageUrl
            : "/img/default-image-course.webp";

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group w-full lg:max-w-[320px]">
           
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-45 overflow-hidden">
                <Image
                    src={safeImage}
                    alt={courseName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

             
                <span className="absolute top-2 left-2 bg-black/55 text-white text-[13px] px-2 py-0.5 rounded-full leading-tight">
                    {level || "Sin nivel"}
                </span>

              
                <span
                    className={`absolute top-2 right-2 text-[13px] px-2 py-0.5 rounded-md font-medium leading-tight ${
                        isPublished
                            ? "bg-emerald-500/90 text-white"
                            : "bg-gray-700/90 text-gray-200"
                    }`}
                >
                    {isPublished ? "✓ Publicado" : "Borrador"}
                </span>
            </div>

          
            <div className="p-2.5 md:p-5">
                
                <div className="flex items-start justify-between gap-1.5 mb-2">
                    <h3 className="text-[13px] leading-snug sm:text-base md:text-base font-semibold text-foreground line-clamp-2 flex-1">
                        {courseName}
                    </h3>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="md:hidden shrink-0 mt-0.5 p-0.5 rounded text-muted-foreground"
                        aria-label="Ver descripción"
                    >
                        <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>

                
                <div className="md:hidden grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary shrink-0" />
                        <span className="truncate">{duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 shrink-0" />
                        <span>4.5</span>
                    </div>
                    <div className="flex items-center gap-1 col-span-2">
                        <Users className="w-3 h-3 text-primary shrink-0" />
                        <span>120 estudiantes</span>
                    </div>
                </div>


                <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-primary" />
                        <span>120 estudiantes</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>4.5</span>
                    </div>
                </div>

         
                <div
                    className={`md:hidden overflow-hidden transition-all duration-500 ${
                        expanded ? "max-h-40 mb-2" : "max-h-0"
                    }`}
                >
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                        {description || "Sin descripción disponible"}
                    </p>
                </div>

                <div className="hidden md:block max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40">
                    <p className="text-sm text-muted-foreground leading-relaxed pb-1">
                        {description || "Sin descripción disponible"}
                    </p>
                </div>

                <div className="border-t border-border mt-2 mb-2 md:my-4" />

                <div className="md:hidden flex flex-col gap-1.5">
                    <p className="text-primary font-bold text-sm leading-tight">
                        {price ? `$${price.toLocaleString("es-CO")}` : "Gratis"}
                    </p>
                    <button className="w-full border border-primary text-primary text-[10px] py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition font-medium">
                        Ver curso
                    </button>
                </div>

               
                <div className="hidden md:flex items-center justify-between">
                    <p className="text-primary font-bold text-lg">
                        {price ? `$${price.toLocaleString("es-CO")}` : "Gratis"}
                        <span className="text-xs text-muted-foreground font-normal ml-1">
                            COP
                        </span>
                    </p>
                    <button className="border border-primary text-primary text-xs px-4 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition whitespace-nowrap">
                        Ver curso
                    </button>
                
                </div>

            </div>
        </div>
    );
}
