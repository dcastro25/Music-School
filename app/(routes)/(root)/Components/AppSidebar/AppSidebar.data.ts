import {
    BookOpen,
    ChartArea,
    GraduationCap,
    House,
    Settings2,
    SquareTerminal,
} from "lucide-react";

export const routes = [
    {
        id: 1,
        title: "Home",
        url: "/",
        icon: House,
    },
    {
        id: 2,
        title: "Cursos",
        url: "/courses",
        icon: SquareTerminal,
    },

    {
        id: 3,
        title: "Mis Cursos",
        url: "/my-courses",
        icon: BookOpen,
    },
    {
        id: 4,
        title: "Ajustes",
        url: "/settings",
        icon: Settings2,
    },
];

export const routesTeacher = [
    {
        id: 1,
        title: "Cursos",
        url: "/teacher",
        icon: GraduationCap,
    },
    {
        id: 2,
        title: "Analiticas",
        url: "/teacher/analytics",
        icon: ChartArea,
    },
];
