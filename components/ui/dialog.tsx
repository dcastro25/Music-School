"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

// -------------------------------------
// ROOT
// -------------------------------------

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
    return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

// -------------------------------------
// TRIGGER
// -------------------------------------

function DialogTrigger(
    props: React.ComponentProps<typeof DialogPrimitive.Trigger>,
) {
    return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

// -------------------------------------
// PORTAL
// -------------------------------------

function DialogPortal(
    props: React.ComponentProps<typeof DialogPrimitive.Portal>,
) {
    return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

// -------------------------------------
// CLOSE
// -------------------------------------

function DialogClose(
    props: React.ComponentProps<typeof DialogPrimitive.Close>,
) {
    return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

// -------------------------------------
// OVERLAY
// -------------------------------------

function DialogOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay
            data-slot="dialog-overlay"
            className={cn(
                "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
                className,
            )}
            {...props}
        />
    );
}

// -------------------------------------
// CONTENT (AQUÍ ESTÁ LA MAGIA)
// -------------------------------------

function DialogContent({
    className,
    children,
    showCloseButton = true,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
}) {
    return (
        <DialogPortal>
            <DialogOverlay />

            <DialogPrimitive.Content
                data-slot="dialog-content"
                className={cn(
                    // Base
                    "fixed top-1/2 left-1/2 z-50 w-full",
                    "-translate-x-1/2 -translate-y-1/2",
                    "rounded-2xl bg-popover text-popover-foreground",
                    "p-6 md:p-8",
                    "shadow-xl ring-1 ring-foreground/10",

                    // Responsive width (🔥 clave)
                    "max-w-[calc(100%-1.5rem)]",
                    "sm:max-w-2xl",
                    "lg:max-w-4xl",

                    // Scroll interno
                    "max-h-[90vh] overflow-y-auto",

                    // Animaciones
                    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",

                    className,
                )}
                {...props}
            >
                {children}

                {showCloseButton && (
                    <DialogPrimitive.Close asChild>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="absolute top-3 right-3"
                        >
                            <XIcon className="size-4" />
                        </Button>
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPortal>
    );
}

// -------------------------------------
// HEADER
// -------------------------------------

function DialogHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="dialog-header"
            className={cn("flex flex-col gap-2", className)}
            {...props}
        />
    );
}

// -------------------------------------
// FOOTER
// -------------------------------------

function DialogFooter({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="dialog-footer"
            className={cn(
                "flex flex-col-reverse md:flex-row md:justify-end gap-3 pt-6 border-t border-border",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

// -------------------------------------
// TITLE
// -------------------------------------

function DialogTitle({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            data-slot="dialog-title"
            className={cn("text-xl font-semibold", className)}
            {...props}
        />
    );
}

// -------------------------------------
// DESCRIPTION
// -------------------------------------

function DialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            data-slot="dialog-description"
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
}

// -------------------------------------

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
};