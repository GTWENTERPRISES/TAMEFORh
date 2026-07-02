import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, MapPin, DollarSign, Award, CheckCircle, ArrowLeft, BookOpen, Users, GraduationCap, FileText } from "lucide-react"
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
      <section className="py-20 bg-gradient-to-br from-[#1a3a5c] via-[#1a3a5c] to-[#3d9a8b] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="1" />
            <circle cx="200" cy="200" r="60" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3d9a8b]/20 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/cursos">
              <Button variant="ghost" className="mb-6 text-white/80 hover:text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a cursos
              </Button>
            </Link>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-[#3d9a8b]/30 text-[#3d9a8b] rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur-sm border border-[#3d9a8b]/30">
                {course.categoryLabel}
              </span>
              <span className="bg-white/10 text-white/90 rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur-sm border border-white/20">
                {course.codigoEspecialidad} — {course.area}
              </span>
              <span className="bg-white/10 text-white/90 rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur-sm border border-white/20">
                {course.modality.join(", ")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4">
              {course.title}
            </h1>
            {course.subtitle && (
              <p className="text-xl text-white/80 mb-6">{course.subtitle}</p>
            )}
            <p className="text-lg text-white/70 max-w-3xl">{course.shortDescription}</p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3 backdrop-blur-sm">
                <Clock className="h-5 w-5 text-[#3d9a8b]" />
                <div>
                  <p className="text-xs text-white/60">Carga Horaria</p>
                  <p className="text-white font-semibold">{course.cargaHoraria} horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3 backdrop-blur-sm">
                <MapPin className="h-5 w-5 text-[#3d9a8b]" />
                <div>
                  <p className="text-xs text-white/60">Modalidad</p>
                  <p className="text-white font-semibold">{course.modality.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3 backdrop-blur-sm">
                <Users className="h-5 w-5 text-[#3d9a8b]" />
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
                <div className="bg-gradient-to-br from-[#1a3a5c] to-[#3d9a8b] rounded-xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-sans font-bold text-white">
                      Descripción del Curso
                    </h2>
                  </div>
                  <p className="text-white/90 leading-relaxed">{course.fullDescription}</p>
                </div>

                {/* Objectives */}
                <div className="bg-gradient-to-br from-[#1a3a5c] to-[#3d9a8b] rounded-xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-sans font-bold text-white">
                      Objetivos de Aprendizaje
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {course.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#3d9a8b] bg-white rounded-full mt-0.5 flex-shrink-0" />
                        <span className="text-white/90">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-[#1a3a5c] to-[#3d9a8b] rounded-xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-sans font-bold text-white">
                      Contenido del Curso
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {course.content.map((module, index) => (
                      <div key={index} className="border border-white/20 rounded-xl p-6 hover:border-white/40 transition-colors bg-white/10 backdrop-blur-sm">
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </span>
                          {module.module}
                        </h3>
                        <ul className="space-y-2 ml-10">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start gap-2">
                              <span className="text-[#3d9a8b] mt-1.5 text-xs">●</span>
                              <span className="text-white/80 text-sm">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-gradient-to-br from-[#1a3a5c] to-[#3d9a8b] rounded-xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-sans font-bold text-white">
                      Requisitos
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {course.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-white mt-1 text-lg">•</span>
                        <span className="text-white/90">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-br from-[#1a3a5c] to-[#3d9a8b] rounded-xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-sans font-bold text-white">
                      Beneficios
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {course.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#3d9a8b] bg-white rounded-full mt-0.5 flex-shrink-0" />
                        <span className="text-white/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Course Info */}
                <div className="bg-gradient-to-br from-[#1a3a5c] to-[#3d9a8b] rounded-xl shadow-lg p-6 sticky top-6">
                  <h3 className="font-semibold text-white mb-4 text-lg">Información del Curso</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Fecha de inicio</p>
                        <p className="text-sm text-white/80">{course.schedule.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Duración</p>
                        <p className="text-sm text-white/80">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Modalidad</p>
                        <p className="text-sm text-white/80">{course.modality.join(", ")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Tipo de Participante</p>
                        <p className="text-sm text-white/80">{course.tipoParticipante}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Inversión</p>
                        <p className="text-sm text-white/80">${course.price.regular} USD</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Table */}
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <h4 className="text-sm font-semibold text-white mb-3">Precios según Membresía</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-white/80">Regular</span>
                        <span className="font-semibold text-white">${course.price.regular}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-white/80">Estudiante</span>
                        <span className="font-semibold text-white">${course.price.student}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-white/80">Miembro TAMEFOR</span>
                        <span className="font-semibold text-white">${course.price.memberTamefor}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-white/80">Afiliado CONIFOR</span>
                        <span className="font-semibold text-white">${course.price.affiliateConifor}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 bg-white/15 rounded-lg px-2 -mx-2">
                        <span className="text-white font-medium">Miembro Habilitado</span>
                        <span className="font-bold text-white">${course.price.enabledMemberTamefor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    <Button className="w-full bg-white hover:bg-white/90 text-[#1a3a5c] rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
                      Inscribirse Ahora
                    </Button>
                    <Link href="/contacto" className="block mt-3">
                      <Button variant="outline" className="w-full rounded-full font-semibold border-white/40 text-white hover:bg-white/10">
                        Solicitar Información
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Certification */}
                <div className="bg-gradient-to-br from-[#1a3a5c] to-[#3d9a8b] rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-white">Certificación</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-white/80">
                      <span className="font-medium text-white">Institución:</span> {course.certification.institution}
                    </p>
                    <p className="text-white/80">
                      <span className="font-medium text-white">Validez:</span> {course.certification.validity}
                    </p>
                    <p className="text-white/80">
                      <span className="font-medium text-white">Tipo:</span> {course.certification.type}
                    </p>
                  </div>
                </div>

                {/* Course Area Info */}
                <div className="bg-gradient-to-br from-[#1a3a5c] to-[#3d9a8b] rounded-xl shadow-lg p-6 text-white">
                  <h3 className="font-semibold mb-3">Área de Capacitación</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-white/80">
                      <span className="font-medium text-white">Área:</span> {course.area}
                    </p>
                    <p className="text-white/80">
                      <span className="font-medium text-white">Código:</span> {course.codigoEspecialidad}
                    </p>
                    <p className="text-white/80">
                      <span className="font-medium text-white">Especialidad:</span> {course.categoryLabel}
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
