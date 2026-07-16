"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Check, ArrowRight, Target, Clock, Award, Users, BookOpen, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ServiceConsultationModal } from "@/components/ServiceConsultationModal"

const serviceData = {
  title: "Certificación Profesional",
  description: "Proceso de certificación y registro profesional para ingenieros forestales, cumpliendo con los estándares del SENECYT y el Ministerio del Trabajo.",
  features: [
    "Registro profesional oficial",
    "Certificación de competencias",
    "Actualización de credenciales"
  ],
  image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070"
}

const benefits = [
  {
    icon: Award,
    title: "Reconocimiento Oficial",
    description: "Obtén una certificación válida y reconocida por las autoridades nacionales del sector forestal."
  },
  {
    icon: BookOpen,
    title: "Validez Nacional",
    description: "Tu certificación tiene validez en todo el territorio ecuatoriano para ejercer la profesión."
  },
  {
    icon: Target,
    title: "Competencia Técnica",
    description: "Demuestra tus conocimientos y habilidades profesionales ante empleadores y clientes."
  },
  {
    icon: Users,
    title: "Acceso a Oportunidades",
    description: "Abre puertas a proyectos, contrataciones y empleos exclusivos para profesionales certificados."
  }
]

const process = [
  {
    step: "01",
    title: "Presentación de Documentos",
    description: "Presenta tu hoja de vida, títulos profesionales y documentos de experiencia laboral."
  },
  {
    step: "02",
    title: "Evaluación de Competencia",
    description: "Realiza una evaluación técnica para demostrar tus conocimientos en el área forestal."
  },
  {
    step: "03",
    title: "Revisión y Aprobación",
    description: "Nuestro equipo de expertos revisa tu expediente y valida tu experiencia profesional."
  },
  {
    step: "04",
    title: "Emisión de Certificado",
    description: "Recibe tu certificación profesional oficial registrada ante el SENECYT."
  }
]

const whoCanApply = [
  "Ingenieros Forestales titulados",
  "Profesionales del sector forestal con experiencia",
  "Técnicos especializados en áreas forestales",
  "Egresados de carreras afines al sector"
]

const requiredDocuments = [
  "Hoja de vida actualizada",
  "Copia del título profesional",
  "Certificados de cursos especializados",
  "Documentos de experiencia laboral",
  "Referencias profesionales",
  "Cédula de identidad"
]

export default function CertificacionProfesionalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070"
            alt="Fondo"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Servicio No - 01</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h1 className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6">
              Certificación Profesional
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
                Nuestro Servicio
              </h2>
              <p className="text-[#1a3a5c]/70 text-lg mb-6 leading-relaxed">
                Brindamos un proceso completo y confiable de certificación profesional para ingenieros forestales, asegurando el cumplimiento total con los estándares establecidos por el SENECYT y el Ministerio del Trabajo del Ecuador.
              </p>
              <p className="text-[#1a3a5c]/70 text-lg mb-6 leading-relaxed">
                Nuestro programa está diseñado para validar tus conocimientos técnicos, experiencia profesional y competencias en el sector forestal, proporcionándote una certificación oficial que te distinga como profesional calificado.
              </p>

              <h3 className="font-sans text-xl lg:text-2xl text-[#1a3a5c] font-semibold mb-4">
                Características Incluidas
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
                  Solicitar Información
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

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Beneficios</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-white font-bold mb-4">
              Ventajas de la Certificación
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Obtén múltiples beneficios al certificarte profesionalmente con TAMEFOR
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 border-l-4 border-[#3d9a8b] hover:border-[#3d9a8b] hover:bg-white/15 transition-all duration-300"
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

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Proceso</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-[#1a3a5c] font-bold mb-4">
              Nuestro Proceso de Certificación
            </h2>
            <p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg">
              Un proceso estructurado y transparente para obtener tu certificación profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {process.map((item, index) => (
              <div
                key={index}
                className="relative border border-[#3d9a8b]/20 p-8 bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#3d9a8b]" />
                <div className="text-[#3d9a8b] font-bold text-2xl mb-3">
                  {item.step}
                </div>
                <h3 className="text-[#1a3a5c] font-semibold text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-[#1a3a5c]/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Apply Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-[#3d9a8b]" />
                <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">A quién está dirigido</span>
              </div>
              <h2 className="font-sans text-4xl text-white font-bold mb-6">
                ¿Quién puede Aplicar?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Nuestro programa de certificación está diseñado para profesionales del sector forestal que desean validar y certificar sus conocimientos y experiencia.
              </p>

              <ul className="space-y-4">
                {whoCanApply.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-white">
                    <div className="w-6 h-6 border-2 border-[#3d9a8b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-[#3d9a8b]" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 border-l-4 border-[#3d9a8b]">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="h-6 w-6 text-[#3d9a8b]" />
                <h3 className="text-white font-semibold text-xl">
                  Documentación Requerida
                </h3>
              </div>
              <ul className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/90">
                    <div className="w-2 h-2 bg-[#3d9a8b] flex-shrink-0 mt-2" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#3d9a8b]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-sans text-3xl md:text-4xl text-white font-bold mb-6">
            ¿Listo para Certificarte Profesionalmente?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg mb-8">
            Inicia tu proceso de certificación hoy mismo y da el siguiente paso en tu carrera profesional
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white px-8 py-3 font-semibold border-2 border-white transition-all duration-300"
            >
              Contáctanos Ahora
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
