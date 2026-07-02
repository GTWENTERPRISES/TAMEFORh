"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight, Play, TrendingUp, Lightbulb, ThumbsUp, Users, Leaf, Award } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SectionHeader, StatCard, IconBadge } from "@/components/ui"
import { containerVariants, itemVariants, imageVariants, hoverLiftVariants, slideInFromLeftVariants, slideInFromRightVariants } from "@/lib/animations"

const tabs = ["Nuestra Historia", "Nuestra Misión", "Nuestra Visión"]

const tabContent = {
  "Nuestra Historia": {
    text: "Fundados en 2025, TAMEFOR S.A.S B.I.C nace como una consultora forestal y ambiental constituida como empresa B.I.C. (Beneficio e Interés Colectivo), comprometida con la sostenibilidad y el desarrollo empresarial responsable.",
    points: [
      "Empresa B.I.C. enfocada en beneficio colectivo y ambiental",
      "Equipo multidisciplinario de expertos en gestión ambiental y forestal",
      "Respaldo técnico, legal y normativo en cada proyecto",
    ],
  },
  "Nuestra Misión": {
    text: "Ayudar a empresas y personas naturales a crecer en armonía con el entorno, asegurando que sus proyectos sean viables, sostenibles y rentables mediante servicios de consultoría forestal, gestión ambiental y capacitación profesional certificada.",
    points: [
      "Tranquilidad legal: cumplimiento total de normativas ambientales",
      "Eficiencia en recursos: manejo inteligente y sostenible",
      "Educación con impacto: formación certificada por SENECYT",
    ],
  },
  "Nuestra Visión": {
    text: "Ser la consultora forestal y ambiental de referencia en Ecuador, reconocida por nuestro compromiso con la sostenibilidad, la excelencia técnica y la formación profesional de calidad que transforma empresas y profesionales.",
    points: [
      "Líderes en gestión ambiental con certificaciones ISO",
      "Referentes en capacitación profesional certificada",
      "Aliados estratégicos para el desarrollo empresarial sostenible",
    ],
  },
}

const stats = [
  { icon: TrendingUp, value: "2025", label: "Año de Fundación" },
  { icon: Lightbulb, value: "ISO", label: "Certificaciones 14001 y 9001" },
  { icon: ThumbsUp, value: "B.I.C", label: "Empresa de Beneficio Colectivo" },
  { icon: Users, value: "100%", label: "Proyectos con Respaldo Legal" },
]

export function AboutSection() {
  const [activeTab, setActiveTab] = useState("Nuestra Historia")

  return (
    <section id="about" className="section-padding bg-[#1a3a5c] text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-48 -mt-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      />

      <div className="container-max relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Image Side - Enhanced */}
          <motion.div className="relative h-96 lg:h-full flex items-center justify-center" variants={slideInFromLeftVariants}>
            {/* Decorative background circle */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#3d9a8b]/10 to-transparent rounded-full blur-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />

            {/* Main Image */}
            <motion.div 
              className="relative z-10 w-64 h-80 rounded-3xl overflow-hidden border-4 border-[#3d9a8b] shadow-2xl"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074"
                alt="Voluntario ambiental"
                fill
                className="object-cover"
              />
              {/* Award Badge - Enhanced */}
              <motion.div 
                className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-[#3d9a8b] to-[#2d7a6b] rounded-2xl p-4 flex items-center gap-3 shadow-xl border border-[#3d9a8b]/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">2024 - Somos los</p>
                  <p className="text-white/90 text-xs font-semibold">mejores ganadores</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Secondary Image with Play Button - Enhanced */}
            <motion.div 
              className="absolute top-16 left-40 w-56 h-72 rounded-full overflow-hidden border-4 border-[#3d9a8b] shadow-2xl z-20"
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08, y: -10 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013"
                alt="Persona con planta"
                fill
                className="object-cover"
              />
              {/* Play Button - Enhanced */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 to-transparent hover:from-black/60 transition-all">
                <motion.button 
                  className="w-16 h-16 bg-gradient-to-br from-[#3d9a8b] to-[#2d7a6b] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </motion.button>
              </div>
            </motion.div>

            {/* Years Experience Badge - Enhanced */}
            <motion.div 
              className="absolute -top-4 right-8 bg-gradient-to-br from-[#3d9a8b] to-[#2d7a6b] rounded-3xl p-5 z-30 shadow-xl border border-[#3d9a8b]/50"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <div className="text-5xl font-bold text-white">29<span className="text-2xl">+</span></div>
              <div className="text-white text-sm font-bold mt-1">Años de<br/>experiencia</div>
            </motion.div>

            {/* Decorative dots */}
            <motion.div 
              className="absolute bottom-0 left-0 grid grid-cols-6 gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.div 
                  key={i} 
                  className="w-3 h-3 rounded-full bg-[#3d9a8b]/40 hover:bg-[#3d9a8b]/80 transition-colors"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Content Side - Enhanced */}
          <motion.div className="space-y-8" variants={slideInFromRightVariants}>
            {/* Header */}
            <motion.div variants={itemVariants}>
              <SectionHeader
                icon={Leaf}
                title="Construyendo un Futuro"
                titleHighlight="Más Verde Juntos"
                centered={false}
              />
            </motion.div>

            {/* Tabs - Enhanced */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {tabs.map((tab, idx) => (
                <motion.div 
                  key={tab} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Button
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full text-sm font-bold transition-all shadow-md ${
                      activeTab === tab 
                        ? "bg-[#3d9a8b] text-[#1a3a5c] hover:bg-[#3d9a8b]/90 shadow-lg" 
                        : "bg-white text-[#1a3a5c] hover:bg-white/90 border-2 border-white shadow-md"
                    }`}
                  >
                    {tab}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Tab Content - Enhanced */}
            <motion.div 
              className="space-y-6 bg-gradient-to-br from-[#1a3a5c]/60 to-[#1a3a5c]/40 rounded-3xl p-8 border border-[#3d9a8b]/30 backdrop-blur-md shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              key={activeTab}
            >
              <motion.p 
                className="text-white/95 leading-relaxed text-base font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {tabContent[activeTab as keyof typeof tabContent].text}
              </motion.p>
              <ul className="space-y-4">
                {tabContent[activeTab as keyof typeof tabContent].points.map((point, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="bg-[#3d9a8b]/40 rounded-full p-2 mt-0.5 flex-shrink-0 border border-[#3d9a8b]/50"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Check className="h-5 w-5 text-[#3d9a8b]" />
                    </motion.div>
                    <span className="text-white/90 text-sm leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA and Trustpilot - Enhanced */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 pt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
              >
                <Button className="bg-gradient-to-r from-[#3d9a8b] to-[#2d7a6b] hover:from-[#3d9a8b]/90 hover:to-[#2d7a6b]/90 text-[#1a3a5c] rounded-full px-8 py-3 font-bold group shadow-lg hover:shadow-xl transition-all">
                  Explorar Más
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 bg-gradient-to-r from-[#1a3a5c]/60 to-[#1a3a5c]/40 rounded-full px-5 py-3 border border-[#3d9a8b]/30 backdrop-blur-md shadow-md"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
              >
                <span className="text-white font-bold text-sm">Trustpilot</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="w-5 h-5 bg-[#3d9a8b]"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg viewBox="0 0 20 20" fill="white" className="w-full h-full p-0.5">
                        <path d="M10 1L12.39 6.86H18.66L13.63 10.64L15.52 16.5L10 12.72L4.48 16.5L6.37 10.64L1.34 6.86H7.61L10 1Z" />
                      </svg>
                    </motion.div>
                  ))}
                </div>
                <span className="text-[#3d9a8b] text-sm font-bold">Excelente 4.9 de 5</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section - Enhanced */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-24 pt-16 border-t border-[#3d9a8b]/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <StatCard
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
