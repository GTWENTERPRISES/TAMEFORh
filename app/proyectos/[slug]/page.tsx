import { getProjectBySlug, projectsData } from "@/lib/projectsData"
import { ProyectoPageClient } from "@/components/pages/ProyectoPageClient"
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
      title: 'Proyecto no encontrado | TAMEFOR Los Ríos',
    }
  }

  return {
    title: `${project.title} | TAMEFOR Los Ríos`,
    description: project.shortDescription,
  }
}

export default async function ProyectoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProyectoPageClient project={project} />
}
