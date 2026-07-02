import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getNewsBySlug, newsData } from "@/lib/newsData"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return newsData.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getNewsBySlug(params.slug)
  
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

export default function NoticiaPage({ params }: { params: { slug: string } }) {
  const article = getNewsBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Article Header */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/noticias">
              <Button variant="ghost" className="mb-6 text-primary hover:text-primary/80">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a noticias
              </Button>
            </Link>
            
            <div className="mb-6">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                {article.category.toUpperCase()}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(article.publishDate).toLocaleDateString('es-ES', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{article.author.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="mb-12 rounded-xl overflow-hidden">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-auto"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-sm font-semibold text-foreground mb-4">Etiquetas:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
