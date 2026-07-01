"use client";

import { CartProvider } from "@/app/(routes)/(root)/Components/Shared/ListCourse/CouseCard/CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}