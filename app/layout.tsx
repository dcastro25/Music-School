import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import {
    ClerkProvider,
    Show,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { clerkAppearance } from "@/lib/clerk-appearance";

export const metadata: Metadata = {
    title: "Music School",
    description: "Music School App",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider appearance={clerkAppearance}>
            <html lang="en" className="h-full antialiased">
                <body className="min-h-full flex flex-col">
                    <Providers>
                        {children}
                    </Providers>

                    <Toaster richColors position="bottom-right" />
                </body>
            </html>
        </ClerkProvider>
    );
}