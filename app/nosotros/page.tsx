import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from 'next'
import { NosotrosPageClient } from "@/components/pages/NosotrosPageClient"

export const metadata: Metadata = {
  title: 'Nosotros | TAMEFOR Los Ríos',
  description: 'Conoce al Colegio de Ingenieros Forestales de Los Ríos y nuestra misión de promover el desarrollo sostenible del sector forestal.',
}

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <NosotrosPageClient />
      <Footer />
    </main>
  )
}
