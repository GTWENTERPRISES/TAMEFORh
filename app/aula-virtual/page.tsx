import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AulaVirtualPageClient } from "@/components/pages/AulaVirtualPageClient"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aula Virtual | TAMEFOR Los Ríos',
  description: 'Accede a nuestra aula virtual para participar en cursos y eventos en línea.',
}

export default function AulaVirtualPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AulaVirtualPageClient />
      <Footer />
    </main>
  )
}
