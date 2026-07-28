import type { Metadata } from "next"

/**
 * Utilidades para generar metadatos SEO consistentes
 */

export const SITE_NAME = "TAMEFOR S.A.S B.I.C"
export const SITE_URL = "https://tamefor.com"
export const SITE_DESCRIPTION =
  "Consultoría forestal y ambiental profesional en Ecuador. Certificación ISO 14001, capacitaciones SENECYT, gestión forestal sostenible."

export const DEFAULT_OG_IMAGE = "/og-image.jpg"
export const TWITTER_HANDLE = "@tamefor"

/**
 * Genera metadatos completos para una página
 */
export function generatePageMetadata({
  title,
  description,
  keywords,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
}: {
  title: string
  description: string
  keywords?: string[]
  path: string
  image?: string
  type?: "website" | "article"
  noindex?: boolean
}): Metadata {
  const url = `${SITE_URL}${path}`

  return {
    title,
    description,
    ...(keywords && { keywords }),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "es_EC",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
      creator: TWITTER_HANDLE,
    },
    alternates: {
      canonical: url,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  }
}

/**
 * Genera metadatos para artículos o blog posts
 */
export function generateArticleMetadata({
  title,
  description,
  keywords,
  path,
  image = DEFAULT_OG_IMAGE,
  publishedTime,
  modifiedTime,
  authors = [SITE_NAME],
  tags,
}: {
  title: string
  description: string
  keywords?: string[]
  path: string
  image?: string
  publishedTime: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
}): Metadata {
  const url = `${SITE_URL}${path}`

  return {
    title,
    description,
    ...(keywords && { keywords }),
    authors: authors.map((name) => ({ name })),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "es_EC",
      type: "article",
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors,
      ...(tags && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
      creator: TWITTER_HANDLE,
    },
    alternates: {
      canonical: url,
    },
  }
}

/**
 * Genera un sitemap entry
 */
export function generateSitemapEntry({
  path,
  lastModified,
  changeFrequency = "monthly",
  priority = 0.5,
}: {
  path: string
  lastModified?: Date | string
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}) {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: lastModified || new Date(),
    changeFrequency,
    priority,
  }
}

/**
 * Keywords base para todas las páginas de TAMEFOR
 */
export const BASE_KEYWORDS = [
  "TAMEFOR",
  "consultoría forestal Ecuador",
  "consultoría ambiental Ecuador",
  "gestión forestal",
  "certificación ISO 14001",
  "capacitación forestal",
  "SENECYT",
]

/**
 * Combina keywords base con keywords específicas
 */
export function combineKeywords(specificKeywords: string[]): string[] {
  return [...BASE_KEYWORDS, ...specificKeywords]
}

/**
 * Trunca texto para meta description (155-160 caracteres)
 */
export function truncateDescription(text: string, maxLength = 155): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3).trim() + "..."
}

/**
 * Genera slug SEO-friendly desde texto
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Normaliza caracteres con acentos
    .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
    .replace(/[^a-z0-9]+/g, "-") // Reemplaza caracteres especiales con guiones
    .replace(/^-+|-+$/g, "") // Elimina guiones al inicio/final
}

/**
 * Valida y limpia URLs para canonical
 */
export function cleanCanonicalUrl(path: string): string {
  // Elimina query params y fragments
  const cleanPath = path.split("?")[0].split("#")[0]
  // Elimina trailing slash excepto para la raíz
  return cleanPath === "/" ? cleanPath : cleanPath.replace(/\/$/, "")
}
