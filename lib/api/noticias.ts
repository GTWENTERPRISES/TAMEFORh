import { getPocketBase, getFileUrl, handlePBError, type PBRecord } from '../pocketbase'
import { newsData, type NewsArticle } from '../newsData'

// Tipo para noticia desde PocketBase (basado en banner_publicitarios)
export interface PBNoticia extends PBRecord {
  titulo: string
  descripcion?: string
  imagen?: string[]
  descripcion_imagen?: string
  fecha?: string
  horarios?: string
  plataforma?: string
  modalidad?: string
  ubicacion?: string
  requisitos?: string
  email?: string
  link_de_inscripcion_URL?: string
}

// Mapear noticia de PocketBase a formato local
function mapPBNoticiaToLocal(pbNoticia: PBNoticia): NewsArticle {
  const pb = getPocketBase()
  
  // Obtener primera imagen si existe
  const featuredImage = pbNoticia.imagen && pbNoticia.imagen.length > 0
    ? getFileUrl(pbNoticia.collectionId!, pbNoticia.id, pbNoticia.imagen[0])
    : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
  
  return {
    id: parseInt(pbNoticia.id.substring(0, 8), 36),
    title: pbNoticia.titulo,
    excerpt: pbNoticia.descripcion || '',
    content: pbNoticia.descripcion || '',
    category: 'Eventos',
    author: 'TAMEFOR',
    publishDate: pbNoticia.fecha || new Date().toISOString().split('T')[0],
    readTime: '3 min lectura',
    featuredImage,
    tags: pbNoticia.modalidad ? [pbNoticia.modalidad] : ['Evento'],
    slug: generateSlug(pbNoticia.titulo),
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
 * Obtener todas las noticias (locales + API)
 */
export async function getAllNoticias(): Promise<NewsArticle[]> {
  try {
    const pb = getPocketBase()
    
    // Obtener banners publicitarios como noticias/eventos
    const result = await pb.collection('banner_publicitarios').getList<PBNoticia>(1, 50, {
      sort: '-created',
    })
    
    // Mapear noticias de PocketBase
    const pbNoticias = result.items.map(mapPBNoticiaToLocal)
    
    // Eliminar duplicados (mantener solo locales si hay conflicto de slug)
    const pbNoticiasFiltradas = pbNoticias.filter(pbNoticia => {
      return !newsData.find(local => local.slug === pbNoticia.slug)
    })
    
    // Combinar: locales primero, luego API al final
    const allNoticias = [...newsData, ...pbNoticiasFiltradas]
    
    return allNoticias
  } catch (error) {
    console.error('Error al obtener noticias de PocketBase:', handlePBError(error))
    return newsData
  }
}

/**
 * Obtener noticia por slug
 */
export async function getNoticiaBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    // Primero buscar en noticias locales
    const localNoticia = newsData.find(n => n.slug === slug)
    if (localNoticia) return localNoticia
    
    // Si no está en locales, buscar en PocketBase
    const pb = getPocketBase()
    const result = await pb.collection('banner_publicitarios').getFirstListItem<PBNoticia>(`titulo ~ "${slug}"`)
    
    return mapPBNoticiaToLocal(result)
  } catch (error) {
    console.error('Error al obtener noticia por slug:', handlePBError(error))
    return null
  }
}

/**
 * Obtener últimas noticias
 */
export async function getLatestNoticias(limit: number = 3): Promise<NewsArticle[]> {
  try {
    const allNoticias = await getAllNoticias()
    return allNoticias.slice(0, limit)
  } catch (error) {
    console.error('Error al obtener últimas noticias:', handlePBError(error))
    return newsData.slice(0, limit)
  }
}
