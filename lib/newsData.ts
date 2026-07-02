// Datos de noticias para TAMEFOR
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category: 'eventos' | 'capacitacion' | 'proyectos' | 'reconocimientos' | 'normativas';
  publishDate: string;
  author: {
    name: string;
    role: string;
    photo?: string;
  };
  featuredImage: string;
  gallery?: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
}

export const newsData: NewsArticle[] = [
  {
    id: '1',
    slug: 'socializacion-norma-tecnica-mae',
    title: 'Socialización Propuesta de Norma Técnica de Control Forestal, MAE - Quito',
    excerpt: 'Las Plantaciones Forestales con fines comerciales se deben regular bajo parámetros como protección de suelos, aguas, biodiversidad y control de incendios forestales; con un manejo sustentable.',
    content: `El Ministerio del Ambiente presentó la propuesta de Norma Técnica de Control Forestal en una jornada de socialización realizada en Quito.

## Principales Aspectos

La nueva normativa busca regular las plantaciones forestales con fines comerciales bajo parámetros de sostenibilidad:

- Protección de suelos y aguas
- Conservación de biodiversidad
- Control de incendios forestales
- Manejo sustentable de recursos

## Participación del Sector

El evento contó con la participación activa de profesionales forestales, académicos y representantes del sector privado, quienes aportaron sus observaciones y recomendaciones para fortalecer la propuesta normativa.`,
    category: 'normativas',
    publishDate: '2025-12-12',
    author: {
      name: 'TAMEFOR Los Ríos',
      role: 'Asociación Profesional Forestal'
    },
    featuredImage: '/placeholder.jpg',
    tags: ['normativas', 'MAE', 'control forestal', 'sostenibilidad'],
    featured: true,
    published: true
  },
  {
    id: '2',
    slug: 'xv-congreso-forestal-nacional',
    title: 'XV Congreso Forestal Nacional Ecuador 2024',
    excerpt: 'Se realizó con éxito el XV Congreso Forestal Nacional con la participación de más de 500 profesionales del sector.',
    content: `El XV Congreso Forestal Nacional se llevó a cabo con gran éxito, reuniendo a profesionales, académicos y estudiantes del sector forestal de todo el país.

## Temas Principales

- Innovación tecnológica en el sector forestal
- Cambio climático y bosques
- Políticas forestales nacionales
- Manejo sostenible de recursos

## Impacto

El evento fortaleció las redes de colaboración entre profesionales y generó importantes compromisos para el desarrollo del sector forestal ecuatoriano.`,
    category: 'eventos',
    publishDate: '2024-11-19',
    author: {
      name: 'Comité Organizador',
      role: 'TAMEFOR'
    },
    featuredImage: '/placeholder.jpg',
    tags: ['congreso', 'forestal', 'eventos'],
    featured: true,
    published: true
  },
  {
    id: '3',
    slug: 'nueva-certificacion-manejo-sostenible',
    title: 'Nueva Certificación en Manejo Sostenible de Bosques',
    excerpt: 'El TAMEFOR lanza un nuevo programa de certificación profesional en manejo sostenible de recursos forestales.',
    content: `TAMEFOR Los Ríos presenta su nuevo programa de certificación profesional en Manejo Sostenible de Bosques.

## Objetivos

- Estandarizar prácticas de manejo forestal
- Actualizar conocimientos profesionales
- Promover la sostenibilidad ambiental

## Beneficios

Los profesionales certificados obtendrán reconocimiento oficial y acceso a oportunidades laborales especializadas.`,
    category: 'capacitacion',
    publishDate: '2024-11-14',
    author: {
      name: 'Dirección Académica',
      role: 'TAMEFOR'
    },
    featuredImage: '/placeholder.jpg',
    tags: ['certificación', 'capacitación', 'manejo sostenible'],
    featured: false,
    published: true
  }
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsData.find(article => article.slug === slug);
}

export function getFeaturedNews(): NewsArticle[] {
  return newsData.filter(article => article.featured && article.published);
}

export function getLatestNews(limit: number = 5): NewsArticle[] {
  return newsData
    .filter(article => article.published)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
}
