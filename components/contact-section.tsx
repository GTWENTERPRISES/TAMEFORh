"use client"

import { MapPin, Mail, Phone, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useState } from "react"
import { validateForm, validationSchemas, getFieldError, type ValidationError } from "@/lib/formValidation"
import { createMensajeContacto } from "@/lib/api/mensajes"

export function ContactSection() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

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
      content: "+593 96 226 5426",
      href: "tel:+593962265426"
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
    
    // Validar formulario
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
    
    // Enviar a API
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
    // Limpiar errores al escribir
    if (errors.length > 0) {
      setErrors(errors.filter(e => e.field !== field))
    }
  }

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-[2px] bg-[#3d9a8b]" />
            <span className="text-[#3d9a8b] font-semibold uppercase tracking-[0.2em] text-sm">Información de Contacto</span>
            <div className="w-12 h-[2px] bg-[#3d9a8b]" />
          </div>
          <h2 className="font-sans text-4xl md:text-5xl text-[#1a3a5c] leading-tight font-bold mb-6">
            Conecta<br />
            <span className="text-[#3d9a8b]">Con Nosotros</span>
          </h2>
          <div className="w-24 h-1 bg-[#3d9a8b] mx-auto mb-6" />
          <p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg">
            Estamos listos para atender tus consultas y brindarte la información que necesites sobre nuestros servicios profesionales
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <motion.div 
            className="lg:col-span-1 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {contactItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-start gap-6 bg-white p-6 border-l-4 border-[#3d9a8b]"
                variants={itemVariants}
              >
                <div className="w-16 h-16 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 border-t-4 border-[#3d9a8b]">
                  <item.icon className="h-7 w-7 text-[#3d9a8b]" />
                </div>
                <div className="pt-2">
                  <h3 className="font-sans font-bold text-[#1a3a5c] mb-3 text-lg">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-[#1a3a5c]/80 hover:text-[#3d9a8b] transition-colors font-medium">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-[#1a3a5c]/80 font-medium">{item.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="lg:col-span-2 bg-white p-10 border-l-4 border-[#3d9a8b]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-sans font-bold text-[#1a3a5c] mb-8">
              Enviar Mensaje
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error general */}
              {getFieldError(errors, 'general') && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-700 font-medium">{getFieldError(errors, 'general')}</p>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#1a3a5c] font-semibold mb-3">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    placeholder="Ingrese su nombre completo" 
                    className={`w-full bg-white !bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:ring-0 focus:outline-none ${
                      getFieldError(errors, 'nombre') 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[#3d9a8b]/30 focus:border-[#3d9a8b]'
                    }`}
                    disabled={isSubmitting}
                  />
                  {getFieldError(errors, 'nombre') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'nombre')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[#1a3a5c] font-semibold mb-3">
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="correo@ejemplo.com" 
                    className={`w-full bg-white !bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:ring-0 focus:outline-none ${
                      getFieldError(errors, 'email') 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-[#3d9a8b]/30 focus:border-[#3d9a8b]'
                    }`}
                    disabled={isSubmitting}
                  />
                  {getFieldError(errors, 'email') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'email')}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[#1a3a5c] font-semibold mb-3">Teléfono</label>
                <Input 
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  placeholder="+593 999 999 999 o 0999999999" 
                  className={`w-full bg-white !bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:ring-0 focus:outline-none ${
                    getFieldError(errors, 'telefono') 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-[#3d9a8b]/30 focus:border-[#3d9a8b]'
                  }`}
                  disabled={isSubmitting}
                />
                {getFieldError(errors, 'telefono') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'telefono')}</p>
                )}
              </div>
              <div>
                <label className="block text-[#1a3a5c] font-semibold mb-3">Asunto</label>
                <Input 
                  value={formData.asunto}
                  onChange={(e) => handleInputChange('asunto', e.target.value)}
                  placeholder="Ingrese el asunto de su consulta" 
                  className="w-full bg-white !bg-white border-[#3d9a8b]/30 text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:border-[#3d9a8b] focus:ring-0 focus:outline-none" 
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-[#1a3a5c] font-semibold mb-3">
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  value={formData.mensaje}
                  onChange={(e) => handleInputChange('mensaje', e.target.value)}
                  placeholder="Escriba su mensaje detalladamente (mínimo 10 caracteres)" 
                  rows={5} 
                  className={`w-full bg-white !bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium rounded-none border-2 focus:ring-0 focus:outline-none resize-none ${
                    getFieldError(errors, 'mensaje') 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-[#3d9a8b]/30 focus:border-[#3d9a8b]'
                  }`}
                  disabled={isSubmitting}
                />
                {getFieldError(errors, 'mensaje') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'mensaje')}</p>
                )}
              </div>
              <motion.div
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white rounded-none py-4 font-semibold text-base transition-all duration-300 shadow-none border-2 border-[#1a3a5c] hover:border-[#3d9a8b] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  {!isSubmitting && <ArrowRight className="ml-3 h-4 w-4" />}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-8 border-l-4 border-[#3d9a8b]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#3d9a8b] flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white rotate-[-90deg]" />
              </div>
              <div>
                <h3 className="font-sans text-2xl text-[#1a3a5c] font-bold">¡Mensaje Enviado!</h3>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[#1a3a5c]/80 text-base">
              Gracias por contactarnos. Su mensaje ha sido recibido exitosamente.</p>
              <p className="text-[#1a3a5c]/80 text-base">
                Nos pondremos en contacto con usted a la brevedad posible.
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
    </section>
  )
}
