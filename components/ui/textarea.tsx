import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
    <textarea
        ref={ref}
        className={cn(
            "flex min-h-20 w-full rounded-md border border-border/40 bg-background px-3 py-2 text-primary-text placeholder:text-primary-text/60 focus-visible:outline-none focus:placeholder:text-primary/80 focus-visible:border-ring focus-visible:ring/10 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:placeholder:text-primary/70",
            className,
        )}
        {...props}
    />
));
Textarea.displayName = "Textarea";

export { Textarea };
