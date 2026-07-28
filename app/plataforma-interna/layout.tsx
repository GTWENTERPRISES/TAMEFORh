import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plataforma Interna | TAMEFOR - Área Privada",
  description:
    "Acceso a la plataforma interna de TAMEFOR para miembros, estudiantes y colaboradores. Panel de control, recursos exclusivos y herramientas de gestión.",
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

