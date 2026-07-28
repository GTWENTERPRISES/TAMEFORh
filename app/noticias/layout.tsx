import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Noticias y Blog Forestal | TAMEFOR Ecuador",
  description:
    "Últimas noticias sobre gestión forestal, medio ambiente y sostenibilidad en Ecuador. Artículos técnicos, novedades del sector forestal, normativas ambientales y tendencias en conservación.",
  keywords: [
    "noticias forestales Ecuador",
    "blog forestal",
    "actualidad ambiental Ecuador",
    "gestión forestal noticias",
    "legislación forestal Ecuador",
    "medio ambiente Ecuador",
    "conservación forestal",
    "sostenibilidad ambiental",
  ],
  openGraph: {
    title: "Noticias Forestales y Ambientales - TAMEFOR Ecuador",
    description:
      "Mantente informado sobre las últimas novedades del sector forestal y ambiental en Ecuador. Artículos de expertos.",
    type: "website",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Forestal - TAMEFOR Ecuador",
    description: "Noticias y artículos sobre gestión forestal y medio ambiente",
  },
  alternates: {
    canonical: "/noticias",
  },
}

export default function NoticiasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

