import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, Users, DollarSign, Target, CheckCircle, ArrowLeft, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getProjectBySlug, projectsData } from "@/lib/projectsData"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  
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

export default function ProyectoPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const statusLabels = {
    'en-curso': { label: 'Proyecto Activo', color: 'bg-[#3d9a8b]' },
    'completado': { label: 'Proyecto Completado', color: 'bg-white' },
    'planificado': { label: 'Proyecto Planificado', color: 'bg-[#1a3a5c]' }
  }

  const statusInfo = statusLabels[project.status]

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Project Header */}
      <section className="py-20 bg-gradient-to-br from-[#1a3a5c]/10 to-[#3d9a8b]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/proyectos">
              <Button variant="ghost" className="mb-6 text-[#1a3a5c] hover:text-[#1a3a5c]/80">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a proyectos
              </Button>
            </Link>
            
            <div className="mb-6">
              <span className={`${statusInfo.color} text-white text-xs font-semibold px-4 py-2 rounded-full inline-block`}>
                {statusInfo.label}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-xl text-muted-foreground mb-6">{project.subtitle}</p>
            )}
            <p className="text-lg text-muted-foreground">{project.shortDescription}</p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-4">
                    Descripción del Proyecto
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
                </div>

                {/* Objectives */}
                <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-6 flex items-center gap-3">
                    <Target className="w-6 h-6 text-[#3d9a8b]" />
                    Objetivos
                  </h2>
                  <ul className="space-y-3">
                    {project.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Activities */}
                <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
                    Fases del Proyecto
                  </h2>
                  <div className="space-y-6">
                    {project.activities.map((activity, index) => (
                      <div key={index} className="border-l-4 border-[#3d9a8b] pl-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{activity.phase}</h3>
                        <p className="text-muted-foreground mb-3">{activity.description}</p>
                        <ul className="space-y-2">
                          {activity.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start gap-2">
                              <span className="text-white mt-1">•</span>
                              <span className="text-muted-foreground text-sm">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-6">
                    Resultados Alcanzados
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.results.map((result, index) => (
                      <div key={index} className="bg-[#3d9a8b]/10 rounded-lg p-4 border border-[#3d9a8b]/20">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                          <span className="text-foreground font-medium">{result}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partners */}
                <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
                  <h2 className="text-2xl font-sans font-bold text-foreground mb-6 flex items-center gap-3">
                    <Users className="w-6 h-6 text-[#3d9a8b]" />
                    Aliados del Proyecto
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.partners.map((partner, index) => (
                      <div key={index} className="bg-[#1a3a5c]/5 rounded-lg p-4 border border-[#1a3a5c]/10">
                        <p className="text-foreground font-medium">{partner}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Project Info */}
                <div className="bg-card rounded-2xl shadow-lg p-6 border border-border sticky top-6">
                  <h3 className="font-semibold text-foreground mb-6 text-lg">Información del Proyecto</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Período</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(project.startDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}
                          {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Ubicación</p>
                        <p className="text-sm text-muted-foreground">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Presupuesto</p>
                        <p className="text-sm text-muted-foreground">{project.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Beneficiarios</p>
                        <p className="text-sm text-muted-foreground">{project.beneficiaries}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Coordinador del Proyecto</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{project.contact.coordinator}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#3d9a8b]" />
                      <a href={`mailto:${project.contact.email}`} className="text-sm text-[#3d9a8b] hover:underline">
                        {project.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#3d9a8b]" />
                      <a href={`tel:${project.contact.phone}`} className="text-sm text-[#3d9a8b] hover:underline">
                        {project.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="bg-gradient-to-br from-[#3d9a8b] to-[#3d9a8b]/80 rounded-2xl shadow-lg p-6 text-white">
                  <p className="text-sm font-medium mb-2">Categoría</p>
                  <p className="text-lg font-semibold capitalize">{project.category.replace('-', ' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
