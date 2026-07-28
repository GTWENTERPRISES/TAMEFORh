import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto | TAMEFOR S.A.S B.I.C - Consultoría Forestal Ecuador",
  description:
    "Contáctanos para servicios de consultoría forestal y ambiental en Ecuador. Oficinas en Quito. Solicita cotizaciones para gestión forestal, certificación ISO 14001 y capacitaciones SENECYT.",
  keywords: [
    "contacto TAMEFOR",
    "consultoría forestal Ecuador contacto",
    "servicios ambientales Ecuador",
    "cotización consultoría ambiental",
    "asesoría forestal Quito",
    "contacto certificación ISO 14001",
  ],
  openGraph: {
    title: "Contacto - TAMEFOR Ecuador",
    description:
      "Comunícate con nuestros expertos en consultoría forestal y ambiental. Atención personalizada para tu proyecto.",
    type: "website",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  twitter: {
    card: "summary",
    title: "Contacto - TAMEFOR Ecuador",
    description: "Contacta a expertos en consultoría forestal y ambiental en Ecuador",
  },
  alternates: {
    canonical: "/contacto",
  },
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

