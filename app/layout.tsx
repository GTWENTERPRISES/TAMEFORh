import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://tamefor.com'),
  title: {
    default: 'TAMEFOR S.A.S B.I.C — Consultoría Forestal y Ambiental en Ecuador | Certificación ISO 14001',
    template: '%s | TAMEFOR Ecuador',
  },
  description: 'Empresa líder en consultoría forestal y ambiental en Ecuador. Especialistas en certificación ISO 14001, gestión forestal sostenible, capacitaciones SENECYT, inventarios forestales, peritajes judiciales, topografía, auditorías ambientales y planes de manejo. +10 años de experiencia. Servicios profesionales en Quito y todo Ecuador.',
  keywords: [
    // Servicios principales
    'consultoría forestal Ecuador',
    'consultoría ambiental Ecuador',
    'gestión forestal sostenible',
    'certificación ISO 14001 Ecuador',
    'auditoría ambiental Ecuador',
    'estudios de impacto ambiental',
    
    // Capacitación
    'capacitación forestal SENECYT',
    'cursos forestales certificados Ecuador',
    'formación profesional forestal',
    
    // Servicios técnicos
    'inventarios forestales Ecuador',
    'peritajes forestales judiciales',
    'topografía forestal',
    'levantamiento topográfico Ecuador',
    'planes de manejo forestal',
    
    // Especialidades
    'plantaciones comerciales Ecuador',
    'reforestación comercial',
    'conservación forestal',
    'gestión de recursos naturales',
    'servicios ecosistémicos',
    
    // Ubicación
    'consultoría forestal Quito',
    'servicios ambientales Ecuador',
    'TAMEFOR Ecuador',
    'empresa forestal Ecuador',
  ],
  authors: [{ name: 'TAMEFOR S.A.S B.I.C' }],
  creator: 'TAMEFOR S.A.S B.I.C',
  publisher: 'TAMEFOR S.A.S B.I.C',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  generator: 'Next.js',
  applicationName: 'TAMEFOR',
  referrer: 'origin-when-cross-origin',
  category: 'Environmental Services',
  classification: 'Business',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_EC',
    url: 'https://tamefor.com',
    siteName: 'TAMEFOR S.A.S B.I.C',
    title: 'TAMEFOR — Consultoría Forestal y Ambiental Líder en Ecuador',
    description: 'Empresa especializada en consultoría forestal y ambiental con más de 10 años de experiencia. Certificación ISO 14001, capacitaciones SENECYT, gestión forestal sostenible, inventarios, peritajes y auditorías ambientales. Soluciones integrales en todo Ecuador.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TAMEFOR - Consultoría Forestal y Ambiental Ecuador',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAMEFOR — Consultoría Forestal y Ambiental Ecuador',
    description: 'Especialistas en gestión forestal sostenible, certificación ISO 14001 y capacitaciones SENECYT. +10 años de experiencia en Ecuador.',
    images: ['/og-image.jpg'],
    creator: '@tamefor',
    site: '@tamefor',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Reemplazar con código real de Google Search Console
    // yandex: 'yandex-verification-code',
    // other: 'other-verification-code',
  },
  alternates: {
    canonical: '/',
    languages: {
      'es-EC': '/',
      'es': '/',
    },
  },
  other: {
    'geo.region': 'EC-P',
    'geo.placename': 'Quito',
    'geo.position': '-0.1807;-78.4678',
    'ICBM': '-0.1807, -78.4678',
    'DC.title': 'TAMEFOR - Consultoría Forestal Ecuador',
    'DC.subject': 'Consultoría Forestal y Ambiental',
    'DC.description': 'Empresa líder en consultoría forestal y ambiental en Ecuador',
    'DC.language': 'es-EC',
    'rating': 'general',
    'audience': 'all',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-EC" className="dark bg-background">
      <head>
        {/* Preconexiones para mejorar rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Meta tags adicionales para SEO */}
        <meta name="theme-color" content="#1a3a5c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=yes" />
        
        {/* Información de localización */}
        <meta name="geo.region" content="EC-P" />
        <meta name="geo.placename" content="Quito, Ecuador" />
        <meta name="geo.position" content="-0.1807;-78.4678" />
        <meta name="ICBM" content="-0.1807, -78.4678" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

