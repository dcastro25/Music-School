// FormCreateCourse.form.ts
import { z } from "zod";

export const formSchema = z.object({
    courseName: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "Máximo 100 caracteres"),
    category: z.string().min(1, "Selecciona una categoría"),
    description: z
        .string()
        .min(20, "La descripción debe tener al menos 20 caracteres")
        .max(1000, "Máximo 1000 caracteres"),
    price: z.string().min(1, "El precio es requerido"),
    duration: z.string().min(1, "Selecciona una duración"),
    level: z.string().min(1, "Selecciona un nivel"),
    imageUrl: z.string().optional(),
    slug: z.string().min(1, "El slug es requerido"),
});

export type FormValues = z.infer<typeof formSchema>;

export const CATEGORIES = [
    { value: "instrumentos", label: "Instrumentos" },
    { value: "guitarra",     label: "Guitarra" },
    { value: "piano",        label: "Piano" },
    { value: "bateria",      label: "Batería" },
    { value: "violin",       label: "Violín" },
    { value: "bajo",         label: "Bajo" },
    { value: "teoria",       label: "Teoría musical" },
    { value: "solfeo",       label: "Solfeo" },
    { value: "produccion",   label: "Producción musical" },
    { value: "mezcla",       label: "Mezcla y Masterización" },
    { value: "canto",        label: "Canto" },
];

export const DURATIONS = [
    { value: "2_semanas",    label: "2 semanas" },
    { value: "1_mes",        label: "1 mes" },
    { value: "3_meses",      label: "3 meses" },
    { value: "6_meses",      label: "6 meses" },
    { value: "12_meses",     label: "12 meses" },
    { value: "personalizado",label: "Personalizado" },
];

export const LEVELS = [
    { value: "principiante", label: "Principiante" },
    { value: "intermedio",   label: "Intermedio" },
    { value: "avanzado",     label: "Avanzado" },
    { value: "experto",      label: "Experto" },
];