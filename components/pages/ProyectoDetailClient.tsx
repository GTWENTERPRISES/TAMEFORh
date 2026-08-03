'use client'

import type { Project } from "@/lib/projectsData"
import { motion } from "framer-motion"
import { 
  MapPin, Calendar, Clock, Users, ArrowLeft, Share2, 
  Target, Activity, TrendingUp, CheckCircle2, Quote,
  Facebook, Twitter, Linkedin, Mail, Copy
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ProyectoDetailClientProps {
  project: Project
}

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

export function ProyectoDetailClient({ project }: ProyectoDetailClientProps) {
  return (
    <>
      {/* Project Header */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#1a3a5c] via-[#0f2642] to-[#1a3a5c] relative overflow-hidden">
        {/* Elegant decorative pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(61, 154, 139, 0.1) 35px, rgba(61, 154, 139, 0.1) 70px)'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-6 md:mb-8">
              <Link href="/proyectos">
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all text-sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver a proyectos
                </Button>
              </Link>
            </motion.div>
            
            {/* Project badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
              <div className="bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-2.5 border border-white/20 rounded-sm">
                <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Proyecto</span>
                <span className="text-[#3d9a8b] text-sm font-bold ml-2">#{project.number}</span>
              </div>
              <div className="bg-[#3d9a8b]/20 backdrop-blur-sm px-4 md:px-6 py-2 md:py-2.5 border border-[#3d9a8b]/40 rounded-sm">
                <span className="text-[#3d9a8b] text-xs uppercase tracking-widest font-bold">{project.categoryLabel}</span>
              </div>
              <div className={`backdrop-blur-sm px-4 md:px-6 py-2 md:py-2.5 border rounded-sm ${
                project.status === 'completado' 
                  ? 'bg-green-500/20 border-green-500/40 text-green-300'
                  : project.status === 'en-curso' 
                  ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                  : 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300'
              }`}>
                <span className="text-xs uppercase tracking-widest font-bold">
                  {project.status === 'completado' ? '✓ Completado' 
                  : project.status === 'en-curso' ? '▶ En Curso' : '⏱ Planificado'}
                </span>
              </div>
            </motion.div>
            
            {/* Project title */}
            <motion.div variants={itemVariants}>
              <h1 className="font-sans text-2xl md:text-4xl lg:text-5xl text-white font-bold leading-tight mb-4">
                {project.title}
              </h1>
              <div className="w-20 md:w-24 h-1 bg-[#3d9a8b] mb-4 md:mb-6" />
              <p className="text-base md:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-4xl">
                {project.subtitle}
              </p>
            </motion.div>
            
            {/* Project meta info */}
            <motion.div
              variants={itemVariants}
              className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 rounded-sm hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-[#3d9a8b]/20 flex items-center justify-center rounded-sm flex-shrink-0">
                    <MapPin className="h-5 md:h-6 w-5 md:w-6 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Ubicación</p>
                    <p className="text-white font-semibold text-sm md:text-base">{project.location}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 rounded-sm hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-[#3d9a8b]/20 flex items-center justify-center rounded-sm flex-shrink-0">
                    <Calendar className="h-5 md:h-6 w-5 md:w-6 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Inicio</p>
                    <p className="text-white font-semibold text-sm md:text-base">{project.startDate}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 rounded-sm hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-[#3d9a8b]/20 flex items-center justify-center rounded-sm flex-shrink-0">
                    <Clock className="h-5 md:h-6 w-5 md:w-6 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Duración</p>
                    <p className="text-white font-semibold text-sm md:text-base">{project.duration}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Image */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative h-[300px] md:h-[500px] overflow-hidden shadow-2xl">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white/90 text-sm md:text-lg leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6 md:space-y-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
              >
                {/* Description */}
                <motion.div variants={itemVariants} className="bg-white p-6 md:p-10 shadow-sm border-l-4 border-[#3d9a8b]">
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                      <div className="w-5 md:w-6 h-5 md:h-6 border-2 border-[#3d9a8b]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1a3a5c]/50 uppercase tracking-widest font-semibold mb-1">Descripción</p>
                      <h2 className="text-xl md:text-2xl font-bold text-[#1a3a5c]">Sobre el Proyecto</h2>
                    </div>
                  </div>
                  <p className="text-[#1a3a5c]/70 leading-relaxed text-justify text-sm md:text-base">
                    {project.fullDescription}
                  </p>
                </motion.div>

                {/* Objectives */}
                <motion.div variants={itemVariants} className="bg-white p-6 md:p-10 shadow-sm border-l-4 border-[#3d9a8b]">
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 md:h-6 w-5 md:w-6 text-[#3d9a8b]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1a3a5c]/50 uppercase tracking-widest font-semibold mb-1">Objetivos</p>
                      <h2 className="text-xl md:text-2xl font-bold text-[#1a3a5c]">Metas del Proyecto</h2>
                    </div>
                  </div>
                  <div className="grid gap-3 md:gap-4">
                    {project.objectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 border-l-2 border-[#3d9a8b]/30 hover:border-[#3d9a8b] hover:bg-gray-100 transition-all">
                        <div className="w-7 md:w-8 h-7 md:h-8 bg-[#3d9a8b]/10 flex items-center justify-center flex-shrink-0 rounded-full">
                          <CheckCircle2 className="h-4 md:h-5 w-4 md:w-5 text-[#3d9a8b]" />
                        </div>
                        <p className="text-[#1a3a5c]/70 pt-1 text-sm md:text-base">{objective}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Activities */}
                <motion.div variants={itemVariants} className="bg-white p-6 md:p-10 border-l-4 border-[#3d9a8b] shadow-lg">
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                      <Activity className="h-5 md:h-6 w-5 md:w-6 text-[#3d9a8b]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1a3a5c]/50 uppercase tracking-widest font-semibold mb-1">Actividades</p>
                      <h2 className="text-xl md:text-2xl font-bold text-[#1a3a5c]">Acciones Realizadas</h2>
                    </div>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {project.activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-gray-50 border-l-2 border-[#3d9a8b]/30 hover:border-[#3d9a8b] hover:bg-gray-100 transition-all">
                        <div className="flex items-center justify-center w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-[#1a3a5c] to-[#163250] text-white font-bold flex-shrink-0 text-xs md:text-sm">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <p className="text-[#1a3a5c]/70 pt-1 md:pt-2 leading-relaxed text-sm md:text-base">{activity}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Results */}
                <motion.div variants={itemVariants} className="bg-white p-6 md:p-10 border-l-4 border-[#3d9a8b] shadow-lg">
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 md:h-6 w-5 md:w-6 text-[#3d9a8b]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1a3a5c]/50 uppercase tracking-widest font-semibold mb-1">Logros</p>
                      <h2 className="text-xl md:text-2xl font-bold text-[#1a3a5c]">Resultados Destacados</h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {project.results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] p-6 md:p-8 border-l-4 border-[#3d9a8b] text-white hover:shadow-xl transition-all overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-[#3d9a8b]/5 rounded-full blur-2xl" />
                        <div className="relative">
                          <p className="text-3xl md:text-5xl font-bold mb-2 md:mb-3 text-[#3d9a8b] group-hover:scale-110 transition-transform">{result.value}</p>
                          <p className="font-bold mb-2 text-base md:text-lg">{result.title}</p>
                          <p className="text-xs md:text-sm text-white/80 leading-relaxed">{result.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Impact */}
                <motion.div variants={itemVariants} className="bg-white p-6 md:p-10 border-l-4 border-[#3d9a8b] shadow-lg">
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 md:h-6 w-5 md:w-6 text-[#3d9a8b]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1a3a5c]/50 uppercase tracking-widest font-semibold mb-1">Impacto</p>
                      <h2 className="text-xl md:text-2xl font-bold text-[#1a3a5c]">Beneficios del Proyecto</h2>
                    </div>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {project.impact.map((impact, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-gradient-to-r from-gray-50 to-white border-l-2 border-[#3d9a8b]/30 hover:border-[#3d9a8b] hover:from-gray-100 hover:to-gray-50 transition-all"
                      >
                        <div className="w-7 md:w-8 h-7 md:h-8 bg-[#3d9a8b]/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-4 md:h-5 w-4 md:w-5 text-[#3d9a8b]" />
                        </div>
                        <p className="text-[#1a3a5c]/70 pt-1 leading-relaxed text-sm md:text-base">{impact}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Testimonial */}
                {project.testimonial && (
                  <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] p-8 md:p-12 border-l-4 border-[#3d9a8b] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-[#3d9a8b]/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-[#3d9a8b]/5 rounded-full blur-3xl" />
                    <div className="relative">
                      <Quote className="h-12 md:h-16 w-12 md:w-16 text-[#3d9a8b] mb-6 md:mb-8 opacity-50" />
                      <blockquote className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed mb-6 md:mb-8 font-light italic">
                        "{project.testimonial.text}"
                      </blockquote>
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-1 h-12 md:h-16 bg-[#3d9a8b]" />
                        <div className="text-white">
                          <p className="font-bold text-base md:text-lg">{project.testimonial.author}</p>
                          <p className="text-white/80 text-xs md:text-sm">{project.testimonial.position}</p>
                          <p className="text-white/60 text-xs md:text-sm">{project.testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Gallery */}
                {project.images.length > 1 && (
                  <motion.div variants={itemVariants} className="bg-white p-6 md:p-10 border-l-4 border-[#3d9a8b] shadow-lg">
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                      <div className="w-10 md:w-12 h-10 md:h-12 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                        <div className="w-5 md:w-6 h-5 md:h-6 border-2 border-[#3d9a8b]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#1a3a5c]/50 uppercase tracking-widest font-semibold mb-1">Imágenes</p>
                        <h2 className="text-xl md:text-2xl font-bold text-[#1a3a5c]">Galería del Proyecto</h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {project.images.slice(1).map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                        >
                          <div className="relative h-56 md:h-72 overflow-hidden">
                            <img
                              src={image}
                              alt={`${project.title} - Imagen ${index + 2}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-xs md:text-sm font-semibold">Imagen {index + 2}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 md:space-y-8">
              {/* Project Info */}
              <div className="bg-white p-6 md:p-8 border-l-4 border-[#3d9a8b] shadow-lg lg:sticky lg:top-6">
                <h3 className="font-bold text-[#1a3a5c] mb-6 md:mb-8 text-lg md:text-xl flex items-center gap-3">
                  <div className="w-6 md:w-8 h-1 bg-[#3d9a8b]" />
                  Detalles
                </h3>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-8 md:w-10 h-8 md:h-10 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 md:h-5 w-4 md:w-5 text-[#3d9a8b]" />
                    </div>
                    <div className="pt-1">
                      <p className="text-xs text-[#1a3a5c]/60 uppercase tracking-wider font-semibold mb-1">
                        Ubicación
                      </p>
                      <p className="text-[#1a3a5c]/80 font-semibold text-sm md:text-base">
                        {project.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-8 md:w-10 h-8 md:h-10 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 md:h-5 w-4 md:w-5 text-[#3d9a8b]" />
                    </div>
                    <div className="pt-1">
                      <p className="text-xs text-[#1a3a5c]/60 uppercase tracking-wider font-semibold mb-1">
                        Cliente
                      </p>
                      <p className="text-[#1a3a5c]/80 font-semibold text-sm md:text-base">
                        {project.client}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-8 md:w-10 h-8 md:h-10 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                      <Target className="h-4 md:h-5 w-4 md:w-5 text-[#3d9a8b]" />
                    </div>
                    <div className="pt-1">
                      <p className="text-xs text-[#1a3a5c]/60 uppercase tracking-wider font-semibold mb-1">
                        Área de Intervención
                      </p>
                      <p className="text-[#1a3a5c]/80 font-semibold text-sm md:text-base">
                        {project.area}
                      </p>
                    </div>
                  </div>
                  {project.endDate && (
                    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="w-8 md:w-10 h-8 md:h-10 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 md:h-5 w-4 md:w-5 text-[#3d9a8b]" />
                      </div>
                      <div className="pt-1">
                        <p className="text-xs text-[#1a3a5c]/60 uppercase tracking-wider font-semibold mb-1">
                          Finalización
                        </p>
                        <p className="text-[#1a3a5c]/80 font-semibold text-sm md:text-base">
                          {project.endDate}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Team */}
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t-2 border-[#3d9a8b]/20">
                  <h4 className="text-xs md:text-sm font-semibold text-[#1a3a5c] mb-4 md:mb-6 uppercase tracking-wider flex items-center gap-2">
                    <Users className="h-3 md:h-4 w-3 md:w-4" />
                    Equipo de Trabajo
                  </h4>
                  <div className="space-y-2 md:space-y-3">
                    {project.team.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <span className="text-[#1a3a5c]/70 text-xs md:text-sm">{member.role}</span>
                        <span className="font-bold text-[#3d9a8b] text-base md:text-lg">{member.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t-2 border-[#3d9a8b]/20">
                  <div className="bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] p-5 md:p-6 border-l-4 border-[#3d9a8b] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 bg-[#3d9a8b]/10 rounded-full blur-xl" />
                    <div className="relative">
                      <p className="text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
                        Estado
                      </p>
                      <p className="text-lg md:text-xl font-bold text-[#3d9a8b] uppercase">
                        {project.status === 'completado' ? 'COMPLETADO' 
                        : project.status === 'en-curso' ? 'EN CURSO' : 'PLANIFICADO'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t-2 border-[#3d9a8b]/20">
                  <h4 className="text-xs md:text-sm font-semibold text-[#1a3a5c] mb-3 md:mb-4 uppercase tracking-wider">
                    Compartir Proyecto
                  </h4>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <Button 
                      className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-xs md:text-sm py-2 h-auto"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      <Facebook className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
                      Facebook
                    </Button>
                    <Button 
                      className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white text-xs md:text-sm py-2 h-auto"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(project.title)}`, '_blank')}
                    >
                      <Twitter className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
                      Twitter
                    </Button>
                    <Button 
                      className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white text-xs md:text-sm py-2 h-auto"
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      <Linkedin className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
                      LinkedIn
                    </Button>
                    <Button 
                      className="bg-[#D44638] hover:bg-[#D44638]/90 text-white text-xs md:text-sm py-2 h-auto"
                      onClick={() => window.open(`mailto:?subject=${encodeURIComponent(project.title)}&body=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      <Mail className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
                      Email
                    </Button>
                  </div>
                  <div className="mt-3 md:mt-4">
                    <Button 
                      className="w-full bg-gradient-to-r from-[#1a3a5c] to-[#163250] hover:from-[#3d9a8b] hover:to-[#2d8a7b] text-white text-xs md:text-sm py-2 h-auto"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Enlace copiado al portapapeles');
                      }}
                    >
                      <Copy className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
                      Copiar Enlace
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
