import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProyectosPageClient } from "@/components/pages/ProyectosPageClient"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proyectos | TAMEFOR Los Ríos',
  description: 'Conoce los proyectos forestales y ambientales que desarrollamos en la Provincia de Los Ríos.',
}

export default function ProyectosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProyectosPageClient />
      <Footer />
    </main>
  )
}
