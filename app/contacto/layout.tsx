import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto TAMEFOR | Consultoría Forestal Quito Ecuador - Solicita Cotización",
  description:
    "Contáctanos para servicios profesionales de consultoría forestal y ambiental en Ecuador. 📍 Oficinas en Quito 📞 Asesoría personalizada 💼 Cotizaciones sin compromiso. Especialistas en: certificación ISO 14001, gestión forestal, inventarios, auditorías ambientales, capacitaciones SENECYT, peritajes judiciales y topografía. Respuesta en 24 horas.",
  keywords: [
    // Contacto general
    "contacto TAMEFOR",
    "TAMEFOR Quito contacto",
    "consultoría forestal Ecuador contacto",
    "teléfono TAMEFOR",
    "correo TAMEFOR",
    
    // Servicios cotización
    "cotización consultoría ambiental",
    "cotización certificación ISO 14001",
    "presupuesto servicios forestales",
    "solicitar asesoría forestal",
    
    // Ubicación
    "oficina TAMEFOR Quito",
    "dirección TAMEFOR Ecuador",
    "consultoría forestal Quito dirección",
    
    // Servicios específicos contacto
    "contacto peritajes forestales",
    "asesoría ISO 14001 Ecuador",
    "contratar inventario forestal",
    "solicitar auditoría ambiental",
    "inscripción cursos SENECYT",
  ],
  openGraph: {
    title: "Contacto - TAMEFOR Consultoría Forestal Ecuador",
    description:
      "Comunícate con nuestros expertos en consultoría forestal y ambiental. Atención personalizada, cotizaciones rápidas y soluciones a medida para tu proyecto en Ecuador.",
    type: "website",
    locale: "es_EC",
    url: "https://tamefor.com/contacto",
    siteName: "TAMEFOR S.A.S B.I.C",
    images: [
      {
        url: "/og-contacto.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto TAMEFOR - Consultoría Forestal Ecuador",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contacto - TAMEFOR Consultoría Forestal Ecuador",
    description: "Solicita información sobre nuestros servicios forestales y ambientales. Oficinas en Quito",
    site: "@tamefor",
  },
  alternates: {
    canonical: "/contacto",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

