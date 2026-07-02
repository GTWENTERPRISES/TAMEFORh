import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MiembrosPageClient } from "@/components/pages/MiembrosPageClient"
import { CampaignsSection } from "@/components/campaigns-section"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Miembros | TAMEFOR Los Ríos',
  description: 'Lista de miembros registrados del Colegio de Ingenieros Forestales de Los Ríos.',
}

export default function MiembrosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CampaignsSection />
      <MiembrosPageClient />
      <Footer />
    </main>
  )
}
