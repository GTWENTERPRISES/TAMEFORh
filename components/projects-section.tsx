"use client"

import { ArrowRight, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui"

const projects = [
  {
    number: "01",
    title: "Gestión de Residuos",
    description: "Consultoría ambiental que incluye asesoramiento y orientación en gestión de residuos",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2032",
    category: "Reciclaje",
    slug: "gestion-residuos"
  },
  {
    number: "02",
    title: "Gestión Forestal",
    description: "Consultoría ambiental que incluye asesoramiento y orientación en conservación forestal",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013",
    category: "Bosque",
    slug: "gestion-forestal"
  },
  {
    number: "03",
    title: "Limpieza de Bosques",
    description: "Consultoría ambiental que incluye asesoramiento y orientación en limpieza forestal",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=2074",
    category: "Limpieza",
    slug: "limpieza-bosques"
  },
  {
    number: "04",
    title: "Reforestación",
    description: "Consultoría ambiental que incluye asesoramiento y orientación en plantación de árboles",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2088",
    category: "Plantación",
    slug: "reforestacion"
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
    hidden: (i: number) => ({ opacity: 0, y: 30, x: i % 2 === 0 ? -24 : 24 }),
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section id="projects" className="section-padding bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] relative overflow-hidden">
      {/* Subtle gradient overlay only */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3d9a8b]/8 via-transparent to-white/5" />

      <div className="container-max relative z-10">
        <SectionHeader
          icon={Briefcase}
          subtitle="Proyectos Completados"
          title="Explora Nuestros"
          titleHighlight="Proyectos Destacados"
          description="Soluciones ambientales integrales que demuestran nuestro compromiso con el desarrollo sostenible"
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
          <Link href="/proyectos">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#3d9a8b] hover:bg-white text-white hover:text-[#1a3a5c] rounded-none px-10 py-4 font-semibold text-base transition-all duration-300 shadow-none hover:shadow-lg border-2 border-[#3d9a8b]">
                Ver Todos los Proyectos
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.number}
              className={`group relative ${index % 2 === 1 ? "lg:-translate-y-6" : ""}`}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -8 }}
            >
              {/* Project Card */}
              <div className="relative bg-white/95 backdrop-blur-sm border border-[#3d9a8b]/30 border-l-4 border-l-[#3d9a8b] transition-all duration-500 hover:shadow-xl hover:border-[#3d9a8b]/60 h-full flex flex-col overflow-hidden">
                {/* Number Badge */}
                <motion.div
                  className="absolute top-4 left-4 z-10 bg-[#1a3a5c] text-white px-4 py-2 text-sm font-bold border-t-4 border-[#3d9a8b]"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >
                  No - {project.number}
                </motion.div>

                {/* Diagonal accent */}
                <div
                  className="absolute top-0 right-0 w-12 h-12 bg-[#3d9a8b] z-10 transition-transform duration-500 group-hover:scale-125"
                  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                />

                {/* Bottom animated line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-500 z-10" />

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
                  <h3 className="font-sans text-xl text-[#1a3a5c] mb-2 font-semibold leading-tight">
                    {project.title}
                  </h3>

                  {/* Animated underline */}
                  <div className="h-0.5 w-0 bg-[#3d9a8b] group-hover:w-12 transition-all duration-500 mb-3" />

                  {/* Description */}
                  <p className="text-[#1a3a5c]/70 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Button */}
                  <Link href={`/proyectos/${project.slug}`} className="mt-auto">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white rounded-none font-semibold text-sm transition-all duration-300 border-2 border-[#3d9a8b] hover:border-[#2d7a6b] group/btn">
                        Ver Proyecto
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
