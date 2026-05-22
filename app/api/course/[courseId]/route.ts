import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface Params {
    params: Promise<{ courseId: string }>;
}

/**
 * GET /api/course/[courseId]
 * Obtiene un curso con todos sus detalles
 */
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

/**
 * PUT /api/course/[courseId]
 * Actualiza un curso
 */
// export async function PUT(req: NextRequest, context: Params) {
//     try {
//         const { courseId } = await context.params;
//         const body = await req.json();

//         const {
//             title,
//             subtitle,
//             description,
//             category,
//             subcategory,
//             language,
//             difficulty,
//             imageUrl,
//             price,
//             isFree,
//             hasCertificate,
//             isPublic,
//             targetAudience,
//         } = body;

//         const course = await prisma.course.update({
//             where: { id: courseId },
//             data: {
//                 ...(title && { title }),
//                 ...(subtitle && { subtitle }),
//                 ...(description && { description }),
//                 ...(category && { category }),
//                 ...(subcategory && { subcategory }),
//                 ...(language && { language }),
//                 ...(difficulty !== undefined && { difficulty }),
//                 ...(imageUrl !== undefined && { imageUrl }),
//                 ...(price !== undefined && { price }),
//                 ...(isFree !== undefined && { isFree }),
//                 ...(hasCertificate !== undefined && { hasCertificate }),
//                 ...(isPublic !== undefined && { isPublic }),
//                 ...(targetAudience && { targetAudience }),
//             },
//             include: {
//                 // modules: {
//                 //     include: {
//                 //         lessons: true,
//                 //     },
//                 // },
//                 tags: true,
//                 objectives: true,
//                 requirements: true,
//             },
//         });

//         return NextResponse.json(
//             {
//                 success: true,
//                 message: "Curso actualizado exitosamente",
//                 course,
//             },
//             { status: 200 },
//         );
//     } catch (error: any) {
//         console.error("[PUT /api/course/[courseId]] Error:", error);

//         if (error.code === "P2025") {
//             return NextResponse.json(
//                 { success: false, message: "Curso no encontrado" },
//                 { status: 404 },
//             );
//         }

//         return NextResponse.json(
//             { success: false, message: "Error al actualizar el curso" },
//             { status: 500 },
//         );
//     }
// }

export async function PATCH (req: Request, {params}: {params:Promise<{courseId:string}>}){
    try{
        // const {userId} = await auth();
        const {courseId} = await params;
        const value = await req.json()

        // if(!userId){
        //     return new NextResponse("Unauthorized", {status:401})
        // }

        const course = await prisma.course.update({
            where:{
                id: courseId,
                // userId:userId
            },
            data:{
                ...value
            }
        });

        return NextResponse.json(course)

    } catch (error){
        console.log("[COURSE]", error);

        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function DELETE(req: NextRequest, context: Params) {
    try {
        const { courseId } = await context.params;

        const course = await prisma.course.delete({
            where: { id: courseId },
        });

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

