import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> },
) {
    try {
        const { courseId, chapterId } = await params; 
        const body = await req.json();
        const { videoUrl, title, description } = body;

        console.log("chapterId:", chapterId);
        console.log("videoUrl:", videoUrl);

        const chapter = await prisma.chapter.update({
            where: { id: chapterId },
            data: {
                ...(videoUrl !== undefined && { videoUrl }),
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
            },
        });

        return NextResponse.json(chapter);
    } catch (error) {
        console.error("ERROR:", error);
        return new NextResponse("Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ courseId: string; chapterId: string }> },
) {
    try {
        const { chapterId } = await params;

        await prisma.chapter.delete({
            where: { id: chapterId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Error", { status: 500 });
    }
}
