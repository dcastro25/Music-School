import React from 'react'
import { CoursesClient } from './coursesClient'
import { categories } from '@/lib/courses'
import { prisma } from '@/lib/prisma';

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
    const courses = await prisma.course.findMany({
        where: { isPublished: true },
        include: { chapters: true },
        orderBy: { createdAt: "desc" },
    });

    return <CoursesClient courses={courses} categories={categories} />;
}