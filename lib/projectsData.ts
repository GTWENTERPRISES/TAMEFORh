// Datos de proyectos para TAMEFOR
export interface Project {
  id: string
  slug: string
  number: string
  title: string
  subtitle: string
  shortDescription: string
  fullDescription: string
  category: 'gestion-residuos' | 'gestion-forestal' | 'limpieza-bosques' | 'reforestacion' | 'conservacion' | 'certificacion'
  categoryLabel: string
  status: 'completado' | 'en-curso' | 'planificado'
  location: string
  startDate: string
  endDate?: string
  duration: string
  client: string
  area: string
  images: string[]
  objectives: string[]
  activities: string[]
  results: {
    title: string
    value: string
    description: string
  }[]
  team: {
    role: string
    count: number
  }[]
  impact: string[]
  testimonial?: {
    text: string
    author: string
    position: string
    company: string
  }
  featured: boolean
  gallery?: string[]
}

export const projectsData: Project[] = [
  {
    id: '1',
    slug: 'gestion-residuos',
    number: '01',
    title: 'Gestión de Residuos',
    subtitle: 'Programa Integral de Manejo de Residuos Sólidos',
    shortDescription: 'Consultoría ambiental que incluye asesoramiento y orientación en gestión de residuos',
    fullDescription: 'Proyecto integral de consultoría ambiental para la implementación de un sistema de gestión de residuos sólidos en empresas del sector forestal e industrial. El proyecto incluyó el diseño de planes de manejo, capacitación del personal, implementación de procesos de clasificación, aprovechamiento y disposición final de residuos, así como el establecimiento de indicadores de seguimiento y mejora continua. Se logró reducir significativamente el impacto ambiental de las operaciones y mejorar la eficiencia en el manejo de recursos.',
    category: 'gestion-residuos',
    categoryLabel: 'Gestión de Residuos',
    status: 'completado',
    location: 'Los Ríos, Ecuador',
    startDate: 'Enero 2024',
    endDate: 'Diciembre 2024',
    duration: '12 meses',
    client: 'Sector Industrial',
    area: '5 empresas participantes',
    images: [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1624893910627-f06f64ed2e48?w=800&h=600&fit=crop',
    ],
    objectives: [
      'Implementar sistema integral de gestión de residuos sólidos',
      'Reducir la generación de residuos en un 30%',
      'Aumentar la tasa de reciclaje al 60%',
      'Capacitar al personal en clasificación y manejo adecuado',
      'Establecer alianzas con gestores autorizados de residuos',
      'Cumplir con normativa ambiental ecuatoriana vigente',
    ],
    activities: [
      'Diagnóstico inicial de generación y manejo de residuos',
      'Diseño de Plan de Manejo Integral de Residuos Sólidos',
      'Implementación de puntos de clasificación (orgánico, reciclable, peligroso)',
      'Capacitación a 150+ trabajadores en gestión de residuos',
      'Establecimiento de convenios con gestores autorizados',
      'Instalación de infraestructura de almacenamiento temporal',
      'Seguimiento y monitoreo mensual de indicadores',
      'Auditorías ambientales trimestrales',
    ],
    results: [
      {
        title: 'Reducción de Residuos',
        value: '35%',
        description: 'Disminución en generación de residuos vs. línea base',
      },
      {
        title: 'Tasa de Reciclaje',
        value: '65%',
        description: 'Porcentaje de residuos aprovechados o reciclados',
      },
      {
        title: 'Personal Capacitado',
        value: '150+',
        description: 'Trabajadores formados en gestión de residuos',
      },
      {
        title: 'Empresas Beneficiadas',
        value: '5',
        description: 'Organizaciones con sistema implementado',
      },
    ],
    team: [
      { role: 'Ingeniero Ambiental', count: 2 },
      { role: 'Especialista en Residuos', count: 1 },
      { role: 'Capacitador', count: 2 },
      { role: 'Técnico de campo', count: 3 },
    ],
    impact: [
      'Reducción de 450 toneladas de residuos enviados a relleno sanitario',
      'Generación de ingresos por venta de material reciclable',
      'Cumplimiento 100% de normativa ambiental',
      'Mejora en imagen corporativa y responsabilidad social',
      'Ahorro económico en disposición final de residuos',
      'Creación de cultura ambiental en trabajadores',
    ],
    testimonial: {
      text: 'TAMEFOR nos ayudó a transformar nuestra gestión de residuos. Ahora somos más eficientes, cumplimos la normativa y nuestros trabajadores están comprometidos con el cuidado ambiental.',
      author: 'Ing. Carlos Mendoza',
      position: 'Gerente de Operaciones',
      company: 'Empresa Industrial Participante',
    },
    featured: true,
  },
  {
    id: '2',
    slug: 'gestion-forestal',
    number: '02',
    title: 'Gestión Forestal',
    subtitle: 'Implementación de Sistema de Gestión Forestal Sostenible',
    shortDescription: 'Consultoría ambiental que incluye asesoramiento y orientación en conservación forestal',
    fullDescription: 'Proyecto de consultoría especializada para el diseño e implementación de un sistema de gestión forestal sostenible en fincas y propiedades rurales. El proyecto incluyó la elaboración de planes de manejo forestal, inventarios forestales detallados, diseño de programas de aprovechamiento sostenible, establecimiento de sistemas de monitoreo, y capacitación a propietarios y trabajadores en buenas prácticas forestales. Se logró el equilibrio entre la conservación de los recursos naturales y el aprovechamiento económico sostenible.',
    category: 'gestion-forestal',
    categoryLabel: 'Gestión Forestal',
    status: 'completado',
    location: 'Los Ríos, Ecuador',
    startDate: 'Marzo 2023',
    endDate: 'Febrero 2024',
    duration: '11 meses',
    client: 'Propietarios de Bosques Privados',
    area: '1,200 hectáreas bajo manejo',
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop',
    ],
    objectives: [
      'Diseñar e implementar planes de manejo forestal sostenible',
      'Realizar inventarios forestales técnicamente rigurosos',
      'Establecer sistemas de aprovechamiento responsable',
      'Conservar biodiversidad y servicios ecosistémicos',
      'Generar ingresos sostenibles para propietarios',
      'Cumplir con legislación forestal nacional',
    ],
    activities: [
      'Inventario forestal en 1,200 hectáreas',
      'Elaboración de 8 Planes de Manejo Forestal',
      'Diseño de programas de aprovechamiento anual',
      'Establecimiento de parcelas permanentes de monitoreo',
      'Capacitación en técnicas de aprovechamiento de bajo impacto',
      'Implementación de sistemas de trazabilidad de madera',
      'Diseño de corredores biológicos para fauna',
      'Seguimiento y monitoreo trimestral',
    ],
    results: [
      {
        title: 'Área Bajo Manejo',
        value: '1,200 ha',
        description: 'Hectáreas con plan de manejo implementado',
      },
      {
        title: 'Fincas Certificadas',
        value: '8',
        description: 'Propiedades con plan de manejo aprobado',
      },
      {
        title: 'Volumen Aprovechado',
        value: '850 m³',
        description: 'Madera extraída de forma sostenible',
      },
      {
        title: 'Biodiversidad',
        value: '100%',
        description: 'Conservación de áreas de alto valor ecológico',
      },
    ],
    team: [
      { role: 'Ingeniero Forestal', count: 3 },
      { role: 'Dendrometría', count: 2 },
      { role: 'Especialista en biodiversidad', count: 1 },
      { role: 'Técnico de campo', count: 4 },
    ],
    impact: [
      'Conservación de 300 hectáreas de bosque primario',
      'Generación de ingresos sostenibles para 8 familias',
      'Aprovechamiento planificado de recursos maderables',
      'Protección de fuentes hídricas y biodiversidad',
      'Cumplimiento 100% de legislación forestal',
      'Modelo replicable para otros propietarios',
    ],
    testimonial: {
      text: 'Gracias a TAMEFOR ahora manejamos nuestro bosque de forma sostenible. Generamos ingresos mientras conservamos el bosque para las futuras generaciones.',
      author: 'Sr. Roberto Álvarez',
      position: 'Propietario',
      company: 'Finca Los Laureles',
    },
    featured: true,
  },
  {
    id: '3',
    slug: 'limpieza-bosques',
    number: '03',
    title: 'Limpieza de Bosques',
    subtitle: 'Programa de Saneamiento y Restauración de Áreas Forestales',
    shortDescription: 'Consultoría ambiental que incluye asesoramiento y orientación en limpieza forestal',
    fullDescription: 'Proyecto especializado en la limpieza, saneamiento y restauración de áreas forestales degradadas o afectadas por actividades antrópicas. El proyecto incluyó la remoción de residuos sólidos, control de especies invasoras, eliminación de material vegetal muerto que representa riesgo de incendios, establecimiento de corredores de acceso para prevención de incendios, y restauración de la vegetación nativa. Se trabajó de forma coordinada con comunidades locales y autoridades ambientales.',
    category: 'limpieza-bosques',
    categoryLabel: 'Limpieza de Bosques',
    status: 'completado',
    location: 'Los Ríos, Ecuador',
    startDate: 'Junio 2023',
    endDate: 'Octubre 2023',
    duration: '5 meses',
    client: 'Gobierno Provincial',
    area: '350 hectáreas recuperadas',
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486748019596-48c44d0296f4?w=800&h=600&fit=crop',
    ],
    objectives: [
      'Limpiar y sanear áreas forestales degradadas',
      'Remover residuos sólidos y materiales contaminantes',
      'Controlar especies invasoras que afectan el ecosistema',
      'Reducir riesgo de incendios forestales',
      'Restaurar vegetación nativa en áreas críticas',
      'Involucrar a comunidades locales en conservación',
    ],
    activities: [
      'Diagnóstico de áreas forestales degradadas',
      'Limpieza y remoción de 15 toneladas de residuos',
      'Control mecánico y manual de especies invasoras',
      'Eliminación selectiva de material vegetal muerto',
      'Establecimiento de cortafuegos y caminos de acceso',
      'Plantación de 5,000 plantas nativas',
      'Capacitación a comunidades en prevención de incendios',
      'Señalización de áreas restauradas',
    ],
    results: [
      {
        title: 'Área Limpiada',
        value: '350 ha',
        description: 'Hectáreas de bosque saneadas y restauradas',
      },
      {
        title: 'Residuos Removidos',
        value: '15 ton',
        description: 'Toneladas de basura y contaminantes retirados',
      },
      {
        title: 'Plantas Nativas',
        value: '5,000',
        description: 'Individuos de especies nativas plantados',
      },
      {
        title: 'Comunidades',
        value: '3',
        description: 'Comunidades locales involucradas',
      },
    ],
    team: [
      { role: 'Ingeniero Forestal', count: 2 },
      { role: 'Ecologista', count: 1 },
      { role: 'Brigadista', count: 6 },
      { role: 'Técnico de campo', count: 4 },
    ],
    impact: [
      'Recuperación de 350 hectáreas de bosque degradado',
      'Reducción significativa del riesgo de incendios',
      'Mejora en conectividad de hábitats para fauna',
      'Eliminación de focos de contaminación',
      'Generación de empleo temporal para 25 personas',
      'Fortalecimiento de capacidades comunitarias',
    ],
    testimonial: {
      text: 'El proyecto de limpieza forestal transformó nuestra área comunal. Ahora tenemos un bosque más sano y seguro para todos.',
      author: 'Sra. María Suárez',
      position: 'Presidenta',
      company: 'Comunidad El Progreso',
    },
    featured: false,
  },
  {
    id: '4',
    slug: 'reforestacion',
    number: '04',
    title: 'Reforestación',
    subtitle: 'Programa de Plantaciones Forestales Comerciales y de Conservación',
    shortDescription: 'Consultoría ambiental que incluye asesoramiento y orientación en plantación de árboles',
    fullDescription: 'Proyecto integral de reforestación que combina objetivos de conservación y producción forestal. Se establecieron plantaciones con especies nativas de valor comercial y ecológico, diseñadas bajo principios de silvicultura sostenible. El proyecto incluyó la preparación de terreno, producción de plantas en vivero, plantación en campo, mantenimiento inicial, y establecimiento de sistemas de monitoreo. Se trabajó con propietarios privados y comunidades para garantizar la sostenibilidad a largo plazo del proyecto.',
    category: 'reforestacion',
    categoryLabel: 'Reforestación',
    status: 'en-curso',
    location: 'Los Ríos, Ecuador',
    startDate: 'Septiembre 2023',
    duration: '18 meses',
    client: 'Propietarios Privados y Comunidades',
    area: '200 hectáreas en plantación',
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=600&fit=crop',
    ],
    objectives: [
      'Reforestar 200 hectáreas con especies nativas',
      'Establecer plantaciones forestales comerciales sostenibles',
      'Recuperar áreas degradadas y mejorar conectividad ecológica',
      'Generar alternativas económicas a través de productos forestales',
      'Capturar carbono y mitigar cambio climático',
      'Capacitar a propietarios en manejo de plantaciones',
    ],
    activities: [
      'Selección de sitios y especies apropiadas',
      'Producción de 120,000 plantas en vivero',
      'Preparación de terreno y diseño de plantación',
      'Plantación de 80,000 árboles nativos',
      'Mantenimiento (control de malezas, fertilización)',
      'Establecimiento de parcelas de monitoreo',
      'Capacitación en silvicultura de especies nativas',
      'Seguimiento mensual de supervivencia',
    ],
    results: [
      {
        title: 'Área Plantada',
        value: '130 ha',
        description: 'Hectáreas reforestadas a la fecha',
      },
      {
        title: 'Árboles Plantados',
        value: '80,000',
        description: 'Individuos de especies nativas establecidos',
      },
      {
        title: 'Supervivencia',
        value: '92%',
        description: 'Tasa de sobrevivencia promedio',
      },
      {
        title: 'Familias Beneficiadas',
        value: '15',
        description: 'Propietarios participantes en el proyecto',
      },
    ],
    team: [
      { role: 'Ingeniero Forestal', count: 2 },
      { role: 'Viverista', count: 2 },
      { role: 'Técnico forestal', count: 3 },
      { role: 'Trabajadores de campo', count: 12 },
    ],
    impact: [
      'Recuperación de 130 hectáreas de áreas degradadas',
      'Captura estimada de 15,000 toneladas de CO2 en 20 años',
      'Generación de empleo para 30 personas',
      'Mejora en conectividad de corredores biológicos',
      'Alternativa económica sostenible para familias rurales',
      'Recuperación de biodiversidad local',
    ],
    testimonial: {
      text: 'El proyecto de reforestación nos dio esperanza. Ahora vemos nuestro terreno lleno de árboles que en pocos años nos darán beneficios económicos y ambientales.',
      author: 'Sr. Luis Morales',
      position: 'Propietario',
      company: 'Finca La Esperanza',
    },
    featured: true,
  },
]


// Función helper para obtener proyecto por slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((project) => project.slug === slug)
}

// Función helper para obtener todos los proyectos
export function getAllProjects(): Project[] {
  return projectsData
}

// Función helper para obtener proyectos destacados
export function getFeaturedProjects(): Project[] {
  return projectsData.filter((project) => project.featured)
}
