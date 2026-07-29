import { getPocketBase, getFileUrl, handlePBError, type PBRecord } from '../pocketbase'
import { testimonialsData, type Testimonial } from '../testimonialsData'

// Tipo para testimonio desde PocketBase
export interface PBTestimonio extends PBRecord {
  titulo?: string
  comentario?: string
  nombre: string
  titulo_academico?: string
  foto?: string
  empresa?: string
  destacado?: boolean
  orden?: number
}

// Mapear testimonio de PocketBase a formato local
function mapPBTestimonioToLocal(pbTestimonio: PBTestimonio): Testimonial {
  return {
    id: parseInt(pbTestimonio.id.substring(0, 8), 36),
    name: pbTestimonio.nombre,
    role: pbTestimonio.titulo_academico || 'Cliente',
    company: pbTestimonio.empresa || '',
    rating: 5.0, // Por defecto 5 estrellas
    text: pbTestimonio.comentario || pbTestimonio.titulo || '',
    image: pbTestimonio.foto 
      ? getFileUrl(pbTestimonio.collectionId!, pbTestimonio.id, pbTestimonio.foto)
      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400',
    destacado: pbTestimonio.destacado || false,
    orden: pbTestimonio.orden || 999,
  }
}

/**
 * Obtener todos los testimonios (locales + API)
 */
export async function getAllTestimonios(): Promise<Testimonial[]> {
  try {
    const pb = getPocketBase()
    
    // Intentar obtener testimonios de PocketBase
    const result = await pb.collection('Testimonios').getList<PBTestimonio>(1, 50, {
      sort: 'orden,nombre',
    })
    
    // Mapear testimonios de PocketBase
    const pbTestimonios = result.items.map(mapPBTestimonioToLocal)
    
    // Eliminar duplicados (mantener solo locales si hay conflicto de nombre)
    const pbTestimoniosFiltrados = pbTestimonios.filter(pbTest => {
      return !testimonialsData.find(local => local.name === pbTest.name)
    })
    
    // Combinar: locales primero, luego API al final
    const allTestimonios = [...testimonialsData, ...pbTestimoniosFiltrados]
    
    return allTestimonios
  } catch (error) {
    console.error('Error al obtener testimonios de PocketBase:', handlePBError(error))
    // Retornar solo testimonios locales en caso de error
    return testimonialsData
  }
}

/**
 * Obtener testimonios destacados
 */
export async function getTestimoniosDestacados(limit: number = 6): Promise<Testimonial[]> {
  try {
    const allTestimonios = await getAllTestimonios()
    return allTestimonios
      .filter(t => t.destacado)
      .sort((a, b) => (a.orden || 999) - (b.orden || 999))
      .slice(0, limit)
  } catch (error) {
    console.error('Error al obtener testimonios destacados:', handlePBError(error))
    return testimonialsData.filter(t => t.destacado).slice(0, limit)
  }
}

/**
 * Obtener testimonio por ID
 */
export async function getTestimonioById(id: number): Promise<Testimonial | null> {
  try {
    // Primero buscar en testimonios locales
    const localTestimonio = testimonialsData.find(t => t.id === id)
    if (localTestimonio) return localTestimonio
    
    // Si no está en locales, buscar en PocketBase
    const pb = getPocketBase()
    const pbId = id.toString(36).padStart(15, '0')
    const result = await pb.collection('Testimonios').getOne<PBTestimonio>(pbId)
    
    return mapPBTestimonioToLocal(result)
  } catch (error) {
    console.error('Error al obtener testimonio por ID:', handlePBError(error))
    return null
  }
}
