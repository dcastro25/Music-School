import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface RouteParams {
    params: Promise<{
        courseId: string;
        chapterId: string;
    }>;
}

export async function PATCH(req: Request, { params }: RouteParams) {
    try {
        const user = await currentUser();

        if (!user?.id) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        const { chapterId, courseId } = await params;
        const { isCompleted } = (await req
            .json()
            .catch(() => ({ isCompleted: false }))) as {
            isCompleted: boolean;
        };

        const chapter = await prisma.chapter.findFirst({
            where: { id: chapterId, courseId },
            select: { id: true, isFree: true },
        });

        if (!chapter) {
            return new NextResponse("Capítulo no encontrado", {
                status: 404,
            });
        }

        if (!chapter.isFree) {
            const purchase = await prisma.purchase.findUnique({
                where: { userId_courseId: { userId: user.id, courseId } },
            });

            if (!purchase) {
                return new NextResponse(
                    "Necesitas comprar el curso para completar este capítulo",
                    { status: 403 },
                );
            }
        }

        const userProgress = await prisma.userProgress.upsert({
            where: {
                userId_chapterId: { userId: user.id, chapterId },
            },
            update: { isCompleted },
            create: { userId: user.id, chapterId, isCompleted },
        });

        return NextResponse.json(userProgress);
    } catch (error) {
        console.error("[CHAPTER_PROGRESS_PATCH]", error);
        return new NextResponse("Error interno", { status: 500 });
    }
}
