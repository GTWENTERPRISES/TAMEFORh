"use client"

import { useState, useEffect } from "react"
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { getAllTestimonios, type Testimonial } from "@/lib/api/testimonios"

interface TestimonialsSectionProps {
  initialTestimonials?: Testimonial[]
}

export function TestimonialsSection({ initialTestimonials }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials || [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerRow = 3
  const totalRows = Math.ceil(testimonials.length / itemsPerRow)

  // Cargar testimonios desde la API al montar el componente
  useEffect(() => {
    if (!initialTestimonials) {
      getAllTestimonios().then(setTestimonials)
    }
  }, [initialTestimonials])

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
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 -ml-48 -mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-[2px] bg-[#3d9a8b]" />
            <span className="text-[#3d9a8b] font-semibold uppercase tracking-[0.2em] text-sm">Testimonios</span>
            <div className="w-12 h-[2px] bg-[#3d9a8b]" />
          </div>
          
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 font-bold">
            Por Qué Confían<br />
            <span className="text-[#3d9a8b]">En Nosotros</span>
          </h2>
          
          <div className="w-24 h-1 bg-[#3d9a8b] mx-auto mb-6" />
          
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            Nuestros clientes reconocen la excelencia profesional y el compromiso con la sostenibilidad ambiental que define cada uno de nuestros servicios.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6">
            <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] px-10 py-6 border-t-4 border-[#3d9a8b]">
              <div className="text-4xl font-bold text-white">99%</div>
              <p className="text-white/80 text-sm font-semibold">Reseñas Positivas</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          key={currentIndex}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="bg-white/95 backdrop-blur-sm border border-[#3d9a8b]/30 border-l-4 border-l-[#3d9a8b] transition-all duration-500 hover:shadow-xl h-full flex flex-col">
                  {/* Quote icon */}
                  <div className="p-8 pb-6">
                    <Quote className="w-8 h-8 text-[#3d9a8b] mb-6" />
                    
                    {/* Text */}
                    <p className="text-[#1a3a5c]/80 text-sm leading-relaxed mb-8 flex-grow">
                      "{testimonial.text}"
                    </p>

                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-[#3d9a8b] fill-[#3d9a8b]"
                        />
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#1a3a5c]/10 pt-6">
                      {/* Header with Avatar */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 overflow-hidden border-2 border-[#3d9a8b] flex-shrink-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-[#1a3a5c] text-sm leading-tight">{testimonial.name}</p>
                          <p className="text-[#3d9a8b] text-xs font-semibold">{testimonial.role}</p>
                          <p className="text-[#1a3a5c]/60 text-xs uppercase tracking-wider mt-1">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Controls */}
          {totalRows > 1 && (
            <motion.div
              className="flex items-center justify-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white transition-all duration-300 flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-3">
                {Array.from({ length: totalRows }).map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 transition-all ${
                      idx === currentIndex
                        ? "bg-[#3d9a8b] w-8"
                        : "bg-white/30 w-2 hover:bg-white/60"
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white transition-all duration-300 flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
