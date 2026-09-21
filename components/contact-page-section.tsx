"use client"

import { MapPin, Mail, Phone, Clock, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useState } from "react"
import { validateForm, validationSchemas, getFieldError, type ValidationError } from "@/lib/formValidation"
import { createMensajeContacto } from "@/lib/api/mensajes"
import { containerVariants, itemVariants } from "@/lib/animations"

export function ContactPageSection() {
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

  const contactItems = [
    {
      icon: MapPin,
      title: "Dirección",
      content: "Cdla. El Guayacán, Mz C5, villa 6 y 7 III Etapa, Quevedo, Los Ríos 120501, Ecuador",
      href: null
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@tamefor.com",
      href: "mailto:info@tamefor.com"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+593 969934651",
      href: "tel:+593969934651"
    },
    {
      icon: Clock,
      title: "Horario de Atención",
      content: "Lunes - Viernes: 9:00 - 18:00 | Sábado: 9:00 - 13:00",
      href: null
    }
  ]

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
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    })
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
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#3d9a8b]"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                    <item.icon className="h-5 w-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-[#1a3a5c] mb-2 text-base">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-[#1a3a5c]/70 hover:text-[#3d9a8b] transition-colors text-sm font-medium">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-[#1a3a5c]/70 text-sm leading-relaxed">{item.content}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2 bg-white p-8 md:p-10 shadow-lg border-l-4 border-[#3d9a8b]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-3xl font-sans font-bold text-[#1a3a5c] mb-3">
                Envíanos un Mensaje
              </h3>
              <p className="text-[#1a3a5c]/70 text-base">
                Completa el formulario y nos pondremos en contacto contigo pronto
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {getFieldError(errors, 'general') && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-700 font-medium text-sm">{getFieldError(errors, 'general')}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1a3a5c] font-semibold mb-2 text-sm">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    placeholder="Juan Pérez"
                    className={`h-12 border-2 ${
                      getFieldError(errors, 'nombre')
                        ? 'border-red-500'
                        : 'border-[#3d9a8b]/30'
                    } focus:border-[#3d9a8b]`}
                    disabled={isSubmitting}
                  />
                  {getFieldError(errors, 'nombre') && (
                    <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'nombre')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[#1a3a5c] font-semibold mb-2 text-sm">
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="juan@ejemplo.com"
                    className={`h-12 border-2 ${
                      getFieldError(errors, 'email')
                        ? 'border-red-500'
                        : 'border-[#3d9a8b]/30'
                    } focus:border-[#3d9a8b]`}
                    disabled={isSubmitting}
                  />
                  {getFieldError(errors, 'email') && (
                    <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'email')}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1a3a5c] font-semibold mb-2 text-sm">Teléfono</label>
                  <Input
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    placeholder="+593 999 999 999"
                    className={`h-12 border-2 ${
                      getFieldError(errors, 'telefono')
                        ? 'border-red-500'
                        : 'border-[#3d9a8b]/30'
                    } focus:border-[#3d9a8b]`}
                    disabled={isSubmitting}
                  />
                  {getFieldError(errors, 'telefono') && (
                    <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'telefono')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[#1a3a5c] font-semibold mb-2 text-sm">Asunto</label>
                  <Input
                    value={formData.asunto}
                    onChange={(e) => handleInputChange('asunto', e.target.value)}
                    placeholder="Motivo de consulta"
                    className="h-12 border-2 border-[#3d9a8b]/30 focus:border-[#3d9a8b]"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#1a3a5c] font-semibold mb-2 text-sm">
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={formData.mensaje}
                  onChange={(e) => handleInputChange('mensaje', e.target.value)}
                  placeholder="Escriba su mensaje..."
                  rows={5}
                  className={`border-2 ${
                    getFieldError(errors, 'mensaje')
                      ? 'border-red-500'
                      : 'border-[#3d9a8b]/30'
                  } focus:border-[#3d9a8b] resize-none`}
                  disabled={isSubmitting}
                />
                {getFieldError(errors, 'mensaje') && (
                  <p className="text-red-500 text-xs mt-1">{getFieldError(errors, 'mensaje')}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-white
                           bg-gradient-to-r from-[#1a3a5c] to-[#0f2a45]
                           shadow-lg shadow-[#1a3a5c]/25 hover:shadow-[#3d9a8b]/50
                           transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white max-w-md w-full border-l-4 border-[#3d9a8b] shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#3d9a8b] flex items-center justify-center border-t-2 border-[#1a3a5c]">
                  <Check className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-sans text-2xl text-[#1a3a5c] font-bold">¡Mensaje Enviado!</h3>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-[#1a3a5c]/80 text-base leading-relaxed">
                  Gracias por contactarnos. Hemos recibido tu mensaje exitosamente.
                </p>
                <p className="text-[#1a3a5c]/80 text-base leading-relaxed">
                  Nuestro equipo te responderá en un plazo de 24-48 horas hábiles.
                </p>
              </div>

              <motion.button
                onClick={resetForm}
                className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-white text-lg
                           bg-gradient-to-r from-[#1a3a5c] to-[#0f2a45]
                           shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Aceptar
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
