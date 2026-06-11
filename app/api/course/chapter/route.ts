// app/api/chapter/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title } = body;

        if (!title) {
            return new NextResponse("Title requerido", { status: 400 });
        }

        const chapter = await prisma.chapter.create({
            data: {
                title,
                courseId: null,
                position: 0,
                isDraft: true,
                isPublished: false,
            },
        });

        return NextResponse.json(chapter);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}