import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceDetailClient } from "@/components/pages/ServiceDetailClient"
import { getServiceBySlug } from "@/lib/servicesData"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Consultoría y Gestión Ambiental | Servicios TAMEFOR",
  description: "Evaluación de riesgos, diagnósticos de cumplimiento y regularización ambiental para empresas y proyectos.",
}

export default function ConsultoriaTecnicaPage() {
  const service = getServiceBySlug("consultoria-tecnica")

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
