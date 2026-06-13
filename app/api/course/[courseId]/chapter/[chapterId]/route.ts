import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
    try {
        const { courseId, chapterId } = await params; // 👈 await
        const body = await req.json();
        const { videoUrl } = body;

        console.log("chapterId:", chapterId);
        console.log("videoUrl:", videoUrl);

        const chapter = await prisma.chapter.update({
            where: { id: chapterId },
            data: { videoUrl },
        });

        return NextResponse.json(chapter);
    } catch (error) {
        console.error("ERROR:", error);
        return new NextResponse("Error", { status: 500 });
    }
}