"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { IconBadge } from "@/components/ui/IconBadge"

const slides = [
  {
    subtitle: "Consultoría Forestal y Ambiental",
    title: "Gestión Ambiental",
    titleHighlight: "Con Respaldo Legal",
    description: "Sistemas de gestión ISO 14001, plantaciones comerciales y asesoría técnica para tu empresa.",
  },
  {
    subtitle: "Capacitación Certificada",
    title: "Formación Profesional",
    titleHighlight: "SENECYT y Ministerio del Trabajo",
    description: "Cursos certificados en gestión ambiental, forestal y desarrollo sostenible para profesionales.",
  },
]

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden py-24 lg:py-32">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45]" />
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-25">
        <Image
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013"
          alt="Volunteers planting trees"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a5c]/95 via-[#163250]/85 to-[#0f2a45]/70" />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-24 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="w-full z-30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div 
                className="px-8 py-3.5 backdrop-blur-md bg-[#3d9a8b]/15 border-l-4 border-[#3d9a8b] text-white font-bold text-base md:text-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span>{slides[currentSlide].subtitle}</span>
              </motion.div>
            </motion.div>

            {/* Slide Content Container with Reserved Height */}
            <div className="min-h-[360px] md:min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="space-y-3">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight">
                      {slides[currentSlide].title}<br />
                      <span className="block text-[#3d9a8b] text-4xl md:text-5xl lg:text-6xl mt-2">
                        {slides[currentSlide].titleHighlight}
                      </span>
                    </h1>
                  </div>

                  <p className="text-white/85 text-xl md:text-2xl max-w-2xl leading-relaxed min-h-[80px]">
                    {slides[currentSlide].description}
                  </p>

                  <motion.div 
                    className="flex flex-wrap items-center gap-5 pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {/* Primary CTA Button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-[#3d9a8b] hover:bg-[#358578] text-white rounded-none px-12 py-6 group font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-xl border-2 border-[#3d9a8b]">
                        Únete Hoy
                        <ArrowRight className="ml-3 h-6 w-7 group-hover:translate-x-3 transition-transform" />
                      </Button>
                    </motion.div>
                    
                    {/* Secondary CTA Button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" variant="secondary" className="bg-transparent border-2 border-white hover:bg-white/10 text-white rounded-none px-12 py-6 font-bold transition-all duration-300 text-xl">
                        Conocer Más
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <motion.div 
              className="flex gap-4 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-4 transition-all duration-300 ${
                    currentSlide === index ? "w-20 bg-[#3d9a8b]" : "w-12 bg-white/40 hover:bg-white/60"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Content - Corporate Images */}
          <motion.div 
            className="hidden lg:block flex justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                className="relative rounded-none overflow-hidden shadow-2xl border-4 border-[#3d9a8b]/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800"
                  alt="Equipo profesional"
                  width={540}
                  height={400}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/60 to-transparent" />
              </motion.div>
              
              {/* Floating Image 1 */}
              <motion.div
                className="absolute -left-10 top-8 rounded-none overflow-hidden shadow-xl border-4 border-[#3d9a8b]/40"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ y: -4, scale: 1.03 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=300"
                  alt="Reforestación"
                  width={170}
                  height={120}
                  className="object-cover"
                />
              </motion.div>
              
              {/* Floating Image 2 */}
              <motion.div
                className="absolute right-0 bottom-8 rounded-none overflow-hidden shadow-xl border-4 border-white/20"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ y: -4, scale: 1.03 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=300"
                  alt="Capacitación"
                  width={150}
                  height={110}
                  className="object-cover"
                />
              </motion.div>
              
              {/* Stats Badge */}
              <motion.div
                className="absolute -bottom-8 left-8 bg-white rounded-none p-6 shadow-2xl border-l-4 border-[#3d9a8b]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#3d9a8b]/20 flex items-center justify-center">
                    <div className="text-[#3d9a8b] font-bold text-2xl">
                      🌲
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1a3a5c]">5000+</div>
                    <div className="text-gray-600 text-sm">Árboles Plantados</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
