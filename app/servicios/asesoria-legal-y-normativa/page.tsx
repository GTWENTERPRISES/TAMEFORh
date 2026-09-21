import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceDetailClient } from "@/components/pages/ServiceDetailClient"
import { getServiceBySlug } from "@/lib/servicesData"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Peritajes Judiciales Acreditados | Servicios TAMEFOR",
  description: "Informes periciales oficiales con validez legal en procesos procesales y preprocesales, acreditados ante el Consejo de la Judicatura.",
}

export default function AsesoriaLegalPage() {
  const service = getServiceBySlug("asesoria-legal-y-normativa")

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
