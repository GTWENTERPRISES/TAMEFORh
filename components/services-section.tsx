"use client"

import { motion } from "framer-motion"
import { containerVariants } from "@/lib/animations"
import { SectionHeader } from "@/components/ui"
import { Leaf, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    number: "01",
    title: "Consultoría y Manejo Forestal",
    description: "Inventarios forestales, planes de manejo y aprovechamiento sostenible, silvicultura y gestión de viveros forestales profesionales.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013",
    href: "/servicios",
    accent: "from-emerald-500/80 to-teal-600/80",
  },
  {
    number: "02",
    title: "Consultoría y Gestión Ambiental",
    description: "Estudios de impacto ambiental, planes de manejo ambiental y regularización para empresas y proyectos.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
    href: "/servicios",
    accent: "from-[#1a3a5c]/80 to-[#3d9a8b]/80",
  },
  {
    number: "03",
    title: "Peritajes Judiciales Acreditados",
    description: "Informes periciales oficiales en ingeniería forestal, impacto ambiental y topografía con validez legal.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    href: "/servicios",
    accent: "from-[#0f2540]/80 to-[#3d9a8b]/60",
  },
  {
    number: "04",
    title: "Capacitación y Formación Técnica",
    description: "Programas especializados certificados en geomática, tecnología forestal y gestión ambiental.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
    href: "/cursos",
    accent: "from-teal-700/80 to-emerald-600/80",
  },
]

function DynamicServiceCard({
  number,
  title,
  description,
  image,
  href,
  accent,
  index,
}: {
  number: string
  title: string
  description: string
  image: string
  href: string
  accent: string
  index: number
}) {
  return (
    <motion.div
      className="group relative overflow-hidden bg-white border-l-4 border-l-[#3d9a8b] shadow-md hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: index * 0.12, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </motion.div>
        {/* Default dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/60 to-transparent transition-opacity duration-500" />
        {/* Colored overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        {/* Number tag on image */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-[#3d9a8b] text-white text-xs font-black px-2.5 py-1 tracking-wider">
            {number}
          </span>
          <span className="text-white/80 text-[10px] font-semibold uppercase tracking-widest drop-shadow">
            Servicio
          </span>
        </div>
        {/* Arrow icon appears on hover */}
        <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/0 group-hover:bg-white/20 border border-white/0 group-hover:border-white/40 flex items-center justify-center transition-all duration-300">
          <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
        </div>

      </div>

      {/* Content */}
      <div className="p-5 relative">

        <h3 className="text-[#1a3a5c] font-bold text-base leading-snug mb-2 group-hover:text-[#3d9a8b] transition-colors duration-300 relative z-10">
          {title}
        </h3>
        <p className="text-[#1a3a5c]/65 text-sm leading-relaxed mb-4 relative z-10">
          {description}
        </p>

        <Link href={href} className="relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[#3d9a8b] text-sm font-semibold group/link hover:gap-3 transition-all duration-200">
            Ver Más
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
          </span>
        </Link>

        {/* Bottom animated line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-500" />
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background */}
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

      <div className="container-max relative z-10">
        <SectionHeader
          icon={Leaf}
          subtitle="Qué Hacemos"
          title="Servicios Especializados"
          titleHighlight="Para Tu Empresa"
          description="Servicios profesionales de consultoría forestal, gestión ambiental y capacitación certificada"
          centered
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
                    {services.map((service, i) => (
            <DynamicServiceCard key={i} {...service} index={i} />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link href="/servicios">
            <motion.button
              className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c] shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50 transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver Todos los Servicios
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}