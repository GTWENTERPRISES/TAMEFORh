import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceDetailClient } from "@/components/pages/ServiceDetailClient"
import { getServiceBySlug } from "@/lib/servicesData"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Certificación Profesional | Servicios TAMEFOR",
  description: "Proceso de certificación y registro profesional para ingenieros forestales, cumpliendo con los estándares del SENECYT y el Ministerio del Trabajo.",
}

export default function CertificacionProfesionalPage() {
  const service = getServiceBySlug("certificacion-profesional")

  if (!service) {
    notFound()
  }

  return (
    <>
      <Header />
      <ServiceDetailClient service={service} />
      <Footer />
    </>
  )
}
