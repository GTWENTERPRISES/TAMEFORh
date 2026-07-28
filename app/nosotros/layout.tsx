import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nosotros | TAMEFOR S.A.S B.I.C - Empresa Forestal Ecuador",
  description:
    "Conoce TAMEFOR S.A.S B.I.C, empresa líder en consultoría forestal y ambiental en Ecuador. Más de 10 años de experiencia en gestión forestal sostenible, certificaciones ambientales y desarrollo de proyectos.",
  keywords: [
    "TAMEFOR Ecuador",
    "empresa forestal Ecuador",
    "consultoría ambiental Ecuador",
    "quiénes somos TAMEFOR",
    "historia empresa forestal",
    "misión visión TAMEFOR",
    "equipo profesional forestal",
  ],
  openGraph: {
    title: "Sobre TAMEFOR - Consultoría Forestal Ecuador",
    description:
      "Empresa líder en consultoría forestal y ambiental en Ecuador. Experiencia, compromiso y sostenibilidad en cada proyecto.",
    type: "website",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  twitter: {
    card: "summary",
    title: "Nosotros - TAMEFOR Ecuador",
    description: "Conoce nuestra trayectoria en consultoría forestal y ambiental",
  },
  alternates: {
    canonical: "/nosotros",
  },
}

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

