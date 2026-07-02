import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Briefcase, MapPin, Clock, DollarSign, Users, Building, Search, Filter, ArrowRight, Calendar, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: 'Bolsa de Empleo | TAMEFOR Los Ríos',
  description: 'Encuentra oportunidades laborales en el sector forestal y ambiental',
}

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  category: 'sector-publico' | 'sector-privado' | 'pasantias'
  description: string
  requirements: string[]
  salary?: string
  posted?: string
}

const jobsData: Job[] = [
  {
    id: '1',
    title: 'Ingeniero Forestal Senior',
    company: 'Empresa Forestal del Litoral',
    location: 'Los Ríos, Ecuador',
    type: 'Tiempo Completo',
    category: 'sector-privado',
    description: 'Buscamos ingeniero forestal con experiencia en manejo de plantaciones y gestión ambiental.',
    requirements: ['5+ años de experiencia', 'Manejo de SIG', 'Licencia profesional vigente'],
    salary: '$2,500 - $3,500',
    posted: 'Hace 3 días'
  },
  {
    id: '2',
    title: 'Especialista en Reforestación',
    company: 'Ministerio del Ambiente',
    location: 'Quito, Ecuador',
    type: 'Tiempo Completo',
    category: 'sector-publico',
    description: 'Coordinador de proyectos de reforestación y restauración de ecosistemas.',
    requirements: ['Título en Ingeniería Forestal', 'Experiencia en proyectos ambientales', 'Disponibilidad para viajes'],
    salary: '$2,000 - $2,800',
    posted: 'Hace 1 semana'
  },
  {
    id: '3',
    title: 'Pasante de Ingeniería Forestal',
    company: 'Consultora Ambiental Verde',
    location: 'Babahoyo, Ecuador',
    type: 'Pasantía',
    category: 'pasantias',
    description: 'Oportunidad de práctica profesional en evaluación de impacto ambiental.',
    requirements: ['Estudiante de últimos semestres', 'Conocimientos en EIA', 'Disponibilidad de 6 meses'],
    posted: 'Hace 5 días'
  },
  {
    id: '4',
    title: 'Técnico en Viveros Forestales',
    company: 'Viveros Nacionales',
    location: 'Los Ríos, Ecuador',
    type: 'Tiempo Completo',
    category: 'sector-privado',
    description: 'Responsable de producción y mantenimiento de plantas forestales.',
    requirements: ['Técnico en Silvicultura', 'Experiencia en viveros', 'Disponibilidad inmediata'],
    salary: '$1,200 - $1,800',
    posted: 'Hace 2 días'
  },
  {
    id: '5',
    title: 'Auditor Ambiental',
    company: 'Auditoría Ambiental Ecuador',
    location: 'Guayaquil, Ecuador',
    type: 'Tiempo Completo',
    category: 'sector-privado',
    description: 'Profesional para auditorías ambientales en empresas forestales.',
    requirements: ['Ingeniería Forestal o Ambiental', '3+ años de experiencia', 'Certificación ISO 14001'],
    salary: '$2,200 - $3,000',
    posted: 'Hace 4 días'
  },
  {
    id: '6',
    title: 'Coordinador de Proyectos Forestales',
    company: 'ONG Bosques Vivos',
    location: 'Los Ríos, Ecuador',
    type: 'Tiempo Completo',
    category: 'sector-publico',
    description: 'Coordinación de proyectos de conservación y manejo forestal sostenible.',
    requirements: ['Ingeniería Forestal', 'Experiencia en ONGs', 'Liderazgo de equipos'],
    salary: '$1,800 - $2,500',
    posted: 'Hace 1 semana'
  }
]

const jobCategories = [
  {
    id: 'sector-publico',
    name: 'Sector Público',
    description: 'Oportunidades en ministerios y entidades gubernamentales',
    icon: Building,
    color: 'bg-[#3d9a8b]',
  },
  {
    id: 'sector-privado',
    name: 'Sector Privado',
    description: 'Empresas forestales, consultoras y proyectos',
    icon: Briefcase,
    color: 'bg-[#3d9a8b]',
  },
  {
    id: 'pasantias',
    name: 'Pasantías',
    description: 'Prácticas preprofesionales y programas de entrenamiento',
    icon: Users,
    color: 'bg-[#3d9a8b]',
  },
]

export default function BolsaEmpleoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a3a5c] via-[#1a3a5c]/90 to-[#3d9a8b]/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#3d9a8b] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block bg-white text-[#1a3a5c] text-xs font-bold px-4 py-2 rounded-full">
                BOLSA DE EMPLEO
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6">
              Encuentra tu Próxima Oportunidad
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Conectamos talento forestal con las mejores empresas y organizaciones del sector
            </p>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {jobCategories.map((category) => {
              const Icon = category.icon
              const count = jobsData.filter(job => job.category === category.id).length
              return (
                <div
                  key={category.id}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-[#3d9a8b] transition-all hover:shadow-lg"
                >
                  <div className={`${category.color} rounded-lg p-4 w-fit mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#3d9a8b] font-semibold">
                      {count} {count === 1 ? 'empleo' : 'empleos'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-2">
                Empleos Disponibles
              </h2>
              <p className="text-muted-foreground">
                {jobsData.length} oportunidades laborales en el sector forestal
              </p>
            </div>

            <div className="space-y-6">
              {jobsData.map((job) => (
                <div
                  key={job.id}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-[#3d9a8b] transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
                      <p className="text-[#3d9a8b] font-semibold mb-3">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        {job.salary && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                        )}
                        {job.posted && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {job.posted}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{job.description}</p>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-foreground mb-2">Requisitos:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <span
                          key={idx}
                          className="bg-[#1a3a5c]/10 text-[#1a3a5c] text-xs px-3 py-1 rounded-full"
                        >
                          {req}
                        </span>
                      ))}
                      {job.requirements.length > 3 && (
                        <span className="text-[#3d9a8b] text-xs font-semibold">
                          +{job.requirements.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-[#3d9a8b] hover:bg-[#3d9a8b]/90 text-white rounded-full">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1a3a5c] to-[#3d9a8b]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-sans font-bold text-white mb-4">
              ¿No encontraste lo que buscas?
            </h2>
            <p className="text-white/90 mb-8">
              Suscríbete a nuestras alertas de empleo y recibe notificaciones de nuevas oportunidades
            </p>
            <Button className="bg-white hover:bg-white/90 text-[#1a3a5c] font-bold rounded-full px-8">
              Suscribirse a Alertas
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

