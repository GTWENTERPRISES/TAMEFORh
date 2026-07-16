"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Check, ArrowRight, Target, Clock, Zap, TrendingUp, MapPin, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ServiceConsultationModal } from "@/components/ServiceConsultationModal"

const serviceData = {
  title: "Consultoría Técnica",
  description: "Servicios de consultoría especializada en proyectos forestales, ambientales y de desarrollo sostenible.",
  features: [
    "Evaluaciones técnicas",
    "Planes de manejo forestal",
    "Estudios de impacto ambiental"
  ],
  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
}

const benefits = [
  {
    icon: Zap,
    title: "Soluciones Profesionales",
    description: "Recibe asesoría de expertos con amplia experiencia en proyectos forestales y ambientales."
  },
  {
    icon: TrendingUp,
    title: "Cumplimiento Normativo",
    description: "Asegura que tus proyectos cumplan con toda la normativa ambiental vigente."
  },
  {
    icon: Target,
    title: "Resultados Efectivos",
    description: "Desarrolla planes de manejo eficientes que maximicen los resultados de tu proyecto."
  },
  {
    icon: Clock,
    title: "Asesoría Continua",
    description: "Conta con nuestro apoyo durante todo el ciclo de vida de tu proyecto forestal."
  }
]

const servicesOffered = [
  {
    title: "Estudios de Impacto Ambiental (EIA)",
    description: "Evaluación detallada de los impactos ambientales de tus proyectos forestales e industriales."
  },
  {
    title: "Planes de Manejo Forestal",
    description: "Desarrollo de planes de manejo sostenible para bosques naturales y plantaciones forestales."
  },
  {
    title: "Evaluaciones Técnicas",
    description: "Diagnósticos completos de áreas forestales y potencialidades de desarrollo."
  },
  {
    title: "Auditorías Ambientales",
    description: "Verificación de cumplimiento normativo y buenas prácticas ambientales."
  },
  {
    title: "Gestión de Recursos Naturales",
    description: "Optimización del uso de recursos hídricos, edafológicos y biodiversidad."
  },
  {
    title: "Planes de Restauración Ecológica",
    description: "Diseño e implementación de proyectos de restauración de ecosistemas degradados."
  }
]

const process = [
  {
    step: "01",
    title: "Diagnóstico Inicial",
    description: "Evaluamos tu proyecto y definimos los objetivos específicos de la consultoría."
  },
  {
    step: "02",
    title: "Recopilación de Datos",
    description: "Realizamos estudios de campo y análisis técnicos de tu área forestal."
  },
  {
    step: "03",
    title: "Desarrollo del Plan",
    description: "Diseñamos soluciones personalizadas adaptadas a tus necesidades específicas."
  },
  {
    step: "04",
    title: "Implementación y Acompañamiento",
    description: "Te guiamos durante la ejecución y monitoreo de las soluciones propuestas."
  }
]

const idealFor = [
  "Empresas forestales y madereras",
  "Proyectos de desarrollo sostenible",
  "Organizaciones ambientales",
  "Gobiernos locales y nacionales",
  "Empresas con responsabilidad ambiental",
  "Proyectos de inversión forestal"
]

export default function ConsultoriaTecnicaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
            alt="Fondo"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Servicio No - 02</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h1 className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6">
              Consultoría Técnica
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
                Nuestra Consultoría
              </h2>
              <p className="text-[#1a3a5c]/70 text-lg mb-6 leading-relaxed">
                Ofrecemos servicios de consultoría especializada en proyectos forestales y ambientales, con enfoque en el desarrollo sostenible y el cumplimiento normativo vigente en el Ecuador.
              </p>
              <p className="text-[#1a3a5c]/70 text-lg mb-6 leading-relaxed">
                Nuestro equipo multidisciplinario de expertos te acompaña desde la concepción hasta la implementación de tus proyectos, garantizando soluciones técnicas rigurosas y prácticas.
              </p>

              <h3 className="font-sans text-xl lg:text-2xl text-[#1a3a5c] font-semibold mb-4">
                Principales Servicios
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
                  Solicitar Consultoría
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
              ¿Qué Ofrecemos?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Una gama completa de servicios de consultoría técnica para proyectos forestales
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
              Beneficios de Nuestra Consultoría
            </h2>
            <p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg">
              Valor agregado que marca la diferencia en tus proyectos forestales
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
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Metodología</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h2 className="font-sans text-4xl md:text-5xl text-white font-bold mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Una metodología probada para garantizar resultados exitosos
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

      {/* Ideal For Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-[#3d9a8b]" />
                <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Para quién</span>
              </div>
              <h2 className="font-sans text-4xl text-[#1a3a5c] font-bold mb-6">
                ¿Para quién es Ideal?
              </h2>
              <p className="text-[#1a3a5c]/70 text-lg mb-8">
                Nuestros servicios de consultoría están diseñados para atender las necesidades de organizaciones y empresas del sector forestal y ambiental.
              </p>

              <ul className="space-y-4">
                {idealFor.map((item, index) => (
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
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2070"
                alt="Proyectos forestales"
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
            ¿Listo para Iniciar tu Proyecto?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg mb-8">
            Contáctanos para una consultoría inicial y define el mejor plan para tu proyecto forestal
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
