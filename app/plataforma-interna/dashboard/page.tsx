import { PlataformaDashboardClient } from "@/components/pages/PlataformaDashboardClient"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema de Gestión | Plataforma Interna TAMEFOR',
  description: 'Sistema de gestión interna de TAMEFOR S.A.S B.I.C.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PlataformaDashboardPage() {
  return <PlataformaDashboardClient />
}
