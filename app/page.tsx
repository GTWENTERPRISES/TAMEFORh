import { Metadata } from "next"
import { HomePageClient } from "@/components/pages/HomePageClient"
import { organizationSchema, websiteSchema } from "@/lib/structuredData"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <>
      {/* Datos estructurados JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <HomePageClient />
    </>
  )
}
