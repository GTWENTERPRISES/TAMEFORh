import { getPocketBase, handlePBError, type PBRecord } from '../pocketbase'

// Tipo para mensaje de contacto desde PocketBase
export interface PBMensajeContacto extends PBRecord {
  nombre: string
  email: string
  telefono?: string
  asunto?: string
  mensaje: string
  empresa?: string
  tipo_consulta?: string
  estado?: 'Nuevo' | 'En revisión' | 'Respondido' | 'Archivado'
  fecha?: string
  respondido?: boolean
  respuesta?: string
  fecha_respuesta?: string
}

// Tipo local para mensaje de contacto
export interface MensajeContacto {
  id: string
  nombre: string
  email: string
  telefono?: string
  asunto?: string
  mensaje: string
  empresa?: string
  tipoConsulta?: string
  estado: 'Nuevo' | 'En revisión' | 'Respondido' | 'Archivado'
  fecha: string
  respondido: boolean
  respuesta?: string
  fechaRespuesta?: string
}

// Mapear mensaje de PocketBase a formato local
function mapPBMensajeToLocal(pbMensaje: PBMensajeContacto): MensajeContacto {
  return {
    id: pbMensaje.id,
    nombre: pbMensaje.nombre,
    email: pbMensaje.email,
    telefono: pbMensaje.telefono,
    asunto: pbMensaje.asunto,
    mensaje: pbMensaje.mensaje,
    empresa: pbMensaje.empresa,
    tipoConsulta: pbMensaje.tipo_consulta,
    estado: pbMensaje.estado || 'Nuevo',
    fecha: pbMensaje.fecha || pbMensaje.created || new Date().toISOString(),
    respondido: pbMensaje.respondido || false,
    respuesta: pbMensaje.respuesta,
    fechaRespuesta: pbMensaje.fecha_respuesta,
  }
}

/**
 * Crear nuevo mensaje de contacto
 */
export async function createMensajeContacto(data: {
  nombre: string
  email: string
  telefono?: string
  asunto?: string
  mensaje: string
  empresa?: string
  tipoConsulta?: string
}): Promise<MensajeContacto | null> {
  try {
    const pb = getPocketBase()
    
    const dataToSend = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono || '',
      asunto: data.asunto || 'Consulta General',
      mensaje: data.mensaje,
      empresa: data.empresa || '',
      tipo_consulta: data.tipoConsulta || 'General',
      estado: 'Nuevo' as const,
      respondido: false,
      fecha: new Date().toISOString(),
    }
    
    const result = await pb.collection('mensajes_contacto').create<PBMensajeContacto>(dataToSend)
    
    return mapPBMensajeToLocal(result)
  } catch (error) {
    console.error('Error al crear mensaje de contacto:', handlePBError(error))
    return null
  }
}

/**
 * Obtener todos los mensajes de contacto (admin)
 */
export async function getAllMensajes(page: number = 1, perPage: number = 20): Promise<{
  items: MensajeContacto[]
  totalItems: number
  totalPages: number
}> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('mensajes_contacto').getList<PBMensajeContacto>(page, perPage, {
      sort: '-fecha,-created',
    })
    
    return {
      items: result.items.map(mapPBMensajeToLocal),
      totalItems: result.totalItems,
      totalPages: result.totalPages,
    }
  } catch (error) {
    console.error('Error al obtener mensajes:', handlePBError(error))
    return {
      items: [],
      totalItems: 0,
      totalPages: 0,
    }
  }
}

/**
 * Obtener mensajes por estado
 */
export async function getMensajesByEstado(
  estado: 'Nuevo' | 'En revisión' | 'Respondido' | 'Archivado'
): Promise<MensajeContacto[]> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('mensajes_contacto').getList<PBMensajeContacto>(1, 100, {
      filter: `estado = "${estado}"`,
      sort: '-fecha,-created',
    })
    
    return result.items.map(mapPBMensajeToLocal)
  } catch (error) {
    console.error('Error al obtener mensajes por estado:', handlePBError(error))
    return []
  }
}

/**
 * Obtener mensaje por ID
 */
export async function getMensajeById(id: string): Promise<MensajeContacto | null> {
  try {
    const pb = getPocketBase()
    const result = await pb.collection('mensajes_contacto').getOne<PBMensajeContacto>(id)
    
    return mapPBMensajeToLocal(result)
  } catch (error) {
    console.error('Error al obtener mensaje:', handlePBError(error))
    return null
  }
}

/**
 * Marcar mensaje como respondido (admin)
 */
export async function marcarMensajeRespondido(
  id: string,
  respuesta: string
): Promise<boolean> {
  try {
    const pb = getPocketBase()
    
    await pb.collection('mensajes_contacto').update(id, {
      estado: 'Respondido',
      respondido: true,
      respuesta: respuesta,
      fecha_respuesta: new Date().toISOString(),
    })
    
    return true
  } catch (error) {
    console.error('Error al marcar mensaje como respondido:', handlePBError(error))
    return false
  }
}
