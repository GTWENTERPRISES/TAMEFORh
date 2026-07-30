import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cursos y Capacitaciones Forestales Certificados | TAMEFOR - SENECYT Ecuador",
  description:
    "Cursos de capacitación forestal y ambiental certificados por SENECYT y Ministerio del Trabajo. Formación profesional en: Modelación y Biometría, SIG, Negocios Verdes, Derecho Ambiental, Nutrición Vegetal, Gestión de Riesgos HSE. Modalidad virtual 100%. Instructores expertos. Certificación permanente válida en Ecuador.",
  keywords: [
    // Cursos específicos
    "cursos forestales certificados SENECYT",
    "capacitación forestal Ecuador",
    "cursos ambientales Ecuador",
    "formación profesional forestal",
    "cursos SIG Ecuador",
    "curso modelación biometría forestal",
    "curso derecho ambiental Ecuador",
    "capacitación ISO 14001",
    
    // Certificaciones
    "certificación SENECYT Ecuador",
    "cursos Ministerio Trabajo Ecuador",
    "capacitación continua forestal",
    "certificados forestales válidos",
    
    // Modalidad
    "cursos virtuales forestales",
    "capacitación online ambiental",
    "formación a distancia forestal",
    
    // Términos relacionados
    "educación forestal Ecuador",
    "TAMEFOR capacitación",
    "cursos profesionales forestales",
    "desarrollo profesional forestal",
  ],
  openGraph: {
    title: "Cursos Forestales Certificados SENECYT - TAMEFOR Ecuador",
    description:
      "Capacitaciones profesionales certificadas por SENECYT y Ministerio del Trabajo. SIG, Biometría, Derecho Ambiental, Negocios Verdes y más. Modalidad virtual con certificación permanente.",
    type: "website",
    locale: "es_EC",
    url: "https://tamefor.com/cursos",
    siteName: "TAMEFOR S.A.S B.I.C",
    images: [
      {
        url: "/og-cursos.jpg",
        width: 1200,
        height: 630,
        alt: "Cursos Forestales Certificados TAMEFOR Ecuador",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos Forestales Certificados SENECYT - TAMEFOR",
    description: "Formación profesional en gestión forestal con certificación válida en Ecuador",
    images: ["/og-cursos.jpg"],
    site: "@tamefor",
  },
  alternates: {
    canonical: "/cursos",
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

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

