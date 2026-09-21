'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { MapPin, Mail, Phone, Clock, ArrowRight, Check, Send, MessageSquare, Building2, Globe, Shield, Users, Headphones, ChevronRight, Layers } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionHeader } from "@/components/ui"
import { containerVariants, itemVariants } from "@/lib/animations"
import { validateForm, validationSchemas, getFieldError, type ValidationError } from "@/lib/formValidation"
import { createMensajeContacto } from "@/lib/api/mensajes"

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

/* ─── Contact Info Card (auto-rotating) ─── */
const contactItems = [
  {
    icon: MapPin,
    title: "Nuestra Oficina",
    content: "Cdla. El Guayacán, Mz C5, villa 6 y 7 III Etapa, Quevedo, Los Ríos 120501, Ecuador",
    href: null,
    detail: "Sede principal"
  },
  {
    icon: Mail,
    title: "Correo Electrónico",
    content: "info@tamefor.com",
    href: "mailto:info@tamefor.com",
    detail: "Respuesta en 24-48h"
  },
  {
    icon: Phone,
    title: "Teléfono",
    content: "+593 969934651",
    href: "tel:+593969934651",
    detail: "WhatsApp disponible"
  },
  {
    icon: Clock,
    title: "Horario de Atención",
    content: "Lunes - Viernes: 9:00 - 18:00",
    href: null,
    detail: "Sábado: 9:00 - 13:00"
  }
]

function ContactInfoCard({
  item,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  item: typeof contactItems[0]
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
                {item.title}
              </span>
              <div className={`text-2xl font-black tabular-nums transition-colors duration-500 ${
                isActive ? 'text-white/30' : 'text-[#1a3a5c]/15'
              }`}>
                0{index + 1}
              </div>
            </div>
          </div>

          {item.href ? (
            <a href={item.href} className={`text-base font-medium block mb-2 transition-colors duration-500 ${
              isActive ? 'text-white hover:text-[#5bc4b1]' : 'text-[#1a3a5c] hover:text-[#3d9a8b]'
            }`}>
              {item.content}
            </a>
          ) : (
            <p className={`text-base font-medium mb-2 transition-colors duration-500 ${
              isActive ? 'text-white' : 'text-[#1a3a5c]'
            }`}>
              {item.content}
            </p>
          )}

          <p className={`text-sm transition-colors duration-500 ${
            isActive ? 'text-white/60' : 'text-[#1a3a5c]/50'
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

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export function ContactoPageClient() {
  const [activeCard, setActiveCard] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionInView = useRef(false)
  const [showModal, setShowModal] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  })

  /* Auto-rotate cards */
  useEffect(() => {
    if (isPaused || !sectionInView.current) return
    const timer = setTimeout(() => {
      setActiveCard((prev) => (prev + 1) % contactItems.length)
    }, AUTO_ROTATE_MS)
    return () => clearTimeout(timer)
  }, [activeCard, isPaused])

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

  const handleCardHover = useCallback((i: number) => {
    setIsPaused(true)
    setActiveCard(i)
  }, [])

  const handleCardLeave = useCallback(() => {
    setIsPaused(false)
  }, [])

  /* Form handlers */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateForm(formData, {
      nombre: validationSchemas.contacto.nombre,
      email: validationSchemas.contacto.email,
      telefono: validationSchemas.contacto.telefono,
      mensaje: validationSchemas.contacto.mensaje,
    })

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)
    setErrors([])

    try {
      const mensaje = await createMensajeContacto({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        asunto: formData.asunto || 'Consulta General',
        mensaje: formData.mensaje,
        tipoConsulta: 'Formulario de Contacto',
      })

      if (mensaje) {
        setShowModal(true)
      } else {
        setErrors([{ field: 'general', message: 'Error al enviar el mensaje. Intente nuevamente.' }])
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setErrors([{ field: 'general', message: 'Error al enviar el mensaje. Intente nuevamente.' }])
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })
    setErrors([])
    setIsSubmitting(false)
    setShowModal(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors.length > 0) {
      setErrors(errors.filter(e => e.field !== field))
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ═══ Hero ═══ */}
      <PageHeader
        badge="Contáctanos"
        title="Estamos Aquí Para"
        titleHighlight="Ayudarte"
        subtitle="Estamos comprometidos con la excelencia en nuestro servicio. Ponte en contacto con nosotros para recibir información detallada sobre nuestros programas y servicios."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
      />

      {/* ═══ Contact Info Cards Section ═══ */}
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
            icon={MessageSquare}
            subtitle="Información de Contacto"
            title="Nuestros Canales de"
            titleHighlight="Comunicación"
            description="Múltiples formas de contactarnos para brindarte la mejor atención"
            centered
          />

          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {contactItems.map((item, index) => (
              <ContactInfoCard
                key={index}
                item={item}
                index={index}
                isActive={activeCard === index}
                onHover={() => handleCardHover(index)}
                onLeave={handleCardLeave}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Form Section (dark bg) ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-24">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />
        <motion.div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px]" />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={Send}
            subtitle="Formulario de Contacto"
            title="Envíanos un"
            titleHighlight="Mensaje"
            description="Completa el formulario y nuestro equipo se pondrá en contacto contigo en las próximas 24-48 horas"
            centered
            dark
          />

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 mt-14">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10">
                {/* Top accent line */}
                <div className="h-1 w-full bg-gradient-to-r from-[#3d9a8b] via-[#5bc4b1] to-[#3d9a8b] mb-8" />

                <form onSubmit={handleSubmit} className="space-y-6">
                  {getFieldError(errors, 'general') && (
                    <div className="bg-red-500/10 border border-red-500/30 p-4">
                      <p className="text-red-400 font-medium text-sm">{getFieldError(errors, 'general')}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 font-semibold mb-2 text-sm uppercase tracking-wider">
                        Nombre completo <span className="text-[#3d9a8b]">*</span>
                      </label>
                      <input
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        placeholder="Juan Pérez"
                        disabled={isSubmitting}
                        className={`w-full h-12 px-4 bg-white/5 border-2 text-white placeholder-white/30 focus:outline-none transition-colors duration-300 ${
                          getFieldError(errors, 'nombre')
                            ? 'border-red-500/60 focus:border-red-500'
                            : 'border-white/10 focus:border-[#3d9a8b]'
                        } disabled:opacity-50`}
                      />
                      {getFieldError(errors, 'nombre') && (
                        <p className="text-red-400 text-xs mt-1">{getFieldError(errors, 'nombre')}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white/80 font-semibold mb-2 text-sm uppercase tracking-wider">
                        Correo electrónico <span className="text-[#3d9a8b]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="juan@ejemplo.com"
                        disabled={isSubmitting}
                        className={`w-full h-12 px-4 bg-white/5 border-2 text-white placeholder-white/30 focus:outline-none transition-colors duration-300 ${
                          getFieldError(errors, 'email')
                            ? 'border-red-500/60 focus:border-red-500'
                            : 'border-white/10 focus:border-[#3d9a8b]'
                        } disabled:opacity-50`}
                      />
                      {getFieldError(errors, 'email') && (
                        <p className="text-red-400 text-xs mt-1">{getFieldError(errors, 'email')}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 font-semibold mb-2 text-sm uppercase tracking-wider">Teléfono</label>
                      <input
                        value={formData.telefono}
                        onChange={(e) => handleInputChange('telefono', e.target.value)}
                        placeholder="+593 999 999 999"
                        disabled={isSubmitting}
                        className={`w-full h-12 px-4 bg-white/5 border-2 text-white placeholder-white/30 focus:outline-none transition-colors duration-300 ${
                          getFieldError(errors, 'telefono')
                            ? 'border-red-500/60 focus:border-red-500'
                            : 'border-white/10 focus:border-[#3d9a8b]'
                        } disabled:opacity-50`}
                      />
                      {getFieldError(errors, 'telefono') && (
                        <p className="text-red-400 text-xs mt-1">{getFieldError(errors, 'telefono')}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white/80 font-semibold mb-2 text-sm uppercase tracking-wider">Asunto</label>
                      <input
                        value={formData.asunto}
                        onChange={(e) => handleInputChange('asunto', e.target.value)}
                        placeholder="Motivo de consulta"
                        disabled={isSubmitting}
                        className="w-full h-12 px-4 bg-white/5 border-2 border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#3d9a8b] transition-colors duration-300 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 font-semibold mb-2 text-sm uppercase tracking-wider">
                      Mensaje <span className="text-[#3d9a8b]">*</span>
                    </label>
                    <textarea
                      value={formData.mensaje}
                      onChange={(e) => handleInputChange('mensaje', e.target.value)}
                      placeholder="Escriba su mensaje..."
                      rows={5}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 bg-white/5 border-2 text-white placeholder-white/30 focus:outline-none resize-none transition-colors duration-300 ${
                        getFieldError(errors, 'mensaje')
                          ? 'border-red-500/60 focus:border-red-500'
                          : 'border-white/10 focus:border-[#3d9a8b]'
                      } disabled:opacity-50`}
                    />
                    {getFieldError(errors, 'mensaje') && (
                      <p className="text-red-400 text-xs mt-1">{getFieldError(errors, 'mensaje')}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-white
                               bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                               shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                               transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar Info */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Why Contact Us */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center">
                    <Headphones className="h-5 w-5 text-[#3d9a8b]" />
                  </div>
                  <h3 className="text-white font-bold text-xl">¿Por qué contactarnos?</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Shield, text: 'Asesoría profesional certificada' },
                    { icon: Clock, text: 'Respuesta en menos de 48 horas' },
                    { icon: Users, text: 'Equipo multidisciplinario experto' },
                    { icon: Globe, text: 'Cobertura a nivel nacional' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="w-8 h-8 border border-[#3d9a8b]/50 bg-[#3d9a8b]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-[#3d9a8b]" />
                      </div>
                      <span className="text-white/80 text-sm font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Direct Contact Card */}
              <div className="bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl">Contacto Directo</h3>
                </div>

                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  ¿Prefieres hablar directamente? Llámanos o escríbenos por WhatsApp.
                </p>

                <div className="space-y-3">
                  <a
                    href="tel:+593969934651"
                    className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-white" />
                    <span className="text-white font-medium text-sm">+593 969934651</span>
                  </a>
                  <a
                    href="mailto:info@tamefor.com"
                    className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Mail className="h-4 w-4 text-white" />
                    <span className="text-white font-medium text-sm">info@tamefor.com</span>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-2">Horario</p>
                  <p className="text-white text-sm font-medium">Lun - Vie: 9:00 - 18:00</p>
                  <p className="text-white/70 text-sm">Sáb: 9:00 - 13:00</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Stats Section ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-20 border-t border-white/5">
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <AnimatedStat icon={Users} value={500} suffix="+" label="Clientes Atendidos" delay={0} />
            <AnimatedStat icon={Headphones} value={24} suffix="h" label="Tiempo de Respuesta" delay={0.1} />
            <AnimatedStat icon={Shield} value={10} suffix="+" label="Años de Experiencia" delay={0.2} />
            <AnimatedStat icon={Globe} value={15} suffix="+" label="Provincias de Cobertura" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ═══ Services Quick Links ═══ */}
      <section className="section-padding bg-[#f8fafb] relative overflow-hidden">
        <div className="container-max relative z-10">
          <SectionHeader
            icon={Layers}
            subtitle="Nuestros Servicios"
            title="¿En qué podemos"
            titleHighlight="ayudarte?"
            description="Explora nuestras áreas de especialización para encontrar la solución que necesitas"
            centered
          />

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {[
              { icon: Building2, title: 'Consultoría Técnica', desc: 'Asesoría especializada en gestión forestal y ambiental para empresas e instituciones.', href: '/servicios' },
              { icon: Users, title: 'Capacitación Profesional', desc: 'Cursos certificados por SENECYT para profesionales del sector forestal y ambiental.', href: '/cursos' },
              { icon: Globe, title: 'Proyectos Ambientales', desc: 'Desarrollo y ejecución de proyectos de conservación y gestión sostenible.', href: '/proyectos' },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <div className="group relative overflow-hidden bg-white border border-[#1a3a5c]/10 hover:shadow-xl transition-all duration-500 p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-[#3d9a8b]/10 group-hover:bg-[#3d9a8b] flex items-center justify-center transition-colors duration-500">
                        <service.icon className="w-7 h-7 text-[#3d9a8b] group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="text-[#1a3a5c] font-bold text-lg group-hover:text-[#3d9a8b] transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-[#1a3a5c]/60 text-sm leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d9a8b] group-hover:gap-3 transition-all duration-300">
                      Ver más
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>

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
              <span className="text-white/80 font-semibold uppercase tracking-wider text-sm">TAMEFOR Ecuador</span>
              <div className="w-8 h-1 bg-white/40" />
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Soluciones Forestales a Tu Alcance
            </motion.h2>

            <motion.p
              className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Nuestro equipo de expertos está listo para ayudarte con cualquier proyecto forestal o ambiental.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link href="/servicios">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-[#1a3a5c]
                             bg-white shadow-lg shadow-black/10
                             hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Ver Servicios
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
              <Link href="/nosotros">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                             border-2 border-white/30 hover:border-white hover:bg-white/10
                             transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Conoce Más
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
                  <h3 className="font-sans text-2xl text-[#1a3a5c] font-bold">¡Mensaje Enviado!</h3>
                  <p className="text-[#3d9a8b] text-sm font-semibold">Gracias por contactarnos</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-[#1a3a5c]/70 text-base leading-relaxed">
                  Hemos recibido tu mensaje exitosamente. Nuestro equipo te responderá en un plazo de <strong className="text-[#1a3a5c]">24-48 horas hábiles</strong>.
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
