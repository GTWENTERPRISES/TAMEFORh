"use client"

import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CongressSection() {
  return (
    <section className="py-20 bg-[#0f2a45] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#3d9a8b]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative h-[450px] rounded-2xl overflow-hidden border-4 border-[#3d9a8b] shadow-2xl">
                <Image
                  src="/arboles.webp"
                  alt="Expo Forestal TAMEFOR"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a45]/95 via-[#0f2a45]/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
                    <h3 className="text-2xl font-sans font-bold text-white mb-2">
                      Expo Forestal TAMEFOR
                    </h3>
                    <p className="text-[#3d9a8b] text-sm font-medium">Feria de Innovación y Sostenibilidad Ambiental</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative dots */}
              <div className="absolute -bottom-4 -right-4 grid grid-cols-5 gap-1">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#3d9a8b]/40" />
                ))}
              </div>
            </div>

            {/* Content Side */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
                </svg>
                <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Feria Anual</span>
              </div>
              
              <h2 className="font-sans text-5xl md:text-6xl text-white leading-tight mb-2 font-bold">
                Expo Forestal
              </h2>
              <h3 className="font-sans text-3xl md:text-4xl text-[#3d9a8b] leading-tight mb-6 font-bold">
                TAMEFOR 2026
              </h3>
              
              <p className="text-white/90 mb-8 leading-relaxed text-lg">
                La feria más grande de tecnología forestal, maquinaria, insumos y servicios ambientales. 
                Encuentra proveedores, descubre innovaciones y establece alianzas estratégicas para tu negocio.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 uppercase tracking-wider">Fechas</p>
                    <p className="font-semibold text-white text-lg">15-17 de Septiembre, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 uppercase tracking-wider">Ubicación</p>
                    <p className="font-semibold text-white text-lg">Centro de Convenciones, Quevedo</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 uppercase tracking-wider">Expositores</p>
                    <p className="font-semibold text-white text-lg">+80 empresas del sector forestal</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScfKpEeLrGQnHdOaLQ1s4dWQ6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white rounded-full px-8 py-3 group font-semibold text-base">
                  Inscríbete
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


