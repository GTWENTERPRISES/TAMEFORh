import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios Forestales y Ambientales | TAMEFOR Ecuador",
  description:
    "Servicios profesionales de consultoría forestal y ambiental en Ecuador: Gestión forestal, certificación ISO 14001, auditorías ambientales, inventarios forestales, peritajes judiciales, topografía y más.",
  keywords: [
    "servicios forestales Ecuador",
    "consultoría ambiental Ecuador",
    "gestión forestal",
    "certificación ISO 14001",
    "auditoría ambiental",
    "inventario forestal",
    "peritaje forestal",
    "topografía forestal",
    "plantaciones comerciales",
    "conservación forestal",
  ],
  openGraph: {
    title: "Servicios Forestales Profesionales - TAMEFOR Ecuador",
    description:
      "Consultoría integral forestal y ambiental: gestión, certificaciones, auditorías, inventarios y más. Soluciones personalizadas para tu empresa.",
    type: "website",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios Forestales y Ambientales - TAMEFOR",
    description: "Consultoría profesional forestal y ambiental en Ecuador",
  },
  alternates: {
    canonical: "/servicios",
  },
}

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

