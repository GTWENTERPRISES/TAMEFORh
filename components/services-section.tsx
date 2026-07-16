"use client"

import { motion } from "framer-motion"
import { containerVariants, itemVariants, slideInFromBottomVariants } from "@/lib/animations"
import { SectionHeader, ServiceCard } from "@/components/ui"
import { Leaf, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    number: "01",
    title: "Certificación Profesional",
    description: "Proceso de certificación y registro profesional para ingenieros forestales, cumpliendo con los estándares del SENECYT y el Ministerio del Trabajo.",
    features: ["Registro profesional oficial", "Certificación de competencias", "Actualización de credenciales"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200"
  },
  {
    number: "02",
    title: "Consultoría Técnica",
    description: "Servicios de consultoría especializada en proyectos forestales, ambientales y de desarrollo sostenible.",
    features: ["Evaluaciones técnicas", "Planes de manejo forestal", "Estudios de impacto ambiental"],
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200"
  },
  {
    number: "03",
    title: "Capacitación y Desarrollo",
    description: "Programas de capacitación continua, cursos especializados y desarrollo profesional para miembros y profesionales del sector.",
    features: ["Cursos de actualización", "Talleres especializados", "Seminarios y conferencias"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200"
  },
  {
    number: "04",
    title: "Asesoría Legal y Normativa",
    description: "Orientación en aspectos legales, normativos y regulatorios relacionados con el ejercicio profesional forestal.",
    features: ["Asesoría legal especializada", "Interpretación normativa", "Representación profesional"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200"
  },
  {
    number: "05",
    title: "Gestión Forestal",
    description: "Planificación y gestión sostenible de bosques y recursos forestales con metodologías avanzadas.",
    features: ["Inventarios forestales", "Planes de manejo", "Monitoreo y evaluación"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200"
  },
  {
    number: "06",
    title: "Conservación y Restauración",
    description: "Programas de conservación y restauración de ecosistemas forestales y biodiversidad.",
    features: ["Restauración ecológica", "Conservación de biodiversidad", "Reforestación"],
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200"
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

        {/* Services Grid - Only 3 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {services.slice(0, 3).map((service, index) => (
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
                features={service.features}
                image={service.image}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/servicios">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-[#3d9a8b] hover:bg-[#3d9a8b]/90 text-white rounded-full px-10 py-5 font-semibold shadow-lg hover:shadow-xl transition-all text-base">
                Ver Todos los Servicios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
