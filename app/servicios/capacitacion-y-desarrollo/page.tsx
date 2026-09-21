import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceDetailClient } from "@/components/pages/ServiceDetailClient"
import { getServiceBySlug } from "@/lib/servicesData"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Capacitación y Formación Técnica | Servicios TAMEFOR",
  description: "Programas teóricos y prácticos orientados a la formación continua de profesionales en geomática, tecnología forestal y gestión ambiental.",
}

export default function CapacitacionPage() {
  const service = getServiceBySlug("capacitacion-y-desarrollo")

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
