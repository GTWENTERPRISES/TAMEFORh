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
    features: ["Registro profesional oficial", "Certificación de competencias", "Actualización de credenciales", "Asesoría en trámites"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070"
  },
  {
    number: "02",
    title: "Consultoría Técnica",
    description: "Servicios de consultoría especializada en proyectos forestales, ambientales y de desarrollo sostenible.",
    features: ["Evaluaciones técnicas", "Planes de manejo forestal", "Estudios de impacto ambiental", "Asesoría en proyectos"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
  },
  {
    number: "03",
    title: "Capacitación y Desarrollo",
    description: "Programas de capacitación continua, cursos especializados y desarrollo profesional para miembros y profesionales del sector.",
    features: ["Cursos de actualización", "Talleres especializados", "Seminarios y conferencias", "Programas de certificación"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
  },
  {
    number: "04",
    title: "Asesoría Legal y Normativa",
    description: "Orientación en aspectos legales, normativos y regulatorios relacionados con el ejercicio profesional forestal.",
    features: ["Asesoría legal especializada", "Interpretación normativa", "Representación profesional", "Actualización regulatoria"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070"
  },
  {
    number: "05",
    title: "Gestión Forestal",
    description: "Planificación y gestión sostenible de bosques y recursos forestales con metodologías avanzadas.",
    features: ["Inventarios forestales", "Planes de manejo", "Monitoreo y evaluación", "Certificación forestal"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013"
  },
  {
    number: "06",
    title: "Conservación y Restauración",
    description: "Programas de conservación y restauración de ecosistemas forestales y biodiversidad.",
    features: ["Restauración ecológica", "Conservación de biodiversidad", "Reforestación", "Servicios ecosistémicos"],
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070"
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
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
              </svg>
              <span className="text-white font-medium">Qué Hacemos</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Servicios Especializados<br />
              <span className="text-white">Para El Sector Forestal</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Ofrecemos diferentes servicios para el desarrollo y fortalecimiento profesional
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
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
              <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Nuestros Servicios</span>
            </motion.div>
            <motion.h2
              className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight font-bold mb-4"
              variants={headerVariants}
            >
              Servicios Especializados<br />
              <span className="text-[#3d9a8b]">Para El Sector Forestal</span>
            </motion.h2>
            <motion.p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg font-medium" variants={itemVariants}>
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
                className="group relative h-[520px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                variants={cardVariants}
                whileHover={{ y: -10 }}
              >
                {/* Background Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/99 via-[#1a3a5c]/75 to-[#1a3a5c]/20" />
                
                {/* Number Badge */}
                <motion.div
                  className="absolute top-6 left-6 bg-[#3d9a8b] text-white rounded-full px-5 py-2 text-sm font-bold shadow-lg border border-[#3d9a8b]/50"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  No - {service.number}
                </motion.div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col h-full justify-end">
                  <motion.h3
                    className="font-sans text-2xl lg:text-3xl text-white mb-3 font-bold leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    className="text-white/95 text-sm mb-5 line-clamp-3 font-medium leading-relaxed"
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
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white text-sm font-medium">
                        <div className="w-5 h-5 rounded-full bg-[#3d9a8b] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-white" />
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
                    <Button className="w-full bg-[#3d9a8b] hover:bg-white text-white hover:text-[#1a3a5c] rounded-full font-bold py-2.5 transition-all duration-300 shadow-lg hover:shadow-xl group/btn hover:scale-105">
                      Ver Más
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            className="bg-gradient-to-br from-[#1a3a5c] via-[#1a3a5c] to-[#0f2a45] rounded-3xl p-8 md:p-16 max-w-6xl mx-auto shadow-2xl border border-[#3d9a8b]/20 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -ml-48 -mb-48" />

            <div className="relative z-10">
              <motion.div className="text-center mb-16" variants={containerVariants}>
                <motion.div className="flex items-center justify-center gap-2 mb-4" variants={itemVariants}>
                  <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
                  </svg>
                  <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Membresía</span>
                </motion.div>
                <motion.h2
                  className="font-sans text-4xl md:text-5xl lg:text-6xl text-white mb-4 font-bold leading-tight"
                  variants={headerVariants}
                >
                  Beneficios de Ser<br />
                  <span className="text-[#3d9a8b]">Miembro</span>
                </motion.h2>
                <motion.p className="text-white/80 text-lg font-medium max-w-2xl mx-auto" variants={itemVariants}>
                  Servicios profesionales de gestión ambiental, consultoría forestal y capacitación certificada para tu empresa
                </motion.p>
              </motion.div>
              <motion.div
                className="grid md:grid-cols-2 gap-6 mb-10"
                variants={containerVariants}
              >
                {[
                  "Acceso a base de datos de profesionales certificados",
                  "Red de contactos y networking profesional",
                  "Descuentos en cursos y eventos",
                  "Acceso a biblioteca especializada",
                  "Boletines informativos y actualizaciones del sector",
                  "Participación en comisiones y grupos de trabajo"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[#3d9a8b]/30 hover:border-[#3d9a8b]/70 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl group hover:scale-105"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#3d9a8b] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg group-hover:scale-110 transition-transform">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white font-medium text-lg leading-relaxed">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div className="text-center" variants={itemVariants}>
                <Link href="/contacto">
                  <Button className="bg-[#3d9a8b] hover:bg-white text-white hover:text-[#1a3a5c] rounded-full px-10 py-4 font-bold text-lg group transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
                    Más Información
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
