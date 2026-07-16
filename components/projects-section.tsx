"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const projects = [
  {
    number: "01",
    title: "Gestión de Residuos",
    description: "Consultoría ambiental que incluye asesoramiento y orientación en gestión de residuos",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2032",
    category: "Reciclaje"
  },
  {
    number: "02",
    title: "Gestión Forestal",
    description: "Consultoría ambiental que incluye asesoramiento y orientación en conservación forestal",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013",
    category: "Bosque"
  },
  {
    number: "03",
    title: "Limpieza de Bosques",
    description: "Consultoría ambiental que incluye asesoramiento y orientación en limpieza forestal",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=2074",
    category: "Limpieza"
  },
  {
    number: "04",
    title: "Reforestación",
    description: "Consultoría ambiental que incluye asesoramiento y orientación en plantación de árboles",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2088",
    category: "Plantación"
  },
]

export function ProjectsSection() {
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
    <section id="projects" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a3a5c]/5 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 -ml-48 -mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="w-12 h-[2px] bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-[0.2em] text-sm">Proyectos Completados</span>
              <div className="w-12 h-[2px] bg-[#3d9a8b]" />
            </div>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight font-bold text-center lg:text-left">
              Explora Nuestros<br />
              <span className="text-[#3d9a8b]">Proyectos Exitosos</span>
            </h2>
          </div>
          <div className="mt-8 lg:mt-0 flex justify-center lg:justify-start">
            <Link href="/proyectos">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white rounded-none px-10 py-4 font-semibold text-base transition-all duration-300 shadow-none border-2 border-[#1a3a5c] hover:border-[#3d9a8b]">
                  Ver Todos los Proyectos
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.number}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {/* Project Card */}
              <div className="bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] border border-[#3d9a8b]/30 transition-all duration-500 hover:shadow-xl h-full flex flex-col">
                {/* Number Badge */}
                <div className="absolute top-4 left-4 z-10 bg-white text-[#1a3a5c] px-4 py-2 text-sm font-bold border-t-4 border-[#3d9a8b]">
                  No - {project.number}
                </div>

                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Category */}
                  <div className="inline-block mb-3">
                    <span className="text-[#3d9a8b] text-xs font-bold uppercase tracking-[0.15em]">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-xl text-white mb-3 font-semibold leading-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
                    <Button className="w-full bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white rounded-none font-semibold text-sm transition-all duration-300 border-2 border-[#3d9a8b] hover:border-[#2d7a6b] group/btn">
                      Ver Proyecto
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
