import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PagosPageClient } from "@/components/pages/PagosPageClient"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagos | TAMEFOR Los Ríos',
  description: 'Sistema de pagos y aportaciones del Colegio de Ingenieros Forestales de Los Ríos.',
}

export default function PagosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PagosPageClient />
      <Footer />
    </main>
  )
}
