import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceDetailClient } from "@/components/pages/ServiceDetailClient"
import { getServiceBySlug } from "@/lib/servicesData"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Consultoría y Manejo Forestal | Servicios TAMEFOR",
  description: "Cuantificación, valoración y aprovechamiento sostenible de existencias maderables en bosques naturales y plantaciones comerciales.",
}

export default function GestionForestalPage() {
  const service = getServiceBySlug("gestion-forestal")

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
