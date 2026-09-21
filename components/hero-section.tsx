"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, GraduationCap, Sparkles, TreePine, type LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const SLIDE_DURATION = 6000

// Frases para el banner infinito
const bannerPhrases = [
  { icon: TreePine, text: "GESTIÓN FORESTAL SOSTENIBLE" },
  { icon: GraduationCap, text: "CAPACITACIÓN PROFESIONAL CERTIFICADA" },
  { icon: Sparkles, text: "CERTIFICACIÓN ISO 14001" },
  { icon: TreePine, text: "CONSERVACIÓN Y RESTAURACIÓN AMBIENTAL" },
  { icon: GraduationCap, text: "CURSOS AVALADOS POR SENESCYT" },
  { icon: Sparkles, text: "CONSULTORÍA TÉCNICA ESPECIALIZADA" },
  { icon: TreePine, text: "DESARROLLO SOSTENIBLE EN ECUADOR" },
  { icon: GraduationCap, text: "FORMACIÓN CONTINUA" },
]

// Hook para animar números
function useAnimatedNumber(target: number, duration: number = 2) {
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000,
  })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    motionValue.set(target)
  }, [motionValue, target])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return unsubscribe
  }, [springValue])

  return displayValue
}

type Slide = {
  id: string
  subtitle: string
  title: string
  titleHighlight: string
  titleThirdLine?: string
  description: string
  stat: { 
    icon: LucideIcon
    value: string
    numericValue: number
    label: string
    progress: number
  }
  images: { main: string; float1: string; float2: string }
}

const slides: Slide[] = [
  {
    id: "gestion-ambiental",
    subtitle: "Consultoría forestal y ambiental",
    title: "Gestión ambiental",
    titleHighlight: "con respaldo legal",
    titleThirdLine: "y con normativa ISO",
    description:
      "Sistemas de gestión ISO 14001, plantaciones comerciales certificadas y asesoría técnica especializada para empresas del sector.",
    stat: { 
      icon: TreePine,
      value: "5 000+",
      numericValue: 5000,
      label: "Árboles plantados",
      progress: 82
    },
    images: {
      main: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000",
      float1: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=400",
      float2: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=400",
    },
  },
  {
    id: "formacion-profesional",
    subtitle: "Capacitación certificada",
    title: "Formación profesional",
    titleHighlight: "avalada por SENESCYT y Ministerio del Trabajo",
    description:
      "Cursos certificados en gestión ambiental, forestal y desarrollo sostenible para profesionales y equipos técnicos del sector.",
    stat: { 
      icon: GraduationCap,
      value: "2 000+",
      numericValue: 2000,
      label: "Profesionales capacitados",
      progress: 68
    },
    images: {
      main: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000",
      float1: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=400",
      float2: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=400",
    },
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 600], [0, 90])

  // Validar que el índice actual sea válido
  useEffect(() => {
    if (current >= slides.length) {
      setCurrent(0)
    }
  }, [current])

  // Un solo temporizador: se reinicia al cambiar de slide (también al hacer clic).
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearTimeout(timer)
  }, [current])

  const activeSlide = slides[current] || slides[0]
  const StatIcon = activeSlide.stat.icon

  // Componente interno para el contador animado
  function AnimatedStatValue({ targetValue }: { targetValue: number }) {
    const animatedValue = useAnimatedNumber(targetValue, 2.5)
    
    // Formatear el número con espacio de separación de miles
    const formattedValue = animatedValue.toLocaleString('es-ES').replace(/,/g, ' ')
    
    return <>{formattedValue}+</>
  }

  return (
    <section id="hero" className="relative isolate flex min-h-[600px] items-center overflow-hidden py-10 pb-16 sm:py-12 sm:pb-20 lg:min-h-[640px] lg:py-14 lg:pb-24">
      {/* Fondo base */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45]" />

      {/* Imagen de fondo con parallax suave */}
      <motion.div
        className="absolute inset-0 -z-20 opacity-20 md:opacity-25"
        style={reduceMotion ? undefined : { y: backgroundY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2013"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Velo para asegurar contraste del texto */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1a3a5c]/98 via-[#163250]/92 to-[#0f2a45]/80 md:from-[#1a3a5c]/95 md:via-[#163250]/85 md:to-[#0f2a45]/70" />

      <div className="container relative z-10 mx-auto w-full px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
          {/* ---------------- Columna de texto ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            {/* Etiqueta — todas las variantes ocupan la misma celda */}
            <div className="grid">
              {slides.map((slide, index) => {
                const isActive = index === current
                return (
                  <motion.div
                    key={slide.id}
                    className="col-start-1 row-start-1 justify-self-start"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -12 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    aria-hidden={!isActive}
                  >
                    <span className="flex h-12 items-center gap-2.5 border-l-4 border-[#3d9a8b] bg-[#3d9a8b]/15 px-5 text-base font-semibold tracking-tight text-white backdrop-blur-md sm:px-6 md:h-14 md:text-lg">
                      <motion.span
                        animate={reduceMotion ? undefined : { rotate: [0, 12, -12, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                      >
                        <Sparkles className="h-5 w-5 shrink-0 text-[#3d9a8b]" />
                      </motion.span>
                      <span className="whitespace-nowrap">{slide.subtitle}</span>
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* Título — la altura la define el slide más largo, así nada salta */}
            <div className="mt-6 grid">
              {slides.map((slide, index) => {
                const isActive = index === current
                return (
                  <h1
                    key={slide.id}
                    className="col-start-1 row-start-1 text-balance font-bold leading-[1.05] text-white"
                    aria-hidden={!isActive}
                  >
                    <motion.span
                      className="block text-[2.75rem] sm:text-6xl md:text-[4rem] lg:text-7xl"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.05 : 0 }}
                    >
                      {slide.title}
                    </motion.span>
                    <motion.span
                      className="relative mt-3 inline-block text-2xl text-[#3d9a8b] sm:text-3xl md:text-[2.25rem] lg:text-[2.5rem]"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.15 : 0 }}
                    >
                      {slide.titleHighlight}
                      {!slide.titleThirdLine && (
                        <motion.span
                          className="absolute -bottom-2 left-0 block h-[3px] w-full origin-left bg-[#3d9a8b]"
                          initial={false}
                          animate={{ scaleX: isActive ? 1 : 0 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.7,
                            ease: "easeOut",
                            delay: isActive ? 0.35 : 0,
                          }}
                        />
                      )}
                    </motion.span>
                    {slide.titleThirdLine && (
                      <motion.span
                        className="relative mt-3 inline-block text-2xl text-[#3d9a8b] sm:text-3xl md:text-[2.25rem] lg:text-[2.5rem]"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.25 : 0 }}
                      >
                        {slide.titleThirdLine}
                        <motion.span
                          className="absolute -bottom-2 left-0 block h-[3px] w-full origin-left bg-[#3d9a8b]"
                          initial={false}
                          animate={{ scaleX: isActive ? 1 : 0 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.7,
                            ease: "easeOut",
                            delay: isActive ? 0.45 : 0,
                          }}
                        />
                      </motion.span>
                    )}
                  </h1>
                )
              })}
            </div>

            {/* Descripción */}
            <div className="mt-8 grid">
              {slides.map((slide, index) => {
                const isActive = index === current
                return (
                  <motion.p
                    key={slide.id}
                    className="col-start-1 row-start-1 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl md:text-[1.375rem]"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 14 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.25 : 0 }}
                    aria-hidden={!isActive}
                  >
                    {slide.description}
                  </motion.p>
                )
              })}
            </div>

            {/* Botones — fijos, no se reanimarán en cada slide */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 w-full rounded-none border-2 border-[#3d9a8b] bg-[#3d9a8b] px-10 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2d8a7b] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#163250] sm:w-auto"
              >
                <Link href="/cursos" className="group">
                  Ver cursos
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-14 w-full rounded-none border-2 border-white/80 bg-transparent px-10 text-lg font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#1a3a5c] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#163250] sm:w-auto"
              >
                <Link href="/servicios">Conocer servicios</Link>
              </Button>
            </div>

            {/* Indicadores con barra de progreso */}
            <div className="mt-8 flex items-center gap-3">
              {slides.map((slide, index) => {
                const isActive = index === current
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Ir a ${slide.title}`}
                    aria-current={isActive}
                    className={`relative h-[6px] overflow-hidden rounded-full bg-white/25 transition-[width,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#163250] ${
                      isActive ? "w-20 sm:w-24" : "w-10 hover:bg-white/45 sm:w-12"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        key={current}
                        className="absolute inset-y-0 left-0 block rounded-full bg-[#3d9a8b]"
                        initial={{ width: reduceMotion ? "100%" : "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: reduceMotion ? 0 : SLIDE_DURATION / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* ---------------- Columna visual ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="group relative mx-auto w-full max-w-md pb-14 lg:mx-0 lg:w-[520px] lg:max-w-none lg:pb-8"
          >
            {/* Imagen principal: caja de proporción fija, la foto nunca cambia el alto */}
            <div className="relative aspect-[4/3] overflow-hidden border-4 border-[#3d9a8b]/30 shadow-2xl">
              {slides.map((slide, index) => {
                const isActive = index === current
                return (
                  <motion.div
                    key={slide.id}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive && !reduceMotion ? 1.06 : 1 }}
                    transition={{
                      opacity: { duration: 0.6, ease: "easeOut" },
                      scale: { duration: SLIDE_DURATION / 1000, ease: "linear" },
                    }}
                    aria-hidden={!isActive}
                  >
                    <Image
                      src={slide.images.main}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 520px"
                      className="object-cover"
                    />
                  </motion.div>
                )
              })}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/65 via-transparent to-transparent" />
            </div>

            {/* Imágenes flotantes: posiciones y tamaños fijos en ambos slides */}
            <motion.div
              className="absolute -left-8 top-10 hidden h-[128px] w-[176px] overflow-hidden border-4 border-[#3d9a8b]/40 shadow-xl lg:block"
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {slides.map((slide, index) => (
                <motion.div
                  key={slide.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: index === current ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  aria-hidden
                >
                  <Image src={slide.images.float1} alt="" fill sizes="176px" className="object-cover" />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="absolute -right-6 bottom-24 hidden h-[116px] w-[156px] overflow-hidden border-4 border-white/25 shadow-xl lg:block"
              animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              {slides.map((slide, index) => (
                <motion.div
                  key={slide.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: index === current ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  aria-hidden
                >
                  <Image src={slide.images.float2} alt="" fill sizes="156px" className="object-cover" />
                </motion.div>
              ))}
            </motion.div>

            {/* Tarjeta de dato: ancho fijo para que no cambie de tamaño entre slides */}
            <div className="absolute bottom-0 left-4 w-[264px] border-l-4 border-[#3d9a8b] bg-white p-5 shadow-2xl lg:left-8">
              <div className="flex items-center gap-4">
                <motion.div
                  key={`icon-${current}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#3d9a8b]/15"
                  initial={reduceMotion ? false : { scale: 0.6, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <StatIcon className="h-6 w-6 text-[#3d9a8b]" strokeWidth={2.25} />
                </motion.div>
                <div className="min-w-0">
                  <motion.div
                    key={`value-${current}`}
                    className="text-[1.75rem] font-bold leading-none text-[#1a3a5c]"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <AnimatedStatValue targetValue={activeSlide.stat.numericValue} />
                  </motion.div>
                  <motion.div
                    key={`label-${current}`}
                    className="mt-1 truncate text-sm text-gray-600"
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
                  >
                    {activeSlide.stat.label}
                  </motion.div>
                </div>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  className="h-full rounded-full bg-[#3d9a8b]"
                  initial={false}
                  animate={{ width: `${activeSlide.stat.progress}%` }}
                  transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Banner inferior con animación infinita */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-primary py-2">
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap"
          animate={{
            x: [0, -2400],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...Array(4)].map((_, repeatIndex) => (
            <div key={repeatIndex} className="flex items-center gap-8">
              {bannerPhrases.map((phrase, index) => {
                const Icon = phrase.icon
                return (
                  <div key={`${repeatIndex}-${index}`} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-white" strokeWidth={2.5} />
                    <span className="text-xs font-bold uppercase tracking-wider text-white md:text-sm">
                      {phrase.text}
                    </span>
                  </div>
                )
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
