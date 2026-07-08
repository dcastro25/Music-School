import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { CourseWatchClient } from "../../Components/Shared/ListCourse/CouseCard/CourseWatchClient";

type Props = {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        chapter?: string;
    }>;
};

export const dynamic = "force-dynamic";

export default async function CourseWatchPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { chapter: chapterParam } = await searchParams;

    const course = await prisma.course.findFirst({
        where: {
            slug,
            isPublished: true,
        },
        include: {
            chapters: {
                where: {
                    isPublished: false,
                },
                orderBy: {
                    position: "asc",
                },
            },
        },
    });

    if (!course) {
        notFound();
    }

    const user = await currentUser();

    const hasPurchased = user?.id
        ? Boolean(
              await prisma.purchase.findFirst({
                  where: {
                      userId: user.id,
                      courseId: course.id,
                  },
              }),
          )
        : false;

    const isFreeCourse = course.price === 0;
    const canAccessAllChapters = hasPurchased || isFreeCourse;

    const progressRecords = user?.id
        ? await prisma.userProgress.findMany({
              where: {
                  userId: user.id,
                  chapterId: { in: course.chapters.map((c) => c.id) },
              },
              select: {
                  chapterId: true,
                  isCompleted: true,
              },
          })
        : [];

    const progressMap = new Map(
        progressRecords.map((p) => [p.chapterId, p.isCompleted]),
    );

    const chapters = course.chapters.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        description: chapter.description,
        videoUrl: chapter.videoUrl,
        position: chapter.position,
        isFree: chapter.isFree,
        duration: chapter.duration,
        isCompleted: progressMap.get(chapter.id) ?? false,
    }));

    // Si viene un ?chapter=id válido lo usamos, si no, el primero de la lista
    const currentChapterId =
        (chapterParam && chapters.some((c) => c.id === chapterParam)
            ? chapterParam
            : chapters[0]?.id) ?? "";

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <CourseWatchClient
                course={{
                    id: course.id,
                    slug: course.slug,
                    courseName: course.courseName,
                    description: course.description,
                    level: course.level,
                    duration: course.duration,
                    imageUrl: course.imageUrl,
                }}
                chapters={chapters}
                currentChapterId={currentChapterId}
                hasPurchased={canAccessAllChapters}
            />
        </div>
    );
}