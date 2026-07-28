import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Biblioteca Digital Forestal | TAMEFOR - Recursos y Documentos",
  description:
    "Biblioteca digital con recursos forestales y ambientales: manuales técnicos, guías de gestión forestal, normativas ambientales Ecuador, documentos ISO 14001 y material educativo especializado.",
  keywords: [
    "biblioteca forestal Ecuador",
    "recursos forestales digitales",
    "manuales gestión forestal",
    "documentos ambientales",
    "normativa forestal Ecuador",
    "guías técnicas forestales",
    "material educativo forestal",
  ],
  openGraph: {
    title: "Biblioteca Digital Forestal - TAMEFOR Ecuador",
    description:
      "Accede a recursos técnicos, manuales y documentos especializados en gestión forestal y ambiental.",
    type: "website",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  twitter: {
    card: "summary",
    title: "Biblioteca Forestal Digital - TAMEFOR",
    description: "Recursos técnicos y documentos especializados en gestión forestal",
  },
  alternates: {
    canonical: "/biblioteca",
  },
}

export default function BibliotecaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

