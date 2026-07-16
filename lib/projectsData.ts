// Datos de proyectos para TAMEFOR
export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  fullDescription: string;
  category: 'reforestacion' | 'gestion' | 'investigacion' | 'conservacion' | 'capacitacion';
  location: string;
  startDate: string;
  endDate?: string;
  status: 'en-curso' | 'completado' | 'planificado';
  budget?: string;
  beneficiaries: string;
  images: string[];
  objectives: string[];
  activities: {
    phase: string;
    description: string;
    tasks: string[];
  }[];
  results: string[];
  partners: string[];
  contact: {
    coordinator: string;
    email: string;
    phone: string;
  };
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: '1',
    slug: 'reforestacion-rio-palenque',
    title: 'Reforestación Río Palenque',
    subtitle: 'Restauración de ecosistema ribereño',
    shortDescription: 'Proyecto de reforestación en la cuenca del Río Palenque con especies nativas.',
    fullDescription: 'Proyecto integral de restauración ecológica en la cuenca del Río Palenque, enfocado en la reforestación con especies nativas y la recuperación del ecosistema ribereño. El proyecto busca mejorar la calidad del agua, aumentar la biodiversidad y generar beneficios socioeconómicos para las comunidades locales.',
    category: 'reforestacion',
    location: 'Cuenca del Río Palenque, Los Ríos',
    startDate: '2023-01-15',
    endDate: '2025-12-31',
    status: 'en-curso',
    budget: '$150,000',
    beneficiaries: '500 familias, 2,500 hectáreas',
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070'],
    objectives: [
      'Reforestar 2,500 hectáreas con especies nativas',
      'Restaurar el ecosistema ribereño',
      'Mejorar la calidad del agua',
      'Generar empleo local',
      'Aumentar la biodiversidad'
    ],
    activities: [
      {
        phase: 'Fase 1: Preparación',
        description: 'Diagnóstico ambiental y preparación del terreno',
        tasks: [
          'Evaluación de línea base',
          'Selección de especies',
          'Preparación de viveros'
        ]
      },
      {
        phase: 'Fase 2: Implementación',
        description: 'Plantación y establecimiento de árboles',
        tasks: [
          'Plantación de 50,000 árboles',
          'Mantenimiento y riego',
          'Monitoreo de supervivencia'
        ]
      },
      {
        phase: 'Fase 3: Consolidación',
        description: 'Seguimiento y evaluación de resultados',
        tasks: [
          'Monitoreo ambiental',
          'Evaluación de impacto',
          'Capacitación comunitaria'
        ]
      }
    ],
    results: [
      '1,200 hectáreas reforestadas en 2024',
      '35,000 árboles plantados',
      '150 empleos generados',
      'Mejora del 40% en calidad de agua'
    ],
    partners: ['Ministerio del Ambiente', 'ONG Bosques Vivos', 'Comunidades Locales'],
    contact: {
      coordinator: 'Ing. For. Carlos Mendoza',
      email: 'carlos.mendoza@tamefor.org',
      phone: '+593 5 2123456'
    },
    featured: true
  },
  {
    id: '2',
    slug: 'manejo-sostenible-plantaciones',
    title: 'Manejo Sostenible de Plantaciones Forestales',
    subtitle: 'Implementación de buenas prácticas',
    shortDescription: 'Proyecto de capacitación y asistencia técnica en manejo sostenible de plantaciones.',
    fullDescription: 'Proyecto de transferencia tecnológica y capacitación dirigido a pequeños y medianos productores forestales. Busca implementar prácticas de manejo sostenible que mejoren la productividad, protejan el ambiente y generen ingresos sostenibles.',
    category: 'gestion',
    location: 'Provincia de Los Ríos',
    startDate: '2024-03-01',
    endDate: '2026-02-28',
    status: 'en-curso',
    budget: '$200,000',
    beneficiaries: '300 productores, 5,000 hectáreas',
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070'],
    objectives: [
      'Capacitar a 300 productores forestales',
      'Implementar prácticas sostenibles',
      'Mejorar la productividad',
      'Reducir impacto ambiental',
      'Aumentar ingresos'
    ],
    activities: [
      {
        phase: 'Fase 1: Diagnóstico',
        description: 'Evaluación de sistemas actuales',
        tasks: [
          'Encuestas a productores',
          'Análisis de prácticas actuales',
          'Identificación de necesidades'
        ]
      },
      {
        phase: 'Fase 2: Capacitación',
        description: 'Talleres y demostraciones',
        tasks: [
          '24 talleres de capacitación',
          'Parcelas demostrativas',
          'Asistencia técnica individual'
        ]
      }
    ],
    results: [
      '250 productores capacitados',
      '3,500 hectáreas bajo manejo sostenible',
      'Aumento de 25% en productividad',
      'Reducción de 30% en costos'
    ],
    partners: ['FAO', 'Ministerio de Agricultura', 'Asociaciones de Productores'],
    contact: {
      coordinator: 'Ing. For. María González',
      email: 'maria.gonzalez@tamefor.org',
      phone: '+593 5 2123457'
    },
    featured: true
  },
  {
    id: '3',
    slug: 'investigacion-biodiversidad',
    title: 'Investigación de Biodiversidad en Bosques Secundarios',
    subtitle: 'Estudio de fauna y flora',
    shortDescription: 'Proyecto de investigación sobre biodiversidad en bosques secundarios de la región.',
    fullDescription: 'Proyecto de investigación científica enfocado en el estudio de la biodiversidad en bosques secundarios. Busca generar información sobre especies, ecosistemas y servicios ambientales para informar políticas de conservación.',
    category: 'investigacion',
    location: 'Bosques Secundarios, Los Ríos',
    startDate: '2023-06-01',
    endDate: '2025-05-31',
    status: 'en-curso',
    budget: '$120,000',
    beneficiaries: 'Comunidad científica, 1,000 hectáreas',
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070'],
    objectives: [
      'Inventariar especies de flora y fauna',
      'Evaluar servicios ecosistémicos',
      'Generar información científica',
      'Fortalecer capacidades de investigación',
      'Publicar resultados'
    ],
    activities: [
      {
        phase: 'Fase 1: Muestreo',
        description: 'Colecta de datos de campo',
        tasks: [
          'Transectos de vegetación',
          'Trampas de fauna',
          'Análisis de suelos'
        ]
      },
      {
        phase: 'Fase 2: Análisis',
        description: 'Procesamiento de datos',
        tasks: [
          'Identificación de especies',
          'Análisis estadístico',
          'Modelamiento'
        ]
      }
    ],
    results: [
      '450 especies identificadas',
      '15 publicaciones científicas',
      '8 tesis de postgrado',
      'Base de datos de biodiversidad'
    ],
    partners: ['Universidad Técnica de Babahoyo', 'Instituto Nacional de Biodiversidad', 'PNUD'],
    contact: {
      coordinator: 'Dr. Juan Rodríguez',
      email: 'juan.rodriguez@tamefor.org',
      phone: '+593 5 2123458'
    },
    featured: false
  },
  {
    id: '4',
    slug: 'conservacion-bosques-protegidos',
    title: 'Conservación de Bosques Protegidos',
    subtitle: 'Protección y vigilancia',
    shortDescription: 'Proyecto de protección y vigilancia de bosques protegidos en la región.',
    fullDescription: 'Proyecto integral de conservación que combina vigilancia, patrullaje y educación ambiental para proteger bosques protegidos de la deforestación y el aprovechamiento ilegal.',
    category: 'conservacion',
    location: 'Bosques Protegidos, Los Ríos',
    startDate: '2022-01-01',
    endDate: '2026-12-31',
    status: 'en-curso',
    budget: '$180,000',
    beneficiaries: '3,000 hectáreas protegidas',
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070'],
    objectives: [
      'Proteger 3,000 hectáreas de bosque',
      'Reducir deforestación',
      'Fortalecer vigilancia',
      'Educar a comunidades',
      'Generar empleo'
    ],
    activities: [
      {
        phase: 'Vigilancia',
        description: 'Patrullaje y monitoreo',
        tasks: [
          'Patrullaje diario',
          'Monitoreo satelital',
          'Registro de incidentes'
        ]
      },
      {
        phase: 'Educación',
        description: 'Programas educativos',
        tasks: [
          'Talleres comunitarios',
          'Educación escolar',
          'Campañas de conciencia'
        ]
      }
    ],
    results: [
      '0% deforestación en área protegida',
      '50 guardabosques empleados',
      '2,000 personas capacitadas',
      'Reducción de 80% en tala ilegal'
    ],
    partners: ['Ministerio del Ambiente', 'Comunidades Indígenas', 'ONG Conservacionistas'],
    contact: {
      coordinator: 'Ing. For. Pedro López',
      email: 'pedro.lopez@tamefor.org',
      phone: '+593 5 2123459'
    },
    featured: true
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(project => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projectsData.filter(project => project.featured);
}
