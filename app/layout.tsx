import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://tamefor.com'),
  title: {
    default: 'TAMEFOR S.A.S B.I.C — Consultoría Forestal y Ambiental en Ecuador',
    template: '%s | TAMEFOR',
  },
  description: 'TAMEFOR S.A.S B.I.C - Consultora forestal y ambiental en Ecuador. Sistemas de gestión ambiental ISO 14001, plantaciones comerciales, capacitaciones certificadas SENECYT, peritajes judiciales y levantamientos topográficos. Servicios ambientales integrales para empresas.',
  keywords: [
    'consultoría forestal Ecuador',
    'consultoría ambiental Ecuador',
    'gestión forestal',
    'certificación ISO 14001 Ecuador',
    'capacitación forestal SENECYT',
    'peritajes forestales',
    'topografía forestal',
    'plantaciones comerciales Ecuador',
    'inventarios forestales',
    'auditoría ambiental',
    'conservación forestal',
    'TAMEFOR',
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
    title: 'TAMEFOR — Consultoría Forestal y Ambiental en Ecuador',
    description: 'Servicios profesionales de consultoría forestal y ambiental en Ecuador. Certificación ISO 14001, capacitaciones SENECYT, gestión forestal sostenible.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TAMEFOR - Consultoría Forestal y Ambiental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAMEFOR — Consultoría Forestal Ecuador',
    description: 'Servicios profesionales de consultoría forestal y ambiental en Ecuador',
    images: ['/og-image.jpg'],
    creator: '@tamefor',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Reemplazar con código real
    // yandex: 'yandex-verification-code',
    // other: 'other-verification-code',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

