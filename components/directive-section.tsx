"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function DirectiveSection() {
  // Usar los primeros 3 miembros del equipo con fotos locales
  const directiveMembers = [
    {
      name: "Edwin Oswaldo Tapia Palomino",
      position: "MSc. Sistemas de Gestión Ambiental",
      photo: "/edwin.jpg"
    },
    {
      name: "Diana María Mena Minuche",
      position: "Ing. Comercio Exterior",
      photo: "/diana.png"
    },
    {
      name: "Carlos Mauricio Pacheco Merizalde",
      position: "Ing. Forestal",
      photo: "/carlos.png"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-[2px] bg-[#3d9a8b]" />
            <span className="text-[#3d9a8b] font-semibold uppercase tracking-[0.2em] text-sm">Equipo de Trabajo</span>
            <div className="w-12 h-[2px] bg-[#3d9a8b]" />
          </div>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 font-bold">
            Nuestro Equipo<br />
            <span className="text-[#3d9a8b]">Profesional</span>
          </h2>
          <div className="w-24 h-1 bg-[#3d9a8b] mx-auto mb-6" />
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Profesionales altamente calificados comprometidos con el desarrollo sostenible del sector forestal
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {directiveMembers.map((member, index) => (
            <motion.div 
              key={index} 
              className="group"
              variants={itemVariants}
            >
              {/* Card Container */}
              <motion.div 
                className="relative h-full bg-white border border-[#3d9a8b]/30 transition-all duration-500"
                whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)" }}
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={400}
                    height={320}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 text-center bg-white border-t-4 border-[#3d9a8b]">
                  <div className="inline-block mb-4">
                    <span className="text-[#3d9a8b] text-xs font-bold uppercase tracking-[0.15em]">
                      {member.position}
                    </span>
                  </div>
                  <h3 className="font-sans text-lg text-[#1a3a5c] mb-2 font-semibold leading-relaxed">{member.name}</h3>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/equipo">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-[#3d9a8b] hover:bg-white text-white hover:text-[#1a3a5c] rounded-none px-10 py-4 font-semibold text-base transition-all duration-300 shadow-none hover:shadow-lg border-2 border-[#3d9a8b]">
                Conocer Equipo Completo
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}


