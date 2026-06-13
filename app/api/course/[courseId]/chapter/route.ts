import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();

        const { chapterId, courseId } = body;

        const chapter = await prisma.chapter.update({
            where: { id: chapterId },
            data: {
                courseId,
                isDraft: false,
            },
        });

        return NextResponse.json(chapter);
    } catch (error) {
        return new NextResponse("Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { title, courseId, description, videoUrl } = body;

        if (!title) {
            return new NextResponse("Title requerido", { status: 400 });
        }

        let position = 0;

        if (courseId) {
            const course = await prisma.course.findUnique({
                where: { id: courseId },
            });

            if (!course) {
                return new NextResponse("Course not found", { status: 404 });
            }

            const count = await prisma.chapter.count({
                where: { courseId },
            });

            position = count + 1;
        }

        const chapter = await prisma.chapter.create({
            data: {
                title,
                description,
                videoUrl: videoUrl ?? null,
                courseId: courseId ?? null,
                position,
                isDraft: !courseId,
                isPublished: false,
            },
        });

        return NextResponse.json(chapter);
        
    } catch (error) {
        console.log("[CHAPTER_CREATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
