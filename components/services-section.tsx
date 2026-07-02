"use client"

import { motion } from "framer-motion"
import { containerVariants, itemVariants, slideInFromBottomVariants } from "@/lib/animations"
import { SectionHeader, ServiceCard } from "@/components/ui"
import { Leaf } from "lucide-react"

const services = [
  {
    number: "01",
    title: "Sistemas de Gestión Ambiental",
    description: "Implementación de sistemas bajo normas ISO 14001 e ISO 9001 para tu empresa",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
  },
  {
    number: "02",
    title: "Plantaciones Comerciales",
    description: "Establecimiento y manejo profesional de plantaciones forestales comerciales",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013"
  },
  {
    number: "03",
    title: "Valoración de Cobertura Vegetal",
    description: "Evaluación técnica para servidumbres en líneas de transmisión eléctrica",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2070"
  },
  {
    number: "04",
    title: "Capacitaciones Certificadas",
    description: "Formación certificada por Ministerio de Trabajo y SENECYT",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
  },
  {
    number: "05",
    title: "Peritajes Judiciales",
    description: "Peritajes en impacto ambiental, topografía e ingeniería forestal",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070"
  },
  {
    number: "06",
    title: "Levantamientos Topográficos",
    description: "Topografía con respaldo técnico y normativo para proyectos",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/8 rounded-full blur-3xl -mr-48 -mt-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/8 rounded-full blur-3xl -ml-48 -mb-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      />

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center space-y-6"
        >
          <motion.p 
            className="text-sm font-bold text-[#3d9a8b] uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Qué Hacemos
          </motion.p>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3a5c] leading-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Servicios Especializados
            <span className="text-[#3d9a8b] block">Para El Sector Forestal</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-[#1a3a5c]/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ofrecemos diferentes servicios para el desarrollo y fortalecimiento profesional.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              variants={slideInFromBottomVariants}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                number={service.number}
                title={service.title}
                description={service.description}
                image={service.image}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
