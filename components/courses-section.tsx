"use client"

import { Calendar, MapPin, Clock, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { coursesData } from "@/lib/coursesData"
import Image from "next/image"
import { motion } from "framer-motion"

export function CoursesSection() {
  const featuredCourses = coursesData.filter(course => course.featured).slice(0, 3)

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
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-48 -mt-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
              </svg>
              <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Capacitación Profesional</span>
            </div>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight font-bold">
              Cursos Especializados<br />
              <span className="text-[#3d9a8b]">Para Tu Desarrollo</span>
            </h2>
          </div>
          <div className="mt-6 lg:mt-0 lg:text-right">
            <p className="text-[#1a3a5c]/70 mb-4 max-w-sm">
              Avalados por el Ministerio del Trabajo y con código de registro en el SENECYT
            </p>
            <Link href="/cursos">
              <motion.div whileHover={{ x: 5 }}>
                <Button variant="link" className="text-[#3d9a8b] p-0 hover:text-[#1a3a5c] font-semibold">
                  Ver Todos los Cursos <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {featuredCourses.map((course) => (
            <motion.div 
              key={course.id} 
              className="group relative h-[480px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c] via-[#1a3a5c] to-[#3d9a8b]" />
              
              {/* Content */}
              <div className="relative h-full p-8 flex flex-col">
                <div className="flex-1">
                  <motion.div 
                    className="bg-[#3d9a8b] text-white rounded-full px-4 py-2 text-xs font-bold inline-block mb-4 uppercase tracking-wider"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {course.categoryLabel}
                  </motion.div>
                  <h3 className="font-sans text-2xl text-white mb-2 line-clamp-2 font-bold">{course.title}</h3>
                  {course.subtitle && (
                    <p className="text-white text-sm mb-4 line-clamp-2 font-medium">{course.subtitle}</p>
                  )}
                  <p className="text-white text-sm line-clamp-3 font-medium">{course.shortDescription}</p>
                </div>
                
                <motion.div 
                  className="space-y-3 mb-6 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{course.schedule.startDate}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{course.modality.join(", ")}</span>
                  </div>
                </motion.div>

                <Link href={`/cursos/${course.slug}`}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-white hover:bg-[#3d9a8b] text-[#1a3a5c] hover:text-white rounded-full font-bold py-3 transition-all duration-300">
                      Ver Detalles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification */}
        <motion.div 
          className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] rounded-3xl p-8 md:p-12 max-w-5xl mx-auto shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(61, 154, 139, 0.3)" }}
        >
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-sans font-bold text-white mb-3">
              Certificación Oficial
            </h3>
            <p className="text-white/80 text-lg">Reconocimiento profesional garantizado</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <motion.div 
              className="flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-[#3d9a8b]/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
                <Award className="h-10 w-10 text-[#1a3a5c]" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-white mb-2 text-lg">Ministerio del Trabajo</h4>
                <p className="text-sm text-white/70">Aval oficial del gobierno</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center gap-6 bg-[#3d9a8b]/20 backdrop-blur-sm rounded-2xl p-8 border border-[#3d9a8b]/30 hover:border-[#3d9a8b] transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-20 h-20 rounded-full bg-[#3d9a8b] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-white mb-2 text-lg">SENESCYT</h4>
                <p className="text-sm text-white/70">Código de registro oficial</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


