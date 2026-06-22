// Actions.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ActionsProps } from "../CouseCard/Actions/actions.type";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Eye, EyeOff, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function Actions({
    courseId,
    CourseName,
    onDelete,
    isPublished,
    onPublishChange,
}: ActionsProps & {
    onDelete?: (id: string) => void;
    onPublishChange?: (state: boolean) => void;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [published, setPublished] = useState(isPublished);

    // Sincroniza el estado local cuando la prop isPublished cambia
    useEffect(() => {
        setPublished(isPublished);
    }, [isPublished]);

    // 🗑️ ELIMINAR
    const deleteCourse = async () => {
        if (loading) return;
        try {
            setLoading(true);
            await axios.delete(`/api/course/${courseId}`);
            toast.success("Curso eliminado correctamente");
            if (onDelete) onDelete(courseId);
            // No redirigimos, el onDelete callback actualiza la UI automáticamente
        } catch (error: any) {
            const message = error.response?.data;
            toast.error(
                typeof message === "string"
                    ? message
                    : "Error al eliminar el curso",
            );
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // ✏️ EDITAR
    const onEdit = () => {
        router.push(`/teacher/${courseId}`);
    };

    // 👁️ PUBLICAR / DESPUBLICAR
    const onPublish = async (state: boolean) => {
        if (loading) return;
        const previousState = published;

        // Optimistic update inmediato
        setPublished(state);
        onPublishChange?.(state);
        setLoading(true);

        toast.promise(
            axios.patch(`/api/course/${courseId}`, { isPublished: state }),
            {
                loading: state
                    ? "Publicando curso..."
                    : "Despublicando curso...",
                success: () => {
                    router.refresh();
                    return state ? "Curso publicado" : "Curso despublicado";
                },
                error: () => {
                    // Revierte si falla
                    setPublished(previousState);
                    onPublishChange?.(previousState);
                    return "Ups, algo ha ido mal";
                },
                finally: () => {
                    setLoading(false);
                },
            },
        );
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-muted/60 rounded-md transition"
                >
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-44 p-1 bg-background/95 backdrop-blur-sm border border-border shadow-lg rounded-lg"
            >
                {/* EDITAR */}
                <DropdownMenuItem
                    onClick={onEdit}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-muted transition"
                >
                    <Pencil className="w-4 h-4" />
                    Editar
                </DropdownMenuItem>

                {/* ELIMINAR */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer text-red-600 hover:bg-red-500/10 transition"
                        >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                        </DropdownMenuItem>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                {`Esta acción no se puede deshacer. Se eliminará el curso "${CourseName}" permanentemente.`}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={loading}>
                                Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={deleteCourse}
                                disabled={loading}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                {loading ? "Eliminando..." : "Eliminar"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* PUBLICAR / DESPUBLICAR */}
                {published ? (
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            onPublish(false);
                        }}
                        disabled={loading}
                        className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer text-primary-text"
                    >
                        <EyeOff className="w-4 h-4" />
                        Despublicar
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            onPublish(true);
                        }}
                        disabled={loading}
                        className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer"
                    >
                        <Eye className="w-4 h-4" />
                        Publicar
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
