import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aula Virtual | TAMEFOR - Capacitación Forestal Online",
  description:
    "Plataforma de capacitación virtual en gestión forestal y ambiental. Cursos online certificados, material didáctico interactivo y formación profesional a distancia con certificación SENECYT.",
  keywords: [
    "aula virtual forestal",
    "capacitación online Ecuador",
    "cursos forestales virtuales",
    "educación a distancia forestal",
    "formación online ambiental",
    "e-learning forestal",
    "plataforma educativa TAMEFOR",
  ],
  openGraph: {
    title: "Aula Virtual - Capacitación Forestal Online | TAMEFOR",
    description:
      "Accede a cursos forestales certificados desde cualquier lugar. Formación profesional virtual con expertos del sector.",
    type: "website",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  twitter: {
    card: "summary",
    title: "Aula Virtual TAMEFOR - Capacitación Forestal Online",
    description: "Plataforma de formación virtual en gestión forestal y ambiental",
  },
  alternates: {
    canonical: "/aula-virtual",
  },
  robots: {
    index: false, // Área de usuarios registrados
    follow: true,
  },
}

export default function AulaVirtualLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

