'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { Check, ArrowRight, Leaf, ChevronRight, Trees, Shield, Scale, BookOpen, Award, Sprout } from "lucide-react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { getServicesForListing } from "@/lib/servicesData"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionHeader } from "@/components/ui"
import { containerVariants, itemVariants } from "@/lib/animations"

const services = getServicesForListing()

const AUTO_ROTATE_MS = 4000

const serviceIcons = [
  Trees,
  Shield,
  Scale,
  BookOpen,
  Award,
  Sprout,
]

const serviceImages = [
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800",
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800",
]

/* ─── Animated counter hook ─── */
function useAnimatedNumber(target: number, duration = 2) {
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 50, damping: 30, duration: duration * 1000 })
  const [display, setDisplay] = useState(0)

  useEffect(() => { mv.set(target) }, [mv, target])
  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  return display
}

/* ─── Service Card ─── */
function ServiceCard({
  service,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  service: ReturnType<typeof getServicesForListing>[0]
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const Icon = serviceIcons[index] || Leaf

  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link href={`/servicios/${service.slug}`}>
        <div
          className={`relative overflow-hidden h-full transition-all duration-500 ${
            isActive
              ? "bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] shadow-2xl shadow-[#3d9a8b]/20 scale-[1.02]"
              : "bg-white border border-[#1a3a5c]/10 shadow-md hover:shadow-xl"
          }`}
        >
          {/* Shine sweep */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>

          {/* Top accent line with animated fill */}
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
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <motion.div
                  className={`flex items-center justify-center w-14 h-14 transition-all duration-500 ${
                    isActive
                      ? "bg-[#3d9a8b] shadow-lg shadow-[#3d9a8b]/30"
                      : "bg-[#3d9a8b]/10 group-hover:bg-[#3d9a8b]/20"
                  }`}
                  animate={isActive ? { rotate: [0, 8, -4, 0] } : { rotate: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className={`w-7 h-7 transition-colors duration-500 ${
                    isActive ? "text-white" : "text-[#3d9a8b]"
                  }`} />
                </motion.div>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
                    isActive ? "text-[#3d9a8b]" : "text-[#3d9a8b]/70"
                  }`}>
                    Servicio
                  </span>
                  <div className={`text-2xl font-black tabular-nums transition-colors duration-500 ${
                    isActive ? "text-white/30" : "text-[#1a3a5c]/15"
                  }`}>
                    {service.number}
                  </div>
                </div>
              </div>

              <motion.div
                className={`flex items-center justify-center w-10 h-10 transition-all duration-500 ${
                  isActive
                    ? "bg-[#3d9a8b]/20 border border-[#3d9a8b]/40"
                    : "bg-[#1a3a5c]/5 group-hover:bg-[#3d9a8b]/10"
                }`}
                animate={isActive ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
              >
                <ArrowRight className={`w-4 h-4 transition-all duration-500 ${
                  isActive
                    ? "text-[#3d9a8b]"
                    : "text-[#1a3a5c]/40 group-hover:text-[#3d9a8b] group-hover:translate-x-0.5"
                }`} />
              </motion.div>
            </div>

            {/* Title */}
            <h3 className={`text-xl lg:text-2xl font-bold leading-tight mb-3 transition-colors duration-500 ${
              isActive ? "text-white" : "text-[#1a3a5c]"
            }`}>
              {service.title}
            </h3>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-6 transition-colors duration-500 ${
              isActive ? "text-white/70" : "text-[#1a3a5c]/60"
            }`}>
              {service.description}
            </p>

            {/* Features with staggered entrance when active */}
            <div className="space-y-2.5 mb-6">
              {service.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 + idx * 0.05 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-5 h-5 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      isActive
                        ? "border border-[#3d9a8b]/60 bg-[#3d9a8b]/20"
                        : "border border-[#3d9a8b]/30 bg-[#3d9a8b]/5"
                    }`}
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                  >
                    <Check className={`h-3 w-3 transition-colors duration-500 ${
                      isActive ? "text-[#3d9a8b]" : "text-[#3d9a8b]/70"
                    }`} />
                  </motion.div>
                  <span className={`text-sm transition-colors duration-500 ${
                    isActive ? "text-white/80" : "text-[#1a3a5c]/70"
                  }`}>
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className={`pt-5 border-t transition-colors duration-500 ${
              isActive ? "border-white/10" : "border-[#1a3a5c]/10"
            }`}>
              <div className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                isActive ? "text-[#3d9a8b]" : "text-[#3d9a8b] group-hover:gap-3"
              }`}>
                Conocer más
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Bottom animated line */}
          <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
            isActive
              ? "w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]"
              : "w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]"
          }`} />
        </div>
      </Link>
    </motion.div>
  )
}

/* ─── Animated counter display ─── */
function AnimatedStat({ value, label }: { value: number; label: string }) {
  const n = useAnimatedNumber(value, 2)
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-black text-white tabular-nums">
        {n.toLocaleString("es-ES")}+
      </div>
      <div className="text-white/60 text-sm font-medium mt-1">{label}</div>
    </div>
  )
}

/* ─── Main Page ─── */
export function ServiciosPageClient() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionInView = useRef(false)

  // Auto-rotate
  useEffect(() => {
    if (isPaused || !sectionInView.current) return
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % services.length)
    }, AUTO_ROTATE_MS)
    return () => clearTimeout(timer)
  }, [activeIndex, isPaused])

  // Observe whether the grid is in the viewport
  const gridRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { sectionInView.current = entry.isIntersecting },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleHover = useCallback((i: number) => {
    setIsPaused(true)
    setActiveIndex(i)
  }, [])

  const handleLeave = useCallback(() => {
    setIsPaused(false)
  }, [])

  const activeService = services[activeIndex]
  const ActiveIcon = serviceIcons[activeIndex] || Leaf

  return (
    <>
      <PageHeader
        badge="Qué Hacemos"
        title="Servicios Especializados"
        titleHighlight="Para El Sector Forestal"
        subtitle="Ofrecemos soluciones integrales para empresas y profesionales del sector forestal y ambiental"
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
      />

      {/* ═══ Services Section ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative blobs */}
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a3a5c]/5 rounded-full blur-3xl -ml-48 -mb-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={Leaf}
            subtitle="Nuestros Servicios"
            title="Explora Nuestra"
            titleHighlight="Oferta de Servicios"
            description="Soluciones integrales para empresas y profesionales del sector forestal y ambiental"
            centered
          />

          {/* Services Grid */}
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard
                key={service.number}
                service={service}
                index={index}
                isActive={activeIndex === index}
                onHover={() => handleHover(index)}
                onLeave={handleLeave}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ═══ CTA Banner ═══ */}
      <section className="relative overflow-hidden bg-white py-20">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mt-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              variants={itemVariants}
            >
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">
                Trabajemos Juntos
              </span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-6"
              variants={itemVariants}
            >
              ¿Necesitas asesoría{" "}
              <span className="text-[#3d9a8b]">especializada?</span>
            </motion.h2>

            <motion.p
              className="text-[#1a3a5c]/70 text-lg mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Nuestro equipo de expertos está listo para ayudarte con soluciones personalizadas para tu empresa o proyecto forestal y ambiental.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link href="/contacto">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                             bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                             shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                             transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contáctanos Ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
