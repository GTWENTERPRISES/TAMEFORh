"use client"

import { useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { getAllTestimonios, type Testimonial } from "@/lib/api/testimonios"
import { SectionHeader } from "@/components/ui"

interface TestimonialsSectionProps {
  initialTestimonials?: Testimonial[]
}

export function TestimonialsSection({ initialTestimonials }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials || [])

  // Cargar testimonios desde la API al montar el componente
  useEffect(() => {
    if (!initialTestimonials) {
      getAllTestimonios().then(setTestimonials)
    }
  }, [initialTestimonials])

  // Duplicamos la lista para que el carrusel se recorra sin costuras
  const trackTestimonials = testimonials.length > 0 ? [...testimonials, ...testimonials] : []

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Single descentered blur - different from other sections */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#3d9a8b]/8 blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      <style jsx global>{`
        @keyframes testimonials-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .testimonials-track {
          animation: testimonials-marquee 45s linear infinite;
        }
        .testimonials-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonials-track {
            animation: none;
          }
        }
      `}</style>

      <div className="container-max relative z-10">
        <SectionHeader
          icon={Quote}
          subtitle="Testimonios"
          title="Por Qué Confían"
          titleHighlight="En Nosotros"
          description="Nuestros clientes reconocen la excelencia profesional y el compromiso con la sostenibilidad ambiental que define cada uno de nuestros servicios"
          centered
        />

        {/* Stats */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] px-10 py-6 border-t-4 border-[#3d9a8b]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div className="text-4xl font-bold text-white">99%</div>
            <p className="text-white/80 text-sm font-semibold">Reseñas Positivas</p>
          </motion.div>
        </motion.div>

        {/* Infinite Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mt-12"
        >
          {/* Fade edges so cards appear to flow in/out */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="overflow-hidden">
            <div className="testimonials-track flex gap-8 w-max">
              {trackTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  className="group relative w-[320px] md:w-[360px] flex-shrink-0"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ zIndex: 1 }}
                >
                  <div className="relative bg-white border border-[#1a3a5c]/10 border-l-4 border-l-[#3d9a8b] shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-[#3d9a8b]/60 h-full flex flex-col overflow-hidden">
                    {/* Diagonal accent */}
                    <div
                      className="absolute top-0 right-0 w-12 h-12 bg-[#3d9a8b]/10 transition-all duration-500 group-hover:bg-[#3d9a8b] group-hover:scale-125"
                      style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                    />

                    {/* Bottom animated line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-500" />

                    {/* Quote icon */}
                    <div className="p-8 pb-6">
                      <Quote className="w-8 h-8 text-[#3d9a8b] mb-6 transition-transform duration-500 group-hover:-rotate-12" />

                      {/* Text */}
                      <p className="text-[#1a3a5c]/80 text-sm leading-relaxed mb-8 flex-grow">
                        "{testimonial.text}"
                      </p>

                      {/* Rating */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#3d9a8b] fill-[#3d9a8b]" />
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-[#1a3a5c]/10 pt-6">
                        {/* Header with Avatar */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 overflow-hidden border-2 border-[#3d9a8b] flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}