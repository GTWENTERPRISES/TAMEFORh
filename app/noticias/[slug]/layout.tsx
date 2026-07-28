import type { Metadata } from "next"

// Los metadatos dinámicos se generan en page.tsx con generateMetadata
// Este layout proporciona metadatos base para artículos individuales

export const metadata: Metadata = {
  openGraph: {
    type: "article",
    locale: "es_EC",
    siteName: "TAMEFOR S.A.S B.I.C",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/noticias",
  },
}

export default function NoticiaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
