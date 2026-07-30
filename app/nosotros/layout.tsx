import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre TAMEFOR | Empresa Líder en Consultoría Forestal Ecuador - Nuestra Historia",
  description:
    "Conoce TAMEFOR S.A.S B.I.C, empresa líder en consultoría forestal y ambiental en Ecuador con más de 10 años de experiencia. Equipo multidisciplinario de ingenieros forestales, ambientales y especialistas certificados. Misión: promover la gestión forestal sostenible. Visión: ser referente en servicios ambientales en Ecuador. Valores: excelencia, sostenibilidad, innovación y compromiso. Miembros activos de gremios forestales nacionales.",
  keywords: [
    // Empresa
    "TAMEFOR Ecuador",
    "empresa forestal Ecuador",
    "consultoría ambiental Ecuador empresa",
    "quiénes somos TAMEFOR",
    "sobre TAMEFOR",
    
    // Historia y experiencia
    "experiencia consultoría forestal",
    "trayectoria TAMEFOR",
    "años experiencia forestal Ecuador",
    
    // Equipo
    "equipo profesional forestal Ecuador",
    "ingenieros forestales Ecuador",
    "consultores ambientales certificados",
    "expertos gestión forestal",
    
    // Valores corporativos
    "empresa sostenible Ecuador",
    "consultoría responsable",
    "BIC Ecuador",
    "empresa beneficio interés colectivo",
    
    // Filosofía
    "misión visión TAMEFOR",
    "valores empresa forestal",
    "compromiso ambiental empresa",
  ],
  openGraph: {
    title: "Sobre TAMEFOR - Empresa Líder en Consultoría Forestal Ecuador",
    description:
      "Más de 10 años liderando la consultoría forestal y ambiental en Ecuador. Equipo experto, compromiso con la sostenibilidad y soluciones innovadoras en cada proyecto.",
    type: "website",
    locale: "es_EC",
    url: "https://tamefor.com/nosotros",
    siteName: "TAMEFOR S.A.S B.I.C",
    images: [
      {
        url: "/og-nosotros.jpg",
        width: 1200,
        height: 630,
        alt: "Equipo TAMEFOR - Consultoría Forestal Ecuador",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros - TAMEFOR Ecuador",
    description: "Conoce nuestra trayectoria de más de 10 años en consultoría forestal y ambiental en Ecuador",
    images: ["/og-nosotros.jpg"],
    site: "@tamefor",
  },
  alternates: {
    canonical: "/nosotros",
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

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

