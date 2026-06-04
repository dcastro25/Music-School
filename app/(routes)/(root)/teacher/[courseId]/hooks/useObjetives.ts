import { useState } from "react";

interface Objective {
    id: string;
    text: string;
}

export function useObjectives() {
    const [objectives, setObjectives] = useState<Objective[]>([]);

    const addObjective = () => {
        setObjectives([...objectives, { id: Date.now().toString(), text: "" }]);
    };

    const removeObjective = (id: string) => {
        setObjectives(objectives.filter((o) => o.id !== id));
    };

    return {
        objectives,
        setObjectives,
        addObjective,
        removeObjective,
    };
}
