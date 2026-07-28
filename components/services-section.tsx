"use client"

import { motion } from "framer-motion"
import { containerVariants, itemVariants, slideInFromBottomVariants } from "@/lib/animations"
import { SectionHeader, ServiceCard } from "@/components/ui"
import { Leaf } from "lucide-react"
import Link from "next/link"

const services = [
  {
    number: "01",
    title: "Consultoría y Manejo Forestal",
    description: "Inventarios forestales, planes de manejo y aprovechamiento sostenible, silvicultura y gestión de viveros forestales profesionales.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013",
    href: "/servicios"
  },
  {
    number: "02",
    title: "Consultoría y Gestión Ambiental",
    description: "Estudios de impacto ambiental, planes de manejo ambiental y regularización para empresas y proyectos.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
    href: "/servicios"
  },
  {
    number: "03",
    title: "Peritajes Judiciales Acreditados",
    description: "Informes periciales oficiales en ingeniería forestal, impacto ambiental y topografía con validez legal.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    href: "/servicios"
  },
  {
    number: "04",
    title: "Capacitación y Formación Técnica",
    description: "Programas especializados certificados en geomática, tecnología forestal y gestión ambiental.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
    href: "/cursos"
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
        <SectionHeader
          icon={Leaf}
          subtitle="Qué Hacemos"
          title="Servicios Especializados"
          titleHighlight="Para Tu Empresa"
          description="Servicios profesionales de consultoría forestal, gestión ambiental y capacitación certificada"
          centered
        />

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              number={service.number}
              title={service.title}
              description={service.description}
              image={service.image}
              href={service.href}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
