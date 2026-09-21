'use client'

import { Clock, MapPin, ArrowRight, BookOpen, Users, Award, GraduationCap, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import { getAllCursos } from "@/lib/api/cursos"
import type { Course } from "@/lib/coursesData"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionHeader } from "@/components/ui"
import { containerVariants, itemVariants } from "@/lib/animations"

const AUTO_ROTATE_MS = 3500

const categoryColors: Record<string, { bar: string; badge: string }> = {
  'administracion-general': {
    bar: 'bg-[#1a3a5c]',
    badge: 'bg-[#1a3a5c]/10 text-[#1a3a5c]',
  },
  'gestion-impacto-ambiental': {
    bar: 'bg-[#3d9a8b]',
    badge: 'bg-[#3d9a8b]/10 text-[#3d9a8b]',
  },
  'legislacion': {
    bar: 'bg-[#1a3a5c]',
    badge: 'bg-[#1a3a5c]/10 text-[#1a3a5c]',
  },
  'manejo-recursos-naturales': {
    bar: 'bg-[#3d9a8b]',
    badge: 'bg-[#3d9a8b]/10 text-[#3d9a8b]',
  },
  'produccion-limpia': {
    bar: 'bg-[#1a3a5c]',
    badge: 'bg-[#1a3a5c]/10 text-[#1a3a5c]',
  },
}

export function CursosPageClient() {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCourse, setActiveCourse] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionInView = useRef(false)

  useEffect(() => {
    async function loadCursos() {
      try {
        const cursos = await getAllCursos()
        setFilteredCourses(cursos)
      } catch (error) {
        console.error('Error al cargar cursos:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadCursos()
  }, [])

  useEffect(() => {
    if (filteredCourses.length === 0 || isPaused || !sectionInView.current) return
    const timer = setTimeout(() => {
      setActiveCourse((prev) => (prev + 1) % filteredCourses.length)
    }, AUTO_ROTATE_MS)
    return () => clearTimeout(timer)
  }, [activeCourse, filteredCourses.length, isPaused])

  const gridRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { sectionInView.current = entry.isIntersecting },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleHover = useCallback((i: number) => {
    setIsPaused(true)
    setActiveCourse(i)
  }, [])

  const handleLeave = useCallback(() => {
    setIsPaused(false)
  }, [])

  return (
    <>
      <PageHeader
        badge="Capacitación Continua"
        title="Oferta de"
        titleHighlight="Capacitación Profesional"
        subtitle="Cursos avalados por el Ministerio del Trabajo y con código de registro en el SENECYT. Formación especializada para profesionales del sector forestal y ambiental."
        backgroundImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
      />

      {/* ═══ Courses Grid ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative blobs */}
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a3a5c]/5 rounded-full blur-3xl -ml-48 -mb-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={GraduationCap}
            subtitle="Cursos por Capacitación Continua"
            title="Explora Nuestra"
            titleHighlight="Oferta Académica"
            description="Todos los cursos son modalidad virtual, con una carga horaria de 120 horas y certificación avalada por SENECYT"
            centered
          />

          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 max-w-7xl mx-auto">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#3d9a8b] border-r-transparent" />
                <p className="mt-4 text-[#1a3a5c]/70">Cargando cursos...</p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-[#1a3a5c]/70">No hay cursos disponibles</p>
              </div>
            ) : (
              filteredCourses.map((course, index) => {
                const colors = categoryColors[course.category] || categoryColors['gestion-impacto-ambiental']
                const isActive = activeCourse === index
                return (
                  <motion.div
                    key={course.id}
                    className="group relative cursor-pointer"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={handleLeave}
                  >
                    <Link href={`/cursos/${course.slug}`}>
                      <div
                        className={`relative overflow-hidden h-full transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] shadow-2xl shadow-[#3d9a8b]/20 scale-[1.02]"
                            : "bg-white border border-[#1a3a5c]/10 shadow-md hover:shadow-xl"
                        }`}
                      >
                        {/* Shine sweep */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>

                        {/* Top accent line with animated fill */}
                        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#3d9a8b] via-[#5bc4b1] to-[#3d9a8b]"
                            initial={false}
                            animate={{ width: isActive ? "100%" : "40%" }}
                            transition={{ duration: isActive ? AUTO_ROTATE_MS / 1000 : 0.4, ease: isActive ? "linear" : "easeOut" }}
                          />
                        </div>

                        <div className="p-7 lg:p-8 flex flex-col h-full">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center gap-4">
                              <motion.div
                                className={`flex items-center justify-center w-14 h-14 transition-all duration-500 ${
                                  isActive
                                    ? "bg-[#3d9a8b] shadow-lg shadow-[#3d9a8b]/30"
                                    : "bg-[#3d9a8b]/10 group-hover:bg-[#3d9a8b]/20"
                                }`}
                                animate={isActive ? { rotate: [0, 8, -4, 0] } : { rotate: 0 }}
                                transition={{ duration: 0.6 }}
                              >
                                <GraduationCap className={`w-7 h-7 transition-colors duration-500 ${
                                  isActive ? "text-white" : "text-[#3d9a8b]"
                                }`} />
                              </motion.div>
                              <div>
                                <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
                                  isActive ? "text-[#3d9a8b]" : "text-[#3d9a8b]/70"
                                }`}>
                                  {course.categoryLabel}
                                </span>
                              </div>
                            </div>

                            <motion.div
                              className={`flex items-center justify-center w-10 h-10 transition-all duration-500 ${
                                isActive
                                  ? "bg-[#3d9a8b]/20 border border-[#3d9a8b]/40"
                                  : "bg-[#1a3a5c]/5 group-hover:bg-[#3d9a8b]/10"
                              }`}
                              animate={isActive ? { x: [0, 4, 0] } : {}}
                              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
                            >
                              <ArrowRight className={`w-4 h-4 transition-all duration-500 ${
                                isActive
                                  ? "text-[#3d9a8b]"
                                  : "text-[#1a3a5c]/40 group-hover:text-[#3d9a8b] group-hover:translate-x-0.5"
                              }`} />
                            </motion.div>
                          </div>

                          {/* Title */}
                          <h3 className={`text-xl lg:text-2xl font-bold leading-tight mb-3 line-clamp-2 transition-colors duration-500 ${
                            isActive ? "text-white" : "text-[#1a3a5c]"
                          }`}>
                            {course.title}
                          </h3>

                          {/* Subtitle */}
                          {course.subtitle && (
                            <p className={`text-sm mb-3 line-clamp-1 font-medium transition-colors duration-500 ${
                              isActive ? "text-[#3d9a8b]" : "text-[#3d9a8b]/80"
                            }`}>
                              {course.subtitle}
                            </p>
                          )}

                          {/* Description */}
                          <p className={`text-sm leading-relaxed mb-6 line-clamp-3 transition-colors duration-500 ${
                            isActive ? "text-white/70" : "text-[#1a3a5c]/60"
                          }`}>
                            {course.shortDescription}
                          </p>

                          {/* Course Info */}
                          <div className="space-y-2.5 mb-6 flex-1">
                            {[
                              { icon: Clock, label: `${course.cargaHoraria} horas` },
                              { icon: MapPin, label: course.modality.join(", ") },
                            ].map((info, idx) => (
                              <motion.div
                                key={idx}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08 + idx * 0.05 + 0.2 }}
                                viewport={{ once: true }}
                              >
                                <motion.div
                                  className={`w-5 h-5 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                                    isActive
                                      ? "border border-[#3d9a8b]/60 bg-[#3d9a8b]/20"
                                      : "border border-[#3d9a8b]/30 bg-[#3d9a8b]/5"
                                  }`}
                                  animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                                >
                                  <info.icon className={`h-3 w-3 transition-colors duration-500 ${
                                    isActive ? "text-[#3d9a8b]" : "text-[#3d9a8b]/70"
                                  }`} />
                                </motion.div>
                                <span className={`text-sm transition-colors duration-500 ${
                                  isActive ? "text-white/80" : "text-[#1a3a5c]/70"
                                }`}>
                                  {info.label}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className={`pt-5 border-t transition-colors duration-500 ${
                            isActive ? "border-white/10" : "border-[#1a3a5c]/10"
                          }`}>
                            <div className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                              isActive ? "text-[#3d9a8b]" : "text-[#3d9a8b] group-hover:gap-3"
                            }`}>
                              Ver Detalles del Curso
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>

                        {/* Bottom animated line */}
                        <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
                          isActive
                            ? "w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]"
                            : "w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]"
                        }`} />
                      </div>
                    </Link>
                  </motion.div>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* ═══ Stats Banner ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-20">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />
        <motion.div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px]" />

        <div className="container-max relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: "120", label: "Horas por Curso" },
              { value: "100%", label: "Modalidad Virtual" },
              { value: "SENECYT", label: "Certificación Avalada" },
              { value: "5+", label: "Áreas de Formación" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-[#3d9a8b] mb-2">{stat.value}</p>
                <p className="text-white/60 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section className="relative overflow-hidden bg-white py-20">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mt-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              variants={itemVariants}
            >
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">
                Inscríbete Ahora
              </span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-6"
              variants={itemVariants}
            >
              ¿Listo para impulsar tu{" "}
              <span className="text-[#3d9a8b]">carrera profesional?</span>
            </motion.h2>

            <motion.p
              className="text-[#1a3a5c]/70 text-lg mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Nuestros cursos te brindan las herramientas y conocimientos necesarios para destacarte en el sector forestal y ambiental con certificación avalada.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link href="/contacto">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                             bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                             shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                             transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contáctanos Ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
