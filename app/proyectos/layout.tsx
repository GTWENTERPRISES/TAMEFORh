import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Proyectos Forestales | TAMEFOR - Portafolio Ecuador",
  description:
    "Portafolio de proyectos forestales y ambientales ejecutados por TAMEFOR en Ecuador. Casos de éxito en gestión forestal sostenible, reforestación, certificaciones ISO y conservación.",
  keywords: [
    "proyectos forestales Ecuador",
    "portafolio forestal",
    "casos de éxito TAMEFOR",
    "proyectos ambientales Ecuador",
    "reforestación Ecuador",
    "gestión forestal sostenible",
    "proyectos conservación",
  ],
  openGraph: {
    title: "Proyectos Forestales - TAMEFOR Ecuador",
    description:
      "Conoce nuestros proyectos exitosos en gestión forestal y ambiental. Experiencia comprobada en todo Ecuador.",
    type: "website",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos Forestales - TAMEFOR Ecuador",
    description: "Portafolio de proyectos exitosos en gestión forestal y ambiental",
  },
  alternates: {
    canonical: "/proyectos",
  },
}

export default function ProyectosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

