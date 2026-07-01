import { prisma } from "./prisma";

export type CourseCategory = "guitarra" | "piano" | "canto" | "teoria";

export const categories = [
    { id: "todos"    as const, label: "Todos",   icon: "sparkles" as const },
    { id: "guitarra" as const, label: "Guitarra", icon: "music"    as const },
    { id: "piano"    as const, label: "Piano",    icon: "music"    as const },
    { id: "canto"    as const, label: "Canto",    icon: "mic"      as const },
    { id: "teoria"   as const, label: "Teoría",   icon: "book"     as const },
];

export async function getCourses() {
    return prisma.course.findMany({
        where: { isPublished: true },
        include: { chapters: true },
        orderBy: { createdAt: "desc" },
    });
}