// Datos y persistencia (localStorage) de la Plataforma Interna TAMEFOR
// Módulo demo: los datos se guardan en el navegador hasta conectar un backend.

export interface Estudiante {
  id: string
  nombre: string
  cedula: string
  email: string
  telefono: string
  cursoIds: string[]
  estado: 'activo' | 'inactivo'
}

export interface Docente {
  id: string
  nombre: string
  cedula: string
  email: string
  telefono: string
  especialidad: string
  cursoIds: string[]
  estado: 'activo' | 'inactivo'
}

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: 'administrador' | 'docente' | 'secretaria'
  estado: 'activo' | 'inactivo'
}

export interface CursoInterno {
  id: string
  nombre: string
  docenteId: string
  horario: string
  estado: 'en-curso' | 'finalizado' | 'proximo'
}

export interface Asistencia {
  id: string
  estudianteId: string
  cursoId: string
  fecha: string // ISO
  hora: string // HH:mm
  estado: 'presente' | 'ausente' | 'atraso' | 'justificado'
  justificacion: string
}

export interface Calificacion {
  id: string
  estudianteId: string
  cursoId: string
  parcial1: number
  parcial2: number
  trabajoFinal: number
  observaciones: string
}

export interface PlataformaDB {
  estudiantes: Estudiante[]
  docentes: Docente[]
  usuarios: Usuario[]
  cursos: CursoInterno[]
  asistencias: Asistencia[]
  calificaciones: Calificacion[]
}

const STORAGE_KEY = 'tamefor-plataforma-db'
export const SESSION_KEY = 'tamefor-plataforma-sesion'

const seedDB: PlataformaDB = {
  cursos: [
    { id: 'c1', nombre: 'Modelación, Biometría y Manejo de Datos', docenteId: 'd1', horario: 'Lun-Mié 19:00-21:00', estado: 'en-curso' },
    { id: 'c2', nombre: 'Sistemas de Información Geográfica Aplicados a la Gestión Forestal', docenteId: 'd2', horario: 'Mar-Jue 19:00-21:00', estado: 'en-curso' },
    { id: 'c3', nombre: 'Fertilidad de Suelos y Nutrición Vegetal', docenteId: 'd1', horario: 'Sáb 09:00-13:00', estado: 'en-curso' },
    { id: 'c4', nombre: 'Derecho Ambiental y Gobernanza', docenteId: 'd3', horario: 'Vie 18:00-21:00', estado: 'proximo' },
  ],
  docentes: [
    { id: 'd1', nombre: 'Ing. Carlos Mendoza', cedula: '1204567890', email: 'cmendoza@tamefor.com', telefono: '0991234567', especialidad: 'Biometría Forestal', cursoIds: ['c1', 'c3'], estado: 'activo' },
    { id: 'd2', nombre: 'Ing. María Vélez', cedula: '1209876543', email: 'mvelez@tamefor.com', telefono: '0987654321', especialidad: 'SIG y Teledetección', cursoIds: ['c2'], estado: 'activo' },
    { id: 'd3', nombre: 'Ab. Jorge Paredes', cedula: '1201122334', email: 'jparedes@tamefor.com', telefono: '0999887766', especialidad: 'Derecho Ambiental', cursoIds: ['c4'], estado: 'activo' },
  ],
  estudiantes: [
    { id: 'e1', nombre: 'qqqqq', cedula: '1250001111', email: 'qqqqq@correo.com', telefono: '0980001111', cursoIds: ['c1', 'c2', 'c3'], estado: 'activo' },
    { id: 'e2', nombre: 'Ana Torres', cedula: '1250002222', email: 'atorres@correo.com', telefono: '0980002222', cursoIds: ['c1'], estado: 'activo' },
    { id: 'e3', nombre: 'Luis Zambrano', cedula: '1250003333', email: 'lzambrano@correo.com', telefono: '0980003333', cursoIds: ['c2', 'c3'], estado: 'activo' },
  ],
  usuarios: [
    { id: 'u1', nombre: 'Administrador TAMEFOR', email: 'admin@tamefor.com', rol: 'administrador', estado: 'activo' },
    { id: 'u2', nombre: 'Secretaría Académica', email: 'secretaria@tamefor.com', rol: 'secretaria', estado: 'activo' },
  ],
  asistencias: [
    { id: 'a1', estudianteId: 'e1', cursoId: 'c3', fecha: '2026-06-23T02:28:51.280Z', hora: '21:28', estado: 'presente', justificacion: '' },
    { id: 'a2', estudianteId: 'e1', cursoId: 'c1', fecha: '2026-06-23T02:13:42.773Z', hora: '21:12', estado: 'presente', justificacion: '' },
    { id: 'a3', estudianteId: 'e1', cursoId: 'c2', fecha: '2026-06-23T02:07:36.951Z', hora: '21:07', estado: 'presente', justificacion: '' },
  ],
  calificaciones: [
    { id: 'q1', estudianteId: 'e1', cursoId: 'c1', parcial1: 8.5, parcial2: 9.0, trabajoFinal: 8.8, observaciones: '' },
    { id: 'q2', estudianteId: 'e2', cursoId: 'c1', parcial1: 7.0, parcial2: 7.5, trabajoFinal: 8.0, observaciones: '' },
  ],
}

export function loadDB(): PlataformaDB {
  if (typeof window === 'undefined') return seedDB
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as PlataformaDB
  } catch {
    // datos corruptos: reinicia con la semilla
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDB))
  return seedDB
}

export function saveDB(db: PlataformaDB) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

export function newId(prefix: string) {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

// ---- Sesión (demo) ----

export interface Sesion {
  email: string
  nombre: string
  rol: string
}

// Credenciales de acceso a la plataforma (demo — reemplazar por backend real)
const CREDENCIALES: { email: string; password: string; nombre: string; rol: string }[] = [
  { email: 'admin@tamefor.com', password: 'Tamefor2026*', nombre: 'Administrador TAMEFOR', rol: 'administrador' },
  { email: 'secretaria@tamefor.com', password: 'Secretaria2026*', nombre: 'Secretaría Académica', rol: 'secretaria' },
]

export function autenticar(email: string, password: string): Sesion | null {
  const cred = CREDENCIALES.find(
    (c) => c.email.toLowerCase() === email.trim().toLowerCase() && c.password === password
  )
  if (!cred) return null
  return { email: cred.email, nombre: cred.nombre, rol: cred.rol }
}

export function getSesion(): Sesion | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Sesion) : null
  } catch {
    return null
  }
}

export function setSesion(s: Sesion) {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(s))
}

export function clearSesion() {
  if (typeof window === 'undefined') return
  window.sessionStorage.removeItem(SESSION_KEY)
}

// ---- Exportación ----

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob(['﻿' + content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportCSV(headers: string[], rows: string[][], filename: string) {
  const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`
  const csv = [headers, ...rows].map((r) => r.map(escape).join(',')).join('\r\n')
  downloadBlob(csv, `${filename}.csv`, 'text/csv;charset=utf-8;')
}

export function exportExcel(headers: string[], rows: string[][], filename: string) {
  // Tabla HTML con extensión .xls: Excel la abre directamente
  const th = headers.map((h) => `<th>${h}</th>`).join('')
  const trs = rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')
  const html = `<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"></head><body><table border="1"><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></body></html>`
  downloadBlob(html, `${filename}.xls`, 'application/vnd.ms-excel')
}
