import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlataformaInternaPageClient } from "@/components/pages/PlataformaInternaPageClient"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plataforma Interna | TAMEFOR Los Ríos',
  description: 'Acceso a la plataforma interna para miembros del Colegio de Ingenieros Forestales de Los Ríos.',
}

export default function PlataformaInternaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PlataformaInternaPageClient />
      <Footer />
    </main>
  )
}
