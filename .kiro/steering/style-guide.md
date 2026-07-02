# Guía de Estilos TAMEFOR

## Visión General

Este documento establece los estándares de diseño y desarrollo para mantener consistencia visual y de código en todo el proyecto TAMEFOR.

## 1. Sistema de Colores

### Paleta Principal
- **Primary (Navy Blue)**: `#1a3a5c` - Usado en headers, footers, elementos principales
- **Secondary (Teal)**: `#3d9a8b` - Usado en acentos, botones, hover states
- **Background**: Blanco/Claro
- **Foreground**: Texto oscuro

### Uso de Colores en Tailwind
**SIEMPRE usa variables CSS en lugar de colores hardcodeados:**

```tsx
// ✅ CORRECTO
<div className="bg-primary text-secondary">
<button className="bg-secondary hover:bg-primary">

// ❌ INCORRECTO
<div className="bg-[#1a3a5c] text-[#3d9a8b]">
<button className="bg-[#3d9a8b] hover:bg-[#1a3a5c]">
```

## 2. Espaciado Estandarizado

### Padding de Secciones
```tsx
// Secciones principales
<section className="section-padding"> {/* py-20 px-4 */}

// Secciones compactas
<section className="section-padding-sm"> {/* py-12 px-4 */}

// Secciones grandes
<section className="section-padding-lg"> {/* py-28 px-4 */}
```

### Contenedor
```tsx
// SIEMPRE usa container-max para consistencia
<div className="container-max">
  {/* Contenido */}
</div>

// NO uses container mx-auto px-4 directamente
```

## 3. Bordes Redondeados

Escala consistente:
- `rounded-sm` (0.375rem) - Inputs pequeños
- `rounded-md` (0.5rem) - Badges, pequeños elementos
- `rounded-lg` (0.75rem) - Cards, componentes medianos
- `rounded-xl` (1rem) - Componentes grandes
- `rounded-2xl` (1.5rem) - Imágenes, secciones grandes
- `rounded-full` (9999px) - Botones circulares, avatares

## 4. Sombras

Escala consistente:
- `shadow-sm` - Elementos sutiles
- `shadow-md` - Elementos normales
- `shadow-lg` - Elementos destacados
- `shadow-xl` - Elementos prominentes
- `shadow-2xl` - Elementos flotantes

## 5. Transiciones y Animaciones

### Transiciones Suaves
```tsx
// Transición estándar (300ms)
<div className="transition-smooth">

// Transición lenta (500ms)
<div className="transition-smooth-slow">
```

### Animaciones Framer Motion

**SIEMPRE importa desde `lib/animations.ts`:**

```tsx
import {
  containerVariants,
  itemVariants,
  imageVariants,
  fadeInVariants,
  slideInFromLeftVariants,
  hoverScaleVariants,
} from "@/lib/animations"

// Uso
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={containerVariants}
>
  <motion.div variants={itemVariants}>
    Contenido
  </motion.div>
</motion.div>
```

## 6. Componentes UI Reutilizables

### SectionHeader
Para encabezados de secciones consistentes:

```tsx
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Leaf } from "lucide-react"

<SectionHeader
  icon={Leaf}
  subtitle="Nuestros Servicios"
  title="Soluciones"
  titleHighlight="Sostenibles"
  description="Descripción de la sección"
  centered
/>
```

### IconBadge
Para iconos con fondo circular:

```tsx
import { IconBadge } from "@/components/ui/IconBadge"
import { Leaf } from "lucide-react"

<IconBadge
  icon={Leaf}
  variant="secondary" // primary, secondary, accent
  size="md" // sm, md, lg
  animated
/>
```

### ServiceCard
Para tarjetas de servicios:

```tsx
import { ServiceCard } from "@/components/ui/ServiceCard"

<ServiceCard
  number="01"
  title="Gestión de Residuos"
  description="Consultoría ambiental..."
  image="https://..."
  href="/servicios"
  index={0}
/>
```

### StatCard
Para tarjetas de estadísticas:

```tsx
import { StatCard } from "@/components/ui/StatCard"
import { TrendingUp } from "lucide-react"

<StatCard
  icon={TrendingUp}
  value="41%"
  label="Éxito de la Empresa"
  index={0}
/>
```

## 7. Patrones de Diseño

### Hover Effects
```tsx
// Elevación
<motion.div whileHover={{ y: -5 }}>

// Escala
<motion.div whileHover={{ scale: 1.05 }}>

// Rotación (para iconos)
<motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
```

### Badges Personalizadas
```tsx
// Badge primario
<div className="badge-primary">Contenido</div>

// Badge secundario
<div className="badge-secondary">Contenido</div>
```

### Focus Ring
Para accesibilidad:
```tsx
<input className="focus-ring" />
<button className="focus-ring" />
```

## 8. Responsive Design

Breakpoints estándar (Tailwind):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Patrón recomendado:**
```tsx
// Mobile first
<div className="flex flex-col gap-4 md:flex-row md:gap-8 lg:gap-12">
  {/* Contenido */}
</div>

// Ocultar/mostrar
<div className="hidden lg:flex"> {/* Mostrar solo en lg+ */}
<div className="lg:hidden"> {/* Ocultar en lg+ */}
```

## 9. Estructura de Componentes

### Componentes de Sección
```tsx
"use client"

import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"
import { SectionHeader } from "@/components/ui/SectionHeader"

export function MySection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-max">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <SectionHeader
            title="Título"
            description="Descripción"
          />

          <motion.div className="grid gap-8 mt-12" variants={itemVariants}>
            {/* Contenido */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

## 10. Checklist de Calidad

Antes de hacer commit, verifica:

- [ ] No hay colores hardcodeados (`#1a3a5c`, `#3d9a8b`)
- [ ] Se usan variables CSS (`bg-primary`, `text-secondary`)
- [ ] Espaciado consistente (`section-padding`, `container-max`)
- [ ] Bordes redondeados en escala correcta
- [ ] Animaciones importadas de `lib/animations.ts`
- [ ] Componentes reutilizables usados donde aplica
- [ ] Responsive design probado en móvil/tablet/desktop
- [ ] Transiciones suaves (`transition-smooth`)
- [ ] Accesibilidad: focus rings, alt text, semantic HTML

## 11. Ejemplos de Refactorización

### Antes (Inconsistente)
```tsx
<div className="bg-[#1a3a5c] text-white py-20 px-4">
  <div className="container mx-auto">
    <h2 className="text-4xl font-bold text-[#3d9a8b] mb-8">Título</h2>
    <div className="grid grid-cols-3 gap-8">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-bold text-[#1a3a5c]">{item.title}</h3>
        </div>
      ))}
    </div>
  </div>
</div>
```

### Después (Consistente)
```tsx
<section className="section-padding bg-primary text-primary-foreground">
  <div className="container-max">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <SectionHeader
        title="Título"
        titleHighlight="Destacado"
      />

      <motion.div className="grid md:grid-cols-3 gap-8 mt-12" variants={itemVariants}>
        {items.map((item, i) => (
          <ServiceCard
            key={item.id}
            title={item.title}
            description={item.description}
            index={i}
          />
        ))}
      </motion.div>
    </motion.div>
  </div>
</section>
```

## 12. Recursos

- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Lucide Icons**: https://lucide.dev
- **Radix UI**: https://www.radix-ui.com

---

**Última actualización**: Abril 2026
**Versión**: 1.0
