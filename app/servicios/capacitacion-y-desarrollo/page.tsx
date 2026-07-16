"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Check, ArrowRight, Target, Clock, GraduationCap, Users, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ServiceConsultationModal } from "@/components/ServiceConsultationModal"

const serviceData = {
  title: "Capacitación y Desarrollo",
  description: "Programas de capacitación continua, cursos especializados y desarrollo profesional para miembros y profesionales del sector.",
  features: [
    "Cursos de actualización",
    "Talleres especializados",
    "Seminarios y conferencias"
  ],
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
}

const benefits = [
  {
    icon: GraduationCap,
    title: "Desarrollo Profesional",
    description: "Actualiza tus conocimientos y mantente al día con las últimas tendencias del sector forestal."
  },
  {
    icon: Users,
    title: "Red de Profesionales",
    description: "Conecta con expertos y colegas del sector forestal durante los programas de capacitación."
  },
  {
    icon: BookOpen,
    title: "Certificaciones Validadas",
    description: "Obtén certificaciones oficiales que respalden tus conocimientos y habilidades profesionales."
  },
  {
    icon: TrendingUp,
    title: "Ventaja Competitiva",
    description: "Destaca en el mercado laboral con formación especializada y actualizada."
  }
]

const courses = [
  {
    title: "Gestión Forestal Sostenible",
    description: "Aprende las mejores prácticas para el manejo sostenible de bosques y recursos forestales."
  },
  {
    title: "Certificación FSC y PEFC",
    description: "Capacitación especializada en sistemas de certificación forestal sostenible."
  },
  {
    title: "Inventarios Forestales",
    description: "Técnicas avanzadas para la realización de inventarios forestales precisos."
  },
  {
    title: "Restauración Ecológica",
    description: "Métodos y técnicas para la restauración de ecosistemas forestales degradados."
  },
  {
    title: "Normativa Ambiental",
    description: "Conocimiento completo de la legislación forestal y ambiental vigente en Ecuador."
  },
  {
    title: "Manejo de Incendios Forestales",
    description: "Estrategias de prevención y combate de incendios forestales."
  }
]

const modalities = [
  {
    title: "Presencial",
    description: "Clases prácticas y teóricas en nuestras instalaciones o en las zonas forestales de estudio."
  },
  {
    title: "Virtual",
    description: "Plataforma de aprendizaje online con acceso a materiales y sesiones en vivo."
  },
  {
    title: "Semipresencial",
    description: "Combina la flexibilidad de lo virtual con sesiones presenciales prácticas."
  },
  {
    title: "In-Company",
    description: "Programas personalizados diseñados exclusivamente para tu empresa o organización."
  }
]

const process = [
  {
    step: "01",
    title: "Diagnóstico de Necesidades",
    description: "Identificamos tus objetivos de aprendizaje y requerimientos específicos."
  },
  {
    step: "02",
    title: "Selección del Programa",
    description: "Elije el curso o programa que mejor se adapte a tus necesidades profesionales."
  },
  {
    step: "03",
    title: "Participación Activa",
    description: "Sumérgete en el programa con materiales, actividades prácticas y asesoría personalizada."
  },
  {
    step: "04",
    title: "Certificación y Acompañamiento",
    description: "Obtén tu certificación y continua recibiendo apoyo post-curso."
  }
]

const targetAudience = [
  "Ingenieros forestales",
  "Técnicos del sector forestal",
  "Profesionales ambientales",
  "Estudiantes avanzados",
  "Empresarios del sector",
  "Funcionarios públicos"
]

export default function CapacitacionDesarrolloPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
            alt="Fondo"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Servicio No - 03</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h1 className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6">
              Capacitación y Desarrollo
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              {serviceData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative overflow-hidden shadow-xl border border-[#3d9a8b]/20">
              <Image
                src={serviceData.image}
                alt={serviceData.title}
                width={800}
                height={600}
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div>
              <h2 className="font-sans text-3xl lg:text-4xl text-[#1a3a5c] font-bold mb-6">
                Nuestros Programas
              </h2>
              <p className="text-[#1a3a5c]/70 text-lg mb-6 leading-relaxed">
                Ofrecemos programas de capacitación diseñados específicamente para el sector forestal y ambiental, con enfoque práctico y contenido actualizado según las últimas tendencias y normativas.
              </p>
              <p className="text-[#1a3a5c]/70 text-lg mb-6 leading-relaxed">
                Nuestros cursos son dictados por expertos profesionales con amplia experiencia en el campo, garantizando un aprendizaje de calidad y aplicable en el mundo real.
              </p>

              <h3 className="font-sans text-xl lg:text-2xl text-[#1a3a5c] font-semibold mb-4">
                Modalidades Disponibles
              </h3>
              <ul className="space-y-3 mb-8">
                {serviceData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#1a3a5c]">
                    <div className="w-6 h-6 border-2 border-[#3d9a8b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-[#3d9a8b]" />
                    </div>
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#3d9a8b] hover:bg-[#1a3a5c] text-white px-8 py-3 font-semibold group transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#3d9a8b]"
                >
                  Inscribirme Ahora
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Link href="/servicios">
                  <Button className="bg-transparent border-2 border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white px-8 py-3 font-semibold transition-all duration-300">
                    Ver Todos los Servicios
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Catálogo</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-white font-bold mb-4">
              Cursos y Programas
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Amplia variedad de cursos especializados para el desarrollo profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 border-l-4 border-[#3d9a8b] hover:border-[#3d9a8b] hover:bg-white/15 transition-all duration-300"
              >
                <h3 className="text-white font-semibold text-xl mb-2">
                  {course.title}
                </h3>
                <p className="text-white/80">
                  {course.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modalities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Modalidades</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-[#1a3a5c] font-bold mb-4">
              ¿Cómo Aprender?
            </h2>
            <p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg">
              Elige la modalidad que mejor se adapte a tus necesidades y disponibilidad
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {modalities.map((modality, index) => (
              <div
                key={index}
                className="border border-[#3d9a8b]/20 p-8 bg-white hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-[#1a3a5c] font-semibold text-xl mb-3">
                  {modality.title}
                </h3>
                <p className="text-[#1a3a5c]/70">
                  {modality.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Ventajas</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-white font-bold mb-4">
              Beneficios de Capacitarte
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Invierte en tu futuro profesional con nuestros programas de capacitación
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 border-l-4 border-[#3d9a8b]"
              >
                <div className="w-12 h-12 bg-[#3d9a8b] flex items-center justify-center mb-6">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">
                  {benefit.title}
                </h3>
                <p className="text-white/80">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-[#3d9a8b]" />
                <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Para quién</span>
              </div>
              <h2 className="font-sans text-4xl text-[#1a3a5c] font-bold mb-6">
                Público Objetivo
              </h2>
              <p className="text-[#1a3a5c]/70 text-lg mb-8">
                Nuestros programas están diseñados para profesionales y estudiantes del sector forestal que buscan ampliar sus conocimientos y mejorar sus perspectivas profesionales.
              </p>

              <ul className="space-y-4">
                {targetAudience.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#1a3a5c]">
                    <div className="w-6 h-6 border-2 border-[#3d9a8b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-[#3d9a8b]" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden shadow-xl border border-[#3d9a8b]/20">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070"
                alt="Capacitación"
                width={800}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#3d9a8b]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-sans text-3xl md:text-4xl text-white font-bold mb-6">
            ¿Listo para Avanzar en tu Carrera?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg mb-8">
            Contáctanos para conocer más sobre nuestros próximos cursos y programas de capacitación
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white px-8 py-3 font-semibold border-2 border-white transition-all duration-300"
            >
              Inscribirme Ahora
            </Button>
            <Link href="/servicios">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1a3a5c] px-8 py-3 font-semibold transition-all duration-300">
                Ver Más Servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ServiceConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={serviceData.title}
      />
    </main>
  )
}
