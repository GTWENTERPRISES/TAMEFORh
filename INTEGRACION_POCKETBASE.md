# Integración con PocketBase - TAMEFOR

## 📋 Resumen

Este documento explica cómo se integra PocketBase con el proyecto TAMEFOR, manteniendo los datos actuales como fallback.

## 🗂️ Colecciones Disponibles en PocketBase

### Colecciones Principales
1. **cursos** - Cursos y capacitaciones
2. **noticias** - Artículos y noticias del blog
3. **banner_publicitarios** - Eventos y banners promocionales
4. **proyectos** - Proyectos forestales realizados
5. **Testimonios** - Testimonios de clientes
6. **biblioteca** - Documentos y recursos
7. **equipo_consultor** - Miembros del equipo
8. **empleos** - Ofertas de trabajo

### Colecciones Académicas
9. **estudiantes** - Registro de estudiantes
10. **inscripciones_cursos** - Inscripciones a cursos
11. **asistencias** - Control de asistencias
12. **calificaciones** - Calificaciones de estudiantes
13. **pagos_academicos** - Pagos de cursos

### Colecciones Administrativas
14. **docentes** - Información de instructores
15. **categorias** - Categorías de contenido
16. **miembros** - Membresía y socios
17. **pagos** - Pagos generales
18. **mensajes_contacto** - Mensajes del formulario de contacto
19. **solicitudes_de_informacion** - Solicitudes de información

## 🏗️ Arquitectura

### Estrategia: Datos Locales + API

1. **Datos Locales** (en `lib/coursesData.ts`, `lib/newsData.ts`, etc.):
   - Se mantienen como están
   - Funcionan como fallback si la API falla
   - Carga inmediata sin dependencia de red

2. **Datos de API** (PocketBase):
   - Se cargan adicionalmente
   - Se combinan con datos locales
   - Se eliminan duplicados por `slug`

3. **Prioridad**:
   - Datos locales tienen prioridad (se cargan primero)
   - Datos de API se agregan después
   - Si hay conflicto de slug, prevalece el local

## 📁 Estructura de Archivos

```
lib/
├── pocketbase.ts              # Cliente y helpers de PocketBase
├── api/
│   ├── cursos.ts             # ✅ API de cursos
│   ├── noticias.ts           # ✅ API de noticias
│   ├── proyectos.ts          # ✅ API de proyectos
│   ├── biblioteca.ts         # ✅ API de biblioteca
│   ├── equipo.ts             # ✅ API de equipo consultor
│   ├── inscripciones.ts      # ✅ API de inscripciones a cursos
│   ├── mensajes.ts           # ✅ API de mensajes de contacto
│   ├── pagos.ts              # ✅ API de pagos generales
│   └── solicitudes.ts        # ✅ API de solicitudes de información
├── coursesData.ts            # Datos locales de cursos (existente)
├── newsData.ts               # Datos locales de noticias (existente)
└── [otros]Data.ts            # Otros datos locales
```

## 🔧 Configuración

### 1. Instalar Dependencias

```bash
bun add pocketbase
# o
npm install pocketbase
```

### 2. Configurar Variables de Entorno

Crea `.env.local`:

```env
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
```

Para producción:
```env
NEXT_PUBLIC_POCKETBASE_URL=https://pb.tamefor.com
```

### 3. Iniciar PocketBase

```bash
# En la carpeta de tu proyecto PocketBase
./pocketbase serve
```

## 📊 Esquema de Colecciones Principales

### 1. Cursos (`cursos`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `titulo` | text | Título del curso |
| `subtitulo` | text | Subtítulo descriptivo |
| `descripcion_corta` | text | Descripción breve |
| `descripcion_completa` | text | Descripción completa |
| `categoria` | select | Categoría del curso |
| `duracion` | text | Duración del curso |
| `modalidad` | select | Virtual/Presencial/Híbrido |
| `fecha_inicio` | date | Fecha de inicio |
| `fecha_fin` | date | Fecha de finalización |
| `carga_horaria` | number | Horas totales |
| `nombre_instructor` | text | Nombre del instructor |
| `foto_instructor` | file | Foto del instructor |
| `objetivos` | editor | Objetivos del curso (HTML) |
| `contenido_curso` | editor | Contenido/Syllabus (HTML) |
| `requisitos` | editor | Requisitos (HTML) |
| `beneficios` | editor | Beneficios (HTML) |
| `slug` | text | URL amigable |
| `destacado` | bool | Mostrar como destacado |
| `disponible` | bool | Disponible para inscripción |

### 2. Noticias (`noticias`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `titulo` | text | Título de la noticia |
| `contenido` | editor | Contenido completo (HTML) |
| `extracto` | text | Resumen breve |
| `autor` | text | Autor de la noticia |
| `categoria` | select | Categoría |
| `fecha_publicacion` | date | Fecha de publicación |
| `imagen_destacada` | file | Imagen principal |
| `slug` | text | URL amigable |
| `publicado` | bool | Publicar o mantener borrador |
| `destacado` | bool | Mostrar en destacados |

### 3. Banner Publicitarios (`banner_publicitarios`)
Usado para eventos y campañas
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `titulo` | text | Título del evento |
| `descripcion` | text | Descripción |
| `imagen` | file[] | Imágenes (múltiples) |
| `fecha` | text | Fecha del evento |
| `horarios` | text | Horarios |
| `modalidad` | select | Virtual/Presencial/Híbrido |
| `ubicacion` | text | Ubicación física |
| `plataforma` | text | Plataforma virtual |
| `requisitos` | text | Requisitos |
| `link_de_inscripcion_URL` | url | URL de inscripción |

### 4. Proyectos (`proyectos`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `titulo` | text | Título del proyecto |
| `descripcion` | text | Descripción completa |
| `cliente` | text | Cliente/Empresa |
| `categoria` | select | Tipo de proyecto |
| `fecha_inicio` | date | Inicio del proyecto |
| `fecha_fin` | date | Fin del proyecto |
| `ubicacion` | text | Ubicación |
| `imagenes` | file[] | Galería de imágenes |
| `resultado` | text | Resultados obtenidos |
| `slug` | text | URL amigable |
| `destacado` | bool | Proyecto destacado |

### 5. Testimonios (`Testimonios`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `titulo` | text | Título del testimonio |
| `comentario` | text | Contenido del testimonio |
| `nombre` | text | Nombre de la persona |
| `titulo_academico` | text | Título/Cargo |
| `empresa` | text | Empresa/Organización |
| `foto` | file | Foto de la persona |
| `destacado` | bool | Mostrar en home |
| `orden` | number | Orden de visualización |

### 6. Biblioteca (`biblioteca`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `titulo` | text | Título del documento |
| `autor` | text | Autor |
| `tipo` | select | Libro/Artículo/Tesis/etc. |
| `anio` | text | Año de publicación |
| `descripcion` | text | Descripción |
| `abstract` | text | Resumen académico |
| `palabras_claves` | text | Keywords |
| `numero_paginas` | number | Número de páginas |
| `lenguaje` | select | Español/Inglés |
| `pdf_archivo` | file | Archivo PDF |
| `link_documento` | url | Enlace externo |
| `disponible` | bool | Disponible para descarga |
| `slug` | text | URL amigable |

### 7. Equipo Consultor (`equipo_consultor`)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nombre` | text | Nombre completo |
| `cargo` | text | Cargo/Posición |
| `biografia` | editor | Biografía (HTML) |
| `especialidades` | text | Áreas de especialización |
| `experiencia` | text | Años de experiencia |
| `foto` | file | Foto profesional |
| `email` | email | Email de contacto |
| `linkedin` | url | Perfil de LinkedIn |
| `orden` | number | Orden de visualización |
| `activo` | bool | Miembro activo |

## 🔌 Uso en Componentes

### Ejemplo 1: Cargar Cursos

```tsx
// app/cursos/page.tsx
import { getAllCursos } from '@/lib/api/cursos'

export default async function CursosPage() {
  // Obtener todos los cursos (locales + API)
  const cursos = await getAllCursos()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cursos.map(curso => (
        <CursoCard key={curso.id} curso={curso} />
      ))}
    </div>
  )
}
```

### Ejemplo 2: Cursos Destacados en Home

```tsx
// app/page.tsx
import { getCursosDestacados } from '@/lib/api/cursos'
import { CoursesSection } from '@/components/courses-section'

export default async function HomePage() {
  const cursosDestacados = await getCursosDestacados(3)
  
  return (
    <>
      <HeroSection />
      <CoursesSection cursos={cursosDestacados} />
      {/* ... otros componentes */}
    </>
  )
}
```

### Ejemplo 3: Noticias

```tsx
// app/noticias/page.tsx
import { getAllNoticias } from '@/lib/api/noticias'

export default async function NoticiasPage() {
  const noticias = await getAllNoticias()
  
  return (
    <div className="space-y-8">
      {noticias.map(noticia => (
        <NoticiaCard key={noticia.id} noticia={noticia} />
      ))}
    </div>
  )
}
```

### Ejemplo 4: Página Individual de Curso

```tsx
// app/cursos/[slug]/page.tsx
import { getCursoBySlug, getAllCursos } from '@/lib/api/cursos'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const cursos = await getAllCursos()
  return cursos.map(curso => ({ slug: curso.slug }))
}

export default async function CursoPage({ params }: { params: { slug: string } }) {
  const curso = await getCursoBySlug(params.slug)
  
  if (!curso) notFound()
  
  return <CursoDetailView curso={curso} />
}
```

## 🛡️ Manejo de Errores

### Fallback Automático

Si PocketBase no está disponible o hay un error:

```typescript
try {
  // Intentar obtener de PocketBase
  const pb = getPocketBase()
  const apiData = await pb.collection('cursos').getList()
  const pbCursos = apiData.items.map(mapPBCursoToLocal)
  
  // Combinar con locales
  return [...localData, ...pbCursos]
} catch (error) {
  console.error('Error:', handlePBError(error))
  // Retornar solo datos locales
  return localData
}
```

### Sin Impacto en UX

- ✅ La app funciona perfectamente sin PocketBase
- ✅ Datos locales garantizan contenido siempre disponible
- ✅ Errores se logean pero no afectan al usuario
- ✅ Experiencia transparente para el visitante

## 📝 Mapeo de Datos

### De PocketBase a Formato Local

```typescript
function mapPBCursoToLocal(pbCurso: PBCurso): Course {
  return {
    id: generateIdFromString(pbCurso.id),
    title: pbCurso.titulo,
    subtitle: pbCurso.subtitulo || '',
    shortDescription: pbCurso.descripcion_corta || '',
    fullDescription: pbCurso.descripcion_completa || '',
    category: pbCurso.categoria || 'General',
    duration: pbCurso.duracion || `${pbCurso.horas} horas`,
    modality: pbCurso.modalidad ? [pbCurso.modalidad] : ['Virtual'],
    // Conversión de HTML editor a arrays
    objectives: parseHTMLList(pbCurso.objetivos),
    syllabus: parseHTMLList(pbCurso.contenido_curso),
    requirements: parseHTMLList(pbCurso.requisitos),
    benefits: parseHTMLList(pbCurso.beneficios),
    // Generar URLs de archivos
    instructor: {
      photo: pbCurso.foto_instructor 
        ? getFileUrl(pbCurso.collectionId!, pbCurso.id, pbCurso.foto_instructor)
        : fallbackImage
    },
    // Slug generado si no existe
    slug: pbCurso.slug || generateSlug(pbCurso.titulo),
    featured: pbCurso.destacado || false,
    available: pbCurso.disponible !== false,
  }
}
```

### Helper: Parsear HTML a Lista

```typescript
function parseHTMLList(html: string): string[] {
  if (!html) return []
  
  const items: string[] = []
  // Extraer elementos <li>
  const liMatches = html.match(/<li[^>]*>(.*?)<\/li>/gi)
  
  if (liMatches) {
    liMatches.forEach(match => {
      const text = match.replace(/<[^>]+>/g, '').trim()
      if (text) items.push(text)
    })
  }
  
  return items
}
```

### Helper: Generar Slug

```typescript
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
    .replace(/[^a-z0-9]+/g, '-')      // Reemplazar espacios
    .replace(/^-+|-+$/g, '')          // Trim guiones
}
```

## 🔄 Flujo de Datos

```
Usuario solicita página
         ↓
Componente Server llama API function
         ↓
API function intenta PocketBase
         ↓
    ┌────┴────┐
    ↓         ↓
  Éxito    Error
    ↓         ↓
PB Data   Local Only
    ↓         ↓
    └────┬────┘
         ↓
Combinar datos
         ↓
Eliminar duplicados (por slug)
         ↓
Retornar array unificado
         ↓
Componente renderiza
```

## 🚀 Próximos Pasos

### 1. Implementar APIs Faltantes

```typescript
// lib/api/testimonios.ts
export async function getAllTestimonios()
export async function getTestimoniosDestacados(limit: number)

// lib/api/proyectos.ts  
export async function getAllProyectos()
export async function getProyectoBySlug(slug: string)
export async function getProyectosDestacados(limit: number)

// lib/api/equipo.ts
export async function getAllEquipo()
export async function getMiembroBySlug(slug: string)
```

### 2. Actualizar Componentes Existentes

```tsx
// Antes
const cursos = coursesData

// Después  
const cursos = await getAllCursos()
```

### 3. Configurar PocketBase en Producción

1. Desplegar PocketBase en servidor
2. Configurar dominio (ej: `pb.tamefor.com`)
3. Actualizar `.env.production`
4. Configurar CORS y permisos
5. Hacer backup automático de DB

## ⚙️ Configuración de PocketBase

### Reglas de Acceso Recomendadas

```javascript
// Colección: cursos
// listRule (ver todos)
disponible = true

// viewRule (ver uno)
disponible = true || @request.auth.id != ""

// createRule, updateRule, deleteRule
@request.auth.role = "admin"
```

### Índices Recomendados

```sql
-- Mejorar búsquedas por slug
CREATE INDEX idx_cursos_slug ON cursos(slug);
CREATE INDEX idx_noticias_slug ON noticias(slug);
CREATE INDEX idx_proyectos_slug ON proyectos(slug);

-- Mejorar filtros por destacado
CREATE INDEX idx_cursos_destacado ON cursos(destacado, disponible);
CREATE INDEX idx_noticias_destacado ON noticias(destacado, publicado);
```

## 🔍 Testing

### Test 1: Sin PocketBase
1. Apagar servidor PocketBase
2. Navegar a `/cursos`
3. ✅ Debe mostrar cursos locales
4. ✅ Sin errores visibles

### Test 2: Con PocketBase
1. Iniciar PocketBase
2. Agregar curso nuevo en admin
3. Recargar `/cursos`
4. ✅ Debe mostrar curso nuevo + locales

### Test 3: Duplicados
1. Crear curso en PocketBase con slug existente en local
2. Recargar página
3. ✅ Solo debe aparecer una vez (el local)

## 📚 Referencias

- [PocketBase Docs](https://pocketbase.io/docs/)
- [PocketBase JS SDK](https://github.com/pocketbase/js-sdk)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

## ⚠️ Consideraciones Importantes

### Datos Locales
- ❌ **NO eliminar** archivos `*Data.ts`
- ✅ Mantener actualizados como fallback
- ✅ Usar para desarrollo sin PocketBase

### Slugs Únicos
- Asegurarse que slugs en PocketBase sean únicos
- No duplicar slugs que existen en datos locales
- Prioridad: Local > API

### Performance
- Server Components cargan en servidor
- Sin waterfalls de requests
- Cache de Next.js automático
- Revalidación configurable

### Seguridad
- Validar permisos en PocketBase
- No exponer credenciales admin
- HTTPS en producción
- CORS configurado correctamente

## 🐛 Troubleshooting

### Error: Cannot connect to PocketBase
```typescript
// Verificar URL en .env.local
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090

// Verificar que PocketBase esté corriendo
./pocketbase serve
```

### Error: CORS
```go
// En PocketBase, configurar CORS
app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
    e.Router.Use(apis.ActivityLogger(app))
    e.Router.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"http://localhost:3000"},
    }))
    return nil
})
```

### Imágenes no cargan
```typescript
// Verificar construcción de URL
const imageUrl = getFileUrl(
  record.collectionId,  // ✅ Debe ser string
  record.id,            // ✅ Debe ser string  
  record.foto,          // ✅ Nombre del archivo
  '100x100'             // ⚙️ Opcional: thumbnail
)
```

---

**Versión**: 2.0  
**Fecha**: Enero 2025  
**Última revisión**: Completa  
**Mantenedor**: Equipo TAMEFOR
