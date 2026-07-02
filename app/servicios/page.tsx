import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiciosPageClient } from "@/components/pages/ServiciosPageClient"
import { CampaignsSection } from "@/components/campaigns-section"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios | TAMEFOR Los Ríos',
  description: 'Servicios especializados para el desarrollo y fortalecimiento del sector forestal.',
}


export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CampaignsSection />
      <ServiciosPageClient />
      <Footer />
    </main>
  )
}
