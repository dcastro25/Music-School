"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModules } from "../../hooks/useModules";
import { GripVertical, Layers, Plus } from "lucide-react";
import { useState } from "react";
import { FormChapter } from "./formChapter";
import axios from "axios";
import { toast } from "sonner";


import {
    DragDropContext,
    Droppable,
    DropResult,
    Draggable,
} from "@hello-pangea/dnd";

import { CourseChapterProps, Chapter } from "./courseChapter.form";

export function CourseChapter({ courseId, chapters, onChaptersChange }: CourseChapterProps) {

    const { addModule } = useModules();
    const [showInputChapter, setShowInputChapter] = useState(false);

    const handleChapterCreated = (newChapter: Chapter) => {
        onChaptersChange([...chapters, newChapter]);
    };

    const onDragEnd = async (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) return;
        if (destination.index === source.index) return;

        const items = Array.from(chapters);
        const [movedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, movedItem);

        const updatedItems = items.map((chapter, index) => ({
            ...chapter,
            position: index + 1,
        }));

        const previousList = chapters;
        onChaptersChange(updatedItems);

        // Solo persistimos el orden si el curso ya existe
        if (!courseId) return;

        try {
            await axios.put(`/api/course/${courseId}/chapter/reorder`, {
                list: updatedItems.map((c) => ({
                    id: c.id,
                    position: c.position,
                })),
            });
        } catch (error) {
            toast.error("No se pudo guardar el nuevo orden");
            onChaptersChange(previousList);
        }
    };

    return (
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
                    Añadir Capitulo
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

                {chapters.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        Aún no hay capítulos creados
                    </p>
                )}

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="chapters">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-2"
                            >
                                {chapters.map((chapter, index) => (
                                    <Draggable
                                        key={chapter.id}
                                        draggableId={chapter.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={`p-4 border rounded-xl flex items-center justify-between bg-card transition-colors ${
                                                    snapshot.isDragging
                                                        ? "border-primary shadow-lg"
                                                        : "border-border/50"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        {...provided.dragHandleProps}
                                                        className="cursor-grab text-muted-foreground hover:text-foreground"
                                                    >
                                                        <GripVertical className="h-4 w-4" />
                                                    </button>
                                                    <span>
                                                        {index + 1}. {chapter.title}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </CardContent>
        </Card>
    );
}