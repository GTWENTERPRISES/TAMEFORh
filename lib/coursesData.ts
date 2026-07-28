// Datos de cursos para TAMEFOR - Capacitación Continua
export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  fullDescription: string;
  category: 'administracion-general' | 'gestion-impacto-ambiental' | 'legislacion' | 'manejo-recursos-naturales' | 'produccion-limpia';
  categoryLabel: string;
  area: string;
  codigoArea: string;
  codigoEspecialidad: string;
  duration: string;
  cargaHoraria: number;
  modality: string[];
  tipoParticipante: string;
  price: {
    basePerLevel: number;
    levels: number;
    regular: number;
    student: number;
    memberTamefor: number;
    affiliateConifor: number;
    enabledMemberTamefor: number;
  };
  schedule: {
    startDate: string;
    endDate: string;
    sessions: string;
    hours: string;
  };
  instructor: {
    name: string;
    credentials: string;
    experience: string;
    photo?: string;
  };
  objectives: string[];
  content: {
    module: string;
    topics: string[];
  }[];
  requirements: string[];
  benefits: string[];
  certification: {
    institution: string;
    validity: string;
    type: string;
  };
  featured: boolean;
  available: boolean;
}

export const coursesData: Course[] = [
  {
    id: '1',
    slug: 'modelacion-biometria-manejo-datos',
    title: 'Modelación, Biometría y Manejo de Datos',
    subtitle: 'Nivel I, II y III',
    shortDescription: 'Domina la ciencia de datos aplicada a sistemas forestales y ambientales con herramientas estadísticas avanzadas y software especializado.',
    fullDescription: 'Programa integral de formación en modelación matemática, biometría y manejo de datos para profesionales del sector forestal y ambiental. Este curso abarca desde los fundamentos estadísticos hasta técnicas avanzadas de modelación, permitiendo a los participantes desarrollar competencias sólidas en el análisis cuantitativo de datos biológicos y ambientales. Se trabajará con software estadístico R, Python y herramientas de visualización de datos para la toma de decisiones basada en evidencia.',
    category: 'administracion-general',
    categoryLabel: 'Administración General',
    area: 'Administración y Legislación',
    codigoArea: 'A',
    codigoEspecialidad: 'A.1',
    duration: '120 horas académicas',
    cargaHoraria: 120,
    modality: ['Virtual'],
    tipoParticipante: 'Adultos',
    price: {
      basePerLevel: 125,
      levels: 3,
      regular: 300,
      student: 300,
      memberTamefor: 300,
      affiliateConifor: 300,
      enabledMemberTamefor: 300
    },
    schedule: {
      startDate: 'Por confirmar',
      endDate: 'Por confirmar',
      sessions: 'Sesiones sincrónicas y asincrónicas',
      hours: 'Google Meet / Plataforma Virtual'
    },
    instructor: {
      name: 'Por confirmar',
      credentials: 'Especialista en Biometría y Modelación Estadística',
      experience: 'Amplia experiencia en análisis de datos forestales'
    },
    objectives: [
      'Aplicar técnicas estadísticas fundamentales y avanzadas en investigación forestal y ambiental',
      'Desarrollar modelos de crecimiento, rendimiento y predicción para sistemas biológicos',
      'Manejar software estadístico R y Python para el procesamiento y análisis de grandes volúmenes de datos',
      'Interpretar resultados estadísticos y traducirlos en recomendaciones técnicas',
      'Diseñar y ejecutar planes de muestreo y experimentos forestales'
    ],
    content: [
      {
        module: 'Nivel I: Fundamentos de Biometría y Estadística',
        topics: [
          'Conceptos básicos de estadística descriptiva e inferencial',
          'Distribuciones de probabilidad aplicadas a datos biológicos',
          'Diseño de muestreo y experimentos forestales',
          'Introducción a R y RStudio para análisis de datos',
          'Pruebas de hipótesis y análisis de varianza (ANOVA)'
        ]
      },
      {
        module: 'Nivel II: Modelación y Regresión',
        topics: [
          'Modelos de regresión lineal y no lineal',
          'Modelos de crecimiento forestal (Chapman-Richards, Weibull)',
          'Análisis multivariado y componentes principales',
          'Series temporales y análisis de tendencias',
          'Validación cruzada y selección de modelos'
        ]
      },
      {
        module: 'Nivel III: Ciencia de Datos Avanzada',
        topics: [
          'Machine learning aplicado a datos forestales',
          'Visualización avanzada de datos con ggplot2 y Plotly',
          'Manejo de bases de datos espaciales y temporales',
          'Automatización de reportes y dashboards',
          'Proyecto integrador con datos reales'
        ]
      }
    ],
    requirements: [
      'Formación universitaria en ciencias forestales, ambientales o afines',
      'Conocimientos básicos de matemáticas y estadística',
      'Computadora con acceso a internet estable',
      'Disposición para instalar software gratuito (R, RStudio)'
    ],
    benefits: [
      'Certificación avalada por SENECYT y Ministerio del Trabajo',
      'Acceso a bases de datos forestales reales para prácticas',
      'Scripts y plantillas prediseñadas para uso profesional',
      'Material didáctico digital completo',
      'Sesiones de consultoría post-curso'
    ],
    certification: {
      institution: 'SENECYT - Ministerio del Trabajo',
      validity: 'Permanente',
      type: 'Certificado de Capacitación Continua'
    },
    featured: true,
    available: true
  },
  {
    id: '2',
    slug: 'sistemas-informacion-geografica',
    title: 'Sistemas de Información Geográfica',
    subtitle: 'Nivel I, II y III',
    shortDescription: 'Domina las herramientas SIG para el análisis espacial, gestión territorial y toma de decisiones en el sector forestal y ambiental.',
    fullDescription: 'Programa completo de formación en Sistemas de Información Geográfica (SIG) aplicados al sector forestal y ambiental. Los participantes adquirirán competencias progresivas desde los fundamentos de la geomática hasta el análisis espacial avanzado, teledetección y modelamiento territorial. Se utilizarán plataformas como QGIS, ArcGIS y Google Earth Engine para desarrollar proyectos aplicados a la gestión de recursos naturales.',
    category: 'gestion-impacto-ambiental',
    categoryLabel: 'Gestión e Impacto Ambiental',
    area: 'Forestal, Ecología y Ambiente',
    codigoArea: 'I',
    codigoEspecialidad: 'I.2',
    duration: '120 horas académicas',
    cargaHoraria: 120,
    modality: ['Virtual'],
    tipoParticipante: 'Adultos',
    price: {
      basePerLevel: 125,
      levels: 3,
      regular: 300,
      student: 300,
      memberTamefor: 300,
      affiliateConifor: 300,
      enabledMemberTamefor: 300
    },
    schedule: {
      startDate: 'Por confirmar',
      endDate: 'Por confirmar',
      sessions: 'Sesiones sincrónicas y asincrónicas',
      hours: 'Google Meet / Plataforma Virtual'
    },
    instructor: {
      name: 'Por confirmar',
      credentials: 'Especialista en Geomática y SIG',
      experience: 'Amplia experiencia en análisis espacial forestal'
    },
    objectives: [
      'Dominar los conceptos fundamentales de los Sistemas de Información Geográfica',
      'Utilizar software QGIS y ArcGIS para captura, procesamiento y análisis de datos espaciales',
      'Crear mapas temáticos profesionales para gestión forestal y ambiental',
      'Aplicar técnicas de teledetección y análisis de imágenes satelitales',
      'Desarrollar proyectos de análisis espacial con datos reales'
    ],
    content: [
      {
        module: 'Nivel I: Fundamentos de SIG',
        topics: [
          'Conceptos básicos de geomática y sistemas de referencia',
          'Tipos de datos espaciales: ráster y vectorial',
          'Introducción a QGIS: interfaz, herramientas y plugins',
          'Digitalización, edición y gestión de capas',
          'Análisis espacial básico y consultas'
        ]
      },
      {
        module: 'Nivel II: SIG Intermedio y Teledetección',
        topics: [
          'Análisis de redes y modelamiento hidrológico',
          'Procesamiento de imágenes satelitales (Sentinel, Landsat)',
          'Índices de vegetación (NDVI, EVI) y análisis multitemporal',
          'Geoprocesamiento avanzado y modelamiento espacial',
          'Diseño cartográfico profesional'
        ]
      },
      {
        module: 'Nivel III: SIG Avanzado y Google Earth Engine',
        topics: [
          'Introducción a Google Earth Engine para monitoreo ambiental',
          'Análisis de cambio de uso de suelo y deforestación',
          'Modelamiento de hábitat y conectividad ecológica',
          'Drones y fotogrametría aplicada',
          'Proyecto integrador con datos geoespaciales reales'
        ]
      }
    ],
    requirements: [
      'Formación universitaria en ciencias forestales, ambientales, geográficas o afines',
      'Conocimientos básicos de informática',
      'Computadora con capacidad para ejecutar software SIG',
      'Conexión a internet estable'
    ],
    benefits: [
      'Certificación avalada por SENECYT y Ministerio del Trabajo',
      'Acceso a datos geoespaciales para prácticas',
      'Licencias educativas de software SIG',
      'Proyectos prácticos con datos reales del Ecuador',
      'Material didáctico y tutoriales descargables'
    ],
    certification: {
      institution: 'SENECYT - Ministerio del Trabajo',
      validity: 'Permanente',
      type: 'Certificado de Capacitación Continua'
    },
    featured: true,
    available: true
  },
  {
    id: '3',
    slug: 'negocios-gerencia-activos-verdes',
    title: 'Negocios y Gerencia de Activos Verdes',
    subtitle: 'Gestión Empresarial Sostenible',
    shortDescription: 'Aprende a gestionar y valorar activos verdes, desarrollando modelos de negocio sostenibles para el sector forestal y ambiental.',
    fullDescription: 'Curso especializado en la gestión empresarial de activos verdes y recursos naturales renovables. Los participantes desarrollarán competencias en valoración económica de servicios ecosistémicos, diseño de modelos de negocio sostenibles, mercados de carbono y finanzas verdes. Un programa diseñado para profesionales que buscan integrar la sostenibilidad ambiental con la rentabilidad económica en el sector forestal.',
    category: 'gestion-impacto-ambiental',
    categoryLabel: 'Gestión e Impacto Ambiental',
    area: 'Forestal, Ecología y Ambiente',
    codigoArea: 'I',
    codigoEspecialidad: 'I.2',
    duration: '120 horas académicas',
    cargaHoraria: 120,
    modality: ['Virtual'],
    tipoParticipante: 'Adultos',
    price: {
      basePerLevel: 125,
      levels: 1,
      regular: 125,
      student: 125,
      memberTamefor: 125,
      affiliateConifor: 125,
      enabledMemberTamefor: 125
    },
    schedule: {
      startDate: 'Por confirmar',
      endDate: 'Por confirmar',
      sessions: 'Sesiones sincrónicas y asincrónicas',
      hours: 'Google Meet / Plataforma Virtual'
    },
    instructor: {
      name: 'Por confirmar',
      credentials: 'Especialista en Economía Ambiental y Negocios Verdes',
      experience: 'Amplia experiencia en gestión de activos verdes'
    },
    objectives: [
      'Comprender los fundamentos de la economía verde y la valoración de activos naturales',
      'Diseñar modelos de negocio basados en recursos naturales renovables',
      'Aplicar metodologías de valoración económica de servicios ecosistémicos',
      'Conocer los mecanismos de mercados de carbono y bonos verdes',
      'Desarrollar planes de negocio sostenibles para el sector forestal'
    ],
    content: [
      {
        module: 'Módulo 1: Fundamentos de Economía Verde',
        topics: [
          'Conceptos de economía verde y desarrollo sostenible',
          'Valoración económica de servicios ecosistémicos',
          'Marco regulatorio y políticas públicas ambientales',
          'Indicadores de sostenibilidad empresarial',
          'Responsabilidad social corporativa ambiental'
        ]
      },
      {
        module: 'Módulo 2: Mercados de Carbono y Finanzas Verdes',
        topics: [
          'Mercados voluntarios y regulados de carbono',
          'Metodologías de cuantificación de emisiones y captura',
          'Bonos verdes y financiamiento climático',
          'Proyectos REDD+ y mecanismos de compensación',
          'Certificaciones ambientales y sellos verdes'
        ]
      },
      {
        module: 'Módulo 3: Gerencia de Activos Verdes',
        topics: [
          'Planificación estratégica de negocios forestales',
          'Cadenas de valor de productos forestales maderables y no maderables',
          'Marketing verde y posicionamiento de productos sostenibles',
          'Gestión financiera de proyectos ambientales',
          'Plan de negocios integrador'
        ]
      }
    ],
    requirements: [
      'Formación universitaria en ciencias forestales, ambientales, económicas o afines',
      'Interés en emprendimiento sostenible',
      'Acceso a internet estable',
      'Conocimientos básicos de gestión empresarial'
    ],
    benefits: [
      'Certificación avalada por SENECYT y Ministerio del Trabajo',
      'Herramientas de valoración económica ambiental',
      'Plantillas de planes de negocio sostenibles',
      'Red de contactos en el sector de negocios verdes',
      'Acceso a casos de estudio reales'
    ],
    certification: {
      institution: 'SENECYT - Ministerio del Trabajo',
      validity: 'Permanente',
      type: 'Certificado de Capacitación Continua'
    },
    featured: true,
    available: true
  },
  {
    id: '4',
    slug: 'derecho-ambiental-gobernanza',
    title: 'Derecho Ambiental y Gobernanza',
    subtitle: 'Legislación y Marco Regulatorio Ambiental',
    shortDescription: 'Domina el marco jurídico ambiental ecuatoriano e internacional para la gestión legal de proyectos forestales y ambientales.',
    fullDescription: 'Curso especializado en derecho ambiental, gobernanza y marcos regulatorios aplicados al sector forestal y ambiental. Los participantes adquirirán conocimientos sobre legislación ambiental nacional e internacional, mecanismos de negociación, mediación y arbitraje ambiental, así como normativas sobre patentes y propiedad intelectual de recursos biológicos. Un programa esencial para profesionales que requieren dominar el componente legal de la gestión ambiental.',
    category: 'legislacion',
    categoryLabel: 'Legislación (Aduanera, Negociación, Mediación, Arbitraje, Patentes, Propiedad)',
    area: 'Administración y Legislación',
    codigoArea: 'A',
    codigoEspecialidad: 'A.6',
    duration: '120 horas académicas',
    cargaHoraria: 120,
    modality: ['Virtual'],
    tipoParticipante: 'Adultos',
    price: {
      basePerLevel: 125,
      levels: 1,
      regular: 125,
      student: 125,
      memberTamefor: 125,
      affiliateConifor: 125,
      enabledMemberTamefor: 125
    },
    schedule: {
      startDate: 'Por confirmar',
      endDate: 'Por confirmar',
      sessions: 'Sesiones sincrónicas y asincrónicas',
      hours: 'Google Meet / Plataforma Virtual'
    },
    instructor: {
      name: 'Por confirmar',
      credentials: 'Especialista en Derecho Ambiental y Gobernanza',
      experience: 'Amplia experiencia en legislación ambiental'
    },
    objectives: [
      'Dominar el marco jurídico ambiental ecuatoriano e internacional',
      'Aplicar mecanismos de negociación y mediación en conflictos ambientales',
      'Comprender la normativa sobre patentes y propiedad intelectual de recursos biológicos',
      'Analizar políticas públicas de gobernanza ambiental',
      'Elaborar documentos legales para proyectos forestales y ambientales'
    ],
    content: [
      {
        module: 'Módulo 1: Marco Jurídico Ambiental',
        topics: [
          'Constitución y derechos de la naturaleza en Ecuador',
          'Código Orgánico del Ambiente y su reglamento',
          'Convenios y tratados ambientales internacionales',
          'Legislación forestal y de biodiversidad',
          'Normativa de áreas protegidas y vida silvestre'
        ]
      },
      {
        module: 'Módulo 2: Gobernanza y Políticas Públicas',
        topics: [
          'Gobernanza ambiental multinivel',
          'Participación ciudadana y consulta previa',
          'Institucionalidad ambiental en Ecuador',
          'Políticas de cambio climático y adaptación',
          'Mecanismos de fiscalización y control ambiental'
        ]
      },
      {
        module: 'Módulo 3: Mediación, Arbitraje y Propiedad Intelectual',
        topics: [
          'Mecanismos alternativos de resolución de conflictos ambientales',
          'Arbitraje ambiental nacional e internacional',
          'Propiedad intelectual sobre recursos genéticos',
          'Patentes y protección de conocimientos tradicionales',
          'Casos prácticos y simulaciones legales'
        ]
      }
    ],
    requirements: [
      'Formación universitaria en derecho, ciencias forestales, ambientales o afines',
      'Interés en legislación y gobernanza ambiental',
      'Acceso a internet estable',
      'Capacidad de análisis y lectura crítica'
    ],
    benefits: [
      'Certificación avalada por SENECYT y Ministerio del Trabajo',
      'Compendio de legislación ambiental actualizada',
      'Plantillas de documentos legales ambientales',
      'Acceso a jurisprudencia y casos de estudio',
      'Red de profesionales en derecho ambiental'
    ],
    certification: {
      institution: 'SENECYT - Ministerio del Trabajo',
      validity: 'Permanente',
      type: 'Certificado de Capacitación Continua'
    },
    featured: true,
    available: true
  },
  {
    id: '5',
    slug: 'nutricion-vegetal-precision',
    title: 'Nutrición Vegetal de Precisión: Diagnóstico y Manejo de Fertilidad',
    subtitle: 'Tecnología Avanzada para la Fertilidad del Suelo',
    shortDescription: 'Aprende técnicas de diagnóstico nutricional y manejo de fertilidad para optimizar la producción agrícola y forestal.',
    fullDescription: 'Curso especializado en nutrición vegetal de precisión enfocado en el diagnóstico y manejo de la fertilidad del suelo. Los participantes adquirirán competencias avanzadas en análisis de suelos, interpretación de resultados analíticos, formulación de planes de fertilización y uso de tecnologías de precisión para optimizar la nutrición de cultivos agrícolas y forestales. Se integran herramientas de agricultura de precisión con conocimientos de edafología y fisiología vegetal.',
    category: 'manejo-recursos-naturales',
    categoryLabel: 'Manejo y Conservación de Recursos Naturales',
    area: 'Forestal, Ecología y Ambiente',
    codigoArea: 'I',
    codigoEspecialidad: 'I.3',
    duration: '120 horas académicas',
    cargaHoraria: 120,
    modality: ['Virtual'],
    tipoParticipante: 'Adultos',
    price: {
      basePerLevel: 125,
      levels: 1,
      regular: 125,
      student: 125,
      memberTamefor: 125,
      affiliateConifor: 125,
      enabledMemberTamefor: 125
    },
    schedule: {
      startDate: 'Por confirmar',
      endDate: 'Por confirmar',
      sessions: 'Sesiones sincrónicas y asincrónicas',
      hours: 'Google Meet / Plataforma Virtual'
    },
    instructor: {
      name: 'Por confirmar',
      credentials: 'Especialista en Edafología y Nutrición Vegetal',
      experience: 'Amplia experiencia en manejo de fertilidad de suelos'
    },
    objectives: [
      'Comprender los principios de nutrición vegetal y fertilidad del suelo',
      'Interpretar análisis de suelos y tejidos vegetales para diagnóstico nutricional',
      'Formular planes de fertilización integrada basados en datos analíticos',
      'Aplicar tecnologías de agricultura de precisión para optimizar la fertilización',
      'Evaluar la eficiencia de programas de nutrición vegetal'
    ],
    content: [
      {
        module: 'Módulo 1: Fundamentos de Nutrición Vegetal',
        topics: [
          'Elementos esenciales y su función en las plantas',
          'Propiedades físicas, químicas y biológicas del suelo',
          'Ciclos de nutrientes en agroecosistemas',
          'Diagnóstico visual de deficiencias nutricionales',
          'Muestreo de suelos y tejidos vegetales'
        ]
      },
      {
        module: 'Módulo 2: Diagnóstico y Análisis',
        topics: [
          'Interpretación de análisis de suelos completos',
          'Análisis foliar y diagnóstico nutricional',
          'Relaciones catiónicas y balance nutricional',
          'Herramientas digitales para diagnóstico de fertilidad',
          'Mapas de fertilidad y variabilidad espacial'
        ]
      },
      {
        module: 'Módulo 3: Manejo de Fertilidad de Precisión',
        topics: [
          'Fuentes de fertilizantes: orgánicos, minerales y biológicos',
          'Formulación de planes de fertilización sitio-específico',
          'Agricultura de precisión: sensores, drones y VRT',
          'Fertirrigación y nutrición hidropónica',
          'Evaluación económica y ambiental de programas de fertilización'
        ]
      }
    ],
    requirements: [
      'Formación universitaria en agronomía, ciencias forestales o afines',
      'Conocimientos básicos de química y biología',
      'Acceso a internet estable',
      'Interés en tecnologías de precisión aplicadas al agro'
    ],
    benefits: [
      'Certificación avalada por SENECYT y Ministerio del Trabajo',
      'Software y herramientas de diagnóstico nutricional',
      'Protocolos de muestreo y análisis estandarizados',
      'Base de datos de recomendaciones de fertilización',
      'Consultoría técnica post-curso'
    ],
    certification: {
      institution: 'SENECYT - Ministerio del Trabajo',
      validity: 'Permanente',
      type: 'Certificado de Capacitación Continua'
    },
    featured: true,
    available: true
  },
  {
    id: '6',
    slug: 'gestion-tecnica-comercial-agroquimicos',
    title: 'Gestión Técnica y Comercial de Agroquímicos',
    subtitle: 'Manejo Responsable y Comercialización',
    shortDescription: 'Desarrolla competencias en la gestión técnica, regulatoria y comercial de productos agroquímicos con enfoque en producción limpia.',
    fullDescription: 'Curso integral sobre la gestión técnica y comercial de productos agroquímicos en el contexto de la producción limpia. Los participantes adquirirán conocimientos sobre formulación, regulación, comercialización y uso responsable de agroquímicos, integrando prácticas de manejo integrado de plagas (MIP) y normativas de seguridad. El programa aborda la cadena completa desde la formulación hasta la aplicación en campo, con énfasis en la reducción de impacto ambiental.',
    category: 'produccion-limpia',
    categoryLabel: 'Producción Limpia',
    area: 'Forestal, Ecología y Ambiente',
    codigoArea: 'I',
    codigoEspecialidad: 'I.4',
    duration: '120 horas académicas',
    cargaHoraria: 120,
    modality: ['Virtual'],
    tipoParticipante: 'Adultos',
    price: {
      basePerLevel: 125,
      levels: 1,
      regular: 125,
      student: 125,
      memberTamefor: 125,
      affiliateConifor: 125,
      enabledMemberTamefor: 125
    },
    schedule: {
      startDate: 'Por confirmar',
      endDate: 'Por confirmar',
      sessions: 'Sesiones sincrónicas y asincrónicas',
      hours: 'Google Meet / Plataforma Virtual'
    },
    instructor: {
      name: 'Por confirmar',
      credentials: 'Especialista en Protección Vegetal y Agroquímicos',
      experience: 'Amplia experiencia en gestión de productos fitosanitarios'
    },
    objectives: [
      'Comprender la clasificación, formulación y mecanismos de acción de agroquímicos',
      'Dominar la normativa regulatoria para registro y comercialización de agroquímicos',
      'Aplicar principios de manejo integrado de plagas (MIP) en sistemas productivos',
      'Implementar protocolos de seguridad en el manejo y aplicación de agroquímicos',
      'Desarrollar estrategias comerciales para productos fitosanitarios'
    ],
    content: [
      {
        module: 'Módulo 1: Fundamentos Técnicos de Agroquímicos',
        topics: [
          'Clasificación toxicológica y bandas de color',
          'Formulaciones y tipos de productos fitosanitarios',
          'Mecanismos de acción de herbicidas, fungicidas e insecticidas',
          'Farmacocinética y farmacodinamia de agroquímicos',
          'Resistencia de plagas y estrategias de manejo'
        ]
      },
      {
        module: 'Módulo 2: Regulación y Seguridad',
        topics: [
          'Marco regulatorio nacional e internacional de agroquímicos',
          'Procesos de registro y autorización de productos',
          'Normativas de seguridad ocupacional y ambiental',
          'Manejo de envases y residuos de agroquímicos',
          'Buenas prácticas agrícolas (BPA) y límites máximos de residuos'
        ]
      },
      {
        module: 'Módulo 3: Comercialización y MIP',
        topics: [
          'Estrategias comerciales para productos fitosanitarios',
          'Asesoría técnica y venta responsable',
          'Manejo integrado de plagas: principios y aplicación',
          'Alternativas biológicas y productos de bajo impacto',
          'Trazabilidad y logística de agroquímicos'
        ]
      }
    ],
    requirements: [
      'Formación universitaria en agronomía, ciencias forestales o afines',
      'Interés en protección vegetal y gestión de agroquímicos',
      'Acceso a internet estable',
      'Conocimientos básicos de biología y química'
    ],
    benefits: [
      'Certificación avalada por SENECYT y Ministerio del Trabajo',
      'Compendio de normativas vigentes sobre agroquímicos',
      'Guías de manejo integrado de plagas',
      'Protocolos de seguridad y primeros auxilios',
      'Red de profesionales del sector fitosanitario'
    ],
    certification: {
      institution: 'SENECYT - Ministerio del Trabajo',
      validity: 'Permanente',
      type: 'Certificado de Capacitación Continua'
    },
    featured: true,
    available: true
  },
  {
    id: '7',
    slug: 'gestion-integral-riesgos-salud-ocupacional',
    title: 'Gestión Integral de Riesgos, Salud Ocupacional y Medio Ambiente',
    subtitle: 'Sistemas Integrados de Gestión HSE',
    shortDescription: 'Desarrolla competencias en gestión integral de riesgos laborales, salud ocupacional y protección ambiental en el sector forestal.',
    fullDescription: 'Curso especializado en sistemas integrados de gestión de riesgos, salud ocupacional y medio ambiente (HSE) aplicados al sector forestal y agropecuario. Los participantes adquirirán competencias para identificar, evaluar y controlar riesgos laborales y ambientales, implementar sistemas de gestión según normas internacionales (ISO 45001, ISO 14001) y desarrollar programas de seguridad y salud en el trabajo. Un programa esencial para la prevención de accidentes y la protección del medio ambiente en operaciones forestales.',
    category: 'gestion-impacto-ambiental',
    categoryLabel: 'Gestión e Impacto Ambiental',
    area: 'Forestal, Ecología y Ambiente',
    codigoArea: 'I',
    codigoEspecialidad: 'I.2',
    duration: '120 horas académicas',
    cargaHoraria: 120,
    modality: ['Virtual'],
    tipoParticipante: 'Adultos',
    price: {
      basePerLevel: 125,
      levels: 1,
      regular: 125,
      student: 125,
      memberTamefor: 125,
      affiliateConifor: 125,
      enabledMemberTamefor: 125
    },
    schedule: {
      startDate: 'Por confirmar',
      endDate: 'Por confirmar',
      sessions: 'Sesiones sincrónicas y asincrónicas',
      hours: 'Google Meet / Plataforma Virtual'
    },
    instructor: {
      name: 'Por confirmar',
      credentials: 'Especialista en Seguridad Industrial y Medio Ambiente',
      experience: 'Amplia experiencia en sistemas HSE'
    },
    objectives: [
      'Identificar y evaluar riesgos laborales en operaciones forestales y agrícolas',
      'Implementar sistemas de gestión de seguridad y salud ocupacional (ISO 45001)',
      'Diseñar programas de protección ambiental según ISO 14001',
      'Desarrollar planes de emergencia y contingencia para operaciones de campo',
      'Integrar la gestión de riesgos, salud y medio ambiente en un sistema unificado'
    ],
    content: [
      {
        module: 'Módulo 1: Gestión de Riesgos Laborales',
        topics: [
          'Identificación de peligros y evaluación de riesgos (IPER)',
          'Normativa ecuatoriana de seguridad y salud en el trabajo',
          'Equipos de protección personal (EPP) para actividades forestales',
          'Investigación y análisis de accidentes e incidentes',
          'Ergonomía y factores psicosociales en el trabajo'
        ]
      },
      {
        module: 'Módulo 2: Salud Ocupacional',
        topics: [
          'Vigilancia de la salud de los trabajadores',
          'Enfermedades profesionales en el sector forestal',
          'Exposición a agentes químicos, físicos y biológicos',
          'Primeros auxilios y emergencias médicas en campo',
          'Programas de bienestar laboral'
        ]
      },
      {
        module: 'Módulo 3: Gestión Ambiental Integrada',
        topics: [
          'Sistemas de gestión ambiental ISO 14001',
          'Evaluación de aspectos e impactos ambientales',
          'Manejo de residuos y efluentes en operaciones forestales',
          'Auditorías ambientales y de seguridad',
          'Integración HSE: sistemas de gestión unificados'
        ]
      }
    ],
    requirements: [
      'Formación universitaria en ciencias forestales, ambientales, seguridad industrial o afines',
      'Interés en gestión de riesgos y salud ocupacional',
      'Acceso a internet estable',
      'Experiencia o vinculación con actividades forestales o agrícolas'
    ],
    benefits: [
      'Certificación avalada por SENECYT y Ministerio del Trabajo',
      'Matrices de riesgos y herramientas de evaluación',
      'Plantillas de planes de emergencia y contingencia',
      'Normativa actualizada de SST y medio ambiente',
      'Consultoría post-curso en implementación de sistemas HSE'
    ],
    certification: {
      institution: 'SENECYT - Ministerio del Trabajo',
      validity: 'Permanente',
      type: 'Certificado de Capacitación Continua'
    },
    featured: true,
    available: true
  },
  {
    id: '8',
    slug: 'epidemiologia-agricola-resiliencia-fitosanitaria',
    title: 'Epidemiología Agrícola y Gestión de la Resiliencia Fitosanitaria',
    subtitle: 'Protección Vegetal Avanzada',
    shortDescription: 'Domina las herramientas epidemiológicas para prevenir, monitorear y gestionar enfermedades en cultivos agrícolas y forestales.',
    fullDescription: 'Curso avanzado en epidemiología agrícola enfocado en la gestión de la resiliencia fitosanitaria de sistemas productivos. Los participantes desarrollarán competencias en el análisis epidemiológico de enfermedades de plantas, modelamiento de epidemias, vigilancia fitosanitaria, manejo integrado de enfermedades y diseño de estrategias de resiliencia para cultivos agrícolas y forestales frente a amenazas fitosanitarias emergentes y cambio climático.',
    category: 'manejo-recursos-naturales',
    categoryLabel: 'Manejo y Conservación de Recursos Naturales',
    area: 'Forestal, Ecología y Ambiente',
    codigoArea: 'I',
    codigoEspecialidad: 'I.3',
    duration: '120 horas académicas',
    cargaHoraria: 120,
    modality: ['Virtual'],
    tipoParticipante: 'Adultos',
    price: {
      basePerLevel: 125,
      levels: 1,
      regular: 125,
      student: 125,
      memberTamefor: 125,
      affiliateConifor: 125,
      enabledMemberTamefor: 125
    },
    schedule: {
      startDate: 'Por confirmar',
      endDate: 'Por confirmar',
      sessions: 'Sesiones sincrónicas y asincrónicas',
      hours: 'Google Meet / Plataforma Virtual'
    },
    instructor: {
      name: 'Por confirmar',
      credentials: 'Especialista en Fitopatología y Epidemiología Vegetal',
      experience: 'Amplia experiencia en protección vegetal'
    },
    objectives: [
      'Comprender los fundamentos de la epidemiología de enfermedades de plantas',
      'Aplicar modelos epidemiológicos para predecir y controlar brotes fitosanitarios',
      'Diseñar sistemas de vigilancia fitosanitaria para detección temprana',
      'Implementar estrategias de manejo integrado de enfermedades (MIE)',
      'Desarrollar planes de resiliencia fitosanitaria ante amenazas emergentes'
    ],
    content: [
      {
        module: 'Módulo 1: Fundamentos de Epidemiología Agrícola',
        topics: [
          'Conceptos de epidemiología vegetal y triángulo de la enfermedad',
          'Agentes causales: hongos, bacterias, virus, nematodos y fitoplasmas',
          'Ciclos de enfermedad y dinámica de epidemias',
          'Factores ambientales que influyen en la dispersión de patógenos',
          'Técnicas de diagnóstico fitosanitario convencional y molecular'
        ]
      },
      {
        module: 'Módulo 2: Modelamiento y Vigilancia Fitosanitaria',
        topics: [
          'Modelos epidemiológicos: policíclicos, monocíclicos y polieticos',
          'Modelamiento predictivo de epidemias con datos climáticos',
          'Sistemas de alerta temprana y redes de monitoreo',
          'Georreferenciación y SIG aplicados a fitosanidad',
          'Herramientas digitales para vigilancia fitosanitaria'
        ]
      },
      {
        module: 'Módulo 3: Resiliencia Fitosanitaria',
        topics: [
          'Resistencia genética y mejoramiento para resistencia a enfermedades',
          'Manejo integrado de enfermedades (MIE) en cultivos estratégicos',
          'Biocontrol y agentes biológicos contra fitopatógenos',
          'Impacto del cambio climático en la fitosanidad',
          'Diseño de planes de contingencia fitosanitaria'
        ]
      }
    ],
    requirements: [
      'Formación universitaria en agronomía, biología, ciencias forestales o afines',
      'Conocimientos básicos de fitopatología y microbiología',
      'Acceso a internet estable',
      'Interés en protección vegetal y epidemiología'
    ],
    benefits: [
      'Certificación avalada por SENECYT y Ministerio del Trabajo',
      'Protocolos de diagnóstico fitosanitario',
      'Herramientas de modelamiento epidemiológico',
      'Acceso a base de datos de patógenos agrícolas',
      'Red de profesionales en protección vegetal'
    ],
    certification: {
      institution: 'SENECYT - Ministerio del Trabajo',
      validity: 'Permanente',
      type: 'Certificado de Capacitación Continua'
    },
    featured: true,
    available: true
  },
  {
    id: '9',
    slug: 'diseno-optimizacion-sistemas-riego',
    title: 'Diseño y Optimización de Sistemas de Riego en Cultivos Agrícolas',
    subtitle: 'Ingeniería de Riego y Gestión del Agua',
    shortDescription: 'Aprende a diseñar, implementar y optimizar sistemas de riego eficientes para cultivos agrícolas y plantaciones forestales.',
    fullDescription: 'Curso especializado en el diseño y optimización de sistemas de riego para cultivos agrícolas y plantaciones forestales. Los participantes desarrollarán competencias en hidrología aplicada, diseño de sistemas de riego por goteo, aspersión y gravedad, programación del riego basada en datos climáticos y de suelo, y uso de tecnologías de precisión para la gestión eficiente del agua. El programa integra conocimientos de ingeniería hidráulica con el manejo sostenible de recursos hídricos.',
    category: 'manejo-recursos-naturales',
    categoryLabel: 'Manejo y Conservación de Recursos Naturales',
    area: 'Forestal, Ecología y Ambiente',
    codigoArea: 'I',
    codigoEspecialidad: 'I.3',
    duration: '120 horas académicas',
    cargaHoraria: 120,
    modality: ['Virtual'],
    tipoParticipante: 'Adultos',
    price: {
      basePerLevel: 125,
      levels: 1,
      regular: 125,
      student: 125,
      memberTamefor: 125,
      affiliateConifor: 125,
      enabledMemberTamefor: 125
    },
    schedule: {
      startDate: 'Por confirmar',
      endDate: 'Por confirmar',
      sessions: 'Sesiones sincrónicas y asincrónicas',
      hours: 'Google Meet / Plataforma Virtual'
    },
    instructor: {
      name: 'Por confirmar',
      credentials: 'Especialista en Ingeniería de Riego y Gestión Hídrica',
      experience: 'Amplia experiencia en diseño de sistemas de riego'
    },
    objectives: [
      'Comprender los principios de hidrología y relaciones agua-suelo-planta',
      'Diseñar sistemas de riego por goteo, aspersión y gravedad adaptados a diferentes cultivos',
      'Programar el riego utilizando datos climáticos, sensores y balance hídrico',
      'Optimizar la eficiencia del uso del agua en sistemas productivos',
      'Evaluar la viabilidad técnica y económica de proyectos de riego'
    ],
    content: [
      {
        module: 'Módulo 1: Fundamentos de Riego y Relaciones Hídricas',
        topics: [
          'Ciclo hidrológico y balance hídrico en cuencas',
          'Propiedades hidráulicas del suelo y retención de agua',
          'Evapotranspiración y requerimientos hídricos de cultivos',
          'Calidad del agua para riego y clasificación',
          'Marco legal y derechos de agua en Ecuador'
        ]
      },
      {
        module: 'Módulo 2: Diseño de Sistemas de Riego',
        topics: [
          'Riego por goteo: diseño hidráulico y componentes',
          'Riego por aspersión: cobertura, presión y uniformidad',
          'Riego por gravedad: canales, surcos y nivelación',
          'Fertirriego: integración de nutrientes con el riego',
          'Software de diseño hidráulico (EPANET, IRRICAD)'
        ]
      },
      {
        module: 'Módulo 3: Optimización y Tecnología de Precisión',
        topics: [
          'Sensores de humedad y estaciones meteorológicas automáticas',
          'Programación del riego con balance hídrico y modelos predictivos',
          'Automatización y control remoto de sistemas de riego',
          'Riego deficitario controlado y estrategias de ahorro de agua',
          'Evaluación económica y retorno de inversión en proyectos de riego'
        ]
      }
    ],
    requirements: [
      'Formación universitaria en agronomía, ingeniería agrícola, ciencias forestales o afines',
      'Conocimientos básicos de hidráulica y matemáticas',
      'Acceso a internet estable',
      'Interés en gestión eficiente del agua'
    ],
    benefits: [
      'Certificación avalada por SENECYT y Ministerio del Trabajo',
      'Software de diseño hidráulico (versiones educativas)',
      'Plantillas de cálculo para diseño de sistemas de riego',
      'Protocolos de evaluación de eficiencia de riego',
      'Consultoría técnica post-curso'
    ],
    certification: {
      institution: 'SENECYT - Ministerio del Trabajo',
      validity: 'Permanente',
      type: 'Certificado de Capacitación Continua'
    },
    featured: true,
    available: true
  },
  {
    id: '10',
    slug: 'modelos-negocio-bio-circulares-agroforestales',
    title: 'Modelos de Negocio Bio-Circulares en Sistemas Agroforestales',
    subtitle: 'Bioeconomía y Economía Circular',
    shortDescription: 'Diseña modelos de negocio innovadores basados en la bioeconomía circular aplicada a sistemas agroforestales sostenibles.',
    fullDescription: 'Curso innovador sobre modelos de negocio bio-circulares aplicados a sistemas agroforestales. Los participantes adquirirán competencias para diseñar e implementar modelos empresariales que integren los principios de la bioeconomía y la economía circular en la producción agroforestal. Se abordarán temáticas como la valorización de residuos biomásicos, cadenas de valor de productos agroforestales, biorrefinería, certificaciones de sostenibilidad y financiamiento para emprendimientos bio-circulares.',
    category: 'produccion-limpia',
    categoryLabel: 'Producción Limpia',
    area: 'Forestal, Ecología y Ambiente',
    codigoArea: 'I',
    codigoEspecialidad: 'I.4',
    duration: '120 horas académicas',
    cargaHoraria: 120,
    modality: ['Virtual'],
    tipoParticipante: 'Adultos',
    price: {
      basePerLevel: 125,
      levels: 1,
      regular: 125,
      student: 125,
      memberTamefor: 125,
      affiliateConifor: 125,
      enabledMemberTamefor: 125
    },
    schedule: {
      startDate: 'Por confirmar',
      endDate: 'Por confirmar',
      sessions: 'Sesiones sincrónicas y asincrónicas',
      hours: 'Google Meet / Plataforma Virtual'
    },
    instructor: {
      name: 'Por confirmar',
      credentials: 'Especialista en Bioeconomía y Sistemas Agroforestales',
      experience: 'Amplia experiencia en economía circular y agroforestería'
    },
    objectives: [
      'Comprender los principios de la bioeconomía circular y su aplicación en agroforestería',
      'Diseñar modelos de negocio bio-circulares para sistemas agroforestales',
      'Valorizar residuos biomásicos mediante procesos de biorrefinería',
      'Implementar cadenas de valor sostenibles para productos agroforestales',
      'Acceder a mecanismos de financiamiento para emprendimientos bio-circulares'
    ],
    content: [
      {
        module: 'Módulo 1: Bioeconomía y Economía Circular',
        topics: [
          'Conceptos de bioeconomía y economía circular',
          'Principios de diseño circular: reducir, reutilizar, reciclar, regenerar',
          'Sistemas agroforestales como modelo de producción circular',
          'Análisis de ciclo de vida (ACV) de productos agroforestales',
          'Políticas públicas y marco regulatorio de la bioeconomía'
        ]
      },
      {
        module: 'Módulo 2: Valorización de Biomasa y Biorrefinería',
        topics: [
          'Caracterización y clasificación de residuos biomásicos',
          'Procesos de biorrefinería: biocombustibles, bioplásticos, bioquímicos',
          'Compostaje y biofertilizantes a partir de residuos agroforestales',
          'Bioenergía: biomasa, biogás y pellets',
          'Innovación tecnológica en valorización de biomasa'
        ]
      },
      {
        module: 'Módulo 3: Modelos de Negocio y Financiamiento',
        topics: [
          'Canvas de modelo de negocio bio-circular',
          'Cadenas de valor de productos forestales no maderables',
          'Certificaciones de sostenibilidad (FSC, PEFC, orgánicas)',
          'Fuentes de financiamiento para emprendimientos verdes',
          'Plan de negocios integrador: proyecto bio-circular agroforestal'
        ]
      }
    ],
    requirements: [
      'Formación universitaria en ciencias forestales, ambientales, agronomía o afines',
      'Interés en emprendimiento sostenible y bioeconomía',
      'Acceso a internet estable',
      'Conocimientos básicos de gestión empresarial'
    ],
    benefits: [
      'Certificación avalada por SENECYT y Ministerio del Trabajo',
      'Herramientas de diseño de modelos de negocio circulares',
      'Plantillas de análisis de ciclo de vida',
      'Acceso a red de emprendedores bio-circulares',
      'Guía de financiamiento para proyectos verdes'
    ],
    certification: {
      institution: 'SENECYT - Ministerio del Trabajo',
      validity: 'Permanente',
      type: 'Certificado de Capacitación Continua'
    },
    featured: true,
    available: true
  }
];

export function getCourseBySlug(slug: string): Course | undefined {
  return coursesData.find(course => course.slug === slug);
}

export function getFeaturedCourses(): Course[] {
  return coursesData.filter(course => course.featured && course.available);
}

export function getCoursesByCategory(category: Course['category']): Course[] {
  return coursesData.filter(course => course.category === category && course.available);
}

export function getCoursesByArea(area: string): Course[] {
  return coursesData.filter(course => course.area === area && course.available);
}
