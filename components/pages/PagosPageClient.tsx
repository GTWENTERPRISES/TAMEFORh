'use client'

import { CreditCard, Upload, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { coursesData } from "@/lib/coursesData"


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}



const getLevelsForCourse = (totalLevels: number) => {
  const allLevels = [
    { id: '1', title: 'Nivel I' },
    { id: '2', title: 'Nivel II' },
    { id: '3', title: 'Nivel III' },
  ]
  return allLevels.slice(0, totalLevels)
}

export function PagosPageClient() {
  const [selected, setSelected] = useState<{ courseId: string; levels: string[] } | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [email, setEmail] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [idNumber, setIdNumber] = useState('')
  const [receiptNumber, setReceiptNumber] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setErrors(prev => ({ ...prev, file: '' }))
    }
  }

  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  }

  const selectedCourse = selected !== null ? coursesData.find(c => c.id === selected.courseId) : null
  
  const calculatePricing = () => {
    if (!selectedCourse || !selected || selected.levels.length === 0) {
      return {
        subtotal: 0,
        discount: 0,
        total: 0,
        hasDiscount: false
      }
    }

    const pricePerLevel = selectedCourse.price.basePerLevel
    const numLevels = selected.levels.length
    const subtotal = pricePerLevel * numLevels

    // Aplicar 20% de descuento si selecciona los 3 niveles
    const hasDiscount = numLevels === 3
    const discount = hasDiscount ? subtotal * 0.20 : 0
    const total = subtotal - discount

    return {
      subtotal,
      discount,
      total,
      hasDiscount
    }
  }

  const pricing = calculatePricing()
  const amountToPay = pricing.total.toFixed(2)

  const toggleLevel = (courseId: string, level: string) => {
    setSelected(prev => {
      if (!prev || prev.courseId !== courseId) {
        // Nuevo curso seleccionado
        return { courseId, levels: [level] }
      }

      // Mismo curso - toggle nivel
      const levelIndex = prev.levels.indexOf(level)
      if (levelIndex > -1) {
        // Quitar nivel
        const newLevels = prev.levels.filter(l => l !== level)
        if (newLevels.length === 0) {
          return null
        }
        return { courseId, levels: newLevels }
      } else {
        // Agregar nivel
        return { courseId, levels: [...prev.levels, level].sort() }
      }
    })
    setErrors(prev => ({ ...prev, course: '' }))
  }

  const isLevelSelected = (courseId: string, level: string) => {
    return selected?.courseId === courseId && selected.levels.includes(level)
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

    if (Object.values(newErrors).some(Boolean)) {
      return
    }

    // Aquí iría la lógica para enviar los datos al servidor
    console.log('Datos del formulario:', {
      selectedCourse,
      selected,
      idNumber,
      email,
      receiptNumber,
      selectedFile
    })

    setShowModal(true)
  }

  const resetForm = () => {
    setSelected(null)
    setIdNumber('')
    setEmail('')
    setReceiptNumber('')
    setSelectedFile(null)
    setErrors({})
    setShowModal(false)
  }

  // Verifica si el curso tiene niveles (subtitle contiene "Nivel")
  const courseHasLevels = (course: any) => {
    return course.subtitle?.includes("Nivel") || false
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070"
            alt="Pagos"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a5c]/95 via-[#1a3a5c]/80 to-[#1a3a5c]/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-white font-semibold uppercase tracking-wider text-sm">Sistema de Pagos</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Pagos y<br />
              <span className="text-[#3d9a8b]">Cursos</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Selecciona tu curso y completa el pago de forma segura
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Payment System */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">

            {/* Course Selection & Payment Info */}
            <motion.div
              className="mb-20 grid lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {/* Courses Section */}
              <motion.div className="lg:col-span-2" variants={containerVariants}>
                <motion.div className="text-center mb-12" variants={containerVariants}>
                  <motion.div className="flex items-center justify-center gap-2 mb-4" variants={itemVariants}>
                    <div className="w-8 h-1 bg-[#3d9a8b]" />
                    <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Cursos</span>
                    <div className="w-8 h-1 bg-[#3d9a8b]" />
                  </motion.div>
                  <motion.h2
                    className="font-sans text-4xl md:text-5xl text-[#1a3a5c] leading-tight font-bold mb-4"
                    variants={headerVariants}
                  >
                    Selecciona tu Curso<br />
                    <span className="text-[#3d9a8b]">(Por Nivel o Completo)</span>
                  </motion.h2>
                </motion.div>

                <motion.div className="space-y-4" variants={containerVariants}>
                  {coursesData.map((course, index) => (
                    <motion.div
                      key={course.id}
                      className={`bg-white border p-6 transition-all duration-300 border-l-4 ${
                        selected?.courseId === course.id
                          ? "border-[#3d9a8b] border-l-[#3d9a8b]"
                          : "border-[#3d9a8b]/20 border-l-[#3d9a8b] hover:border-[#3d9a8b]"
                      }`}
                      variants={itemVariants}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-sans text-lg text-[#1a3a5c] mb-1 font-bold">{course.title}</h3>
                          <p className="text-[#1a3a5c]/60 text-sm">{course.subtitle}</p>
                          <p className="text-[#1a3a5c]/50 text-xs mt-1">{course.codigoEspecialidad} • {course.cargaHoraria} horas</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-[#3d9a8b]">
                            ${course.price.regular}
                            <span className="text-xs text-[#3d9a8b]/60 block">
                              {course.price.levels > 1 ? 'curso completo' : 'curso'}
                            </span>
                          </div>
                          {course.price.levels > 1 && (
                            <div className="text-sm text-[#1a3a5c]/70 mt-1">
                              ${course.price.basePerLevel}/nivel
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {course.price.levels > 1 ? (
                        // Curso con niveles - mostrar botones para seleccionar
                        <>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[#1a3a5c]/60 text-xs font-semibold mr-1">Selecciona niveles:</span>
                            {getLevelsForCourse(course.price.levels).map((level) => {
                              const active = isLevelSelected(course.id, level.title)
                              return (
                                <button
                                  key={level.id}
                                  type="button"
                                  onClick={() => toggleLevel(course.id, level.title)}
                                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border transition-all duration-200 ${
                                    active
                                      ? "bg-[#3d9a8b] text-white border-[#3d9a8b]"
                                      : "bg-[#3d9a8b]/10 text-[#3d9a8b] border-[#3d9a8b]/30 hover:bg-[#3d9a8b]/20"
                                  }`}
                                >
                                  {active && <Check className="w-3 h-3" />}
                                  {level.title}
                                </button>
                              )
                            })}
                          </div>
                          {/* Mostrar niveles seleccionados */}
                          {selected?.courseId === course.id && selected.levels.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-[#3d9a8b]/20">
                              <p className="text-xs text-[#1a3a5c]/70 mb-1">Niveles seleccionados:</p>
                              <p className="text-sm font-semibold text-[#1a3a5c]">
                                {selected.levels.join(", ")} ({selected.levels.length} nivel{selected.levels.length > 1 ? 'es' : ''})
                              </p>
                              
                              {/* Badge de descuento cuando selecciona 3 niveles */}
                              {selected.levels.length === 3 && (
                                <div className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                  🎉 ¡20% DE DESCUENTO ACTIVADO! Ahorras $75
                                </div>
                              )}
                              
                              {/* Mensaje motivacional cuando NO tiene los 3 niveles */}
                              {selected.levels.length < 3 && (
                                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-300 rounded text-xs">
                                  <p className="text-yellow-800 font-semibold">
                                    💡 <strong>¡Completa los 3 niveles</strong> y ahorra <strong className="text-red-600">$75</strong> con el 20% de descuento!
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        // Curso completo sin niveles - botón simple de selección
                        <>
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (selected?.courseId === course.id) {
                                  setSelected(null) // Deseleccionar
                                } else {
                                  setSelected({ courseId: course.id, levels: ['Curso Completo'] })
                                }
                                setErrors(prev => ({ ...prev, course: '' }))
                              }}
                              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 border transition-all duration-200 ${
                                selected?.courseId === course.id
                                  ? "bg-[#3d9a8b] text-white border-[#3d9a8b]"
                                  : "bg-[#3d9a8b]/10 text-[#3d9a8b] border-[#3d9a8b]/30 hover:bg-[#3d9a8b]/20"
                              }`}
                            >
                              {selected?.courseId === course.id && <Check className="w-4 h-4" />}
                              Seleccionar Curso Completo
                            </button>
                          </div>
                          {selected?.courseId === course.id && (
                            <div className="mt-3 pt-3 border-t border-[#3d9a8b]/20">
                              <p className="text-sm font-semibold text-[#3d9a8b] flex items-center gap-2">
                                <Check className="w-4 h-4" />
                                Curso completo seleccionado
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Payment Info Sidebar */}
              <motion.div className="space-y-6" variants={containerVariants}>
                {/* Amount to Pay */}
                <motion.div
                  className="bg-[#3d9a8b] p-8"
                  variants={itemVariants}
                >
                  <p className="text-white/90 text-sm font-semibold mb-2 uppercase tracking-wider">Resumen de Pago</p>
                  
                  {selectedCourse && selected && selected.levels.length > 0 ? (
                    <div className="space-y-3">
                      {/* Curso y niveles */}
                      <div className="text-white/80 text-xs space-y-1 pb-3 border-b border-white/20">
                        <div className="font-semibold text-white">{selectedCourse.title}</div>
                        <div>{selected.levels.join(", ")}</div>
                      </div>

                      {/* Subtotal */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/80">
                          Subtotal ({selected.levels.length} nivel{selected.levels.length > 1 ? 'es' : ''})
                        </span>
                        <span className="text-white font-semibold">
                          ${pricing.subtotal.toFixed(2)}
                        </span>
                      </div>

                      {/* Descuento si aplica */}
                      {pricing.hasDiscount && (
                        <div className="relative">
                          {/* Badge de descuento destacado */}
                          <div className="absolute -top-2 -right-2 z-10">
                            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                              ¡AHORRA $75!
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm bg-gradient-to-r from-yellow-400 to-orange-400 -mx-4 px-4 py-3 shadow-lg">
                            <span className="text-[#1a3a5c] font-bold flex items-center gap-2">
                              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-green-600" />
                              </div>
                              🎉 Descuento Especial 20%
                            </span>
                            <span className="text-[#1a3a5c] font-black text-lg">
                              -${pricing.discount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Total */}
                      <div className="flex justify-between items-center pt-2 border-t border-white/20">
                        <span className="text-white font-bold text-sm">Total a Pagar</span>
                        <span className="text-white font-bold text-3xl">
                          ${pricing.total.toFixed(2)}
                        </span>
                      </div>

                      {/* Mensaje motivacional */}
                      {!pricing.hasDiscount && selected.levels.length < 3 && (
                        <div className="mt-3 p-3 bg-yellow-400/20 border-l-4 border-yellow-400 -mx-4">
                          <p className="text-yellow-200 text-xs font-semibold flex items-center gap-2">
                            💡 <span><strong>¡Tip!</strong> Selecciona los 3 niveles y ahorra <strong>$75</strong> con el descuento del 20%</span>
                          </p>
                        </div>
                      )}

                      {pricing.hasDiscount && (
                        <div className="mt-3 p-3 bg-green-500/20 border-l-4 border-green-400 -mx-4">
                          <p className="text-green-200 text-xs font-semibold flex items-center gap-2">
                            ✅ <span><strong>¡Excelente elección!</strong> Estás ahorrando $75 con el curso completo</span>
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl font-bold text-white">$0.00</div>
                      <div className="mt-2 text-white/70 text-xs">
                        Selecciona un curso y sus niveles
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Payment Instructions */}
                <motion.div
                  className="bg-[#1a3a5c] border-l-4 border-[#3d9a8b] p-8"
                  variants={itemVariants}
                >
                  <h3 className="font-sans text-xl text-white mb-6 font-bold">Instrucciones de pago</h3>
                  <ol className="space-y-4 text-white/90 text-sm">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#3d9a8b] flex items-center justify-center text-white text-xs font-bold">1</span>
                      <span>Realiza una transferencia bancaria a la cuenta de Banco Produbanco.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#3d9a8b] flex items-center justify-center text-white text-xs font-bold">2</span>
                      <span>Realiza la transferencia por el monto exacto indicado.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#3d9a8b] flex items-center justify-center text-white text-xs font-bold">3</span>
                      <span>Guarda el comprobante (captura o PDF) y completa el formulario de pago.</span>
                    </li>
                  </ol>
                </motion.div>

                {/* Banco Produbanco */}
                <motion.div
                  className="bg-[#1a3a5c] border-l-4 border-[#3d9a8b] p-8"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="font-sans text-xl text-white font-bold">Datos Bancarios</h3>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded">
                      <Image
                        src="/banco.jpg"
                        alt="Produbanco"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      <span className="font-bold text-[#1a3a5c] text-sm">PRODUBANCO</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-white/90">
                    <div>
                      <span className="text-white/70 text-sm">Tipo de Cuenta:</span>
                      <p className="font-semibold">Cuenta Corriente</p>
                    </div>
                    <div>
                      <span className="text-white/70 text-sm">Número de Cuenta:</span>
                      <p className="font-semibold text-lg text-yellow-400">27059122094</p>
                    </div>
                    <div>
                      <span className="text-white/70 text-sm">Titular:</span>
                      <p className="font-semibold">TAMEFOR TAPIA & MENA SOLUCIONES FORESTALES Y AMBIENTALES S.A.S. B.I.C.</p>
                    </div>
                    <div>
                      <span className="text-white/70 text-sm">RUC/Identificación:</span>
                      <p className="font-semibold">1291792017001</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <div className="bg-white p-10 border border-[#3d9a8b]/20 border-l-4 border-l-[#3d9a8b]">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-[#3d9a8b]" />
                    </div>
                    <h3 className="font-sans text-2xl text-[#1a3a5c] font-bold">Completa el Formulario de Pago</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Número de Cédula */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-3">
                        Número de Cédula *
                      </label>
                      <p className="text-[#1a3a5c]/70 text-sm mb-3">
                        Ingresa tu número de cédula de identidad.
                      </p>
                      <Input
                        value={idNumber}
                        onChange={(e) => {
                          setIdNumber(e.target.value)
                          setErrors(prev => ({ ...prev, idNumber: '' }))
                        }}
                        placeholder="Número de cédula"
                        className={`w-full !bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 rounded-none h-12 font-medium focus-visible:ring-[#3d9a8b] ${
                          errors.idNumber ? 'border-red-500' : 'border-[#3d9a8b]/20'
                        }`}
                      />
                      {errors.idNumber && (
                        <p className="mt-2 text-red-600 text-sm font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errors.idNumber}
                        </p>
                      )}
                    </div>

                    {/* Correo Electrónico */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-3">
                        Correo Electrónico *
                      </label>
                      <p className="text-[#1a3a5c]/70 text-sm mb-3">
                        Ingresa tu correo electrónico para recibir la confirmación de inscripción.
                      </p>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setErrors(prev => ({ ...prev, email: '' }))
                        }}
                        placeholder="ejemplo@correo.com"
                        className={`w-full !bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 rounded-none h-12 font-medium focus-visible:ring-[#3d9a8b] ${
                          errors.email ? 'border-red-500' : 'border-[#3d9a8b]/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-red-600 text-sm font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-3">
                        Método de pago utilizado
                      </label>
                      <div className="flex items-center gap-3 p-4 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20">
                        <div className="w-5 h-5 border-2 border-[#3d9a8b] bg-[#3d9a8b]" />
                        <span className="text-[#1a3a5c] font-semibold">Banco Produbanco</span>
                      </div>
                    </div>

                    {/* Receipt Number */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-3">
                        Número de comprobante de pago
                      </label>
                      <p className="text-[#1a3a5c]/70 text-sm mb-3">
                        Ingresa el número de comprobante, referencia o transacción de tu transferencia bancaria.
                      </p>
                      <Input
                        value={receiptNumber}
                        onChange={(e) => setReceiptNumber(e.target.value)}
                        placeholder="Referencia / número de transacción"
                        className="w-full !bg-white border-[#3d9a8b]/20 text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 rounded-none h-12 font-medium focus-visible:ring-[#3d9a8b]"
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-3">
                        Comprobante de pago (captura o PDF)
                      </label>
                      <p className="text-[#1a3a5c]/70 text-sm mb-3">
                        Sube una imagen o PDF del comprobante de pago de tu transferencia bancaria para verificar el pago.
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <div
                        onClick={handleFileUploadClick}
                        className={`border-2 border-dashed p-8 text-center hover:border-[#3d9a8b] transition-colors cursor-pointer ${
                          errors.file ? 'border-red-500' : 'border-[#3d9a8b]/30'
                        }`}
                      >
                        {selectedFile ? (
                          <>
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <div className="w-10 h-10 bg-[#3d9a8b]/10 flex items-center justify-center">
                                <Check className="w-6 h-6 text-[#3d9a8b]" />
                              </div>
                            </div>
                            <p className="text-[#1a3a5c] font-semibold mb-1">{selectedFile.name}</p>
                            <p className="text-[#1a3a5c]/70 text-sm">
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
                            <Upload className="w-8 h-8 text-[#3d9a8b] mx-auto mb-3" />
                            <p className="text-[#1a3a5c] font-semibold mb-1">Subir archivo</p>
                            <p className="text-[#1a3a5c]/70 text-sm">
                              Formatos permitidos: JPG, PNG, PDF. Tamaño máximo recomendado 5MB.
                            </p>
                          </>
                        )}
                      </div>
                      {errors.file && (
                        <p className="mt-2 text-red-600 text-sm font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errors.file}
                        </p>
                      )}
                    </div>

                    {/* Error de selección de curso */}
                    {errors.course && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-red-700 text-sm font-medium">{errors.course}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button className="w-full bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white py-3 font-bold text-lg transition-all duration-300 border-2 border-[#1a3a5c] hover:border-[#3d9a8b]">
                      Registrar pago
                    </Button>

                    {/* Info Message */}
                    <div className="flex items-start gap-3 p-4 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b]">
                      <AlertCircle className="w-5 h-5 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                      <p className="text-[#1a3a5c] text-sm font-medium">
                        Este registro será validado por TAMEFOR. Conserve su comprobante original hasta que el pago sea confirmado.
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-8 border-l-4 border-[#3d9a8b]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#3d9a8b] flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-sans text-2xl text-[#1a3a5c] font-bold">¡Gracias!</h3>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[#1a3a5c]/80 text-base">
                Su pago está siendo procesado y revisado.
              </p>
              <p className="text-[#1a3a5c]/80 text-base">
                Recibirá un correo en <span className="font-semibold text-[#1a3a5c]">{email}</span> para confirmar su inscripción.
              </p>
            </div>
            <div className="mt-8">
              <Button
                onClick={resetForm}
                className="w-full bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white py-3 font-bold text-lg transition-all duration-300 border-2 border-[#1a3a5c] hover:border-[#3d9a8b]"
              >
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
