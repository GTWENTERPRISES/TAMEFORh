import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, MapPin, DollarSign, Award, Check, ArrowLeft, BookOpen, Users, GraduationCap, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCourseBySlug, coursesData } from "@/lib/coursesData"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

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
      
      {/* Course Header */}
      <section className="py-20 bg-[#1a3a5c] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/cursos">
              <Button variant="ghost" className="mb-6 text-white/80 hover:text-white hover:bg-white/10 rounded-none">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a cursos
              </Button>
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-[#3d9a8b] text-white px-4 py-1.5 text-sm font-semibold">
                {course.categoryLabel}
              </span>
              <span className="bg-white/10 text-white/90 px-4 py-1.5 text-sm font-semibold border border-white/20">
                {course.codigoEspecialidad} — {course.area}
              </span>
              <span className="bg-white/10 text-white/90 px-4 py-1.5 text-sm font-semibold border border-white/20">
                {course.modality.join(", ")}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-white/70 font-semibold uppercase tracking-wider text-sm">Capacitación Profesional</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4 leading-tight">
              {course.title}
            </h1>
            {course.subtitle && (
              <p className="text-xl text-[#3d9a8b] font-semibold mb-6">{course.subtitle}</p>
            )}
            <p className="text-lg text-white/70 max-w-3xl">{course.shortDescription}</p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-5 py-3">
                <div className="w-10 h-10 bg-[#3d9a8b]/20 border border-[#3d9a8b]/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Carga Horaria</p>
                  <p className="text-white font-semibold">{course.cargaHoraria} horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-5 py-3">
                <div className="w-10 h-10 bg-[#3d9a8b]/20 border border-[#3d9a8b]/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Modalidad</p>
                  <p className="text-white font-semibold">{course.modality.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-5 py-3">
                <div className="w-10 h-10 bg-[#3d9a8b]/20 border border-[#3d9a8b]/30 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Participantes</p>
                  <p className="text-white font-semibold">{course.tipoParticipante}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className="bg-white border border-[#3d9a8b]/20 border-l-4 border-l-[#3d9a8b] p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <h2 className="text-2xl font-sans font-bold text-[#1a3a5c]">
                      Descripción del Curso
                    </h2>
                  </div>
                  <p className="text-[#1a3a5c]/70 leading-relaxed">{course.fullDescription}</p>
                </div>

                {/* Objectives */}
                <div className="bg-white border border-[#3d9a8b]/20 border-l-4 border-l-[#3d9a8b] p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <h2 className="text-2xl font-sans font-bold text-[#1a3a5c]">
                      Objetivos de Aprendizaje
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {course.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-[#3d9a8b] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-[#3d9a8b]" />
                        </div>
                        <span className="text-[#1a3a5c]/80">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Content */}
                <div className="bg-white border border-[#3d9a8b]/20 border-l-4 border-l-[#3d9a8b] p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <h2 className="text-2xl font-sans font-bold text-[#1a3a5c]">
                      Contenido del Curso
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {course.content.map((module, index) => (
                      <div key={index} className="border border-[#3d9a8b]/20 p-6 hover:border-[#3d9a8b] transition-colors bg-white">
                        <h3 className="font-semibold text-[#1a3a5c] mb-4 flex items-center gap-3">
                          <span className="w-8 h-8 bg-[#1a3a5c] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </span>
                          {module.module}
                        </h3>
                        <ul className="space-y-2 ml-11">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 bg-[#3d9a8b] mt-2 flex-shrink-0" />
                              <span className="text-[#1a3a5c]/70 text-sm">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-white border border-[#3d9a8b]/20 border-l-4 border-l-[#3d9a8b] p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <h2 className="text-2xl font-sans font-bold text-[#1a3a5c]">
                      Requisitos
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {course.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-[#3d9a8b] mt-2.5 flex-shrink-0" />
                        <span className="text-[#1a3a5c]/80">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="bg-white border border-[#3d9a8b]/20 border-l-4 border-l-[#3d9a8b] p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <h2 className="text-2xl font-sans font-bold text-[#1a3a5c]">
                      Beneficios
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {course.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-[#3d9a8b] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-[#3d9a8b]" />
                        </div>
                        <span className="text-[#1a3a5c]/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Course Info */}
                <div className="bg-[#1a3a5c] border-l-4 border-[#3d9a8b] p-6">
                  <h3 className="font-bold text-white mb-4 text-lg">Información del Curso</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-[#3d9a8b]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Fecha de inicio</p>
                        <p className="text-sm text-white/70">{course.schedule.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-[#3d9a8b]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Duración</p>
                        <p className="text-sm text-white/70">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-[#3d9a8b]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Modalidad</p>
                        <p className="text-sm text-white/70">{course.modality.join(", ")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="h-4 w-4 text-[#3d9a8b]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Inversión</p>
                        <p className="text-sm text-white/70">${course.price.regular} USD</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Table */}
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <h4 className="text-sm font-semibold text-white mb-3">Precios por Nivel</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-2 bg-[#3d9a8b]/20 border-l-2 border-[#3d9a8b] px-2 -mx-2">
                        <span className="text-white font-medium">Por Nivel</span>
                        <span className="font-bold text-white">${course.price.basePerLevel}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-white/5 px-2 -mx-2">
                        <span className="text-white/80 text-xs">3 niveles sin descuento</span>
                        <span className="text-white/60 line-through text-xs">${(course.price.basePerLevel * 3).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-[#3d9a8b]/30 border-l-2 border-[#3d9a8b] px-2 -mx-2">
                        <span className="text-white font-medium">Curso Completo (20% desc.)</span>
                        <span className="font-bold text-white">${course.price.regular}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    <Link href="/pagos" className="block">
                      <Button className="w-full bg-[#3d9a8b] hover:bg-white text-white hover:text-[#1a3a5c] font-bold border-2 border-[#3d9a8b] hover:border-white transition-all">
                        Inscribirse Ahora
                      </Button>
                    </Link>
                    <Link href="/contacto" className="block mt-3">
                      <Button variant="outline" className="w-full font-semibold border-2 border-white/40 text-white hover:bg-white/10 hover:border-white bg-transparent">
                        Solicitar Información
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Certification */}
                <div className="bg-white border border-[#3d9a8b]/20 border-l-4 border-l-[#3d9a8b] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <h3 className="font-bold text-[#1a3a5c]">Certificación</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-[#1a3a5c]/70">
                      <span className="font-semibold text-[#1a3a5c]">Institución:</span> {course.certification.institution}
                    </p>
                    <p className="text-[#1a3a5c]/70">
                      <span className="font-semibold text-[#1a3a5c]">Validez:</span> {course.certification.validity}
                    </p>
                    <p className="text-[#1a3a5c]/70">
                      <span className="font-semibold text-[#1a3a5c]">Tipo:</span> {course.certification.type}
                    </p>
                  </div>
                </div>

                {/* Course Area Info */}
                <div className="bg-white border border-[#3d9a8b]/20 border-l-4 border-l-[#3d9a8b] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#3d9a8b]/10 border border-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <h3 className="font-bold text-[#1a3a5c]">Área de Capacitación</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-[#1a3a5c]/70">
                      <span className="font-semibold text-[#1a3a5c]">Área:</span> {course.area}
                    </p>
                    <p className="text-[#1a3a5c]/70">
                      <span className="font-semibold text-[#1a3a5c]">Código:</span> {course.codigoEspecialidad}
                    </p>
                    <p className="text-[#1a3a5c]/70">
                      <span className="font-semibold text-[#1a3a5c]">Especialidad:</span> {course.categoryLabel}
                    </p>
                  </div>
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
