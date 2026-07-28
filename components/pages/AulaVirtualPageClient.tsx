'use client'

import { useState } from "react"
import { Video, Users, BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginFormModal } from "@/components/LoginFormModal"
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function AulaVirtualPageClient() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
            alt="Aula Virtual"
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
              <span className="text-white font-medium">Educación en Línea</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Aula Virtual<br />
              <span className="text-white">TAMEFOR</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Accede a nuestra plataforma de educación en línea para participar en cursos y eventos
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid md:grid-cols-3 gap-8 mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {[
                {
                  icon: Video,
                  title: "Clases en Vivo",
                  description: "Participa en clases interactivas en tiempo real con nuestros instructores especializados"
                },
                {
                  icon: BookOpen,
                  title: "Materiales Educativos",
                  description: "Accede a recursos, documentos y materiales de estudio disponibles 24/7"
                },
                {
                  icon: Users,
                  title: "Comunidad de Aprendizaje",
                  description: "Conecta con otros profesionales y comparte experiencias en foros de discusión"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group hover:scale-105"
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#3d9a8b]/10 flex items-center justify-center mb-6 group-hover:bg-[#3d9a8b] transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-[#3d9a8b] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-sans text-xl text-[#1a3a5c] mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Login Section */}
            <motion.div
              className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] rounded-2xl p-8 md:p-12 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 className="font-sans text-3xl md:text-4xl text-white mb-4" variants={headerVariants}>
                Acceder a la Plataforma
              </motion.h2>
              <motion.p className="text-white/80 mb-8 max-w-2xl mx-auto" variants={itemVariants}>
                Inicia sesión con tu cuenta de TAMEFOR para acceder a todos los cursos, materiales y eventos en línea
              </motion.p>
              <motion.div variants={itemVariants}>
                <Button
                  onClick={() => setShowLogin(true)}
                  className="bg-white hover:bg-[#ffffff] text-[#1a3a5c] rounded-full px-8 font-semibold group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Iniciar Sesión
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              className="mt-12 bg-[#3d9a8b]/10 rounded-2xl p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h3 className="font-sans text-2xl text-[#1a3a5c] mb-6" variants={itemVariants}>
                Requisitos Técnicos
              </motion.h3>
              <motion.div className="grid md:grid-cols-2 gap-6" variants={containerVariants}>
                {[
                  "Conexión a internet estable",
                  "Navegador web actualizado (Chrome, Firefox, Safari, Edge)",
                  "Cámara web (para clases interactivas)",
                  "Micrófono (para participación en clases)",
                  "Altavoces o audífonos",
                  "Mínimo 2 Mbps de velocidad de internet"
                ].map((req, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#3d9a8b] mt-2 flex-shrink-0" />
                    <span className="text-foreground">{req}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <LoginFormModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        title="Aula Virtual"
        description="Inicia sesión con tu cuenta de TAMEFOR para acceder a tus cursos"
      />
    </>
  )
}
