# Ejemplos de Integración - Formulario de Cursos

## 1️⃣ Uso Básico en una Página

```typescript
// app/(routes)/(root)/teacher/create-course/page.tsx
"use client";

import { AdvancedCourseForm } from "../components";

export default function CreateCoursePage() {
    return <AdvancedCourseForm />;
}
```

## 2️⃣ Con Parámetros Iniciales (Futuro)

```typescript
interface AdvancedCourseFormProps {
    initialData?: {
        title?: string;
        description?: string;
        category?: string;
        modules?: Module[];
        // ... otros campos
    };
    onSubmit?: (data: CourseFormData) => Promise<void>;
}

export function AdvancedCourseForm({
    initialData,
    onSubmit,
}: AdvancedCourseFormProps) {
    // Usar initialData si existe
    const [title, setTitle] = useState(initialData?.title || "");

    // Llamar onSubmit al publicar
    const handlePublish = async () => {
        await onSubmit?.({...});
    };
}
```

## 3️⃣ En un Modal/Dialog

```typescript
// components/CreateCourseModal.tsx
"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AdvancedCourseForm } from "@/app/(routes)/(root)/teacher/components";

interface CreateCourseModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateCourseModal({
    open,
    onOpenChange,
}: CreateCourseModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl">
                <DialogHeader>
                    <DialogTitle>Crear Nuevo Curso</DialogTitle>
                </DialogHeader>
                <AdvancedCourseForm />
            </DialogContent>
        </Dialog>
    );
}

// Uso
const [open, setOpen] = useState(false);
return (
    <>
        <Button onClick={() => setOpen(true)}>Crear Curso</Button>
        <CreateCourseModal open={open} onOpenChange={setOpen} />
    </>
);
```

## 4️⃣ Con Sidebar Navegable

```typescript
// pages/teacher/dashboard.tsx
"use client";

import { useState } from "react";
import { AdvancedCourseForm } from "@/app/(routes)/(root)/teacher/components";
import { Button } from "@/components/ui/button";

export default function TeacherDashboard() {
    const [activeSection, setActiveSection] = useState("list");

    return (
        <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="w-48">
                <nav className="space-y-2">
                    <Button
                        variant={activeSection === "list" ? "default" : "ghost"}
                        onClick={() => setActiveSection("list")}
                        className="w-full justify-start"
                    >
                        Mis Cursos
                    </Button>
                    <Button
                        variant={
                            activeSection === "create" ? "default" : "ghost"
                        }
                        onClick={() => setActiveSection("create")}
                        className="w-full justify-start"
                    >
                        Crear Curso
                    </Button>
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1">
                {activeSection === "list" && <CoursesList />}
                {activeSection === "create" && <AdvancedCourseForm />}
            </main>
        </div>
    );
}
```

## 5️⃣ Con Validación y API Call

```typescript
// Extender AdvancedCourseForm con submit
"use client";

import { useState } from "react";
import { AdvancedCourseForm } from "./components";
import { toast } from "sonner";

export function CreateCourseSection() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (courseData: CourseFormData) => {
        try {
            setIsLoading(true);

            // Validar datos
            if (!courseData.title) {
                toast.error("El título es requerido");
                return;
            }

            if (courseData.modules.length === 0) {
                toast.error("Agrega al menos un módulo");
                return;
            }

            // Enviar a API
            const response = await fetch("/api/course", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(courseData),
            });

            if (!response.ok) {
                throw new Error("Error al crear curso");
            }

            const { id } = await response.json();
            toast.success("Curso creado exitosamente");

            // Redirigir
            window.location.href = `/teacher/course/${id}`;
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Error desconocido"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return <AdvancedCourseForm onSubmit={handleSubmit} />;
}
```

## 6️⃣ Con Persistencia de Borrador

```typescript
// hooks/useCourseForm.ts
"use client";

import { useEffect, useState } from "react";
import { AdvancedCourseForm } from "@/app/(routes)/(root)/teacher/components";

const STORAGE_KEY = "course-form-draft";

export function useCourseFormDraft() {
    const [draft, setDraft] = useState(null);

    // Cargar borrador
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setDraft(JSON.parse(saved));
        }
    }, []);

    // Guardar borrador cada 30 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            // Obtener datos del formulario
            const formData = {
                title: document.querySelector("#title")?.value,
                // ... más campos
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const clearDraft = () => {
        localStorage.removeItem(STORAGE_KEY);
        setDraft(null);
    };

    return { draft, clearDraft };
}

// Uso
const { draft } = useCourseFormDraft();
return <AdvancedCourseForm initialData={draft} />;
```

## 7️⃣ Acceder a Datos Específicos

```typescript
// Para obtener datos cuando necesites
const [formState, setFormState] = useState({
    title: "",
    description: "",
    category: "",
    modules: [],
    objectives: [],
    price: 0,
    isFree: false,
    // ... más campos
});

// En un botón personalizado
const handleExportData = () => {
    const data = {
        ...formState,
        exportedAt: new Date().toISOString(),
    };

    console.log("Datos del curso:", data);

    // Descargar como JSON
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `curso-${formState.title || "nuevo"}.json`;
    a.click();
};
```

## 8️⃣ Con Barra Lateral Collapsible

```typescript
// components/FormWithSidebar.tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdvancedCourseForm } from "@/app/(routes)/(root)/teacher/components";

export function FormWithSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            {sidebarOpen && (
                <aside className="w-64 border-r border-border bg-card p-4">
                    <nav className="space-y-3">
                        <h3 className="font-semibold text-foreground">
                            Ayuda
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Completa cada sección para crear tu curso
                        </p>
                        <hr className="border-border/30" />
                        <ul className="space-y-2 text-sm">
                            <li>📝 Básico - Información general</li>
                            <li>📚 Contenido - Módulos y lecciones</li>
                            <li>🎯 Detalles - Objetivos y requisitos</li>
                            <li>💰 Precios - Monetización</li>
                            <li>⚙️ Configuración - Ajustes avanzados</li>
                        </ul>
                    </nav>
                </aside>
            )}

            {/* Main */}
            <main className="flex-1 overflow-auto">
                <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 p-4 backdrop-blur-sm">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>

                <AdvancedCourseForm />
            </main>
        </div>
    );
}
```

## 9️⃣ Con Steps Wizard

```typescript
// components/CourseWizard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    BasicInfoTab,
    ContentTab,
    DetailsTab,
    PricingTab,
    SettingsTab,
} from "@/app/(routes)/(root)/teacher/components";

const STEPS = [
    { id: "basic", label: "Básico" },
    { id: "content", label: "Contenido" },
    { id: "details", label: "Detalles" },
    { id: "pricing", label: "Precios" },
    { id: "settings", label: "Configuración" },
];

export function CourseWizard() {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="space-y-6 p-6">
            {/* Progress */}
            <div className="flex gap-2">
                {STEPS.map((step, idx) => (
                    <div
                        key={step.id}
                        className={`flex-1 rounded-lg p-3 text-center font-medium ${
                            idx <= currentStep
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                        }`}
                    >
                        {step.label}
                    </div>
                ))}
            </div>

            {/* Content */}
            <Card className="p-6">
                {currentStep === 0 && <BasicInfoTab {...props} />}
                {currentStep === 1 && <ContentTab {...props} />}
                {currentStep === 2 && <DetailsTab {...props} />}
                {currentStep === 3 && <PricingTab {...props} />}
                {currentStep === 4 && <SettingsTab {...props} />}
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                >
                    ← Anterior
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={currentStep === STEPS.length - 1}
                >
                    Siguiente →
                </Button>
            </div>
        </div>
    );
}
```

## 🔟 Tipo de Datos Completo

```typescript
interface CourseFormData {
    // Basic
    title: string;
    subtitle: string;
    description: string;
    category: string;
    subcategory: string;
    language: string;
    difficulty: number;

    // Content
    modules: Module[];

    // Details
    objectives: Objective[];
    requirements: Requirement[];
    targetAudience: string;

    // Pricing
    price: number;
    isFree: boolean;

    // Settings
    hasCertificate: boolean;
    isPublic: boolean;

    // Meta
    tags: string[];
}

interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

interface Lesson {
    id: string;
    title: string;
    type: "video" | "text" | "quiz";
    duration: number;
}

interface Objective {
    id: string;
    text: string;
}

interface Requirement {
    id: string;
    text: string;
}
```

---

**Ejemplos listos para copiar y pegar** ✨
