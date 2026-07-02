"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
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
    <section id="projects" className="py-20 bg-white relative overflow-hidden">
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
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16"
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
              <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Proyectos Completados</span>
            </div>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight font-bold">
              Explora Nuestros<br />
              <span className="text-[#3d9a8b]">Proyectos Exitosos</span>
            </h2>
          </div>
          <div className="mt-6 lg:mt-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#3d9a8b] hover:bg-[#1a3a5c] text-white rounded-full px-8 py-3 font-semibold text-lg group transition-all duration-300 shadow-lg hover:shadow-xl">
                Ver Todos los Proyectos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
              whileHover={{ y: -10 }}
            >
              {/* Number Badge */}
              <motion.div 
                className="absolute -top-4 right-4 z-20 bg-[#3d9a8b] text-white rounded-full px-4 py-2 text-sm font-bold shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                viewport={{ once: true }}
              >
                No - {project.number}
              </motion.div>
              
              {/* Image Container */}
              <div className="relative h-[380px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/95 via-[#1a3a5c]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Content on Hover */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <h3 className="font-sans text-lg font-bold text-[#1a3a5c] mb-3">{project.title}</h3>
                    <p className="text-white text-sm mb-4 font-medium">{project.description}</p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-[#3d9a8b] hover:bg-[#1a3a5c] text-white rounded-full font-semibold group/btn transition-all duration-300">
                        Ver Proyecto
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Category Badge */}
                <motion.div 
                  className="absolute bottom-4 right-4 bg-white text-[#1a3a5c] rounded-full px-4 py-2 text-sm font-bold group-hover:opacity-0 transition-opacity shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  {project.category}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


