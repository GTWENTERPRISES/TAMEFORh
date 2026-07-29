import PocketBase from 'pocketbase'

// Configuración de PocketBase
const PB_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'

// Instancia singleton de PocketBase
let pbInstance: PocketBase | null = null

export function getPocketBase(): PocketBase {
  if (!pbInstance) {
    pbInstance = new PocketBase(PB_URL)
    // Configurar auto-cancelación de requests
    pbInstance.autoCancellation(false)
  }
  return pbInstance
}

// Helper para construir URL de archivos
export function getFileUrl(
  collectionId: string,
  recordId: string,
  filename: string,
  thumb?: string
): string {
  const pb = getPocketBase()
  return pb.files.getUrl({ collectionId, id: recordId } as any, filename, { thumb })
}

// Helper para manejo de errores
export function handlePBError(error: any): string {
  if (error?.message) {
    return error.message
  }
  if (error?.data?.message) {
    return error.data.message
  }
  return 'Error desconocido al conectar con la API'
}

// Tipos base para PocketBase
export interface PBRecord {
  id: string
  created?: string
  updated?: string
  collectionId?: string
  collectionName?: string
}

export interface PBListResult<T> {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: T[]
}
