"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Check, ArrowRight, Target, Clock, FileText, Gavel, Shield, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ServiceConsultationModal } from "@/components/ServiceConsultationModal"

const serviceData = {
  title: "Asesoría Legal y Normativa",
  description: "Orientación en aspectos legales, normativos y regulatorios relacionados con el ejercicio profesional forestal.",
  features: [
    "Asesoría legal especializada",
    "Interpretación normativa",
    "Representación profesional"
  ],
  image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070"
}

const benefits = [
  {
    icon: Shield,
    title: "Protección Jurídica",
    description: "Protege tu actividad profesional con el respaldo legal necesario en el sector forestal."
  },
  {
    icon: Gavel,
    title: "Cumplimiento Normativo",
    description: "Garantiza el cumplimiento de todas las regulaciones ambientales y forestales vigentes."
  },
  {
    icon: Scale,
    title: "Asesoría Especializada",
    description: "Recibe orientación legal específica para el sector forestal de expertos en la materia."
  },
  {
    icon: FileText,
    title: "Documentación Completa",
    description: "Conta con todos los documentos legales necesarios para tu ejercicio profesional."
  }
]

const servicesOffered = [
  {
    title: "Constitución de Empresas Forestales",
    description: "Asesoría para la creación y registro legal de empresas del sector forestal."
  },
  {
    title: "Trámites Ante el MAATE",
    description: "Gestión de permisos, autorizaciones y trámites ante el Ministerio del Ambiente."
  },
  {
    title: "Contratos Forestales",
    description: "Redacción y revisión de contratos de aprovechamiento, arrendamiento y compraventa."
  },
  {
    title: "Litigio Ambiental",
    description: "Representación legal en procesos judiciales y administrativos ambientales."
  },
  {
    title: "Derecho de Tierras",
    description: "Asesoría en procesos de regularización, titulación y derechos sobre tierras forestales."
  },
  {
    title: "Cumplimiento de Normas",
    description: "Evaluación y garantía de cumplimiento de normativa forestal y ambiental."
  }
]

const process = [
  {
    step: "01",
    title: "Evaluación Inicial",
    description: "Analizamos tu situación específica y los requisitos legales necesarios."
  },
  {
    step: "02",
    title: "Plan de Acción",
    description: "Diseñamos la estrategia legal más adecuada para tus necesidades."
  },
  {
    step: "03",
    title: "Ejecución",
    description: "Implementamos las acciones necesarias para resolver tu situación."
  },
  {
    step: "04",
    title: "Seguimiento",
    description: "Acompañamos tu proceso hasta la resolución final del caso."
  }
]

const targetAudience = [
  "Empresas forestales",
  "Consultoras ambientales",
  "Ingenieros forestales independientes",
  "Organizaciones ambientales",
  "Municipios y gobiernos locales",
  "Proyectos de inversión forestal"
]

export default function AsesoriaLegalNormativaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070"
            alt="Fondo"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Servicio No - 04</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h1 className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6">
              Asesoría Legal y Normativa
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
                Nuestro Servicio Legal
              </h2>
              <p className="text-[#1a3a5c]/70 text-lg mb-6 leading-relaxed">
                Ofrecemos asesoría legal especializada en materia forestal y ambiental, ayudando a empresas y profesionales a navegar el complejo marco normativo del sector.
              </p>
              <p className="text-[#1a3a5c]/70 text-lg mb-6 leading-relaxed">
                Nuestro equipo legal cuenta con experiencia en la regulación forestal ecuatoriana y mantiene actualizado su conocimiento según las últimas modificaciones normativas.
              </p>

              <h3 className="font-sans text-xl lg:text-2xl text-[#1a3a5c] font-semibold mb-4">
                Áreas de Asesoría
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
                  Consulta Legal
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

      {/* Services Offered Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Nuestros Servicios</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-white font-bold mb-4">
              Áreas de Práctica
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Amplia gama de servicios legales especializados en el sector forestal
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {servicesOffered.map((service, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 border-l-4 border-[#3d9a8b] hover:border-[#3d9a8b] hover:bg-white/15 transition-all duration-300"
              >
                <h3 className="text-white font-semibold text-xl mb-2">
                  {service.title}
                </h3>
                <p className="text-white/80">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Ventajas</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-[#1a3a5c] font-bold mb-4">
              Beneficios de Nuestra Asesoría
            </h2>
            <p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg">
              Seguridad jurídica y tranquilidad para tu empresa y proyectos forestales
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="border border-[#3d9a8b]/20 p-8 bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#3d9a8b] flex items-center justify-center mb-6">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-[#1a3a5c] font-semibold text-xl mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#1a3a5c]/70">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Proceso</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-white font-bold mb-4">
              Nuestro Método de Trabajo
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Un proceso estructurado para resolver tus necesidades legales de manera efectiva
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {process.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 border-l-4 border-[#3d9a8b]"
              >
                <div className="text-[#3d9a8b] font-bold text-2xl mb-3">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-white/80">
                  {item.description}
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
                ¿Para quién es Este Servicio?
              </h2>
              <p className="text-[#1a3a5c]/70 text-lg mb-8">
                Nuestra asesoría legal está diseñada para empresas, profesionales y organizaciones del sector forestal que necesitan garantizar su cumplimiento normativo.
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
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
                alt="Asesoría legal"
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
            ¿Necesitas Asesoría Legal?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg mb-8">
            Contáctanos para una consulta inicial y evalúa tu situación legal con nuestros expertos
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white px-8 py-3 font-semibold border-2 border-white transition-all duration-300"
            >
              Agendar Consulta
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
