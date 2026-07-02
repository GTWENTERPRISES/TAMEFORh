import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CursosPageClient } from "@/components/pages/CursosPageClient"
import { CampaignsSection } from "@/components/campaigns-section"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cursos | TAMEFOR Los Ríos',
  description: 'Cursos avalados por el Ministerio del Trabajo y con código de registro en el SENECYT.',
}

export default function CursosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CampaignsSection />
      <CursosPageClient />
      <Footer />
    </main>
  )
}
