'use client'

import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ArrowRight, BookOpen, Users, Award } from "lucide-react"
import Link from "next/link"
import { coursesData } from "@/lib/coursesData"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const categoryFilters = [
  { value: 'todos', label: 'Todos los Cursos' },
  { value: 'administracion-general', label: 'Administración General' },
  { value: 'gestion-impacto-ambiental', label: 'Gestión Ambiental' },
  { value: 'legislacion', label: 'Legislación' },
  { value: 'manejo-recursos-naturales', label: 'Recursos Naturales' },
  { value: 'produccion-limpia', label: 'Producción Limpia' },
]

const categoryColors: Record<string, { bg: string; text: string; gradient: string }> = {
  'administracion-general': { 
    bg: 'bg-amber-500/20', 
    text: 'text-amber-300',
    gradient: 'from-[#1a3a5c] via-[#2d4a6c] to-amber-700'
  },
  'gestion-impacto-ambiental': { 
    bg: 'bg-emerald-500/20', 
    text: 'text-emerald-300',
    gradient: 'from-[#1a3a5c] via-[#1a3a5c] to-[#3d9a8b]'
  },
  'legislacion': { 
    bg: 'bg-violet-500/20', 
    text: 'text-violet-300',
    gradient: 'from-[#1a3a5c] via-[#2d3a6c] to-violet-700'
  },
  'manejo-recursos-naturales': { 
    bg: 'bg-teal-500/20', 
    text: 'text-teal-300',
    gradient: 'from-[#1a3a5c] via-[#1a4a5c] to-teal-700'
  },
  'produccion-limpia': { 
    bg: 'bg-lime-500/20', 
    text: 'text-lime-300',
    gradient: 'from-[#1a3a5c] via-[#2a4a3c] to-lime-800'
  },
}

export function CursosPageClient() {
  const [activeFilter, setActiveFilter] = useState('todos')

  const filteredCourses = activeFilter === 'todos' 
    ? coursesData 
    : coursesData.filter(course => course.category === activeFilter)

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
            alt="Capacitación"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a5c]/95 via-[#1a3a5c]/80 to-[#1a3a5c]/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
              <BookOpen className="w-5 h-5 text-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Capacitación Continua</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Oferta de<br />
              <span className="text-[#3d9a8b]">Capacitación Profesional</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl mb-8" variants={itemVariants}>
              Cursos avalados por el Ministerio del Trabajo y con código de registro en el SENECYT.
              Formación especializada para profesionales del sector forestal y ambiental.
            </motion.p>

            {/* Stats */}
            <motion.div className="flex flex-wrap gap-8" variants={itemVariants}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#3d9a8b]/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">10</p>
                  <p className="text-white/60 text-sm">Cursos Disponibles</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#3d9a8b]/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">120h</p>
                  <p className="text-white/60 text-sm">Carga Horaria</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#3d9a8b]/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">SENECYT</p>
                  <p className="text-white/60 text-sm">Certificación Avalada</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div className="flex items-center justify-center gap-2 mb-4" variants={itemVariants}>
              <BookOpen className="w-5 h-5 text-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Cursos por Capacitación Continua</span>
            </motion.div>
            <motion.h2
              className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight font-bold mb-4"
              variants={headerVariants}
            >
              Explora Nuestra<br />
              <span className="text-[#3d9a8b]">Oferta Académica</span>
            </motion.h2>
            <motion.p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg font-medium" variants={itemVariants}>
              Todos los cursos son modalidad virtual, con una carga horaria de 120 horas y certificación avalada por SENECYT
            </motion.p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {categoryFilters.map((filter) => (
              <motion.button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'bg-[#1a3a5c] text-white shadow-lg shadow-[#1a3a5c]/30 scale-105'
                    : 'bg-gray-100 text-[#1a3a5c]/70 hover:bg-[#3d9a8b]/10 hover:text-[#3d9a8b]'
                }`}
                variants={itemVariants}
                whileHover={{ scale: activeFilter === filter.value ? 1.05 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {filteredCourses.map((course, index) => {
              const colors = categoryColors[course.category] || categoryColors['gestion-impacto-ambiental']
              return (
                <motion.div
                  key={course.id}
                  className="group relative h-[560px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  layout
                >
                  {/* Background with gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
                  
                  {/* Decorative pattern */}
                  <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" />
                      <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1.5" />
                      <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col">
                    <div className="flex-1">
                      {/* Category & Area Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <motion.div
                          className={`${colors.bg} ${colors.text} rounded-full px-3 py-1.5 text-xs font-bold inline-block uppercase tracking-wider backdrop-blur-sm`}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          {course.categoryLabel}
                        </motion.div>
                        <motion.div
                          className="bg-white/10 text-white/80 rounded-full px-3 py-1.5 text-xs font-semibold inline-block backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.05, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          {course.codigoEspecialidad}
                        </motion.div>
                      </div>

                      <motion.h3
                        className="font-sans text-xl lg:text-2xl text-white mb-2 line-clamp-2 font-bold leading-tight"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {course.title}
                      </motion.h3>
                      {course.subtitle && (
                        <motion.p
                          className="text-white/90 text-sm mb-3 line-clamp-1 font-medium"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.15, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          {course.subtitle}
                        </motion.p>
                      )}
                      <motion.p
                        className="text-white/70 text-sm line-clamp-3 mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.2, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {course.shortDescription}
                      </motion.p>
                    </div>
                    
                    {/* Course Info */}
                    <motion.div
                      className="space-y-3 mb-6 text-sm"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.25, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">{course.cargaHoraria} horas</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">{course.modality.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">{course.tipoParticipante}</span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Link href={`/cursos/${course.slug}`}>
                        <Button className="w-full bg-white hover:bg-[#3d9a8b] text-[#1a3a5c] hover:text-white rounded-full font-bold py-3 transition-all duration-300 shadow-lg hover:shadow-xl group/btn hover:scale-105">
                          Ver Detalles del Curso
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div 
              className="bg-gradient-to-r from-[#1a3a5c] to-[#3d9a8b] rounded-3xl p-10 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                ¿Necesitas más información?
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Contáctanos para conocer sobre descuentos para miembros TAMEFOR, afiliados CONIFOR y estudiantes.
              </p>
              <Link href="/contacto">
                <Button className="bg-white hover:bg-white/90 text-[#1a3a5c] rounded-full font-bold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Contáctanos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
