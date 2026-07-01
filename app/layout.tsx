import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

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
        <html lang="en" className="h-full antialiased">
            <body className="min-h-full flex flex-col">
                <Providers>
                    {children}
                </Providers>

                <Toaster richColors position="bottom-right" />
            </body>
        </html>
    );
}