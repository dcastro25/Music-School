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
    const [modules, setModules] = useState<Module[]>([]);

    const addModule = (title: string) => {
        const newModule: Module = {
            id: Date.now().toString(),
            title,
            lessons: [],
        };

        setModules((prev) => [...prev, newModule]);
    };

    const removeModule = (moduleId: string) => {
        setModules((prev) => prev.filter((m) => m.id !== moduleId));
    };

    const addLesson = (moduleId: string) => {
        setModules((prev) =>
            prev.map((m) =>
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
                    : m
            )
        );
    };

    const removeLesson = (moduleId: string, lessonId: string) => {
        setModules((prev) =>
            prev.map((m) =>
                m.id === moduleId
                    ? {
                          ...m,
                          lessons: m.lessons.filter((l) => l.id !== lessonId),
                      }
                    : m
            )
        );
    };

    return {
        modules,
        addModule,
        removeModule,
        addLesson,
        removeLesson,
        setModules,
    };
}