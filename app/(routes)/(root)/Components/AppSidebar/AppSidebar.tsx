"use client";

import { routes, routesTeacher } from "./AppSidebar.data";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Show, SignInButton, useClerk, useUser } from "@clerk/nextjs";

import { LogIn, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export function AppSidebar() {
    const { state } = useSidebar();
    const pathname = usePathname();
    const isExpanded = state === "expanded";
    const { user } = useUser();
    const { openUserProfile, signOut } = useClerk();

    const isAdmin = user?.publicMetadata?.role === "admin";

    return (
        <Sidebar
            collapsible="icon"
            className="
            transition-[width] duration-300 ease-in-out
            group-data-[collapsible=icon]:w-20
            z-50 shrink-0
            data-[state=expanded]:w-44 xl:data-[state=expanded]:w-64
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

                    {/* DOCENCIA — solo visible para admins */}
                    {isAdmin && (
                        <>
                            <Separator className="opacity-20" />

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
                        </>
                    )}
                </div>

                {/* USER */}
                <div className="px-4 py-4 border-t border-ring/20 bg-[#161008] flex items-center gap-3">
                    {/* Usuario con sesión iniciada */}
                    <Show when="signed-in">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    className={`
                                        flex items-center gap-3 w-full rounded-lg
                                        text-left cursor-pointer
                                        hover:opacity-90 active:opacity-80
                                        transition-opacity outline-none
                                        ${!isExpanded ? "justify-center" : ""}
                                    `}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={
                                            user?.imageUrl ??
                                            "/img/avatar-placeholder.png"
                                        }
                                        alt={user?.fullName ?? "Usuario"}
                                        width={36}
                                        height={36}
                                        className="rounded-full shrink-0 w-9 h-9 object-cover"
                                    />

                                    {isExpanded && (
                                        <div className="min-w-0">
                                            <span className="text-sm font-semibold block truncate">
                                                {user?.fullName ??
                                                    user?.username ??
                                                    "Usuario"}
                                            </span>
                                            <span className="text-xs text-muted-foreground block truncate">
                                                Estudiante Pro
                                            </span>
                                        </div>
                                    )}
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                side="top"
                                align={isExpanded ? "start" : "center"}
                                className="w-56 bg-[#1a1410] border border-ring/20 text-foreground z-[9999]"
                            >
                                <div className="flex items-center gap-3 px-2 py-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={
                                            user?.imageUrl ??
                                            "/img/avatar-placeholder.png"
                                        }
                                        alt={user?.fullName ?? "Usuario"}
                                        width={32}
                                        height={32}
                                        className="rounded-full shrink-0 w-8 h-8 object-cover"
                                    />
                                    <div className="min-w-0">
                                        <span className="text-sm font-semibold block truncate">
                                            {user?.fullName ??
                                                user?.username ??
                                                "Usuario"}
                                        </span>
                                        <span className="text-xs text-muted-foreground block truncate">
                                            {user?.username ?? ""}
                                        </span>
                                    </div>
                                </div>

                                <DropdownMenuSeparator className="opacity-20" />

                                <DropdownMenuItem
                                    onClick={() => openUserProfile()}
                                    className="gap-2 cursor-pointer hover:bg-white/5 focus:bg-white/5"
                                >
                                    <Settings className="h-4 w-4" />
                                    Manage account
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => signOut()}
                                    className="gap-2 cursor-pointer hover:bg-white/5 focus:bg-white/5"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Show>

                    {/* Usuario sin sesión */}
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            {isExpanded ? (
                                <Button
                                    size="sm"
                                    className="w-full justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium shadow-none"
                                >
                                    <LogIn className="h-4 w-4" />
                                    Iniciar sesión
                                </Button>
                            ) : (
                                <Button
                                    size="icon"
                                    className="w-9 h-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                                >
                                    <LogIn className="h-4 w-4" />
                                </Button>
                            )}
                        </SignInButton>
                    </Show>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}