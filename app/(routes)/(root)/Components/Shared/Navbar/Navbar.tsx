"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSearch } from "@/hooks/useSearch";
import { BellRing, Search, X } from "lucide-react";
import { useNavbarUI } from "./useNavbar";

export function Navbar() {
    const { isAtTop, openSearch, setOpenSearch } = useNavbarUI();
    const { setValue, value, clearSearch } = useSearch();

    return (
        <div className="sticky z-40 w-full top-0 border-b border-ring/30 bg-bgPrimary flex flex-col transition-[width,margin] duration-200 ease-linear">
            {/* Barra informativa */}
            <div
                className={`hidden md:grid transition-all duration-200 ease-linear ${
                    isAtTop ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="bg-background-secondary border-b border-border/30 text-bgSecondary text-sm pl-10 pr-10 h-10 flex justify-between items-center">
                        <div className="flex gap-6">
                            <a href="#">Gmail@gmail.com</a>
                            <a href="#">322 332 2352</a>
                            <a href="#">Montería / Córdoba</a>
                        </div>
                        <p>Inscripciones Abiertas 2026</p>
                    </div>
                </div>
            </div>

            {/* Navbar móvil */}
            <div className="flex md:hidden items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <SidebarTrigger />
                    <div className="flex items-center gap-2">
                        <img
                            src="/img/logo.jpg"
                            className="h-9 w-9 rounded-xl object-cover"
                        />
                        <div className="leading-tight">
                            <h1 className="text-sm font-semibold text-textPrimary">
                                Hector Ibañez
                            </h1>
                            <p className="text-[11px] text-textSecondary">
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
                        <Search className="size-5 text-textSecondary" />
                    </button>
                    <Button variant="outline" className="h-9 w-9 p-0">
                        <BellRing className="size-4" />
                    </Button>
                </div>
            </div>

            {/* Buscador móvil expandible */}
            <div
                className={`md:hidden grid transition-all duration-200 ease-linear ${
                    openSearch ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar..."
                                className="pl-9 pr-9 bg-white/5 border-white/10 focus-visible:ring-0"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            {value && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar desktop */}
            <div className="hidden md:flex flex-row justify-between items-center bg-background/85 pr-26 pl-10 py-5">
                <div className="flex flex-row justify-between items-center gap-4">
                    <SidebarTrigger />
                    <div className="max-w-6xl flex flex-row gap-4">
                        <img
                            src="/img/logo.jpg"
                            className="h-14 w-auto rounded-2xl"
                        />
                        <div>
                            <h1 className="text-textPrimary font-bold text-xl">
                                Hector Ibañez
                            </h1>
                            <p className="text-textSecondary">
                                Escuela vallenata
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                        <Input
                            type="text"
                            placeholder="Buscar..."
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="pl-9 pr-9 border-0 bg-transparent focus-visible:border-none text-primary-text placeholder:text-muted-foreground"
                        />
                        {value && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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