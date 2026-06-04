import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "h-9 w-full min-w-0 rounded-lg border border-none hover:border-ring  bg-transparent px-2.5 py-1 text-primary-text transition-colors outline-1 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground/50 placeholder:text-primary-text/60 focus:placeholder:text-primary/80 hover:placeholder:text-primary/70",
                "focus-visible:border-primary-color-text focus-visible:ring-1 focus-visible:ring-foreground/50",
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
                "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
                "md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                className,
            )}
            {...props}
        />
    );
}

export { Input };
