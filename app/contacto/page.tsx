import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactoPageClient } from "@/components/pages/ContactoPageClient"
import { CampaignsSection } from "@/components/campaigns-section"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto | TAMEFOR Los Ríos',
  description: 'Ponte en contacto con el Colegio de Ingenieros Forestales de Los Ríos.',
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CampaignsSection />
      <ContactoPageClient />
      <Footer />
    </main>
  )
}
