"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function DonateSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <section className="py-20 bg-[#1a3a5c] relative overflow-hidden">
      {/* Decorative wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 5C120 10 240 20 360 25C480 30 600 30 720 25C840 20 960 10 1080 10C1200 10 1320 20 1380 25L1440 30V60H0V0Z" fill="#3d9a8b" fillOpacity="0.1"/>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=2070"
                alt="Voluntarios trabajando"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative brush stroke */}
            <div className="absolute -top-4 -left-4 -right-4 h-8">
              <svg viewBox="0 0 400 30" fill="none" className="w-full h-full">
                <path d="M0 15C50 5 100 25 150 15C200 5 250 25 300 15C350 5 400 15 400 15V30H0V15Z" fill="white"/>
              </svg>
            </div>
            <div className="absolute -bottom-4 -left-4 -right-4 h-8 rotate-180">
              <svg viewBox="0 0 400 30" fill="none" className="w-full h-full">
                <path d="M0 15C50 5 100 25 150 15C200 5 250 25 300 15C350 5 400 15 400 15V30H0V15Z" fill="white"/>
              </svg>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-[#1a3a5c] rounded-2xl p-8 shadow-xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <svg viewBox="0 0 100 100" fill="white">
                <path d="M50 0C60 20 80 30 100 50C80 70 60 80 50 100C40 80 20 70 0 50C20 30 40 20 50 0Z"/>
              </svg>
            </div>

            <h2 className="font-sans text-3xl md:text-4xl text-white mb-2">
              Envíanos un Mensaje
            </h2>
            <h3 className="font-sans text-2xl md:text-3xl text-white mb-4">
              Para Donar
            </h3>
            <p className="text-[#3d9a8b]/80 mb-8">
              El punto de usar lorem ipsum es que tiene una distribución más o menos normal de letras.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Tu Nombre Completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white border-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 rounded-lg h-12 font-medium"
                required
              />
              <Input
                type="email"
                placeholder="ejemplo@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white border-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 rounded-lg h-12 font-medium"
                required
              />
              <Input
                type="tel"
                placeholder="+1 xxx xxx xxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white border-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 rounded-lg h-12 font-medium"
              />
              <Textarea
                placeholder="Di algo..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white border-white text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 rounded-lg min-h-[120px] font-medium"
              />
              <Button 
                type="submit"
                className="bg-white hover:bg-[#ffffff] text-[#1a3a5c] rounded-full px-8 h-12 font-semibold"
              >
                Enviar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


