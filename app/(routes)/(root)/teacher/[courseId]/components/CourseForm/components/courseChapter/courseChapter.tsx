"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModules } from "../../hooks/useModules";
import {
    GripVertical,
    Layers,
    Plus,
    ChevronDown,
    Pencil,
    Trash2,
    FileText,
    Check,
    X,
} from "lucide-react";
import { useState } from "react";
import { FormChapter } from "./formChapter";
import { ChapterVideo } from "./formChapter/chapterVideo/chapterVideo";
import axios from "axios";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
    DragDropContext,
    Droppable,
    DropResult,
    Draggable,
} from "@hello-pangea/dnd";

import { CourseChapterProps, Chapter } from "./courseChapter.form";

export function CourseChapter({
    courseId,
    chapters,
    onChaptersChange,
}: CourseChapterProps) {
    const { addModule } = useModules();
    const [showInputChapter, setShowInputChapter] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Eliminar
    const [deletingChapter, setDeletingChapter] = useState<Chapter | null>(
        null,
    );
    const [isDeleting, setIsDeleting] = useState(false);

    // Editar
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState({
        title: "",
        description: "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChapterCreated = (newChapter: Chapter) => {
        onChaptersChange([...chapters, newChapter]);
        setExpandedId(newChapter.id);
    };

    const startEdit = (chapter: Chapter) => {
        setEditingId(chapter.id);
        setEditValues({
            title: chapter.title,
            description: chapter.description ?? "",
        });
        setExpandedId(chapter.id);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValues({ title: "", description: "" });
    };

    const saveEdit = async (chapter: Chapter) => {
        if (!editValues.title.trim()) return;
        try {
            setIsSaving(true);
            if (courseId) {
                await axios.patch(
                    `/api/course/${courseId}/chapter/${chapter.id}`,
                    {
                        title: editValues.title,
                        description: editValues.description,
                    },
                );
            }
            onChaptersChange(
                chapters.map((c) =>
                    c.id === chapter.id
                        ? {
                              ...c,
                              title: editValues.title,
                              description: editValues.description,
                          }
                        : c,
                ),
            );
            toast.success("Capítulo actualizado");
            setEditingId(null);
        } catch {
            toast.error("Error al actualizar el capítulo");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingChapter) return;
        try {
            setIsDeleting(true);
            if (courseId) {
                await axios.delete(
                    `/api/course/${courseId}/chapter/${deletingChapter.id}`,
                );
            }
            onChaptersChange(
                chapters.filter((c) => c.id !== deletingChapter.id),
            );
            toast.success("Capítulo eliminado");
            setDeletingChapter(null);
        } catch {
            toast.error("Error al eliminar el capítulo");
        } finally {
            setIsDeleting(false);
        }
    };

    const onDragEnd = async (result: DropResult) => {
        const { destination, source } = result;
        if (!destination || destination.index === source.index) return;

        const items = Array.from(chapters);
        const [movedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, movedItem);

        const updatedItems = items.map((chapter, index) => ({
            ...chapter,
            position: index + 1,
        }));

        const previousList = chapters;
        onChaptersChange(updatedItems);

        if (!courseId) return;

        try {
            await axios.put(`/api/course/${courseId}/chapter/reorder`, {
                list: updatedItems.map((c) => ({
                    id: c.id,
                    position: c.position,
                })),
            });
        } catch {
            toast.error("No se pudo guardar el nuevo orden");
            onChaptersChange(previousList);
        }
    };

    return (
        <>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                            <Layers className="h-5 w-5 text-primary" />
                            Estructura del Curso
                        </CardTitle>
                        <CardDescription>
                            Organiza tu contenido en módulos y lecciones
                        </CardDescription>
                    </div>
                    <Button
                        type="button"
                        onClick={() => setShowInputChapter(!showInputChapter)}
                        className="gap-2 bg-primary hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Añadir Capítulo
                    </Button>
                </CardHeader>

                <CardContent className="space-y-4">
                    {showInputChapter && (
                        <FormChapter
                            setShowInputChapter={setShowInputChapter}
                            addModule={addModule}
                            courseId={courseId}
                            onChapterCreated={handleChapterCreated}
                        />
                    )}

                    {chapters.length === 0 && !showInputChapter && (
                        <div className="flex flex-col items-center justify-center py-10 gap-2">
                            <Layers className="h-8 w-8 text-muted-foreground/40" />
                            <p className="text-sm text-muted-foreground">
                                Aún no hay capítulos creados
                            </p>
                        </div>
                    )}

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="chapters">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-2"
                                >
                                    {chapters.map((chapter, index) => {
                                        const isExpanded =
                                            expandedId === chapter.id;
                                        const isEditing =
                                            editingId === chapter.id;

                                        return (
                                            <Draggable
                                                key={chapter.id}
                                                draggableId={chapter.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={`border rounded-xl bg-card transition-all ${
                                                            snapshot.isDragging
                                                                ? "border-primary shadow-lg"
                                                                : "border-border/50"
                                                        }`}
                                                    >
                                                        {/* Header */}
                                                        <div className="flex items-center gap-3 p-3">
                                                            <button
                                                                type="button"
                                                                {...provided.dragHandleProps}
                                                                className="cursor-grab text-muted-foreground hover:text-foreground shrink-0"
                                                            >
                                                                <GripVertical className="h-4 w-4" />
                                                            </button>

                                                            <span className="text-xs text-muted-foreground shrink-0 w-5">
                                                                {index + 1}.
                                                            </span>

                                                            {isEditing ? (
                                                                <Input
                                                                    value={
                                                                        editValues.title
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setEditValues(
                                                                            (
                                                                                v,
                                                                            ) => ({
                                                                                ...v,
                                                                                title: e
                                                                                    .target
                                                                                    .value,
                                                                            }),
                                                                        )
                                                                    }
                                                                    className="h-7 text-sm flex-1"
                                                                    autoFocus
                                                                    onKeyDown={(
                                                                        e,
                                                                    ) => {
                                                                        if (
                                                                            e.key ===
                                                                            "Enter"
                                                                        )
                                                                            saveEdit(
                                                                                chapter,
                                                                            );
                                                                        if (
                                                                            e.key ===
                                                                            "Escape"
                                                                        )
                                                                            cancelEdit();
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                                    <span className="text-sm font-medium truncate">
                                                                        {
                                                                            chapter.title
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}

                                                            {/* Botones acción */}
                                                            <div className="flex items-center gap-1 shrink-0">
                                                                {isEditing ? (
                                                                    <>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7 text-emerald-500 hover:text-emerald-600"
                                                                            disabled={
                                                                                isSaving
                                                                            }
                                                                            onClick={() =>
                                                                                saveEdit(
                                                                                    chapter,
                                                                                )
                                                                            }
                                                                        >
                                                                            <Check className="h-3.5 w-3.5" />
                                                                        </Button>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                                                            onClick={
                                                                                cancelEdit
                                                                            }
                                                                        >
                                                                            <X className="h-3.5 w-3.5" />
                                                                        </Button>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                                                            onClick={() =>
                                                                                startEdit(
                                                                                    chapter,
                                                                                )
                                                                            }
                                                                        >
                                                                            <Pencil className="h-3.5 w-3.5" />
                                                                        </Button>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                                                            onClick={() =>
                                                                                setDeletingChapter(
                                                                                    chapter,
                                                                                )
                                                                            }
                                                                        >
                                                                            <Trash2 className="h-3.5 w-3.5" />
                                                                        </Button>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                                                            onClick={() =>
                                                                                setExpandedId(
                                                                                    isExpanded
                                                                                        ? null
                                                                                        : chapter.id,
                                                                                )
                                                                            }
                                                                        >
                                                                            <ChevronDown
                                                                                className={`h-4 w-4 transition-transform duration-200 ${
                                                                                    isExpanded
                                                                                        ? "rotate-180"
                                                                                        : ""
                                                                                }`}
                                                                            />
                                                                        </Button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Contenido expandido */}
                                                        {isExpanded && (
                                                            <div className="border-t border-border/30 p-4">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    {/* Descripción */}
                                                                    <div className="bg-muted/30 rounded-lg border border-border/30 p-3  space-y-3">
                                                                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">
                                                                            Descripción
                                                                        </p>
                                                                        {isEditing ? (
                                                                            <Textarea
                                                                                value={
                                                                                    editValues.description
                                                                                }
                                                                                onChange={(
                                                                                    e,
                                                                                ) =>
                                                                                    setEditValues(
                                                                                        (
                                                                                            v,
                                                                                        ) => ({
                                                                                            ...v,
                                                                                            description:
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                        }),
                                                                                    )
                                                                                }
                                                                                placeholder="Descripción del capítulo"
                                                                                className="border-0 bg-transparent px-0 focus-visible:ring-0 resize-none text-sm"
                                                                                rows={
                                                                                    4
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <p className="text-sm text-foreground  wrap-break-words line-clamp-4">
                                                                                {chapter.description ?? (
                                                                                    <span className="text-muted-foreground italic">
                                                                                        Sin
                                                                                        descripción
                                                                                    </span>
                                                                                )}
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    {/* Video */}
                                                                    <div className="bg-muted/30 rounded-lg border border-border/30 p-3 space-y-2">
                                                                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                                                            Video
                                                                        </p>
                                                                        <ChapterVideo
                                                                            chapterId={
                                                                                chapter.id
                                                                            }
                                                                            courseId={
                                                                                courseId
                                                                            }
                                                                            videoUrl={
                                                                                chapter.videoUrl
                                                                            }
                                                                            readOnly={!isEditing} 
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </CardContent>
            </Card>

            {/* Modal eliminar */}
            <AlertDialog
                open={!!deletingChapter}
                onOpenChange={(open) => !open && setDeletingChapter(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {`Esta acción no se puede deshacer. Se eliminará el capítulo "${deletingChapter?.title}" permanentemente.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? "Eliminando..." : "Eliminar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
