import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TerminosUsoPageClient } from "@/components/pages/TerminosUsoPageClient"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Uso | TAMEFOR Los Ríos',
  description: 'Términos y condiciones de uso del sitio web de TAMEFOR Los Ríos.',
}

export default function TerminosUsoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <TerminosUsoPageClient />
      <Footer />
    </main>
  )
}
