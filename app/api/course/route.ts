import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Validación con Zod
const moduleSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "Título del módulo requerido"),
    lessons: z.array(
        z.object({
            id: z.string(),
            title: z.string().min(1, "Título de lección requerido"),
            type: z.enum(["video", "text", "quiz"], {
                errorMap: () => ({ message: "Tipo de lección inválido" }),
            }),
            duration: z.number().positive("Duración debe ser positiva"),
        }),
    ),
});

const objectiveSchema = z.object({
    id: z.string(),
    text: z.string().min(1, "Objetivo no puede estar vacío"),
});

const requirementSchema = z.object({
    id: z.string(),
    text: z.string().min(1, "Requisito no puede estar vacío"),
});

const advancedCourseFormSchema = z.object({
    title: z.string().min(3, "El título debe tener mínimo 3 caracteres"),
    subtitle: z.string().optional(),
    description: z
        .string()
        .min(10, "La descripción debe tener mínimo 10 caracteres"),

    category: z.string().min(1, "La categoría es requerida"),
    subcategory: z.string().optional(),
    language: z.string().default("es"),
    difficulty: z.number().min(0).max(100).default(50),

    imageUrl: z
        .string()
        .url("URL de imagen inválida")
        .optional()
        .or(z.literal("")),

    price: z.number().min(0).default(0),
    isFree: z.boolean().default(false),

    hasCertificate: z.boolean().default(true),
    isPublic: z.boolean().default(true),


    modules: z.array(moduleSchema).min(1, "Al menos un módulo es requerido"),
    tags: z.array(z.string()).default([]),
    objectives: z
        .array(objectiveSchema)
        .min(1, "Al menos un objetivo es requerido"),
    requirements: z
        .array(requirementSchema)
        .min(1, "Al menos un requisito es requerido"),

    // Metadata
    targetAudience: z.string().optional(),
});

// Schema para formulario legacy (compatibilidad)
const legacyFormSchema = z.object({
    courseName: z.string().min(1),
    category: z.string().min(1),
    description: z.string().optional(),
    price: z.union([z.number(), z.string()]),
    duration: z.string(),
    level: z.string(),
    imageUrl: z.string().optional(),
    slug: z.string(),
});

type AdvancedCourseFormData = z.infer<typeof advancedCourseFormSchema>;

const prismaErrorMessages: Record<string, string> = {
    P2002: "Ya existe un registro con ese valor único",
    P2003: "Referencia inválida a otro registro",
    P2025: "Registro no encontrado",
};

/**
 * POST /api/course
 * Soporta dos formatos:
 * 1. Formulario legacy (courseName, category, etc.)
 * 2. Nuevo formulario avanzado (title, modules, objectives, etc.)
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Detectar qué tipo de formulario es
        const isAdvancedForm = body.title || body.modules;

        if (isAdvancedForm) {
            // Nuevo formulario avanzado
            const validatedData = advancedCourseFormSchema.parse(body);

            // Generar slug automáticamente
            const slug = validatedData.title
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

            // Verificar que el slug sea único
            const existingCourse = await prisma.course.findUnique({
                where: { slug },
            });

            if (existingCourse) {
                // Agregar timestamp al slug para hacerlo único
                const uniqueSlug = `${slug}-${Date.now()}`;
                validatedData.title = `${validatedData.title} (${Date.now()})`;
            }

            // Crear el curso con todas sus relaciones
            const course = await prisma.course.create({
                data: {
                    // Basic info
                    title: validatedData.title,
                    subtitle: validatedData.subtitle,
                    description: validatedData.description,
                    slug,

                    // Metadata
                    category: validatedData.category,
                    subcategory: validatedData.subcategory,
                    language: validatedData.language,
                    difficulty: validatedData.difficulty,

                    // Media
                    imageUrl: validatedData.imageUrl || null,

                    // Pricing
                    price: validatedData.price,
                    isFree: validatedData.isFree,

                    // Settings
                    hasCertificate: validatedData.hasCertificate,
                    isPublic: validatedData.isPublic,

                    // Crear módulos con lecciones
                    modules: {
                        create: validatedData.modules.map(
                            (module, moduleIdx) => ({
                                title: module.title,
                                position: moduleIdx,
                                lessons: {
                                    create: module.lessons.map(
                                        (lesson, lessonIdx) => ({
                                            title: lesson.title,
                                            type: lesson.type,
                                            duration: lesson.duration,
                                            position: lessonIdx,
                                        }),
                                    ),
                                },
                            }),
                        ),
                    },

                    // Crear tags
                    tags: {
                        create: validatedData.tags.map((tag) => ({
                            name: tag,
                        })),
                    },

                    // Crear objetivos
                    objectives: {
                        create: validatedData.objectives.map((obj, idx) => ({
                            text: obj.text,
                            position: idx,
                        })),
                    },

                    // Crear requisitos
                    requirements: {
                        create: validatedData.requirements.map((req, idx) => ({
                            text: req.text,
                            position: idx,
                        })),
                    },
                },
                include: {
                    modules: {
                        include: {
                            lessons: true,
                        },
                    },
                    tags: true,
                    objectives: true,
                    requirements: true,
                },
            });

            return NextResponse.json(
                {
                    success: true,
                    message: "Curso creado exitosamente",
                    courseId: course.id,
                    slug: course.slug,
                    course,
                },
                { status: 201 },
            );
        } else {
            // Formulario legacy - mantener compatibilidad
            const validatedData = legacyFormSchema.parse(body);

            const course = await prisma.course.create({
                data: {
                    courseName: validatedData.courseName,
                    category: validatedData.category,
                    description: validatedData.description,
                    price: Number(validatedData.price),
                    duration: validatedData.duration,
                    level: validatedData.level,
                    imageUrl: validatedData.imageUrl,
                    slug: validatedData.slug,
                },
            });

            return NextResponse.json(course);
        }
    } catch (error: any) {
        console.error("[POST /api/course] Error:", error);

        // Manejo de errores de validación Zod
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Error de validación",
                    errors: error.errors.map((err) => ({
                        field: err.path.join("."),
                        message: err.message,
                    })),
                },
                { status: 400 },
            );
        }

        // Manejo de errores de Prisma
        if (error.code && prismaErrorMessages[error.code]) {
            const field =
                error.meta?.target?.[0] ?? error.meta?.field_name ?? "";
            const message = `${prismaErrorMessages[error.code]}${field ? `: ${field}` : ""}`;
            return NextResponse.json(
                { success: false, message },
                { status: 400 },
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Error al crear el curso",
                error: error.message || "Error desconocido",
            },
            { status: 500 },
        );
    }
}
