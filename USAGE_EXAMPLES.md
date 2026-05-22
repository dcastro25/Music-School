# Ejemplo de Uso - Advanced Course Form

## Opción 1: Crear una nueva página

**Archivo:** `app/(routes)/(root)/teacher/create/page.tsx`

```typescript
import { AdvancedCourseForm } from "@/app/(routes)/(root)/teacher/components";

export default function CreateCoursePage() {
  return <AdvancedCourseForm />;
}
```

## Opción 2: Usar en un modal o drawer

**Archivo:** `app/(routes)/(root)/teacher/components/CreateCourseModal.tsx`

```typescript
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AdvancedCourseForm } from "./AdvancedCourseForm";

interface CreateCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCourseModal({ open, onOpenChange }: CreateCourseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-screen overflow-y-auto">
        <AdvancedCourseForm />
      </DialogContent>
    </Dialog>
  );
}
```

## Opción 3: Integrar con formulario existente

Si ya tienes una estructura de formulario, puedes importar los tabs individuales:

```typescript
"use client";

import { useState } from "react";
import { BasicInfoTab } from "@/app/(routes)/(root)/teacher/components/BasicInfoTab";
import { ContentTab } from "@/app/(routes)/(root)/teacher/components/ContentTab";

export function MyCustomForm() {
  const [title, setTitle] = useState("");
  const [modules, setModules] = useState([]);

  // ... resto del estado ...

  return (
    <div>
      <BasicInfoTab
        title={title}
        setTitle={setTitle}
        // ... pasar el resto de props
      />
      <ContentTab
        modules={modules}
        // ... pasar el resto de props
      />
    </div>
  );
}
```

## Opciones 4: Renderizar como formulario controlado

```typescript
"use client";

import { useState } from "react";
import { AdvancedCourseForm } from "@/app/(routes)/(root)/teacher/components";

export function CourseFormWithSubmit() {
  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Curso creado:", data);
        // Redirigir o mostrar mensaje de éxito
      }
    } catch (error) {
      console.error("Error:", error);
      // Mostrar mensaje de error
    }
  };

  return <AdvancedCourseForm />;
}
```

## Estructura de datos enviados a la API

Cuando se envíe el formulario, los datos tendrán esta estructura:

```typescript
{
  // Información básica
  title: "Guitarra para Principiantes",
  subtitle: "Aprende a tocar en 4 semanas",
  description: "Descripción completa del curso...",
  category: "guitarra",
  subcategory: "acustica",
  language: "es",
  difficulty: 25,

  // Contenido
  modules: [
    {
      id: "1",
      title: "Módulo 1: Fundamentos",
      lessons: [
        {
          id: "1-1",
          title: "Partes de la guitarra",
          type: "video",
          duration: 15,
        },
        {
          id: "1-2",
          title: "Cómo sostener la guitarra",
          type: "video",
          duration: 10,
        },
      ],
    },
  ],

  // Detalles
  objectives: [
    { id: "1", text: "Dominar los acordes básicos" },
    { id: "2", text: "Tocar canciones simples" },
  ],
  requirements: [
    { id: "1", text: "Guitarra en buenas condiciones" },
    { id: "2", text: "Conexión a internet" },
  ],
  targetAudience: "Personas sin experiencia musical...",

  // Precios
  price: 49,
  isFree: false,

  // Configuración
  hasCertificate: true,
  isPublic: true,

  // Tags
  tags: ["Música", "Guitarra", "Online"],
}
```

## Personalización Avanzada

### Agregar validación con Zod

```typescript
import { z } from "zod";

const courseFormSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(1000),
    price: z.number().min(0),
    modules: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            lessons: z.array(
                z.object({
                    id: z.string(),
                    title: z.string(),
                    type: z.enum(["video", "text", "quiz"]),
                    duration: z.number().positive(),
                }),
            ),
        }),
    ),
});

type CourseFormData = z.infer<typeof courseFormSchema>;
```

### Agregar animaciones

```typescript
// En los componentes, usa framer-motion:
import { motion } from "framer-motion";

export function AdvancedCourseForm() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* contenido */}
    </motion.div>
  );
}
```

### Integración con Next.js Server Actions

```typescript
"use server";

import { prisma } from "@/lib/prisma";

export async function createCourse(data: CourseFormData) {
    try {
        const course = await prisma.course.create({
            data: {
                title: data.title,
                description: data.description,
                price: data.price,
                category: data.category,
                // ... resto de campos
                modules: {
                    create: data.modules.map((module) => ({
                        title: module.title,
                        lessons: {
                            create: module.lessons,
                        },
                    })),
                },
            },
        });
        return { success: true, courseId: course.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
```

Luego en tu componente:

```typescript
"use client";

import { createCourse } from "@/app/actions";
import { AdvancedCourseForm } from "./AdvancedCourseForm";

export function CourseFormWithServerAction() {
  const handleSubmit = async (formData: any) => {
    const result = await createCourse(formData);
    if (result.success) {
      // Redirigir al nuevo curso
      redirect(`/teacher/courses/${result.courseId}`);
    }
  };

  return <AdvancedCourseForm onSubmit={handleSubmit} />;
}
```
