import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

interface Params {
    params: Promise<{ courseId: string }>;
}

export async function GET(req: NextRequest, context: Params) {
    try {
        const { courseId } = await context.params;

        const course = await prisma.course.findUnique({
            where: { id: courseId },
            include: {
                chapters: true,
            },
        });

        if (!course) {
            return NextResponse.json(
                { success: false, message: "Curso no encontrado" },
                { status: 404 },
            );
        }

        return NextResponse.json({ success: true, course }, { status: 200 });
    } catch (error) {
        console.error("[GET /api/course/[courseId]] Error:", error);
        return NextResponse.json(
            { success: false, message: "Error al obtener el curso" },
            { status: 500 },
        );
    }
}

export async function DELETE(req: NextRequest, context: Params) {
    try {
        const { courseId } = await context.params;

        const course = await prisma.course.delete({
            where: { id: courseId },
        });

        revalidatePath("/teacher");

        return NextResponse.json(
            {
                success: true,
                message: "Curso eliminado exitosamente",
                deletedCourseId: course.id,
            },
            { status: 200 },
        );
    } catch (error: any) {
        console.error("[DELETE /api/course/[courseId]] Error:", error);

        if (error.code === "P2025") {
            return NextResponse.json(
                { success: false, message: "Curso no encontrado" },
                { status: 404 },
            );
        }

        return NextResponse.json(
            { success: false, message: "Error al eliminar el curso" },
            { status: 500 },
        );
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> },
) {
    try {
        const { courseId } = await params;
        const values = await req.json();

        console.log("[PATCH /api/course] courseId:", courseId);
        console.log("[PATCH /api/course] body recibido:", values);



        const camposPermitidos = [
            "courseName",
            "category",
            "description",
            "price",
            "duration",
            "level",
            "imageUrl",
            "slug",
            "isPublished",
        ];

        const dataToUpdate = Object.fromEntries(
            Object.entries(values).filter(([k]) =>
                camposPermitidos.includes(k),
            ),
        );

        const course = await prisma.course.update({
            where: { id: courseId },
            data: dataToUpdate,
        });

        console.log(
            "[PATCH /api/course] curso actualizado:",
            course.isPublished,
        );

        revalidatePath("/teacher");

        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        console.error("[PATCH /api/course] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}