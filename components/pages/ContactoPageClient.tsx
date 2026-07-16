'use client'

import { ContactSection } from "@/components/contact-section"
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

export function ContactoPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-r from-[#1a3a5c] via-[#163250] to-[#0f2a45]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1554266573-199031e79153?q=80&w=2070"
            alt="Contacto"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="flex items-center justify-center gap-2 mb-8" variants={itemVariants}>
              <div className="w-12 h-[2px] bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Contáctanos</span>
              <div className="w-12 h-[2px] bg-[#3d9a8b]" />
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Atención al Cliente<br />
              <span className="text-[#3d9a8b]">TAMEFOR S.A.S B.I.C</span>
            </motion.h1>
            <div className="w-24 h-1 bg-[#3d9a8b] mx-auto mb-8" />
            <motion.p className="text-white/80 text-xl max-w-2xl mx-auto" variants={itemVariants}>
              Estamos comprometidos con la excelencia en nuestro servicio. Ponte en contacto con nosotros para recibir información detallada sobre nuestros programas y servicios.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <ContactSection />
      </motion.div>
    </>
  )
}
