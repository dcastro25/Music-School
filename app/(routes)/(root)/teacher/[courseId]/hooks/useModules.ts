import { useState } from "react";

interface Lesson {
    id: string;
    title: string;
    type: "video" | "text" | "quiz";
    duration: number;
}

interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export function useModules() {
    const [modules, setModules] = useState<Module[]>([
        {
            id: "1",
            title: "Módulo 1: Introducción",
            lessons: [],
        },
    ]);

    const addModule = () => {
        const newModule: Module = {
            id: Date.now().toString(),
            title: `Módulo ${modules.length + 1}`,
            lessons: [],
        };
        setModules([...modules, newModule]);
    };

    const removeModule = (moduleId: string) => {
        setModules(modules.filter((m) => m.id !== moduleId));
    };

    const addLesson = (moduleId: string) => {
        setModules(
            modules.map((m) =>
                m.id === moduleId
                    ? {
                          ...m,
                          lessons: [
                              ...m.lessons,
                              {
                                  id: Date.now().toString(),
                                  title: "Nueva lección",
                                  type: "video",
                                  duration: 10,
                              },
                          ],
                      }
                    : m,
            ),
        );
    };

    const removeLesson = (moduleId: string, lessonId: string) => {
        setModules(
            modules.map((m) =>
                m.id === moduleId
                    ? {
                          ...m,
                          lessons: m.lessons.filter((l) => l.id !== lessonId),
                      }
                    : m,
            ),
        );
    };

    return {
        modules,
        addModule,
        removeModule,
        addLesson,
        removeLesson,
        setModules
    };
}
