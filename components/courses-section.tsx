"use client"

import { Calendar, MapPin, Clock, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { coursesData } from "@/lib/coursesData"
import { motion } from "framer-motion"

export function CoursesSection() {
  const featuredCourses = coursesData.filter(course => 
    course.slug === 'modelacion-biometria-manejo-datos' ||
    course.slug === 'sistemas-informacion-geografica' ||
    course.slug === 'negocios-gerencia-activos-verdes'
  )

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
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a3a5c]/5 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 -ml-48 -mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-[2px] bg-[#3d9a8b]" />
            <span className="text-[#3d9a8b] font-semibold uppercase tracking-[0.2em] text-sm">Capacitación Profesional</span>
            <div className="w-12 h-[2px] bg-[#3d9a8b]" />
          </div>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight mb-6 font-bold">
            Cursos Especializados<br />
            <span className="text-[#3d9a8b]">Para Tu Desarrollo</span>
          </h2>
          <div className="w-24 h-1 bg-[#3d9a8b] mx-auto mb-6" />
          <p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Avalados por el Ministerio del Trabajo y con código de registro en el SENECYT
          </p>
          <div className="mt-6">
            <Link href="/cursos">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white hover:text-white rounded-none px-10 py-4 font-semibold text-base transition-all duration-300 shadow-none hover:shadow-lg border-2 border-[#1a3a5c]">
                  Ver Todos los Cursos
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {featuredCourses.map((course) => (
            <motion.div 
              key={course.id} 
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {/* Card Container */}
              <div className="bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] border border-[#3d9a8b]/30 transition-all duration-500 hover:shadow-xl">
                {/* Content */}
                <div className="p-8 flex flex-col">
                  <div className="mb-6">
                    <div className="inline-block mb-4">
                      <span className="text-[#3d9a8b] text-xs font-bold uppercase tracking-[0.15em]">
                        {course.categoryLabel}
                      </span>
                    </div>
                    <h3 className="font-sans text-xl text-white mb-2 font-semibold leading-tight">{course.title}</h3>
                    {course.subtitle && (
                      <p className="text-white/80 text-sm mb-4 font-medium">{course.subtitle}</p>
                    )}
                    <p className="text-white/70 text-sm leading-relaxed mb-6">{course.shortDescription}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6 text-sm border-t border-white/20 pt-6">
                    <div className="flex items-center gap-3 text-white/70">
                      <Calendar className="h-4 w-4 text-[#3d9a8b]" />
                      <span className="font-medium">{course.schedule.startDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Clock className="h-4 w-4 text-[#3d9a8b]" />
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <MapPin className="h-4 w-4 text-[#3d9a8b]" />
                      <span className="font-medium">{course.modality.join(", ")}</span>
                    </div>
                  </div>

                  <Link href={`/cursos/${course.slug}`} className="mt-auto">
                    <div className="group/btn flex items-center justify-between text-[#3d9a8b] font-semibold text-sm cursor-pointer hover:text-white transition-colors">
                      <span>Ver Detalles</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification */}
        <motion.div 
          className="bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] p-12 md:p-16 border-t-4 border-[#3d9a8b] max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-[2px] bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-[0.2em] text-sm">Certificación Oficial</span>
              <div className="w-12 h-[2px] bg-[#3d9a8b]" />
            </div>
            <h3 className="text-4xl font-sans font-bold text-white mb-3">
              Reconocimiento Profesional Garantizado
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="flex items-center gap-6 p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#3d9a8b]/50 transition-all duration-300">
              <div className="w-16 h-16 bg-white flex items-center justify-center flex-shrink-0">
                <Award className="h-8 w-8 text-[#3d9a8b]" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-white mb-2 text-lg">Ministerio del Trabajo</h4>
                <p className="text-sm text-white/70">Aval oficial del gobierno</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#3d9a8b]/50 transition-all duration-300">
              <div className="w-16 h-16 bg-[#3d9a8b] flex items-center justify-center flex-shrink-0">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-white mb-2 text-lg">SENESCYT</h4>
                <p className="text-sm text-white/70">Código de registro oficial</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
