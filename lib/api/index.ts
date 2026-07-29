/**
 * API Central de PocketBase - TAMEFOR
 * 
 * Este archivo exporta todas las funciones de las APIs de PocketBase
 * para facilitar las importaciones en los componentes.
 * 
 * Uso:
 * import { getAllCursos, createMensajeContacto } from '@/lib/api'
 */

// Cursos
export {
  getAllCursos,
  getCursoBySlug,
  getCursosDestacados,
  type PBCurso,
} from './cursos'

// Noticias
export {
  getAllNoticias,
  getNoticiaBySlug,
  getLatestNoticias,
  type PBNoticia,
} from './noticias'

// Proyectos
export {
  getAllProyectos,
  getProyectoBySlug,
  getProyectosDestacados,
  type PBProyecto,
} from './proyectos'

// Biblioteca
export {
  getAllDocumentos,
  getDocumentosByTipo,
  getDocumentoBySlug,
  searchDocumentos,
  type PBDocumento,
} from './biblioteca'

// Equipo Consultor
export {
  getAllEquipo,
  getMiembroById,
  getEquipoDestacado,
  type PBEquipoConsultor,
} from './equipo'

// Re-exportar tipo TeamMember desde teamData
export type { TeamMember } from '../teamData'

// Inscripciones
export {
  createInscripcion,
  getInscripcionesByEmail,
  getInscripcionesByCurso,
  getInscripcionById,
  type PBInscripcion,
  type Inscripcion,
} from './inscripciones'

// Mensajes de Contacto
export {
  createMensajeContacto,
  getAllMensajes,
  getMensajesByEstado,
  getMensajeById,
  marcarMensajeRespondido,
  type PBMensajeContacto,
  type MensajeContacto,
} from './mensajes'

// Pagos
export {
  createPago,
  getAllPagos,
  getPagosByEmail,
  getPagosByEstado,
  getPagoById,
  updateEstadoPago,
  getTotalPagosByPeriodo,
  type PBPago,
  type Pago,
} from './pagos'

// Solicitudes de Información
export {
  createSolicitudInformacion,
  getAllSolicitudes,
  getSolicitudesByEstado,
  getSolicitudById,
  marcarSolicitudAtendida,
  type PBSolicitudInformacion,
  type SolicitudInformacion,
} from './solicitudes'

// Testimonios
export {
  getAllTestimonios,
  getTestimoniosDestacados,
  getTestimonioById,
  type PBTestimonio,
} from './testimonios'
