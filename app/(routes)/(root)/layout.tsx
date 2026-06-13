"use client";

import React, { Suspense } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./Components/AppSidebar";
import { Navbar } from "./Components/Shared/Navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <TooltipProvider>
            <SidebarProvider>
                <div className="flex min-h-screen w-full">
                    {/* Sidebar */}
                    <AppSidebar />

                    {/* Main Content */}
                    <div className="flex flex-col flex-1 min-h-screen w-full">
                         <Suspense fallback={null}>
                            <Navbar />
                        </Suspense>
                        <main className="flex-1 w-full">{children}</main>
                    </div>
                </div>
            </SidebarProvider>
        </TooltipProvider>
    );
}
