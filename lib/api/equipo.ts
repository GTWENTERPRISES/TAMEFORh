import { getPocketBase, getFileUrl, handlePBError, type PBRecord } from '../pocketbase'
import { teamData, type TeamMember } from '../teamData'

// Tipo para equipo consultor desde PocketBase
export interface PBEquipoConsultor extends PBRecord {
  nombre: string
  cargo?: string
  biografia?: string
  especialidades?: string
  experiencia?: string
  foto?: string
  email?: string
  linkedin?: string
  orden?: number
  activo?: boolean
}

// Mapear miembro de PocketBase a formato local
function mapPBEquipoToLocal(pbMiembro: PBEquipoConsultor): TeamMember {
  return {
    id: pbMiembro.id,
    name: pbMiembro.nombre,
    position: pbMiembro.cargo || 'Consultor',
    bio: pbMiembro.biografia ? pbMiembro.biografia.replace(/<[^>]+>/g, '').trim() : undefined,
    specialties: pbMiembro.especialidades 
      ? pbMiembro.especialidades.split(',').map(s => s.trim())
      : [],
    experience: pbMiembro.experiencia,
    photo: pbMiembro.foto 
      ? getFileUrl(pbMiembro.collectionId!, pbMiembro.id, pbMiembro.foto)
      : '/placeholder-user.jpg',
    email: pbMiembro.email,
    linkedin: pbMiembro.linkedin,
    order: pbMiembro.orden || 999,
    active: pbMiembro.activo !== false,
  }
}

/**
 * Obtener todos los miembros del equipo (locales + API)
 */
export async function getAllEquipo(): Promise<TeamMember[]> {
  // Siempre retornar datos locales primero
  let allEquipo = [...teamData]
  
  try {
    const pb = getPocketBase()
    
    const result = await pb.collection('equipo_consultor').getList<PBEquipoConsultor>(1, 50, {
      filter: 'activo = true',
      sort: 'orden,nombre',
    })
    
    // Mapear miembros de PocketBase
    const pbMiembros = result.items.map(mapPBEquipoToLocal)
    
    // Eliminar duplicados (mantener solo locales si hay conflicto de nombre)
    const pbMiembrosFiltrados = pbMiembros.filter(pbMiembro => {
      return !teamData.find(local => local.name === pbMiembro.name)
    })
    
    // Agregar datos de API al final de los locales
    allEquipo = [...teamData, ...pbMiembrosFiltrados]
  } catch (error) {
    // Silenciosamente usar solo datos locales si la API falla
    // No mostrar error en consola para mejor UX
  }
  
  return allEquipo
}

/**
 * Obtener miembro del equipo por ID
 */
export async function getMiembroById(id: string): Promise<TeamMember | null> {
  try {
    // Primero buscar en datos locales
    const localMiembro = teamData.find(m => m.id === id)
    if (localMiembro) return localMiembro
    
    // Si no está en locales, buscar en PocketBase
    const pb = getPocketBase()
    const result = await pb.collection('equipo_consultor').getOne<PBEquipoConsultor>(id)
    
    return mapPBEquipoToLocal(result)
  } catch (error) {
    console.error('Error al obtener miembro del equipo:', handlePBError(error))
    return null
  }
}

/**
 * Obtener miembros destacados del equipo (primeros N ordenados)
 */
export async function getEquipoDestacado(limit: number = 4): Promise<TeamMember[]> {
  try {
    const allTeam = await getAllEquipo()
    return allTeam.slice(0, limit)
  } catch (error) {
    console.error('Error al obtener equipo destacado:', handlePBError(error))
    return teamData.slice(0, limit)
  }
}
