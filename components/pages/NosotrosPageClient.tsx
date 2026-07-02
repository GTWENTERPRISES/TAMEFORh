"use client"

import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function NosotrosPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013"
            alt="Bosque"
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
              <span className="text-white font-medium">Sobre Nosotros</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Construyendo un Futuro<br />
              <span className="text-white">Forestal Sostenible</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Conoce a TAMEFOR S.A.S B.I.C - Consultoría forestal y ambiental
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {/* Image */}
              <motion.div className="relative" variants={imageVariants}>
                <div className="relative h-[500px] rounded-3xl overflow-hidden border-4 border-[#3d9a8b] shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074"
                    alt="TAMEFOR"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Decorative dots */}
                <motion.div className="absolute -bottom-4 -right-4 grid grid-cols-5 gap-1">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#3d9a8b]/30"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      viewport={{ once: true }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div variants={containerVariants}>
                <motion.div className="flex items-center gap-2 mb-4" variants={itemVariants}>
                  <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
                  </svg>
                  <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">TAMEFOR Los Ríos</span>
                </motion.div>
                
                <motion.h2
                  className="font-sans text-4xl lg:text-5xl text-[#1a3a5c] leading-tight mb-6 font-bold"
                  variants={headerVariants}
                >
                  TAMEFOR S.A.S B.I.C
                </motion.h2>

                <motion.p className="text-[#1a3a5c]/70 leading-relaxed mb-6 text-lg font-medium" variants={itemVariants}>
                  Somos una consultora forestal y ambiental constituida como empresa B.I.C. (Beneficio e Interés Colectivo) en Quevedo, Los Ríos, Ecuador. 
                  Ayudamos a empresas y personas naturales a crecer en armonía con el entorno, asegurando que sus proyectos sean viables, sostenibles y rentables. 
                  Promovemos el desarrollo sostenible del sector forestal a través del fortalecimiento 
                  profesional, ético y técnico de nuestros miembros, fomentando la investigación, la 
                  gestión ambiental responsable y el compromiso con el bienestar social y ecológico en 
                  la Provincia de Los Ríos.
                </motion.p>

                <motion.ul className="space-y-3 mb-8" variants={containerVariants}>
                  {[
                    "Fortalecimiento del ejercicio profesional de la ingeniería forestal",
                    "Contribución a la gestión integral y conservación de ecosistemas forestales",
                    "Promoción de la transición ecológica y desarrollo sostenible"
                  ].map((point, index) => (
                    <motion.li key={index} className="flex items-start gap-3" variants={itemVariants}>
                      <div className="bg-[#3d9a8b]/20 rounded-full p-1 mt-0.5 flex-shrink-0 hover:bg-[#3d9a8b]/40 transition-colors duration-300">
                        <Check className="h-4 w-4 text-[#3d9a8b]" />
                      </div>
                      <span className="text-[#1a3a5c] font-medium">{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div variants={itemVariants}>
                  <Link href="/contacto">
                    <Button className="bg-[#3d9a8b] hover:bg-[#1a3a5c] text-white rounded-full px-8 py-3 font-semibold group transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                      Contáctanos
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Misión y Visión */}
            <motion.div
              className="grid md:grid-cols-2 gap-8 mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div
                className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] rounded-3xl p-10 text-white shadow-xl border border-[#3d9a8b]/20 hover:shadow-2xl hover:border-[#3d9a8b]/60 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-full bg-[#3d9a8b] flex items-center justify-center mb-6 shadow-lg hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-sans font-bold mb-4">Misión</h3>
                <p className="text-white/90 leading-relaxed text-lg font-medium">
                  Promover el desarrollo sostenible del sector forestal a través del fortalecimiento 
                  profesional, ético y técnico de sus miembros; fomentando la investigación, la gestión 
                  ambiental responsable y el compromiso con el bienestar social y ecológico del país.
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-[#3d9a8b] to-[#2d7a6b] rounded-3xl p-10 text-white shadow-xl border border-[#3d9a8b]/30 hover:shadow-2xl hover:border-[#3d9a8b]/70 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-[#3d9a8b]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-sans font-bold mb-4">Visión</h3>
                <p className="text-white/90 leading-relaxed text-lg font-medium">
                  Ser una institución líder a nivel nacional en el fortalecimiento del talento forestal, 
                  reconocida por su influencia técnica, su rol propositivo en las políticas forestales y 
                  su compromiso con la conservación de los recursos naturales y la resiliencia climática.
                </p>
              </motion.div>
            </motion.div>

            {/* Valores */}
            <motion.div
              className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] rounded-3xl p-8 md:p-12 shadow-xl border border-[#3d9a8b]/20 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -ml-48 -mb-48" />

              <div className="relative z-10">
                <motion.div className="text-center mb-12" variants={containerVariants}>
                  <motion.div className="flex items-center justify-center gap-2 mb-4" variants={itemVariants}>
                    <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
                    </svg>
                    <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Nuestros Valores</span>
                  </motion.div>
                  <motion.h3
                    className="font-sans text-3xl md:text-4xl lg:text-5xl text-white leading-tight font-bold"
                    variants={headerVariants}
                  >
                    Valores Fundamentales
                  </motion.h3>
                </motion.div>
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                >
                  {[
                    { title: "Ética Profesional", description: "Integridad y responsabilidad en el ejercicio profesional" },
                    { title: "Excelencia Técnica", description: "Alta calidad y competencia en todas nuestras actividades" },
                    { title: "Sostenibilidad", description: "Compromiso con el desarrollo sostenible y la conservación" },
                    { title: "Innovación", description: "Búsqueda constante de soluciones innovadoras y tecnológicas" },
                    { title: "Colaboración", description: "Trabajo en equipo y cooperación entre profesionales" },
                    { title: "Transparencia", description: "Comunicación clara y gestión transparente" }
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-[#3d9a8b]/30 hover:border-[#3d9a8b]/60 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <div className="w-3 h-3 rounded-full bg-[#3d9a8b] mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-2 text-lg">{value.title}</h4>
                        <p className="text-sm text-white/80 font-medium">{value.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
