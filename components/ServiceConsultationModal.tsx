"use client"

import { useState } from "react"
import { ArrowRight, X } from "lucide-react"
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

interface ServiceConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  serviceName: string
}

export function ServiceConsultationModal({ isOpen, onClose, serviceName }: ServiceConsultationModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: `Consulta sobre ${serviceName}`,
    mensaje: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally send the data to your API
    console.log("Form submitted:", formData)
    alert("¡Gracias por tu consulta! Nos pondremos en contacto contigo pronto.")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              Solicitar Consultoría
            </DialogTitle>
            <DialogDescription className="text-white/80 mt-2 text-lg">
              {serviceName}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre completo"
                required
                className="w-full bg-white !bg-white border-[#1a3a5c]/30 text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:border-[#3d9a8b] focus:ring-0 focus:outline-none"
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                required
                className="w-full bg-white !bg-white border-[#1a3a5c]/30 text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:border-[#3d9a8b] focus:ring-0 focus:outline-none"
              />
            </div>
            <div>
              <Input
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                placeholder="Asunto"
                required
                className="w-full bg-white !bg-white border-[#1a3a5c]/30 text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium h-12 rounded-none border-2 focus:border-[#3d9a8b] focus:ring-0 focus:outline-none"
              />
            </div>
            <div>
              <Textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu proyecto o consulta"
                rows={5}
                required
                className="w-full bg-white !bg-white border-[#1a3a5c]/30 text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 font-medium rounded-none border-2 focus:border-[#3d9a8b] focus:ring-0 focus:outline-none resize-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white rounded-none py-4 font-semibold text-base transition-all duration-300 shadow-none border-2 border-[#1a3a5c] hover:border-[#3d9a8b]"
            >
              Enviar Consulta
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
