import { getPocketBase, handlePBError, type PBRecord } from '../pocketbase'

// Tipo para solicitud de información desde PocketBase
export interface PBSolicitudInformacion extends PBRecord {
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  cargo?: string
  tipo_solicitud?: string
  motivo?: string
  mensaje?: string
  area_interes?: string
  prefiere_contacto?: 'Email' | 'Teléfono' | 'Ambos'
  horario_contacto?: string
  estado?: 'Pendiente' | 'En revisión' | 'Atendida' | 'Archivada'
  fecha_solicitud?: string
  atendido?: boolean
  notas_internas?: string
  fecha_atencion?: string
}

// Tipo local para solicitud de información
export interface SolicitudInformacion {
  id: string
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  cargo?: string
  tipoSolicitud?: string
  motivo?: string
  mensaje?: string
  areaInteres?: string
  prefiereContacto?: 'Email' | 'Teléfono' | 'Ambos'
  horarioContacto?: string
  estado: 'Pendiente' | 'En revisión' | 'Atendida' | 'Archivada'
  fechaSolicitud: string
  atendido: boolean
  notasInternas?: string
  fechaAtencion?: string
}

// Mapear solicitud de PocketBase a formato local
function mapPBSolicitudToLocal(pbSolicitud: PBSolicitudInformacion): SolicitudInformacion {
  return {
    id: pbSolicitud.id,
    nombre: pbSolicitud.nombre,
    email: pbSolicitud.email,
    telefono: pbSolicitud.telefono,
    empresa: pbSolicitud.empresa,
    cargo: pbSolicitud.cargo,
    tipoSolicitud: pbSolicitud.tipo_solicitud,
    motivo: pbSolicitud.motivo,
    mensaje: pbSolicitud.mensaje,
    areaInteres: pbSolicitud.area_interes,
    prefiereContacto: pbSolicitud.prefiere_contacto,
    horarioContacto: pbSolicitud.horario_contacto,
    estado: pbSolicitud.estado || 'Pendiente',
    fechaSolicitud: pbSolicitud.fecha_solicitud || pbSolicitud.created || new Date().toISOString(),
    atendido: pbSolicitud.atendido || false,
    notasInternas: pbSolicitud.notas_internas,
    fechaAtencion: pbSolicitud.fecha_atencion,
  }
}

/**
 * Crear nueva solicitud de información
 */
export async function createSolicitudInformacion(data: {
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  cargo?: string
  tipoSolicitud?: string
  motivo?: string
  mensaje?: string
  areaInteres?: string
  prefiereContacto?: 'Email' | 'Teléfono' | 'Ambos'
  horarioContacto?: string
}): Promise<SolicitudInformacion | null> {
  try {
    const pb = getPocketBase()
    
    const dataToSend = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono || '',
      empresa: data.empresa || '',
      cargo: data.cargo || '',
      tipo_solicitud: data.tipoSolicitud || 'Información General',
      motivo: data.motivo || '',
      mensaje: data.mensaje || '',
      area_interes: data.areaInteres || '',
      prefiere_contacto: data.prefiereContacto || 'Email',
      horario_contacto: data.horarioContacto || '',
      estado: 'Pendiente' as const,
      atendido: false,
      fecha_solicitud: new Date().toISOString(),
    }
    
    const result = await pb.collection('solicitudes_de_informacion').create<PBSolicitudInformacion>(dataToSend)
    
    return mapPBSolicitudToLocal(result)
  } catch (error) {
    console.error('Error al crear solicitud de información:', handlePBError(error))
    return null
  }
}

/**
 * Obtener todas las solicitudes (admin)
 */
export async function getAllSolicitudes(page: number = 1, perPage: number = 20): Promise<{
  items: SolicitudInformacion[]
  totalItems: number
  totalPages: number
}> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('solicitudes_de_informacion').getList<PBSolicitudInformacion>(page, perPage, {
      sort: '-fecha_solicitud,-created',
    })
    
    return {
      items: result.items.map(mapPBSolicitudToLocal),
      totalItems: result.totalItems,
      totalPages: result.totalPages,
    }
  } catch (error) {
    console.error('Error al obtener solicitudes:', handlePBError(error))
    return {
      items: [],
      totalItems: 0,
      totalPages: 0,
    }
  }
}

/**
 * Obtener solicitudes por estado
 */
export async function getSolicitudesByEstado(
  estado: 'Pendiente' | 'En revisión' | 'Atendida' | 'Archivada'
): Promise<SolicitudInformacion[]> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('solicitudes_de_informacion').getList<PBSolicitudInformacion>(1, 100, {
      filter: `estado = "${estado}"`,
      sort: '-fecha_solicitud,-created',
    })
    
    return result.items.map(mapPBSolicitudToLocal)
  } catch (error) {
    console.error('Error al obtener solicitudes por estado:', handlePBError(error))
    return []
  }
}

/**
 * Obtener solicitud por ID
 */
export async function getSolicitudById(id: string): Promise<SolicitudInformacion | null> {
  try {
    const pb = getPocketBase()
    const result = await pb.collection('solicitudes_de_informacion').getOne<PBSolicitudInformacion>(id)
    
    return mapPBSolicitudToLocal(result)
  } catch (error) {
    console.error('Error al obtener solicitud:', handlePBError(error))
    return null
  }
}

/**
 * Marcar solicitud como atendida (admin)
 */
export async function marcarSolicitudAtendida(
  id: string,
  notasInternas?: string
): Promise<boolean> {
  try {
    const pb = getPocketBase()
    
    await pb.collection('solicitudes_de_informacion').update(id, {
      estado: 'Atendida',
      atendido: true,
      fecha_atencion: new Date().toISOString(),
      notas_internas: notasInternas || '',
    })
    
    return true
  } catch (error) {
    console.error('Error al marcar solicitud como atendida:', handlePBError(error))
    return false
  }
}
