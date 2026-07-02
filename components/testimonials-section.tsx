"use client"

import { useState, useEffect } from "react"
import { Star, ArrowLeft, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

const testimonials = [
  {
    id: 1,
    name: "Penélope Miller",
    role: "Voluntaria Sr.",
    company: "Arjun",
    rating: 5.0,
    text: "Quedé muy impresionado - proporcionaron excelente asesoramiento y orientación profesional.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Gerente Ambiental",
    company: "EcoTech",
    rating: 5.0,
    text: "Excelente servicio, muy profesionales y comprometidos con la sostenibilidad ambiental.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
  },
  {
    id: 3,
    name: "María González",
    role: "Directora de Proyectos",
    company: "GreenFuture",
    rating: 5.0,
    text: "Trabajar con ellos fue transformador. Recomiendo sus servicios ampliamente.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
  },
  {
    id: 4,
    name: "Juan Pérez",
    role: "Consultor Forestal",
    company: "ForestCare",
    rating: 5.0,
    text: "Profesionalismo de primera clase. Superaron todas mis expectativas.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
  },
  {
    id: 5,
    name: "Ana Silva",
    role: "Especialista en Reciclaje",
    company: "RecycleHub",
    rating: 5.0,
    text: "Increíble equipo, muy dedicados a la causa ambiental. Altamente recomendado.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
  },
  {
    id: 6,
    name: "Roberto Díaz",
    role: "Coordinador de Proyectos",
    company: "EcoSolutions",
    rating: 5.0,
    text: "Excelente atención al cliente y resultados excepcionales en todos los proyectos.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
  },
  {
    id: 7,
    name: "Laura Martínez",
    role: "Directora Ejecutiva",
    company: "GreenWorld",
    rating: 5.0,
    text: "Socios confiables que entienden verdaderamente la importancia de la sostenibilidad.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
  },
  {
    id: 8,
    name: "Miguel Torres",
    role: "Ingeniero Ambiental",
    company: "EcoTech Plus",
    rating: 5.0,
    text: "Innovadores y comprometidos. Definitivamente volvería a trabajar con ellos.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerRow = 4
  const totalRows = Math.ceil(testimonials.length / itemsPerRow)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalRows)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalRows) % totalRows)
  }

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerRow,
    (currentIndex + 1) * itemsPerRow
  )

  return (
    <section className="section-padding bg-[#1a3a5c] relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/8 rounded-full blur-3xl -mr-48 -mt-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/8 rounded-full blur-3xl -ml-48 -mb-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      />

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p 
            className="text-sm font-bold text-[#3d9a8b] uppercase tracking-widest mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Testimonios
          </motion.p>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Por Qué Confían
            <span className="text-[#3d9a8b] block">En Nosotros</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Nuestros clientes están altamente satisfechos y recomiendan nuestros servicios. Somos comprometidos con la excelencia y la satisfacción del cliente.
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="flex items-center justify-center gap-6 mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-[#3d9a8b] to-[#2d7a6b] rounded-2xl px-8 py-4 shadow-lg">
              <div className="text-4xl font-bold text-white">99%</div>
              <p className="text-white/90 text-sm font-semibold">Reseñas Positivas</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-[#1a3a5c]/60 to-[#1a3a5c]/40 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#3d9a8b]/30 hover:border-[#3d9a8b]/60 h-full flex flex-col backdrop-blur-md">
                  {/* Header with Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="w-14 h-14 rounded-full overflow-hidden border-3 border-[#3d9a8b] shadow-md flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-bold text-white text-sm">{testimonial.name}</p>
                      <p className="text-[#3d9a8b] text-xs font-semibold">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <motion.div 
                    className="flex gap-1 mb-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-[#3d9a8b] fill-[#3d9a8b]"
                      />
                    ))}
                  </motion.div>

                  {/* Text */}
                  <p className="text-white/90 text-sm leading-relaxed mb-6 flex-grow">
                    "{testimonial.text}"
                  </p>

                  {/* Company */}
                  <div className="pt-4 border-t border-[#3d9a8b]/20">
                    <p className="text-xs text-[#3d9a8b] font-bold uppercase tracking-wider">
                      {testimonial.company}
                    </p>
                  </div>

                  {/* Decorative accent */}
                  <motion.div
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#3d9a8b] to-[#2d7a6b] w-0 group-hover:w-full transition-all duration-500 rounded-t-3xl"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Controls */}
          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3d9a8b] to-[#2d7a6b] text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalRows }).map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-[#3d9a8b] w-8"
                      : "bg-[#3d9a8b]/30 w-2 hover:bg-[#3d9a8b]/60"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3d9a8b] to-[#2d7a6b] text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Write Review CTA */}
          <motion.div
            className="mt-16 text-center hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#3d9a8b] to-[#2d7a6b] text-white rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-xl transition-all group"
            >
              <MessageCircle className="w-5 h-5" />
              Escribe tu reseña honesta
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
