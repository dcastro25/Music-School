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
        <div className=" top-0 z-40 border-b border-white/10 flex flex-col bg-transparent">
            {/* ── Barra info (desktop) ── */}
            <div
                className={`hidden md:grid transition-all duration-200 ${
                    isAtTop ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="bg-[#111111] border-b border-white/10 text-gray-400 text-sm px-10 h-10 flex justify-between items-center">
                        <div className="flex gap-6">
                            <a href="#">Gmail@gmail.com</a>
                            <a href="#">322 332 2352</a>
                            <a href="#">Montería / Córdoba</a>
                        </div>
                        <p>Inscripciones Abiertas 2026</p>
                    </div>
                </div>
            </div>

            {/* ── MÓVIL ── */}
            <div className="flex md:hidden items-center justify-between px-4 py-3 bg-[#0B0B0B]">
                <div className="flex items-center gap-3">
                    <SidebarTrigger />

                    <div className="flex items-center gap-2">
                        <img
                            src="/img/logo.jpg"
                            className="h-9 w-9 rounded-xl object-cover"
                            alt="Logo"
                        />

                        <div className="leading-tight">
                            <h1 className="text-sm font-semibold text-white">
                                Hector Ibañez
                            </h1>
                            <p className="text-[11px] text-gray-400">
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
                        <Search className="size-5 text-gray-400" />
                    </button>

                    <Button variant="outline" className="h-9 w-9 p-0">
                        <BellRing className="size-4" />
                    </Button>
                </div>
            </div>

            {/* ── Buscador ── */}
            <div
                className={`md:hidden grid transition-all duration-200 ${
                    openSearch ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 py-3 bg-[#0B0B0B]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />

                            <Input
                                placeholder="Buscar..."
                                className="pl-9 pr-9 bg-white/5 border-white/10"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />

                            {value && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── DESKTOP ── */}
            <div className="hidden md:flex justify-between items-center bg-transparent  backdrop-blur-sm px-10 py-5">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />

                    <div className="flex gap-4 items-center">
                        <img src="/img/logo.jpg" className="h-14 rounded-2xl" />

                        <div>
                            <h1 className="text-white font-bold text-xl">
                                Hector Ibañez
                            </h1>
                            <p className="text-gray-400">Escuela vallenata</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />

                        <Input
                            placeholder="Buscar..."
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="pl-9 pr-9 bg-transparent text-white"
                        />

                        {value && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
