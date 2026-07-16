import { getNewsBySlug, newsData } from "@/lib/newsData"
import { NoticiaPageClient } from "@/components/pages/NoticiaPageClient"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return newsData.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getNewsBySlug(slug)
  
  if (!article) {
    return {
      title: 'Noticia no encontrada | TAMEFOR Los Ríos',
    }
  }

  return {
    title: `${article.title} | TAMEFOR Los Ríos`,
    description: article.excerpt,
  }
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getNewsBySlug(slug)

  if (!article) {
    notFound()
  }

  return <NoticiaPageClient article={article} />
}
