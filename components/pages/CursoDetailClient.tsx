"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar, Clock, MapPin, DollarSign, Award, Check, ArrowLeft,
  BookOpen, Users, GraduationCap, FileText, ArrowRight, ChevronRight,
  Layers, Target, Star, Play, Download, Monitor, CheckCircle2,
  Facebook, Twitter, Linkedin, Mail, Copy, Share2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Course } from "@/lib/coursesData"
import { coursesData } from "@/lib/coursesData"
import { containerVariants, itemVariants } from "@/lib/animations"
import { SectionHeader } from "@/components/ui"
import { PageHeader } from "@/components/ui/PageHeader"

interface CursoDetailClientProps {
  course: Course
}

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

function AnimatedStat({ value, suffix = "+", label, icon: Icon }: { value: number; suffix?: string; label: string; icon: React.ElementType }) {
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
    >
      <div className="w-12 h-12 bg-[#3d9a8b]/20 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-6 h-6 text-[#3d9a8b]" />
      </div>
      <div className="text-3xl md:text-4xl font-black text-white tabular-nums">
        {n.toLocaleString("es-ES")}{suffix}
      </div>
      <div className="text-white/60 text-sm font-medium mt-1">{label}</div>
    </motion.div>
  )
}

/* ─── Module Card ─── */
function ModuleCard({ module, index, isActive, onClick }: {
  module: { module: string; topics: string[] };
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={`group relative overflow-hidden cursor-pointer transition-all duration-500 ${
        isActive
          ? "bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] shadow-2xl shadow-[#3d9a8b]/30 scale-[1.02] border border-transparent"
          : "bg-white border border-[#1a3a5c]/10 hover:shadow-xl"
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      whileHover={{ y: -4 }}
    >
      {!isActive && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      )}

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-4 mb-5">
          <motion.div
            className={`w-12 h-12 flex items-center justify-center font-bold text-lg transition-all duration-500 ${
              isActive
                ? "bg-white/20 text-white shadow-lg"
                : "bg-[#1a3a5c] text-white shadow-md"
            }`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>
          <div className="flex-1">
            <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-500 ${
              isActive ? "text-white/70" : "text-[#3d9a8b]"
            }`}>
              Módulo {index + 1}
            </span>
            <h3 className={`font-bold text-base md:text-lg leading-snug transition-colors duration-500 ${
              isActive ? "text-white" : "text-[#1a3a5c] group-hover:text-[#3d9a8b]"
            }`}>
              {module.module}
            </h3>
          </div>
        </div>

        <ul className="space-y-2.5">
          {module.topics.map((topic, topicIndex) => (
            <motion.li
              key={topicIndex}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: topicIndex * 0.05 }}
            >
              <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-500 ${
                isActive ? "bg-white/20" : "bg-[#3d9a8b]/10 border border-[#3d9a8b]/30"
              }`}>
                <Check className={`h-3 w-3 transition-colors duration-500 ${
                  isActive ? "text-white" : "text-[#3d9a8b]"
                }`} />
              </div>
              <span className={`text-sm leading-relaxed transition-colors duration-500 ${
                isActive ? "text-white/85" : "text-[#1a3a5c]/70"
              }`}>{topic}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
        isActive
          ? "w-full bg-white/40"
          : "w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]"
      }`} />
    </motion.div>
  )
}

/* ─── Main Component ─── */
export function CursoDetailClient({ course }: CursoDetailClientProps) {
  const [activeModule, setActiveModule] = useState(0)
  const [activeObjective, setActiveObjective] = useState(0)
  const [activeCard, setActiveCard] = useState(0)
  const otherCourses = coursesData.filter(c => c.slug !== course.slug).slice(0, 3)

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveModule((prev) => (prev + 1) % course.content.length)
    }, 4000)
    return () => clearTimeout(timer)
  }, [activeModule, course.content.length])

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveObjective((prev) => (prev + 1) % course.objectives.length)
    }, 3500)
    return () => clearTimeout(timer)
  }, [activeObjective, course.objectives.length])

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCard((prev) => (prev + 1) % 3)
    }, 3500)
    return () => clearTimeout(timer)
  }, [activeCard])

  return (
    <main className="min-h-screen bg-white">
      {/* ═══ Hero ═══ */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#1a3a5c] via-[#0f2642] to-[#1a3a5c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(61, 154, 139, 0.1) 35px, rgba(61, 154, 139, 0.1) 70px)'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-6 md:mb-8">
              <Link href="/cursos">
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all text-sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver a cursos
                </Button>
              </Link>
            </motion.div>

            {/* Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
              <div className="bg-[#3d9a8b]/20 backdrop-blur-sm px-4 md:px-6 py-2 md:py-2.5 border border-[#3d9a8b]/40 rounded-sm">
                <span className="text-[#3d9a8b] text-xs uppercase tracking-widest font-bold">{course.categoryLabel}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-2.5 border border-white/20 rounded-sm">
                <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">{course.codigoEspecialidad}</span>
                <span className="text-[#3d9a8b] text-sm font-bold ml-2">{course.area}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-2.5 border border-white/20 rounded-sm">
                <span className="text-white/90 text-xs uppercase tracking-widest font-semibold">{course.modality.join(", ")}</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-[#3d9a8b]" />
                <span className="text-white/70 font-semibold uppercase tracking-wider text-sm">Capacitación Profesional</span>
              </div>
              <h1 className="font-sans text-2xl md:text-4xl lg:text-5xl text-white font-bold leading-tight mb-4">
                {course.title}
              </h1>
              {course.subtitle && (
                <p className="text-xl text-[#3d9a8b] font-semibold mb-4">{course.subtitle}</p>
              )}
              <div className="w-20 md:w-24 h-1 bg-[#3d9a8b] mb-4 md:mb-6" />
              <p className="text-base md:text-lg text-white/80 font-light leading-relaxed max-w-4xl">
                {course.shortDescription}
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-5 rounded-sm hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-[#3d9a8b]/20 flex items-center justify-center rounded-sm flex-shrink-0">
                    <Clock className="h-5 md:h-6 w-5 md:w-6 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Carga Horaria</p>
                    <p className="text-white font-semibold text-sm md:text-base">{course.cargaHoraria} horas</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-5 rounded-sm hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-[#3d9a8b]/20 flex items-center justify-center rounded-sm flex-shrink-0">
                    <MapPin className="h-5 md:h-6 w-5 md:w-6 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Modalidad</p>
                    <p className="text-white font-semibold text-sm md:text-base">{course.modality.join(", ")}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-5 rounded-sm hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-[#3d9a8b]/20 flex items-center justify-center rounded-sm flex-shrink-0">
                    <DollarSign className="h-5 md:h-6 w-5 md:w-6 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Inversión</p>
                    <p className="text-white font-semibold text-sm md:text-base">${course.price.regular} USD</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Description + Sidebar ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Full Description */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setActiveCard(0)}
              >
                <div className={`relative overflow-hidden transition-all duration-500 ${
                  activeCard === 0
                    ? "bg-gradient-to-br from-[#1a3a5c] to-[#0f2540] border border-transparent shadow-2xl shadow-[#1a3a5c]/30 scale-[1.02]"
                    : "bg-white border border-[#1a3a5c]/10 border-l-2 border-l-[#3d9a8b] shadow-md hover:shadow-xl hover:border-[#3d9a8b]/40"
                }`}>
                  {/* Top accent bar */}
                  <div className={`h-1 w-full transition-all duration-500 ${
                    activeCard === 0 ? "bg-transparent" : "bg-[#3d9a8b]"
                  }`} />

                  {/* Diagonal accent */}
                  {activeCard !== 0 && (
                    <div
                      className="absolute top-0 right-0 w-14 h-14 bg-[#3d9a8b] transition-transform duration-500 group-hover:scale-125 z-10"
                      style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                    />
                  )}

                  {/* Content */}
                  <div className="p-7">
                    {/* Category badge */}
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${
                        activeCard === 0 ? "bg-[#3d9a8b]/20 text-[#3d9a8b]" : "bg-[#1a3a5c]/10 text-[#1a3a5c]"
                      }`}>
                        Descripción
                      </span>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 mb-2">
                      <div className={`w-7 h-7 flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                        activeCard === 0 ? "bg-[#3d9a8b]/20" : "bg-[#1a3a5c]/8"
                      }`}>
                        <FileText className={`h-3.5 w-3.5 transition-colors duration-500 ${
                          activeCard === 0 ? "text-[#3d9a8b]" : "text-[#1a3a5c]"
                        }`} />
                      </div>
                      <h2 className={`text-lg font-bold leading-tight transition-colors duration-500 ${
                        activeCard === 0 ? "text-white" : "text-[#1a3a5c]"
                      }`}>Sobre el Curso</h2>
                    </div>

                    {/* Expanding line */}
                    <div className={`h-0.5 mb-4 transition-all duration-500 ${
                      activeCard === 0 ? "w-12 bg-[#3d9a8b]" : "w-8 bg-[#3d9a8b]/40 group-hover:w-12 group-hover:bg-[#3d9a8b]"
                    }`} />

                    <p className={`leading-relaxed text-justify text-sm md:text-base transition-colors duration-500 ${
                      activeCard === 0 ? "text-white/80" : "text-[#1a3a5c]/65"
                    }`}>
                      {course.fullDescription}
                    </p>
                  </div>

                  {/* Bottom animated line */}
                  <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
                    activeCard === 0
                      ? "w-0"
                      : "w-0 group-hover:w-full bg-gradient-to-r from-[#1a3a5c] via-[#3d9a8b] to-[#1a3a5c]"
                  }`} />
                </div>
              </motion.div>

              {/* Objectives */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setActiveCard(1)}
              >
                <div className={`relative overflow-hidden transition-all duration-500 ${
                  activeCard === 1
                    ? "bg-gradient-to-br from-[#1a3a5c] to-[#0f2540] border border-transparent shadow-2xl shadow-[#1a3a5c]/30 scale-[1.02]"
                    : "bg-white border border-[#1a3a5c]/10 border-l-2 border-l-[#3d9a8b] shadow-md hover:shadow-xl hover:border-[#3d9a8b]/40"
                }`}>
                  {/* Top accent bar */}
                  <div className={`h-1 w-full transition-all duration-500 ${
                    activeCard === 1 ? "bg-transparent" : "bg-[#3d9a8b]"
                  }`} />

                  {/* Diagonal accent */}
                  {activeCard !== 1 && (
                    <div
                      className="absolute top-0 right-0 w-14 h-14 bg-[#3d9a8b] transition-transform duration-500 group-hover:scale-125 z-10"
                      style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                    />
                  )}

                  {/* Content */}
                  <div className="p-7">
                    {/* Category badge */}
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${
                        activeCard === 1 ? "bg-[#3d9a8b]/20 text-[#3d9a8b]" : "bg-[#1a3a5c]/10 text-[#1a3a5c]"
                      }`}>
                        Objetivos
                      </span>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 mb-2">
                      <div className={`w-7 h-7 flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                        activeCard === 1 ? "bg-[#3d9a8b]/20" : "bg-[#1a3a5c]/8"
                      }`}>
                        <Target className={`h-3.5 w-3.5 transition-colors duration-500 ${
                          activeCard === 1 ? "text-[#3d9a8b]" : "text-[#1a3a5c]"
                        }`} />
                      </div>
                      <h2 className={`text-lg font-bold leading-tight transition-colors duration-500 ${
                        activeCard === 1 ? "text-white" : "text-[#1a3a5c]"
                      }`}>Objetivos de Aprendizaje</h2>
                    </div>

                    {/* Expanding line */}
                    <div className={`h-0.5 mb-4 transition-all duration-500 ${
                      activeCard === 1 ? "w-12 bg-[#3d9a8b]" : "w-8 bg-[#3d9a8b]/40 group-hover:w-12 group-hover:bg-[#3d9a8b]"
                    }`} />

                    <div className="space-y-2.5">
                      {course.objectives.map((objective, index) => {
                        const isObjActive = activeObjective === index
                        return (
                          <motion.div
                            key={index}
                            className="flex items-start gap-3 cursor-pointer"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            onMouseEnter={() => setActiveObjective(index)}
                          >
                            <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-500 ${
                              activeCard === 1
                                ? (isObjActive ? "bg-[#3d9a8b]/40" : "bg-white/20")
                                : (isObjActive ? "bg-[#3d9a8b]/20 border border-[#3d9a8b]/50" : "bg-[#3d9a8b]/10 border border-[#3d9a8b]/30")
                            }`}>
                              <CheckCircle2 className={`h-3 w-3 transition-colors duration-500 ${
                                activeCard === 1 ? "text-[#3d9a8b]" : "text-[#3d9a8b]"
                              }`} />
                            </div>
                            <span className={`text-sm leading-relaxed transition-colors duration-500 ${
                              activeCard === 1
                                ? (isObjActive ? "text-white font-medium" : "text-white/80")
                                : (isObjActive ? "text-[#1a3a5c] font-medium" : "text-[#1a3a5c]/65")
                            }`}>{objective}</span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Bottom animated line */}
                  <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
                    activeCard === 1
                      ? "w-0"
                      : "w-0 group-hover:w-full bg-gradient-to-r from-[#1a3a5c] via-[#3d9a8b] to-[#1a3a5c]"
                  }`} />
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setActiveCard(2)}
              >
                <div className={`relative overflow-hidden transition-all duration-500 ${
                  activeCard === 2
                    ? "bg-gradient-to-br from-[#1a3a5c] to-[#0f2540] border border-transparent shadow-2xl shadow-[#1a3a5c]/30 scale-[1.02]"
                    : "bg-white border border-[#1a3a5c]/10 border-l-2 border-l-[#3d9a8b] shadow-md hover:shadow-xl hover:border-[#3d9a8b]/40"
                }`}>
                  {/* Top accent bar */}
                  <div className={`h-1 w-full transition-all duration-500 ${
                    activeCard === 2 ? "bg-transparent" : "bg-[#3d9a8b]"
                  }`} />

                  {/* Diagonal accent */}
                  {activeCard !== 2 && (
                    <div
                      className="absolute top-0 right-0 w-14 h-14 bg-[#3d9a8b] transition-transform duration-500 group-hover:scale-125 z-10"
                      style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                    />
                  )}

                  {/* Content */}
                  <div className="p-7">
                    {/* Category badge */}
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-500 ${
                        activeCard === 2 ? "bg-[#3d9a8b]/20 text-[#3d9a8b]" : "bg-[#1a3a5c]/10 text-[#1a3a5c]"
                      }`}>
                        Requisitos
                      </span>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 mb-2">
                      <div className={`w-7 h-7 flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                        activeCard === 2 ? "bg-[#3d9a8b]/20" : "bg-[#1a3a5c]/8"
                      }`}>
                        <GraduationCap className={`h-3.5 w-3.5 transition-colors duration-500 ${
                          activeCard === 2 ? "text-[#3d9a8b]" : "text-[#1a3a5c]"
                        }`} />
                      </div>
                      <h2 className={`text-lg font-bold leading-tight transition-colors duration-500 ${
                        activeCard === 2 ? "text-white" : "text-[#1a3a5c]"
                      }`}>Requisitos de Ingreso</h2>
                    </div>

                    {/* Expanding line */}
                    <div className={`h-0.5 mb-4 transition-all duration-500 ${
                      activeCard === 2 ? "w-12 bg-[#3d9a8b]" : "w-8 bg-[#3d9a8b]/40 group-hover:w-12 group-hover:bg-[#3d9a8b]"
                    }`} />

                    <div className="space-y-2.5">
                      {course.requirements.map((requirement, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-500 ${
                            activeCard === 2 ? "bg-white/20" : "bg-[#3d9a8b]/10 border border-[#3d9a8b]/30"
                          }`}>
                            <Check className={`h-3 w-3 transition-colors duration-500 ${
                              activeCard === 2 ? "text-[#3d9a8b]" : "text-[#3d9a8b]"
                            }`} />
                          </div>
                          <span className={`text-sm leading-relaxed transition-colors duration-500 ${
                            activeCard === 2 ? "text-white/80" : "text-[#1a3a5c]/65"
                          }`}>{requirement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom animated line */}
                  <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
                    activeCard === 2
                      ? "w-0"
                      : "w-0 group-hover:w-full bg-gradient-to-r from-[#1a3a5c] via-[#3d9a8b] to-[#1a3a5c]"
                  }`} />
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 md:space-y-8">
              <div className="group relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2540] shadow-2xl shadow-[#1a3a5c]/30 transition-all duration-500 lg:sticky lg:top-6">
                <div className="p-7">
                  {/* Category badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] bg-[#3d9a8b]/20 text-[#3d9a8b]">
                      Información
                    </span>
                  </div>

                  <h3 className="font-bold text-white mb-2 text-lg flex items-center gap-3">
                    Información del Curso
                  </h3>

                  {/* Expanding line */}
                  <div className="h-0.5 mb-5 w-12 bg-[#3d9a8b]" />

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 bg-[#3d9a8b]/20">
                        <Calendar className="h-3.5 w-3.5 text-[#3d9a8b]" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Fecha de Inicio</p>
                        <p className="text-white/80 font-medium text-sm">{course.schedule.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 bg-[#3d9a8b]/20">
                        <Clock className="h-3.5 w-3.5 text-[#3d9a8b]" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Duración</p>
                        <p className="text-white/80 font-medium text-sm">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 bg-[#3d9a8b]/20">
                        <Monitor className="h-3.5 w-3.5 text-[#3d9a8b]" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Plataforma</p>
                        <p className="text-white/80 font-medium text-sm">{course.schedule.hours}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 bg-[#3d9a8b]/20">
                        <Users className="h-3.5 w-3.5 text-[#3d9a8b]" />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Sesiones</p>
                        <p className="text-white/80 font-medium text-sm">{course.schedule.sessions}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mt-6 pt-6 border-t border-[#3d9a8b]/30">
                    <h4 className="text-xs font-semibold text-white/50 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <DollarSign className="h-3 w-3" />
                      Inversión
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-3 bg-[#3d9a8b]/20 border-l-2 border-[#3d9a8b] px-3">
                        <span className="text-white/80 font-medium">Por Nivel</span>
                        <span className="font-bold text-[#3d9a8b] text-lg">${course.price.basePerLevel}</span>
                      </div>
                      {course.price.levels > 1 && (
                        <div className="flex justify-between items-center py-2 bg-white/5 px-3">
                          <span className="text-white/40 text-xs">{course.price.levels} niveles sin descuento</span>
                          <span className="text-white/30 line-through text-xs">${(course.price.basePerLevel * course.price.levels).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-3 bg-[#3d9a8b]/25 border-l-2 border-[#3d9a8b] px-3">
                        <span className="text-white font-bold">Curso Completo</span>
                        <span className="font-black text-[#3d9a8b] text-xl">${course.price.regular}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mt-6 pt-6 border-t border-[#3d9a8b]/30">
                    <div className="bg-white/5 p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#3d9a8b]/10 rounded-full blur-xl" />
                      <div className="relative">
                        <p className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wider">Estado</p>
                        <p className={`text-lg font-bold uppercase ${
                          course.available ? "text-[#3d9a8b]" : "text-yellow-500"
                        }`}>
                          {course.available ? "INSCRIPCIONES ABIERTAS" : "PRÓXIMAMENTE"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-6 space-y-3">
                    <Link href="/pagos" className="block">
                      <motion.button
                        className="w-full group inline-flex items-center justify-center gap-3 px-6 py-4 font-semibold text-white
                                   bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                                   shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                                   transition-shadow duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Inscribirse Ahora
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </motion.button>
                    </Link>
                    <Link href="/contacto" className="block">
                      <motion.button
                        className="w-full group inline-flex items-center justify-center gap-3 px-6 py-4 font-semibold text-white/80
                                   border-2 border-white/20 hover:border-[#3d9a8b] hover:text-[#3d9a8b]
                                   transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Solicitar Información
                      </motion.button>
                    </Link>
                  </div>

                  {/* Share */}
                  <div className="mt-6 pt-6 border-t border-[#3d9a8b]/30">
                    <h4 className="text-xs font-semibold text-white/50 mb-3 uppercase tracking-wider">
                      Compartir Curso
                    </h4>
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
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(course.title)}`, '_blank')}
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
                        onClick={() => window.open(`mailto:?subject=${encodeURIComponent(course.title)}&body=${encodeURIComponent(window.location.href)}`, '_blank')}
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
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Course Content / Modules ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-24">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />
        <motion.div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px]" />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={BookOpen}
            subtitle="Contenido Programático"
            title="Plan de"
            titleHighlight="Estudios"
            description="Explora el contenido detallado de cada módulo del programa"
            centered
            dark
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {course.content.map((module, index) => (
              <ModuleCard
                key={index}
                module={module}
                index={index}
                isActive={activeModule === index}
                onClick={() => setActiveModule(index)}
              />
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16">
            <AnimatedStat value={course.cargaHoraria} suffix="h" label="Horas Académicas" icon={Clock} />
            <AnimatedStat value={course.content.length} suffix="" label="Módulos" icon={Layers} />
            <AnimatedStat value={course.content.reduce((acc, m) => acc + m.topics.length, 0)} suffix="+" label="Temas" icon={BookOpen} />
            <AnimatedStat value={course.objectives.length} suffix="" label="Objetivos" icon={Target} />
          </div>
        </div>
      </section>

      {/* ═══ Benefits Section ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={Star}
            subtitle="Beneficios"
            title="¿Qué Obtienes al"
            titleHighlight="Inscribirte?"
            description="Invierte en tu desarrollo profesional con beneficios exclusivos"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 max-w-6xl mx-auto">
            {course.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden p-6 md:p-8 bg-white border border-[#1a3a5c]/10 hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 bg-[#3d9a8b]/10 group-hover:bg-[#3d9a8b] transition-all duration-500"
                    whileHover={{ rotate: 8 }}
                  >
                    <Award className="h-6 w-6 text-[#3d9a8b] group-hover:text-white transition-colors duration-500" />
                  </motion.div>
                  <p className="text-[#1a3a5c]/80 text-sm md:text-base leading-relaxed pt-2">{benefit}</p>
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Certification + Instructor ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-24">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Certification */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-[#3d9a8b]" />
                <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Certificación</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Certificación{" "}
                <span className="text-[#3d9a8b]">Profesional</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Al completar satisfactoriamente el programa, obtendrás una certificación respaldada por instituciones reconocidas.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 flex items-start gap-4 hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Institución</p>
                    <p className="text-white font-semibold">{course.certification.institution}</p>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 flex items-start gap-4 hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Validez</p>
                    <p className="text-white font-semibold">{course.certification.validity}</p>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 flex items-start gap-4 hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Tipo</p>
                    <p className="text-white font-semibold">{course.certification.type}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Instructor */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-[#3d9a8b]" />
                <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Instructor</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Tu{" "}
                <span className="text-[#3d9a8b]">Instructor</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Aprende de profesionales con amplia experiencia en el sector forestal y ambiental.
              </p>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3d9a8b]/5 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] flex items-center justify-center shadow-xl">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">{course.instructor.name}</h3>
                      <p className="text-[#3d9a8b] text-sm font-semibold">{course.instructor.credentials}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed text-sm">{course.instructor.experience}</p>
                </div>
              </div>

              {/* Area info */}
              <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 p-6">
                <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Área de Capacitación</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-white/70 text-sm">Área</span>
                    <span className="font-bold text-[#3d9a8b] text-sm">{course.area}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-white/70 text-sm">Código</span>
                    <span className="font-bold text-[#3d9a8b] text-sm">{course.codigoEspecialidad}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-white/70 text-sm">Especialidad</span>
                    <span className="font-bold text-[#3d9a8b] text-sm">{course.categoryLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Other Courses ═══ */}
      {otherCourses.length > 0 && (
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="container-max relative z-10">
            <SectionHeader
              icon={BookOpen}
              subtitle="Más Cursos"
              title="Explora Otros"
              titleHighlight="Cursos"
              description="Descubre más oportunidades de formación profesional"
              centered
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
              {otherCourses.map((c, index) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/cursos/${c.slug}`}>
                    <div className="group relative overflow-hidden bg-white border border-[#1a3a5c]/10 hover:shadow-xl transition-all duration-500">
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-white/10" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2540]/80 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#3d9a8b]/90 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                            {c.categoryLabel}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="text-[#3d9a8b] text-xs font-bold uppercase tracking-widest">{c.codigoEspecialidad}</span>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <span className="text-white/70 text-xs font-semibold">{c.cargaHoraria}h</span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-[#1a3a5c] font-bold text-lg mb-2 group-hover:text-[#3d9a8b] transition-colors duration-300">
                          {c.title}
                        </h3>
                        <p className="text-[#1a3a5c]/60 text-sm leading-relaxed mb-4 line-clamp-2">
                          {c.shortDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#3d9a8b] font-bold">${c.price.regular} USD</span>
                          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d9a8b] group-hover:gap-3 transition-all duration-300">
                            Ver curso
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
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
              <span className="text-white/80 font-semibold uppercase tracking-wider text-sm">¿Listo para aprender?</span>
              <div className="w-8 h-1 bg-white/40" />
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Impulsa Tu Carrera Profesional
            </motion.h2>

            <motion.p
              className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Inscríbete hoy y forma parte de la comunidad de profesionales forestales y ambientales más destacada del país
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link href="/pagos">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-[#1a3a5c]
                             bg-white shadow-lg shadow-black/10
                             hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Inscribirse Ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
              <Link href="/cursos">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                             border-2 border-white/30 hover:border-white hover:bg-white/10
                             transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Ver Más Cursos
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
