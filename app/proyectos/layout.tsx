import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Proyectos Forestales y Ambientales | TAMEFOR - Portafolio de Éxito en Ecuador",
  description:
    "Portafolio completo de proyectos forestales y ambientales ejecutados exitosamente por TAMEFOR en Ecuador. Casos de éxito en: gestión forestal sostenible, programas de reforestación comercial, implementación de certificaciones ISO 14001, inventarios forestales de gran escala, auditorías ambientales empresariales, planes de manejo forestal, estudios de impacto ambiental, restauración de ecosistemas y conservación de biodiversidad. Proyectos verificables en sectores público y privado.",
  keywords: [
    // Proyectos generales
    "proyectos forestales Ecuador",
    "portafolio consultoría forestal",
    "casos éxito TAMEFOR",
    "proyectos ambientales Ecuador",
    "trabajos forestales realizados",
    
    // Tipos de proyectos
    "proyectos reforestación Ecuador",
    "proyectos conservación forestal",
    "certificación ISO 14001 casos",
    "inventarios forestales realizados",
    "auditorías ambientales portafolio",
    
    // Sectores
    "proyectos sector público Ecuador",
    "proyectos empresas privadas",
    "gestión forestal sostenible casos",
    
    // Resultados
    "experiencia comprobada forestal",
    "referencias consultoría ambiental",
    "testimonios clientes TAMEFOR",
  ],
  openGraph: {
    title: "Proyectos Forestales de Éxito - TAMEFOR Ecuador",
    description:
      "Conoce nuestro portafolio de proyectos exitosos en gestión forestal, certificaciones ISO, reforestación y conservación. Experiencia comprobada en todo Ecuador.",
    type: "website",
    locale: "es_EC",
    url: "https://tamefor.com/proyectos",
    siteName: "TAMEFOR S.A.S B.I.C",
    images: [
      {
        url: "/og-proyectos.jpg",
        width: 1200,
        height: 630,
        alt: "Proyectos Forestales TAMEFOR Ecuador",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio de Proyectos Forestales - TAMEFOR Ecuador",
    description: "Casos de éxito en gestión forestal sostenible, certificaciones y conservación en Ecuador",
    images: ["/og-proyectos.jpg"],
    site: "@tamefor",
  },
  alternates: {
    canonical: "/proyectos",
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

export default function ProyectosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

