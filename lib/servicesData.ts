import { type LucideIcon, Trees, Map, TrendingUp, Database, Shield, FileCheck, Scale, BookOpen, Award, Users, Building2, Sprout, Leaf, Heart } from "lucide-react"

export interface ServiceBenefit {
  iconName: string
  title: string
  description: string
}

export interface ServiceData {
  slug: string
  number: string
  title: string
  shortDescription: string
  description: string
  features: string[]
  image: string
  benefits: ServiceBenefit[]
  servicesOffered: {
    title: string
    description: string
  }[]
  process: {
    step: string
    title: string
    description: string
  }[]
  targetAudience: string[]
  additionalInfo?: {
    title: string
    items: string[]
  }
}

// Mapa de iconos para uso en el cliente
export const iconMap: Record<string, LucideIcon> = {
  Trees,
  Map,
  TrendingUp,
  Database,
  Shield,
  FileCheck,
  Scale,
  BookOpen,
  Award,
  Users,
  Building2,
  Sprout,
  Leaf,
  Heart
}

export const servicesData: ServiceData[] = [
  {
    slug: "gestion-forestal",
    number: "01",
    title: "Consultoría y Manejo Forestal",
    shortDescription: "Cuantificación, valoración y aprovechamiento sostenible de existencias maderables en bosques naturales y plantaciones comerciales.",
    description: "Planificación y gestión sostenible de bosques y recursos forestales con metodologías avanzadas.",
    features: [
      "Inventarios forestales",
      "Planes de manejo y aprovechamiento",
      "Silvicultura y viveros"
    ],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2070",
    benefits: [
      {
        iconName: "Trees",
        title: "Manejo Sostenible",
        description: "Aplica las mejores prácticas para la conservación y aprovechamiento sostenible de tus bosques."
      },
      {
        iconName: "Map",
        title: "Planeación Efectiva",
        description: "Desarrolla planes de manejo adaptados a las características específicas de tu ecosistema."
      },
      {
        iconName: "TrendingUp",
        title: "Optimización de Recursos",
        description: "Maximiza el rendimiento económico de tus recursos forestales sin comprometer el ecosistema."
      },
      {
        iconName: "Database",
        title: "Datos Precisos",
        description: "Conta con información técnica precisa para la toma de decisiones en la gestión forestal."
      }
    ],
    servicesOffered: [
      {
        title: "Inventarios Forestales",
        description: "Realización de censos forestales completos con información detallada del recurso."
      },
      {
        title: "Planes de Manejo Forestal",
        description: "Diseño de planes de manejo para la producción sostenible de madera y productos no maderables."
      },
      {
        title: "Monitoreo de Bosques",
        description: "Seguimiento continuo del estado de tus recursos forestales y su evolución."
      },
      {
        title: "Silvicultura Aplicada",
        description: "Tratamientos silvícolas adaptados a tus objetivos y características del bosque."
      },
      {
        title: "Gestión de Plantaciones",
        description: "Establecimiento, mantenimiento y cosecha de plantaciones forestales productivas."
      },
      {
        title: "Economía Forestal",
        description: "Evaluaciones económicas y proyecciones financieras para tus proyectos forestales."
      }
    ],
    process: [
      {
        step: "01",
        title: "Diagnóstico Forestal",
        description: "Evaluación inicial del estado y características del ecosistema forestal."
      },
      {
        step: "02",
        title: "Planeación Estratégica",
        description: "Desarrollo del plan de manejo según tus objetivos y el potencial del área."
      },
      {
        step: "03",
        title: "Implementación",
        description: "Ejecución de las actividades de manejo según el plan establecido."
      },
      {
        step: "04",
        title: "Monitoreo Continuo",
        description: "Seguimiento y ajustes para garantizar el éxito del proyecto a largo plazo."
      }
    ],
    targetAudience: [
      "Propietarios de bosques",
      "Empresas forestales",
      "Organizaciones conservacionistas",
      "Municipios y gobiernos locales",
      "Inversionistas en proyectos forestales"
    ]
  },
  {
    slug: "consultoria-tecnica",
    number: "02",
    title: "Consultoría y Gestión Ambiental",
    shortDescription: "Evaluación de riesgos, diagnósticos de cumplimiento y regularización ambiental para empresas y proyectos.",
    description: "Servicios especializados de consultoría ambiental para garantizar el cumplimiento normativo y la sostenibilidad de tus operaciones.",
    features: [
      "Estudios de impacto ambiental",
      "Planes de manejo ambiental",
      "Medidas de mitigación y compensación"
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
    benefits: [
      {
        iconName: "Shield",
        title: "Cumplimiento Normativo",
        description: "Asegura el cumplimiento total de todas las regulaciones ambientales vigentes."
      },
      {
        iconName: "FileCheck",
        title: "Gestión de Riesgos",
        description: "Identifica y gestiona los riesgos ambientales de tu empresa o proyecto."
      },
      {
        iconName: "TrendingUp",
        title: "Eficiencia Operativa",
        description: "Optimiza el uso de recursos naturales y reduce costos operativos."
      },
      {
        iconName: "Heart",
        title: "Responsabilidad Social",
        description: "Demuestra tu compromiso con la sostenibilidad y el medio ambiente."
      }
    ],
    servicesOffered: [
      {
        title: "Estudios de Impacto Ambiental",
        description: "Evaluación detallada de los impactos ambientales de proyectos y actividades."
      },
      {
        title: "Planes de Manejo Ambiental",
        description: "Diseño e implementación de estrategias de gestión ambiental integral."
      },
      {
        title: "Auditorías Ambientales",
        description: "Evaluación del cumplimiento de normativas y mejores prácticas ambientales."
      },
      {
        title: "Regularización Ambiental",
        description: "Trámites y gestión para la obtención de permisos y licencias ambientales."
      },
      {
        title: "Monitoreo Ambiental",
        description: "Seguimiento continuo de parámetros ambientales y cumplimiento de compromisos."
      },
      {
        title: "Capacitación Ambiental",
        description: "Formación de personal en buenas prácticas y gestión ambiental."
      }
    ],
    process: [
      {
        step: "01",
        title: "Diagnóstico Inicial",
        description: "Evaluación de la situación ambiental actual de tu empresa o proyecto."
      },
      {
        step: "02",
        title: "Planificación",
        description: "Diseño de estrategias y planes de acción para la gestión ambiental."
      },
      {
        step: "03",
        title: "Implementación",
        description: "Ejecución de las medidas y programas ambientales establecidos."
      },
      {
        step: "04",
        title: "Seguimiento",
        description: "Monitoreo continuo y ajustes para garantizar el cumplimiento sostenido."
      }
    ],
    targetAudience: [
      "Empresas industriales",
      "Proyectos de infraestructura",
      "Organizaciones públicas y privadas",
      "Desarrolladores inmobiliarios",
      "Empresas de servicios"
    ]
  },
  {
    slug: "asesoria-legal-y-normativa",
    number: "03",
    title: "Peritajes Judiciales Acreditados",
    shortDescription: "Informes periciales oficiales con validez legal en procesos procesales y preprocesales, acreditados ante el Consejo de la Judicatura.",
    description: "Servicios especializados de peritaje judicial en ingeniería forestal, impacto ambiental y topografía con plena validez legal.",
    features: [
      "Peritajes en ingeniería forestal",
      "Peritajes de impacto ambiental",
      "Peritajes topográficos"
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    benefits: [
      {
        iconName: "Scale",
        title: "Validez Legal",
        description: "Informes periciales con plena validez procesal ante cualquier instancia judicial."
      },
      {
        iconName: "Shield",
        title: "Acreditación Oficial",
        description: "Peritos acreditados y certificados por el Consejo de la Judicatura del Ecuador."
      },
      {
        iconName: "FileCheck",
        title: "Rigor Técnico",
        description: "Análisis detallado con metodologías científicas y técnicas reconocidas."
      },
      {
        iconName: "Users",
        title: "Experiencia Profesional",
        description: "Respaldo de expertos con amplia trayectoria en peritajes judiciales."
      }
    ],
    servicesOffered: [
      {
        title: "Peritajes Forestales",
        description: "Evaluación técnica de daños, valoración de masas forestales y aprovechamientos."
      },
      {
        title: "Peritajes Ambientales",
        description: "Análisis de impactos ambientales, daños ecológicos y medidas de restauración."
      },
      {
        title: "Peritajes Topográficos",
        description: "Levantamientos topográficos, deslindes y determinación de áreas."
      },
      {
        title: "Valoración de Daños",
        description: "Cuantificación económica de daños y perjuicios en recursos naturales."
      },
      {
        title: "Informes Técnicos Judiciales",
        description: "Elaboración de informes periciales especializados para procesos legales."
      },
      {
        title: "Asesoría Técnica Legal",
        description: "Apoyo técnico a abogados y partes procesales en casos ambientales."
      }
    ],
    process: [
      {
        step: "01",
        title: "Aceptación del Cargo",
        description: "Designación oficial y aceptación del cargo pericial ante la autoridad judicial."
      },
      {
        step: "02",
        title: "Inspección Técnica",
        description: "Visita de campo y levantamiento de información técnica necesaria."
      },
      {
        step: "03",
        title: "Análisis y Dictamen",
        description: "Procesamiento de información y elaboración del informe pericial técnico."
      },
      {
        step: "04",
        title: "Presentación Judicial",
        description: "Entrega del informe pericial y comparecencia a audiencias si es necesario."
      }
    ],
    targetAudience: [
      "Abogados y despachos jurídicos",
      "Empresas en litigios ambientales",
      "Juzgados y tribunales",
      "Fiscalía y entidades públicas",
      "Personas naturales en procesos legales"
    ]
  },
  {
    slug: "capacitacion-y-desarrollo",
    number: "04",
    title: "Capacitación y Formación Técnica",
    shortDescription: "Programas teóricos y prácticos orientados a la formación continua de profesionales en geomática, tecnología forestal y gestión ambiental.",
    description: "Cursos especializados certificados para el desarrollo profesional continuo en el sector forestal y ambiental.",
    features: [
      "Cursos especializados certificados",
      "Formación en geomática y SIG",
      "Actualización profesional continua"
    ],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
    benefits: [
      {
        iconName: "BookOpen",
        title: "Certificación Oficial",
        description: "Certificados avalados por el Ministerio del Trabajo con código de registro SENECYT."
      },
      {
        iconName: "Users",
        title: "Instructores Expertos",
        description: "Docentes con amplia experiencia profesional y académica en el sector."
      },
      {
        iconName: "Award",
        title: "Modalidades Flexibles",
        description: "Cursos presenciales, virtuales e híbridos adaptados a tus necesidades."
      },
      {
        iconName: "TrendingUp",
        title: "Desarrollo Profesional",
        description: "Mejora tus competencias y amplía tus oportunidades laborales."
      }
    ],
    servicesOffered: [
      {
        title: "Cursos de Geomática",
        description: "Formación en sistemas de información geográfica, teledetección y cartografía."
      },
      {
        title: "Tecnología Forestal",
        description: "Capacitación en técnicas modernas de inventario, manejo y aprovechamiento forestal."
      },
      {
        title: "Gestión Ambiental",
        description: "Cursos sobre normativas, evaluación de impactos y sistemas de gestión ambiental."
      },
      {
        title: "Software Especializado",
        description: "Entrenamiento en herramientas como ArcGIS, QGIS, AutoCAD y software forestal."
      },
      {
        title: "Certificaciones Técnicas",
        description: "Programas especializados para obtener certificaciones profesionales reconocidas."
      },
      {
        title: "Capacitación In-Company",
        description: "Programas personalizados de formación para equipos de trabajo empresariales."
      }
    ],
    process: [
      {
        step: "01",
        title: "Inscripción",
        description: "Registro en el curso de tu interés y selección de modalidad de estudio."
      },
      {
        step: "02",
        title: "Formación Teórica",
        description: "Clases con contenido actualizado y material didáctico de calidad."
      },
      {
        step: "03",
        title: "Práctica Aplicada",
        description: "Ejercicios prácticos, casos reales y trabajo con software especializado."
      },
      {
        step: "04",
        title: "Certificación",
        description: "Evaluación final y entrega de certificado oficial con registro SENECYT."
      }
    ],
    targetAudience: [
      "Ingenieros forestales y ambientales",
      "Técnicos del sector forestal",
      "Estudiantes de carreras afines",
      "Profesionales en actualización",
      "Personal de empresas forestales"
    ]
  },
  {
    slug: "certificacion-profesional",
    number: "05",
    title: "Certificación Profesional",
    shortDescription: "Proceso de certificación y registro profesional para ingenieros forestales, cumpliendo con los estándares del SENECYT y el Ministerio del Trabajo.",
    description: "Certificación oficial de competencias profesionales para ingenieros forestales y especialistas del sector.",
    features: [
      "Registro profesional oficial",
      "Certificación de competencias",
      "Actualización de credenciales"
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070",
    benefits: [
      {
        iconName: "Award",
        title: "Reconocimiento Oficial",
        description: "Obtén una certificación válida y reconocida por las autoridades nacionales del sector forestal."
      },
      {
        iconName: "BookOpen",
        title: "Validez Nacional",
        description: "Tu certificación tiene validez en todo el territorio ecuatoriano para ejercer la profesión."
      },
      {
        iconName: "TrendingUp",
        title: "Competencia Técnica",
        description: "Demuestra tus conocimientos y habilidades profesionales ante empleadores y clientes."
      },
      {
        iconName: "Users",
        title: "Acceso a Oportunidades",
        description: "Abre puertas a proyectos, contrataciones y empleos exclusivos para profesionales certificados."
      }
    ],
    servicesOffered: [
      {
        title: "Certificación de Ingenieros Forestales",
        description: "Proceso completo de certificación profesional con validez nacional."
      },
      {
        title: "Evaluación de Competencias",
        description: "Valoración técnica de conocimientos y experiencia en el sector forestal."
      },
      {
        title: "Registro Profesional",
        description: "Inscripción en registros oficiales del sector forestal y ambiental."
      },
      {
        title: "Actualización de Credenciales",
        description: "Renovación y actualización periódica de certificaciones profesionales."
      },
      {
        title: "Validación de Experiencia",
        description: "Reconocimiento oficial de trayectoria profesional y especialización."
      },
      {
        title: "Asesoría en Certificación",
        description: "Orientación completa en el proceso de certificación profesional."
      }
    ],
    process: [
      {
        step: "01",
        title: "Presentación de Documentos",
        description: "Presenta tu hoja de vida, títulos profesionales y documentos de experiencia laboral."
      },
      {
        step: "02",
        title: "Evaluación de Competencia",
        description: "Realiza una evaluación técnica para demostrar tus conocimientos en el área forestal."
      },
      {
        step: "03",
        title: "Revisión y Aprobación",
        description: "Nuestro equipo de expertos revisa tu expediente y valida tu experiencia profesional."
      },
      {
        step: "04",
        title: "Emisión de Certificado",
        description: "Recibe tu certificación profesional oficial registrada ante el SENECYT."
      }
    ],
    targetAudience: [
      "Ingenieros Forestales titulados",
      "Profesionales del sector forestal con experiencia",
      "Técnicos especializados en áreas forestales",
      "Egresados de carreras afines al sector"
    ],
    additionalInfo: {
      title: "Documentación Requerida",
      items: [
        "Hoja de vida actualizada",
        "Copia del título profesional",
        "Certificados de cursos especializados",
        "Documentos de experiencia laboral",
        "Referencias profesionales",
        "Cédula de identidad"
      ]
    }
  },
  {
    slug: "conservacion-y-restauracion",
    number: "06",
    title: "Conservación y Restauración Ambiental",
    shortDescription: "Proyectos de restauración ecológica, reforestación y conservación de ecosistemas naturales con enfoque sostenible.",
    description: "Diseño e implementación de proyectos de conservación y restauración ecológica para recuperar y proteger ecosistemas.",
    features: [
      "Restauración ecológica",
      "Proyectos de reforestación",
      "Conservación de biodiversidad"
    ],
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=2088",
    benefits: [
      {
        iconName: "Leaf",
        title: "Recuperación de Ecosistemas",
        description: "Restaura áreas degradadas y recupera la funcionalidad ecológica de tus terrenos."
      },
      {
        iconName: "Sprout",
        title: "Servicios Ecosistémicos",
        description: "Mejora la provisión de agua, captura de carbono y otros servicios ambientales."
      },
      {
        iconName: "Heart",
        title: "Conservación de Biodiversidad",
        description: "Protege especies nativas y recupera hábitats naturales para la fauna silvestre."
      },
      {
        iconName: "TrendingUp",
        title: "Incentivos Ambientales",
        description: "Accede a programas de pago por servicios ambientales y certificaciones verdes."
      }
    ],
    servicesOffered: [
      {
        title: "Restauración Ecológica",
        description: "Diseño e implementación de proyectos de restauración de ecosistemas degradados."
      },
      {
        title: "Reforestación con Especies Nativas",
        description: "Establecimiento de plantaciones con especies autóctonas adaptadas al ecosistema."
      },
      {
        title: "Planes de Conservación",
        description: "Desarrollo de estrategias para la protección de áreas naturales y biodiversidad."
      },
      {
        title: "Monitoreo Ecológico",
        description: "Seguimiento de la recuperación del ecosistema y éxito del proyecto."
      },
      {
        title: "Gestión de Áreas Protegidas",
        description: "Administración y manejo de reservas naturales y áreas de conservación."
      },
      {
        title: "Educación Ambiental",
        description: "Programas de sensibilización y capacitación en conservación para comunidades."
      }
    ],
    process: [
      {
        step: "01",
        title: "Diagnóstico Ecológico",
        description: "Evaluación del estado del ecosistema y análisis de factores de degradación."
      },
      {
        step: "02",
        title: "Diseño del Proyecto",
        description: "Planificación de acciones de restauración y selección de especies a utilizar."
      },
      {
        step: "03",
        title: "Implementación",
        description: "Ejecución de actividades de reforestación, restauración y manejo del área."
      },
      {
        step: "04",
        title: "Mantenimiento y Seguimiento",
        description: "Monitoreo continuo y mantenimiento para asegurar el éxito del proyecto."
      }
    ],
    targetAudience: [
      "Propietarios de terrenos degradados",
      "Empresas con programas de RSE ambiental",
      "ONGs conservacionistas",
      "Municipios y gobiernos locales",
      "Comunidades locales e indígenas"
    ]
  }
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find(service => service.slug === slug)
}

export function getAllServices(): ServiceData[] {
  return servicesData
}

export function getServicesForListing() {
  return servicesData.map(service => ({
    number: service.number,
    title: service.title,
    description: service.shortDescription,
    features: service.features,
    image: service.image,
    slug: service.slug
  }))
}
