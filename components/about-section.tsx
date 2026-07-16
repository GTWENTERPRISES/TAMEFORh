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
  { icon: Leaf, value: "500+", label: "Proyectos Ambientales Realizados" },
]

export function AboutSection() {
  const [activeTab, setActiveTab] = useState("Nuestra Historia")

  return (
    <section id="about" className="section-padding bg-[#1a3a5c] text-white relative overflow-hidden">
      <div className="container-max relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Image Side - Formal Design */}
          <motion.div className="relative h-[450px] lg:h-full flex items-center justify-center" variants={slideInFromLeftVariants}>
            {/* Decorative background - Formal */}
            <motion.div 
              className="absolute -bottom-10 -left-10 w-72 h-72 border-2 border-[#3d9a8b]/30"
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            <motion.div 
              className="absolute -top-10 -right-10 w-72 h-72 border-2 border-[#3d9a8b]/20"
              initial={{ opacity: 0, x: 20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />

            {/* Main Image - Formal */}
            <motion.div 
              className="relative z-10 w-full max-w-md h-[400px] overflow-hidden shadow-xl border-2 border-[#1a3a5c]/10"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1200"
                alt="Equipo TAMEFOR"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay Gradient - Formal */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/80 via-transparent to-transparent" />
              
              {/* Award Badge - Formal */}
              <motion.div 
                className="absolute bottom-6 left-6 bg-white text-[#1a3a5c] p-5 shadow-lg border-l-4 border-[#3d9a8b]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#3d9a8b]/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-[#1a3a5c] text-sm font-bold leading-tight">2026 - Reconocimiento</p>
                    <p className="text-[#1a3a5c]/70 text-xs font-medium">Excelencia Ambiental</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Trust Badge - Formal */}
            <motion.div 
              className="absolute -top-5 -right-5 bg-white text-[#1a3a5c] p-6 z-30 shadow-xl border-2 border-[#3d9a8b]"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-5xl font-black text-[#3d9a8b] mb-1">500+</div>
                <div className="text-[#1a3a5c] text-xs font-semibold uppercase tracking-wider">Proyectos<br/>Completados</div>
              </div>
            </motion.div>

          </motion.div>

          {/* Content Side - Enhanced */}
          <motion.div className="space-y-8" variants={slideInFromRightVariants}>
            {/* Header */}
            <motion.div variants={itemVariants}>
              <SectionHeader
                icon={Leaf}
                subtitle="Sobre Nosotros"
                title="Construyendo un Futuro"
                titleHighlight="Forestal Sostenible"
                centered={false}
                dark={true}
                description="Conoce a TAMEFOR S.A.S B.I.C - Consultoría forestal y ambiental"
              />
            </motion.div>

            {/* Tabs - Formal */}
            <motion.div 
              className="flex flex-wrap gap-4 border-b border-[#3d9a8b]/30 pb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {tabs.map((tab, idx) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${
                    activeTab === tab
                      ? "text-[#3d9a8b] border-[#3d9a8b]"
                      : "text-white/70 border-transparent hover:text-white hover:border-[#3d9a8b]/50"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  {tab}
                </motion.button>
              ))}
            </motion.div>

            {/* Tab Content - Formal */}
            <motion.div 
              className="space-y-6 pt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              key={activeTab}
            >
              <motion.p 
                className="text-white/90 leading-relaxed text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {tabContent[activeTab as keyof typeof tabContent].text}
              </motion.p>
              <ul className="space-y-3 pt-2">
                {tabContent[activeTab as keyof typeof tabContent].points.map((point, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-6 h-6 border-2 border-[#3d9a8b] flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-[#3d9a8b]" />
                    </div>
                    <span className="text-white/80 text-sm leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA - Formal */}
            <motion.div 
              className="pt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
              >
                <Button className="bg-[#3d9a8b] hover:bg-[#3d9a8b]/90 text-white rounded-none px-10 py-4 font-semibold shadow-md transition-all text-base border-2 border-[#3d9a8b]">
                  Conocer Más
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
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
