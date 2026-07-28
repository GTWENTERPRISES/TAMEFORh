import { MetadataRoute } from "next"

/**
 * Genera el archivo robots.txt automáticamente
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://tamefor.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/*",
          "/plataforma-interna/*",
          "/aula-virtual/*",
          "/pagos/*",
          "/_next/*",
          "/admin/*",
          "/*.json$",
          "/*?*utm_*", // Evitar duplicados por parámetros UTM
        ],
      },
      {
        userAgent: "GPTBot", // OpenAI Bot
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot", // Common Crawl Bot
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai", // Claude Bot
        disallow: "/",
      },
      {
        userAgent: "Claude-Web", // Claude Web
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
