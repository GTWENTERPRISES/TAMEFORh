"use client"

import { useState } from "react"
import { ArrowRight, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { validateForm, validationSchemas, getFieldError, type ValidationError } from "@/lib/formValidation"
import { createSolicitudInformacion } from "@/lib/api/solicitudes"

interface ServiceConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  serviceName: string
}

export function ServiceConsultationModal({ isOpen, onClose, serviceName }: ServiceConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    mensaje: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpiar error del campo al escribir
    if (errors.length > 0) {
      setErrors(errors.filter(err => err.field !== name))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar formulario
    const validation = validateForm(formData, validationSchemas.consultoria)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }
    
    // Enviar a API
    setIsSubmitting(true)
    setErrors([])
    
    try {
      const solicitud = await createSolicitudInformacion({
        nombre: formData.nombre,
        email: formData.email,
        empresa: formData.empresa,
        telefono: formData.telefono,
        tipoSolicitud: `Consultoría de Servicios - ${serviceName}`,
        mensaje: formData.mensaje,
      })
      
      if (solicitud) {
        setSubmitted(true)
      } else {
        setErrors([{ field: 'general', message: 'Error al enviar la solicitud. Intente nuevamente.' }])
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error)
      setErrors([{ field: 'general', message: 'Error al enviar la solicitud. Intente nuevamente.' }])
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setSubmitted(false)
    setIsSubmitting(false)
    setErrors([])
    setFormData({
      nombre: "",
      email: "",
      empresa: "",
      telefono: "",
      mensaje: ""
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 border-0 bg-white">
        {/* Close Button */}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-5 w-5 text-[#1a3a5c]" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a3a5c] to-[#0f2a45] p-8 text-center">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-white">
              {submitted ? "¡Consulta Enviada!" : "Solicitar Consultoría"}
            </DialogTitle>
            <DialogDescription className="text-white/80 mt-2 text-lg">
              {serviceName}
            </DialogDescription>
          </DialogHeader>
        </div>

        {submitted ? (
          /* Success View */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#3d9a8b] mx-auto flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <p className="text-[#1a3a5c]/80 text-base mb-2">
              Gracias por tu consulta. Hemos recibido tu solicitud exitosamente.
            </p>
            <p className="text-[#1a3a5c]/80 text-base mb-8">
              Nos pondremos en contacto contigo a la brevedad posible.
            </p>
            <Button
              onClick={handleClose}
              className="w-full bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white rounded-none py-4 font-semibold text-base transition-all duration-300 shadow-none border-2 border-[#1a3a5c] hover:border-[#3d9a8b]"
            >
              Aceptar
            </Button>
          </div>
        ) : (
          /* Form */
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error general */}
              {getFieldError(errors, 'general') && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-700 font-medium">{getFieldError(errors, 'general')}</p>
                </div>
              )}
              
              <div>
                <label className="block text-[#1a3a5c] font-semibold mb-2">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <Input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre completo"
                  disabled={isSubmitting}
                  className={`w-full bg-white !bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:ring-0 focus:outline-none ${
                    getFieldError(errors, 'nombre')
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#1a3a5c]/30 focus:border-[#3d9a8b]'
                  }`}
                />
                {getFieldError(errors, 'nombre') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'nombre')}</p>
                )}
              </div>
              
              <div>
                <label className="block text-[#1a3a5c] font-semibold mb-2">
                  Correo electrónico <span className="text-red-500">*</span>
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  disabled={isSubmitting}
                  className={`w-full bg-white !bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:ring-0 focus:outline-none ${
                    getFieldError(errors, 'email')
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#1a3a5c]/30 focus:border-[#3d9a8b]'
                  }`}
                />
                {getFieldError(errors, 'email') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'email')}</p>
                )}
              </div>
              
              <div>
                <label className="block text-[#1a3a5c] font-semibold mb-2">
                  Empresa <span className="text-red-500">*</span>
                </label>
                <Input
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  placeholder="Nombre de su empresa"
                  disabled={isSubmitting}
                  className={`w-full bg-white !bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:ring-0 focus:outline-none ${
                    getFieldError(errors, 'empresa')
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#1a3a5c]/30 focus:border-[#3d9a8b]'
                  }`}
                />
                {getFieldError(errors, 'empresa') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'empresa')}</p>
                )}
              </div>
              
              <div>
                <label className="block text-[#1a3a5c] font-semibold mb-2">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <Input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+593 999 999 999"
                  disabled={isSubmitting}
                  className={`w-full bg-white !bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:ring-0 focus:outline-none ${
                    getFieldError(errors, 'telefono')
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#1a3a5c]/30 focus:border-[#3d9a8b]'
                  }`}
                />
                {getFieldError(errors, 'telefono') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'telefono')}</p>
                )}
              </div>
              
              <div>
                <label className="block text-[#1a3a5c] font-semibold mb-2">
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto o consulta (mínimo 20 caracteres)"
                  rows={5}
                  disabled={isSubmitting}
                  className={`w-full bg-white !bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium rounded-none border-2 focus:ring-0 focus:outline-none resize-none ${
                    getFieldError(errors, 'mensaje')
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#1a3a5c]/30 focus:border-[#3d9a8b]'
                  }`}
                />
                {getFieldError(errors, 'mensaje') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError(errors, 'mensaje')}</p>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white rounded-none py-4 font-semibold text-base transition-all duration-300 shadow-none border-2 border-[#1a3a5c] hover:border-[#3d9a8b] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
                {!isSubmitting && <ArrowRight className="ml-3 h-4 w-4" />}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
