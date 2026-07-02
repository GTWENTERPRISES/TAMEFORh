'use client'

import { MapPin, Calendar, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { projectsData } from "@/lib/projectsData"
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

export function ProyectosPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070"
            alt="Proyectos"
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
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
              </svg>
              <span className="text-white font-medium">Nuestros Proyectos</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Proyectos Forestales<br />
              <span className="text-white">Y Ambientales</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Conoce los proyectos que desarrollamos en la Provincia de Los Ríos
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div className="flex items-center justify-center gap-2 mb-4" variants={itemVariants}>
              <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
              </svg>
              <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Proyectos Completados</span>
            </motion.div>
            <motion.h2
              className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight font-bold mb-4"
              variants={headerVariants}
            >
              Explora Nuestros<br />
              <span className="text-[#3d9a8b]">Proyectos Exitosos</span>
            </motion.h2>
            <motion.p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg font-medium" variants={itemVariants}>
              Conoce los proyectos forestales y ambientales que desarrollamos en la Provincia de Los Ríos
            </motion.p>
          </motion.div>

          {projectsData.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-[#1a3a5c]/70 text-lg font-medium">
                Próximamente estaremos publicando nuestros proyectos.
              </p>
            </motion.div>
          ) : (
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
                  className="group relative h-[520px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                >
                  {/* Background Image */}
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/99 via-[#1a3a5c]/75 to-[#1a3a5c]/20" />
                  
                  {/* Category Badge */}
                  <motion.div
                    className="absolute top-6 left-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <span className="bg-[#3d9a8b] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                      {project.category.toUpperCase()}
                    </span>
                  </motion.div>
                  
                  {/* Status Badge */}
                  <motion.div
                    className="absolute top-6 right-6"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <span className={`text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg ${
                      project.status === 'en-curso' 
                        ? 'bg-[#3d9a8b] text-white'
                        : project.status === 'completado'
                        ? 'bg-white text-[#1a3a5c]'
                        : 'bg-white/70 text-[#1a3a5c]'
                    }`}>
                      {project.status === 'en-curso' ? 'En Curso' : project.status === 'completado' ? 'Completado' : 'Planificado'}
                    </span>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col h-full justify-end">
                    <motion.h3
                      className="font-sans text-2xl lg:text-3xl text-white mb-3 line-clamp-2 font-bold leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      className="text-white/95 text-sm mb-5 line-clamp-3 font-medium leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.15, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {project.shortDescription}
                    </motion.p>
                    
                    <motion.div
                      className="space-y-3 mb-6 text-sm"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.2, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <span className="line-clamp-1 font-medium">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">{project.startDate}</span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.25, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Link href={`/proyectos/${project.slug}`}>
                        <Button className="w-full bg-white hover:bg-[#3d9a8b] text-[#1a3a5c] hover:text-white rounded-full font-bold py-3 transition-all duration-300 shadow-lg hover:shadow-xl group/btn hover:scale-105">
                          Ver Detalles
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
