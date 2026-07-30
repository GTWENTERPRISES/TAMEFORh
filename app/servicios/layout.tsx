import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios de Consultoría Forestal y Ambiental | TAMEFOR Ecuador - ISO 14001",
  description:
    "Servicios profesionales integrales de consultoría forestal y ambiental en Ecuador: ✓ Certificación ISO 14001 ✓ Gestión Forestal Sostenible ✓ Inventarios Forestales ✓ Auditorías Ambientales ✓ Peritajes Judiciales ✓ Topografía ✓ Planes de Manejo ✓ Estudios de Impacto Ambiental ✓ Conservación y Restauración. +10 años de experiencia. Soluciones personalizadas en Quito y todo Ecuador.",
  keywords: [
    // Certificaciones y auditorías
    "certificación ISO 14001 Ecuador",
    "auditoría ambiental Ecuador",
    "sistema gestión ambiental Ecuador",
    "consultoría ISO 14001",
    "implementación ISO 14001",
    
    // Gestión forestal
    "gestión forestal sostenible Ecuador",
    "planes de manejo forestal",
    "consultoría forestal Ecuador",
    "servicios forestales profesionales",
    "asesoría forestal Ecuador",
    
    // Servicios técnicos
    "inventarios forestales Ecuador",
    "levantamiento topográfico forestal",
    "topografía forestal Ecuador",
    "cubicación madera",
    "medición forestal",
    
    // Servicios legales
    "peritajes forestales judiciales Ecuador",
    "peritaje ambiental Ecuador",
    "avalúos forestales",
    
    // Proyectos
    "estudios impacto ambiental Ecuador",
    "licencia ambiental Ecuador",
    "plantaciones comerciales Ecuador",
    "reforestación comercial",
    
    // Conservación
    "conservación forestal Ecuador",
    "restauración ecosistemas",
    "servicios ecosistémicos",
    "gestión recursos naturales",
    
    // Capacitación
    "capacitación ambiental empresas",
    "desarrollo profesional forestal",
    
    // Ubicación
    "consultoría ambiental Quito",
    "servicios forestales Quito Ecuador",
    "TAMEFOR servicios",
  ],
  openGraph: {
    title: "Servicios de Consultoría Forestal Profesional - TAMEFOR Ecuador",
    description:
      "Soluciones integrales en gestión forestal y ambiental: Certificación ISO 14001, inventarios, auditorías, peritajes judiciales, topografía y más. Experiencia comprobada en todo Ecuador.",
    type: "website",
    locale: "es_EC",
    url: "https://tamefor.com/servicios",
    siteName: "TAMEFOR S.A.S B.I.C",
    images: [
      {
        url: "/og-servicios.jpg",
        width: 1200,
        height: 630,
        alt: "Servicios de Consultoría Forestal y Ambiental TAMEFOR",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios Forestales y Ambientales Profesionales - TAMEFOR",
    description: "Consultoría integral: ISO 14001, gestión forestal, inventarios, auditorías y más en Ecuador",
    images: ["/og-servicios.jpg"],
    site: "@tamefor",
  },
  alternates: {
    canonical: "/servicios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

