import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PoliticaPrivacidadPageClient } from "@/components/pages/PoliticaPrivacidadPageClient"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | TAMEFOR Los Ríos',
  description: 'Política de privacidad del Colegio de Ingenieros Forestales de Los Ríos.',
}

export default function PoliticaPrivacidadPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PoliticaPrivacidadPageClient />
      <Footer />
    </main>
  )
}
