import { getPocketBase, handlePBError, type PBRecord } from '../pocketbase'

// Tipo para inscripción desde PocketBase
export interface PBInscripcion extends PBRecord {
  estudiante: string // ID relación
  curso: string // ID relación
  estudiante_nombre?: string
  estudiante_cedula?: string
  estudiante_email?: string
  estudiante_telefono?: string
  estudiante_direccion?: string
  curso_nombre?: string
  fecha_inscripcion?: string
  estado_inscripcion?: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'En proceso'
  metodo_pago?: string
  comprobante_pago?: string
  valor_pagado?: number
  observaciones?: string
}

// Tipo local para inscripción
export interface Inscripcion {
  id: string
  estudianteId: string
  cursoId: string
  estudianteNombre: string
  estudianteCedula?: string
  estudianteEmail?: string
  estudianteTelefono?: string
  estudianteDireccion?: string
  cursoNombre?: string
  fechaInscripcion: string
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'En proceso'
  metodoPago?: string
  comprobantePago?: string
  valorPagado?: number
  observaciones?: string
}

// Mapear inscripción de PocketBase a formato local
function mapPBInscripcionToLocal(pbInscripcion: PBInscripcion): Inscripcion {
  return {
    id: pbInscripcion.id,
    estudianteId: pbInscripcion.estudiante,
    cursoId: pbInscripcion.curso,
    estudianteNombre: pbInscripcion.estudiante_nombre || 'Sin nombre',
    estudianteCedula: pbInscripcion.estudiante_cedula,
    estudianteEmail: pbInscripcion.estudiante_email,
    estudianteTelefono: pbInscripcion.estudiante_telefono,
    estudianteDireccion: pbInscripcion.estudiante_direccion,
    cursoNombre: pbInscripcion.curso_nombre,
    fechaInscripcion: pbInscripcion.fecha_inscripcion || pbInscripcion.created || '',
    estado: pbInscripcion.estado_inscripcion || 'Pendiente',
    metodoPago: pbInscripcion.metodo_pago,
    comprobantePago: pbInscripcion.comprobante_pago 
      ? getFileUrl(pbInscripcion.collectionId!, pbInscripcion.id, pbInscripcion.comprobante_pago)
      : undefined,
    valorPagado: pbInscripcion.valor_pagado,
    observaciones: pbInscripcion.observaciones,
  }
}

// Helper para construir URL de archivo de comprobante
function getFileUrl(collectionId: string, recordId: string, filename: string): string {
  const pb = getPocketBase()
  return pb.files.getUrl({ collectionId, id: recordId } as any, filename)
}

/**
 * Crear nueva inscripción
 */
export async function createInscripcion(data: {
  estudianteNombre: string
  estudianteCedula: string
  estudianteEmail: string
  estudianteTelefono?: string
  estudianteDireccion?: string
  cursoId: string
  cursoNombre?: string
  metodoPago?: string
  comprobantePago?: File
}): Promise<Inscripcion | null> {
  try {
    const pb = getPocketBase()
    
    // Preparar datos para PocketBase
    const formData = new FormData()
    
    // Datos requeridos
    formData.append('estudiante_nombre', data.estudianteNombre)
    formData.append('estudiante_cedula', data.estudianteCedula)
    formData.append('estudiante_email', data.estudianteEmail)
    formData.append('curso', data.cursoId)
    formData.append('estado_inscripcion', 'Pendiente')
    
    // Datos opcionales
    if (data.estudianteTelefono) formData.append('estudiante_telefono', data.estudianteTelefono)
    if (data.estudianteDireccion) formData.append('estudiante_direccion', data.estudianteDireccion)
    if (data.cursoNombre) formData.append('curso_nombre', data.cursoNombre)
    if (data.metodoPago) formData.append('metodo_pago', data.metodoPago)
    if (data.comprobantePago) formData.append('comprobante_pago', data.comprobantePago)
    
    const result = await pb.collection('inscripciones_cursos').create<PBInscripcion>(formData)
    
    return mapPBInscripcionToLocal(result)
  } catch (error) {
    console.error('Error al crear inscripción:', handlePBError(error))
    return null
  }
}

/**
 * Obtener inscripciones por estudiante (email)
 */
export async function getInscripcionesByEmail(email: string): Promise<Inscripcion[]> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('inscripciones_cursos').getList<PBInscripcion>(1, 50, {
      filter: `estudiante_email = "${email}"`,
      sort: '-fecha_inscripcion,-created',
    })
    
    return result.items.map(mapPBInscripcionToLocal)
  } catch (error) {
    console.error('Error al obtener inscripciones por email:', handlePBError(error))
    return []
  }
}

/**
 * Obtener inscripciones por curso
 */
export async function getInscripcionesByCurso(cursoId: string): Promise<Inscripcion[]> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('inscripciones_cursos').getList<PBInscripcion>(1, 100, {
      filter: `curso = "${cursoId}"`,
      sort: '-fecha_inscripcion,-created',
    })
    
    return result.items.map(mapPBInscripcionToLocal)
  } catch (error) {
    console.error('Error al obtener inscripciones por curso:', handlePBError(error))
    return []
  }
}

/**
 * Obtener inscripción por ID
 */
export async function getInscripcionById(id: string): Promise<Inscripcion | null> {
  try {
    const pb = getPocketBase()
    const result = await pb.collection('inscripciones_cursos').getOne<PBInscripcion>(id)
    
    return mapPBInscripcionToLocal(result)
  } catch (error) {
    console.error('Error al obtener inscripción:', handlePBError(error))
    return null
  }
}
