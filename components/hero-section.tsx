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
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
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
    <section className="relative h-[70vh] flex items-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f4c3a]" />
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013"
          alt="Volunteers planting trees"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a5f]/70 to-transparent" />
      
      {/* Floating Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-[#3d9a8b]/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#3d9a8b]/15 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -20, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Social Links - Right Side */}
      <motion.div 
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {socialLinks.map((social, i) => (
          <IconBadge
            key={i}
            icon={social.icon}
            variant="secondary"
            size="md"
            animated
          />
        ))}
        <motion.div 
          className="text-secondary/60 text-sm mt-4 rotate-180"
          style={{ writingMode: 'vertical-rl' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Únete Social
        </motion.div>
      </motion.div>

      <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <motion.div 
            className="flex-1 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div 
                className="px-5 py-2.5 rounded-full backdrop-blur-md bg-[#3d9a8b]/20 border border-[#3d9a8b]/40 text-white font-medium text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
              >
                <span>{slides[currentSlide].subtitle}</span>
              </motion.div>
            </motion.div>

            {/* Slide Content Container with Fixed Height */}
            <div className="h-[320px]">
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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight">
                      {slides[currentSlide].title}<br />
                      <span className="text-[#3d9a8b] drop-shadow-xl">{slides[currentSlide].titleHighlight}</span>
                    </h1>
                  </div>

                  <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed min-h-[70px]">
                    {slides[currentSlide].description}
                  </p>

                  <motion.div 
                    className="flex flex-wrap items-center gap-4 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {/* Primary CTA Button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="bg-[#3d9a8b] hover:bg-[#358578] text-white rounded-full px-10 py-5 group font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 text-lg">
                        Únete Hoy
                        <ArrowRight className="ml-2 h-5 w-6 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </motion.div>
                    
                    {/* Secondary CTA Button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" variant="secondary" className="bg-transparent border-2 border-primary-foreground hover:bg-primary-foreground/10 text-primary-foreground rounded-full px-10 py-5 font-semibold transition-all duration-300 text-lg">
                        Conocer Más
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <motion.div 
              className="flex gap-3 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-4 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "w-12 bg-[#3d9a8b] shadow-lg shadow-[#3d9a8b]/30" : "w-4 bg-white/30 hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Content - Corporate Images */}
          <motion.div 
            className="hidden xl:block flex-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800"
                  alt="Equipo profesional"
                  width={500}
                  height={360}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 to-transparent" />
              </motion.div>
              
              {/* Floating Image 1 */}
              <motion.div
                className="absolute left-0 -translate-x-1/2 top-1/6 rounded-2xl overflow-hidden shadow-xl border-4 border-[#3d9a8b]/30"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ y: -6, scale: 1.05 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=300"
                  alt="Reforestación"
                  width={160}
                  height={120}
                  className="object-cover"
                />
              </motion.div>
              
              {/* Floating Image 2 */}
              <motion.div
                className="absolute right-0 translate-x-1/3 bottom-1/6 rounded-2xl overflow-hidden shadow-xl border-4 border-white/20"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ y: -6, scale: 1.05 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=300"
                  alt="Capacitación"
                  width={135}
                  height={100}
                  className="object-cover"
                />
              </motion.div>
              
              {/* Stats Badge */}
              <motion.div
                className="absolute -bottom-5 left-0 bg-white rounded-2xl p-5 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#3d9a8b]/20 rounded-2xl flex items-center justify-center">
                    <div className="text-[#3d9a8b] font-bold text-xl">
                      🌲
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#0f172a]">5000+</div>
                    <div className="text-gray-500 text-xs md:text-sm">Árboles Plantados</div>
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


