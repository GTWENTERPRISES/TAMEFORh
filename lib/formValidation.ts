// Utilidades de validación de formularios

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Validaciones individuales
export const validators = {
  required: (value: string, fieldName: string): ValidationError | null => {
    if (!value || value.trim() === '') {
      return { field: fieldName, message: `${fieldName} es requerido` }
    }
    return null
  },

  email: (value: string, fieldName: string = 'Email'): ValidationError | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return { field: fieldName, message: 'Email inválido' }
    }
    return null
  },

  minLength: (value: string, min: number, fieldName: string): ValidationError | null => {
    if (value.length < min) {
      return { field: fieldName, message: `${fieldName} debe tener al menos ${min} caracteres` }
    }
    return null
  },

  maxLength: (value: string, max: number, fieldName: string): ValidationError | null => {
    if (value.length > max) {
      return { field: fieldName, message: `${fieldName} no puede exceder ${max} caracteres` }
    }
    return null
  },

  phone: (value: string, fieldName: string = 'Teléfono'): ValidationError | null => {
    // Acepta formatos: +593999999999, 0999999999, 999999999
    const phoneRegex = /^(\+593|0)?[0-9]{9,10}$/
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return { field: fieldName, message: 'Teléfono inválido. Formato: +593999999999 o 0999999999' }
    }
    return null
  },

  cedula: (value: string, fieldName: string = 'Cédula'): ValidationError | null => {
    // Validación básica de cédula ecuatoriana (10 dígitos)
    const cedulaRegex = /^[0-9]{10}$/
    if (!cedulaRegex.test(value)) {
      return { field: fieldName, message: 'Cédula debe tener 10 dígitos' }
    }
    return null
  },

  number: (value: string, fieldName: string): ValidationError | null => {
    if (isNaN(Number(value))) {
      return { field: fieldName, message: `${fieldName} debe ser un número válido` }
    }
    return null
  },

  positiveNumber: (value: string, fieldName: string): ValidationError | null => {
    const num = Number(value)
    if (isNaN(num) || num <= 0) {
      return { field: fieldName, message: `${fieldName} debe ser un número positivo` }
    }
    return null
  },

  url: (value: string, fieldName: string = 'URL'): ValidationError | null => {
    try {
      new URL(value)
      return null
    } catch {
      return { field: fieldName, message: 'URL inválida' }
    }
  },
}

// Función principal de validación
export function validateForm(
  data: Record<string, string>,
  rules: Record<string, Array<(value: string, fieldName: string) => ValidationError | null>>
): ValidationResult {
  const errors: ValidationError[] = []

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = data[field] || ''
    fieldRules.forEach(rule => {
      const error = rule(value, field)
      if (error) {
        errors.push(error)
      }
    })
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Schemas de validación comunes
export const validationSchemas = {
  contacto: {
    nombre: [validators.required, (v: string) => validators.minLength(v, 2, 'Nombre')],
    email: [validators.required, validators.email],
    telefono: [(v: string) => v ? validators.phone(v) : null], // Opcional
    mensaje: [validators.required, (v: string) => validators.minLength(v, 10, 'Mensaje')],
  },

  newsletter: {
    email: [validators.required, validators.email],
  },

  pago: {
    cedula: [validators.required, validators.cedula],
    nombres: [validators.required, (v: string) => validators.minLength(v, 2, 'Nombres')],
    apellidos: [validators.required, (v: string) => validators.minLength(v, 2, 'Apellidos')],
    email: [validators.required, validators.email],
    telefono: [validators.required, validators.phone],
    monto: [validators.required, validators.positiveNumber],
  },

  login: {
    email: [validators.required, validators.email],
    password: [validators.required, (v: string) => validators.minLength(v, 6, 'Contraseña')],
  },

  donacion: {
    nombre: [validators.required, (v: string) => validators.minLength(v, 2, 'Nombre')],
    email: [validators.required, validators.email],
    telefono: [(v: string) => v ? validators.phone(v) : null], // Opcional
    monto: [validators.required, validators.positiveNumber],
  },

  consultoria: {
    nombre: [validators.required, (v: string) => validators.minLength(v, 2, 'Nombre')],
    email: [validators.required, validators.email],
    empresa: [validators.required],
    telefono: [validators.required, validators.phone],
    mensaje: [validators.required, (v: string) => validators.minLength(v, 20, 'Mensaje')],
  },
}

// Helper para mostrar errores
export function getFieldError(errors: ValidationError[], fieldName: string): string | null {
  const error = errors.find(e => e.field === fieldName)
  return error ? error.message : null
}

// Helper para verificar si un campo tiene error
export function hasFieldError(errors: ValidationError[], fieldName: string): boolean {
  return errors.some(e => e.field === fieldName)
}
