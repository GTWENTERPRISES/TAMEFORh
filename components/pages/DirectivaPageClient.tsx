'use client'

import { motion } from "framer-motion"
import { Check } from "lucide-react"

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

export function DirectivaPageClient() {
  const directiveMembers = [
    {
      name: "Ing. For. Edwin Oswaldo Tapia Palomino, Msc.",
      position: "PRESIDENTE",
      registration: "REG. PROF. # 1412167",
      photo: "/placeholder-user.jpg"
    },
    {
      name: "Ing. For. Wendy Vanessa Carriel Varas",
      position: "VICEPRESIDENTE",
      registration: "REG. PROF. # 1412133",
      photo: "/placeholder-user.jpg"
    },
    {
      name: "Ing. For. Néstor Fernando Sánchez Zambrano",
      position: "SECRETARIO",
      registration: "REG. PROF. # 1412132",
      photo: "/placeholder-user.jpg"
    },
    {
      name: "Ing. For. Jorge Aníbal Gómez Villacís, Msc.",
      position: "PRO-SECRETARIO",
      registration: "REG. PROF. # 1412187",
      photo: "/placeholder-user.jpg"
    },
    {
      name: "Ing. For. Emily Madeleine Jami Meza, Msc.",
      position: "TESORERO",
      registration: "REG. PROF. # 1412188",
      photo: "/placeholder-user.jpg"
    },
    {
      name: "Ing. For. Edison Hidalgo Solano Apuntes, Msc.",
      position: "1ER VOCAL PRINCIPAL",
      registration: "REG. PROF. # 141240",
      photo: "/placeholder-user.jpg"
    },
    {
      name: "Ing. For. Daniel Fernando Barragán Albán",
      position: "2DO VOCAL PRINCIPAL",
      registration: "REG. PROF. # 1412169",
      photo: "/placeholder-user.jpg"
    },
    {
      name: "Ing. For. Wilter Guillermo Enríquez Montes",
      position: "3ER VOCAL PRINCIPAL",
      registration: "REG. PROF. # 1412120",
      photo: "/placeholder-user.jpg"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
            alt="Directiva"
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
              <span className="text-white font-medium uppercase tracking-wider text-sm">Liderazgo</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Qué Hacemos<br />
              <span className="text-white">Servicios Especializados</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Ofrecemos diferentes servicios para el desarrollo y fortalecimiento profesional
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* White Background Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="container mx-auto px-4 relative z-10">
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
              <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Liderazgo</span>
            </motion.div>
            <motion.h2
              className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight font-bold mb-4"
              variants={headerVariants}
            >
              Directiva<br />
              <span className="text-[#3d9a8b]">Profesionales Líderes</span>
            </motion.h2>
            <motion.p className="text-[#1a3a5c]/70 text-lg font-medium max-w-2xl mx-auto" variants={itemVariants}>
              Conoce al equipo profesional de TAMEFOR S.A.S B.I.C
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {directiveMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                variants={cardVariants}
                whileHover={{ y: -10 }}
              >
                {/* Image Container */}
                <div className="aspect-square relative bg-[#1a3a5c] overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/80 via-[#1a3a5c]/40 to-transparent" />
                </div>
                {/* Content */}
                <div className="p-8 text-center bg-gradient-to-br from-white to-[#f8fafb] border-t-4 border-[#3d9a8b]">
                  <motion.div
                    className="bg-[#3d9a8b] text-white text-xs font-bold px-4 py-2 rounded-full inline-block mb-4 uppercase tracking-wider shadow-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {member.position}
                  </motion.div>
                  <motion.h3
                    className="font-sans font-bold text-[#1a3a5c] mb-3 text-lg leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {member.name}
                  </motion.h3>
                  <motion.p
                    className="text-[#3d9a8b] text-sm font-semibold"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.15, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {member.registration}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Funciones */}
          <motion.div
            className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] rounded-3xl p-8 md:p-16 shadow-2xl border border-[#3d9a8b]/20 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -ml-48 -mb-48" />

            <div className="relative z-10 max-w-5xl mx-auto">
              <motion.div className="text-center mb-16" variants={containerVariants}>
                <motion.div className="flex items-center justify-center gap-2 mb-4" variants={itemVariants}>
                  <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
                  </svg>
                  <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Responsabilidades</span>
                </motion.div>
                <motion.h3
                  className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                  variants={headerVariants}
                >
                  Funciones de la<br />
                  <span className="text-[#3d9a8b]">Directiva</span>
                </motion.h3>
              </motion.div>
              <motion.div
                className="grid md:grid-cols-2 gap-8"
                variants={containerVariants}
              >
                {[
                  { title: "Representación", description: "Representar al colegio ante instituciones públicas, privadas y organismos internacionales." },
                  { title: "Gestión Administrativa", description: "Administrar los recursos y gestionar las actividades del colegio de manera eficiente." },
                  { title: "Fortalecimiento Profesional", description: "Promover el desarrollo y fortalecimiento profesional de los miembros." },
                  { title: "Planificación Estratégica", description: "Elaborar y ejecutar planes estratégicos para el crecimiento del colegio." }
                ].map((func, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-[#3d9a8b]/30 hover:border-[#3d9a8b]/70 hover:bg-white/15 group hover:scale-105"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center mb-6 group-hover:bg-[#3d9a8b] transition-all duration-300 shadow-lg">
                      <svg className="w-7 h-7 text-[#3d9a8b] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <h4 className="font-sans font-bold text-white mb-3 text-2xl">{func.title}</h4>
                    <p className="text-white/80 font-medium leading-relaxed text-lg">{func.description}</p>
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
