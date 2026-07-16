"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Check, ArrowRight, Target, Clock, Sprout, Leaf, Droplets, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ServiceConsultationModal } from "@/components/ServiceConsultationModal"

const serviceData = {
  title: "Conservación y Restauración",
  description: "Programas de conservación y restauración de ecosistemas forestales y biodiversidad.",
  features: [
    "Restauración ecológica",
    "Conservación de biodiversidad",
    "Reforestación"
  ],
  image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070"
}

const benefits = [
  {
    icon: Sprout,
    title: "Recuperación Ecosistémica",
    description: "Restaura la salud y funcionalidad de ecosistemas forestales degradados o dañados."
  },
  {
    icon: Leaf,
    title: "Conservación de Biodiversidad",
    description: "Protege y recupera hábitats para la conservación de especies forestales y silvestres."
  },
  {
    icon: Droplets,
    title: "Servicios Ecosistémicos",
    description: "Mantiene y recupera servicios como captación de agua, carbono y protección del suelo."
  },
  {
    icon: Heart,
    title: "Impacto Positivo",
    description: "Genera impactos ambientales, sociales y económicos positivos para las comunidades."
  }
]

const servicesOffered = [
  {
    title: "Restauración Ecológica",
    description: "Diseño e implementación de proyectos de restauración de ecosistemas forestales."
  },
  {
    title: "Reforestación Activa",
    description: "Establecimiento de plantaciones con especies nativas para la recuperación de cobertura vegetal."
  },
  {
    title: "Conservación de Biodiversidad",
    description: "Monitoreo y manejo de la diversidad biológica en áreas forestales naturales."
  },
  {
    title: "Recuperación de Suelos",
    description: "Técnicas para la recuperación y protección de suelos forestales degradados."
  },
  {
    title: "Gestión de Áreas Protegidas",
    description: "Apoyo técnico para la gestión efectiva de parques, reservas y áreas protegidas."
  },
  {
    title: "Proyectos de Carbono",
    description: "Desarrollo de proyectos forestales de captura y almacenamiento de carbono."
  }
]

const process = [
  {
    step: "01",
    title: "Diagnóstico del Sitio",
    description: "Evaluación de las condiciones actuales del área a restaurar o conservar."
  },
  {
    step: "02",
    title: "Diseño del Proyecto",
    description: "Elaboración del plan de restauración o conservación según los objetivos establecidos."
  },
  {
    step: "03",
    title: "Implementación",
    description: "Ejecución de las actividades de reforestación, manejo o conservación."
  },
  {
    step: "04",
    title: "Monitoreo y Mantenimiento",
    description: "Seguimiento a largo plazo para garantizar el éxito y sostenibilidad del proyecto."
  }
]

const targetAudience = [
  "Organizaciones conservacionistas",
  "Gobiernos locales y nacionales",
  "Empresas con compromiso ambiental",
  "Comunidades locales",
  "Áreas protegidas",
  "Proyectos de compensación ambiental"
]

export default function ConservacionRestauracionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070"
            alt="Fondo"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">Servicio No - 06</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </div>
            <h1 className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6">
              Conservación y Restauración
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
                Ofrecemos soluciones integrales para la conservación de ecosistemas forestales y la restauración de áreas degradadas, utilizando técnicas científicamente probadas y enfoques adaptados a las condiciones locales.
              </p>
              <p className="text-[#1a3a5c]/70 text-lg mb-6 leading-relaxed">
                Nuestro enfoque combina la restauración ecológica con la participación de las comunidades locales, garantizando la sostenibilidad a largo plazo de los proyectos.
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
              Áreas de Especialización
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Soluciones integrales para la conservación y restauración de ecosistemas forestales
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
              Beneficios Ambientales y Sociales
            </h2>
            <p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg">
              Impacto positivo para la naturaleza y las comunidades
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
              Nuestra Metodología de Trabajo
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Un proceso integral para la restauración y conservación exitosa
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
                Nuestros servicios de conservación y restauración están diseñados para organizaciones, gobiernos y empresas que buscan generar impacto ambiental positivo y cumplir con sus compromisos de sostenibilidad.
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
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070"
                alt="Conservación forestal"
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
            ¿Listo para Generar Impacto Ambiental?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg mb-8">
            Contáctanos para desarrollar juntos proyectos de conservación y restauración exitosos
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
