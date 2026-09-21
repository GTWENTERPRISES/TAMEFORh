"use client"

import { Check, ArrowRight, Target, Eye, Star, Users, Award, TreePine, Leaf, ChevronRight, Heart, Lightbulb, Handshake, ShieldCheck, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useScroll, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef, useCallback, MouseEvent as ReactMouseEvent } from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionHeader } from "@/components/ui"
import { containerVariants, itemVariants } from "@/lib/animations"

const AUTO_ROTATE_MS = 4000

/* ─── Animated counter hook (triggers on viewport entry) ─── */
function useCountUp(target: number, duration = 2) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 50, damping: 30, duration: duration * 1000 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (started) mv.set(target)
  }, [started, mv, target])

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  return { display, ref }
}

function AnimatedStat({ value, suffix = "+", label, icon: Icon }: { value: number; suffix?: string; label: string; icon: React.ElementType }) {
  const { display: n, ref } = useCountUp(value, 2.5)
  return (
    <div className="text-center" ref={ref}>
      <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-[#3d9a8b]/20 border border-[#3d9a8b]/30">
        <Icon className="w-5 h-5 text-[#3d9a8b]" />
      </div>
      <div className="text-4xl md:text-5xl font-black text-white tabular-nums">
        {n.toLocaleString("es-ES")}{suffix}
      </div>
      <div className="text-white/60 text-sm font-medium mt-1">{label}</div>
    </div>
  )
}

/* ─── Magnetic hover hook ─── */
function useMagnetic(strength = 0.3) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }, [x, y, strength])

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return { springX, springY, handleMouse, handleLeave }
}

/* ─── Floating particles component ─── */
function FloatingParticles({ count = 20, color = "#3d9a8b" }: { count?: number; color?: string }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }))
  ).current

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            opacity: 0.15,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.1, 0.25, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

/* ─── Tilt card wrapper ─── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(y * -8)
    rotateY.set(x * 8)
  }, [rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

/* ─── Data ─── */
const valores = [
  { title: "Ética Profesional", description: "Integridad y responsabilidad en el ejercicio profesional forestal y ambiental", icon: ShieldCheck },
  { title: "Excelencia Técnica", description: "Alta calidad y competencia técnica en todas nuestras actividades y servicios", icon: Award },
  { title: "Sostenibilidad", description: "Compromiso firme con el desarrollo sostenible y la conservación del medio ambiente", icon: Leaf },
  { title: "Innovación", description: "Búsqueda constante de soluciones innovadoras y tecnológicas para el sector", icon: Lightbulb },
  { title: "Colaboración", description: "Trabajo en equipo y cooperación entre profesionales del sector forestal", icon: Handshake },
  { title: "Transparencia", description: "Comunicación clara, honesta y gestión transparente en todos los procesos", icon: Eye },
]

const hitos = [
  { year: "2025", title: "Fundación", description: "Constitución de TAMEFOR TAPIA & MENA como empresa B.I.C. (Beneficio e Interés Colectivo) en Quevedo, Los Ríos" },
  { year: "2025", title: "Consultoría Ambiental", description: "Inicio de servicios de Sistemas de Gestión Ambiental bajo normas ISO 14001 e ISO 9001 para empresas del sector" },
  { year: "2025", title: "Capacitación Certificada", description: "Lanzamiento de capacitaciones profesionales certificadas por el Ministerio de Trabajo y SENECYT" },
  { year: "2025", title: "Peritajes y Topografía", description: "Habilitación de peritajes judiciales en impacto ambiental, topografía e ingeniería forestal con respaldo legal" },
]

export function NosotrosPageClient() {
  /* ─── Parallax scroll ─── */
  const { scrollYProgress } = useScroll()
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const parallaxScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05])

  /* ─── Auto-rotate for valores ─── */
  const [activeValor, setActiveValor] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionInView = useRef(false)

  useEffect(() => {
    if (isPaused || !sectionInView.current) return
    const timer = setTimeout(() => {
      setActiveValor((prev) => (prev + 1) % valores.length)
    }, AUTO_ROTATE_MS)
    return () => clearTimeout(timer)
  }, [activeValor, isPaused])

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
    setActiveValor(i)
  }, [])

  const handleLeave = useCallback(() => {
    setIsPaused(false)
  }, [])

  /* ─── Magnetic buttons ─── */
  const ctaMagnetic = useMagnetic(0.25)

  /* ─── Mouse gradient tracking for CTA ─── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleCtaMouseMove = useCallback((e: ReactMouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }, [mouseX, mouseY])

  /* ─── Active timeline index (scroll-driven) ─── */
  const [activeHito, setActiveHito] = useState(-1)
  const [revealedHitos, setRevealedHitos] = useState<Set<number>>(new Set())
  const timelineRef = useRef<HTMLDivElement>(null)
  const hitoRefs = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  })

  useEffect(() => {
    const unsub = timelineProgress.on("change", (v) => {
      const count = hitos.length
      const newRevealed = new Set<number>()
      for (let i = 0; i < count; i++) {
        if (v >= i / count) newRevealed.add(i)
      }
      setRevealedHitos(newRevealed)
    })
    return unsub
  }, [timelineProgress])

  return (
    <>
      <PageHeader
        badge="Sobre Nosotros"
        title="Construyendo un Futuro"
        titleHighlight="Forestal Sostenible"
        subtitle="Conoce a TAMEFOR TAPIA & MENA SOLUCIONES FORESTALES Y AMBIENTALES S.A.S. B.I.C - Consultoría forestal y ambiental"
        backgroundImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013"
      />

      {/* ═══ About Content ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <FloatingParticles count={15} color="#3d9a8b" />

        {/* Animated decorative blobs */}
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64 animate-blob"
          style={{ y: parallaxY2 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a3a5c]/5 rounded-full blur-3xl -ml-48 -mb-48 animate-blob-alt"
          style={{ y: parallaxY1 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {/* Images grid with parallax */}
              <motion.div className="relative" variants={itemVariants}>
                <div className="grid grid-cols-2 gap-4 h-[500px]">
                  <motion.div
                    className="row-span-2 relative overflow-hidden shadow-xl border-2 border-[#3d9a8b]/20 group"
                    style={{ y: parallaxY2 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200"
                      alt="Bosque tropical ecuatoriano"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#3d9a8b]/20 to-transparent" />
                  </motion.div>

                  <motion.div
                    className="relative overflow-hidden shadow-xl border-2 border-[#3d9a8b]/20 group"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200"
                      alt="Gestión forestal sostenible"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#3d9a8b]/20 to-transparent" />
                  </motion.div>

                  <motion.div
                    className="relative overflow-hidden shadow-xl border-2 border-[#3d9a8b]/20 group"
                    style={{ y: parallaxY2 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1200"
                      alt="Conservación ambiental"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#3d9a8b]/20 to-transparent" />
                  </motion.div>
                </div>

                {/* Floating badge with pulse glow */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] p-6 shadow-xl z-10"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                >
                  <div className="absolute inset-0 bg-[#3d9a8b] animate-pulse-soft opacity-40 blur-xl" />
                  <p className="text-white font-black text-3xl relative">2025</p>
                  <p className="text-white/80 text-xs font-medium mt-1 relative">Año de<br/>Fundación</p>
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div variants={containerVariants}>
                <motion.div className="flex items-center gap-2 mb-4" variants={itemVariants}>
                  <motion.div
                    className="w-8 h-1 bg-[#3d9a8b]"
                    initial={{ width: 0 }}
                    whileInView={{ width: 32 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                  <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">TAMEFOR Los Ríos</span>
                </motion.div>

                <motion.h2
                  className="font-sans text-3xl lg:text-4xl text-[#1a3a5c] leading-tight mb-6 font-bold"
                  variants={itemVariants}
                >
                  TAMEFOR TAPIA & MENA{" "}
                  <span className="text-[#3d9a8b] relative">
                    SOLUCIONES FORESTALES
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-[#3d9a8b]/40"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                    />
                  </span>{" "}
                  Y AMBIENTALES S.A.S. B.I.C
                </motion.h2>

                <motion.p className="text-[#1a3a5c]/70 leading-relaxed mb-6 text-lg" variants={itemVariants}>
                  Somos una consultora forestal y ambiental constituida como empresa B.I.C. (Beneficio e Interés Colectivo) en Quevedo, Los Ríos, Ecuador.
                  Ofrecemos respaldo legal, criterio técnico y formación certificada en un solo lugar para empresas del sector energético, forestal, agroindustria, construcción y minería.
                </motion.p>

                <motion.ul className="space-y-3 mb-8" variants={containerVariants}>
                  {[
                    "Sistemas de Gestión Ambiental bajo normas ISO 14001 e ISO 9001",
                    "Peritajes judiciales en impacto ambiental, topografía e ingeniería forestal",
                    "Capacitaciones certificadas por el Ministerio de Trabajo y SENECYT"
                  ].map((point, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 group cursor-default"
                      variants={itemVariants}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-6 h-6 border-2 border-[#3d9a8b] flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:bg-[#3d9a8b] transition-colors duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Check className="h-3.5 w-3.5 text-[#3d9a8b] group-hover:text-white transition-colors duration-300" />
                      </motion.div>
                      <span className="text-[#1a3a5c] font-medium group-hover:text-[#3d9a8b] transition-colors duration-300">{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div variants={itemVariants}>
                  <Link href="/contacto">
                    <motion.button
                      className="shine-card group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                                 bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                                 shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                                 transition-shadow duration-300"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Contáctanos
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Misión y Visión ═══ */}
      <section className="section-padding bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] relative overflow-hidden">
        <FloatingParticles count={25} color="#3d9a8b" />
        <div className="absolute inset-0 bg-grid-dark opacity-20" />

        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px] animate-blob"
          style={{ y: parallaxY1 }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px] animate-blob-alt"
          style={{ y: parallaxY2 }}
        />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={Target}
            subtitle="Nuestra Razón de Ser"
            title="Misión y"
            titleHighlight="Visión"
            description="Los pilares que guían nuestro trabajo diario y nuestra visión a futuro"
            centered
            dark
          />

          <motion.div
            className="grid md:grid-cols-2 gap-8 mt-10 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Misión card with tilt */}
            <motion.div variants={itemVariants}>
              <TiltCard className="h-full">
                <div
                  className="shine-card group relative overflow-hidden bg-white/10 backdrop-blur-sm p-10 text-white border border-white/10 hover:border-[#3d9a8b]/40 transition-all duration-500 h-full"
                >
                  {/* Animated gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[#3d9a8b]/10 via-transparent to-[#3d9a8b]/5" />

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
                    <div className="h-full w-2/5 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] via-[#5bc4b1] to-[#3d9a8b] transition-all duration-700" />
                  </div>

                  <motion.div
                    className="w-14 h-14 bg-[#3d9a8b]/20 flex items-center justify-center mb-6 border border-[#3d9a8b]/30 group-hover:bg-[#3d9a8b] transition-colors duration-500 relative"
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Target className="w-7 h-7 text-[#3d9a8b] group-hover:text-white transition-colors duration-500" />
                    <div className="absolute inset-0 bg-[#3d9a8b]/0 group-hover:bg-[#3d9a8b]/20 blur-xl transition-all duration-500" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4 relative">Misión</h3>
                  <p className="text-white/80 leading-relaxed text-lg relative">
                    Brindar soluciones integrales en consultoría forestal y ambiental con respaldo legal,
                    criterio técnico y formación certificada; apoyando a empresas y profesionales del sector
                    energético, forestal, agroindustrial, construcción y minería en el cumplimiento de sus
                    compromisos ambientales antes, durante y después de cualquier gestión.
                  </p>

                  {/* Bottom animated line */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-700" />
                </div>
              </TiltCard>
            </motion.div>

            {/* Visión card with tilt */}
            <motion.div variants={itemVariants}>
              <TiltCard className="h-full">
                <div
                  className="shine-card group relative overflow-hidden bg-white/10 backdrop-blur-sm p-10 text-white border border-white/10 hover:border-[#3d9a8b]/40 transition-all duration-500 h-full"
                >
                  {/* Animated gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[#3d9a8b]/10 via-transparent to-[#3d9a8b]/5" />

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
                    <div className="h-full w-2/5 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] via-[#5bc4b1] to-[#3d9a8b] transition-all duration-700" />
                  </div>

                  <motion.div
                    className="w-14 h-14 bg-[#3d9a8b]/20 flex items-center justify-center mb-6 border border-[#3d9a8b]/30 group-hover:bg-[#3d9a8b] transition-colors duration-500 relative"
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Eye className="w-7 h-7 text-[#3d9a8b] group-hover:text-white transition-colors duration-500" />
                    <div className="absolute inset-0 bg-[#3d9a8b]/0 group-hover:bg-[#3d9a8b]/20 blur-xl transition-all duration-500" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4 relative">Visión</h3>
                  <p className="text-white/80 leading-relaxed text-lg relative">
                    Ser la consultora forestal y ambiental de referencia en Ecuador, reconocida por su
                    excelencia técnica, su capacidad de anticipar riesgos legales y ambientales, y su
                    compromiso con la formación continua de profesionales del sector.
                  </p>

                  {/* Bottom animated line */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-700" />
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Valores (auto-rotate cards with tilt) ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <FloatingParticles count={12} color="#1a3a5c" />

        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64 animate-blob"
          style={{ y: parallaxY2 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a3a5c]/5 rounded-full blur-3xl -ml-48 -mb-48 animate-blob-alt"
          style={{ y: parallaxY1 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={Star}
            subtitle="Nuestros Principios"
            title="Valores"
            titleHighlight="Fundamentales"
            description="Los principios que definen nuestra identidad y guían cada decisión que tomamos"
            centered
          />

          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 max-w-7xl mx-auto">
            {valores.map((valor, index) => {
              const Icon = valor.icon
              const isActive = activeValor === index
              return (
                <motion.div
                  key={index}
                  className="group relative cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={handleLeave}
                >
                  <TiltCard>
                    <div
                      className={`shine-card relative overflow-hidden h-full transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] shadow-2xl shadow-[#3d9a8b]/20 scale-[1.02]"
                          : "bg-white border border-[#1a3a5c]/10 shadow-md hover:shadow-xl"
                      }`}
                    >
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
                        <div className="flex items-start justify-between mb-5">
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

                          <motion.div
                            className={`flex items-center justify-center w-10 h-10 transition-all duration-500 ${
                              isActive
                                ? "bg-[#3d9a8b]/20 border border-[#3d9a8b]/40"
                                : "bg-[#1a3a5c]/5 group-hover:bg-[#3d9a8b]/10"
                            }`}
                            animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                          >
                            <Star className={`w-4 h-4 transition-all duration-500 ${
                              isActive ? "text-[#3d9a8b]" : "text-[#1a3a5c]/30"
                            }`} />
                          </motion.div>
                        </div>

                        {/* Title */}
                        <h3 className={`text-xl lg:text-2xl font-bold leading-tight mb-3 transition-colors duration-500 ${
                          isActive ? "text-white" : "text-[#1a3a5c]"
                        }`}>
                          {valor.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                          isActive ? "text-white/70" : "text-[#1a3a5c]/60"
                        }`}>
                          {valor.description}
                        </p>
                      </div>

                      {/* Bottom animated line */}
                      <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
                        isActive
                          ? "w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]"
                          : "w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]"
                      }`} />
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ Timeline / Hitos ═══ */}
      <section className="section-padding bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] relative overflow-hidden">
        <FloatingParticles count={18} color="#3d9a8b" />
        <div className="absolute inset-0 bg-grid-dark opacity-20" />

        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px] animate-blob"
          style={{ y: parallaxY1 }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px] animate-blob-alt"
          style={{ y: parallaxY2 }}
        />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={TreePine}
            subtitle="Nuestra Trayectoria"
            title="Hitos"
            titleHighlight="Importantes"
            description="Los momentos clave que han marcado nuestro crecimiento y evolución"
            centered
            dark
          />

          <motion.div
            ref={timelineRef}
            className="max-w-4xl mx-auto mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="relative">
              {/* Vertical timeline line driven by scroll */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-px overflow-hidden">
                <motion.div
                  className="w-full bg-gradient-to-b from-[#3d9a8b] via-[#3d9a8b]/50 to-[#3d9a8b]/20 origin-top"
                  style={{ scaleY: timelineProgress, height: "100%" }}
                />
              </div>

              {hitos.map((hito, index) => {
                const isRevealed = revealedHitos.has(index)
                return (
                  <motion.div
                    key={index}
                    ref={(el) => { hitoRefs.current[index] = el }}
                    className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    onMouseEnter={() => setActiveHito(index)}
                    onMouseLeave={() => setActiveHito(-1)}
                  >
                    {/* Content */}
                    <div className={`flex-1 ml-20 md:ml-0 ${
                      index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                    }`}>
                      <motion.div
                        className="shine-card group bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:border-[#3d9a8b]/40 hover:bg-white/15 transition-all duration-300"
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-[#3d9a8b] font-bold text-sm uppercase tracking-widest">{hito.year}</span>
                        <h4 className="text-white font-bold text-xl mt-2 mb-2">{hito.title}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{hito.description}</p>

                        {/* Hover reveal arrow */}
                        <motion.div
                          className="mt-3 flex items-center gap-1 text-[#3d9a8b] text-sm font-medium"
                          initial={{ opacity: 0, x: -10 }}
                          animate={activeHito === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Hito clave</span>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Center dot with ripple */}
                    <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 z-10">
                      <motion.div
                        className="w-7 h-7 border-4 border-[#0f2a45] flex items-center justify-center"
                        initial={{ scale: 0, backgroundColor: "rgba(61,154,139,0.3)" }}
                        animate={isRevealed
                          ? { scale: [0, 1.4, 1], backgroundColor: "rgb(61,154,139)" }
                          : { scale: 0, backgroundColor: "rgba(61,154,139,0.3)" }
                        }
                        transition={{ duration: 0.5, delay: 0.15 }}
                      />
                      {/* Ripple effect */}
                      <AnimatePresence>
                        {(activeHito === index || (isRevealed && !revealedHitos.has(index + 1) && index === revealedHitos.size - 1)) && (
                          <motion.div
                            className="absolute inset-0 border-2 border-[#3d9a8b]"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Stats Banner ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-20">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <FloatingParticles count={15} color="#3d9a8b" />

        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px] animate-blob"
          style={{ y: parallaxY1 }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px] animate-blob-alt"
          style={{ y: parallaxY2 }}
        />

        <div className="container-max relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: 2025, suffix: "", label: "Año de Fundación", icon: Award },
              { value: 500, suffix: "+", label: "Profesionales Capacitados", icon: Users },
              { value: 50, suffix: "+", label: "Proyectos Realizados", icon: TreePine },
              { value: 6, suffix: "", label: "Servicios Especializados", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#3d9a8b]/30 transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#3d9a8b]/10 to-transparent pointer-events-none" />
                <AnimatedStat value={stat.value} suffix={stat.suffix} label={stat.label} icon={stat.icon} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section
        className="relative overflow-hidden bg-white py-20"
        onMouseMove={handleCtaMouseMove}
      >
        <FloatingParticles count={10} color="#3d9a8b" />

        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mt-48 animate-blob"
          style={{ y: parallaxY2 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-[#1a3a5c]/5 rounded-full blur-3xl -mr-40 -mb-40 animate-blob-alt"
          style={{ y: parallaxY1 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        {/* Mouse-following gradient spotlight */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#3d9a8b]/5 blur-3xl pointer-events-none"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
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
              <motion.div
                className="w-8 h-1 bg-[#3d9a8b]"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">
                Únete a Nosotros
              </span>
              <motion.div
                className="w-8 h-1 bg-[#3d9a8b]"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-6"
              variants={itemVariants}
            >
              ¿Quieres ser parte de{" "}
              <span className="text-[#3d9a8b] relative">
                nuestra misión?
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-[#3d9a8b]/40"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>

            <motion.p
              className="text-[#1a3a5c]/70 text-lg mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Forma parte de una red de profesionales comprometidos con el desarrollo sostenible y la conservación de los recursos forestales del Ecuador.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
              onMouseMove={ctaMagnetic.handleMouse}
              onMouseLeave={ctaMagnetic.handleLeave}
            >
              <motion.div
                style={{ x: ctaMagnetic.springX, y: ctaMagnetic.springY }}
              >
                <Link href="/contacto">
                  <motion.button
                    className="shine-card group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                               bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                               shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50 hover:shadow-xl
                               transition-shadow duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Contáctanos Ahora
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
