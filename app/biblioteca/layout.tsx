import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Biblioteca Digital Forestal y Ambiental | TAMEFOR - Recursos Técnicos Gratuitos",
  description:
    "Biblioteca digital especializada con recursos forestales y ambientales de acceso gratuito: manuales técnicos de gestión forestal, guías prácticas de implementación ISO 14001, normativas ambientales actualizadas de Ecuador, documentos de certificación forestal, protocolos de inventarios forestales, material educativo para profesionales, plantillas descargables, estudios de caso y literatura científica forestal. Centro de conocimiento para profesionales del sector.",
  keywords: [
    // Recursos digitales
    "biblioteca forestal Ecuador",
    "recursos forestales digitales gratis",
    "descargas documentos forestales",
    "manuales forestales PDF",
    
    // Contenido específico
    "guías gestión forestal",
    "manuales técnicos forestales",
    "documentos ISO 14001 gratis",
    "normativa forestal Ecuador PDF",
    "legislación ambiental Ecuador",
    
    // Educación
    "material educativo forestal",
    "recursos capacitación forestal",
    "literatura forestal Ecuador",
    "publicaciones técnicas forestales",
    
    // Tipos de documentos
    "plantillas forestales descargables",
    "protocolos inventarios forestales",
    "formatos gestión ambiental",
    "estudios caso forestales",
  ],
  openGraph: {
    title: "Biblioteca Digital Forestal - TAMEFOR Ecuador",
    description:
      "Accede gratuitamente a recursos técnicos, manuales, guías y documentos especializados en gestión forestal y ambiental. Centro de conocimiento profesional.",
    type: "website",
    locale: "es_EC",
    url: "https://tamefor.com/biblioteca",
    siteName: "TAMEFOR S.A.S B.I.C",
    images: [
      {
        url: "/og-biblioteca.jpg",
        width: 1200,
        height: 630,
        alt: "Biblioteca Digital Forestal TAMEFOR",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biblioteca Forestal Digital - TAMEFOR",
    description: "Recursos técnicos gratuitos: manuales, guías, normativas y documentos forestales especializados",
    images: ["/og-biblioteca.jpg"],
    site: "@tamefor",
  },
  alternates: {
    canonical: "/biblioteca",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function BibliotecaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

