"use client"

import { Calendar, MapPin, Clock, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getCursosDestacados, type Course } from "@/lib/api/cursos"

export function CoursesSection() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadCursos() {
      try {
        const cursos = await getCursosDestacados(3)
        setFeaturedCourses(cursos)
      } catch (error) {
        console.error('Error al cargar cursos destacados:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadCursos()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#1a3a5c]/5 -mr-32 sm:mr-40 md:-mr-48 -mt-32 sm:-mt-40 md:-mt-48" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#3d9a8b]/5 -ml-32 sm:-ml-40 md:-ml-48 -mb-32 sm:-mb-40 md:-mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5 md:mb-6">
            <div className="w-8 sm:w-10 md:w-12 h-[2px] bg-[#3d9a8b]" />
            <span className="text-[#3d9a8b] font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm">Capacitación Profesional</span>
            <div className="w-8 sm:w-10 md:w-12 h-[2px] bg-[#3d9a8b]" />
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight mb-4 sm:mb-5 md:mb-6 font-bold">
            Cursos Especializados<br />
            <span className="text-[#3d9a8b]">Para Tu Desarrollo</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#3d9a8b] mx-auto mb-4 sm:mb-5 md:mb-6" />
          <p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
            Avalados por el Ministerio del Trabajo y con código de registro en el SENECYT
          </p>
          <div className="mt-5 sm:mt-6">
            <Link href="/cursos">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white hover:text-white rounded-none px-8 sm:px-10 py-3 sm:py-4 font-semibold text-sm sm:text-base transition-all duration-300 shadow-none hover:shadow-lg border-2 border-[#1a3a5c] min-h-[48px]">
                  Ver Todos los Cursos
                  <ArrowRight className="ml-2 sm:ml-3 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto mb-12 sm:mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-primary/70">Cargando cursos...</p>
            </div>
          ) : featuredCourses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-primary/70">No hay cursos destacados disponibles</p>
            </div>
          ) : (
            featuredCourses.map((course) => (
            <motion.div 
              key={course.id} 
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {/* Card Container */}
              <div className="bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] border border-[#3d9a8b]/30 transition-all duration-500 hover:shadow-xl">
                {/* Content */}
                <div className="p-6 sm:p-7 md:p-8 flex flex-col">
                  <div className="mb-5 sm:mb-6">
                    <div className="inline-block mb-3 sm:mb-4">
                      <span className="text-[#3d9a8b] text-xs font-bold uppercase tracking-[0.15em]">
                        {course.categoryLabel}
                      </span>
                    </div>
                    <h3 className="font-sans text-lg sm:text-xl text-white mb-2 font-semibold leading-tight">{course.title}</h3>
                    {course.subtitle && (
                      <p className="text-white/80 text-sm mb-3 sm:mb-4 font-medium">{course.subtitle}</p>
                    )}
                    <p className="text-white/70 text-sm leading-relaxed mb-5 sm:mb-6">{course.shortDescription}</p>
                  </div>
                  
                  <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 text-sm border-t border-white/20 pt-5 sm:pt-6">
                    <div className="flex items-center gap-3 text-white/70">
                      <Calendar className="h-4 w-4 text-[#3d9a8b] flex-shrink-0" />
                      <span className="font-medium">{course.schedule.startDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Clock className="h-4 w-4 text-[#3d9a8b] flex-shrink-0" />
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <MapPin className="h-4 w-4 text-[#3d9a8b] flex-shrink-0" />
                      <span className="font-medium">{course.modality.join(", ")}</span>
                    </div>
                  </div>

                  <Link href={`/cursos/${course.slug}`} className="mt-auto min-h-[44px] flex items-center">
                    <div className="group/btn flex items-center justify-between text-[#3d9a8b] font-semibold text-sm cursor-pointer hover:text-white transition-colors w-full py-2">
                      <span>Ver Detalles</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
            ))
          )}
        </motion.div>

        {/* Certification */}
        <motion.div 
          className="bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] p-6 sm:p-10 md:p-12 lg:p-16 border-t-4 border-[#3d9a8b] max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5 md:mb-6">
              <div className="w-8 sm:w-10 md:w-12 h-[2px] bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm">Certificación Oficial</span>
              <div className="w-8 sm:w-10 md:w-12 h-[2px] bg-[#3d9a8b]" />
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-white mb-2 sm:mb-3">
              Reconocimiento Profesional Garantizado
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-7 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#3d9a8b]/50 transition-all duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white flex items-center justify-center flex-shrink-0">
                <Award className="h-7 w-7 sm:h-8 sm:w-8 text-[#3d9a8b]" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-sans font-bold text-white mb-1 sm:mb-2 text-base sm:text-lg">Ministerio del Trabajo</h4>
                <p className="text-sm text-white/70">Aval oficial del gobierno</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-7 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#3d9a8b]/50 transition-all duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#3d9a8b] flex items-center justify-center flex-shrink-0">
                <Award className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-sans font-bold text-white mb-1 sm:mb-2 text-base sm:text-lg">SENESCYT</h4>
                <p className="text-sm text-white/70">Código de registro oficial</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
