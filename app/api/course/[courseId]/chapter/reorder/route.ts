import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { list } = body as { list: { id: string; position: number }[] };

        if (!Array.isArray(list)) {
            return new NextResponse("Lista inválida", { status: 400 });
        }

        await Promise.all(
            list.map((item) =>
                prisma.chapter.update({
                    where: { id: item.id },
                    data: { position: item.position },
                }),
            ),
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log("[CHAPTER_REORDER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}