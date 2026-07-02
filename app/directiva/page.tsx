import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DirectivaPageClient } from "@/components/pages/DirectivaPageClient"
import { CampaignsSection } from "@/components/campaigns-section"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Directiva | TAMEFOR Los Ríos',
  description: 'Conoce a los profesionales que lideran el Colegio de Ingenieros Forestales de Los Ríos.',
}

export default function DirectivaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CampaignsSection />
      <DirectivaPageClient />
      <Footer />
    </main>
  )
}
