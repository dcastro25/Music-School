"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSearch } from "@/hooks/useSearch";
import { BellRing, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavbarUI } from "./useNavbar";

function useHideOnScroll(threshold = 8) {
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const diff = y - lastY.current;

            if (Math.abs(diff) < threshold) return;

            setHidden(diff > 0 && y > 60);
            lastY.current = y;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    return hidden;
}

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
        setIsMobile(mq.matches);

        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);

        return () => mq.removeEventListener("change", handler);
    }, []);

    return isMobile;
}

export function Navbar() {
    const { isAtTop, openSearch, setOpenSearch } = useNavbarUI();
    const { setValue, value, clearSearch } = useSearch();

    const isMobile = useIsMobile();
    const hidden = useHideOnScroll(8);

    const shouldHide = isMobile && hidden;

    return (
        <div
            className={`
                sticky z-50 w-full border-b border-ring/30
                bg-[#0f0b05] md:bg-background/85
                flex flex-col transition-all duration-300
                ${shouldHide ? "-top-24" : "top-0"}
            `}
        >
            {/* ───────── BARRA INFO (DESKTOP) ───────── */}
            <div
                className={`
                    hidden [@media(min-width:768px)_and_(hover:hover)]:grid
                    transition-all duration-200
                    ${isAtTop ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                `}
            >
                <div className="overflow-hidden">
                    <div className="bg-background-secondary border-b border-border/30 text-bgSecondary text-sm px-10 h-10 flex justify-between items-center">
                        <div className="flex gap-6">
                            <a href="#">Gmail@gmail.com</a>
                            <a href="#">322 332 2352</a>
                            <a href="#">Montería / Córdoba</a>
                        </div>
                        <p>Inscripciones Abiertas 2026</p>
                    </div>
                </div>
            </div>

            {/* ───────── NAVBAR MÓVIL ───────── */}
            <div className="flex [@media(min-width:768px)_and_(hover:hover)]:hidden items-center justify-between px-4 py-3 bg-[#0f0b05]">
                <div className="flex items-center gap-3">
                    <SidebarTrigger />
                    <div className="flex items-center gap-2">
                        <img
                            src="/img/logo.jpg"
                            className="h-9 w-9 rounded-xl object-cover transform-gpu"
                            alt="Logo Hector Ibañez"
                        />
                        <div className="leading-tight">
                            <h1 className="text-sm font-semibold text-[#f5e9c9]">
                                Hector Ibañez
                            </h1>
                            <p className="text-[11px] text-white/60">
                                Escuela vallenata
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setOpenSearch(!openSearch)}
                        className="p-2 rounded-lg hover:bg-white/5 transition"
                    >
                        <Search className="size-5 text-white/60" />
                    </button>
                    <Button variant="outline" className="h-9 w-9 p-0">
                        <BellRing className="size-4" />
                    </Button>
                </div>
            </div>

            {/* ───────── BUSCADOR MÓVIL ───────── */}
            <div
                className={`
                    [@media(min-width:768px)_and_(hover:hover)]:hidden grid
                    transition-all duration-200
                    ${openSearch ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                `}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-3 bg-[#0f0b05]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                            <Input
                                placeholder="Buscar..."
                                className="pl-9 pr-9 bg-white/5 border-white/10"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            {value && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ───────── NAVBAR DESKTOP ───────── */}
            <div className="hidden [@media(min-width:768px)_and_(hover:hover)]:flex justify-between items-center px-10 py-5 bg-background/85">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <div className="flex gap-4 items-center">
                        <img
                            src="/img/logo.jpg"
                            className="h-14 rounded-2xl transform-gpu"
                            alt="Logo"
                        />
                        <div>
                            <h1 className="text-[#f5e9c9] font-bold text-xl">
                                Hector Ibañez
                            </h1>
                            <p className="text-white/60">
                                Escuela vallenata
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                        <Input
                            placeholder="Buscar..."
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="pl-9 pr-9 bg-transparent border-0 text-[#f5e9c9]"
                        />
                        {value && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                            >
                                <X className="size-4" />
                            </button>
                        )}
                    </div>

                    <Button variant="outline">
                        <BellRing />
                    </Button>
                </div>
            </div>
        </div>
    );
}