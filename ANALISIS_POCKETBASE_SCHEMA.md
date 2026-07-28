# Análisis del Esquema PocketBase para TAMEFOR

## Resumen Ejecutivo

Este documento analiza las colecciones del esquema PocketBase (`pb_schema.json`) comparándolas con las necesidades reales de la página web de TAMEFOR S.A.S B.I.C.

---

## 📊 Colecciones Actuales en el Schema

1. **Testimonios** ✅ NECESARIA
2. **asistencias** ❌ SOBRA (solo para plataforma interna)
3. **banner_publicitarios** ⚠️ PUEDE ELIMINARSE (ya manejado por CampaignsSection)
4. **biblioteca** ✅ NECESARIA
5. **calificaciones** ❌ SOBRA (solo para plataforma interna)
6. **categorias** ⚠️ REDUNDANTE (categorías están hardcodeadas en el código)
7. **cursos** ✅ NECESARIA (requiere ajustes)
8. **directiva** ❌ RENOMBRAR a "equipo_consultor"
9. **docentes** ❌ SOBRA (no se usa en el sitio público)
10. **estudiantes** ❌ SOBRA (solo para plataforma interna)
11. **inscripciones_cursos** ✅ YA EXISTE (requiere ajustes)
12. **mensajes_contacto** ✅ YA EXISTE (está bien)
13. **miembros** ⚠️ PUEDE ELIMINARSE (no aplica para consultoría)
14. **noticias** ✅ YA EXISTE (requiere ajustes menores)
15. **pagos** ✅ YA EXISTE (requiere ajustes)
16. **proyectos** ❌ FALTA
17. **servicios** ❌ FALTA

---

## 🔴 COLECCIONES QUE SOBRAN (Para eliminar o mover a BD interna)

### 1. **asistencias**
- **Razón**: Esta es funcionalidad de la plataforma interna de estudiantes
- **Recomendación**: Eliminar del sitio público o mover a base de datos separada

### 2. **calificaciones**
- **Razón**: Información privada de estudiantes, no debe estar en API pública
- **Recomendación**: Eliminar del sitio público

### 3. **docentes**
- **Razón**: No se usa en el sitio web público, solo en plataforma interna
- **Recomendación**: Eliminar del sitio público

### 4. **estudiantes**
- **Razón**: Información privada de estudiantes, no debe estar en API pública
- **Recomendación**: Eliminar del sitio público (solo para plataforma interna)

### 5. **banner_publicitarios**
- **Razón**: El componente `CampaignsSection` ya maneja banners dinámicamente
- **Recomendación**: **PUEDE ELIMINARSE**, o mantener solo si quieren gestionar múltiples campañas desde admin

### 6. **miembros**
- **Razón**: TAMEFOR S.A.S B.I.C es una consultoría, NO un colegio profesional con membresías
- **Recomendación**: **ELIMINAR** - esta colección era para el modelo anterior de colegio de ingenieros

---

## 🟡 COLECCIONES QUE REQUIEREN CAMBIOS

### 1. **categorias**
- **Problema**: Las categorías ya están definidas en el código como tipos fijos
- **Recomendación**: 
  - **OPCIÓN A**: Eliminar (categorías hardcodeadas en `coursesData.ts`)
  - **OPCIÓN B**: Mantener si quieren flexibilidad para agregar categorías dinámicamente

### 2. **directiva** → Renombrar a **equipo_consultor**
- **Problema**: La página usa "Equipo Consultor", no "Directiva"
- **Cambios necesarios**:
  - Renombrar colección a `equipo_consultor`
  - Eliminar campo `cargo` con valores de directiva
  - Agregar campo `cargo` con valores: `MSc. Sistemas de Gestión Ambiental`, `Ing. Comercio Exterior`, `Ing. Forestal`, `PhD. Diversidad y Mejoramiento de Plantas`, etc.
  - Agregar campo `especialidad` (text)
  - Agregar campo `orden` (number) para ordenar consultores

---

## 🟢 COLECCIONES NECESARIAS - AJUSTES REQUERIDOS

### 1. **cursos** ✅ (NECESITA AJUSTES)

**Campos que FALTAN:**
```
✗ slug (text, unique, required) - para URLs amigables
✗ codigo_area (text) - ej: "A", "I"
✗ codigo_especialidad (text) - ej: "A.1", "I.2"
✗ area (text) - ej: "Administración y Legislación"
✗ carga_horaria (number) - horas totales
✗ tipo_participante (text) - "Adultos"
✗ numero_niveles (number) - 1 o 3
✗ destacado (bool) - para featured courses
✗ disponible (bool) - para cursos activos
✗ imagen_destacada (file) - imagen principal del curso
```

**Campos que SOBRAN:**
```
✗ etiqueta - redundante con categoria
✗ sesiones - ya está en "horas"
✗ tipo_validez - ya está implícito en certificacion
```

**Campos a MODIFICAR:**
```
• categoria - actualizar valores a:
  - SIG (mantener)
  - Biometría (mantener)
  - Suelos (agregar)
  - Riego (agregar)
  - Sanidad (agregar)
  - Agroquímicos (agregar)
  - Gestión (mantener)

• institucion_certificacion - simplificar a:
  - SENECYT - Ministerio del Trabajo

• precio - REESTRUCTURAR completamente:
  Eliminar todos los precios diferenciados (estudiante, miembro, etc.)
  Agregar solo:
    - precio_base_nivel (number) = $125
    - numero_niveles (number) = 1 o 3
    - precio_total (number) = calculado (125 * niveles, o 300 si 3 niveles con descuento)
```

---

### 2. **biblioteca** ✅ (ESTÁ BIEN, pequeños ajustes)

**Campos que FALTAN:**
```
✗ disponible (bool) - para activar/desactivar documentos
✗ slug (text, unique) - para URLs amigables
```

**Campos OK:**
- titulo ✓
- autor ✓
- tipo ✓
- anio ✓
- descripcion ✓
- abstract ✓
- palabras_claves ✓
- numero_paginas ✓
- lenguaje ✓
- fecha_publicacion ✓
- institucion ✓
- link_documento ✓
- pdf_archivo ✓

---

### 3. **Testimonios** ✅ (ESTÁ BIEN)

**Campos OK:**
- nombre ✓
- titulo (debería ser titulo_academico) ✓
- comentario ✓
- foto ✓

**Campo que FALTA:**
```
✗ empresa (text) - empresa u organización del testimonio
✗ destacado (bool) - para featured testimonials
✗ orden (number) - para ordenar testimonios
```

---

### 4. **noticias** ✅ YA EXISTE (NECESITA AJUSTES MENORES)

**Campos ACTUALES:**
- id ✓
- etiqueta ✓
- titulo ✓
- extracto ✓
- contenido ✓
- categoria (valores: Normativas, Eventos, Actividades) ✓
- nombre_autor ✓
- imagen ✓
- etiquetas ✓
- fecha_publicacion (autodate) ✓

**Campos que FALTAN:**
```
✗ slug (text, unique, required) - para URLs amigables (ej: /noticias/sistemas-gestion-ambiental)
✗ subtitulo (text, optional) - subtítulo de la noticia
✗ autor_rol (text) - cargo del autor
✗ autor_foto (file, optional) - foto del autor
✗ destacado (bool) - para featured news
✗ publicado (bool) - para control de publicación
```

**Campos a MODIFICAR:**
```
• categoria - ACTUALIZAR valores a:
  - eventos
  - capacitacion
  - proyectos
  - reconocimientos
  - normativas

• imagen - debería ser "imagen_destacada" y maxSelect=1 (no 99)
• etiquetas - debería ser array/json en lugar de text
```

---

### 5. **inscripciones_cursos** ✅ YA EXISTE (NECESITA AJUSTES IMPORTANTES)

**Campos ACTUALES:**
- id ✓
- nombre_completo ✓
- correo ✓
- telefono ✓
- profesion_ocupacion ✓
- instituto_empresa ✓
- numero_registro_oficial ✓
- curso (text) ❌ debería ser relación
- motivacion ✓
- cumplimiento_requisitos ✓
- cantidad_pagar (text) ❌ debería ser number
- precios (select con valores obsoletos) ❌
- tipo_pago (select: Total/Nivel) ✓
- numero_comprobante ✓
- archivo_comprobante ✓

**Campos que FALTAN:**
```
✗ numero_cedula (text, required) - cédula del estudiante
✗ niveles_seleccionados (json, array) - qué niveles seleccionó [1,2,3]
✗ monto_subtotal (number) - antes del descuento
✗ monto_descuento (number) - descuento aplicado
✗ monto_total (number) - total a pagar
✗ estado (select: pendiente, aprobado, rechazado)
✗ fecha_registro (autodate)
✗ observaciones (text)
```

**Campos a MODIFICAR:**
```
• curso - cambiar de text a relation con colección cursos
• cantidad_pagar - cambiar de text a number
• precios - ELIMINAR (ya no hay precios diferenciados, solo $125/nivel)
• tipo_pago - ELIMINAR (ahora es por niveles seleccionados)
```

---

### 6. **pagos** ✅ YA EXISTE (NECESITA AJUSTES IMPORTANTES)

**Campos ACTUALES:**
- id ✓
- concepto_pago ✓
- valor_total (text) ❌ debería ser number
- nombres_apellidos ✓
- (campos adicionales no vistos completamente)

**Campos que FALTAN:**
```
✗ inscripcion_id (relation: inscripciones_cursos) - relación con la inscripción
✗ numero_cedula (text, required) - para buscar pagos
✗ email (email, required)
✗ monto (number, required) - cantidad pagada
✗ comprobante (file, required) - imagen del comprobante
✗ numero_comprobante (text) - número del voucher
✗ metodo_pago (select: produbanco) - banco utilizado
✗ estado (select: pendiente, verificado, rechazado)
✗ fecha_pago (date)
✗ fecha_verificacion (date, optional)
✗ verificado_por (text, optional) - admin que verificó
✗ observaciones (text)
```

**Campos a MODIFICAR:**
```
• valor_total - cambiar de text a number y renombrar a "monto"
```

---

### 7. **mensajes_contacto** ✅ YA EXISTE (ESTÁ BIEN)

**Campos ACTUALES:**
- id ✓
- nombres ✓
- correo ✓
- telefono ✓
- asunto (select: Membresía, Certificación, Servicios, Eventos, Otro) ⚠️
- mensaje ✓

**Campos a MODIFICAR:**
```
• asunto - ACTUALIZAR valores a:
  - Servicios de Consultoría
  - Capacitaciones
  - Peritajes Judiciales
  - Proyectos Ambientales
  - Otro
  
  ELIMINAR "Membresía" (ya no aplica para consultoría)
```

**Campos que FALTAN (opcionales):**
```
✗ fecha_registro (autodate) - cuándo se envió el mensaje
✗ estado (select: nuevo, leido, respondido) - para gestión interna
```

---

## 🔴 COLECCIONES QUE FALTAN (Necesarias para el sitio)

### 1. **noticias** ❌ FALTA

```json
{
  "name": "noticias",
  "fields": [
    "id (text, auto)",
    "slug (text, unique, required)",
    "titulo (text, required)",
    "subtitulo (text, optional)",
    "extracto (text, required)",
    "contenido (editor, required)",
    "categoria (select: eventos, capacitacion, proyectos, reconocimientos, normativas)",
    "fecha_publicacion (date, required)",
    "autor_nombre (text, required)",
    "autor_rol (text, required)",
    "autor_foto (file, optional)",
    "imagen_destacada (file, required)",
    "galeria (file, multiple, optional)",
    "tags (text, array)",
    "destacado (bool)",
    "publicado (bool)"
  ]
}
```

### 2. **proyectos** ❌ FALTA

```json
{
  "name": "proyectos",
  "fields": [
    "id (text, auto)",
    "slug (text, unique, required)",
    "numero (text) - ej: '01', '02'",
    "titulo (text, required)",
    "descripcion (editor, required)",
    "objetivos (editor, array)",
    "actividades (editor, array)",
    "resultados (editor, array)",
    "ubicacion (text, required)",
    "fecha_inicio (date, required)",
    "fecha_fin (date, optional)",
    "estado (select: en_progreso, completado, planificado)",
    "beneficiarios (text)",
    "presupuesto (number, optional)",
    "coordinador_nombre (text, required)",
    "coordinador_email (email, required)",
    "coordinador_telefono (text)",
    "socios (text, array)",
    "imagen_principal (file, required)",
    "galeria (file, multiple, optional)",
    "destacado (bool)",
    "publicado (bool)"
  ]
}
```

### 3. **servicios** ❌ FALTA

```json
{
  "name": "servicios",
  "fields": [
    "id (text, auto)",
    "slug (text, unique, required)",
    "numero (text) - ej: '01', '02', '03', '04'",
    "titulo (text, required)",
    "descripcion (text, required)",
    "descripcion_detallada (editor, required)",
    "items (json, array) - sub-servicios",
    "icono (text) - nombre del ícono lucide",
    "imagen (file, required)",
    "orden (number)",
    "activo (bool)"
  ]
}
```

### 4. **inscripciones** ❌ FALTA

```json
{
  "name": "inscripciones",
  "fields": [
    "id (text, auto)",
    "numero_cedula (text, required)",
    "email (email, required)",
    "curso_id (relation: cursos)",
    "niveles_seleccionados (json, array)",
    "monto_subtotal (number)",
    "monto_descuento (number)",
    "monto_total (number)",
    "comprobante_pago (file, required)",
    "numero_comprobante (text)",
    "estado (select: pendiente, aprobado, rechazado)",
    "fecha_registro (autodate)",
    "observaciones (text)"
  ]
}
```

### 5. **pagos** ❌ FALTA

```json
{
  "name": "pagos",
  "fields": [
    "id (text, auto)",
    "inscripcion_id (relation: inscripciones)",
    "numero_cedula (text, required)",
    "email (email, required)",
    "monto (number, required)",
    "comprobante (file, required)",
    "numero_comprobante (text)",
    "metodo_pago (select: produbanco)",
    "estado (select: pendiente, verificado, rechazado)",
    "fecha_pago (date)",
    "fecha_verificacion (date, optional)",
    "verificado_por (text, optional)",
    "observaciones (text)"
  ]
}
```

### 6. **equipo_trabajo** ❌ FALTA (si lo necesitan para página de Equipo)

```json
{
  "name": "equipo_trabajo",
  "fields": [
    "id (text, auto)",
    "nombre (text, required)",
    "cargo (text, required)",
    "foto (file, required)",
    "bio (text, optional)",
    "email (email, optional)",
    "linkedin (url, optional)",
    "orden (number)",
    "activo (bool)"
  ]
}
```

---

## 📋 RESUMEN DE ACCIONES RECOMENDADAS

### ❌ ELIMINAR (5 colecciones)
1. `asistencias` - Plataforma interna
2. `calificaciones` - Plataforma interna
3. `docentes` - No se usa en público
4. `banner_publicitarios` - Ya manejado en código (opcional mantener)
5. `categorias` - Categorías hardcodeadas (opcional mantener)

### ✏️ RENOMBRAR/MODIFICAR (1 colección)
1. `directiva` → `equipo_consultor` (con ajustes de campos)

### ➕ AGREGAR (5-6 colecciones nuevas)
1. `noticias` - **CRÍTICO**
2. `proyectos` - **CRÍTICO**
3. `servicios` - **CRÍTICO**
4. `inscripciones` - **CRÍTICO**
5. `pagos` - **CRÍTICO**
6. `equipo_trabajo` - Opcional

### 🔧 AJUSTAR CAMPOS (3 colecciones)
1. `cursos` - Agregar 10+ campos faltantes
2. `Testimonios` - Agregar 3 campos opcionales
3. `biblioteca` - Agregar 1 campo

---

## 🎯 PRIORIDADES DE IMPLEMENTACIÓN

### FASE 1 - CRÍTICO (Sitio público)
1. Ajustar colección `cursos` con campos faltantes
2. Crear colección `noticias`
3. Crear colección `proyectos`
4. Crear colección `servicios`
5. Renombrar `directiva` a `equipo_consultor`

### FASE 2 - IMPORTANTE (Funcionalidad de inscripción)
1. Crear colección `inscripciones`
2. Crear colección `pagos`

### FASE 3 - OPCIONAL (Mejoras)
1. Ajustar `Testimonios` con campos adicionales
2. Ajustar `biblioteca` con campo disponible
3. Crear `equipo_trabajo` si lo necesitan
4. Decidir si mantener `categorias` y `banner_publicitarios`

---

## 📝 NOTAS FINALES

### Sobre Plataforma Interna
Las colecciones de plataforma interna (`asistencias`, `calificaciones`, `docentes`, `estudiantes`) deberían estar en una base de datos separada o en colecciones con permisos restrictivos que no sean accesibles desde la API pública.

### Sobre Seguridad
Asegúrense de configurar correctamente las reglas de acceso (`listRule`, `viewRule`, etc.) para cada colección:
- **Público**: noticias, proyectos, servicios, cursos, biblioteca, testimonios, equipo_consultor
- **Autenticado**: inscripciones (solo propias), pagos (solo propios)
- **Admin**: todo

### Sobre Campos JSON
Varios campos que actualmente son `text` o `editor` deberían ser `json` para estructuras complejas:
- `cursos.contenido_curso` → debería ser JSON array de módulos
- `cursos.objetivos` → debería ser JSON array
- `servicios.items` → debería ser JSON array

---

**Fecha de Análisis**: Enero 2025  
**Versión del Schema**: pb_schema.json actual  
**Página Web**: TAMEFOR S.A.S B.I.C - Consultoría Forestal y Ambiental
