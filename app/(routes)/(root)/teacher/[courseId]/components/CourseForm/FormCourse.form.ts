import {z} from "zod"



export const formSchema = z.object({
    courseName: z.string().min(1, "El nombre es obligatorio"),

    category: z.string().min(1, "Selecciona una categoría"),

    description: z.string().min(10, "Descripción muy corta"),

    price: z.string(), // ⚠️ string porque así lo tienes (luego puedes parsear a number)

    duration: z.string(), // igual aquí

    level: z.string().min(1, "Selecciona un nivel"),

    imageUrl: z.string().optional(),

    slug: z.string().min(1, "Slug requerido"),
});