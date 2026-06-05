import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Schema ajustado a tu tabla real
const courseSchema = z.object({
    courseName: z.string().min(1),
    category: z.string().min(1),
    description: z.string().optional(),
    price: z.union([z.number(), z.string()]),
    duration: z.string(),
    level: z.string(),
    imageUrl: z.string().optional(),
    slug: z.string(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validatedData = courseSchema.parse(body);

        // Verificar slug único
        const existingCourse = await prisma.course.findUnique({
            where: { slug: validatedData.slug },
        });

        if (existingCourse) {
            return NextResponse.json(
                { success: false, message: "El slug ya existe" },
                { status: 400 }
            );
        }

        const course = await prisma.course.create({
            data: {
                id: crypto.randomUUID(),

                courseName: validatedData.courseName,
                category: validatedData.category,
                description: validatedData.description || null,

                price: Number(validatedData.price),
                duration: validatedData.duration,
                level: validatedData.level,

                imageUrl: validatedData.imageUrl || null,
                slug: validatedData.slug,

                isPublished: false,

                // 🔥 CLAVE porque tu DB lo exige
                updatedAt: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            course,
        });

    } catch (error: any) {
        console.error(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    errors: error.issues,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Error al crear el curso",
            },
            { status: 500 }
        );
    }
}