"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

const forestImages = [
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
  "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&q=80",
]

const expoData = {
  badge: "Feria Anual",
  title: "Expo Forestal",
  titleHighlight: "TAMEFOR 2026",
  subtitle: "Feria de Innovación y Sostenibilidad Ambiental",
  description: "La feria más grande de tecnología forestal, maquinaria, insumos y servicios ambientales. Encuentra proveedores, descubre innovaciones y establece alianzas estratégicas para tu negocio.",
  registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLScfKpEeLrGQnHdOaLQ1s4dWQ6",
  stats: [
    {
      icon: Calendar,
      label: "Fechas",
      value: "15-17 de Septiembre, 2026"
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "Centro de Convenciones, Quevedo"
    },
    {
      icon: Users,
      label: "Expositores",
      value: "+80 empresas del sector forestal"
    }
  ]
}

export function CongressSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % forestImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section-padding bg-[#0f2a45] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#3d9a8b]/5 via-transparent to-[#1a3a5c]/10" />

      <div className="container-max relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="relative h-[450px] overflow-hidden border-4 border-[#3d9a8b] shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={forestImages[currentImageIndex]}
                      alt={`${expoData.title} ${expoData.titleHighlight}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a45]/95 via-[#0f2a45]/50 to-transparent" />
                <motion.div
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="bg-white/10 backdrop-blur-md p-5 border border-white/20">
                    <h3 className="text-2xl font-sans font-bold text-white mb-2">
                      {expoData.title} {expoData.titleHighlight}
                    </h3>
                    <p className="text-[#3d9a8b] text-sm font-medium">{expoData.subtitle}</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative dots */}
              <div className="absolute -bottom-4 -right-4 grid grid-cols-5 gap-1">
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-[#3d9a8b]/40"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.03, duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="w-8 h-1 bg-[#3d9a8b]" />
                <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">{expoData.badge}</span>
              </motion.div>

              <motion.h2
                className="font-sans text-5xl md:text-6xl text-white leading-tight mb-2 font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {expoData.title}
              </motion.h2>
              <motion.h3
                className="font-sans text-3xl md:text-4xl text-[#3d9a8b] leading-tight mb-6 font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {expoData.titleHighlight}
              </motion.h3>

              <motion.p
                className="text-white/90 mb-8 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {expoData.description}
              </motion.p>

              <div className="space-y-4 mb-8">
                {expoData.stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 group cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        className="w-14 h-14 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#3d9a8b]/30"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                      </motion.div>
                      <div>
                        <p className="text-sm text-white/70 uppercase tracking-wider">{stat.label}</p>
                        <p className="font-semibold text-white text-lg">{stat.value}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <a
                  href={expoData.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                               bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                               shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                               transition-shadow duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Inscríbete
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
