"use client"

import { useState, useEffect, useRef } from "react"
import { Check, ArrowRight, ChevronRight, Building2, Leaf, Phone, Clock, Users, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useInView } from "framer-motion"
import { ServiceConsultationModal } from "@/components/ServiceConsultationModal"
import type { ServiceData } from "@/lib/servicesData"
import { iconMap, getAllServices } from "@/lib/servicesData"
import { SectionHeader } from "@/components/ui"
import { PageHeader } from "@/components/ui/PageHeader"
import { containerVariants, itemVariants } from "@/lib/animations"

interface ServiceDetailClientProps {
  service: ServiceData
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

function AnimatedStat({ value, suffix = "+", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.5 })
  const n = useAnimatedNumber(value, isInView, 2)
  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl md:text-5xl font-black text-[#3d9a8b] tabular-nums">
        {n.toLocaleString("es-ES")}{suffix}
      </div>
      <div className="text-[#1a3a5c]/60 text-sm font-medium mt-1">{label}</div>
    </motion.div>
  )
}

/* ─── Process Step ─── */
function ProcessStep({ step, index, total, isActive }: { step: { step: string; title: string; description: string }; index: number; total: number; isActive: boolean }) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
    >
      {/* Connector line */}
      {index < total - 1 && (
        <div className="hidden lg:block absolute top-10 left-[calc(100%+1px)] w-[calc(100%-2rem)] h-[2px] bg-gradient-to-r from-[#3d9a8b]/40 to-[#3d9a8b]/10 z-0" />
      )}

      <div className="relative bg-white border border-[#1a3a5c]/10 p-8 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1 overflow-hidden">
        {/* Top accent - animated on active */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transform origin-left transition-transform duration-700 ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`} />

        {/* Step number */}
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
              <span className="text-white text-xl font-black">{step.step}</span>
            </motion.div>
            <div className={`h-[1px] flex-1 transition-all duration-700 ${
              isActive
                ? "bg-gradient-to-r from-[#3d9a8b] to-[#3d9a8b]/30"
                : "bg-gradient-to-r from-[#3d9a8b]/30 to-transparent"
            }`} />
          </div>
          <h3 className={`font-bold text-xl mb-3 transition-colors duration-500 ${
            isActive ? "text-[#3d9a8b]" : "text-[#1a3a5c]"
          }`}>{step.title}</h3>
          <p className="text-[#1a3a5c]/60 text-sm leading-relaxed">{step.description}</p>
        </div>

        {/* Bottom line - animated on active */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-700 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`} />
      </div>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeOffered, setActiveOffered] = useState(0)
  const [activeBenefit, setActiveBenefit] = useState(0)
  const [activeProcess, setActiveProcess] = useState(0)
  const allServices = getAllServices().filter(s => s.slug !== service.slug)

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveOffered((prev) => (prev + 1) % service.servicesOffered.length)
    }, 3500)
    return () => clearTimeout(timer)
  }, [activeOffered, service.servicesOffered.length])

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveBenefit((prev) => (prev + 1) % service.benefits.length)
    }, 3500)
    return () => clearTimeout(timer)
  }, [activeBenefit, service.benefits.length])

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveProcess((prev) => (prev + 1) % service.process.length)
    }, 3500)
    return () => clearTimeout(timer)
  }, [activeProcess, service.process.length])

  return (
    <main className="min-h-screen bg-white">
      {/* ═══ Hero ═══ */}
      <PageHeader
        badge={`Servicio ${service.number}`}
        title={service.title}
        titleHighlight=""
        subtitle={service.description}
        backgroundImage={service.image}
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
              {/* Corner frames */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#3d9a8b]/40 z-20" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#3d9a8b]/40 z-20" />

              <div className="relative h-[480px] overflow-hidden shadow-2xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2540]/60 via-transparent to-transparent" />

                {/* Floating badge */}
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
                    <p className="text-white text-sm font-bold leading-tight">Servicio {service.number}</p>
                    <p className="text-[#3d9a8b] text-xs font-semibold">TAMEFOR Profesional</p>
                  </div>
                </motion.div>
              </div>

              {/* Service number badge */}
              <motion.div
                className="absolute -top-6 -right-6 z-30 bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] px-6 py-5 shadow-2xl text-center"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                <div className="text-4xl font-black text-white leading-none">{service.number}</div>
                <div className="text-white/80 text-xs font-bold uppercase tracking-widest mt-1">Servicio</div>
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
                  Nuestro Servicio
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] leading-tight">
                {service.title}
              </h2>

              <p className="text-[#1a3a5c]/70 leading-relaxed text-[15px] border-l-2 border-[#3d9a8b]/50 pl-4">
                {service.shortDescription}
              </p>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1a3a5c]">Características Principales</h3>
                {service.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-6 h-6 border border-[#3d9a8b]/50 bg-[#3d9a8b]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-[#3d9a8b]" />
                    </div>
                    <span className="text-[#1a3a5c]/80 text-[15px]">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
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
                <Link href="/servicios">
                  <motion.button
                    className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-[#1a3a5c]
                               border-2 border-[#1a3a5c]/20 hover:border-[#3d9a8b] hover:text-[#3d9a8b]
                               transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Ver Todos los Servicios
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Services Offered ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-24">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />
        <motion.div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px]" />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={Leaf}
            subtitle="Servicios Ofrecidos"
            title="¿Qué"
            titleHighlight="Incluye?"
            description="Conoce en detalle todos los servicios que ofrecemos dentro de esta área"
            centered
            dark
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {service.servicesOffered.map((item, index) => {
              const isActive = activeOffered === index
              return (
                <motion.div
                  key={index}
                  className={`group relative overflow-hidden shadow-md transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] border-l-4 border-l-white/40 shadow-2xl shadow-[#3d9a8b]/30 scale-[1.02]"
                      : "bg-white border-l-4 border-l-[#3d9a8b] hover:shadow-2xl"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => setActiveOffered(index)}
                >
                  <div className="p-6 relative">
                    {/* Number + label */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`inline-flex items-center justify-center w-10 h-10 font-bold text-base transition-colors duration-500 ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#3d9a8b]/10 text-[#3d9a8b]"
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-500 ${
                        isActive ? "text-white/70" : "text-[#3d9a8b]"
                      }`}>
                        Servicio
                      </span>
                    </div>

                    <h3 className={`font-bold text-base leading-snug mb-2 transition-colors duration-500 ${
                      isActive ? "text-white" : "text-[#1a3a5c] group-hover:text-[#3d9a8b]"
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                      isActive ? "text-white/80" : "text-[#1a3a5c]/65"
                    }`}>
                      {item.description}
                    </p>

                    {/* Bottom animated line */}
                    <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
                      isActive
                        ? "w-full bg-white/40"
                        : "w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]"
                    }`} />
                  </div>
                </motion.div>
              )
            })}
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
            title="Ventajas de"
            titleHighlight="Nuestro Servicio"
            description="Obtén múltiples beneficios al trabajar con TAMEFOR"
            centered
          />

          <div className="grid md:grid-cols-2 gap-8 mt-14 max-w-5xl mx-auto">
            {service.benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.iconName]
              const isActive = activeBenefit === index

              return (
                <motion.div
                  key={index}
                  className={`group relative overflow-hidden p-8 transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] shadow-2xl shadow-[#3d9a8b]/30 scale-[1.02] border border-transparent"
                      : "bg-white border border-[#1a3a5c]/10 hover:shadow-xl"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setActiveBenefit(index)}
                >
                  {/* Top accent */}
                  {!isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  )}

                  <div className="flex items-start gap-5">
                    <motion.div
                      className={`w-14 h-14 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isActive
                          ? "bg-white/20"
                          : "bg-[#3d9a8b]/10 group-hover:bg-[#3d9a8b]"
                      }`}
                      whileHover={{ rotate: 8 }}
                    >
                      <Icon className={`h-7 w-7 transition-colors duration-500 ${
                        isActive
                          ? "text-white"
                          : "text-[#3d9a8b] group-hover:text-white"
                      }`} />
                    </motion.div>

                    <div>
                      <h3 className={`font-bold text-xl mb-2 transition-colors duration-500 ${
                        isActive ? "text-white" : "text-[#1a3a5c]"
                      }`}>{benefit.title}</h3>
                      <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                        isActive ? "text-white/80" : "text-[#1a3a5c]/60"
                      }`}>{benefit.description}</p>
                    </div>
                  </div>

                  {/* Bottom line */}
                  <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
                    isActive
                      ? "w-full bg-white/40"
                      : "w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]"
                  }`} />
                </motion.div>
              )
            })}
          </div>

          {/* Quick stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-[#1a3a5c]/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimatedStat value={15} label="Años de Experiencia" />
            <AnimatedStat value={500} label="Proyectos Exitosos" />
            <AnimatedStat value={98} suffix="%" label="Satisfacción" />
            <AnimatedStat value={200} label="Clientes Atendidos" />
          </motion.div>
        </div>
      </section>

      {/* ═══ Process Section ═══ */}
      <section className="relative overflow-hidden bg-[#f8fafb] py-24">
        <div className="container-max relative z-10">
          <SectionHeader
            icon={Clock}
            subtitle="Proceso"
            title="Nuestro Proceso"
            titleHighlight="de Trabajo"
            description="Un proceso estructurado y transparente para garantizar resultados de calidad"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {service.process.map((step, index) => (
              <ProcessStep
                key={index}
                step={step}
                index={index}
                total={service.process.length}
                isActive={activeProcess === index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Target Audience + Additional Info ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-24">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Left: Target Audience */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-[#3d9a8b]" />
                <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">
                  A Quién Está Dirigido
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                ¿Para Quién es{" "}
                <span className="text-[#3d9a8b]">Este Servicio?</span>
              </h2>

              <p className="text-white/60 leading-relaxed mb-8">
                Este servicio está diseñado para satisfacer las necesidades de:
              </p>

              <ul className="space-y-4">
                {service.targetAudience.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-8 h-8 border border-[#3d9a8b]/50 bg-[#3d9a8b]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-[#3d9a8b]" />
                    </div>
                    <span className="text-white/80 text-[15px]">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 mt-8 font-semibold text-white
                           bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                           shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                           transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Solicitar Consulta
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </motion.div>

            {/* Right: Additional info or service image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-6"
            >
              {service.additionalInfo ? (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <h3 className="text-white font-bold text-xl">{service.additionalInfo.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {service.additionalInfo.items.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-white/80"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div className="w-2 h-2 bg-[#3d9a8b] flex-shrink-0 mt-2" />
                        <span className="text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="relative h-[400px] overflow-hidden shadow-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2540]/70 via-transparent to-transparent" />
                  <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-[#3d9a8b]/40" />
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-[#3d9a8b]/40" />
                </div>
              )}

              {/* Contact quick-info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#3d9a8b]" />
                  <div>
                    <p className="text-white text-sm font-bold">Consulta Gratuita</p>
                    <p className="text-white/50 text-xs">Primera asesoría</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#3d9a8b]" />
                  <div>
                    <p className="text-white text-sm font-bold">Equipo Experto</p>
                    <p className="text-white/50 text-xs">Profesionales certificados</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Other Services ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-max relative z-10">
          <SectionHeader
            icon={Leaf}
            subtitle="Más Servicios"
            title="Explora Otros"
            titleHighlight="Servicios"
            description="Descubre más soluciones que TAMEFOR tiene para ti"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {allServices.slice(0, 3).map((s, index) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/servicios/${s.slug}`}>
                  <div className="group relative overflow-hidden bg-white border border-[#1a3a5c]/10 hover:shadow-xl transition-all duration-500">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2540]/80 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="text-[#3d9a8b] text-xs font-bold uppercase tracking-widest">Servicio {s.number}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-[#1a3a5c] font-bold text-lg mb-2 group-hover:text-[#3d9a8b] transition-colors duration-300">
                        {s.title}
                      </h3>
                      <p className="text-[#1a3a5c]/60 text-sm leading-relaxed mb-4 line-clamp-2">
                        {s.shortDescription}
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d9a8b] group-hover:gap-3 transition-all duration-300">
                        Ver más
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Bottom line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-700" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              ¿Interesado en Este Servicio?
            </motion.h2>

            <motion.p
              className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Contáctanos hoy mismo para más información y obtén una cotización personalizada para tu proyecto
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-[#1a3a5c]
                           bg-white shadow-lg shadow-black/10
                           hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Contáctanos Ahora
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
              <Link href="/servicios">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                             border-2 border-white/30 hover:border-white hover:bg-white/10
                             transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Ver Más Servicios
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ServiceConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={service.title}
      />
    </main>
  )
}
