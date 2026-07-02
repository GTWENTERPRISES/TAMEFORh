"use client"

import { Check, ArrowRight, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const features = [
  "Empresa B.I.C. Certificada",
  "Respaldo Legal y Técnico",
  "Certificaciones ISO 14001 y 9001",
  "Capacitaciones SENECYT",
]

export function WhyChooseSection() {
  return (
    <section className="py-20 bg-[#1a3a5c] relative overflow-hidden">
      {/* Decorative tree silhouette */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 400" className="h-full w-full" fill="#1a3a5c">
          <path d="M100 400 L100 250 L50 250 L100 150 L60 150 L100 50 L80 50 L100 0 L120 50 L100 50 L140 150 L100 150 L150 250 L100 250 L100 400Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images Grid */}
          <div className="relative">
            {/* Main images container */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left larger image */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074"
                  alt="Voluntarios trabajando"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Right column with two images */}
              <div className="flex flex-col gap-4">
                <div className="relative h-[200px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013"
                    alt="Persona con planta"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[180px] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070"
                    alt="Plantación"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative dots */}
            <div className="absolute -bottom-4 -left-4 grid grid-cols-5 gap-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#3d9a8b]/30" />
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
              </svg>
              <span className="text-[#3d9a8b] font-medium">¿Por Qué Elegirnos?</span>
            </div>
            
            <h2 className="font-sans text-4xl md:text-5xl text-white leading-tight mb-6">
              Algunas Razones para Elegir<br />
              <span className="text-[#3d9a8b]">(TAMEFOR)</span>
            </h2>
            
            <p className="text-[#3d9a8b]/80 mb-8">
              Trabajamos para proteger y restaurar el medio ambiente natural con soluciones sostenibles y compromiso real.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#3d9a8b] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA and Donation */}
            <div className="flex flex-wrap items-center gap-6">
              <Button className="bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white rounded-full px-6">
                Explorar Todo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-3 bg-[#1a3a5c] rounded-full py-2 px-4 shadow-lg border border-[#3d9a8b]/30">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#1a3a5c]" />
                </div>
                <div>
                  <p className="text-xs text-[#3d9a8b]/70">Donación Anual</p>
                  <p className="text-lg font-bold text-white">$2,000,00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


