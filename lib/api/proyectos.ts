import { getPocketBase, getFileUrl, handlePBError, type PBRecord } from '../pocketbase'

// Tipo para proyecto desde PocketBase
export interface PBProyecto extends PBRecord {
  titulo: string
  descripcion?: string
  cliente?: string
  categoria?: string
  fecha_inicio?: string
  fecha_fin?: string
  ubicacion?: string
  imagenes?: string[]
  resultado?: string
  slug?: string
  destacado?: boolean
  estado?: string
}

export interface Proyecto {
  id: number
  title: string
  description: string
  client: string
  category: string
  startDate: string
  endDate?: string
  location: string
  images: string[]
  results: string
  slug: string
  featured: boolean
  status: string
}

// Datos locales de proyectos (fallback)
const proyectosData: Proyecto[] = []

// Mapear proyecto de PocketBase a formato local
function mapPBProyectoToLocal(pbProyecto: PBProyecto): Proyecto {
  const images: string[] = []
  if (pbProyecto.imagenes && pbProyecto.imagenes.length > 0) {
    pbProyecto.imagenes.forEach(filename => {
      images.push(getFileUrl(pbProyecto.collectionId!, pbProyecto.id, filename))
    })
  }

  return {
    id: parseInt(pbProyecto.id.substring(0, 8), 36),
    title: pbProyecto.titulo,
    description: pbProyecto.descripcion || '',
    client: pbProyecto.cliente || '',
    category: pbProyecto.categoria || 'General',
    startDate: pbProyecto.fecha_inicio || '',
    endDate: pbProyecto.fecha_fin,
    location: pbProyecto.ubicacion || '',
    images,
    results: pbProyecto.resultado || '',
    slug: pbProyecto.slug || generateSlug(pbProyecto.titulo),
    featured: pbProyecto.destacado || false,
    status: pbProyecto.estado || 'completado',
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
 * Obtener todos los proyectos (locales + API)
 */
export async function getAllProyectos(): Promise<Proyecto[]> {
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('proyectos').getList<PBProyecto>(1, 50, {
      sort: '-destacado,-created',
    })
    
    const pbProyectos = result.items.map(mapPBProyectoToLocal)
    
    // Eliminar duplicados (mantener solo locales si hay conflicto de slug)
    const pbProyectosFiltrados = pbProyectos.filter(pbProyecto => {
      return !proyectosData.find(local => local.slug === pbProyecto.slug)
    })
    
    // Combinar: locales primero, luego API al final
    const allProyectos = [...proyectosData, ...pbProyectosFiltrados]
    
    return allProyectos
  } catch (error) {
    console.error('Error al obtener proyectos:', handlePBError(error))
    return proyectosData
  }
}

/**
 * Obtener proyecto por slug
 */
export async function getProyectoBySlug(slug: string): Promise<Proyecto | null> {
  try {
    const localProyecto = proyectosData.find(p => p.slug === slug)
    if (localProyecto) return localProyecto
    
    const pb = getPocketBase()
    const result = await pb.collection('proyectos').getFirstListItem<PBProyecto>(`slug = "${slug}"`)
    
    return mapPBProyectoToLocal(result)
  } catch (error) {
    console.error('Error al obtener proyecto por slug:', handlePBError(error))
    return null
  }
}

/**
 * Obtener proyectos destacados
 */
export async function getProyectosDestacados(limit: number = 6): Promise<Proyecto[]> {
  try {
    const allProyectos = await getAllProyectos()
    return allProyectos.filter(p => p.featured).slice(0, limit)
  } catch (error) {
    console.error('Error al obtener proyectos destacados:', handlePBError(error))
    return proyectosData.filter(p => p.featured).slice(0, limit)
  }
}
