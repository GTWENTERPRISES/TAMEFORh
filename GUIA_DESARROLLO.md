# GUÍA DE DESARROLLO - TAMEFOR

## 🚀 Inicio Rápido

### Instalación
```bash
bun install
```

### Desarrollo Local
```bash
bun run dev
```
Accede a `http://localhost:3000`

### Build Producción
```bash
bun run build
```

### Iniciar Servidor Producción
```bash
bun run start
```

---

## 📁 ESTRUCTURA DEL PROYECTO

```
TAMEFOR/
├── app/
│   ├── page.tsx                 # Página de inicio
│   ├── layout.tsx               # Layout principal
│   ├── globals.css              # Estilos globales
│   ├── [rutas]/
│   │   ├── page.tsx             # Página de ruta
│   │   └── layout.tsx           # Layout de ruta
│   └── [slug]/
│       ├── page.tsx             # Página dinámica
│       └── layout.tsx           # Layout dinámico
├── components/
│   ├── [nombre]-section.tsx     # Componentes de secciones
│   ├── header.tsx               # Navegación
│   ├── footer.tsx               # Pie de página
│   └── ui/                      # Componentes UI
├── lib/
│   ├── coursesData.ts           # Datos de cursos
│   ├── newsData.ts              # Datos de noticias
│   ├── projectsData.ts          # Datos de proyectos
│   └── membersData.ts           # Datos de miembros
└── public/                      # Archivos estáticos
```

---

## 🎨 SISTEMA DE DISEÑO TAMEFOR

### Colores
```css
--primary: #1a3a5c (Navy Blue)
--secondary: #3d9a8b (Teal)
--accent: #d4a853 (Gold)
```

### Tipografía
- **Títulos**: Playfair Display (Serif)
- **Cuerpo**: DM Sans (Sans-serif)
- **Monoespaciado**: Geist Mono

### Componentes Comunes
```tsx
// Botón primario
<Button className="bg-[#1a3a5c] hover:bg-[#0f2a45] text-white rounded-full">
  Texto
</Button>

// Botón secundario
<Button className="bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white rounded-full">
  Texto
</Button>

// Botón acento
<Button className="bg-[#d4a853] hover:bg-[#c49843] text-[#1a3a5c] rounded-full">
  Texto
</Button>

// Sección con gradiente
<section className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
  Contenido
</section>
```

---

## 📝 AGREGAR NUEVAS PÁGINAS

### 1. Crear estructura de carpeta
```bash
mkdir -p app/nueva-pagina
```

### 2. Crear archivos
```tsx
// app/nueva-pagina/layout.tsx
export default function NuevaPaginaLayout({ children }) {
  return children
}

// app/nueva-pagina/page.tsx
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nueva Página | TAMEFOR Los Ríos',
  description: 'Descripción de la página',
}

export default function NuevaPaginaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      {/* Contenido */}
      <Footer />
    </main>
  )
}
```

### 3. Actualizar navegación
Editar `components/header.tsx` y `components/footer.tsx` para agregar el nuevo enlace.

---

## 📊 AGREGAR DATOS

### Agregar Curso
```tsx
// lib/coursesData.ts
export const coursesData: Course[] = [
  {
    id: '2',
    slug: 'nuevo-curso',
    title: 'Título del Curso',
    // ... resto de propiedades
  }
]
```

### Agregar Noticia
```tsx
// lib/newsData.ts
export const newsData: NewsArticle[] = [
  {
    id: '4',
    slug: 'nueva-noticia',
    title: 'Título de la Noticia',
    // ... resto de propiedades
  }
]
```

### Agregar Proyecto
```tsx
// lib/projectsData.ts
export const projectsData: Project[] = [
  {
    id: '5',
    slug: 'nuevo-proyecto',
    title: 'Título del Proyecto',
    // ... resto de propiedades
  }
]
```

---

## 🔗 RUTAS DISPONIBLES

### Páginas Estáticas
- `/` - Inicio
- `/nosotros` - Sobre nosotros
- `/servicios` - Servicios
- `/directiva` - Directiva
- `/cursos` - Cursos
- `/proyectos` - Proyectos
- `/noticias` - Noticias
- `/contacto` - Contacto
- `/miembros` - Miembros
- `/pagos` - Pagos
- `/biblioteca` - Biblioteca
- `/aula-virtual` - Aula virtual
- `/plataforma-interna` - Plataforma interna
- `/bolsa-empleo` - Bolsa de empleo
- `/politica-privacidad` - Política de privacidad
- `/terminos-uso` - Términos de uso

### Páginas Dinámicas
- `/cursos/[slug]` - Detalle de curso
- `/noticias/[slug]` - Detalle de noticia
- `/proyectos/[slug]` - Detalle de proyecto

---

## 🎯 COMPONENTES PRINCIPALES

### Hero Section
```tsx
import { HeroSection } from "@/components/hero-section"

<HeroSection />
```

### Secciones de Contenido
```tsx
import { CoursesSection } from "@/components/courses-section"
import { NewsSection } from "@/components/news-section"
import { ProjectsSection } from "@/components/projects-section"
import { DirectiveSection } from "@/components/directive-section"

<CoursesSection />
<NewsSection />
<ProjectsSection />
<DirectiveSection />
```

### Header y Footer
```tsx
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

<Header />
{/* Contenido */}
<Footer />
```

---

## 🔍 BÚSQUEDA Y FILTROS

### Búsqueda en Biblioteca
- Implementada en `/biblioteca`
- Busca por título y categoría

### Filtros en Bolsa de Empleo
- Filtro por categoría (Sector Público, Privado, Pasantías)
- Filtro por tipo de empleo
- Búsqueda por palabra clave

---

## 📱 RESPONSIVE DESIGN

Todos los componentes son responsive:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Usar clases Tailwind:
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

---

## 🔐 SEGURIDAD

### Validación de Datos
- Usar `zod` para validación de esquemas
- Validar entrada de formularios

### Protección de Rutas
- Implementar autenticación en `/plataforma-interna`
- Usar middleware para rutas protegidas

---

## 🚀 DEPLOYMENT

### Vercel (Recomendado)
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build
EXPOSE 3000
CMD ["bun", "run", "start"]
```

---

## 📚 RECURSOS

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [TypeScript](https://www.typescriptlang.org)

---

## 🐛 TROUBLESHOOTING

### Build falla
```bash
bun run build --verbose
```

### Errores de tipo
```bash
bun run type-check
```

### Limpiar caché
```bash
rm -rf .next
bun run build
```

---

## 📞 SOPORTE

Para preguntas o problemas:
- Email: informacion@tameforlosrios.org
- Teléfono: +593 96 226 5426

---

**Última actualización**: Abril 2026
**Versión**: 1.0.0
