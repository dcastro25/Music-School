"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target } from "lucide-react";
import { DURATIONS, LEVELS, FormValues } from "./FormCourse.form";

export function SectionDetails() {
    const form = useFormContext<FormValues>();

    return (
        <section className="rounded-xl border border-border bg-card p-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
                <Target className="h-4 w-4 text-primary" />
                <h2 className="text-base font-semibold text-foreground">Detalles del curso</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Precio */}
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field, fieldState }) => (
                        <FormItem className="space-y-1.5">
                            <FormLabel className="text-xs font-medium text-primary uppercase tracking-wide">
                                Precio (COP) <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                                    <Input
                                        type="number"
                                        className={`h-10 pl-7 bg-input border text-foreground placeholder:text-muted-foreground rounded-lg focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-colors ${
                                            fieldState.error ? "border-destructive" : "border-border"
                                        }`}
                                        placeholder="0"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            {fieldState.error && (
                                <p className="text-[11px] text-destructive flex items-center gap-1">
                                    ⚠ {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />

                {/* Duración */}
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field, fieldState }) => (
                        <FormItem className="space-y-1.5">
                            <FormLabel className="text-xs font-medium text-primary uppercase tracking-wide">
                                Duración <span className="text-destructive">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className={`h-10 bg-input border text-foreground rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-colors ${
                                        fieldState.error ? "border-destructive" : "border-border"
                                    }`}>
                                        <SelectValue placeholder="Selecciona duración" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {DURATIONS.map((dur) => (
                                        <SelectItem key={dur.value} value={dur.value}>
                                            {dur.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.error && (
                                <p className="text-[11px] text-destructive flex items-center gap-1">
                                    ⚠ {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />

                {/* Nivel */}
                <FormField
                    control={form.control}
                    name="level"
                    render={({ field, fieldState }) => (
                        <FormItem className="space-y-1.5">
                            <FormLabel className="text-xs font-medium text-primary uppercase tracking-wide">
                                Nivel <span className="text-destructive">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className={`h-10 bg-input border text-foreground rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-colors ${
                                        fieldState.error ? "border-destructive" : "border-border"
                                    }`}>
                                        <SelectValue placeholder="Selecciona nivel" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {LEVELS.map((lvl) => (
                                        <SelectItem key={lvl.value} value={lvl.value}>
                                            {lvl.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.error && (
                                <p className="text-[11px] text-destructive flex items-center gap-1">
                                    ⚠ {fieldState.error.message}
                                </p>
                            )}
                        </FormItem>
                    )}
                />
            </div>
        </section>
    );
}