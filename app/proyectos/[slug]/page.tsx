import { getProjectBySlug, projectsData } from "@/lib/projectsData"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProyectoDetailClient } from "@/components/pages/ProyectoDetailClient"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  
  if (!project) {
    return {
      title: 'Proyecto no encontrado | TAMEFOR Ecuador',
    }
  }

  return {
    title: `${project.title} | Proyectos TAMEFOR Ecuador`,
    description: project.shortDescription,
  }
}

export default async function ProyectoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProyectoDetailClient project={project} />
      <Footer />
    </main>
  )
}
