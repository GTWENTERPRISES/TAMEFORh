# Ejemplos de Uso - Componentes Reutilizables

## 📋 Tabla de Contenidos
1. [SectionHeader](#sectionheader)
2. [IconBadge](#iconbadge)
3. [ServiceCard](#servicecard)
4. [StatCard](#statcard)
5. [Animaciones](#animaciones)
6. [Clases Utility](#clases-utility)

---

## SectionHeader

Componente para encabezados de secciones consistentes.

### Importación
```tsx
import { SectionHeader } from "@/components/ui"
import { Leaf, Users, Zap } from "lucide-react"
```

### Ejemplo Básico
```tsx
<SectionHeader
  title="Nuestros Servicios"
  description="Ofrecemos soluciones integrales para el sector forestal"
/>
```

### Ejemplo Completo
```tsx
<SectionHeader
  icon={Leaf}
  subtitle="Qué Hacemos"
  title="Servicios Especializados"
  titleHighlight="Para El Sector Forestal"
  description="Ofrecemos diferentes servicios para el desarrollo y fortalecimiento profesional."
  centered
/>
```

### Props
| Prop | Tipo | Requerido | Descripción |
|------|------|----------|-------------|
| `title` | string | ✅ | Título principal |
| `titleHighlight` | string | ❌ | Parte del título en color secundario |
| `subtitle` | string | ❌ | Subtítulo en color secundario |
| `description` | string | ❌ | Descripción debajo del título |
| `icon` | LucideIcon | ❌ | Icono de Lucide React |
| `centered` | boolean | ❌ | Centrar el contenido (default: true) |
| `className` | string | ❌ | Clases CSS adicionales |

### Casos de Uso
- Encabezados de secciones principales
- Títulos de páginas
- Introducción a nuevas secciones

---

## IconBadge

Componente para iconos con fondo circular.

### Importación
```tsx
import { IconBadge } from "@/components/ui"
import { Leaf, Users, Zap } from "lucide-react"
```

### Ejemplo Básico
```tsx
<IconBadge icon={Leaf} />
```

### Ejemplo con Variantes
```tsx
{/* Variante primaria */}
<IconBadge icon={Leaf} variant="primary" size="md" />

{/* Variante secundaria */}
<IconBadge icon={Users} variant="secondary" size="lg" />

{/* Variante accent */}
<IconBadge icon={Zap} variant="accent" size="sm" />
```

### Ejemplo con Label
```tsx
<IconBadge
  icon={Leaf}
  label="Sostenibilidad"
  variant="secondary"
  size="md"
  animated
/>
```

### Props
| Prop | Tipo | Requerido | Descripción |
|------|------|----------|-------------|
| `icon` | LucideIcon | ✅ | Icono de Lucide React |
| `label` | string | ❌ | Texto junto al icono |
| `variant` | 'primary' \| 'secondary' \| 'accent' | ❌ | Variante de color (default: 'secondary') |
| `size` | 'sm' \| 'md' \| 'lg' | ❌ | Tamaño del badge (default: 'md') |
| `animated` | boolean | ❌ | Activar animaciones (default: true) |
| `className` | string | ❌ | Clases CSS adicionales |

### Casos de Uso
- Iconos en headers de secciones
- Badges de características
- Iconos en listas
- Redes sociales

---

## ServiceCard

Componente para tarjetas de servicios.

### Importación
```tsx
import { ServiceCard } from "@/components/ui"
```

### Ejemplo Básico
```tsx
<ServiceCard
  title="Gestión de Residuos"
  description="Consultoría ambiental que incluye asesoramiento y orientación"
  index={0}
/>
```

### Ejemplo Completo
```tsx
<ServiceCard
  number="01"
  title="Gestión de Residuos"
  description="Consultoría ambiental que incluye asesoramiento y orientación en gestión de residuos"
  image="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070"
  href="/servicios/gestion-residuos"
  index={0}
/>
```

### Ejemplo en Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {services.map((service, index) => (
    <ServiceCard
      key={service.id}
      number={String(index + 1).padStart(2, '0')}
      title={service.title}
      description={service.description}
      image={service.image}
      href={service.href}
      index={index}
    />
  ))}
</div>
```

### Props
| Prop | Tipo | Requerido | Descripción |
|------|------|----------|-------------|
| `title` | string | ✅ | Título de la tarjeta |
| `description` | string | ✅ | Descripción |
| `number` | string | ❌ | Número de la tarjeta |
| `image` | string | ❌ | URL de la imagen de fondo |
| `icon` | ReactNode | ❌ | Icono personalizado |
| `href` | string | ❌ | URL del enlace |
| `className` | string | ❌ | Clases CSS adicionales |
| `index` | number | ❌ | Índice para animaciones (default: 0) |

### Casos de Uso
- Tarjetas de servicios
- Tarjetas de características
- Tarjetas de productos
- Galerías

---

## StatCard

Componente para tarjetas de estadísticas.

### Importación
```tsx
import { StatCard } from "@/components/ui"
import { TrendingUp, Users, Zap } from "lucide-react"
```

### Ejemplo Básico
```tsx
<StatCard
  icon={TrendingUp}
  value="41%"
  label="Éxito de la Empresa"
  index={0}
/>
```

### Ejemplo en Grid
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  {stats.map((stat, index) => (
    <StatCard
      key={index}
      icon={stat.icon}
      value={stat.value}
      label={stat.label}
      index={index}
    />
  ))}
</div>
```

### Props
| Prop | Tipo | Requerido | Descripción |
|------|------|----------|-------------|
| `icon` | LucideIcon | ✅ | Icono de Lucide React |
| `value` | string | ✅ | Valor a mostrar |
| `label` | string | ✅ | Etiqueta descriptiva |
| `className` | string | ❌ | Clases CSS adicionales |
| `index` | number | ❌ | Índice para animaciones (default: 0) |

### Casos de Uso
- Estadísticas de la empresa
- Métricas de desempeño
- Números destacados
- KPIs

---

## Animaciones

### Importación
```tsx
import {
  containerVariants,
  itemVariants,
  imageVariants,
  fadeInVariants,
  slideInFromLeftVariants,
  slideInFromRightVariants,
  slideInFromTopVariants,
  slideInFromBottomVariants,
  scaleInVariants,
  rotateInVariants,
  hoverScaleVariants,
  hoverLiftVariants,
  tapVariants
} from "@/lib/animations"
```

### Ejemplo: Container con Stagger
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={containerVariants}
>
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
  <motion.div variants={itemVariants}>Item 3</motion.div>
</motion.div>
```

### Ejemplo: Slide In
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={slideInFromLeftVariants}
>
  Contenido que entra desde la izquierda
</motion.div>
```

### Ejemplo: Hover Effects
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### Ejemplo: Rotate on Hover
```tsx
<motion.div
  whileHover={{ rotate: 360 }}
  transition={{ duration: 0.6 }}
>
  Icono rotativo
</motion.div>
```

### Variantes Disponibles

#### containerVariants
```tsx
{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}
```

#### itemVariants
```tsx
{
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}
```

#### imageVariants
```tsx
{
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
}
```

---

## Clases Utility

### Espaciado de Secciones
```tsx
{/* Sección estándar */}
<section className="section-padding">
  Contenido
</section>

{/* Sección compacta */}
<section className="section-padding-sm">
  Contenido
</section>

{/* Sección grande */}
<section className="section-padding-lg">
  Contenido
</section>
```

### Contenedor
```tsx
{/* Contenedor con ancho máximo */}
<div className="container-max">
  Contenido
</div>
```

### Transiciones
```tsx
{/* Transición estándar (300ms) */}
<div className="transition-smooth hover:bg-secondary">
  Hover me
</div>

{/* Transición lenta (500ms) */}
<div className="transition-smooth-slow hover:text-secondary">
  Hover me
</div>
```

### Badges
```tsx
{/* Badge primario */}
<div className="badge-primary">
  Contenido
</div>

{/* Badge secundario */}
<div className="badge-secondary">
  Contenido
</div>
```

### Focus Ring
```tsx
{/* Input con focus ring */}
<input className="focus-ring" />

{/* Botón con focus ring */}
<button className="focus-ring">
  Click me
</button>
```

---

## 🎯 Patrón Completo: Sección

```tsx
"use client"

import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"
import { SectionHeader, ServiceCard } from "@/components/ui"
import { Leaf } from "lucide-react"

const services = [
  {
    number: "01",
    title: "Servicio 1",
    description: "Descripción del servicio",
    image: "https://...",
    href: "/servicios/1"
  },
  // ... más servicios
]

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
          {/* Header */}
          <SectionHeader
            icon={Leaf}
            subtitle="Subtítulo"
            title="Título Principal"
            titleHighlight="Destacado"
            description="Descripción de la sección"
          />

          {/* Grid de tarjetas */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.number}
                number={service.number}
                title={service.title}
                description={service.description}
                image={service.image}
                href={service.href}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## 📝 Checklist de Implementación

Cuando implementes nuevos componentes:

- [ ] Importar componentes de `@/components/ui`
- [ ] Importar animaciones de `@/lib/animations`
- [ ] Usar `section-padding` y `container-max`
- [ ] Usar variables CSS (`bg-primary`, `text-secondary`)
- [ ] Agregar `index` prop para animaciones en grids
- [ ] Probar responsive design
- [ ] Verificar accesibilidad

---

## 🔗 Referencias

- **Guía de Estilos**: `.kiro/steering/style-guide.md`
- **Componentes**: `components/ui/`
- **Animaciones**: `lib/animations.ts`
- **Ejemplos en Vivo**: `components/header.tsx`, `components/footer.tsx`, etc.

---

**Última actualización**: Abril 2026
**Versión**: 1.0
