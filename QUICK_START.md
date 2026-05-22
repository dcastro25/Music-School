# 🚀 Quick Start - Advanced Course Form

## 1️⃣ Verificar que todo esté listo

✅ **Componentes creados** en `app/(routes)/(root)/teacher/components/`:

- AdvancedCourseForm.tsx
- FormHeader.tsx
- BasicInfoTab.tsx
- ContentTab.tsx
- DetailsTab.tsx
- PricingTab.tsx
- SettingsTab.tsx
- index.tsx

✅ **UI Components creados** en `components/ui/`:

- card.tsx
- label.tsx
- textarea.tsx
- slider.tsx
- progress.tsx
- badge.tsx
- switch.tsx
- tabs.tsx

## 2️⃣ Opción A: Crear una página nueva (RECOMENDADO)

### Paso 1: Crear archivo de página

**Ruta**: `app/(routes)/(root)/teacher/create/page.tsx`

```typescript
import { AdvancedCourseForm } from "@/app/(routes)/(root)/teacher/components";

export default function CreateCoursePage() {
  return <AdvancedCourseForm />;
}
```

### Paso 2: Ir a la página

```
http://localhost:3000/teacher/create
```

¡Hecho! El formulario está listo.

## 3️⃣ Opción B: Usar en un componente existente

### Si quieres importarlo en otro lugar:

```typescript
"use client";

import { AdvancedCourseForm } from "@/app/(routes)/(root)/teacher/components";

export function MyComponent() {
  return (
    <div>
      <h1>Crear Nuevo Curso</h1>
      <AdvancedCourseForm />
    </div>
  );
}
```

## 4️⃣ Opción C: Usar en un Modal

```typescript
"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AdvancedCourseForm } from "@/app/(routes)/(root)/teacher/components";

export function CreateCourseModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Crear Curso</button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-screen overflow-y-auto">
          <AdvancedCourseForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
```

## 5️⃣ Estructura del Formulario

El formulario tiene 5 pestañas:

### 📖 BÁSICO

- Título, subtítulo, descripción
- Categoría (Guitarra, Piano, etc.)
- Idioma, dificultad
- Etiquetas
- Upload de imagen y video

### 📚 CONTENIDO

- Módulos (crear, eliminar, editar)
- Lecciones por módulo
- Tipo de lección (video, texto, quiz)
- Duración

### 🎯 DETALLES

- Objetivos de aprendizaje
- Requisitos previos
- Público objetivo
- Materiales incluidos

### 💰 PRECIOS

- Toggle gratis vs pagado
- Precio en USD
- Precio con descuento
- Estimación de ingresos

### ⚙️ AJUSTES

- Visibilidad (público/privado)
- Certificados
- Opciones avanzadas

## 6️⃣ Primeros pasos con datos

### Ejemplo: Crear un curso de guitarra

1. **Pestaña Básico**:
    - Título: "Guitarra para Principiantes"
    - Descripción: "Aprende los acordes básicos..."
    - Categoría: Guitarra
    - Subcategoría: Guitarra Acústica

2. **Pestaña Contenido**:
    - Módulo 1: "Fundamentos"
        - Lección 1: "Partes de la guitarra" (video, 10 min)
        - Lección 2: "Cómo sostener" (video, 8 min)
    - Módulo 2: "Acordes"
        - Lección 1: "Do Mayor" (video, 15 min)
        - Lección 2: "La Menor" (video, 15 min)

3. **Pestaña Detalles**:
    - Objetivo: "Dominar acordes básicos"
    - Objetivo: "Tocar canciones simples"
    - Requisito: "Guitarra"
    - Requisito: "Conexión a internet"

4. **Pestaña Precios**:
    - Seleccionar: Pagado
    - Precio: $39

5. **Pestaña Ajustes**:
    - Público: Sí
    - Certificado: Sí

## 7️⃣ Personalizar el formulario

### Cambiar categorías musicales

En `app/(routes)/(root)/teacher/components/BasicInfoTab.tsx`:

```typescript
const MUSIC_CATEGORIES = [
    { value: "guitarra", label: "Guitarra" },
    { value: "piano", label: "Piano" },
    // Agrega más aquí
];
```

### Cambiar precios sugeridos

En `app/(routes)/(root)/teacher/components/PricingTab.tsx`:

```typescript
{[19, 29, 49, 79, 99].map((p) => (
  // Cambiar estos números
))}
```

### Cambiar colores

Opción 1: En `tailwind.config.ts`

```typescript
theme: {
  colors: {
    primary: "#tu-color", // Cambiar aquí
  }
}
```

Opción 2: En los componentes

```typescript
className = "bg-primary"; // Reemplazar primary por tu color
```

## 8️⃣ Recopilar datos del formulario

El componente gestiona internamente su propio estado. Para enviar los datos a tu API:

### Opción 1: Agregar un botón handler

Edita `AdvancedCourseForm.tsx` y agrega:

```typescript
const handlePublish = async () => {
    const courseData = {
        title,
        description,
        category,
        modules,
        objectives,
        requirements,
        price,
        isFree,
        // ... resto de campos
    };

    try {
        const response = await fetch("/api/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(courseData),
        });

        if (response.ok) {
            alert("Curso creado exitosamente");
            // Redirigir o actualizar UI
        }
    } catch (error) {
        alert("Error al crear curso");
    }
};
```

### Opción 2: Server Action (Next.js 13+)

Crea `app/actions.ts`:

```typescript
"use server";

export async function createCourse(data: any) {
    // Enviar a Prisma o base de datos
    return { success: true, courseId: 123 };
}
```

## 9️⃣ Validar datos (Opcional)

Instala Zod:

```bash
npm install zod
```

Luego en el handlePublish:

```typescript
import { z } from "zod";

const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    modules: z.array(
        z.object({
            title: z.string(),
            lessons: z.array(
                z.object({
                    title: z.string(),
                    type: z.enum(["video", "text", "quiz"]),
                }),
            ),
        }),
    ),
});

const validated = schema.parse(courseData);
```

## 🔟 Troubleshooting

### ❌ "Cannot find module @/..."

→ Verifica `tsconfig.json` tiene:

```json
{
    "compilerOptions": {
        "paths": {
            "@/*": ["./*"]
        }
    }
}
```

### ❌ Los estilos no se ven

→ Verifica que Tailwind está configurado
→ Verifica `tailwind.config.ts` existe

### ❌ Los componentes UI no existen

→ Asegúrate de haber creado todos los archivos en `components/ui/`

### ❌ "use client" errors

→ Verifica que todos los archivos tienen `"use client"` en la primera línea

## 📚 Documentación Completa

Para más detalles, consulta:

- **README.md** - Guía completa de componentes
- **USAGE_EXAMPLES.md** - 4 formas de usarlo
- **ARCHITECTURE.md** - Cómo está construido
- **INTEGRATION_CHECKLIST.md** - Checklist de integración

## ✨ Características Incluidas

✅ 5 pestañas (Básico, Contenido, Detalles, Precios, Ajustes)
✅ Gestión de módulos y lecciones
✅ Gestión de objetivos y requisitos
✅ Slider de dificultad
✅ Sistema de etiquetas
✅ Estimación de ingresos
✅ Certificados
✅ Header sticky
✅ Responsive design
✅ Dark mode automático
✅ 100% TypeScript
✅ 100% "use client" correcto

## 🎯 Próximos pasos

1. ✅ Integrar con tu API
2. ✅ Agregar validación con Zod (opcional)
3. ✅ Conectar con Prisma para persistencia
4. ✅ Agregar upload de medios
5. ✅ Agregar preview del certificado personalizado

---

**¡Listo para usar! 🚀**

Cualquier pregunta o customización, consulta la documentación incluida.
