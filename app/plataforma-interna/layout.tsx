import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plataforma Interna | TAMEFOR TAPIA & MENA SOLUCIONES FORESTALES Y AMBIENTALES S.A.S. B.I.C - Área Privada",
  description:
    "Acceso a la plataforma interna de TAMEFOR TAPIA & MENA SOLUCIONES FORESTALES Y AMBIENTALES S.A.S. B.I.C para miembros, estudiantes y colaboradores. Panel de control, recursos exclusivos y herramientas de gestión.",
  robots: {
    index: false, // Área privada
    follow: false,
  },
  alternates: {
    canonical: "/plataforma-interna",
  },
}

export default function PlataformaInternaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

