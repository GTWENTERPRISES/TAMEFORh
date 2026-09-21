'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { CreditCard, Upload, AlertCircle, Check, ArrowRight, Shield, Clock, Banknote, Receipt, ChevronRight, Building2, FileText, DollarSign, Layers, BadgeCheck, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { coursesData } from "@/lib/coursesData"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionHeader } from "@/components/ui"
import { containerVariants, itemVariants } from "@/lib/animations"

const AUTO_ROTATE_MS = 4000

/* ─── Animated number hook ─── */
function useAnimatedNumber(target: number, isInView: boolean, duration = 2) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = target / (duration * 60)
    const id = setInterval(() => {
      start += step
      if (start >= target) { setDisplay(target); clearInterval(id) }
      else setDisplay(Math.round(start))
    }, 1000 / 60)
    return () => clearInterval(id)
  }, [target, isInView, duration])
  return display
}

/* ─── AnimatedStat ─── */
function AnimatedStat({ icon: Icon, value, suffix = '', label, delay = 0 }: {
  icon: typeof Clock
  value: number
  suffix?: string
  label: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const n = useAnimatedNumber(value, inView)

  return (
    <motion.div
      ref={ref}
      className="group text-center p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#3d9a8b]/5 rounded-full blur-2xl" />
      <div className="relative">
        <div className="w-12 h-12 mx-auto mb-3 bg-[#3d9a8b]/20 flex items-center justify-center">
          <Icon className="h-6 w-6 text-[#3d9a8b]" />
        </div>
        <p className="text-3xl md:text-4xl font-bold text-[#3d9a8b] mb-2 group-hover:scale-110 transition-transform">
          {n.toLocaleString('es-ES')}{suffix}
        </p>
        <p className="text-white/60 text-sm font-medium">{label}</p>
      </div>
    </motion.div>
  )
}

/* ─── Steps Info Card (auto-rotating) ─── */
const paymentSteps = [
  {
    icon: GraduationCap,
    title: "Selecciona tu Curso",
    content: "Escoge el curso y los niveles que deseas tomar de nuestra oferta académica.",
    detail: "Descuentos por niveles completos"
  },
  {
    icon: Banknote,
    title: "Realiza la Transferencia",
    content: "Transfiere el monto exacto a nuestra cuenta Produbanco.",
    detail: "Cuenta Corriente: 27059122094"
  },
  {
    icon: Upload,
    title: "Sube el Comprobante",
    content: "Adjunta una captura o PDF de tu comprobante de transferencia.",
    detail: "JPG, PNG o PDF"
  },
  {
    icon: BadgeCheck,
    title: "Confirmación",
    content: "Recibe la confirmación de inscripción en tu correo electrónico.",
    detail: "Respuesta en 24-48h"
  }
]

function StepCard({
  item,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  item: typeof paymentSteps[0]
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const Icon = item.icon

  return (
    <motion.div
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className={`relative overflow-hidden h-full transition-all duration-500 ${
        isActive
          ? 'bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] shadow-2xl shadow-[#3d9a8b]/20 scale-[1.02]'
          : 'bg-white border border-[#1a3a5c]/10 shadow-md hover:shadow-xl'
      }`}>
        {/* Shine sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#3d9a8b] via-[#5bc4b1] to-[#3d9a8b]"
            initial={false}
            animate={{ width: isActive ? '100%' : '40%' }}
            transition={{ duration: isActive ? AUTO_ROTATE_MS / 1000 : 0.4, ease: isActive ? 'linear' : 'easeOut' }}
          />
        </div>

        <div className="p-7">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className={`flex items-center justify-center w-14 h-14 transition-all duration-500 ${
                isActive
                  ? 'bg-[#3d9a8b] shadow-lg shadow-[#3d9a8b]/30'
                  : 'bg-[#3d9a8b]/10 group-hover:bg-[#3d9a8b]/20'
              }`}
              animate={isActive ? { rotate: [0, 8, -4, 0] } : { rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className={`w-7 h-7 transition-colors duration-500 ${
                isActive ? 'text-white' : 'text-[#3d9a8b]'
              }`} />
            </motion.div>
            <div>
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
                isActive ? 'text-[#3d9a8b]' : 'text-[#3d9a8b]/70'
              }`}>
                Paso {index + 1}
              </span>
              <div className={`text-2xl font-black tabular-nums transition-colors duration-500 ${
                isActive ? 'text-white/30' : 'text-[#1a3a5c]/15'
              }`}>
                0{index + 1}
              </div>
            </div>
          </div>

          <h3 className={`text-lg font-bold mb-2 transition-colors duration-500 ${
            isActive ? 'text-white' : 'text-[#1a3a5c]'
          }`}>
            {item.title}
          </h3>

          <p className={`text-sm mb-3 leading-relaxed transition-colors duration-500 ${
            isActive ? 'text-white/80' : 'text-[#1a3a5c]/60'
          }`}>
            {item.content}
          </p>

          <p className={`text-xs font-semibold transition-colors duration-500 ${
            isActive ? 'text-[#3d9a8b]' : 'text-[#3d9a8b]/70'
          }`}>
            {item.detail}
          </p>
        </div>

        {/* Bottom animated line */}
        <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
          isActive
            ? 'w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]'
            : 'w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]'
        }`} />
      </div>
    </motion.div>
  )
}

/* ─── Helper ─── */
const getLevelsForCourse = (totalLevels: number) => {
  const allLevels = [
    { id: '1', title: 'Nivel I' },
    { id: '2', title: 'Nivel II' },
    { id: '3', title: 'Nivel III' },
  ]
  return allLevels.slice(0, totalLevels)
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export function PagosPageClient() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionInView = useRef(false)
  const [selected, setSelected] = useState<{ courseId: string; levels: string[] } | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [email, setEmail] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [idNumber, setIdNumber] = useState('')
  const [receiptNumber, setReceiptNumber] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  /* Auto-rotate steps */
  useEffect(() => {
    if (isPaused || !sectionInView.current) return
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % paymentSteps.length)
    }, AUTO_ROTATE_MS)
    return () => clearTimeout(timer)
  }, [activeStep, isPaused])

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

  const handleStepHover = useCallback((i: number) => {
    setIsPaused(true)
    setActiveStep(i)
  }, [])

  const handleStepLeave = useCallback(() => {
    setIsPaused(false)
  }, [])

  /* Course & pricing */
  const selectedCourse = selected !== null ? coursesData.find(c => c.id === selected.courseId) : null

  const calculatePricing = () => {
    if (!selectedCourse || !selected || selected.levels.length === 0) {
      return { subtotal: 0, discount: 0, total: 0, hasDiscount: false }
    }
    const pricePerLevel = selectedCourse.price.basePerLevel
    const numLevels = selected.levels.length
    const subtotal = pricePerLevel * numLevels
    const hasDiscount = numLevels === 3
    const discount = hasDiscount ? subtotal * 0.20 : 0
    const total = subtotal - discount
    return { subtotal, discount, total, hasDiscount }
  }

  const pricing = calculatePricing()

  const toggleLevel = (courseId: string, level: string) => {
    setSelected(prev => {
      if (!prev || prev.courseId !== courseId) {
        return { courseId, levels: [level] }
      }
      const levelIndex = prev.levels.indexOf(level)
      if (levelIndex > -1) {
        const newLevels = prev.levels.filter(l => l !== level)
        if (newLevels.length === 0) return null
        return { courseId, levels: newLevels }
      } else {
        return { courseId, levels: [...prev.levels, level].sort() }
      }
    })
    setErrors(prev => ({ ...prev, course: '' }))
  }

  const isLevelSelected = (courseId: string, level: string) => {
    return selected?.courseId === courseId && selected.levels.includes(level)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setErrors(prev => ({ ...prev, file: '' }))
    }
  }

  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!selected || selected.levels.length === 0) {
      newErrors.course = 'Por favor selecciona al menos un nivel de un curso'
    }
    if (!idNumber.trim()) {
      newErrors.idNumber = 'Por favor ingresa tu número de cédula'
    } else if (!/^\d{10}$/.test(idNumber.trim())) {
      newErrors.idNumber = 'La cédula debe tener 10 dígitos'
    }
    if (!email.trim()) {
      newErrors.email = 'Por favor ingresa tu correo electrónico'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Ingresa un correo electrónico válido'
    }
    if (!selectedFile) {
      newErrors.file = 'Por favor sube el comprobante de pago'
    }

    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    setIsSubmitting(true)
    console.log('Datos del formulario:', {
      selectedCourse, selected, idNumber, email, receiptNumber, selectedFile
    })

    setTimeout(() => {
      setIsSubmitting(false)
      setShowModal(true)
    }, 1500)
  }

  const resetForm = () => {
    setSelected(null)
    setIdNumber('')
    setEmail('')
    setReceiptNumber('')
    setSelectedFile(null)
    setErrors({})
    setIsSubmitting(false)
    setShowModal(false)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ═══ Hero ═══ */}
      <PageHeader
        badge="Sistema de Pagos"
        title="Pagos y"
        titleHighlight="Facturación"
        subtitle="Selecciona tu curso, realiza la transferencia y sube tu comprobante de forma segura para completar tu inscripción."
        backgroundImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070"
      />

      {/* ═══ Steps Cards (auto-rotating) ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a3a5c]/5 rounded-full blur-3xl -ml-48 -mb-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={Layers}
            subtitle="Proceso de Pago"
            title="Cómo Realizar tu"
            titleHighlight="Inscripción"
            description="Sigue estos sencillos pasos para completar tu proceso de pago e inscripción en nuestros cursos"
            centered
          />

          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {paymentSteps.map((item, index) => (
              <StepCard
                key={index}
                item={item}
                index={index}
                isActive={activeStep === index}
                onHover={() => handleStepHover(index)}
                onLeave={handleStepLeave}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Course Selection (dark bg) ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-24">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />
        <motion.div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px]" />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={GraduationCap}
            subtitle="Oferta Académica"
            title="Selecciona tu"
            titleHighlight="Curso"
            description="Escoge el curso y los niveles que deseas tomar. Obtén un 20% de descuento al seleccionar los 3 niveles."
            centered
            dark
          />

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 mt-14">
            {/* Courses list */}
            <motion.div
              className="lg:col-span-3 space-y-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {coursesData.map((course, index) => (
                <motion.div
                  key={course.id}
                  className={`group relative overflow-hidden transition-all duration-500 ${
                    selected?.courseId === course.id
                      ? 'bg-white/10 border-2 border-[#3d9a8b] shadow-xl shadow-[#3d9a8b]/10'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -2 }}
                >
                  {/* Shine sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  <div className="p-6 lg:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 flex items-center justify-center transition-all duration-500 ${
                            selected?.courseId === course.id
                              ? 'bg-[#3d9a8b] shadow-lg shadow-[#3d9a8b]/30'
                              : 'bg-[#3d9a8b]/20'
                          }`}>
                            <GraduationCap className={`w-5 h-5 transition-colors duration-500 ${
                              selected?.courseId === course.id ? 'text-white' : 'text-[#3d9a8b]'
                            }`} />
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg leading-tight">{course.title}</h3>
                            <p className="text-white/50 text-xs mt-0.5">{course.codigoEspecialidad} &bull; {course.cargaHoraria} horas</p>
                          </div>
                        </div>
                        {course.subtitle && (
                          <p className="text-white/60 text-sm ml-[52px]">{course.subtitle}</p>
                        )}
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <div className="text-2xl font-bold text-[#3d9a8b]">
                          ${course.price.regular}
                        </div>
                        <span className="text-white/40 text-xs">
                          {course.price.levels > 1 ? 'curso completo' : 'curso'}
                        </span>
                        {course.price.levels > 1 && (
                          <div className="text-sm text-[#5bc4b1] mt-0.5 font-semibold">
                            ${course.price.basePerLevel}/nivel
                          </div>
                        )}
                      </div>
                    </div>

                    {course.price.levels > 1 ? (
                      <>
                        <div className="flex flex-wrap items-center gap-2 ml-[52px]">
                          <span className="text-white/40 text-xs font-semibold mr-1">Selecciona niveles:</span>
                          {getLevelsForCourse(course.price.levels).map((level) => {
                            const active = isLevelSelected(course.id, level.title)
                            return (
                              <motion.button
                                key={level.id}
                                type="button"
                                onClick={() => toggleLevel(course.id, level.title)}
                                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 transition-all duration-300 ${
                                  active
                                    ? 'bg-[#3d9a8b] text-white shadow-lg shadow-[#3d9a8b]/30'
                                    : 'bg-white/5 text-white/70 border border-white/20 hover:bg-white/10 hover:text-white'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {active && <Check className="w-3 h-3" />}
                                {level.title}
                              </motion.button>
                            )
                          })}
                        </div>

                        {selected?.courseId === course.id && selected.levels.length > 0 && (
                          <motion.div
                            className="mt-4 pt-4 border-t border-white/10 ml-[52px]"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-white">
                                {selected.levels.join(", ")} ({selected.levels.length} nivel{selected.levels.length > 1 ? 'es' : ''})
                              </p>
                              {selected.levels.length === 3 && (
                                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c] text-white px-3 py-1.5 text-xs font-bold shadow-lg">
                                  <Check className="w-3 h-3" />
                                  20% DESCUENTO
                                </div>
                              )}
                            </div>
                            {selected.levels.length < 3 && (
                              <div className="mt-2 p-2.5 bg-[#3d9a8b]/10 border border-[#3d9a8b]/30">
                                <p className="text-[#5bc4b1] text-xs font-semibold">
                                  Completa los 3 niveles y ahorra <strong>${(selectedCourse?.price.basePerLevel ?? 0) * 3 * 0.20}</strong> con el 20% de descuento
                                </p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <div className="ml-[52px]">
                        <motion.button
                          type="button"
                          onClick={() => {
                            if (selected?.courseId === course.id) {
                              setSelected(null)
                            } else {
                              setSelected({ courseId: course.id, levels: ['Curso Completo'] })
                            }
                            setErrors(prev => ({ ...prev, course: '' }))
                          }}
                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 transition-all duration-300 ${
                            selected?.courseId === course.id
                              ? 'bg-[#3d9a8b] text-white shadow-lg shadow-[#3d9a8b]/30'
                              : 'bg-white/5 text-white/70 border border-white/20 hover:bg-white/10 hover:text-white'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {selected?.courseId === course.id && <Check className="w-4 h-4" />}
                          {selected?.courseId === course.id ? 'Curso Seleccionado' : 'Seleccionar Curso'}
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* Bottom animated line */}
                  <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
                    selected?.courseId === course.id
                      ? 'w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]'
                      : 'w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]'
                  }`} />
                </motion.div>
              ))}

              {errors.course && (
                <motion.div
                  className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-400 text-sm font-medium">{errors.course}</p>
                </motion.div>
              )}
            </motion.div>

            {/* Payment Summary Sidebar */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Amount Card */}
              <div className="bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/20 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl">Resumen de Pago</h3>
                </div>

                {selectedCourse && selected && selected.levels.length > 0 ? (
                  <div className="space-y-4">
                    <div className="text-white/80 text-xs space-y-1 pb-4 border-b border-white/20">
                      <div className="font-bold text-white text-sm">{selectedCourse.title}</div>
                      <div>{selected.levels.join(", ")}</div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/80">
                        Subtotal ({selected.levels.length} nivel{selected.levels.length > 1 ? 'es' : ''})
                      </span>
                      <span className="text-white font-semibold">${pricing.subtotal.toFixed(2)}</span>
                    </div>

                    {pricing.hasDiscount && (
                      <div className="flex justify-between items-center text-sm bg-white/10 -mx-4 px-4 py-3">
                        <span className="text-white font-bold flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Descuento 20%
                        </span>
                        <span className="text-white font-black text-lg">-${pricing.discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-3 border-t border-white/20">
                      <span className="text-white font-bold text-sm">Total a Pagar</span>
                      <span className="text-white font-bold text-3xl">${pricing.total.toFixed(2)}</span>
                    </div>

                    {!pricing.hasDiscount && selected.levels.length < 3 && selectedCourse.price.levels > 1 && (
                      <div className="mt-2 p-3 bg-white/10 border-l-4 border-white/40">
                        <p className="text-white/80 text-xs font-semibold">
                          Selecciona los 3 niveles y ahorra <strong>${(selectedCourse.price.basePerLevel * 3 * 0.20).toFixed(0)}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl font-bold text-white">$0.00</div>
                    <div className="mt-2 text-white/60 text-xs">Selecciona un curso y sus niveles</div>
                  </div>
                )}
              </div>

              {/* Bank Info */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-[#3d9a8b]" />
                  </div>
                  <h3 className="text-white font-bold text-xl">Datos Bancarios</h3>
                </div>

                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 mb-6">
                  <Image src="/banco.jpg" alt="Produbanco" width={24} height={24} className="object-contain" />
                  <span className="font-bold text-white text-sm">PRODUBANCO</span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Tipo de Cuenta', value: 'Cuenta Corriente' },
                    { label: 'Número de Cuenta', value: '27059122094', highlight: true },
                    { label: 'Titular', value: 'TAMEFOR TAPIA & MENA SOLUCIONES FORESTALES Y AMBIENTALES S.A.S. B.I.C.' },
                    { label: 'RUC', value: '1291792017001' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="p-3 bg-white/5 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">{item.label}</span>
                      <p className={`font-semibold mt-0.5 ${
                        item.highlight ? 'text-[#3d9a8b] text-lg' : 'text-white text-sm'
                      }`}>
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Payment Form Section ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={CreditCard}
            subtitle="Formulario de Pago"
            title="Completa tu"
            titleHighlight="Registro de Pago"
            description="Ingresa tus datos y sube el comprobante de tu transferencia para completar el proceso"
            centered
          />

          <motion.div
            className="max-w-4xl mx-auto mt-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              {/* Corner frames */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#3d9a8b]/40 z-20" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#3d9a8b]/40 z-20" />

              <div className="bg-white border border-[#1a3a5c]/10 shadow-xl p-8 md:p-12">
                {/* Top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-[#3d9a8b] via-[#5bc4b1] to-[#3d9a8b] mb-10" />

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Cédula */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-2 text-sm uppercase tracking-wider">
                        Número de Cédula <span className="text-[#3d9a8b]">*</span>
                      </label>
                      <p className="text-[#1a3a5c]/50 text-xs mb-3">Ingresa tu número de cédula de identidad</p>
                      <input
                        value={idNumber}
                        onChange={(e) => {
                          setIdNumber(e.target.value)
                          setErrors(prev => ({ ...prev, idNumber: '' }))
                        }}
                        placeholder="Número de cédula"
                        disabled={isSubmitting}
                        className={`w-full h-12 px-4 bg-[#f8fafb] border-2 text-[#1a3a5c] placeholder-[#1a3a5c]/30 focus:outline-none transition-colors duration-300 ${
                          errors.idNumber
                            ? 'border-red-500/60 focus:border-red-500'
                            : 'border-[#1a3a5c]/10 focus:border-[#3d9a8b]'
                        } disabled:opacity-50`}
                      />
                      {errors.idNumber && (
                        <p className="mt-2 text-red-600 text-xs font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          {errors.idNumber}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-2 text-sm uppercase tracking-wider">
                        Correo Electrónico <span className="text-[#3d9a8b]">*</span>
                      </label>
                      <p className="text-[#1a3a5c]/50 text-xs mb-3">Para recibir la confirmación de inscripción</p>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setErrors(prev => ({ ...prev, email: '' }))
                        }}
                        placeholder="ejemplo@correo.com"
                        disabled={isSubmitting}
                        className={`w-full h-12 px-4 bg-[#f8fafb] border-2 text-[#1a3a5c] placeholder-[#1a3a5c]/30 focus:outline-none transition-colors duration-300 ${
                          errors.email
                            ? 'border-red-500/60 focus:border-red-500'
                            : 'border-[#1a3a5c]/10 focus:border-[#3d9a8b]'
                        } disabled:opacity-50`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-red-600 text-xs font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Payment Method */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-2 text-sm uppercase tracking-wider">
                        Método de pago
                      </label>
                      <div className="flex items-center gap-3 h-12 px-4 bg-[#3d9a8b]/5 border-2 border-[#3d9a8b]/20">
                        <div className="w-5 h-5 border-2 border-[#3d9a8b] bg-[#3d9a8b] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-[#1a3a5c] font-semibold text-sm">Banco Produbanco</span>
                      </div>
                    </div>

                    {/* Receipt Number */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-2 text-sm uppercase tracking-wider">
                        N° de Comprobante
                      </label>
                      <p className="text-[#1a3a5c]/50 text-xs mb-3">Referencia o número de transacción</p>
                      <input
                        value={receiptNumber}
                        onChange={(e) => setReceiptNumber(e.target.value)}
                        placeholder="Referencia / N° transacción"
                        disabled={isSubmitting}
                        className="w-full h-12 px-4 bg-[#f8fafb] border-2 border-[#1a3a5c]/10 text-[#1a3a5c] placeholder-[#1a3a5c]/30 focus:outline-none focus:border-[#3d9a8b] transition-colors duration-300 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-[#1a3a5c] font-semibold mb-2 text-sm uppercase tracking-wider">
                      Comprobante de Pago <span className="text-[#3d9a8b]">*</span>
                    </label>
                    <p className="text-[#1a3a5c]/50 text-xs mb-3">Sube una imagen o PDF del comprobante de tu transferencia</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <motion.div
                      onClick={handleFileUploadClick}
                      className={`border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
                        errors.file
                          ? 'border-red-500/50 bg-red-50/50'
                          : selectedFile
                            ? 'border-[#3d9a8b]/50 bg-[#3d9a8b]/5'
                            : 'border-[#1a3a5c]/15 hover:border-[#3d9a8b] hover:bg-[#3d9a8b]/5'
                      }`}
                      whileHover={{ scale: 1.005 }}
                    >
                      {selectedFile ? (
                        <>
                          <div className="w-14 h-14 mx-auto mb-3 bg-[#3d9a8b] flex items-center justify-center">
                            <Check className="w-7 h-7 text-white" />
                          </div>
                          <p className="text-[#1a3a5c] font-bold mb-1">{selectedFile.name}</p>
                          <p className="text-[#1a3a5c]/50 text-sm">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedFile(null)
                            }}
                            className="mt-3 text-red-600 hover:text-red-700 text-sm font-semibold"
                          >
                            Cambiar archivo
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="w-14 h-14 mx-auto mb-3 bg-[#3d9a8b]/10 flex items-center justify-center">
                            <Upload className="w-7 h-7 text-[#3d9a8b]" />
                          </div>
                          <p className="text-[#1a3a5c] font-bold mb-1">Subir comprobante</p>
                          <p className="text-[#1a3a5c]/50 text-sm">JPG, PNG o PDF &bull; Máximo 5MB</p>
                        </>
                      )}
                    </motion.div>
                    {errors.file && (
                      <p className="mt-2 text-red-600 text-xs font-medium flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.file}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-white
                               bg-gradient-to-r from-[#1a3a5c] to-[#0f2a45]
                               shadow-lg shadow-[#1a3a5c]/25 hover:shadow-[#1a3a5c]/50
                               transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        Registrar Pago
                        <CreditCard className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </motion.button>

                  {/* Info Notice */}
                  <div className="flex items-start gap-3 p-4 bg-[#3d9a8b]/5 border-l-4 border-[#3d9a8b]">
                    <Shield className="w-5 h-5 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                    <p className="text-[#1a3a5c]/70 text-sm font-medium">
                      Este registro será validado por TAMEFOR. Conserve su comprobante original hasta que el pago sea confirmado.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Stats Section ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-20">
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <AnimatedStat icon={GraduationCap} value={300} suffix="+" label="Inscritos" delay={0} />
            <AnimatedStat icon={Shield} value={100} suffix="%" label="Pagos Seguros" delay={0.1} />
            <AnimatedStat icon={Clock} value={48} suffix="h" label="Confirmación" delay={0.2} />
            <AnimatedStat icon={FileText} value={5} suffix="+" label="Cursos Disponibles" delay={0.3} />
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
              <span className="text-white/80 font-semibold uppercase tracking-wider text-sm">TAMEFOR Ecuador</span>
              <div className="w-8 h-1 bg-white/40" />
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              ¿Necesitas Ayuda con tu Pago?
            </motion.h2>

            <motion.p
              className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Si tienes dudas sobre el proceso de pago o necesitas asistencia, nuestro equipo está listo para ayudarte.
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
                  Contáctanos
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
                  Ver Cursos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Success Modal ═══ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white max-w-md w-full shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
          >
            {/* Top accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#3d9a8b] via-[#5bc4b1] to-[#3d9a8b]" />

            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] flex items-center justify-center shadow-lg shadow-[#3d9a8b]/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <Check className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-sans text-2xl text-[#1a3a5c] font-bold">¡Pago Registrado!</h3>
                  <p className="text-[#3d9a8b] text-sm font-semibold">Gracias por tu confianza</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-[#1a3a5c]/70 text-base leading-relaxed">
                  Tu pago está siendo procesado y revisado por nuestro equipo.
                </p>
                <p className="text-[#1a3a5c]/70 text-base leading-relaxed">
                  Recibirás un correo en <strong className="text-[#1a3a5c]">{email}</strong> para confirmar tu inscripción.
                </p>
              </div>

              <motion.button
                onClick={resetForm}
                className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-white
                           bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                           shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                           transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Aceptar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
}
