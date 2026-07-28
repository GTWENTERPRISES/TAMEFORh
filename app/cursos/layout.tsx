import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cursos y Capacitaciones Forestales | TAMEFOR - Certificación SENECYT",
  description:
    "Cursos de capacitación forestal y ambiental certificados por SENECYT en Ecuador. Formación profesional en gestión forestal, sistemas ISO 14001, topografía y más. Modalidad presencial y virtual.",
  keywords: [
    "cursos forestales Ecuador",
    "capacitación forestal certificada",
    "cursos SENECYT",
    "formación ambiental Ecuador",
    "cursos gestión forestal",
    "capacitación ISO 14001",
    "cursos topografía forestal",
    "educación forestal Ecuador",
  ],
  openGraph: {
    title: "Cursos Forestales Certificados - TAMEFOR Ecuador",
    description:
      "Capacitaciones profesionales en gestión forestal y ambiental certificadas por SENECYT. Mejora tus competencias con expertos del sector.",
    type: "website",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos Forestales Certificados SENECYT - TAMEFOR",
    description: "Capacitaciones profesionales en gestión forestal y ambiental en Ecuador",
  },
  alternates: {
    canonical: "/cursos",
  },
}

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

