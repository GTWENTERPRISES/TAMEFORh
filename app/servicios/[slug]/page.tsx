import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceDetailClient } from "@/components/pages/ServiceDetailClient"
import { getServiceBySlug, getAllServices } from "@/lib/servicesData"

interface ServicePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const services = getAllServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    return {
      title: "Servicio no encontrado | TAMEFOR",
    }
  }

  return {
    title: `${service.title} | Servicios TAMEFOR`,
    description: service.shortDescription,
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug)

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
