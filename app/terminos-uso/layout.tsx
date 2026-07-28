import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos de Uso | TAMEFOR S.A.S B.I.C",
  description:
    "Términos y condiciones de uso del sitio web y servicios de TAMEFOR S.A.S B.I.C. Lee las condiciones legales para el uso de nuestros servicios forestales y ambientales.",
  keywords: [
    "términos de uso TAMEFOR",
    "condiciones de servicio",
    "términos legales Ecuador",
    "condiciones de uso web",
  ],
  openGraph: {
    title: "Términos de Uso - TAMEFOR",
    description: "Términos y condiciones de uso de servicios de TAMEFOR S.A.S B.I.C",
    type: "website",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  alternates: {
    canonical: "/terminos-uso",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TerminosUsoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

