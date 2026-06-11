"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DollarSign, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";

type Props = {
    courseId?: string | null;
    initialPrice?: number;
    initialIsFree?: boolean;
    onPriceChange?: (price: number) => void;
    onIsFreeChange?: (isFree: boolean) => void;
};

export function CoursePrice({
    courseId,
    initialPrice = 0,
    initialIsFree = false,
    onPriceChange,
    onIsFreeChange,
}: Props) {
    const [price, setPrice] = useState(initialPrice);
    const [isFree, setIsFree] = useState(initialIsFree);

    const handlePriceChange = (newPrice: number) => {
        setPrice(newPrice);
        onPriceChange?.(newPrice);
    };

    const handleIsFreeChange = (value: boolean) => {
        setIsFree(value);
        onIsFreeChange?.(value);
    };

    const onSave = async (newPrice: number) => {
        if (!courseId) return;
        try {
            await axios.patch(`/api/course/${courseId}`, {
                price: Math.round(newPrice),
            });
            toast.success("Precio actualizado correctamente");
        } catch {
            toast.error("Error al actualizar el precio");
        }
    };

    return (
        <div className="mx-auto">
            <Card className="border-border/50 bg-background-secondary backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                        <DollarSign className="h-5 w-5 text-primary-text" />
                        Precio del Curso
                    </CardTitle>
                    <CardDescription>
                        Define el modelo de monetización
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Switch gratuito */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-background-secondary border border-border/30">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isFree ? "bg-emerald-500/10" : "bg-muted"}`}>
                                <Star className={`h-5 w-5 ${isFree ? "text-emerald-400" : "text-muted-foreground"}`} />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">Curso Gratuito</p>
                                <p className="text-sm text-muted-foreground">Sin costo para los estudiantes</p>
                            </div>
                        </div>
                        <Switch
                            checked={isFree}
                            onCheckedChange={handleIsFreeChange}
                        />
                    </div>

                    {/* Input precio */}
                    {!isFree && (
                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-foreground">
                                Precio (COP)
                            </Label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                
                                    type="number"
                                    value={price}
                                    onChange={(e) =>
                                        handlePriceChange(parseInt(e.target.value) || 0)
                                    }
                                    className="pl-10 text-2xl font-bold h-14 border-border/10 bg-background-secondary"/>
                             </div>

                            {/* Precios rápidos */}
                            <div className="flex gap-2 flex-wrap">
                                {[300000, 250000, 200.000, 150000, 100000].map((p) => (
                                    <Button
                                        key={p}
                                        variant={price === p ? "default" : "outline"}
                                        size="sm"
                                        type="button"
                                        onClick={() => {
                                            handlePriceChange(p);
                                            onSave(p);
                                        }}
                                        className={price === p ? "bg-primary" : ""}
                                    >
                                        ${p}
                                    </Button>
                                ))}
                            </div>

                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}