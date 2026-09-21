import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCourseBySlug, coursesData } from "@/lib/coursesData"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'
import { CursoDetailClient } from "@/components/pages/CursoDetailClient"

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    slug: course.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) {
    return {
      title: 'Curso no encontrado | TAMEFOR Los Ríos',
    }
  }

  return {
    title: `${course.title} | TAMEFOR Los Ríos`,
    description: course.shortDescription,
  }
}

export default async function CursoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CursoDetailClient course={course} />
      <Footer />
    </main>
  )
}
