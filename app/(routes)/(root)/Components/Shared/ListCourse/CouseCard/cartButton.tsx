"use client";

import Image from "next/image";
import { CreditCard, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "./CartContext";

export function CartButton() {
    const { items, count, total, removeItem, clear } = useCart();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="relative"
                    aria-label="Ver carrito"
                >
                    <ShoppingCart className="h-5 w-5" />
                    {count > 0 && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                            {count}
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-left">
                    <DialogTitle>Tu carrito</DialogTitle>
                    <DialogDescription>
                        {count === 0
                            ? "Aún no has agregado cursos."
                            : `${count} curso${count > 1 ? "s" : ""} seleccionado${count > 1 ? "s" : ""}.`}
                    </DialogDescription>
                </DialogHeader>

                {count > 0 && (
                    <>
                        <ul className="flex max-h-72 flex-col gap-3 overflow-y-auto">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center gap-3 rounded-xl border border-border p-2"
                                >
                                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                                        <Image
                                            src={
                                                item.imageUrl ||
                                                "/placeholder.svg"
                                            }
                                            alt={item.courseName}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-foreground">
                                            {item.courseName}
                                        </p>
                                        <p className="text-sm font-semibold text-primary">{`$${item.price.toLocaleString("es-CO")} COP`}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label={`Quitar ${item.courseName}`}
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center justify-between border-t border-border pt-4">
                            <span className="text-sm text-muted-foreground">
                                Total
                            </span>
                            <span className="text-lg font-bold text-primary">{`$${total.toLocaleString("es-CO")} COP`}</span>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={clear}
                            >
                                Vaciar carrito
                            </Button>
                            <Button className="flex-1 font-semibold shadow-lg shadow-primary/20">
                                <CreditCard className="h-4 w-4" />
                                Pagar ahora
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
