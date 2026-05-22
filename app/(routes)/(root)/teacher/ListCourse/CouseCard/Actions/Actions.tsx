"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ActionsProps } from "./Actions.type";

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

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function Actions({
    courseId,
    CourseName,
    onDelete,
}: ActionsProps & { onDelete?: (id: string) => void }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const deleteCourse = async () => {
        try {
            setLoading(true);

            await axios.delete(`/api/course/${courseId}`);

            toast.success("Curso eliminado correctamente");

            if (onDelete) {
                onDelete(courseId);
            }

            router.refresh();
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

    const onEdit = () => {
        router.push(`/teacher/${courseId}`);
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
