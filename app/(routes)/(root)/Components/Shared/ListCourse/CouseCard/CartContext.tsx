"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import type { Course } from "@/app/generated/prisma/client";

export interface CartItem {
    id: string;
    courseName: string;
    imageUrl: string;
    price: number;
}

interface CartContextValue {
    items: CartItem[];
    count: number;
    total: number;
    addItem: (course: Course) => void;
    removeItem: (id: string) => void;
    isInCart: (id: string) => boolean;
    clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = useCallback((course: Course) => {
        if (!course.price) return;
        setItems((prev) => {
            if (prev.some((i) => i.id === course.id)) return prev;
            return [
                ...prev,
                {
                    id: course.id,
                    courseName: course.courseName,
                    imageUrl: course.imageUrl ?? "", // ✅ corregido
                    price: course.price as number,
                },
            ];
        });
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }, []);

    const isInCart = useCallback(
        (id: string) => items.some((i) => i.id === id),
        [items],
    );

    const clear = useCallback(() => setItems([]), []);

    const value = useMemo<CartContextValue>(
        () => ({
            items,
            count: items.length,
            total: items.reduce((sum, i) => sum + i.price, 0),
            addItem,
            removeItem,
            isInCart,
            clear,
        }),
        [items, addItem, removeItem, isInCart, clear],
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within a CartProvider");
    return ctx;
}