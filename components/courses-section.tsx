"use client"

import { Calendar, MapPin, Clock, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getCursosDestacados, type Course } from "@/lib/api/cursos"
import { SectionHeader } from "@/components/ui"

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
    hidden: (i: number) => ({ opacity: 0, y: 30, x: i % 2 === 0 ? -24 : 24 }),
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section id="courses" className="section-padding bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] relative overflow-hidden">
      {/* Subtle gradient overlay only */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3d9a8b]/5 via-transparent to-white/5" />

      <div className="container-max relative z-10">
        <SectionHeader
          icon={Award}
          subtitle="Capacitación Profesional"
          title="Cursos Especializados"
          titleHighlight="Para Tu Desarrollo"
          description="Avalados por el Ministerio del Trabajo y con código de registro en el SENECYT"
          centered
          dark
        />
        
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/cursos">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-[#3d9a8b] hover:bg-white text-white hover:text-[#1a3a5c] rounded-none px-8 sm:px-10 py-3 sm:py-4 font-semibold text-sm sm:text-base transition-all duration-300 shadow-none hover:shadow-lg border-2 border-[#3d9a8b] min-h-[48px]">
                Ver Todos los Cursos
                <ArrowRight className="ml-2 sm:ml-3 h-4 w-4" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto mb-12 sm:mb-16 md:mb-20 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#3d9a8b] border-r-transparent"></div>
              <p className="mt-4 text-white/70">Cargando cursos...</p>
            </div>
          ) : featuredCourses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-white/70">No hay cursos destacados disponibles</p>
            </div>
          ) : (
            featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                className={`group relative ${index === 1 ? "lg:-translate-y-6" : ""}`}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -8 }}
              >
                {/* Card Container */}
                <div className="relative bg-white/95 backdrop-blur-sm border border-[#3d9a8b]/30 border-l-4 border-l-[#3d9a8b] transition-all duration-500 hover:shadow-xl hover:border-[#3d9a8b]/60 h-full flex flex-col overflow-hidden">
                  {/* Diagonal accent */}
                  <div
                    className="absolute top-0 right-0 w-14 h-14 sm:w-16 sm:h-16 bg-[#3d9a8b] transition-transform duration-500 group-hover:scale-125"
                    style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                  />

                  {/* Content */}
                  <div className="p-6 sm:p-7 md:p-8 flex flex-col flex-grow">
                    <div className="mb-5 sm:mb-6">
                      <div className="inline-block mb-3 sm:mb-4">
                        <span className="text-[#3d9a8b] text-xs font-bold uppercase tracking-[0.15em]">
                          {course.categoryLabel}
                        </span>
                      </div>
                      <h3 className="font-sans text-lg sm:text-xl text-[#1a3a5c] mb-2 font-semibold leading-tight">{course.title}</h3>
                      <div className="h-0.5 w-0 bg-[#3d9a8b] group-hover:w-12 transition-all duration-500 mb-3" />
                      {course.subtitle && (
                        <p className="text-[#1a3a5c]/70 text-sm mb-3 sm:mb-4 font-medium">{course.subtitle}</p>
                      )}
                      <p className="text-[#1a3a5c]/70 text-sm leading-relaxed">{course.shortDescription}</p>
                    </div>

                    <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 text-sm border-t border-[#1a3a5c]/10 pt-5 sm:pt-6">
                      <div className="flex items-center gap-3 text-[#1a3a5c]/70">
                        <Calendar className="h-4 w-4 text-[#3d9a8b] flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        <span className="font-medium">{course.schedule.startDate}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#1a3a5c]/70">
                        <Clock className="h-4 w-4 text-[#3d9a8b] flex-shrink-0 transition-transform duration-300 group-hover:rotate-45" />
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#1a3a5c]/70">
                        <MapPin className="h-4 w-4 text-[#3d9a8b] flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        <span className="font-medium">{course.modality.join(", ")}</span>
                      </div>
                    </div>

                    <Link href={`/cursos/${course.slug}`} className="mt-auto">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white rounded-none font-semibold text-sm transition-all duration-300 border-2 border-[#3d9a8b] hover:border-[#2d7a6b] min-h-[44px] group/btn">
                          Ver Detalles
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Certification */}
        <motion.div
          className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 sm:p-10 md:p-12 lg:p-16 border-t-4 border-t-[#3d9a8b] max-w-6xl mx-auto"
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
              <motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 bg-white flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="h-7 w-7 sm:h-8 sm:w-8 text-[#3d9a8b]" />
              </motion.div>
              <div className="text-center sm:text-left">
                <h4 className="font-sans font-bold text-white mb-1 sm:mb-2 text-base sm:text-lg">Ministerio del Trabajo</h4>
                <p className="text-sm text-white/70">Aval oficial del gobierno</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-7 md:p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#3d9a8b]/50 transition-all duration-300">
              <motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 bg-[#3d9a8b] flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </motion.div>
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
