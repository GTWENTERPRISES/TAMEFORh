'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, Users, DollarSign, Target, CheckCircle, ArrowLeft, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Project } from "@/lib/projectsData"

interface ProyectoPageClientProps {
  project: Project
}

export function ProyectoPageClient({ project }: ProyectoPageClientProps) {
  const statusLabels = {
    'en-curso': { label: 'PROYECTO ACTIVO', color: 'bg-[#3d9a8b]' },
    'completado': { label: 'PROYECTO COMPLETADO', color: 'bg-[#1a3a5c]' },
    'planificado': { label: 'PROYECTO PLANIFICADO', color: 'bg-gray-500' }
  }

  const statusInfo = statusLabels[project.status]

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Project Header */}
      <section className="py-24 bg-gradient-to-r from-[#1a3a5c] via-[#163250] to-[#0f2a45]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl">
            <Link href="/proyectos">
              <Button variant="ghost" className="mb-8 text-white hover:text-[#3d9a8b] flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a proyectos
              </Button>
            </Link>
            
            <div className="mb-6">
              <span className={`${statusInfo.color} text-white text-xs font-bold px-4 py-2 uppercase tracking-wider inline-block`}>
                {statusInfo.label}
              </span>
            </div>
            
            <h1 className="font-sans text-4xl md:text-5xl text-white font-bold leading-tight mb-4">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-2xl text-[#3d9a8b] mb-4">{project.subtitle}</p>
            )}
            <p className="text-xl text-white/80">{project.shortDescription}</p>
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Description */}
                <div className="bg-white p-8 border-l-4 border-[#3d9a8b] shadow-lg">
                  <h2 className="font-sans text-2xl font-bold text-[#1a3a5c] mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1a3a5c] flex items-center justify-center border-t-2 border-[#3d9a8b]">
                      <div className="w-2 h-2 bg-[#3d9a8b]" />
                    </div>
                    Descripción del Proyecto
                  </h2>
                  <p className="text-[#1a3a5c]/70 leading-relaxed text-lg">{project.fullDescription}</p>
                </div>

                {/* Objectives */}
                <div className="bg-white p-8 border-l-4 border-[#3d9a8b] shadow-lg">
                  <h2 className="font-sans text-2xl font-bold text-[#1a3a5c] mb-6 flex items-center gap-3">
                    <Target className="w-7 h-7 text-[#3d9a8b]" />
                    Objetivos
                  </h2>
                  <ul className="space-y-4">
                    {project.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                        <span className="text-[#1a3a5c]/80 text-lg">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Activities */}
                <div className="bg-white p-8 border-l-4 border-[#3d9a8b] shadow-lg">
                  <h2 className="font-sans text-2xl font-bold text-[#1a3a5c] mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1a3a5c] flex items-center justify-center border-t-2 border-[#3d9a8b]">
                      <div className="w-2 h-2 bg-[#3d9a8b]" />
                    </div>
                    Fases del Proyecto
                  </h2>
                  <div className="space-y-6">
                    {project.activities.map((activity, index) => (
                      <div key={index} className="border-l-4 border-[#3d9a8b] pl-6 py-2">
                        <h3 className="text-xl font-bold text-[#1a3a5c] mb-3">{activity.phase}</h3>
                        <p className="text-[#1a3a5c]/70 mb-4 text-lg">{activity.description}</p>
                        <ul className="space-y-2">
                          {activity.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start gap-3">
                              <span className="text-[#3d9a8b] mt-1 text-xl">•</span>
                              <span className="text-[#1a3a5c]/80">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-white p-8 border-l-4 border-[#3d9a8b] shadow-lg">
                  <h2 className="font-sans text-2xl font-bold text-[#1a3a5c] mb-6 flex items-center gap-3">
                    <CheckCircle className="w-7 h-7 text-[#3d9a8b]" />
                    Resultados Alcanzados
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.results.map((result, index) => (
                      <div key={index} className="bg-[#1a3a5c]/5 p-5 border-l-4 border-[#3d9a8b]">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                          <span className="text-[#1a3a5c] font-medium text-lg">{result}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partners */}
                <div className="bg-white p-8 border-l-4 border-[#3d9a8b] shadow-lg">
                  <h2 className="font-sans text-2xl font-bold text-[#1a3a5c] mb-6 flex items-center gap-3">
                    <Users className="w-7 h-7 text-[#3d9a8b]" />
                    Aliados del Proyecto
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.partners.map((partner, index) => (
                      <div key={index} className="bg-[#1a3a5c]/5 p-5 border-l-4 border-[#3d9a8b]">
                        <p className="text-[#1a3a5c] font-medium text-lg">{partner}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Info */}
                <div className="bg-white p-8 border-l-4 border-[#3d9a8b] shadow-lg sticky top-6">
                  <h3 className="font-bold text-[#1a3a5c] mb-8 text-xl">Información del Proyecto</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                        <Calendar className="h-5 w-5 text-[#3d9a8b]" />
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-semibold text-[#1a3a5c] mb-1">Período</p>
                        <p className="text-[#1a3a5c]/70">
                          {new Date(project.startDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}
                          {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                        <MapPin className="h-5 w-5 text-[#3d9a8b]" />
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-semibold text-[#1a3a5c] mb-1">Ubicación</p>
                        <p className="text-[#1a3a5c]/70">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                        <DollarSign className="h-5 w-5 text-[#3d9a8b]" />
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-semibold text-[#1a3a5c] mb-1">Presupuesto</p>
                        <p className="text-[#1a3a5c]/70">{project.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                        <Users className="h-5 w-5 text-[#3d9a8b]" />
                      </div>
                      <div className="pt-1">
                        <p className="text-sm font-semibold text-[#1a3a5c] mb-1">Beneficiarios</p>
                        <p className="text-[#1a3a5c]/70">{project.beneficiaries}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-white p-8 border-l-4 border-[#3d9a8b] shadow-lg">
                  <h3 className="font-bold text-[#1a3a5c] mb-6 text-xl">Coordinador del Proyecto</h3>
                  <div className="space-y-4">
                    <p className="text-[#1a3a5c] font-semibold text-lg">{project.contact.coordinator}</p>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-[#3d9a8b]" />
                      <a href={`mailto:${project.contact.email}`} className="text-[#3d9a8b] hover:underline font-medium">
                        {project.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-[#3d9a8b]" />
                      <a href={`tel:${project.contact.phone}`} className="text-[#3d9a8b] hover:underline font-medium">
                        {project.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="bg-gradient-to-r from-[#1a3a5c] via-[#163250] to-[#0f2a45] p-8 border-l-4 border-[#3d9a8b]">
                  <p className="text-sm font-semibold text-white/80 mb-2">Categoría</p>
                  <p className="text-xl font-bold text-[#3d9a8b] uppercase">{project.category.replace('-', ' ')}</p>
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
