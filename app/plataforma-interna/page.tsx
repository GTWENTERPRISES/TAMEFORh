import { PlataformaInternaPageClient } from "@/components/pages/PlataformaInternaPageClient"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plataforma Interna | TAMEFOR',
  description: 'Acceso a la plataforma interna de TAMEFOR S.A.S B.I.C.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PlataformaInternaPage() {
  return <PlataformaInternaPageClient />
}
