import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad | TAMEFOR S.A.S B.I.C",
  description:
    "Política de privacidad y protección de datos personales de TAMEFOR S.A.S B.I.C. Conoce cómo protegemos tu información de acuerdo con la legislación ecuatoriana.",
  keywords: [
    "política de privacidad TAMEFOR",
    "protección de datos Ecuador",
    "privacidad de datos personales",
    "GDPR Ecuador",
  ],
  openGraph: {
    title: "Política de Privacidad - TAMEFOR",
    description: "Política de protección de datos personales de TAMEFOR S.A.S B.I.C",
    type: "website",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  alternates: {
    canonical: "/politica-privacidad",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PoliticaPrivacidadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

