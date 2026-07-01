const DURATION_LABELS: Record<string, string> = {
    "2_semanas": "2 semanas",
    "1_mes": "1 mes",
    "3_meses": "3 meses",
    "6_meses": "6 meses",
    "12_meses": "12 meses",
    personalizado: "Personalizado",
};

const CATEGORY_LABELS: Record<string, string> = {
    instrumentos: "Instrumentos",
    canto: "Canto",
    teoria: "Teoría y Composición",
};

const LEVEL_LABELS: Record<string, string> = {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    expert: "Experto",
};

export function getDurationLabel(duration?: string | null) {
    if (!duration) return "";
    return DURATION_LABELS[duration] ?? duration;
}

export function getCategoryLabel(category?: string | null) {
    if (!category) return "";
    return CATEGORY_LABELS[category] ?? category;
}

export function getLevelLabel(level?: string | null) {
    if (!level) return "";
    return LEVEL_LABELS[level] ?? level;
}

export function getCourseImage(imageUrl?: string | null) {
    if (!imageUrl || imageUrl.trim() === "") {
        return "/img/default-image-course.webp";
    }
    return imageUrl;
}