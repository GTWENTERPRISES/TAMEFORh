"use client"

import { useState, useEffect } from "react"
import { Star, ArrowLeft, ArrowRight, MessageCircle, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Ing. For. Juan Carlos Mendoza",
    role: "Gerente de Operaciones",
    company: "Bosques y Maderas S.A.",
    rating: 5.0,
    text: "La consultoría de TAMEFOR fue fundamental para la certificación FSC de nuestra empresa. Su profesionalismo y conocimiento técnico superaron todas nuestras expectativas.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
  },
  {
    id: 2,
    name: "Dra. Ana María Vásquez",
    role: "Directora Ambiental",
    company: "Corporación Verde Ecológica",
    rating: 5.0,
    text: "Los cursos de biometría y modelación nos proporcionaron herramientas avanzadas para la gestión sostenible de nuestros ecosistemas.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
  },
  {
    id: 3,
    name: "Ing. Carlos Alberto Ramírez",
    role: "Jefe de Proyectos Forestales",
    company: "Ecosistemas del Sur Ltda.",
    rating: 5.0,
    text: "Su asesoría en la elaboración de planes de manejo forestal fue excepcional. Cumplimos con todas las normativas ambientales vigentes.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
  },
  {
    id: 4,
    name: "Mg. Patricia Lucía Gómez",
    role: "Coordinadora de Certificación",
    company: "Sostenibilidad Forestal S.A.S",
    rating: 5.0,
    text: "El acompañamiento en el proceso de certificación PEFC fue impecable. Recomiendo encarecidamente sus servicios profesionales.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
  },
  {
    id: 5,
    name: "Ing. For. Roberto Hernández",
    role: "Consultor Independiente",
    company: "Consultoría Ambiental Integral",
    rating: 5.0,
    text: "Los programas de capacitación en SIG y manejo de datos forestales son de la más alta calidad académica y práctica.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
  },
  {
    id: 6,
    name: "Abg. Luisa Fernanda Torres",
    role: "Asesora Legal Ambiental",
    company: "Estudio Jurídico Ambiental",
    rating: 5.0,
    text: "Su expertise en normativa forestal y ambiental es invaluable. Trabajar con TAMEFOR garantiza compliance total.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
  },
  {
    id: 7,
    name: "Ing. For. Mario Enrique Duarte",
    role: "Director Técnico",
    company: "Maderas del Caribe S.A.",
    rating: 5.0,
    text: "El curso de manejo de datos forestales transformó nuestra forma de trabajar. Ahora contamos con información precisa para la toma de decisiones.",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=400",
  },
  {
    id: 8,
    name: "Mg. Claudia Patricia Ortega",
    role: "Jefa de Conservación",
    company: "Reserva Natural del Valle",
    rating: 5.0,
    text: "Su apoyo en la elaboración de nuestro plan de conservación fue crucial para obtener el reconocimiento oficial.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
  },
  {
    id: 9,
    name: "Ing. Andrés Felipe Mejía",
    role: "Gerente de Sostenibilidad",
    company: "Industrias Forestales Unidas",
    rating: 5.0,
    text: "Los servicios de TAMEFOR nos ayudaron a reducir nuestra huella de carbono en un 40% en solo dos años.",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400",
  },
  {
    id: 10,
    name: "Dra. Sofía Isabel Paredes",
    role: "Investigadora Principal",
    company: "Instituto de Ciencias Forestales",
    rating: 5.0,
    text: "La capacitación en sistemas de información geográfica elevó el nivel de nuestros proyectos de investigación significativamente.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400",
  },
  {
    id: 11,
    name: "Ing. For. Diego Alejandro Rincón",
    role: "Coordinador de Inventarios",
    company: "Corporación Forestal Nacional",
    rating: 5.0,
    text: "El curso de biometría forestal nos proporcionó las herramientas necesarias para realizar inventarios precisos y eficientes.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
  },
  {
    id: 12,
    name: "Mg. Valentina Alexandra Castro",
    role: "Asesora en Gestión Ambiental",
    company: "Grupo Ambiental Latinoamericano",
    rating: 5.0,
    text: "Recomiendo TAMEFOR a todas las empresas que busquen excelencia en consultoría forestal y ambiental. Son verdaderos expertos.",
    image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=400",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerRow = 3
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
                <div className="bg-white/95 backdrop-blur-sm border border-[#3d9a8b]/30 transition-all duration-500 hover:shadow-xl h-full flex flex-col">
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
