import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BibliotecaPageClient } from "@/components/pages/BibliotecaPageClient"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biblioteca Digital | TAMEFOR Los Ríos',
  description: 'Accede a nuestra biblioteca digital con recursos forestales especializados.',
}

export default function BibliotecaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BibliotecaPageClient />
      <Footer />
    </main>
  )
}
