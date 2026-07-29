"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail, Check } from "lucide-react"
import Image from "next/image"
import { validateForm, validationSchemas, getFieldError, type ValidationError } from "@/lib/formValidation"
import { createMensajeContacto } from "@/lib/api/mensajes"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar email
    const validation = validateForm({ email }, validationSchemas.newsletter)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }
    
    // Enviar a API
    setIsSubmitting(true)
    setErrors([])
    
    try {
      const mensaje = await createMensajeContacto({
        nombre: 'Suscriptor Newsletter',
        email: email,
        asunto: 'Suscripción al Newsletter',
        mensaje: 'Solicito suscribirme al newsletter de TAMEFOR para recibir noticias y actualizaciones.',
        tipoConsulta: 'Newsletter'
      })
      
      if (mensaje) {
        setSubscribed(true)
        setEmail("")
        setTimeout(() => setSubscribed(false), 5000)
      } else {
        setErrors([{ field: 'email', message: 'Error al suscribirse. Intente nuevamente.' }])
      }
    } catch (error) {
      console.error('Error al suscribir:', error)
      setErrors([{ field: 'email', message: 'Error al suscribirse. Intente nuevamente.' }])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-[#1a3a5c] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 Q 25 50, 50 100 T 100 100 V 0 H 0 Z" fill="white" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="lg:w-1/3">
            <div className="relative w-64 h-80 mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887"
                alt="Voluntario"
                fill
                className="object-cover rounded-t-full rounded-b-3xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-2/3 text-center lg:text-left">
            <h2 className="font-sans text-4xl md:text-5xl text-white mb-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span>Recibe noticias</span>
              <Mail className="w-10 h-10 text-[#3d9a8b]" />
              <span>interesantes</span>
              <ArrowRight className="w-8 h-8 text-[#3d9a8b]/60" />
            </h2>
            <p className="text-[#3d9a8b]/80 mb-8">
              Suscríbete para recibir las últimas actualizaciones
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto lg:mx-0">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors([])
                  }}
                  disabled={isSubmitting}
                  className={`bg-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/60 rounded-full px-6 h-14 text-lg font-medium ${
                    getFieldError(errors, 'email') ? 'border-red-500 border-2' : 'border-white'
                  }`}
                  required
                />
                {getFieldError(errors, 'email') && (
                  <p className="text-red-300 text-sm mt-2 ml-4">{getFieldError(errors, 'email')}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#3d9a8b] border-2 border-white hover:bg-white hover:text-[#1a3a5c] text-white rounded-full px-8 h-14 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Suscribirme Ahora'}
                {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </form>

            {subscribed && (
              <div className="mt-6 flex items-center justify-center lg:justify-start gap-3 max-w-xl mx-auto lg:mx-0 bg-white/10 border border-[#3d9a8b] rounded-full px-6 py-3">
                <div className="w-8 h-8 bg-[#3d9a8b] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-white font-medium">
                  ¡Gracias por suscribirte! Pronto recibirás nuestras novedades.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
