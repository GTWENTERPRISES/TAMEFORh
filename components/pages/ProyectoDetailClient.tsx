'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useMotionValue, useSpring, useInView } from "framer-motion"
import type { Project } from "@/lib/projectsData"
import { projectsData } from "@/lib/projectsData"
import {
  MapPin, Calendar, Clock, Users, ArrowRight,
  Target, Activity, TrendingUp, CheckCircle2, Quote,
  Facebook, Twitter, Linkedin, Mail, Copy, FileText,
  Layers, ChevronRight, Leaf, Star, Phone
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui"
import { PageHeader } from "@/components/ui/PageHeader"
import { containerVariants, itemVariants } from "@/lib/animations"

interface ProyectoDetailClientProps {
  project: Project
}

const AUTO_ROTATE_MS = 4000

/* ─── Animated counter ─── */
function useAnimatedNumber(target: number, isInView: boolean, duration = 2) {
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 50, damping: 30, duration: duration * 1000 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    mv.set(isInView ? target : 0)
  }, [mv, target, isInView])
  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  return display
}

function AnimatedStat({ value, suffix = "+", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.5 })
  const n = useAnimatedNumber(value, isInView, 2)
  return (
    <motion.div
      ref={ref}
      className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <div className="text-3xl md:text-4xl font-black text-[#3d9a8b] tabular-nums">
        {n.toLocaleString("es-ES")}{suffix}
      </div>
      <div className="text-white/60 text-sm font-medium mt-1">{label}</div>
    </motion.div>
  )
}

/* ─── Process Step ─── */
function ProcessStep({ activity, index, total, isActive }: {
  activity: string; index: number; total: number; isActive: boolean
}) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {index < total - 1 && (
        <div className="hidden lg:block absolute top-10 left-[calc(100%+1px)] w-[calc(100%-2rem)] h-[2px] bg-gradient-to-r from-[#3d9a8b]/40 to-[#3d9a8b]/10 z-0" />
      )}

      <div className="relative bg-white border border-[#1a3a5c]/10 p-8 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1 overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transform origin-left transition-transform duration-700 ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`} />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className={`w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-500 ${
                isActive
                  ? "bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] shadow-[#3d9a8b]/40 scale-110"
                  : "bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] shadow-[#3d9a8b]/20"
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-white text-xl font-black">{String(index + 1).padStart(2, '0')}</span>
            </motion.div>
            <div className={`h-[1px] flex-1 transition-all duration-700 ${
              isActive
                ? "bg-gradient-to-r from-[#3d9a8b] to-[#3d9a8b]/30"
                : "bg-gradient-to-r from-[#3d9a8b]/30 to-transparent"
            }`} />
          </div>
          <p className={`text-sm leading-relaxed transition-colors duration-500 ${
            isActive ? "text-[#1a3a5c] font-semibold" : "text-[#1a3a5c]/60"
          }`}>{activity}</p>
        </div>

        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-700 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`} />
      </div>
    </motion.div>
  )
}

/* ─── Detail Info Cards ─── */
const cardTabs = [
  { key: 'description', label: 'Descripción', icon: FileText, title: 'Sobre el Proyecto' },
  { key: 'objectives', label: 'Objetivos', icon: Target, title: 'Metas del Proyecto' },
  { key: 'activities', label: 'Actividades', icon: Activity, title: 'Acciones Realizadas' },
] as const

function DetailCard({
  project,
  tabIndex,
  isActive,
  onHover,
  onLeave,
}: {
  project: Project
  tabIndex: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const tab = cardTabs[tabIndex]
  const Icon = tab.icon

  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: tabIndex * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={`relative overflow-hidden transition-all duration-500 ${
        isActive
          ? "bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] shadow-2xl shadow-[#3d9a8b]/20 scale-[1.01]"
          : "bg-white border border-[#1a3a5c]/10 shadow-md hover:shadow-xl"
      }`}>
        {/* Shine sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Top accent with animated progress */}
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#3d9a8b] via-[#5bc4b1] to-[#3d9a8b]"
            initial={false}
            animate={{ width: isActive ? "100%" : "40%" }}
            transition={{ duration: isActive ? AUTO_ROTATE_MS / 1000 : 0.4, ease: isActive ? "linear" : "easeOut" }}
          />
        </div>

        <div className="p-7 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-5">
            <motion.div
              className={`flex items-center justify-center w-12 h-12 transition-all duration-500 ${
                isActive
                  ? "bg-[#3d9a8b] shadow-lg shadow-[#3d9a8b]/30"
                  : "bg-[#3d9a8b]/10 group-hover:bg-[#3d9a8b]/20"
              }`}
              animate={isActive ? { rotate: [0, 8, -4, 0] } : { rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className={`w-6 h-6 transition-colors duration-500 ${
                isActive ? "text-white" : "text-[#3d9a8b]"
              }`} />
            </motion.div>
            <div>
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
                isActive ? "text-[#3d9a8b]" : "text-[#3d9a8b]/70"
              }`}>
                {tab.label}
              </span>
              <h2 className={`text-xl lg:text-2xl font-bold leading-tight transition-colors duration-500 ${
                isActive ? "text-white" : "text-[#1a3a5c]"
              }`}>
                {tab.title}
              </h2>
            </div>
          </div>

          {/* Content based on tab */}
          {tabIndex === 0 && (
            <p className={`leading-relaxed text-justify text-sm md:text-base transition-colors duration-500 ${
              isActive ? "text-white/75" : "text-[#1a3a5c]/60"
            }`}>
              {project.fullDescription}
            </p>
          )}

          {tabIndex === 1 && (
            <div className="space-y-2">
              {project.objectives.map((objective, idx) => (
                <motion.div
                  key={idx}
                  className={`flex items-start gap-3 p-3 transition-all duration-300 ${
                    isActive ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <motion.div
                    className={`w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-500 ${
                      isActive ? "bg-[#3d9a8b]/20 border border-[#3d9a8b]/40" : "bg-[#3d9a8b]/10 border border-[#3d9a8b]/30"
                    }`}
                    animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ delay: idx * 0.08, duration: 0.3 }}
                  >
                    <CheckCircle2 className={`h-3.5 w-3.5 transition-colors duration-500 ${
                      isActive ? "text-[#3d9a8b]" : "text-[#3d9a8b]/70"
                    }`} />
                  </motion.div>
                  <span className={`text-sm leading-relaxed transition-colors duration-500 ${
                    isActive ? "text-white/80" : "text-[#1a3a5c]/65"
                  }`}>{objective}</span>
                </motion.div>
              ))}
            </div>
          )}

          {tabIndex === 2 && (
            <div className="space-y-2">
              {project.activities.map((activity, idx) => (
                <motion.div
                  key={idx}
                  className={`flex items-start gap-3 p-3 transition-all duration-300 ${
                    isActive ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className={`flex items-center justify-center w-7 h-7 font-bold flex-shrink-0 text-xs transition-all duration-500 ${
                    isActive ? "bg-[#3d9a8b]/30 text-[#3d9a8b]" : "bg-[#1a3a5c]/10 text-[#1a3a5c]/70"
                  }`}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <span className={`text-sm leading-relaxed transition-colors duration-500 ${
                    isActive ? "text-white/80" : "text-[#1a3a5c]/65"
                  }`}>{activity}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom animated line */}
        <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
          isActive
            ? "w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]"
            : "w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]"
        }`} />
      </div>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export function ProyectoDetailClient({ project }: ProyectoDetailClientProps) {
  const [activeCard, setActiveCard] = useState(0)
  const [isPausedCards, setIsPausedCards] = useState(false)
  const cardsInView = useRef(false)

  const [activeActivity, setActiveActivity] = useState(0)

  const otherProjects = projectsData.filter(p => p.slug !== project.slug).slice(0, 3)

  // Auto-rotate detail cards
  useEffect(() => {
    if (isPausedCards || !cardsInView.current) return
    const timer = setTimeout(() => {
      setActiveCard((prev) => (prev + 1) % 3)
    }, AUTO_ROTATE_MS)
    return () => clearTimeout(timer)
  }, [activeCard, isPausedCards])

  const cardsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = cardsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { cardsInView.current = entry.isIntersecting },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Auto-rotate activities timeline
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveActivity((prev) => (prev + 1) % project.activities.length)
    }, 3500)
    return () => clearTimeout(timer)
  }, [activeActivity, project.activities.length])

  const handleCardHover = useCallback((i: number) => {
    setIsPausedCards(true)
    setActiveCard(i)
  }, [])

  const handleCardLeave = useCallback(() => {
    setIsPausedCards(false)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* ═══ Hero ═══ */}
      <PageHeader
        badge={`Proyecto #${project.number}`}
        title={project.title}
        titleHighlight=""
        subtitle={project.subtitle}
        backgroundImage={project.images[0]}
      />

      {/* ═══ Overview Section ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left: Image with decorative elements */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#3d9a8b]/40 z-20" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#3d9a8b]/40 z-20" />

              <div className="relative h-[480px] overflow-hidden shadow-2xl">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2540]/60 via-transparent to-transparent" />

                <motion.div
                  className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-10 h-10 bg-[#3d9a8b]/30 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold leading-tight">Proyecto #{project.number}</p>
                    <p className="text-[#3d9a8b] text-xs font-semibold">TAMEFOR Profesional</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="absolute -top-6 -right-6 z-30 bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] px-6 py-5 shadow-2xl text-center"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                <div className="text-4xl font-black text-white leading-none">{project.number}</div>
                <div className="text-white/80 text-xs font-bold uppercase tracking-widest mt-1">Proyecto</div>
              </motion.div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-[#3d9a8b]" />
                <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">
                  Nuestro Proyecto
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] leading-tight">
                {project.title}
              </h2>

              <p className="text-[#1a3a5c]/70 leading-relaxed text-[15px] border-l-2 border-[#3d9a8b]/50 pl-4">
                {project.shortDescription}
              </p>

              {/* Quick Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1a3a5c]">Información del Proyecto</h3>
                {[
                  { icon: MapPin, label: "Ubicación", value: project.location },
                  { icon: Calendar, label: "Inicio", value: project.startDate },
                  { icon: Clock, label: "Duración", value: project.duration },
                  { icon: Users, label: "Cliente", value: project.client },
                  { icon: Target, label: "Área", value: project.area },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-8 h-8 border border-[#3d9a8b]/50 bg-[#3d9a8b]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-[#3d9a8b]" />
                    </div>
                    <div>
                      <span className="text-xs text-[#1a3a5c]/50 uppercase tracking-wider font-semibold">{item.label}</span>
                      <p className="text-[#1a3a5c]/80 text-sm font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Status badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider ${
                project.status === 'completado'
                  ? 'bg-[#3d9a8b]/10 text-[#3d9a8b] border border-[#3d9a8b]/30'
                  : project.status === 'en-curso'
                  ? 'bg-blue-500/10 text-blue-600 border border-blue-500/30'
                  : 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/30'
              }`}>
                {project.status === 'completado' ? 'Completado' : project.status === 'en-curso' ? 'En Curso' : 'Planificado'}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/contacto">
                  <motion.button
                    className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                               bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                               shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                               transition-shadow duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Solicitar Información
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </Link>
                <Link href="/proyectos">
                  <motion.button
                    className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-[#1a3a5c]
                               border-2 border-[#1a3a5c]/20 hover:border-[#3d9a8b] hover:text-[#3d9a8b]
                               transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Ver Todos los Proyectos
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Detail Cards Section (Description / Objectives / Activities) ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-24">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />
        <motion.div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px]" />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={Layers}
            subtitle="Información Detallada"
            title="Conoce los Detalles"
            titleHighlight="Del Proyecto"
            description="Explora la descripción, objetivos y actividades de este proyecto"
            centered
            dark
          />

          <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-14">
            {cardTabs.map((_, index) => (
              <DetailCard
                key={index}
                project={project}
                tabIndex={index}
                isActive={activeCard === index}
                onHover={() => handleCardHover(index)}
                onLeave={handleCardLeave}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Results / Stats Section ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-20 border-t border-white/5">
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={TrendingUp}
            subtitle="Logros"
            title="Resultados"
            titleHighlight="Destacados"
            description="Métricas e indicadores clave del impacto del proyecto"
            centered
            dark
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-14">
            {project.results.map((result, index) => (
              <motion.div
                key={index}
                className="group text-center p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#3d9a8b]/5 rounded-full blur-2xl" />
                <div className="relative">
                  <p className="text-3xl md:text-4xl font-bold text-[#3d9a8b] mb-2 group-hover:scale-110 transition-transform">{result.value}</p>
                  <p className="font-bold text-white mb-1 text-sm md:text-base">{result.title}</p>
                  <p className="text-xs text-white/60 leading-relaxed">{result.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Impact Section ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Impact list */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-[#3d9a8b]" />
                <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">
                  Impacto
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-6 leading-tight">
                Beneficios del{" "}
                <span className="text-[#3d9a8b]">Proyecto</span>
              </h2>

              <div className="space-y-3">
                {project.impact.map((impact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 border-l-2 border-[#3d9a8b]/30 hover:border-[#3d9a8b] hover:bg-gray-100 transition-all"
                  >
                    <div className="w-8 h-8 bg-[#3d9a8b]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-[#3d9a8b]" />
                    </div>
                    <p className="text-[#1a3a5c]/70 pt-1 leading-relaxed text-sm">{impact}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Team + Share */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-6"
            >
              {/* Team card */}
              <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2540] p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#3d9a8b]" />
                  </div>
                  <h3 className="text-white font-bold text-xl">Equipo de Trabajo</h3>
                </div>
                <div className="space-y-2">
                  {project.team.map((member, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <span className="text-white/70 text-sm">{member.role}</span>
                      <span className="font-bold text-[#3d9a8b] text-sm">{member.count}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Share card */}
              <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2540] p-8 shadow-2xl">
                <h4 className="text-white font-bold text-lg mb-4">Compartir Proyecto</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="bg-white text-[#1877F2] hover:bg-[#1877F2] hover:text-white border border-[#1877F2]/30 text-xs py-2 h-auto"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  >
                    <Facebook className="h-3 w-3 mr-1" />
                    Facebook
                  </Button>
                  <Button
                    className="bg-white text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white border border-[#1DA1F2]/30 text-xs py-2 h-auto"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(project.title)}`, '_blank')}
                  >
                    <Twitter className="h-3 w-3 mr-1" />
                    Twitter
                  </Button>
                  <Button
                    className="bg-white text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white border border-[#0A66C2]/30 text-xs py-2 h-auto"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  >
                    <Linkedin className="h-3 w-3 mr-1" />
                    LinkedIn
                  </Button>
                  <Button
                    className="bg-white text-[#D44638] hover:bg-[#D44638] hover:text-white border border-[#D44638]/30 text-xs py-2 h-auto"
                    onClick={() => window.open(`mailto:?subject=${encodeURIComponent(project.title)}&body=${encodeURIComponent(window.location.href)}`, '_blank')}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                </div>
                <div className="mt-3">
                  <Button
                    className="w-full bg-white/5 hover:bg-[#3d9a8b]/20 border border-white/10 hover:border-[#3d9a8b]/40 text-white/70 text-xs py-2 h-auto"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      alert('Enlace copiado al portapapeles')
                    }}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copiar Enlace
                  </Button>
                </div>
              </div>

              {/* Quick contact */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-[#1a3a5c]/10 p-5 flex items-center gap-3 hover:shadow-lg transition-all">
                  <Phone className="w-5 h-5 text-[#3d9a8b]" />
                  <div>
                    <p className="text-[#1a3a5c] text-sm font-bold">Consulta Gratuita</p>
                    <p className="text-[#1a3a5c]/50 text-xs">Primera asesoría</p>
                  </div>
                </div>
                <div className="bg-gray-50 border border-[#1a3a5c]/10 p-5 flex items-center gap-3 hover:shadow-lg transition-all">
                  <Star className="w-5 h-5 text-[#3d9a8b]" />
                  <div>
                    <p className="text-[#1a3a5c] text-sm font-bold">Equipo Experto</p>
                    <p className="text-[#1a3a5c]/50 text-xs">Profesionales certificados</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Testimonial ═══ */}
      {project.testimonial && (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] via-[#0f2642] to-[#1a3a5c] py-24">
          <motion.div className="absolute top-0 right-0 w-64 h-64 bg-[#3d9a8b]/5 rounded-full blur-3xl" />
          <motion.div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3d9a8b]/5 rounded-full blur-3xl" />

          <div className="container-max relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Quote className="h-16 md:h-20 w-16 md:w-20 text-[#3d9a8b] mx-auto mb-8 opacity-50" />
              <blockquote className="text-lg md:text-2xl lg:text-3xl text-white leading-relaxed mb-8 font-light italic">
                "{project.testimonial.text}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-1 h-14 bg-[#3d9a8b]" />
                <div className="text-left">
                  <p className="font-bold text-white text-base md:text-lg">{project.testimonial.author}</p>
                  <p className="text-white/80 text-sm">{project.testimonial.position}</p>
                  <p className="text-white/60 text-sm">{project.testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══ Gallery ═══ */}
      {project.images.length > 1 && (
        <section className="section-padding bg-[#f8fafb] relative overflow-hidden">
          <div className="container-max relative z-10">
            <SectionHeader
              icon={Layers}
              subtitle="Galería"
              title="Imágenes del"
              titleHighlight="Proyecto"
              description="Registro fotográfico de las actividades y resultados del proyecto"
              centered
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-14">
              {project.images.slice(1).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative h-56 md:h-72 overflow-hidden">
                    <img
                      src={image}
                      alt={`${project.title} - Imagen ${index + 2}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ Other Projects ═══ */}
      {otherProjects.length > 0 && (
        <section className="section-padding bg-white relative overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          />

          <div className="container-max relative z-10">
            <SectionHeader
              icon={Leaf}
              subtitle="Más Proyectos"
              title="Explora Otros"
              titleHighlight="Proyectos"
              description="Descubre más proyectos que TAMEFOR ha desarrollado"
              centered
            />

            <div className="grid md:grid-cols-3 gap-6 mt-14">
              {otherProjects.map((proj, index) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/proyectos/${proj.slug}`}>
                    <div className="group relative overflow-hidden bg-white border border-[#1a3a5c]/10 hover:shadow-xl transition-all duration-500">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={proj.images[0]}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2540]/80 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="text-[#3d9a8b] text-xs font-bold uppercase tracking-widest">Proyecto #{proj.number}</span>
                        </div>
                      </div>

                      <div className="p-6">
                        <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] bg-[#1a3a5c]/10 text-[#1a3a5c] mb-3">
                          {proj.categoryLabel}
                        </span>
                        <h3 className="text-[#1a3a5c] font-bold text-lg mb-2 group-hover:text-[#3d9a8b] transition-colors duration-300 line-clamp-2">
                          {proj.title}
                        </h3>
                        <p className="text-[#1a3a5c]/60 text-sm leading-relaxed mb-4 line-clamp-2">
                          {proj.shortDescription}
                        </p>
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d9a8b] group-hover:gap-3 transition-all duration-300">
                          Ver Proyecto
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-700" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA Banner ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c] py-20">
        <motion.div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        <motion.div className="absolute -bottom-40 -left-40 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px]" />

        <div className="container-max relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div className="inline-flex items-center gap-2 mb-6" variants={itemVariants}>
              <div className="w-8 h-1 bg-white/40" />
              <span className="text-white/80 font-semibold uppercase tracking-wider text-sm">¿Listo para empezar?</span>
              <div className="w-8 h-1 bg-white/40" />
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              ¿Tienes un Proyecto Similar?
            </motion.h2>

            <motion.p
              className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Contáctanos hoy mismo para más información y descubre cómo podemos ayudarte a desarrollar tu proyecto forestal o ambiental.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link href="/contacto">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-[#1a3a5c]
                             bg-white shadow-lg shadow-black/10
                             hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contáctanos Ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
              <Link href="/proyectos">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                             border-2 border-white/30 hover:border-white hover:bg-white/10
                             transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Ver Más Proyectos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
