import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface Params {
    params: Promise<{ courseId: string }>;
}

export async function GET(req: NextRequest, context: Params) {
    try {
        const { courseId } = await context.params;

        const course = await prisma.course.findUnique({
            where: { id: courseId },
            include: {
                modules: {
                    include: {
                        lessons: true,
                    },
                },
                tags: true,
                objectives: true,
                requirements: true,
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

// export async function PATCH (req: Request, {params}: {params:Promise<{courseId:string}>}){
//     try{
//         // const {userId} = await auth();
//         const {courseId} = await params;
//         const value = await req.json()

//         // if(!userId){
//         //     return new NextResponse("Unauthorized", {status:401})
//         // }

//         const course = await prisma.course.update({
//             where:{
//                 id: courseId,
//                 // userId:userId
//             },
//             data:{
//                 ...value
//             }
//         });

//         return NextResponse.json(course)

// } catch (error){
//     console.log("[COURSE]", error);

//     return new NextResponse("Internal Error", {status: 500})
// }
// }

export async function DELETE(req: NextRequest, context: Params) {
    try {
        const { courseId } = await context.params;

        const course = await prisma.course.delete({
            where: { id: courseId },
        });

        // Revalidar el caché de la página de cursos
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

        // 👇 Verifica qué llega exactamente
        console.log("[PATCH /api/course] courseId:", courseId);
        console.log("[PATCH /api/course] body recibido:", values);

        const course = await prisma.course.update({
            where: { id: courseId },
            data: {
                // 👇 Manejo explícito de isPublished para evitar que
                // Prisma ignore el valor false al hacer spread
                ...(typeof values.isPublished === "boolean" && {
                    isPublished: values.isPublished,
                }),
                // el resto de campos que no sean isPublished
                ...Object.fromEntries(
                    Object.entries(values).filter(([k]) => k !== "isPublished")
                ),
            },
        });

        console.log("[PATCH /api/course] curso actualizado:", course.isPublished);

        // Revalidar el caché de la página de cursos
        revalidatePath("/teacher");

        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        console.error("[PATCH /api/course] Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}