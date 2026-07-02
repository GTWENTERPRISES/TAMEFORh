"use client"

import { MapPin, Clock, ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const events = [
  {
    date: "20",
    month: "Marzo",
    year: "2026",
    title: "Desafío de Plantación de Árboles",
    location: "Ciudad de México",
    time: "8:30am - 4:00pm",
    joined: 236,
    category: "Plantación de Árboles",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013",
  },
  {
    date: "28",
    month: "Febrero",
    year: "2026",
    title: "Desafío de Limpieza Forestal",
    location: "Guadalajara",
    time: "10:30am - 4:00pm",
    joined: 49,
    category: "Bosque",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074",
  },
]

export function EventsSection() {
  return (
    <section id="events" className="py-20 bg-[#1a3a5c]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
            </svg>
            <span className="text-[#3d9a8b] font-medium">Próximos Eventos</span>
          </div>
          <h2 className="font-sans text-4xl md:text-5xl text-white leading-tight">
            Nuestros Eventos, <span className="inline-flex items-center"><svg className="w-8 h-8 mx-2 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" /></svg></span> Participa
          </h2>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="group bg-[#1a3a5c] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#3d9a8b]/30"
            >
              {/* Top Section */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  {/* Date */}
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white" />
                    <div>
                      <span className="text-4xl font-sans font-bold text-white">{event.date}</span>
                      <span className="text-[#3d9a8b] ml-2">{event.month}</span>
                      <p className="text-[#3d9a8b]/70 text-sm">en {event.year}</p>
                    </div>
                  </div>
                  
                  {/* Avatars and Joined */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" alt="" width={32} height={32} className="object-cover" />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" alt="" width={32} height={32} className="object-cover" />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center text-[#1a3a5c] text-xs font-bold">
                        +
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">{event.joined}</p>
                      <p className="text-[#3d9a8b]/70 text-xs">Personas Unidas</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-sans text-2xl font-bold text-white mb-4">{event.title}</h3>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-[#3d9a8b]/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-white" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-white" />
                    <span>{event.time}</span>
                  </div>
                </div>
                
                <Button className="bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white rounded-full px-6">
                  Unirse al Evento
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute bottom-4 right-4 bg-[#3d9a8b] text-white px-4 py-1 rounded-full text-sm">
                  {event.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


