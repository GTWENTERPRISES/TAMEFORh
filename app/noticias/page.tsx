import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NoticiasPageClient } from "@/components/pages/NoticiasPageClient"
import { CampaignsSection } from "@/components/campaigns-section"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Noticias | TAMEFOR Los Ríos',
  description: 'Mantente informado sobre las novedades y desarrollos en el ámbito forestal.',
}

export default function NoticiasPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CampaignsSection />
      <NoticiasPageClient />
      <Footer />
    </main>
  )
}
