import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
    DollarSign,
    ImageIcon,
    Sparkles,
    Star,
    Upload,
    Video,
} from "lucide-react";
 
import { useTags } from "../../hooks/useTag";
import { useModules } from "../../hooks/useModules";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { formSchema } from "./FormCourse.form";
import { z } from "zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { generateSlug } from "./SlugGenerator";
import { CourseMedia } from "../courseMedia";


type Props = {
    form: UseFormReturn<z.infer<typeof formSchema>>;
};

export default function SectionBasic({ form }: Props) {
    const { tags } = useTags();
    const { modules } = useModules();

    const [price, setPrice] = useState(0);
    const [isFree, setIsFree] = useState(false);

    return (
        <TabsContent value="basic" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-border/50 bg-background-secondary backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary/90">
                                <Sparkles className="h-5 w-5 text-primary" />
                                Información Principal
                            </CardTitle>
                            <CardDescription>
                                Define los datos básicos de tu curso
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Título */}
                            <FormField
                                control={form.control}
                                name="courseName"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <Label
                                            htmlFor="title"
                                            className="text-sm font-medium text-primary/80"
                                        >
                                            Título del Curso{" "}
                                            <span className="text-rose-400">
                                                *
                                            </span>
                                        </Label>
                                        <FormControl>
                                            <Input
                                                id="title"
                                                placeholder="Ej: Domina la Acordeon desde Cero"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    form.setValue(
                                                        "slug",
                                                        generateSlug(
                                                            e.target.value,
                                                        ),
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        <p className="text-xs text-primary-text">
                                            Máximo 100 caracteres. Sé claro y
                                            descriptivo.
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Subtítulo */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="imageUrl"
                                    className="text-sm font-medium text-foreground"
                                >
                                    Subtítulo
                                </Label>
                                <Input
                                    id="imageUrl"
                                    placeholder="Ej: Aprende desde cero con métodos prácticos y paso a paso"
                                />
                            </div>

                            {/* Descripción */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <Label
                                            htmlFor="description"
                                            className="text-sm font-medium text-foreground"
                                        >
                                            Descripción Completa{" "}
                                            <span className="text-rose-400">
                                                *
                                            </span>
                                        </Label>
                                        <FormControl>
                                            <Textarea
                                                id="description"
                                                placeholder="Describe detalladamente qué aprenderán los estudiantes, qué proyectos realizarán y por qué deberían tomar este curso..."
                                                className="min-h-40 bg-background-secondary"
                                                {...field}
                                            />
                                        </FormControl>
                                        <p className="text-xs text-primary-text">
                                            Mínimo 200 caracteres. Incluye
                                            palabras clave relevantes.
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Categoría, Duración y Nivel */}
                            <div className="grid gap-6 sm:grid-cols-3">
                                {/* Categoría */}
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <Label className="text-sm font-medium text-foreground">
                                                Categoría{" "}
                                                <span className="text-rose-400">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-background-secondary border-border/10 hover:border-ring focus:ring-primary/10">
                                                        <SelectValue placeholder="Selecciona categoría" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="web-dev">
                                                        Desarrollo Web
                                                    </SelectItem>
                                                    <SelectItem value="mobile-dev">
                                                        Desarrollo Móvil
                                                    </SelectItem>
                                                    <SelectItem value="data-science">
                                                        Ciencia de Datos
                                                    </SelectItem>
                                                    <SelectItem value="design">
                                                        Diseño
                                                    </SelectItem>
                                                    <SelectItem value="marketing">
                                                        Marketing Digital
                                                    </SelectItem>
                                                    <SelectItem value="business">
                                                        Negocios
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Duración */}
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <Label className="text-sm font-medium text-foreground">
                                                Duración{" "}
                                                <span className="text-rose-400">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-background-secondary border-border/10 hover:border-ring focus:ring-primary/10">
                                                        <SelectValue placeholder="Selecciona duración" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="2_semanas">
                                                        2 semanas
                                                    </SelectItem>
                                                    <SelectItem value="1_mes">
                                                        1 mes
                                                    </SelectItem>
                                                    <SelectItem value="3_meses">
                                                        3 meses
                                                    </SelectItem>
                                                    <SelectItem value="6_meses">
                                                        6 meses
                                                    </SelectItem>
                                                    <SelectItem value="12_meses">
                                                        12 meses
                                                    </SelectItem>
                                                    <SelectItem value="personalizado">
                                                        Personalizado
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Nivel */}
                                <FormField
                                    control={form.control}
                                    name="level"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <Label className="text-sm font-medium text-foreground">
                                                Nivel{" "}
                                                <span className="text-rose-400">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-background-secondary border-border/10 hover:border-ring focus:ring-primary/10">
                                                        <SelectValue placeholder="Selecciona nivel" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="beginner">
                                                        Principiante
                                                    </SelectItem>
                                                    <SelectItem value="intermediate">
                                                        Intermedio
                                                    </SelectItem>
                                                    <SelectItem value="advanced">
                                                        Avanzado
                                                    </SelectItem>
                                                    <SelectItem value="expert">
                                                        Experto
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Precio */}
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
                                <div className="flex items-center justify-between p-4 rounded-xl bg-background-secondary border border-border/30">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 rounded-lg ${isFree ? "bg-emerald-500/10" : "bg-muted"}`}
                                        >
                                            <Star
                                                className={`h-5 w-5 ${isFree ? "text-emerald-400" : "text-muted-foreground"}`}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">
                                                Curso Gratuito
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Sin costo para los estudiantes
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={isFree}
                                        onCheckedChange={setIsFree}
                                    />
                                </div>

                                {!isFree && (
                                    <div className="space-y-4">
                                        <Label className="text-sm font-medium text-foreground">
                                            Precio (USD)
                                        </Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                            <Input
                                                type="number"
                                                value={price}
                                                onChange={(e) =>
                                                    setPrice(
                                                        parseInt(
                                                            e.target.value,
                                                        ) || 0,
                                                    )
                                                }
                                                className="pl-10 text-2xl font-bold h-14 border-border/10 bg-background-secondary"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            {[300, 490, 7900, 9900, 14900].map((p) => (
                                                <Button
                                                    key={p}
                                                    variant={
                                                        price === p
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    size="sm"
                                                    onClick={() => setPrice(p)}
                                                    type="button"
                                                    className={
                                                        price === p
                                                            ? "bg-primary"
                                                            : ""
                                                    }
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
                </div>

                {/* Sidebar - Media */}
                <CourseMedia/>
            </div>
        </TabsContent>
    );
}
