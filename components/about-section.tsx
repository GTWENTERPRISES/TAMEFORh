"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check, ArrowRight, Leaf, Award, Shield
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SectionHeader } from "@/components/ui"

const tabs = ["Nuestra Historia", "Nuestra Misión", "Nuestra Visión"] as const
type Tab = typeof tabs[number]

const tabContent: Record<Tab, { text: string; points: string[] }> = {
  "Nuestra Historia": {
    text: "Fundados en 2025, TAMEFOR TAPIA & MENA SOLUCIONES FORESTALES Y AMBIENTALES S.A.S. B.I.C nace como una consultora forestal y ambiental constituida como empresa B.I.C. (Beneficio e Interés Colectivo), comprometida con la sostenibilidad y el desarrollo empresarial responsable.",
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

/* ─────────────────────────────────────────
   Main section
───────────────────────────────────────── */
export function AboutSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Nuestra Historia")

  return (
    <section id="about" className="relative overflow-hidden bg-[#0f2540] py-28">

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#3d9a8b]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#1a3a5c]/60 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header estándar */}
        <SectionHeader
          icon={Leaf}
          subtitle="Sobre Nosotros"
          title="Construyendo un Futuro"
          titleHighlight="Forestal Sostenible"
          description="Conoce a TAMEFOR TAPIA & MENA SOLUCIONES FORESTALES Y AMBIENTALES S.A.S. B.I.C — Consultoría forestal y ambiental"
          centered
          dark
        />

        {/* ═══ CONTENT GRID: Image | Tabs ═══ */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mt-16">

          {/* LEFT: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Decorative corner frames */}
            <motion.div
              className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#3d9a8b]/50 z-20"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#3d9a8b]/50 z-20"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            />

            {/* Main image */}
            <div className="relative h-[520px] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1200"
                alt="Equipo TAMEFOR en campo"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2540]/90 via-[#0f2540]/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f2540]/40 to-transparent" />

              {/* Award badge bottom-left */}
              <motion.div
                className="absolute bottom-6 left-6 flex items-center gap-3
                           bg-white/10 backdrop-blur-md border border-white/20
                           px-4 py-3 shadow-xl"
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.04 }}
              >
                <div className="w-9 h-9 bg-[#3d9a8b]/30 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">2026 · Reconocimiento</p>
                  <p className="text-[#3d9a8b] text-xs font-semibold">Excelencia Ambiental</p>
                </div>
              </motion.div>
            </div>

            {/* Floating projects badge — top right */}
            <motion.div
              className="absolute -top-6 -right-6 z-30
                         bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c]
                         px-6 py-5 shadow-2xl text-center"
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, rotate: 2 }}
            >
              <div className="text-5xl font-black text-white leading-none">500+</div>
              <div className="text-white/80 text-xs font-bold uppercase tracking-widest mt-1">
                Proyectos<br />Completados
              </div>
            </motion.div>

            {/* Floating ISO badge — bottom right */}
            <motion.div
              className="absolute -bottom-6 right-12 z-30
                         bg-white/10 backdrop-blur-md border border-white/20
                         px-4 py-3 flex items-center gap-2 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-5 h-5 text-[#3d9a8b]" />
              <div>
                <p className="text-white text-xs font-bold">Certificado ISO</p>
                <p className="text-white/60 text-xs">14001 &amp; 9001</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            {/* Pill tabs */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-2.5 text-sm font-semibold transition-colors duration-300 border-l-2 ${
                    activeTab === tab ? "text-white border-[#3d9a8b]" : "text-white/40 border-white/10 hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.span
                      layoutId="about-pill"
                      className="absolute inset-0 bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </motion.div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32 }}
                className="space-y-5"
              >
                <p className="text-white/75 leading-relaxed text-[15px] border-l-2 border-[#3d9a8b]/50 pl-4">
                  {tabContent[activeTab].text}
                </p>
                <ul className="space-y-3">
                  {tabContent[activeTab].points.map((point, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 border border-[#3d9a8b]/50 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-[#3d9a8b]" />
                      </span>
                      <span className="text-white/65 text-sm leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/nosotros">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                             bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                             shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                             transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Conocer Más
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>



      </div>
    </section>
  )
}

