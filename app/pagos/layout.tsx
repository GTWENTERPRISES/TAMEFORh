import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pagos y Facturación | TAMEFOR Ecuador",
  description:
    "Sistema de pagos en línea para servicios y cursos de TAMEFOR. Procesa de forma segura pagos de consultoría forestal, capacitaciones y servicios ambientales en Ecuador.",
  keywords: [
    "pagos TAMEFOR",
    "pago cursos forestales",
    "facturación servicios ambientales",
    "pago en línea Ecuador",
    "factura electrónica TAMEFOR",
  ],
  openGraph: {
    title: "Pagos y Facturación - TAMEFOR Ecuador",
    description: "Sistema de pagos seguro para servicios forestales y capacitaciones.",
    type: "website",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  twitter: {
    card: "summary",
    title: "Pagos - TAMEFOR Ecuador",
    description: "Sistema de pagos en línea para servicios forestales",
  },
  alternates: {
    canonical: "/pagos",
  },
  robots: {
    index: false, // Página de transacciones
    follow: false,
  },
}

export default function PagosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

