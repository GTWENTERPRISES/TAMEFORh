# Guía de SEO - TAMEFOR

## 📋 Tabla de Contenidos

1. [Estructura Implementada](#estructura-implementada)
2. [Metadatos por Página](#metadatos-por-página)
3. [Datos Estructurados JSON-LD](#datos-estructurados-json-ld)
4. [Mejores Prácticas](#mejores-prácticas)
5. [Herramientas de Validación](#herramientas-de-validación)
6. [Siguientes Pasos](#siguientes-pasos)

---

## 🏗️ Estructura Implementada

### Archivos Clave

```
├── app/
│   ├── layout.tsx                    # Metadatos globales + config SEO base
│   ├── sitemap.ts                    # Generación automática de sitemap.xml
│   ├── robots.ts                     # Configuración de robots.txt
│   └── [página]/layout.tsx           # Metadatos específicos por sección
├── lib/
│   ├── seo.ts                        # Utilidades SEO reutilizables
│   └── structuredData.ts             # Schemas JSON-LD
└── components/
    └── StructuredData.tsx            # Componente para inyectar JSON-LD
```

### Características Implementadas

✅ **Metadatos Completos**
- Title templates dinámicos
- Descriptions optimizadas (155-160 caracteres)
- Keywords relevantes por página
- Canonical URLs
- Open Graph tags
- Twitter Cards
- Robots directives

✅ **Datos Estructurados**
- Organization schema
- Website schema
- Breadcrumb schema
- Article schema (blog/noticias)
- Course schema (cursos)
- Service schema (servicios)
- Local Business schema
- FAQ schema

✅ **Optimización Técnica**
- Sitemap.xml automático
- Robots.txt configurado
- URLs canónicas
- Hreflang (preparado para multi-idioma)
- Prevención de contenido duplicado

---

## 📄 Metadatos por Página

### Página Principal (/)
```typescript
title: "TAMEFOR S.A.S B.I.C — Consultoría Forestal y Ambiental en Ecuador"
description: "TAMEFOR S.A.S B.I.C - Consultora forestal y ambiental..."
keywords: [consultoría forestal Ecuador, certificación ISO 14001, ...]
```

### Cursos (/cursos)
```typescript
title: "Cursos y Capacitaciones Forestales | TAMEFOR - Certificación SENECYT"
keywords: [cursos forestales Ecuador, capacitación SENECYT, ...]
```

### Servicios (/servicios)
```typescript
title: "Servicios Forestales y Ambientales | TAMEFOR Ecuador"
keywords: [servicios forestales Ecuador, consultoría ambiental, ...]
```

### Noticias (/noticias)
```typescript
title: "Noticias y Blog Forestal | TAMEFOR Ecuador"
type: "website" (índice) | "article" (individual)
```

### Contacto (/contacto)
```typescript
title: "Contacto | TAMEFOR S.A.S B.I.C"
keywords: [contacto TAMEFOR, cotización consultoría ambiental, ...]
```

---

## 🔖 Datos Estructurados JSON-LD

### Implementación en Páginas

```tsx
import { StructuredData } from "@/components/StructuredData"
import { organizationSchema, courseSchema } from "@/lib/structuredData"

export default function Page() {
  return (
    <>
      <StructuredData data={organizationSchema} />
      {/* Contenido de la página */}
    </>
  )
}
```

### Schemas Disponibles

#### 1. Organization Schema
```typescript
import { organizationSchema } from "@/lib/structuredData"
// Usar en: Home, Nosotros, Footer
```

#### 2. Course Schema
```typescript
import { courseSchema } from "@/lib/structuredData"

const cursoData = courseSchema({
  name: "Gestión Forestal Sostenible",
  description: "Curso certificado por SENECYT...",
  provider: "TAMEFOR",
  url: "/cursos/gestion-forestal",
  price: 250,
  currency: "USD",
  duration: "P4W" // ISO 8601 duration
})
// Usar en: Páginas individuales de cursos
```

#### 3. Article Schema
```typescript
import { articleSchema } from "@/lib/structuredData"

const noticiaData = articleSchema({
  title: "Nueva normativa forestal en Ecuador",
  description: "Análisis de las nuevas regulaciones...",
  url: "/noticias/nueva-normativa-forestal",
  image: "/images/noticia.jpg",
  datePublished: "2024-01-15",
  dateModified: "2024-01-20"
})
// Usar en: Blog posts y noticias individuales
```

#### 4. Service Schema
```typescript
import { serviceSchema } from "@/lib/structuredData"

const servicioData = serviceSchema({
  name: "Certificación ISO 14001",
  description: "Implementación y certificación...",
  url: "/servicios/certificacion-iso-14001",
  serviceType: "Consultoría Ambiental",
  areaServed: "Ecuador"
})
// Usar en: Páginas de servicios específicos
```

#### 5. Breadcrumb Schema
```typescript
import { breadcrumbSchema } from "@/lib/structuredData"

const breadcrumbs = breadcrumbSchema([
  { name: "Inicio", url: "/" },
  { name: "Servicios", url: "/servicios" },
  { name: "Gestión Forestal", url: "/servicios/gestion-forestal" }
])
// Usar en: Todas las páginas internas
```

---

## 🎯 Mejores Prácticas

### 1. Títulos (Title Tags)

**✅ CORRECTO:**
```typescript
title: "Cursos Forestales Certificados SENECYT | TAMEFOR Ecuador"
// 55-60 caracteres, keyword principal al inicio, marca al final
```

**❌ INCORRECTO:**
```typescript
title: "TAMEFOR - Empresa de consultoría que ofrece cursos varios"
// Demasiado genérico, sin keywords claras
```

### 2. Descripciones (Meta Descriptions)

**✅ CORRECTO:**
```typescript
description: "Capacitaciones profesionales en gestión forestal certificadas por SENECYT. Cursos presenciales y virtuales con expertos del sector forestal ecuatoriano."
// 155 caracteres, call-to-action implícito, keywords relevantes
```

**❌ INCORRECTO:**
```typescript
description: "Cursos"
// Muy corta, no informativa
```

### 3. Keywords

**Estrategia:**
- 5-10 keywords principales por página
- Mezcla de keywords generales y long-tail
- Incluir variaciones locales (Ecuador, Quito)
- No repetir exactamente las mismas en todas las páginas

**Ejemplo:**
```typescript
keywords: [
  "cursos forestales Ecuador",           // General + Local
  "capacitación forestal certificada",   // Long-tail
  "cursos SENECYT",                      // Específico
  "formación ambiental Ecuador",         // Variación
]
```

### 4. URLs Canónicas

**Siempre especificar:**
```typescript
alternates: {
  canonical: "/cursos" // URL limpia, sin parámetros
}
```

### 5. Open Graph Images

**Requisitos:**
- Dimensiones: 1200x630px
- Formato: JPG o PNG
- Peso: < 1MB
- Texto legible en previews pequeñas

```typescript
openGraph: {
  images: [
    {
      url: "/og-image-cursos.jpg",
      width: 1200,
      height: 630,
      alt: "Cursos Forestales TAMEFOR"
    }
  ]
}
```

---

## 🛠️ Herramientas de Validación

### 1. Google Search Console
```
https://search.google.com/search-console
```
- Enviar sitemap.xml
- Monitorear indexación
- Revisar errores de rastreo
- Analizar rendimiento de búsqueda

### 2. Schema Markup Validator
```
https://validator.schema.org/
```
- Validar JSON-LD
- Verificar sintaxis de schemas
- Probar datos estructurados

### 3. Rich Results Test
```
https://search.google.com/test/rich-results
```
- Verificar rich snippets
- Testear resultados enriquecidos

### 4. Meta Tags Checker
```
https://metatags.io/
```
- Preview de Open Graph
- Preview de Twitter Cards
- Validación de metadatos

### 5. PageSpeed Insights
```
https://pagespeed.web.dev/
```
- Core Web Vitals
- Performance SEO
- Mobile-friendliness

---

## 🚀 Siguientes Pasos

### Inmediatos

1. **Configurar Google Search Console**
   - Verificar propiedad del sitio
   - Enviar sitemap: `https://tamefor.com/sitemap.xml`
   - Configurar Google Analytics

2. **Reemplazar Placeholders**
   ```typescript
   // En app/layout.tsx
   verification: {
     google: 'CÓDIGO_REAL_AQUÍ'
   }
   
   // En lib/structuredData.ts
   telephone: "+593-XXX-XXXX" // Número real
   address: "Dirección completa" // Dirección real
   ```

3. **Crear Imágenes OG**
   - `/public/og-image.jpg` (principal)
   - `/public/og-image-cursos.jpg`
   - `/public/og-image-servicios.jpg`
   - etc.

### Corto Plazo (1-2 semanas)

4. **Implementar Datos Estructurados en Páginas Dinámicas**
   ```typescript
   // En app/cursos/[slug]/page.tsx
   export default async function CursoPage({ params }) {
     const curso = await getCurso(params.slug)
     
     return (
       <>
         <StructuredData data={courseSchema({
           name: curso.name,
           description: curso.description,
           // ... resto de datos
         })} />
         {/* Contenido */}
       </>
     )
   }
   ```

5. **Generar Sitemap Dinámico**
   - Incluir cursos desde base de datos
   - Incluir noticias con fechas de modificación
   - Incluir proyectos

6. **Optimizar Imágenes**
   - Comprimir todas las imágenes
   - Usar Next.js Image component
   - Agregar alt text descriptivos

### Mediano Plazo (1 mes)

7. **Content Marketing**
   - Publicar 2-4 artículos de blog por mes
   - Optimizar cada artículo para long-tail keywords
   - Agregar artículos relacionados (internal linking)

8. **Link Building**
   - Directorios de empresas Ecuador
   - Asociaciones forestales
   - Universidades y centros educativos
   - Medios ambientales

9. **Local SEO**
   - Google Business Profile
   - Mapas y ubicación
   - Reseñas de clientes

### Largo Plazo (3-6 meses)

10. **Expansión Multi-idioma**
    - Inglés para clientes internacionales
    - Implementar hreflang tags

11. **Monitoreo y Ajustes**
    - Analizar keywords que generan tráfico
    - Actualizar contenido antiguo
    - Ajustar estrategia basada en datos

---

## 📊 KPIs a Monitorear

### Métricas Técnicas
- [ ] Indexación: 90%+ de páginas indexadas
- [ ] Core Web Vitals: Verde en todas las métricas
- [ ] Errores de rastreo: 0
- [ ] Cobertura mobile: 100%

### Métricas de Negocio
- [ ] Tráfico orgánico: +50% en 6 meses
- [ ] Posiciones keywords principales: Top 10
- [ ] CTR en SERPs: >3%
- [ ] Conversiones desde búsqueda orgánica

### Métricas de Contenido
- [ ] Páginas con rich snippets: 70%+
- [ ] Bounce rate: <60%
- [ ] Tiempo promedio en página: >2min

---

## 🔗 Referencias

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Moz SEO Guide](https://moz.com/beginners-guide-to-seo)
- [Ahrefs SEO Checklist](https://ahrefs.com/seo)

---

**Última actualización:** Enero 2025  
**Versión:** 1.0  
**Mantenedor:** Equipo TAMEFOR
