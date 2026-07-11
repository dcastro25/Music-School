import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { chapterId, courseId } = body;

        const chapter = await prisma.$transaction(async (tx) => {
            const count = await tx.chapter.count({
                where: { courseId },
            });

            return tx.chapter.update({
                where: { id: chapterId },
                data: {
                    courseId,
                    isDraft: false,
                    position: count + 1,
                },
            });
        });

        return NextResponse.json(chapter);
    } catch (error) {
        console.error("[CHAPTER_PATCH_ERROR]", error);
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

        const chapter = await prisma.$transaction(async (tx) => {
            let position = 0;

            if (courseId) {
                const course = await tx.course.findUnique({
                    where: { id: courseId },
                });

                if (!course) {
                    throw new Error("Course not found");
                }

                const count = await tx.chapter.count({
                    where: { courseId },
                });

                position = count + 1;
            }

            return tx.chapter.create({
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
        });

        return NextResponse.json(chapter);
    } catch (error) {
        console.error("[CHAPTER_CREATE_ERROR]", error);
        if (error instanceof Error && error.message === "Course not found") {
            return new NextResponse("Course not found", { status: 404 });
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}