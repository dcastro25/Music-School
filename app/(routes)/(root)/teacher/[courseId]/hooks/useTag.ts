import { useState } from "react";

export function useTags() {
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag("");
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    return {
        tags,
        newTag,
        setNewTag,
        addTag,
        removeTag,
    };
}
