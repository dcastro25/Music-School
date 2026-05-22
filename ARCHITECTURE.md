# Arquitectura - Advanced Course Form

## Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                    AdvancedCourseForm.tsx                   │
│                      (Contenedor Principal)                 │
│                      "use client"                           │
├─────────────────────────────────────────────────────────────┤
│  Estados:                                                   │
│  - title, subtitle, description                             │
│  - category, subcategory, language, difficulty              │
│  - modules, objectives, requirements, tags                  │
│  - price, isFree, hasCertificate, isPublic                 │
│                                                             │
│  Lógica:                                                    │
│  - addModule/removeModule/updateModule                      │
│  - addLesson/removeLesson/updateLesson                      │
│  - addTag/removeTag                                         │
│  - addObjective/removeObjective/updateObjective             │
│  - addRequirement/removeRequirement/updateRequirement       │
└─────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
    │ FormHeader │  │ BasicInfo  │  │  Content   │  │  Details   │
    │  (sticky)  │  │    Tab     │  │    Tab     │  │    Tab     │
    │"use client"│  │"use client" │  │"use client" │  │"use client" │
    └────────────┘  └────────────┘  └────────────┘  └────────────┘
         │              │              │              │
         │              ▼              ▼              ▼
         │       - title input      - modules list   - objectives
         │       - subtitle         - add/remove     - requirements
         │       - description      - lesson items   - target audience
         │       - category         - type selector  - materials info
         │       - subcategory      - duration
         │       - language         - lesson actions
         │       - difficulty
         │       - tags
         │       - media upload
         │       - stats
         │
         │
         └─────────────┬──────────────┬──────────────┐
                       ▼              ▼              ▼
                 ┌────────────┐  ┌────────────┐  ┌────────────┐
                 │  Pricing   │  │  Settings  │  │   Tabs     │
                 │    Tab     │  │    Tab     │  │ Navigation │
                 │"use client" │  │"use client" │  │"use client" │
                 └────────────┘  └────────────┘  └────────────┘
                       │              │
                       ▼              ▼
                 - free toggle   - public toggle
                 - price input   - certificate
                 - presets       - visibility
                 - discount      - advanced settings
                 - estimates
```

## Flujo de Datos

```
Usuario escribe en Input
        │
        ▼
onChange event
        │
        ▼
setState (actualiza estado en AdvancedCourseForm)
        │
        ▼
Componente se re-renderiza
        │
        ▼
Props actualizadas enviadas a Tab
        │
        ▼
Tab muestra nuevo valor
```

## Estructura de Archivos

```
teacher/
├── components/
│   ├── AdvancedCourseForm.tsx      (Componente principal, "use client")
│   ├── FormHeader.tsx               (Header sticky, "use client")
│   ├── BasicInfoTab.tsx             (Tab de info básica, "use client")
│   ├── ContentTab.tsx               (Tab de contenido, "use client")
│   ├── DetailsTab.tsx               (Tab de detalles, "use client")
│   ├── PricingTab.tsx               (Tab de precios, "use client")
│   ├── SettingsTab.tsx              (Tab de configuración, "use client")
│   ├── index.tsx                    (Exportaciones)
│   └── README.md                    (Documentación)
│
└── create/
    └── page.tsx                     (Página de ejemplo)
```

## Tipos de Datos

```typescript
// Tipos principales (exportados desde AdvancedCourseForm.tsx)

Module {
  id: string
  title: string
  lessons: Lesson[]
}

Lesson {
  id: string
  title: string
  type: "video" | "text" | "quiz"
  duration: number
}

Objective {
  id: string
  text: string
}

Requirement {
  id: string
  text: string
}
```

## Props por Tab

### BasicInfoTab

```typescript
interface BasicInfoTabProps {
    title: string;
    setTitle: (value: string) => void;
    subtitle: string;
    setSubtitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    subcategory: string;
    setSubcategory: (value: string) => void;
    language: string;
    setLanguage: (value: string) => void;
    difficulty: number[];
    setDifficulty: (value: number[]) => void;
    tags: string[];
    newTag: string;
    setNewTag: (value: string) => void;
    onAddTag: () => void;
    onRemoveTag: (tag: string) => void;
    modules: Module[]; // Para estadísticas
}
```

### ContentTab

```typescript
interface ContentTabProps {
    modules: Module[];
    onAddModule: () => void;
    onRemoveModule: (moduleId: string) => void;
    onAddLesson: (moduleId: string) => void;
    onRemoveLesson: (moduleId: string, lessonId: string) => void;
    onUpdateModule: (moduleId: string, title: string) => void;
    onUpdateLesson: (
        moduleId: string,
        lessonId: string,
        updates: Partial<Lesson>,
    ) => void;
}
```

### DetailsTab

```typescript
interface DetailsTabProps {
    objectives: Objective[];
    onAddObjective: () => void;
    onRemoveObjective: (id: string) => void;
    onUpdateObjective: (id: string, text: string) => void;
    requirements: Requirement[];
    onAddRequirement: () => void;
    onRemoveRequirement: (id: string) => void;
    onUpdateRequirement: (id: string, text: string) => void;
    targetAudience: string;
    onTargetAudienceChange: (value: string) => void;
}
```

### PricingTab

```typescript
interface PricingTabProps {
    price: number;
    setPrice: (value: number) => void;
    isFree: boolean;
    setIsFree: (value: boolean) => void;
}
```

### SettingsTab

```typescript
interface SettingsTabProps {
    hasCertificate: boolean;
    setHasCertificate: (value: boolean) => void;
    isPublic: boolean;
    setIsPublic: (value: boolean) => void;
}
```

## Características de Diseño

- **Dark Mode**: Compatible con next-themes (automático)
- **Responsive**: Mobile-first approach
- **Accesible**: Etiquetas asociadas, roles ARIA correctos
- **Performance**: Componentes sin re-renders innecesarios
- **Temas**: Colores personalizables vía Tailwind
- **Interactivo**: Drag & drop ready, transitions suaves

## Mejoras Futuras

1. **Validación**
    - Zod para validar datos en submit
    - Mensajes de error contextuales
    - Validación en tiempo real (opcional)

2. **Persistencia**
    - Auto-save a localStorage/sesión
    - Recuperar borradores
    - Historial de cambios

3. **Funcionalidades Avanzadas**
    - Drag & drop reorder (modulos/lecciones)
    - Carga de medios a S3/CDN
    - Editor visual de certificados
    - Vista previa en tiempo real
    - Colaboración en tiempo real

4. **Integración**
    - Server Actions (Next.js 13+)
    - API routes
    - Webhooks para notificaciones
    - Analytics

5. **Internacionalización**
    - Soporte para múltiples idiomas
    - Plurales dinámicos
    - Fechas localizadas
