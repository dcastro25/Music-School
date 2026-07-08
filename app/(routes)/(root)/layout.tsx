"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./Components/AppSidebar";
import { Footer } from "./Components/Footer";
import { Navbar } from "./Components/Shared/Navbar";
import { CartProvider } from "./Components/Shared/ListCourse/CouseCard/CartContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const shouldShowFooter =
        pathname !== null &&
        !pathname.startsWith("/teacher") &&
        !pathname.startsWith("/admin") &&
        !pathname.startsWith("/cursos/");

    return (
        <TooltipProvider>
            <SidebarProvider>
                <CartProvider>
                    <div className="flex min-h-screen w-full overflow-hidden">

                        <AppSidebar />

                        <div className="flex flex-col flex-1 min-h-screen min-w-0">
                            <Suspense fallback={null}>
                                <Navbar />
                            </Suspense>
                            <main className="flex-1 min-w-0">{children}</main>
                            {shouldShowFooter && <Footer />}
                        </div>
                    </div>
                </CartProvider>
            </SidebarProvider>
        </TooltipProvider>
    );
}