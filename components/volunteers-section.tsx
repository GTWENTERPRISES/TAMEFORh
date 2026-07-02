"use client"

import { Share2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const volunteers = [
  {
    name: "Joshua Sendu",
    role: "CEO-Fundador",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887"
  },
  {
    name: "John Maxwell",
    role: "Líder de Equipo",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887"
  },
  {
    name: "Ana García",
    role: "Voluntaria Sr.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070"
  },
  {
    name: "Daniel Pasha",
    role: "Voluntario",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887"
  },
]

export function VolunteersSection() {
  return (
    <section className="py-20 bg-[#1a3a5c]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
            </svg>
            <span className="text-[#3d9a8b] font-medium">Somos Voluntarios</span>
          </div>
          <h2 className="font-sans text-4xl md:text-5xl text-white leading-tight">
            Juntos Por El Planeta
          </h2>
        </div>

        {/* Volunteers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {volunteers.map((volunteer, index) => (
            <div key={index} className="text-center group">
              {/* Image Container */}
              <div className="relative mb-4">
                <div className="relative w-48 h-56 mx-auto rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white/20">
                  <Image
                    src={volunteer.image}
                    alt={volunteer.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Share Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-white hover:bg-[#ffffff] transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              {/* Info */}
              <h3 className="font-sans text-xl text-white mb-1">{volunteer.name}</h3>
              <p className="text-[#3d9a8b]/70 text-sm">{volunteer.role}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button className="bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white rounded-full px-6">
            Ver Todos los Voluntarios
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4 text-[#3d9a8b]/70">
            <span>Si quieres unirte,</span>
            <span className="text-white font-semibold">puedes hacerlo</span>
            <ArrowRight className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </section>
  )
}


