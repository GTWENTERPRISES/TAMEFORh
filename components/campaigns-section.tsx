"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Users, Calendar as CalendarIcon, Sparkles } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

export function CampaignsSection() {
  return (
    <section id="campaigns" className="py-12 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="container-max">
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Left Content */}
          <motion.div className="max-w-2xl" variants={itemVariants}>
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-[#3d9a8b] text-white px-6 py-2 font-bold uppercase tracking-wider text-sm mb-6"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Feria Anual</span>
            </motion.div>

            {/* Title */}
            <motion.h2 
              className="text-5xl md:text-6xl text-[#1a3a5c] font-bold leading-tight mb-4"
              variants={itemVariants}
            >
              Expo Forestal<br />
              <span className="text-[#3d9a8b]">TAMEFOR 2026</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.h3 
              className="text-2xl md:text-3xl text-[#1a3a5c]/80 mb-6 font-semibold"
              variants={itemVariants}
            >
              Feria de Innovación y Sostenibilidad Ambiental
            </motion.h3>

            {/* Description */}
            <motion.p 
              className="text-[#1a3a5c]/70 text-lg md:text-xl mb-12 leading-relaxed"
              variants={itemVariants}
            >
              La feria más grande de tecnología forestal, maquinaria, insumos y servicios ambientales. Encuentra proveedores, descubre innovaciones y establece alianzas estratégicas para tu negocio.
            </motion.p>

            {/* Event Details */}
            <motion.div 
              className="space-y-4 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {/* Dates */}
              <motion.div 
                className="flex items-start gap-4 p-4 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b] hover:border-[#3d9a8b] transition-all duration-300"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                  <CalendarIcon className="w-5 h-5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-[#1a3a5c]/60 text-sm font-medium mb-1">Fechas</p>
                  <p className="text-[#1a3a5c] font-bold text-base">15-17 de Septiembre, 2026</p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div 
                className="flex items-start gap-4 p-4 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b] hover:border-[#3d9a8b] transition-all duration-300"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-[#1a3a5c]/60 text-sm font-medium mb-1">Ubicación</p>
                  <p className="text-[#1a3a5c] font-bold text-base">Centro de Convenciones, Quevedo</p>
                </div>
              </motion.div>

              {/* Participants */}
              <motion.div 
                className="flex items-start gap-4 p-4 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b] hover:border-[#3d9a8b] transition-all duration-300"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-[#1a3a5c]/60 text-sm font-medium mb-1">Expositores</p>
                  <p className="text-[#1a3a5c] font-bold text-base">+80 empresas del sector forestal</p>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#1a3a5c] hover:bg-[#163250] text-white rounded-none px-10 py-4 font-bold text-lg group transition-all shadow-lg hover:shadow-xl border-2 border-[#1a3a5c]">
                  Más Información
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#3d9a8b] hover:bg-[#358578] text-white rounded-none px-10 py-4 font-bold text-lg group transition-all shadow-lg hover:shadow-xl border-2 border-[#3d9a8b]">
                  Inscríbete
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative h-96 lg:h-full min-h-96 overflow-hidden shadow-2xl border-4 border-[#3d9a8b]/30"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000"
              alt="Expo Forestal TAMEFOR 2026"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/40 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
