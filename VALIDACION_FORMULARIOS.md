# ✅ Validación de Formularios - TAMEFOR

## Estado de Implementación

### Sistema de Validación Creado

**Archivo:** `lib/formValidation.ts` ✅

**Funcionalidades:**
- Validadores individuales (required, email, phone, cedula, etc.)
- Función principal `validateForm()`
- Schemas predefinidos para cada tipo de formulario
- Helpers para mostrar errores
- Mensajes de error en español

---

## Validadores Disponibles

### 1. Validadores Básicos
- `required` - Campo obligatorio
- `email` - Formato de email válido
- `phone` - Teléfono ecuatoriano (+593999999999, 0999999999)
- `cedula` - Cédula ecuatoriana (10 dígitos)
- `minLength` - Longitud mínima
- `maxLength` - Longitud máxima
- `number` - Número válido
- `positiveNumber` - Número positivo
- `url` - URL válida

### 2. Schemas Predefinidos
```typescript
validationSchemas.contacto
validationSchemas.newsletter
validationSchemas.pago
validationSchemas.login
validationSchemas.donacion
validationSchemas.consultoria
```

---

## Componentes con Formularios

### ✅ 1. contact-section.tsx
**Estado:** ACTUALIZADO CON VALIDACIÓN

**Campos validados:**
- Nombre (requerido, min 2 caracteres)
- Email (requerido, formato válido)
- Teléfono (opcional, formato válido si se ingresa)
- Mensaje (requerido, min 10 caracteres)

**Implementación:**
```typescript
import { validateForm, validationSchemas, getFieldError } from "@/lib/formValidation"

const [errors, setErrors] = useState<ValidationError[]>([])

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  
  const validation = validateForm(formData, {
    nombre: validationSchemas.contacto.nombre,
    email: validationSchemas.contacto.email,
    telefono: validationSchemas.contacto.telefono,
    mensaje: validationSchemas.contacto.mensaje,
  })
  
  if (!validation.isValid) {
    setErrors(validation.errors)
    return
  }
  
  // Continuar con envío
}
```

---

### 📝 2. newsletter-section.tsx
**Estado:** PENDIENTE

**Campos a validar:**
- Email (requerido, formato válido)

**Código a aplicar:**
```typescript
import { validateForm, validationSchemas, getFieldError } from "@/lib/formValidation"

const [errors, setErrors] = useState<ValidationError[]>([])

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  
  const validation = validateForm(
    { email },
    { email: validationSchemas.newsletter.email }
  )
  
  if (!validation.isValid) {
    setErrors(validation.errors)
    return
  }
  
  // Continuar con suscripción
}

// En el Input:
<Input 
  type="email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value)
    setErrors([]) // Limpiar errores al escribir
  }}
  className={getFieldError(errors, 'email') ? 'border-red-500' : ''}
/>
{getFieldError(errors, 'email') && (
  <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'email')}</p>
)}
```

---

### 📝 3. ServiceConsultationModal.tsx
**Estado:** PENDIENTE

**Campos a validar:**
- Nombre (requerido, min 2 caracteres)
- Email (requerido, formato válido)
- Empresa (requerido)
- Teléfono (requerido, formato válido)
- Mensaje (requerido, min 20 caracteres)

**Schema a usar:**
```typescript
validationSchemas.consultoria
```

---

### 📝 4. PagosPageClient.tsx
**Estado:** PENDIENTE

**Campos a validar:**
- Cédula (requerido, 10 dígitos)
- Nombres (requerido, min 2 caracteres)
- Apellidos (requerido, min 2 caracteres)
- Email (requerido, formato válido)
- Teléfono (requerido, formato válido)
- Monto (requerido, número positivo)

**Schema a usar:**
```typescript
validationSchemas.pago
```

---

### 📝 5. LoginFormModal.tsx
**Estado:** PENDIENTE

**Campos a validar:**
- Email (requerido, formato válido)
- Password (requerido, min 6 caracteres)

**Schema a usar:**
```typescript
validationSchemas.login
```

---

### 📝 6. donate-section.tsx
**Estado:** PENDIENTE

**Campos a validar:**
- Nombre (requerido, min 2 caracteres)
- Email (requerido, formato válido)
- Teléfono (opcional, formato válido si se ingresa)
- Monto (requerido, número positivo)

**Schema a usar:**
```typescript
validationSchemas.donacion
```

---

### 📝 7. JobAlertsForm.tsx
**Estado:** PENDIENTE

**Campos a validar:**
- Email (requerido, formato válido)

**Schema a usar:**
```typescript
validationSchemas.newsletter
```

---

## Patrón de Implementación

### 1. Importar utilidades
```typescript
import { 
  validateForm, 
  validationSchemas, 
  getFieldError, 
  hasFieldError,
  type ValidationError 
} from "@/lib/formValidation"
```

### 2. Agregar estado de errores
```typescript
const [errors, setErrors] = useState<ValidationError[]>([])
```

### 3. Validar en handleSubmit
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  
  const validation = validateForm(formData, validationSchemas.contacto)
  
  if (!validation.isValid) {
    setErrors(validation.errors)
    return // Detener el envío
  }
  
  setErrors([]) // Limpiar errores
  // Continuar con el envío del formulario
}
```

### 4. Limpiar errores al escribir
```typescript
<Input 
  value={formData.nombre}
  onChange={(e) => {
    setFormData({ ...formData, nombre: e.target.value })
    setErrors([]) // Limpiar errores al escribir
  }}
/>
```

### 5. Mostrar errores en UI
```typescript
// Opción 1: Border rojo
<Input 
  className={hasFieldError(errors, 'nombre') ? 'border-red-500' : ''}
/>

// Opción 2: Mensaje de error debajo del campo
{getFieldError(errors, 'nombre') && (
  <p className="text-red-500 text-sm mt-1">
    {getFieldError(errors, 'nombre')}
  </p>
)}

// Opción 3: Ambos
<div>
  <Input 
    className={`border-2 ${hasFieldError(errors, 'nombre') ? 'border-red-500' : 'border-gray-300'}`}
  />
  {getFieldError(errors, 'nombre') && (
    <p className="text-red-500 text-sm mt-1">
      {getFieldError(errors, 'nombre')}
    </p>
  )}
</div>
```

---

## Ejemplo Completo

```typescript
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  validateForm, 
  validationSchemas, 
  getFieldError,
  type ValidationError 
} from "@/lib/formValidation"

export function MiFormulario() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })
  
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar
    const validation = validateForm(formData, validationSchemas.contacto)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }
    
    // Enviar
    setIsSubmitting(true)
    setErrors([])
    
    try {
      // Aquí va la lógica de envío
      await enviarFormulario(formData)
      
      // Resetear formulario
      setFormData({ nombre: '', email: '', mensaje: '' })
      
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo Nombre */}
      <div>
        <label className="block mb-2">Nombre</label>
        <Input
          value={formData.nombre}
          onChange={(e) => {
            setFormData({ ...formData, nombre: e.target.value })
            setErrors([]) // Limpiar errores
          }}
          className={getFieldError(errors, 'nombre') ? 'border-red-500' : ''}
        />
        {getFieldError(errors, 'nombre') && (
          <p className="text-red-500 text-sm mt-1">
            {getFieldError(errors, 'nombre')}
          </p>
        )}
      </div>

      {/* Campo Email */}
      <div>
        <label className="block mb-2">Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value })
            setErrors([])
          }}
          className={getFieldError(errors, 'email') ? 'border-red-500' : ''}
        />
        {getFieldError(errors, 'email') && (
          <p className="text-red-500 text-sm mt-1">
            {getFieldError(errors, 'email')}
          </p>
        )}
      </div>

      {/* Botón Submit */}
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  )
}
```

---

## Mensajes de Error

Los mensajes son en español y específicos:

- "Nombre es requerido"
- "Email inválido"
- "Teléfono inválido. Formato: +593999999999 o 0999999999"
- "Cédula debe tener 10 dígitos"
- "Mensaje debe tener al menos 10 caracteres"
- "Monto debe ser un número positivo"

---

## Testing

### Casos a probar:
1. ✅ Enviar formulario vacío → Mostrar todos los errores
2. ✅ Email inválido → "Email inválido"
3. ✅ Teléfono mal formateado → Mensaje de formato
4. ✅ Mensaje muy corto → "Debe tener al menos X caracteres"
5. ✅ Campos válidos → Limpiar errores y enviar

---

## Próximos Pasos

1. ✅ Sistema de validación creado (`lib/formValidation.ts`)
2. ✅ `contact-section.tsx` actualizado con validación
3. 📝 Aplicar en `newsletter-section.tsx`
4. 📝 Aplicar en `ServiceConsultationModal.tsx`
5. 📝 Aplicar en `PagosPageClient.tsx`
6. 📝 Aplicar en `LoginFormModal.tsx`
7. 📝 Aplicar en `donate-section.tsx`
8. 📝 Aplicar en `JobAlertsForm.tsx`

---

**Fecha de Creación:** Enero 2025  
**Estado:** En Progreso (1/8 componentes completados)  
**Versión:** 1.0
