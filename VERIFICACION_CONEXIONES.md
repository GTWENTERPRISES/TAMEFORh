# 🔌 Verificación y Conexión de APIs con Componentes

## Estado de Conexiones

### APIs Creadas (10 total)

| # | API | Archivo | Estado |
|---|-----|---------|--------|
| 1 | Cursos | `lib/api/cursos.ts` | ✅ Creada |
| 2 | Noticias | `lib/api/noticias.ts` | ✅ Creada |
| 3 | Proyectos | `lib/api/proyectos.ts` | ✅ Creada |
| 4 | Biblioteca | `lib/api/biblioteca.ts` | ✅ Creada |
| 5 | Equipo | `lib/api/equipo.ts` | ✅ Creada |
| 6 | Testimonios | `lib/api/testimonios.ts` | ✅ Creada |
| 7 | Inscripciones | `lib/api/inscripciones.ts` | ✅ Creada |
| 8 | Mensajes | `lib/api/mensajes.ts` | ✅ Creada |
| 9 | Pagos | `lib/api/pagos.ts` | ✅ Creada |
| 10 | Solicitudes | `lib/api/solicitudes.ts` | ✅ Creada |

---

## Componentes que Consumen APIs

### ✅ 1. Testimonios
**Componente:** `components/testimonials-section.tsx`
**Estado:** CONECTADO
**API:** `getAllTestimonios()`
```typescript
import { getAllTestimonios } from "@/lib/api/testimonios"
const testimonios = await getAllTestimonios()
```

### ✅ 2. Equipo (Página dedicada)
**Componente:** `components/pages/EquipoPageClient.tsx`
**Estado:** CONECTADO
**API:** `getAllEquipo()`
```typescript
import { getAllEquipo } from "@/lib/api/equipo"
const equipo = await getAllEquipo()
```

### ✅ 3. Equipo (Página inicio)
**Componente:** `components/directive-section.tsx`
**Estado:** USA DATOS LOCALES (3 miembros hardcodeados)
**Acción:** Mantener así - muestra solo 3 miembros principales

### 📝 4. Cursos (Home)
**Componente:** `components/courses-section.tsx`
**Estado:** PENDIENTE CONEXIÓN
**API a usar:** `getCursosDestacados(3)`

### 📝 5. Noticias/Blog (Home)
**Componente:** `components/blog-section.tsx`
**Estado:** PENDIENTE CONEXIÓN
**API a usar:** `getLatestNoticias(3)`

### 📝 6. Cursos (Página)
**Componente:** `app/cursos/page.tsx`
**Estado:** PENDIENTE CONEXIÓN
**API a usar:** `getAllCursos()`

### 📝 7. Noticias (Página)
**Componente:** `app/noticias/page.tsx`
**Estado:** PENDIENTE CONEXIÓN
**API a usar:** `getAllNoticias()`

### 📝 8. Proyectos (Página)
**Componente:** `app/proyectos/page.tsx`
**Estado:** PENDIENTE CONEXIÓN
**API a usar:** `getAllProyectos()`

### 📝 9. Biblioteca (Página)
**Componente:** `app/biblioteca/page.tsx`
**Estado:** PENDIENTE CONEXIÓN
**API a usar:** `getAllDocumentos()`

---

## Formularios que Deben Conectarse a APIs

### ✅ 1. Contacto
**Componente:** `components/contact-section.tsx`
**Estado:** VALIDACIÓN APLICADA, PENDIENTE CONEXIÓN API
**API a usar:** `createMensajeContacto()` de `lib/api/mensajes.ts`

### 📝 2. Newsletter
**Componente:** `components/newsletter-section.tsx`
**Estado:** PENDIENTE VALIDACIÓN Y CONEXIÓN
**API a usar:** Ninguna específica (puede usar mensajes)

### 📝 3. Consultoría
**Componente:** `components/ServiceConsultationModal.tsx`
**Estado:** PENDIENTE VALIDACIÓN Y CONEXIÓN
**API a usar:** `createSolicitudInformacion()` de `lib/api/solicitudes.ts`

### 📝 4. Pagos
**Componente:** `components/pages/PagosPageClient.tsx`
**Estado:** PENDIENTE VALIDACIÓN Y CONEXIÓN
**API a usar:** `createPago()` de `lib/api/pagos.ts`

### 📝 5. Login
**Componente:** `components/LoginFormModal.tsx`
**Estado:** PENDIENTE VALIDACIÓN Y CONEXIÓN
**API a usar:** Sistema propio de auth (no PocketBase)

### 📝 6. Donaciones
**Componente:** `components/donate-section.tsx`
**Estado:** PENDIENTE VALIDACIÓN Y CONEXIÓN
**API a usar:** Puede usar `createPago()` con tipo "donación"

### 📝 7. Alertas de Empleo
**Componente:** `components/JobAlertsForm.tsx`
**Estado:** PENDIENTE VALIDACIÓN Y CONEXIÓN
**API a usar:** Puede usar `createMensajeContacto()` o nueva API

---

## Plan de Acción

### Prioridad Alta - Componentes de Visualización

1. **Cursos Section (Home)**
   - Actualizar para usar `getCursosDestacados(3)`
   - Mostrar 3 cursos destacados

2. **Blog Section (Home)**
   - Actualizar para usar `getLatestNoticias(3)`
   - Mostrar 3 noticias recientes

3. **Páginas de Listado**
   - Cursos: usar `getAllCursos()`
   - Noticias: usar `getAllNoticias()`
   - Proyectos: usar `getAllProyectos()`
   - Biblioteca: usar `getAllDocumentos()`

### Prioridad Media - Formularios Principales

4. **Formulario de Contacto**
   - Conectar a `createMensajeContacto()`
   - Ya tiene validación aplicada

5. **Modal de Consultoría**
   - Conectar a `createSolicitudInformacion()`
   - Aplicar validación

6. **Formulario de Pagos**
   - Conectar a `createPago()`
   - Aplicar validación

### Prioridad Baja - Formularios Secundarios

7. **Newsletter**
   - Decidir estrategia de almacenamiento
   - Aplicar validación

8. **Job Alerts**
   - Decidir estrategia de almacenamiento
   - Aplicar validación

---

## Código de Implementación

### Para Componentes de Visualización

#### Cursos Section
```typescript
// components/courses-section.tsx
import { getCursosDestacados } from '@/lib/api/cursos'

export async function CoursesSection() {
  const cursos = await getCursosDestacados(3)
  
  return (
    // Renderizar cursos
  )
}
```

#### Blog Section
```typescript
// components/blog-section.tsx
import { getLatestNoticias } from '@/lib/api/noticias'

export async function BlogSection() {
  const noticias = await getLatestNoticias(3)
  
  return (
    // Renderizar noticias
  )
}
```

### Para Formularios

#### Formulario de Contacto
```typescript
// components/contact-section.tsx
import { createMensajeContacto } from '@/lib/api/mensajes'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Validar
  const validation = validateForm(formData, validationSchemas.contacto)
  if (!validation.isValid) {
    setErrors(validation.errors)
    return
  }
  
  // Enviar a API
  setIsSubmitting(true)
  const mensaje = await createMensajeContacto({
    nombre: formData.nombre,
    email: formData.email,
    telefono: formData.telefono,
    asunto: formData.asunto,
    mensaje: formData.mensaje,
  })
  
  if (mensaje) {
    setShowSuccess(true)
    resetForm()
  } else {
    setErrors([{ field: 'general', message: 'Error al enviar el mensaje' }])
  }
  setIsSubmitting(false)
}
```

#### Modal de Consultoría
```typescript
// components/ServiceConsultationModal.tsx
import { createSolicitudInformacion } from '@/lib/api/solicitudes'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Validar
  const validation = validateForm(formData, validationSchemas.consultoria)
  if (!validation.isValid) {
    setErrors(validation.errors)
    return
  }
  
  // Enviar a API
  const solicitud = await createSolicitudInformacion({
    nombre: formData.nombre,
    email: formData.email,
    empresa: formData.empresa,
    telefono: formData.telefono,
    tipoSolicitud: 'Consultoría de Servicios',
    mensaje: formData.mensaje,
  })
  
  if (solicitud) {
    setSubmitted(true)
  }
}
```

#### Formulario de Pagos
```typescript
// components/pages/PagosPageClient.tsx
import { createPago } from '@/lib/api/pagos'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Validar
  const validation = validateForm(formData, validationSchemas.pago)
  if (!validation.isValid) {
    setErrors(validation.errors)
    return
  }
  
  // Enviar a API
  const pago = await createPago({
    concepto: formData.concepto,
    descripcion: formData.descripcion,
    monto: parseFloat(formData.monto),
    metodoPago: formData.metodoPago as any,
    nombrePagador: `${formData.nombres} ${formData.apellidos}`,
    emailPagador: formData.email,
    telefonoPagador: formData.telefono,
    referencia: formData.referencia,
  })
  
  if (pago) {
    setPaymentSuccess(true)
  }
}
```

---

## Checklist de Implementación

### Componentes de Visualización
- [ ] `components/courses-section.tsx` → `getCursosDestacados()`
- [ ] `components/blog-section.tsx` → `getLatestNoticias()`
- [ ] `app/cursos/page.tsx` → `getAllCursos()`
- [ ] `app/noticias/page.tsx` → `getAllNoticias()`
- [ ] `app/proyectos/page.tsx` → `getAllProyectos()`
- [ ] `app/biblioteca/page.tsx` → `getAllDocumentos()`

### Formularios + APIs
- [x] `components/contact-section.tsx` → Validación aplicada
- [ ] `components/contact-section.tsx` → `createMensajeContacto()`
- [ ] `components/ServiceConsultationModal.tsx` → Validación + `createSolicitudInformacion()`
- [ ] `components/pages/PagosPageClient.tsx` → Validación + `createPago()`
- [ ] `components/newsletter-section.tsx` → Validación + estrategia de guardado
- [ ] `components/JobAlertsForm.tsx` → Validación + estrategia de guardado
- [ ] `components/donate-section.tsx` → Validación + `createPago()`

---

**Fecha:** Enero 2025  
**Estado:** 3/17 completados  
**Progreso:** 18%
