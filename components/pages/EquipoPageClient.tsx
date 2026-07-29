'use client'

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getAllEquipo, type TeamMember } from "@/lib/api/equipo"
import { teamData } from "@/lib/teamData"
import Image from "next/image"

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

interface EquipoPageClientProps {
  initialTeamMembers?: TeamMember[]
}

export function EquipoPageClient({ initialTeamMembers }: EquipoPageClientProps) {
  // Inicializar con datos locales para que se muestren inmediatamente
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers || teamData)

  // Cargar equipo desde la API al montar el componente (esto agregará datos adicionales si existen)
  useEffect(() => {
    getAllEquipo().then(setTeamMembers)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
            alt="Equipo de Trabajo"
            className="w-full h-full object-cover"
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
              <span className="text-white font-medium uppercase tracking-wider text-sm">Equipo Consultor</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Equipo Consultor<br />
              <span className="text-[#3d9a8b]">Especializado</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Profesionales con amplia experiencia en consultoría forestal y ambiental
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* White Background Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a3a5c]/5 -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 -ml-48 -mb-48" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div className="flex items-center justify-center gap-2 mb-6" variants={itemVariants}>
              <div className="w-12 h-[2px] bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-[0.2em] text-sm">Equipo Consultor</span>
              <div className="w-12 h-[2px] bg-[#3d9a8b]" />
            </motion.div>
            <motion.h2
              className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight font-bold mb-6"
              variants={headerVariants}
            >
              Consultores<br />
              <span className="text-[#3d9a8b]">Profesional</span>
            </motion.h2>
            <div className="w-24 h-1 bg-[#3d9a8b] mx-auto mb-6" />
            <motion.p className="text-[#1a3a5c]/70 text-lg max-w-2xl mx-auto leading-relaxed" variants={itemVariants}>
              Profesionales altamente calificados y comprometidos con la excelencia en gestión ambiental y forestal
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group"
                variants={cardVariants}
              >
                {/* Card Container */}
                <motion.div 
                  className="relative h-full bg-white border border-[#1a3a5c]/10 transition-all duration-500"
                  whileHover={{ y: -8 }}
                >
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/30 to-transparent" />
                  </div>
                  {/* Content */}
                  <div className="p-7 text-center bg-white border-t-4 border-[#3d9a8b]">
                    <div className="inline-block mb-4">
                      <span className="text-[#3d9a8b] text-xs font-bold uppercase tracking-[0.15em]">
                        {member.position}
                      </span>
                    </div>
                    <h3 className="font-sans text-[#1a3a5c] font-semibold leading-relaxed text-base">{member.name}</h3>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Valores */}
          <motion.div
            className="bg-[#1a3a5c] p-12 md:p-20 border-t-4 border-[#3d9a8b] relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="relative z-10 max-w-6xl mx-auto">
              <motion.div className="text-center mb-16" variants={containerVariants}>
                <motion.div className="flex items-center justify-center gap-2 mb-6" variants={itemVariants}>
                  <div className="w-12 h-[2px] bg-[#3d9a8b]" />
                  <span className="text-[#3d9a8b] font-semibold uppercase tracking-[0.2em] text-sm">Nuestros Valores</span>
                  <div className="w-12 h-[2px] bg-[#3d9a8b]" />
                </motion.div>
                <motion.h3
                  className="font-sans text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                  variants={headerVariants}
                >
                  Principios<br />
                  <span className="text-[#3d9a8b]">Corporativos</span>
                </motion.h3>
                <div className="w-24 h-1 bg-[#3d9a8b] mx-auto" />
              </motion.div>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
              >
                {[
                  { title: "Compromiso", description: "Compromiso total con la sostenibilidad ambiental y el desarrollo del sector." },
                  { title: "Excelencia", description: "Buscamos la excelencia en cada proyecto y servicio que brindamos." },
                  { title: "Innovación", description: "Soluciones modernas y eficientes en gestión forestal y ambiental." },
                  { title: "Integridad", description: "Honestidad, transparencia y ética profesional en todas nuestras acciones." }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    className="p-8 border border-[#3d9a8b]/30 bg-white/5 hover:bg-white/10 transition-all duration-500"
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-12 h-12 border-2 border-[#3d9a8b] flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-[#3d9a8b]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <h4 className="font-sans font-bold text-white mb-3 text-lg">{value.title}</h4>
                    <p className="text-white/70 leading-relaxed text-sm">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
