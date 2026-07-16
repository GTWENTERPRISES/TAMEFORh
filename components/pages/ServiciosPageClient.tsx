'use client'

import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const services = [
  {
    number: "01",
    title: "Certificación Profesional",
    description: "Proceso de certificación y registro profesional para ingenieros forestales, cumpliendo con los estándares del SENECYT y el Ministerio del Trabajo.",
    features: ["Registro profesional oficial", "Certificación de competencias", "Actualización de credenciales"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070",
    slug: "certificacion-profesional"
  },
  {
    number: "02",
    title: "Consultoría Técnica",
    description: "Servicios de consultoría especializada en proyectos forestales, ambientales y de desarrollo sostenible.",
    features: ["Evaluaciones técnicas", "Planes de manejo forestal", "Estudios de impacto ambiental"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
    slug: "consultoria-tecnica"
  },
  {
    number: "03",
    title: "Capacitación y Desarrollo",
    description: "Programas de capacitación continua, cursos especializados y desarrollo profesional para miembros y profesionales del sector.",
    features: ["Cursos de actualización", "Talleres especializados", "Seminarios y conferencias"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
    slug: "capacitacion-y-desarrollo"
  },
  {
    number: "04",
    title: "Asesoría Legal y Normativa",
    description: "Orientación en aspectos legales, normativos y regulatorios relacionados con el ejercicio profesional forestal.",
    features: ["Asesoría legal especializada", "Interpretación normativa", "Representación profesional"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    slug: "asesoria-legal-y-normativa"
  },
  {
    number: "05",
    title: "Gestión Forestal",
    description: "Planificación y gestión sostenible de bosques y recursos forestales con metodologías avanzadas.",
    features: ["Inventarios forestales", "Planes de manejo", "Monitoreo y evaluación"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013",
    slug: "gestion-forestal"
  },
  {
    number: "06",
    title: "Conservación y Restauración",
    description: "Programas de conservación y restauración de ecosistemas forestales y biodiversidad.",
    features: ["Restauración ecológica", "Conservación de biodiversidad", "Reforestación"],
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070",
    slug: "conservacion-y-restauracion"
  }
]

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

export function ServiciosPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
            alt="Servicios"
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
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-white font-semibold uppercase tracking-wider text-sm">Qué Hacemos</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Servicios Especializados<br />
              <span className="text-[#3d9a8b]">Para El Sector Forestal</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Ofrecemos diferentes servicios para el desarrollo y fortalecimiento profesional
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
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
            <motion.div className="flex items-center justify-center gap-2 mb-4" variants={itemVariants}>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Nuestros Servicios</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </motion.div>
            <motion.h2
              className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight font-bold mb-4"
              variants={headerVariants}
            >
              Servicios Especializados<br />
              <span className="text-[#3d9a8b]">Para El Sector Forestal</span>
            </motion.h2>
            <motion.p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg" variants={itemVariants}>
              Ofrecemos diferentes servicios para el desarrollo y fortalecimiento profesional
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#3d9a8b]/20 bg-white"
                variants={cardVariants}
                whileHover={{ y: -10 }}
              >
                {/* Number Badge */}
                <motion.div
                  className="absolute top-0 left-0 bg-[#3d9a8b] text-white px-4 py-2 text-sm font-bold shadow-lg border-b-2 border-[#1a3a5c]"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  No - {service.number}
                </motion.div>
                
                {/* Content */}
                <div className="p-8">
                  <motion.h3
                    className="font-sans text-2xl lg:text-3xl text-[#1a3a5c] mb-3 font-bold leading-tight pt-8"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    className="text-[#1a3a5c]/70 text-sm mb-5 line-clamp-3 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.15, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {service.description}
                  </motion.p>
                  <motion.ul
                    className="space-y-2.5 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[#1a3a5c] text-sm">
                        <div className="w-5 h-5 border-2 border-[#3d9a8b] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-[#3d9a8b]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </motion.ul>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.25, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/servicios/${service.slug}`}>
                      <Button className="w-full bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white font-semibold py-2.5 transition-all duration-300 shadow-lg hover:shadow-xl group/btn border-2 border-[#1a3a5c]">
                        Ver Más
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
