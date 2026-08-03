'use client'

import { MapPin, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { projectsData } from "@/lib/projectsData"

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function ProyectosPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-[#1a3a5c] via-[#163250] to-[#0f2a45]">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Nuestros Proyectos</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </motion.div>
            <motion.h1
              className="font-sans text-4xl md:text-5xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Proyectos Forestales<br />
              <span className="text-[#3d9a8b]">Y Ambientales</span>
            </motion.h1>
            <motion.p className="text-white/80 text-lg" variants={itemVariants}>
              Conoce los proyectos que desarrollamos en Ecuador
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div className="flex items-center justify-center gap-2 mb-6" variants={itemVariants}>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Proyectos Completados</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </motion.div>
            <motion.h2
              className="font-sans text-4xl md:text-5xl text-[#1a3a5c] leading-tight font-bold mb-4"
              variants={headerVariants}
            >
              Explora Nuestros<br />
              <span className="text-[#3d9a8b]">Proyectos Exitosos</span>
            </motion.h2>
            <div className="w-24 h-1 bg-[#3d9a8b] mx-auto mb-6" />
            <motion.p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg" variants={itemVariants}>
              Conoce los proyectos forestales y ambientales que desarrollamos en Ecuador
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#3d9a8b] bg-white"
                variants={cardVariants}
                whileHover={{ y: -10 }}
              >
                {/* Project Number Badge */}
                <div className="absolute top-6 right-6 z-10 bg-[#3d9a8b] text-white px-4 py-2 rounded-full font-bold text-sm">
                  No - {project.number}
                </div>

                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="p-8">
                  {/* Badges */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#1a3a5c] text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                      {project.categoryLabel}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1.5 uppercase tracking-wider ${
                      project.status === 'en-curso' 
                        ? 'bg-[#3d9a8b] text-white'
                        : project.status === 'completado'
                        ? 'bg-[#1a3a5c] text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {project.status === 'en-curso' ? 'EN CURSO' : project.status === 'completado' ? 'COMPLETADO' : 'PLANIFICADO'}
                    </span>
                  </div>
                  
                  <h3 className="font-sans text-2xl text-[#1a3a5c] mb-3 font-bold leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-[#1a3a5c]/70 text-sm mb-5 leading-relaxed">
                    {project.shortDescription}
                  </p>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center gap-3 text-[#1a3a5c]">
                      <div className="w-7 h-7 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                        <MapPin className="h-3.5 w-3.5 text-[#3d9a8b]" />
                      </div>
                      <span className="font-medium">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#1a3a5c]">
                      <div className="w-7 h-7 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                        <Calendar className="h-3.5 w-3.5 text-[#3d9a8b]" />
                      </div>
                      <span className="font-medium">{project.startDate}</span>
                    </div>
                  </div>

                  <Link href={`/proyectos/${project.slug}`}>
                    <Button className="w-full bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white font-semibold py-3 transition-all duration-300 shadow-none border-2 border-[#1a3a5c] hover:border-[#3d9a8b]">
                      Ver Más Detalles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
