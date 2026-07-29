import { getPocketBase, getFileUrl, handlePBError, type PBRecord, type PBListResult } from '../pocketbase'
import { coursesData, type Course } from '../coursesData'

// Tipo para curso desde PocketBase
export interface PBCurso extends PBRecord {
  titulo: string
  subtitulo?: string
  descripcion_corta?: string
  descripcion_completa?: string
  categoria?: string
  duracion?: string
  modalidad?: string
  fecha_inicio?: string
  fecha_fin?: string
  horas?: string
  nombre_instructor?: string
  credenciales?: string
  experiencia?: string
  foto_instructor?: string
  objetivos?: string
  contenido_curso?: string
  requisitos?: string
  beneficios?: string
  institucion_certificacion?: string
  slug?: string
  codigo_area?: string
  area?: string
  carga_horaria?: number
  numero_niveles?: number
  destacado?: boolean
  disponible?: boolean
}

// Mapear curso de PocketBase a formato local
function mapPBCursoToLocal(pbCurso: PBCurso): Course {
  const pb = getPocketBase()
  
  return {
    id: parseInt(pbCurso.id.substring(0, 8), 36), // Generar ID numérico desde string
    title: pbCurso.titulo,
    subtitle: pbCurso.subtitulo || '',
    shortDescription: pbCurso.descripcion_corta || '',
    fullDescription: pbCurso.descripcion_completa || '',
    category: pbCurso.categoria || 'General',
    categoryLabel: pbCurso.area || pbCurso.categoria || 'General',
    duration: pbCurso.duracion || `${pbCurso.horas || 40} horas`,
    modality: pbCurso.modalidad ? [pbCurso.modalidad] : ['Virtual'],
    schedule: {
      startDate: pbCurso.fecha_inicio || 'Por definir',
      endDate: pbCurso.fecha_fin || 'Por definir',
      days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      time: '18:00 - 21:00',
    },
    instructor: {
      name: pbCurso.nombre_instructor || 'Instructor Experto',
      credentials: pbCurso.credenciales || '',
      experience: pbCurso.experiencia || '',
      photo: pbCurso.foto_instructor 
        ? getFileUrl(pbCurso.collectionId!, pbCurso.id, pbCurso.foto_instructor)
        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
    objectives: pbCurso.objetivos ? parseHTMLList(pbCurso.objetivos) : [],
    syllabus: pbCurso.contenido_curso ? parseHTMLList(pbCurso.contenido_curso) : [],
    requirements: pbCurso.requisitos ? parseHTMLList(pbCurso.requisitos) : [],
    benefits: pbCurso.beneficios ? parseHTMLList(pbCurso.beneficios) : [],
    certification: {
      institution: pbCurso.institucion_certificacion || 'SENECYT',
      type: 'Certificado Oficial',
      validity: 'Permanente',
    },
    price: {
      regular: 150,
      earlyBird: 120,
      currency: 'USD',
    },
    cargaHoraria: pbCurso.carga_horaria || 40,
    slug: pbCurso.slug || generateSlug(pbCurso.titulo),
    featured: pbCurso.destacado || false,
    available: pbCurso.disponible !== false,
  }
}

// Helper para parsear listas HTML desde editor
function parseHTMLList(html: string): string[] {
  if (!html) return []
  
  // Extraer texto de tags <li>, <p> o líneas
  const items: string[] = []
  const liMatches = html.match(/<li[^>]*>(.*?)<\/li>/gi)
  
  if (liMatches) {
    liMatches.forEach(match => {
      const text = match.replace(/<[^>]+>/g, '').trim()
      if (text) items.push(text)
    })
  } else {
    // Si no hay <li>, dividir por párrafos o saltos de línea
    const lines = html.split(/<\/p>|<br\s*\/?>/i)
    lines.forEach(line => {
      const text = line.replace(/<[^>]+>/g, '').trim()
      if (text && text.length > 3) items.push(text)
    })
  }
  
  return items
}

// Generar slug desde título
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Obtener todos los cursos (locales + API)
 */
export async function getAllCursos(): Promise<Course[]> {
  try {
    const pb = getPocketBase()
    
    // Intentar obtener cursos de PocketBase
    const result = await pb.collection('cursos').getList<PBCurso>(1, 50, {
      filter: 'disponible = true',
      sort: '-destacado,-created',
    })
    
    // Mapear cursos de PocketBase
    const pbCursos = result.items.map(mapPBCursoToLocal)
    
    // Eliminar duplicados (mantener solo locales si hay conflicto de slug)
    const pbCursosFiltrados = pbCursos.filter(pbCurso => {
      return !coursesData.find(local => local.slug === pbCurso.slug)
    })
    
    // Combinar: locales primero, luego API al final
    const allCursos = [...coursesData, ...pbCursosFiltrados]
    
    return allCursos
  } catch (error) {
    console.error('Error al obtener cursos de PocketBase:', handlePBError(error))
    // Retornar solo cursos locales en caso de error
    return coursesData
  }
}

/**
 * Obtener curso por slug
 */
export async function getCursoBySlug(slug: string): Promise<Course | null> {
  try {
    // Primero buscar en cursos locales
    const localCurso = coursesData.find(c => c.slug === slug)
    if (localCurso) return localCurso
    
    // Si no está en locales, buscar en PocketBase
    const pb = getPocketBase()
    const result = await pb.collection('cursos').getFirstListItem<PBCurso>(`slug = "${slug}"`)
    
    return mapPBCursoToLocal(result)
  } catch (error) {
    console.error('Error al obtener curso por slug:', handlePBError(error))
    return null
  }
}

/**
 * Obtener cursos destacados
 */
export async function getCursosDestacados(limit: number = 3): Promise<Course[]> {
  try {
    const allCursos = await getAllCursos()
    return allCursos.filter(c => c.featured).slice(0, limit)
  } catch (error) {
    console.error('Error al obtener cursos destacados:', handlePBError(error))
    return coursesData.filter(c => c.featured).slice(0, limit)
  }
}
