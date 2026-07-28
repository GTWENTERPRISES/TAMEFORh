// Datos estructurados JSON-LD para SEO mejorado
// https://schema.org/

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TAMEFOR S.A.S B.I.C",
  legalName: "TAMEFOR S.A.S Beneficio e Interés Colectivo",
  url: "https://tamefor.com",
  logo: "https://tamefor.com/logo.png",
  description:
    "Empresa líder en consultoría forestal y ambiental en Ecuador. Especializada en gestión forestal sostenible, certificaciones ISO 14001 y capacitación profesional.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Quito",
    addressCountry: "EC",
    addressRegion: "Pichincha",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    availableLanguage: ["Spanish"],
    email: "info@tamefor.com",
  },
  sameAs: [
    // Agregar enlaces a redes sociales
    "https://www.linkedin.com/company/tamefor",
    "https://www.facebook.com/tamefor",
    "https://twitter.com/tamefor",
  ],
  areaServed: {
    "@type": "Country",
    name: "Ecuador",
  },
  knowsAbout: [
    "Gestión Forestal",
    "Consultoría Ambiental",
    "Certificación ISO 14001",
    "Capacitación Forestal",
    "Auditoría Ambiental",
    "Conservación Forestal",
  ],
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TAMEFOR",
  url: "https://tamefor.com",
  description:
    "Consultoría forestal y ambiental profesional en Ecuador. Servicios especializados para empresas.",
  publisher: {
    "@type": "Organization",
    name: "TAMEFOR S.A.S B.I.C",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://tamefor.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
}

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `https://tamefor.com${item.url}`,
  })),
})

export const courseSchema = (course: {
  name: string
  description: string
  provider: string
  url: string
  price?: number
  currency?: string
  duration?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: course.name,
  description: course.description,
  provider: {
    "@type": "Organization",
    name: course.provider,
    sameAs: "https://tamefor.com",
  },
  url: course.url,
  ...(course.price && {
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: course.currency || "USD",
    },
  }),
  ...(course.duration && {
    timeRequired: course.duration,
  }),
  educationalCredentialAwarded: "Certificación SENECYT",
  inLanguage: "es-EC",
})

export const articleSchema = (article: {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  url: article.url,
  ...(article.image && { image: article.image }),
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    "@type": "Organization",
    name: article.author || "TAMEFOR S.A.S B.I.C",
  },
  publisher: {
    "@type": "Organization",
    name: "TAMEFOR S.A.S B.I.C",
    logo: {
      "@type": "ImageObject",
      url: "https://tamefor.com/logo.png",
    },
  },
  inLanguage: "es-EC",
})

export const serviceSchema = (service: {
  name: string
  description: string
  url: string
  serviceType: string
  areaServed?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  url: service.url,
  serviceType: service.serviceType,
  provider: {
    "@type": "Organization",
    name: "TAMEFOR S.A.S B.I.C",
  },
  areaServed: {
    "@type": "Country",
    name: service.areaServed || "Ecuador",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: service.url,
  },
})

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
})

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "TAMEFOR S.A.S B.I.C",
  image: "https://tamefor.com/logo.png",
  "@id": "https://tamefor.com",
  url: "https://tamefor.com",
  telephone: "+593-XXX-XXXX", // Reemplazar con número real
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dirección completa", // Reemplazar con dirección real
    addressLocality: "Quito",
    addressRegion: "Pichincha",
    postalCode: "XXXXX", // Reemplazar con código postal
    addressCountry: "EC",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -0.1807, // Reemplazar con coordenadas reales
    longitude: -78.4678,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  sameAs: [
    "https://www.linkedin.com/company/tamefor",
    "https://www.facebook.com/tamefor",
  ],
}
