import { getPocketBase, getFileUrl, handlePBError, type PBRecord } from '../pocketbase'

// Tipo para pago desde PocketBase
export interface PBPago extends PBRecord {
  concepto?: string
  descripcion?: string
  monto?: number
  metodo_pago?: 'Efectivo' | 'Transferencia' | 'Tarjeta' | 'PayPal'
  estado?: 'Pendiente' | 'Pagado' | 'Cancelado' | 'Reembolsado'
  fecha_pago?: string
  comprobante?: string
  referencia?: string
  nombre_pagador?: string
  email_pagador?: string
  telefono_pagador?: string
  observaciones?: string
  procesado?: boolean
}

// Tipo local para pago
export interface Pago {
  id: string
  concepto: string
  descripcion?: string
  monto: number
  metodoPago: 'Efectivo' | 'Transferencia' | 'Tarjeta' | 'PayPal'
  estado: 'Pendiente' | 'Pagado' | 'Cancelado' | 'Reembolsado'
  fechaPago: string
  comprobante?: string
  referencia?: string
  nombrePagador: string
  emailPagador?: string
  telefonoPagador?: string
  observaciones?: string
  procesado: boolean
  created: string
}

// Mapear pago de PocketBase a formato local
function mapPBPagoToLocal(pbPago: PBPago): Pago {
  return {
    id: pbPago.id,
    concepto: pbPago.concepto || 'Pago General',
    descripcion: pbPago.descripcion,
    monto: pbPago.monto || 0,
    metodoPago: pbPago.metodo_pago || 'Transferencia',
    estado: pbPago.estado || 'Pendiente',
    fechaPago: pbPago.fecha_pago || pbPago.created || new Date().toISOString(),
    comprobante: pbPago.comprobante 
      ? getFileUrl(pbPago.collectionId!, pbPago.id, pbPago.comprobante)
      : undefined,
    referencia: pbPago.referencia,
    nombrePagador: pbPago.nombre_pagador || 'Sin nombre',
    emailPagador: pbPago.email_pagador,
    telefonoPagador: pbPago.telefono_pagador,
    observaciones: pbPago.observaciones,
    procesado: pbPago.procesado || false,
    created: pbPago.created || new Date().toISOString(),
  }
}

/**
 * Crear nuevo pago
 */
export async function createPago(data: {
  concepto: string
  descripcion?: string
  monto: number
  metodoPago: 'Efectivo' | 'Transferencia' | 'Tarjeta' | 'PayPal'
  nombrePagador: string
  emailPagador?: string
  telefonoPagador?: string
  referencia?: string
  comprobante?: File
  observaciones?: string
}): Promise<Pago | null> {
  try {
    const pb = getPocketBase()
    
    // Preparar datos para PocketBase
    const formData = new FormData()
    
    formData.append('concepto', data.concepto)
    formData.append('monto', data.monto.toString())
    formData.append('metodo_pago', data.metodoPago)
    formData.append('nombre_pagador', data.nombrePagador)
    formData.append('estado', 'Pendiente')
    formData.append('procesado', 'false')
    formData.append('fecha_pago', new Date().toISOString())
    
    // Datos opcionales
    if (data.descripcion) formData.append('descripcion', data.descripcion)
    if (data.emailPagador) formData.append('email_pagador', data.emailPagador)
    if (data.telefonoPagador) formData.append('telefono_pagador', data.telefonoPagador)
    if (data.referencia) formData.append('referencia', data.referencia)
    if (data.observaciones) formData.append('observaciones', data.observaciones)
    if (data.comprobante) formData.append('comprobante', data.comprobante)
    
    const result = await pb.collection('pagos').create<PBPago>(formData)
    
    return mapPBPagoToLocal(result)
  } catch (error) {
    console.error('Error al crear pago:', handlePBError(error))
    return null
  }
}

/**
 * Obtener todos los pagos (admin)
 */
export async function getAllPagos(page: number = 1, perPage: number = 20): Promise<{
  items: Pago[]
  totalItems: number
  totalPages: number
}> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('pagos').getList<PBPago>(page, perPage, {
      sort: '-fecha_pago,-created',
    })
    
    return {
      items: result.items.map(mapPBPagoToLocal),
      totalItems: result.totalItems,
      totalPages: result.totalPages,
    }
  } catch (error) {
    console.error('Error al obtener pagos:', handlePBError(error))
    return {
      items: [],
      totalItems: 0,
      totalPages: 0,
    }
  }
}

/**
 * Obtener pagos por email del pagador
 */
export async function getPagosByEmail(email: string): Promise<Pago[]> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('pagos').getList<PBPago>(1, 50, {
      filter: `email_pagador = "${email}"`,
      sort: '-fecha_pago,-created',
    })
    
    return result.items.map(mapPBPagoToLocal)
  } catch (error) {
    console.error('Error al obtener pagos por email:', handlePBError(error))
    return []
  }
}

/**
 * Obtener pagos por estado
 */
export async function getPagosByEstado(
  estado: 'Pendiente' | 'Pagado' | 'Cancelado' | 'Reembolsado'
): Promise<Pago[]> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('pagos').getList<PBPago>(1, 100, {
      filter: `estado = "${estado}"`,
      sort: '-fecha_pago,-created',
    })
    
    return result.items.map(mapPBPagoToLocal)
  } catch (error) {
    console.error('Error al obtener pagos por estado:', handlePBError(error))
    return []
  }
}

/**
 * Obtener pago por ID
 */
export async function getPagoById(id: string): Promise<Pago | null> {
  try {
    const pb = getPocketBase()
    const result = await pb.collection('pagos').getOne<PBPago>(id)
    
    return mapPBPagoToLocal(result)
  } catch (error) {
    console.error('Error al obtener pago:', handlePBError(error))
    return null
  }
}

/**
 * Actualizar estado de pago (admin)
 */
export async function updateEstadoPago(
  id: string,
  estado: 'Pendiente' | 'Pagado' | 'Cancelado' | 'Reembolsado',
  observaciones?: string
): Promise<boolean> {
  try {
    const pb = getPocketBase()
    
    const updateData: any = {
      estado: estado,
      procesado: estado === 'Pagado',
    }
    
    if (observaciones) {
      updateData.observaciones = observaciones
    }
    
    await pb.collection('pagos').update(id, updateData)
    
    return true
  } catch (error) {
    console.error('Error al actualizar estado de pago:', handlePBError(error))
    return false
  }
}

/**
 * Obtener total de pagos por período
 */
export async function getTotalPagosByPeriodo(
  fechaInicio: string,
  fechaFin: string
): Promise<number> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('pagos').getList<PBPago>(1, 500, {
      filter: `fecha_pago >= "${fechaInicio}" && fecha_pago <= "${fechaFin}" && estado = "Pagado"`,
    })
    
    const total = result.items.reduce((sum, pago) => sum + (pago.monto || 0), 0)
    
    return total
  } catch (error) {
    console.error('Error al obtener total de pagos:', handlePBError(error))
    return 0
  }
}
