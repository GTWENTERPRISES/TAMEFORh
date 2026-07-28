import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiciosPageClient } from "@/components/pages/ServiciosPageClient"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios | TAMEFOR Los Ríos',
  description: 'Servicios especializados para el desarrollo y fortalecimiento del sector forestal.',
}


export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ServiciosPageClient />
      <Footer />
    </main>
  )
}
