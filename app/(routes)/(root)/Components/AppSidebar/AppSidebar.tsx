"use client";

import { routes, routesTeacher } from "./AppSidebar.data";
import { Separator } from "@/components/ui/separator";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export function AppSidebar() {
    const { state } = useSidebar();
    const pathname = usePathname();
    const isExpanded = state === "expanded";

    return (
        <Sidebar
            collapsible="icon"
            className="
            transition-[width] duration-300 ease-in-out
            group-data-[collapsible=icon]:w-20
            z-50 shrink-0
            [&[data-state=expanded]]:w-44 xl:[&[data-state=expanded]]:w-64
        "
        >
            <SidebarContent className="bg-[#120d08] text-foreground flex flex-col h-full p-0 border-r border-ring/20 shadow-xl overflow-hidden">
                {/* HEADER */}
                <SidebarHeader className="flex items-center flex-row gap-3 px-4 py-4 border-b border-ring/20 bg-[#161008]">
                    <Image
                        alt="Logo"
                        src="/img/logo.jpg"
                        width={42}
                        height={42}
                        className="rounded-full border border-ring/30 shrink-0"
                    />

                    {isExpanded && (
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold truncate">
                                Escuela Vallenata
                            </span>
                            <span className="text-xs text-muted-foreground truncate">
                                Hector Ibañez
                            </span>
                        </div>
                    )}
                </SidebarHeader>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
                    {/* PRINCIPAL */}
                    <SidebarGroup>
                        {isExpanded && (
                            <SidebarGroupLabel className="text-[10px] px-3 text-muted-foreground/70 uppercase">
                                Principal
                            </SidebarGroupLabel>
                        )}

                        <SidebarMenu className="mt-2 space-y-1">
                            {routes.map((item) => {
                                const isActive = pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                        >
                                            <Link
                                                href={item.url}
                                                className={`
                                                    flex items-center gap-3 px-3 py-2 rounded-xl
                                                    transition-all duration-200
                                                    cursor-pointer
                                                    hover:bg-white/5
                                                    ${isActive ? "bg-yellow-900/30 text-yellow-400" : "text-muted-foreground hover:text-foreground"}
                                                    ${!isExpanded ? "justify-center" : ""}
                                                `}
                                            >
                                                <item.icon className="h-5 w-5 shrink-0" />

                                                {isExpanded && (
                                                    <span className="text-sm font-medium">
                                                        {item.title}
                                                    </span>
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>

                    <Separator className="opacity-20" />

                    {/* DOCENCIA */}
                    <SidebarGroup>
                        {isExpanded && (
                            <SidebarGroupLabel className="text-[10px] px-3 text-muted-foreground/70 uppercase">
                                Docencia
                            </SidebarGroupLabel>
                        )}

                        <SidebarMenu className="mt-2 space-y-1">
                            {routesTeacher.map((item) => {
                                const isActive = pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                        >
                                            <Link
                                                href={item.url}
                                                className={`
                                                    flex items-center gap-3 px-3 py-2 rounded-xl
                                                    transition-all duration-200
                                                    cursor-pointer
                                                    hover:bg-white/5
                                                    ${isActive ? "bg-yellow-900/30 text-yellow-400" : "text-muted-foreground hover:text-foreground"}
                                                    ${!isExpanded ? "justify-center" : ""}
                                                `}
                                            >
                                                <item.icon className="h-5 w-5 shrink-0" />

                                                {isExpanded && (
                                                    <span className="text-sm font-medium">
                                                        {item.title}
                                                    </span>
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                </div>

                {/* USER */}
                <div className="px-4 py-4 border-t border-ring/20 bg-[#161008] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-yellow-900/30 flex items-center justify-center text-yellow-400 font-bold shrink-0">
                        J
                    </div>

                    {isExpanded && (
                        <div className="min-w-0">
                            <span className="text-sm font-semibold block truncate">
                                Juan Díaz
                            </span>
                            <span className="text-xs text-muted-foreground block truncate">
                                Estudiante Pro
                            </span>
                        </div>
                    )}
                </div>
            </SidebarContent>
        </Sidebar>
    );
}
