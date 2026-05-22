"use client";

import { useState } from "react";
import { toast } from "sonner";

interface UseCourseCreateOptions {
    onSuccess?: (courseId: string, slug: string) => void;
    onError?: (error: string) => void;
}

export function useCourseCreate(options?: UseCourseCreateOptions) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createCourse = async (courseData: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseData),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.message || "Error al crear el curso";
                setError(errorMessage);
                toast.error(errorMessage);
                options?.onError?.(errorMessage);
                return { success: false, error: errorMessage };
            }

            toast.success("Curso creado exitosamente");
            options?.onSuccess?.(data.courseId, data.slug);

            return { success: true, courseId: data.courseId, slug: data.slug };
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Error desconocido";
            setError(errorMessage);
            toast.error(errorMessage);
            options?.onError?.(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createCourse,
        isLoading,
        error,
    };
}

interface UseCourseUpdateOptions {
    courseId: string;
    onSuccess?: (courseId: string) => void;
    onError?: (error: string) => void;
}

export function useCourseUpdate(options: UseCourseUpdateOptions) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateCourse = async (courseData: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/course/${options.courseId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseData),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage =
                    data.message || "Error al actualizar el curso";
                setError(errorMessage);
                toast.error(errorMessage);
                options.onError?.(errorMessage);
                return { success: false, error: errorMessage };
            }

            toast.success("Curso actualizado exitosamente");
            options.onSuccess?.(options.courseId);

            return { success: true, courseId: options.courseId };
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Error desconocido";
            setError(errorMessage);
            toast.error(errorMessage);
            options.onError?.(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateCourse,
        isLoading,
        error,
    };
}

interface UseCourseDeleteOptions {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function useCourseDelete(options?: UseCourseDeleteOptions) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteCourse = async (courseId: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/course/${courseId}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage =
                    data.message || "Error al eliminar el curso";
                setError(errorMessage);
                toast.error(errorMessage);
                options?.onError?.(errorMessage);
                return { success: false, error: errorMessage };
            }

            toast.success("Curso eliminado exitosamente");
            options?.onSuccess?.();

            return { success: true };
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Error desconocido";
            setError(errorMessage);
            toast.error(errorMessage);
            options?.onError?.(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        deleteCourse,
        isLoading,
        error,
    };
}

interface UseCourseGetOptions {
    onSuccess?: (course: any) => void;
    onError?: (error: string) => void;
}

export function useCourseGet(options?: UseCourseGetOptions) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [course, setCourse] = useState<any>(null);

    const getCourse = async (courseId: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/course/${courseId}`);
            const data = await response.json();

            if (!response.ok) {
                const errorMessage =
                    data.message || "Error al obtener el curso";
                setError(errorMessage);
                options?.onError?.(errorMessage);
                return { success: false, error: errorMessage };
            }

            setCourse(data.course);
            options?.onSuccess?.(data.course);

            return { success: true, course: data.course };
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Error desconocido";
            setError(errorMessage);
            options?.onError?.(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getCourse,
        course,
        isLoading,
        error,
    };
}
