import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EquipoPageClient } from "@/components/pages/EquipoPageClient"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Equipo de Trabajo | TAMEFOR',
  description: 'Conoce a los profesionales que conforman el equipo de TAMEFOR S.A.S B.I.C.',
}

export default function EquipoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <EquipoPageClient />
      <Footer />
    </main>
  )
}
