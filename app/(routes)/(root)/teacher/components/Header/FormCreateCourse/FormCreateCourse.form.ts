import { z } from "zod";

export const formSchema = z.object({
    courseName: z
        .string()
        .min(2, "El nombre del curso debe tener al menos 2 caracteres")
        .max(200, "El nombre es demasiado largo"),

    category: z.string().min(1, "Selecciona una categoría"),

    description: z
        .string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(1000, "La descripción es demasiado larga"),

    price: z
        .string()
        .min(1, "El precio es obligatorio")
        .refine((val) => !isNaN(Number(val)), {
            message: "El precio debe ser un número válido",
        })
        .refine((val) => Number(val) >= 0, {
            message: "El precio no puede ser negativo",
        }),

    duration: z.string().min(1, "Selecciona una duración"),

    level: z.string().min(1, "Selecciona un nivel"),

    imageUrl: z
        .string()
        .url("Ingresa una URL válida")
        .optional()
        .or(z.literal("")),

    slug: z
        .string()
        .min(2, "El slug debe tener al menos 2 caracteres")
        .max(100, "El slug es demasiado largo")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "El slug solo puede contener letras minúsculas, números y guiones",
        ),
});
