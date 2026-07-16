"use client"

import { Button } from "@/components/ui/button"
import { Check, ArrowRight, Target, Eye, Star } from "lucide-react"
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
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-white font-semibold uppercase tracking-wider text-sm">Sobre Nosotros</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Construyendo un Futuro<br />
              <span className="text-[#3d9a8b]">Forestal Sostenible</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Conoce a TAMEFOR S.A.S B.I.C - Consultoría forestal y ambiental
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white relative overflow-hidden">
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
                <div className="relative h-[500px] overflow-hidden shadow-xl border-4 border-[#3d9a8b]/30 hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1200"
                    alt="TAMEFOR"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div variants={containerVariants}>
                <motion.div className="flex items-center gap-2 mb-4" variants={itemVariants}>
                  <div className="w-8 h-1 bg-[#3d9a8b]" />
                  <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">TAMEFOR Los Ríos</span>
                </motion.div>
                
                <motion.h2
                  className="font-sans text-4xl lg:text-5xl text-[#1a3a5c] leading-tight mb-6 font-bold"
                  variants={headerVariants}
                >
                  TAMEFOR S.A.S B.I.C
                </motion.h2>

                <motion.p className="text-[#1a3a5c]/70 leading-relaxed mb-6 text-lg" variants={itemVariants}>
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
                      <div className="w-6 h-6 border-2 border-[#3d9a8b] flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="h-3.5 w-3.5 text-[#3d9a8b]" />
                      </div>
                      <span className="text-[#1a3a5c] font-medium">{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div variants={itemVariants}>
                  <Link href="/contacto">
                    <Button className="bg-[#3d9a8b] hover:bg-[#1a3a5c] text-white px-8 py-3 font-semibold group transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#3d9a8b]">
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
                className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] p-10 text-white shadow-xl border-l-4 border-[#3d9a8b] hover:shadow-2xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-[#3d9a8b]/20 flex items-center justify-center mb-6 border border-[#3d9a8b]/30">
                  <Target className="w-7 h-7 text-[#3d9a8b]" />
                </div>
                <h3 className="text-3xl font-sans font-bold mb-4">Misión</h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  Promover el desarrollo sostenible del sector forestal a través del fortalecimiento 
                  profesional, ético y técnico de sus miembros; fomentando la investigación, la gestión 
                  ambiental responsable y el compromiso con el bienestar social y ecológico del país.
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-[#3d9a8b] to-[#2d7a6b] p-10 text-white shadow-xl border-l-4 border-[#1a3a5c] hover:shadow-2xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-white/20 flex items-center justify-center mb-6 border border-white/30">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-sans font-bold mb-4">Visión</h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  Ser una institución líder a nivel nacional en el fortalecimiento del talento forestal, 
                  reconocida por su influencia técnica, su rol propositivo en las políticas forestales y 
                  su compromiso con la conservación de los recursos naturales y la resiliencia climática.
                </p>
              </motion.div>
            </motion.div>

            {/* Valores */}
            <motion.div
              className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] p-8 md:p-12 shadow-xl border-t-4 border-[#3d9a8b] relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <div className="relative z-10">
                <motion.div className="text-center mb-12" variants={containerVariants}>
                  <motion.div className="flex items-center justify-center gap-2 mb-4" variants={itemVariants}>
                    <div className="w-8 h-1 bg-[#3d9a8b]" />
                    <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Nuestros Valores</span>
                    <div className="w-8 h-1 bg-[#3d9a8b]" />
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
                      className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm border-l-4 border-[#3d9a8b] hover:border-[#3d9a8b]/60 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <Star className="w-6 h-6 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-2 text-lg">{value.title}</h4>
                        <p className="text-sm text-white/80">{value.description}</p>
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
