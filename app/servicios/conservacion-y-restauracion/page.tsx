import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceDetailClient } from "@/components/pages/ServiceDetailClient"
import { getServiceBySlug } from "@/lib/servicesData"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Conservación y Restauración Ambiental | Servicios TAMEFOR",
  description: "Proyectos de restauración ecológica, reforestación y conservación de ecosistemas naturales con enfoque sostenible.",
}

export default function ConservacionRestauracionPage() {
  const service = getServiceBySlug("conservacion-y-restauracion")

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
