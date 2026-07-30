import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Noticias Forestales y Blog Ambiental | TAMEFOR Ecuador - Actualidad del Sector",
  description:
    "Blog especializado en gestión forestal, medio ambiente y sostenibilidad en Ecuador. Artículos técnicos, noticias del sector forestal, análisis de normativas ambientales, tendencias en conservación, cambio climático y mejores prácticas en gestión de recursos naturales. Contenido actualizado por expertos forestales.",
  keywords: [
    // Noticias y blog
    "noticias forestales Ecuador",
    "blog forestal Ecuador",
    "actualidad ambiental Ecuador",
    "noticias medio ambiente",
    
    // Temas técnicos
    "gestión forestal noticias",
    "legislación forestal Ecuador",
    "normativa ambiental Ecuador",
    "cambio climático Ecuador",
    "sostenibilidad forestal",
    
    // Temas de interés
    "conservación forestal Ecuador",
    "deforestación Ecuador",
    "reforestación noticias",
    "biodiversidad Ecuador",
    "servicios ecosistémicos",
    
    // Sector
    "sector forestal Ecuador",
    "industria maderera Ecuador",
    "certificación forestal",
    "TAMEFOR blog",
    
    // Educación
    "artículos técnicos forestales",
    "educación ambiental",
    "recursos forestales",
  ],
  openGraph: {
    title: "Blog y Noticias Forestales - TAMEFOR Ecuador",
    description:
      "Mantente informado sobre las últimas novedades del sector forestal y ambiental en Ecuador. Artículos técnicos escritos por profesionales expertos.",
    type: "website",
    locale: "es_EC",
    url: "https://tamefor.com/noticias",
    siteName: "TAMEFOR S.A.S B.I.C",
    images: [
      {
        url: "/og-noticias.jpg",
        width: 1200,
        height: 630,
        alt: "Noticias y Blog Forestal TAMEFOR Ecuador",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Forestal y Ambiental - TAMEFOR Ecuador",
    description: "Noticias, análisis y artículos técnicos sobre gestión forestal y medio ambiente en Ecuador",
    images: ["/og-noticias.jpg"],
    site: "@tamefor",
  },
  alternates: {
    canonical: "/noticias",
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

export default function NoticiasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

