'use client'

import { Button } from "@/components/ui/button"
import { Clock, MapPin, ArrowRight, BookOpen, Users, Award } from "lucide-react"
import Link from "next/link"
import { coursesData } from "@/lib/coursesData"
import Image from "next/image"
import { motion } from "framer-motion"

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
  const filteredCourses = coursesData

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
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-white font-semibold uppercase tracking-wider text-sm">Capacitación Continua</span>
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
                <div className="w-12 h-12 bg-[#3d9a8b]/20 border border-[#3d9a8b]/30 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">10</p>
                  <p className="text-white/60 text-sm">Cursos Disponibles</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#3d9a8b]/20 border border-[#3d9a8b]/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">120h</p>
                  <p className="text-white/60 text-sm">Carga Horaria</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#3d9a8b]/20 border border-[#3d9a8b]/30 flex items-center justify-center">
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 blur-3xl -ml-48 -mb-48" />

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
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Cursos por Capacitación Continua</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </motion.div>
            <motion.h2
              className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight font-bold mb-4"
              variants={headerVariants}
            >
              Explora Nuestra<br />
              <span className="text-[#3d9a8b]">Oferta Académica</span>
            </motion.h2>
            <motion.p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg" variants={itemVariants}>
              Todos los cursos son modalidad virtual, con una carga horaria de 120 horas y certificación avalada por SENECYT
            </motion.p>
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
                  className="group relative h-full flex flex-col bg-white border border-[#3d9a8b]/20 hover:border-[#3d9a8b] transition-all duration-300"
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  layout
                >
                  {/* Top accent bar by category */}
                  <div className={`h-1.5 w-full ${colors.bar}`} />

                  {/* Content */}
                  <div className="relative flex flex-col flex-1 p-8">
                    <div className="flex-1">
                      {/* Category & Code Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`${colors.badge} px-3 py-1.5 text-xs font-bold uppercase tracking-wider`}>
                          {course.categoryLabel}
                        </span>
                        <span className="bg-[#1a3a5c]/5 text-[#1a3a5c]/70 px-3 py-1.5 text-xs font-semibold">
                          {course.codigoEspecialidad}
                        </span>
                      </div>

                      <h3 className="font-sans text-xl lg:text-2xl text-[#1a3a5c] mb-2 line-clamp-2 font-bold leading-tight">
                        {course.title}
                      </h3>
                      {course.subtitle && (
                        <p className="text-[#3d9a8b] text-sm mb-3 line-clamp-1 font-semibold">
                          {course.subtitle}
                        </p>
                      )}
                      <p className="text-[#1a3a5c]/70 text-sm line-clamp-3 mb-6 leading-relaxed">
                        {course.shortDescription}
                      </p>
                    </div>

                    {/* Course Info */}
                    <div className="space-y-3 mb-6 text-sm border-t border-[#3d9a8b]/15 pt-5">
                      <div className="flex items-center gap-3 text-[#1a3a5c]/80">
                        <div className="w-8 h-8 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-4 w-4 text-[#3d9a8b]" />
                        </div>
                        <span className="font-medium">{course.cargaHoraria} horas</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#1a3a5c]/80">
                        <div className="w-8 h-8 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-4 w-4 text-[#3d9a8b]" />
                        </div>
                        <span className="font-medium">{course.modality.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#1a3a5c]/80">
                        <div className="w-8 h-8 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                          <Users className="h-4 w-4 text-[#3d9a8b]" />
                        </div>
                        <span className="font-medium">{course.tipoParticipante}</span>
                      </div>
                    </div>

                    <Link href={`/cursos/${course.slug}`}>
                      <Button className="w-full bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white font-semibold py-2.5 transition-all duration-300 shadow-lg hover:shadow-xl group/btn border-2 border-[#1a3a5c] hover:border-[#3d9a8b]">
                        Ver Detalles del Curso
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </>
  )
}
