"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function DirectiveSection() {
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
    <section className="py-20 bg-[#1a3a5c] relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -mr-48 -mt-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -ml-48 -mb-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
            </svg>
            <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Directiva</span>
          </div>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 font-bold">
            Conoce a Nuestros<br />
            <span className="text-[#3d9a8b]">Líderes Profesionales</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Profesionales comprometidos con el desarrollo sostenible del sector forestal
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16"
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
              whileHover={{ y: -10 }}
            >
              {/* Card Container */}
              <motion.div 
                className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#3d9a8b]/20 to-[#3d9a8b]/5 border border-[#3d9a8b]/30 backdrop-blur-sm hover:border-[#3d9a8b]/60 transition-all duration-300 shadow-lg hover:shadow-2xl"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(61, 154, 139, 0.3)" }}
              >
                {/* Image Container */}
                <motion.div 
                  className="relative h-80 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c] via-[#1a3a5c]/40 to-transparent" />
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="p-6 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="bg-[#3d9a8b] text-white text-xs font-bold px-4 py-2 rounded-full inline-block mb-4 uppercase tracking-wider"
                    whileHover={{ scale: 1.1 }}
                  >
                    {member.position}
                  </motion.div>
                  <h3 className="font-sans text-lg text-white mb-2 font-bold leading-tight">{member.name}</h3>
                  <p className="text-[#3d9a8b] text-sm font-medium">{member.registration}</p>
                </motion.div>
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
          <Link href="/directiva">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#3d9a8b] hover:bg-white text-white hover:text-[#1a3a5c] rounded-full px-8 py-3 font-semibold text-lg group transition-all duration-300 shadow-lg hover:shadow-xl">
                Ver Directiva Completa
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}


