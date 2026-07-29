import { getPocketBase, getFileUrl, handlePBError, type PBRecord } from '../pocketbase'

// Tipo para documento de biblioteca desde PocketBase
export interface PBBiblioteca extends PBRecord {
  titulo: string
  autor?: string
  tipo?: 'Legislación Forestal' | 'Libros' | 'Artículos' | 'Tesis de Pregrados' | 'Tesis de Postgrados'
  anio?: string
  descripcion?: string
  abstract?: string
  palabras_claves?: string
  numero_paginas?: number
  lenguaje?: 'Español' | 'Inglés'
  fecha_publicacion?: string
  institucion?: string
  link_documento?: string
  pdf_archivo?: string
  disponible?: boolean
  slug?: string
}

export interface DocumentoBiblioteca {
  id: number
  title: string
  author: string
  type: string
  year: string
  description: string
  abstract: string
  keywords: string[]
  pages?: number
  language: string
  publishDate?: string
  institution: string
  documentLink?: string
  pdfFile?: string
  available: boolean
  slug: string
}

// Datos locales de biblioteca (fallback)
const bibliotecaData: DocumentoBiblioteca[] = []

// Mapear documento de PocketBase a formato local
function mapPBBibliotecaToLocal(pbDoc: PBBiblioteca): DocumentoBiblioteca {
  const keywords = pbDoc.palabras_claves 
    ? pbDoc.palabras_claves.split(',').map(k => k.trim())
    : []

  return {
    id: parseInt(pbDoc.id.substring(0, 8), 36),
    title: pbDoc.titulo,
    author: pbDoc.autor || 'Autor Desconocido',
    type: pbDoc.tipo || 'Artículos',
    year: pbDoc.anio || new Date().getFullYear().toString(),
    description: pbDoc.descripcion || '',
    abstract: pbDoc.abstract || '',
    keywords,
    pages: pbDoc.numero_paginas,
    language: pbDoc.lenguaje || 'Español',
    publishDate: pbDoc.fecha_publicacion,
    institution: pbDoc.institucion || '',
    documentLink: pbDoc.link_documento,
    pdfFile: pbDoc.pdf_archivo 
      ? getFileUrl(pbDoc.collectionId!, pbDoc.id, pbDoc.pdf_archivo)
      : undefined,
    available: pbDoc.disponible !== false,
    slug: pbDoc.slug || generateSlug(pbDoc.titulo),
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Obtener todos los documentos (locales + API)
 */
export async function getAllDocumentos(): Promise<DocumentoBiblioteca[]> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('biblioteca').getList<PBBiblioteca>(1, 100, {
      filter: 'disponible = true',
      sort: '-created',
    })
    
    const pbDocumentos = result.items.map(mapPBBibliotecaToLocal)
    
    // Eliminar duplicados (mantener solo locales si hay conflicto de slug)
    const pbDocumentosFiltrados = pbDocumentos.filter(pbDoc => {
      return !bibliotecaData.find(local => local.slug === pbDoc.slug)
    })
    
    // Combinar: locales primero, luego API al final
    const allDocumentos = [...bibliotecaData, ...pbDocumentosFiltrados]
    
    return allDocumentos
  } catch (error) {
    console.error('Error al obtener documentos de biblioteca:', handlePBError(error))
    return bibliotecaData
  }
}

/**
 * Obtener documentos por tipo
 */
export async function getDocumentosByTipo(tipo: string): Promise<DocumentoBiblioteca[]> {
  try {
    const allDocumentos = await getAllDocumentos()
    return allDocumentos.filter(doc => doc.type === tipo)
  } catch (error) {
    console.error('Error al obtener documentos por tipo:', handlePBError(error))
    return []
  }
}

/**
 * Obtener documento por slug
 */
export async function getDocumentoBySlug(slug: string): Promise<DocumentoBiblioteca | null> {
  try {
    const localDoc = bibliotecaData.find(d => d.slug === slug)
    if (localDoc) return localDoc
    
    const pb = getPocketBase()
    const result = await pb.collection('biblioteca').getFirstListItem<PBBiblioteca>(`slug = "${slug}"`)
    
    return mapPBBibliotecaToLocal(result)
  } catch (error) {
    console.error('Error al obtener documento por slug:', handlePBError(error))
    return null
  }
}

/**
 * Buscar documentos por palabra clave
 */
export async function searchDocumentos(query: string): Promise<DocumentoBiblioteca[]> {
  try {
    const allDocumentos = await getAllDocumentos()
    const lowerQuery = query.toLowerCase()
    
    return allDocumentos.filter(doc => 
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.author.toLowerCase().includes(lowerQuery) ||
      doc.description.toLowerCase().includes(lowerQuery) ||
      doc.keywords.some(k => k.toLowerCase().includes(lowerQuery))
    )
  } catch (error) {
    console.error('Error al buscar documentos:', handlePBError(error))
    return []
  }
}
