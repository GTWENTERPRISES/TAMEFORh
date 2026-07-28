'use client'

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ClipboardCheck,
  GraduationCap,
  BookOpen,
  UserCog,
  Users,
  UserCircle,
  LogOut,
  Search,
  SlidersHorizontal,
  FileDown,
  FileSpreadsheet,
  Plus,
  Layers,
  Pencil,
  Trash2,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  loadDB,
  saveDB,
  newId,
  getSesion,
  clearSesion,
  exportCSV,
  exportExcel,
  type PlataformaDB,
  type Asistencia,
  type Calificacion,
  type Estudiante,
  type Docente,
  type Usuario,
  type CursoInterno,
  type Sesion,
} from "@/lib/plataformaData"

type Seccion = 'asistencias' | 'calificaciones' | 'cursos' | 'docentes' | 'estudiantes' | 'usuarios'

const NAV: { key: Seccion; label: string; icon: typeof Users }[] = [
  { key: 'asistencias', label: 'Asistencias', icon: ClipboardCheck },
  { key: 'calificaciones', label: 'Calificaciones', icon: GraduationCap },
  { key: 'cursos', label: 'Cursos', icon: BookOpen },
  { key: 'docentes', label: 'Docentes', icon: UserCog },
  { key: 'estudiantes', label: 'Estudiantes', icon: Users },
  { key: 'usuarios', label: 'Usuarios', icon: UserCircle },
]

const ESTADO_ASISTENCIA: Asistencia['estado'][] = ['presente', 'ausente', 'atraso', 'justificado']

const badgeAsistencia: Record<Asistencia['estado'], string> = {
  presente: 'bg-emerald-100 text-emerald-700',
  ausente: 'bg-red-100 text-red-700',
  atraso: 'bg-amber-100 text-amber-700',
  justificado: 'bg-blue-100 text-blue-700',
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function PlataformaDashboardClient() {
  const router = useRouter()
  const [sesion, setSesionState] = useState<Sesion | null>(null)
  const [db, setDb] = useState<PlataformaDB | null>(null)
  const [seccion, setSeccion] = useState<Seccion>('asistencias')
  const [busqueda, setBusqueda] = useState("")
  const [showFiltros, setShowFiltros] = useState(false)
  const [filtroCurso, setFiltroCurso] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Modales
  const [modal, setModal] = useState<null | 'asistencia' | 'masivo' | 'estudiante' | 'docente' | 'curso' | 'usuario' | 'calificacion'>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<Record<string, string>>({})
  const [masivoCurso, setMasivoCurso] = useState("")
  const [masivoEstados, setMasivoEstados] = useState<Record<string, Asistencia['estado']>>({})

  useEffect(() => {
    const s = getSesion()
    if (!s) {
      router.replace('/plataforma-interna')
      return
    }
    setSesionState(s)
    setDb(loadDB())
  }, [router])

  const update = (next: PlataformaDB) => {
    setDb({ ...next })
    saveDB(next)
  }

  const nombreEstudiante = (id: string) => db?.estudiantes.find((e) => e.id === id)?.nombre ?? '—'
  const nombreCurso = (id: string) => db?.cursos.find((c) => c.id === id)?.nombre ?? '—'
  const nombreDocente = (id: string) => db?.docentes.find((d) => d.id === id)?.nombre ?? '—'

  const q = busqueda.trim().toLowerCase()

  const asistenciasFiltradas = useMemo(() => {
    if (!db) return []
    return db.asistencias
      .filter((a) => !filtroCurso || a.cursoId === filtroCurso)
      .filter((a) => !filtroEstado || a.estado === filtroEstado)
      .filter((a) =>
        !q ||
        nombreEstudiante(a.estudianteId).toLowerCase().includes(q) ||
        nombreCurso(a.cursoId).toLowerCase().includes(q)
      )
      .sort((a, b) => b.fecha.localeCompare(a.fecha))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, q, filtroCurso, filtroEstado])

  const calificacionesFiltradas = useMemo(() => {
    if (!db) return []
    return db.calificaciones
      .filter((c) => !filtroCurso || c.cursoId === filtroCurso)
      .filter((c) =>
        !q ||
        nombreEstudiante(c.estudianteId).toLowerCase().includes(q) ||
        nombreCurso(c.cursoId).toLowerCase().includes(q)
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, q, filtroCurso])

  const filtraTexto = <T,>(items: T[], texto: (i: T) => string) =>
    items.filter((i) => !q || texto(i).toLowerCase().includes(q))

  if (!sesion || !db) {
    return (
      <div className="min-h-screen bg-[#0f2a45] flex items-center justify-center">
        <p className="text-white/60">Cargando…</p>
      </div>
    )
  }

  const cerrarSesion = () => {
    clearSesion()
    router.replace('/plataforma-interna')
  }

  const abrirModal = (tipo: typeof modal, id?: string, valores?: Record<string, string>) => {
    setEditId(id ?? null)
    setForm(valores ?? {})
    setModal(tipo)
  }

  const cerrarModal = () => {
    setModal(null)
    setEditId(null)
    setForm({})
    setMasivoCurso("")
    setMasivoEstados({})
  }

  const f = (k: string) => form[k] ?? ""
  const setF = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  // ---- Guardado por sección ----

  const guardarAsistencia = () => {
    if (!f('estudianteId') || !f('cursoId')) return
    const ahora = new Date()
    const nueva: Asistencia = {
      id: editId ?? newId('a'),
      estudianteId: f('estudianteId'),
      cursoId: f('cursoId'),
      fecha: editId ? f('fecha') : ahora.toISOString(),
      hora: f('hora') || `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`,
      estado: (f('estado') || 'presente') as Asistencia['estado'],
      justificacion: f('justificacion'),
    }
    const asistencias = editId
      ? db.asistencias.map((a) => (a.id === editId ? nueva : a))
      : [nueva, ...db.asistencias]
    update({ ...db, asistencias })
    cerrarModal()
  }

  const guardarMasivo = () => {
    if (!masivoCurso) return
    const ahora = new Date()
    const hora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`
    const inscritos = db.estudiantes.filter((e) => e.cursoIds.includes(masivoCurso))
    const nuevas: Asistencia[] = inscritos.map((e) => ({
      id: newId('a'),
      estudianteId: e.id,
      cursoId: masivoCurso,
      fecha: ahora.toISOString(),
      hora,
      estado: masivoEstados[e.id] ?? 'presente',
      justificacion: '',
    }))
    update({ ...db, asistencias: [...nuevas, ...db.asistencias] })
    cerrarModal()
  }

  const guardarCalificacion = () => {
    if (!f('estudianteId') || !f('cursoId')) return
    const nueva: Calificacion = {
      id: editId ?? newId('q'),
      estudianteId: f('estudianteId'),
      cursoId: f('cursoId'),
      parcial1: Number(f('parcial1')) || 0,
      parcial2: Number(f('parcial2')) || 0,
      trabajoFinal: Number(f('trabajoFinal')) || 0,
      observaciones: f('observaciones'),
    }
    const calificaciones = editId
      ? db.calificaciones.map((c) => (c.id === editId ? nueva : c))
      : [nueva, ...db.calificaciones]
    update({ ...db, calificaciones })
    cerrarModal()
  }

  const guardarEstudiante = () => {
    if (!f('nombre')) return
    const nuevo: Estudiante = {
      id: editId ?? newId('e'),
      nombre: f('nombre'),
      cedula: f('cedula'),
      email: f('email'),
      telefono: f('telefono'),
      cursoIds: f('cursoIds') ? f('cursoIds').split(',') : [],
      estado: (f('estado') || 'activo') as Estudiante['estado'],
    }
    const estudiantes = editId
      ? db.estudiantes.map((e) => (e.id === editId ? nuevo : e))
      : [...db.estudiantes, nuevo]
    update({ ...db, estudiantes })
    cerrarModal()
  }

  const guardarDocente = () => {
    if (!f('nombre')) return
    const nuevo: Docente = {
      id: editId ?? newId('d'),
      nombre: f('nombre'),
      cedula: f('cedula'),
      email: f('email'),
      telefono: f('telefono'),
      especialidad: f('especialidad'),
      cursoIds: f('cursoIds') ? f('cursoIds').split(',') : [],
      estado: (f('estado') || 'activo') as Docente['estado'],
    }
    const docentes = editId
      ? db.docentes.map((d) => (d.id === editId ? nuevo : d))
      : [...db.docentes, nuevo]
    update({ ...db, docentes })
    cerrarModal()
  }

  const guardarCurso = () => {
    if (!f('nombre')) return
    const nuevo: CursoInterno = {
      id: editId ?? newId('c'),
      nombre: f('nombre'),
      docenteId: f('docenteId'),
      horario: f('horario'),
      estado: (f('estado') || 'en-curso') as CursoInterno['estado'],
    }
    const cursos = editId
      ? db.cursos.map((c) => (c.id === editId ? nuevo : c))
      : [...db.cursos, nuevo]
    update({ ...db, cursos })
    cerrarModal()
  }

  const guardarUsuario = () => {
    if (!f('nombre') || !f('email')) return
    const nuevo: Usuario = {
      id: editId ?? newId('u'),
      nombre: f('nombre'),
      email: f('email'),
      rol: (f('rol') || 'secretaria') as Usuario['rol'],
      estado: (f('estado') || 'activo') as Usuario['estado'],
    }
    const usuarios = editId
      ? db.usuarios.map((u) => (u.id === editId ? nuevo : u))
      : [...db.usuarios, nuevo]
    update({ ...db, usuarios })
    cerrarModal()
  }

  const eliminar = (tipo: Seccion, id: string) => {
    if (!window.confirm('¿Eliminar este registro?')) return
    const next = { ...db }
    if (tipo === 'asistencias') next.asistencias = db.asistencias.filter((x) => x.id !== id)
    if (tipo === 'calificaciones') next.calificaciones = db.calificaciones.filter((x) => x.id !== id)
    if (tipo === 'estudiantes') next.estudiantes = db.estudiantes.filter((x) => x.id !== id)
    if (tipo === 'docentes') next.docentes = db.docentes.filter((x) => x.id !== id)
    if (tipo === 'cursos') next.cursos = db.cursos.filter((x) => x.id !== id)
    if (tipo === 'usuarios') next.usuarios = db.usuarios.filter((x) => x.id !== id)
    update(next)
  }

  // ---- Exportación por sección ----

  const exportar = (formato: 'csv' | 'excel') => {
    let headers: string[] = []
    let rows: string[][] = []
    if (seccion === 'asistencias') {
      headers = ['Estudiante', 'Curso', 'Fecha', 'Hora', 'Asistencia', 'Justificación']
      rows = asistenciasFiltradas.map((a) => [
        nombreEstudiante(a.estudianteId), nombreCurso(a.cursoId), a.fecha, a.hora, cap(a.estado), a.justificacion || '-',
      ])
    } else if (seccion === 'calificaciones') {
      headers = ['Estudiante', 'Curso', 'Parcial 1', 'Parcial 2', 'Trabajo Final', 'Promedio', 'Observaciones']
      rows = calificacionesFiltradas.map((c) => [
        nombreEstudiante(c.estudianteId), nombreCurso(c.cursoId),
        String(c.parcial1), String(c.parcial2), String(c.trabajoFinal),
        ((c.parcial1 + c.parcial2 + c.trabajoFinal) / 3).toFixed(2), c.observaciones || '-',
      ])
    } else if (seccion === 'cursos') {
      headers = ['Curso', 'Docente', 'Horario', 'Estado']
      rows = db.cursos.map((c) => [c.nombre, nombreDocente(c.docenteId), c.horario, cap(c.estado)])
    } else if (seccion === 'docentes') {
      headers = ['Nombre', 'Cédula', 'Email', 'Teléfono', 'Especialidad', 'Estado']
      rows = db.docentes.map((d) => [d.nombre, d.cedula, d.email, d.telefono, d.especialidad, cap(d.estado)])
    } else if (seccion === 'estudiantes') {
      headers = ['Nombre', 'Cédula', 'Email', 'Teléfono', 'Cursos', 'Estado']
      rows = db.estudiantes.map((e) => [
        e.nombre, e.cedula, e.email, e.telefono, e.cursoIds.map(nombreCurso).join(' | '), cap(e.estado),
      ])
    } else {
      headers = ['Nombre', 'Email', 'Rol', 'Estado']
      rows = db.usuarios.map((u) => [u.nombre, u.email, cap(u.rol), cap(u.estado)])
    }
    const nombre = `tamefor-${seccion}`
    if (formato === 'csv') exportCSV(headers, rows, nombre)
    else exportExcel(headers, rows, nombre)
  }

  const titulos: Record<Seccion, string> = {
    asistencias: 'Control de Asistencias',
    calificaciones: 'Registro de Calificaciones',
    cursos: 'Gestión de Cursos',
    docentes: 'Gestión de Docentes',
    estudiantes: 'Gestión de Estudiantes',
    usuarios: 'Gestión de Usuarios',
  }

  const selectClass = "w-full h-10 border-2 border-[#1a3a5c]/20 bg-white text-[#1a3a5c] text-sm px-3 focus:border-[#3d9a8b] focus:outline-none"

  const accionesCell = (tipo: Seccion, id: string, onEdit: () => void) => (
    <TableCell>
      <div className="flex gap-2">
        <button onClick={onEdit} className="p-1.5 text-[#1a3a5c] hover:bg-[#3d9a8b]/10 rounded" aria-label="Editar">
          <Pencil className="h-4 w-4" />
        </button>
        <button onClick={() => eliminar(tipo, id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" aria-label="Eliminar">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </TableCell>
  )

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-[#1a3a5c] to-[#0f2a45] flex flex-col transform transition-transform lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5K5il-aXvgEgMRMsZLVxpjVmIlhZEkfwsKOQ.jpg"
            alt="TAMEFOR Logo"
            className="h-12 w-auto rounded mb-3"
          />
          <p className="text-white font-bold leading-tight">Plataforma Interna TAMEFOR</p>
          <p className="text-white/60 text-xs">Sistema de Gestión</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setSeccion(key); setBusqueda(""); setFiltroCurso(""); setFiltroEstado(""); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                seccion === key ? 'bg-[#3d9a8b] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <div className="flex items-center gap-3 px-4 py-2 text-white/80 text-sm">
            <UserCircle className="h-5 w-5 text-[#3d9a8b]" />
            <div className="min-w-0">
              <p className="truncate font-medium">{sesion.nombre}</p>
              <p className="truncate text-xs text-white/50">{sesion.email}</p>
            </div>
          </div>
          <button
            onClick={cerrarSesion}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:bg-red-500/20 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Contenido */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Barra superior */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center gap-4">
          <button className="lg:hidden text-[#1a3a5c]" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">
            <Menu className="h-6 w-6" />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar..."
              className="pl-9 h-10 bg-slate-50 border-slate-200 text-[#1a3a5c]"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFiltros(!showFiltros)}
            className="border-slate-200 text-[#1a3a5c] gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros</span>
          </Button>
        </header>

        {/* Filtros */}
        {showFiltros && (seccion === 'asistencias' || seccion === 'calificaciones') && (
          <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap gap-3">
            <select value={filtroCurso} onChange={(e) => setFiltroCurso(e.target.value)} className={`${selectClass} max-w-xs`}>
              <option value="">Todos los cursos</option>
              {db.cursos.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
            {seccion === 'asistencias' && (
              <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className={`${selectClass} max-w-[180px]`}>
                <option value="">Todos los estados</option>
                {ESTADO_ASISTENCIA.map((s) => <option key={s} value={s}>{cap(s)}</option>)}
              </select>
            )}
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 overflow-x-auto">
          {/* Encabezado de sección */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-[#1a3a5c]">{titulos[seccion]}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-500 mr-1">Exportar:</span>
              <Button variant="outline" size="sm" onClick={() => exportar('csv')} className="gap-1.5 border-slate-300 text-[#1a3a5c]">
                <FileDown className="h-4 w-4" /> CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportar('excel')} className="gap-1.5 border-slate-300 text-[#1a3a5c]">
                <FileSpreadsheet className="h-4 w-4" /> Excel
              </Button>
              {seccion === 'asistencias' && (
                <>
                  <Button size="sm" onClick={() => abrirModal('asistencia')} className="gap-1.5 bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">
                    <Plus className="h-4 w-4" /> Registrar Asistencia
                  </Button>
                  <Button size="sm" onClick={() => abrirModal('masivo')} className="gap-1.5 bg-[#1a3a5c] hover:bg-[#0f2a45] text-white">
                    <Layers className="h-4 w-4" /> Registro Masivo
                  </Button>
                </>
              )}
              {seccion === 'calificaciones' && (
                <Button size="sm" onClick={() => abrirModal('calificacion')} className="gap-1.5 bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">
                  <Plus className="h-4 w-4" /> Nueva Calificación
                </Button>
              )}
              {seccion === 'cursos' && (
                <Button size="sm" onClick={() => abrirModal('curso')} className="gap-1.5 bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">
                  <Plus className="h-4 w-4" /> Nuevo Curso
                </Button>
              )}
              {seccion === 'docentes' && (
                <Button size="sm" onClick={() => abrirModal('docente')} className="gap-1.5 bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">
                  <Plus className="h-4 w-4" /> Nuevo Docente
                </Button>
              )}
              {seccion === 'estudiantes' && (
                <Button size="sm" onClick={() => abrirModal('estudiante')} className="gap-1.5 bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">
                  <Plus className="h-4 w-4" /> Nuevo Estudiante
                </Button>
              )}
              {seccion === 'usuarios' && (
                <Button size="sm" onClick={() => abrirModal('usuario')} className="gap-1.5 bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">
                  <Plus className="h-4 w-4" /> Nuevo Usuario
                </Button>
              )}
            </div>
          </div>

          {/* Tablas */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {seccion === 'asistencias' && (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Asistencia</TableHead>
                    <TableHead>Justificación</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {asistenciasFiltradas.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center text-slate-400 py-8">Sin registros</TableCell></TableRow>
                  )}
                  {asistenciasFiltradas.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium text-[#1a3a5c]">{nombreEstudiante(a.estudianteId)}</TableCell>
                      <TableCell className="max-w-xs">{nombreCurso(a.cursoId)}</TableCell>
                      <TableCell className="whitespace-nowrap">{a.fecha.slice(0, 10)}</TableCell>
                      <TableCell>{a.hora}</TableCell>
                      <TableCell>
                        <Badge className={`${badgeAsistencia[a.estado]} border-0`}>{cap(a.estado)}</Badge>
                      </TableCell>
                      <TableCell>{a.justificacion || '-'}</TableCell>
                      {accionesCell('asistencias', a.id, () =>
                        abrirModal('asistencia', a.id, {
                          estudianteId: a.estudianteId, cursoId: a.cursoId, fecha: a.fecha,
                          hora: a.hora, estado: a.estado, justificacion: a.justificacion,
                        })
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {seccion === 'calificaciones' && (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Parcial 1</TableHead>
                    <TableHead>Parcial 2</TableHead>
                    <TableHead>Trabajo Final</TableHead>
                    <TableHead>Promedio</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calificacionesFiltradas.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center text-slate-400 py-8">Sin registros</TableCell></TableRow>
                  )}
                  {calificacionesFiltradas.map((c) => {
                    const prom = (c.parcial1 + c.parcial2 + c.trabajoFinal) / 3
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium text-[#1a3a5c]">{nombreEstudiante(c.estudianteId)}</TableCell>
                        <TableCell className="max-w-xs">{nombreCurso(c.cursoId)}</TableCell>
                        <TableCell>{c.parcial1.toFixed(1)}</TableCell>
                        <TableCell>{c.parcial2.toFixed(1)}</TableCell>
                        <TableCell>{c.trabajoFinal.toFixed(1)}</TableCell>
                        <TableCell>
                          <Badge className={`border-0 ${prom >= 7 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {prom.toFixed(2)}
                          </Badge>
                        </TableCell>
                        {accionesCell('calificaciones', c.id, () =>
                          abrirModal('calificacion', c.id, {
                            estudianteId: c.estudianteId, cursoId: c.cursoId,
                            parcial1: String(c.parcial1), parcial2: String(c.parcial2),
                            trabajoFinal: String(c.trabajoFinal), observaciones: c.observaciones,
                          })
                        )}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}

            {seccion === 'cursos' && (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Curso</TableHead>
                    <TableHead>Docente</TableHead>
                    <TableHead>Horario</TableHead>
                    <TableHead>Estudiantes</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtraTexto(db.cursos, (c) => `${c.nombre} ${nombreDocente(c.docenteId)}`).map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium text-[#1a3a5c] max-w-md">{c.nombre}</TableCell>
                      <TableCell>{nombreDocente(c.docenteId)}</TableCell>
                      <TableCell>{c.horario}</TableCell>
                      <TableCell>{db.estudiantes.filter((e) => e.cursoIds.includes(c.id)).length}</TableCell>
                      <TableCell>
                        <Badge className={`border-0 ${c.estado === 'en-curso' ? 'bg-emerald-100 text-emerald-700' : c.estado === 'proximo' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                          {c.estado === 'en-curso' ? 'En curso' : c.estado === 'proximo' ? 'Próximo' : 'Finalizado'}
                        </Badge>
                      </TableCell>
                      {accionesCell('cursos', c.id, () =>
                        abrirModal('curso', c.id, { nombre: c.nombre, docenteId: c.docenteId, horario: c.horario, estado: c.estado })
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {seccion === 'docentes' && (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Nombre</TableHead>
                    <TableHead>Cédula</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtraTexto(db.docentes, (d) => `${d.nombre} ${d.email} ${d.especialidad}`).map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium text-[#1a3a5c]">{d.nombre}</TableCell>
                      <TableCell>{d.cedula}</TableCell>
                      <TableCell>{d.email}</TableCell>
                      <TableCell>{d.telefono}</TableCell>
                      <TableCell>{d.especialidad}</TableCell>
                      <TableCell>
                        <Badge className={`border-0 ${d.estado === 'activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{cap(d.estado)}</Badge>
                      </TableCell>
                      {accionesCell('docentes', d.id, () =>
                        abrirModal('docente', d.id, {
                          nombre: d.nombre, cedula: d.cedula, email: d.email, telefono: d.telefono,
                          especialidad: d.especialidad, cursoIds: d.cursoIds.join(','), estado: d.estado,
                        })
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {seccion === 'estudiantes' && (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Nombre</TableHead>
                    <TableHead>Cédula</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Cursos</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtraTexto(db.estudiantes, (e) => `${e.nombre} ${e.email} ${e.cedula}`).map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium text-[#1a3a5c]">{e.nombre}</TableCell>
                      <TableCell>{e.cedula}</TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>{e.telefono}</TableCell>
                      <TableCell className="max-w-xs">
                        <span className="text-xs text-slate-500">{e.cursoIds.length} curso(s)</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`border-0 ${e.estado === 'activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{cap(e.estado)}</Badge>
                      </TableCell>
                      {accionesCell('estudiantes', e.id, () =>
                        abrirModal('estudiante', e.id, {
                          nombre: e.nombre, cedula: e.cedula, email: e.email, telefono: e.telefono,
                          cursoIds: e.cursoIds.join(','), estado: e.estado,
                        })
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {seccion === 'usuarios' && (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtraTexto(db.usuarios, (u) => `${u.nombre} ${u.email} ${u.rol}`).map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium text-[#1a3a5c]">{u.nombre}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell><Badge className="bg-[#1a3a5c]/10 text-[#1a3a5c] border-0">{cap(u.rol)}</Badge></TableCell>
                      <TableCell>
                        <Badge className={`border-0 ${u.estado === 'activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{cap(u.estado)}</Badge>
                      </TableCell>
                      {accionesCell('usuarios', u.id, () =>
                        abrirModal('usuario', u.id, { nombre: u.nombre, email: u.email, rol: u.rol, estado: u.estado })
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </main>
      </div>

      {/* ---- Modales ---- */}

      {/* Registrar / editar asistencia */}
      <Dialog open={modal === 'asistencia'} onOpenChange={(o) => !o && cerrarModal()}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1a3a5c]">{editId ? 'Editar Asistencia' : 'Registrar Asistencia'}</DialogTitle>
            <DialogDescription>Registra la asistencia de un estudiante a un curso.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <select value={f('estudianteId')} onChange={(e) => setF('estudianteId', e.target.value)} className={selectClass}>
              <option value="">Selecciona estudiante…</option>
              {db.estudiantes.map((e) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
            </select>
            <select value={f('cursoId')} onChange={(e) => setF('cursoId', e.target.value)} className={selectClass}>
              <option value="">Selecciona curso…</option>
              {db.cursos.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
            <select value={f('estado') || 'presente'} onChange={(e) => setF('estado', e.target.value)} className={selectClass}>
              {ESTADO_ASISTENCIA.map((s) => <option key={s} value={s}>{cap(s)}</option>)}
            </select>
            <Input
              value={f('justificacion')}
              onChange={(e) => setF('justificacion', e.target.value)}
              placeholder="Justificación (opcional)"
              className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cerrarModal}>Cancelar</Button>
            <Button onClick={guardarAsistencia} className="bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Registro masivo */}
      <Dialog open={modal === 'masivo'} onOpenChange={(o) => !o && cerrarModal()}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1a3a5c]">Registro Masivo de Asistencia</DialogTitle>
            <DialogDescription>Selecciona un curso y marca la asistencia de todos sus estudiantes.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <select value={masivoCurso} onChange={(e) => { setMasivoCurso(e.target.value); setMasivoEstados({}) }} className={selectClass}>
              <option value="">Selecciona curso…</option>
              {db.cursos.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
            {masivoCurso && (
              <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-lg divide-y">
                {db.estudiantes.filter((e) => e.cursoIds.includes(masivoCurso)).map((e) => (
                  <div key={e.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <span className="text-sm font-medium text-[#1a3a5c]">{e.nombre}</span>
                    <select
                      value={masivoEstados[e.id] ?? 'presente'}
                      onChange={(ev) => setMasivoEstados((p) => ({ ...p, [e.id]: ev.target.value as Asistencia['estado'] }))}
                      className="h-8 border border-slate-300 bg-white text-[#1a3a5c] text-xs px-2 rounded"
                    >
                      {ESTADO_ASISTENCIA.map((s) => <option key={s} value={s}>{cap(s)}</option>)}
                    </select>
                  </div>
                ))}
                {db.estudiantes.filter((e) => e.cursoIds.includes(masivoCurso)).length === 0 && (
                  <p className="px-4 py-6 text-sm text-slate-400 text-center">No hay estudiantes inscritos en este curso</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cerrarModal}>Cancelar</Button>
            <Button onClick={guardarMasivo} disabled={!masivoCurso} className="bg-[#1a3a5c] hover:bg-[#0f2a45] text-white">Registrar Todo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Calificación */}
      <Dialog open={modal === 'calificacion'} onOpenChange={(o) => !o && cerrarModal()}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1a3a5c]">{editId ? 'Editar Calificación' : 'Nueva Calificación'}</DialogTitle>
            <DialogDescription>Notas sobre 10 puntos.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <select value={f('estudianteId')} onChange={(e) => setF('estudianteId', e.target.value)} className={selectClass}>
              <option value="">Selecciona estudiante…</option>
              {db.estudiantes.map((e) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
            </select>
            <select value={f('cursoId')} onChange={(e) => setF('cursoId', e.target.value)} className={selectClass}>
              <option value="">Selecciona curso…</option>
              {db.cursos.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-500">Parcial 1</label>
                <Input type="number" min="0" max="10" step="0.1" value={f('parcial1')} onChange={(e) => setF('parcial1', e.target.value)} className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Parcial 2</label>
                <Input type="number" min="0" max="10" step="0.1" value={f('parcial2')} onChange={(e) => setF('parcial2', e.target.value)} className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
              </div>
              <div>
                <label className="text-xs text-slate-500">T. Final</label>
                <Input type="number" min="0" max="10" step="0.1" value={f('trabajoFinal')} onChange={(e) => setF('trabajoFinal', e.target.value)} className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
              </div>
            </div>
            <Input value={f('observaciones')} onChange={(e) => setF('observaciones', e.target.value)} placeholder="Observaciones (opcional)" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cerrarModal}>Cancelar</Button>
            <Button onClick={guardarCalificacion} className="bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Estudiante */}
      <Dialog open={modal === 'estudiante'} onOpenChange={(o) => !o && cerrarModal()}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1a3a5c]">{editId ? 'Editar Estudiante' : 'Nuevo Estudiante'}</DialogTitle>
            <DialogDescription>Datos del estudiante y cursos inscritos.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input value={f('nombre')} onChange={(e) => setF('nombre', e.target.value)} placeholder="Nombre completo" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
            <div className="grid grid-cols-2 gap-3">
              <Input value={f('cedula')} onChange={(e) => setF('cedula', e.target.value)} placeholder="Cédula" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
              <Input value={f('telefono')} onChange={(e) => setF('telefono', e.target.value)} placeholder="Teléfono" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
            </div>
            <Input type="email" value={f('email')} onChange={(e) => setF('email', e.target.value)} placeholder="Correo electrónico" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
            <div>
              <label className="text-xs text-slate-500 block mb-1">Cursos inscritos</label>
              <div className="border border-slate-200 rounded-lg divide-y max-h-40 overflow-y-auto">
                {db.cursos.map((c) => {
                  const seleccionados = f('cursoIds') ? f('cursoIds').split(',') : []
                  const activo = seleccionados.includes(c.id)
                  return (
                    <label key={c.id} className="flex items-center gap-2 px-3 py-2 text-sm text-[#1a3a5c] cursor-pointer hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={activo}
                        onChange={() => {
                          const next = activo ? seleccionados.filter((x) => x !== c.id) : [...seleccionados, c.id]
                          setF('cursoIds', next.filter(Boolean).join(','))
                        }}
                      />
                      {c.nombre}
                    </label>
                  )
                })}
              </div>
            </div>
            <select value={f('estado') || 'activo'} onChange={(e) => setF('estado', e.target.value)} className={selectClass}>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cerrarModal}>Cancelar</Button>
            <Button onClick={guardarEstudiante} className="bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Docente */}
      <Dialog open={modal === 'docente'} onOpenChange={(o) => !o && cerrarModal()}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1a3a5c]">{editId ? 'Editar Docente' : 'Nuevo Docente'}</DialogTitle>
            <DialogDescription>Datos del docente.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input value={f('nombre')} onChange={(e) => setF('nombre', e.target.value)} placeholder="Nombre completo" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
            <div className="grid grid-cols-2 gap-3">
              <Input value={f('cedula')} onChange={(e) => setF('cedula', e.target.value)} placeholder="Cédula" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
              <Input value={f('telefono')} onChange={(e) => setF('telefono', e.target.value)} placeholder="Teléfono" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
            </div>
            <Input type="email" value={f('email')} onChange={(e) => setF('email', e.target.value)} placeholder="Correo electrónico" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
            <Input value={f('especialidad')} onChange={(e) => setF('especialidad', e.target.value)} placeholder="Especialidad" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
            <select value={f('estado') || 'activo'} onChange={(e) => setF('estado', e.target.value)} className={selectClass}>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cerrarModal}>Cancelar</Button>
            <Button onClick={guardarDocente} className="bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Curso */}
      <Dialog open={modal === 'curso'} onOpenChange={(o) => !o && cerrarModal()}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1a3a5c]">{editId ? 'Editar Curso' : 'Nuevo Curso'}</DialogTitle>
            <DialogDescription>Datos del curso.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input value={f('nombre')} onChange={(e) => setF('nombre', e.target.value)} placeholder="Nombre del curso" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
            <select value={f('docenteId')} onChange={(e) => setF('docenteId', e.target.value)} className={selectClass}>
              <option value="">Selecciona docente…</option>
              {db.docentes.map((d) => <option key={d.id} value={d.id}>{d.nombre}</option>)}
            </select>
            <Input value={f('horario')} onChange={(e) => setF('horario', e.target.value)} placeholder="Horario (ej: Lun-Mié 19:00-21:00)" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
            <select value={f('estado') || 'en-curso'} onChange={(e) => setF('estado', e.target.value)} className={selectClass}>
              <option value="en-curso">En curso</option>
              <option value="proximo">Próximo</option>
              <option value="finalizado">Finalizado</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cerrarModal}>Cancelar</Button>
            <Button onClick={guardarCurso} className="bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Usuario */}
      <Dialog open={modal === 'usuario'} onOpenChange={(o) => !o && cerrarModal()}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1a3a5c]">{editId ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
            <DialogDescription>Usuarios con acceso al sistema.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input value={f('nombre')} onChange={(e) => setF('nombre', e.target.value)} placeholder="Nombre completo" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
            <Input type="email" value={f('email')} onChange={(e) => setF('email', e.target.value)} placeholder="Correo electrónico" className="border-2 border-[#1a3a5c]/20 text-[#1a3a5c]" />
            <select value={f('rol') || 'secretaria'} onChange={(e) => setF('rol', e.target.value)} className={selectClass}>
              <option value="administrador">Administrador</option>
              <option value="docente">Docente</option>
              <option value="secretaria">Secretaría</option>
            </select>
            <select value={f('estado') || 'activo'} onChange={(e) => setF('estado', e.target.value)} className={selectClass}>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cerrarModal}>Cancelar</Button>
            <Button onClick={guardarUsuario} className="bg-[#3d9a8b] hover:bg-[#2f7a6e] text-white">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
