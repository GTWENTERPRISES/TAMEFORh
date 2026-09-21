'use client'

import { useState, useEffect, useCallback, useRef } from "react"
import { Calendar, User, ArrowLeft, ArrowRight, Share2, Clock, FileText, Facebook, Twitter, Linkedin, Mail, Copy, Tag, ChevronRight, Newspaper, BookOpen, Eye, Layers, Quote } from "lucide-react"
import Link from "next/link"
import { NewsArticle } from "@/lib/newsData"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionHeader } from "@/components/ui"
import { containerVariants, itemVariants } from "@/lib/animations"
import { getAllNoticias } from "@/lib/api/noticias"

interface NoticiaPageClientProps {
  article: NewsArticle
}

const AUTO_ROTATE_MS = 4000

const categoryLabels: Record<string, string> = {
  eventos: 'Eventos',
  capacitacion: 'Capacitación',
  proyectos: 'Proyectos',
  reconocimientos: 'Reconocimientos',
  normativas: 'Normativas',
}

const categoryIcons: Record<string, typeof Newspaper> = {
  eventos: Calendar,
  capacitacion: BookOpen,
  proyectos: Layers,
  reconocimientos: Eye,
  normativas: FileText,
}

/* ─── Animated number hook ─── */
function useAnimatedNumber(target: number, isInView: boolean, duration = 2) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = target / (duration * 60)
    const id = setInterval(() => {
      start += step
      if (start >= target) { setDisplay(target); clearInterval(id) }
      else setDisplay(Math.round(start))
    }, 1000 / 60)
    return () => clearInterval(id)
  }, [target, isInView, duration])
  return display
}

/* ─── AnimatedStat ─── */
function AnimatedStat({ icon: Icon, value, suffix = '', label, delay = 0 }: {
  icon: typeof Clock
  value: number
  suffix?: string
  label: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const n = useAnimatedNumber(value, inView)

  return (
    <motion.div
      ref={ref}
      className="group text-center p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#3d9a8b]/5 rounded-full blur-2xl" />
      <div className="relative">
        <div className="w-12 h-12 mx-auto mb-3 bg-[#3d9a8b]/20 flex items-center justify-center">
          <Icon className="h-6 w-6 text-[#3d9a8b]" />
        </div>
        <p className="text-3xl md:text-4xl font-bold text-[#3d9a8b] mb-2 group-hover:scale-110 transition-transform">
          {n.toLocaleString('es-ES')}{suffix}
        </p>
        <p className="text-white/60 text-sm font-medium">{label}</p>
      </div>
    </motion.div>
  )
}

/* ─── Content Tab Card (auto-rotating) ─── */
const tabLabels = ['Resumen', 'Contenido', 'Etiquetas']
const tabIcons = [FileText, BookOpen, Tag]

function ContentCard({
  article,
  tabIndex,
  isActive,
  onHover,
  onLeave,
}: {
  article: NewsArticle
  tabIndex: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const Icon = tabIcons[tabIndex]

  function getTabContent() {
    switch (tabIndex) {
      case 0:
        return article.excerpt || 'Resumen no disponible.'
      case 1: {
        const lines = article.content.split('\n').filter(l => l.trim() !== '')
        return lines.slice(0, 6).join('\n')
      }
      case 2:
        return article.tags && article.tags.length > 0
          ? article.tags.join(' • ')
          : 'Sin etiquetas'
      default:
        return ''
    }
  }

  return (
    <motion.div
      className="group relative cursor-default"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: tabIndex * 0.1 }}
    >
      <div className={`relative overflow-hidden h-full transition-all duration-500 ${
        isActive
          ? 'bg-white/10 backdrop-blur-sm border border-[#3d9a8b]/40 shadow-2xl shadow-[#3d9a8b]/10 scale-[1.02]'
          : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8'
      }`}>
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#3d9a8b] via-[#5bc4b1] to-[#3d9a8b]"
            initial={false}
            animate={{ width: isActive ? '100%' : '40%' }}
            transition={{ duration: isActive ? AUTO_ROTATE_MS / 1000 : 0.4, ease: isActive ? 'linear' : 'easeOut' }}
          />
        </div>

        <div className="p-7 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className={`flex items-center justify-center w-14 h-14 transition-all duration-500 ${
                isActive
                  ? 'bg-[#3d9a8b] shadow-lg shadow-[#3d9a8b]/30'
                  : 'bg-[#3d9a8b]/10 group-hover:bg-[#3d9a8b]/20'
              }`}
              animate={isActive ? { rotate: [0, 8, -4, 0] } : { rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className={`w-7 h-7 transition-colors duration-500 ${
                isActive ? 'text-white' : 'text-[#3d9a8b]'
              }`} />
            </motion.div>
            <div>
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
                isActive ? 'text-[#3d9a8b]' : 'text-[#3d9a8b]/70'
              }`}>
                {tabLabels[tabIndex]}
              </span>
              <div className={`text-2xl font-black tabular-nums transition-colors duration-500 ${
                isActive ? 'text-white/30' : 'text-white/10'
              }`}>
                0{tabIndex + 1}
              </div>
            </div>
          </div>

          {/* Content */}
          <p className={`text-sm leading-relaxed transition-colors duration-500 line-clamp-6 ${
            isActive ? 'text-white/90' : 'text-white/60'
          }`}>
            {getTabContent()}
          </p>
        </div>

        {/* Bottom animated line */}
        <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ${
          isActive
            ? 'w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]'
            : 'w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1]'
        }`} />
      </div>
    </motion.div>
  )
}

/* ─── Parse Content ─── */
function parseContent(content: string) {
  const lines = content.split('\n')
  const elements: JSX.Element[] = []

  lines.forEach((line, index) => {
    if (line.startsWith('## ')) {
      elements.push(
        <motion.h2
          key={index}
          className="font-sans text-2xl font-bold text-[#1a3a5c] mt-10 mb-4 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-8 h-1 bg-[#3d9a8b]" />
          {line.substring(3)}
        </motion.h2>
      )
    } else if (line.startsWith('- ')) {
      elements.push(
        <motion.li
          key={index}
          className="flex items-start gap-3 text-[#1a3a5c]/70"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="w-1.5 h-1.5 bg-[#3d9a8b] mt-2.5 flex-shrink-0" />
          <span className="leading-relaxed text-[15px]">{line.substring(2)}</span>
        </motion.li>
      )
    } else if (line.trim() !== '') {
      elements.push(
        <p key={index} className="text-[#1a3a5c]/70 leading-relaxed text-[15px]">
          {line}
        </p>
      )
    }
  })

  return elements
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export function NoticiaPageClient({ article }: NoticiaPageClientProps) {
  const [otherNews, setOtherNews] = useState<NewsArticle[]>([])
  const [activeCard, setActiveCard] = useState(0)
  const [isPausedCards, setIsPausedCards] = useState(false)
  const cardsInView = useRef(false)

  useEffect(() => {
    async function load() {
      try {
        const all = await getAllNoticias()
        setOtherNews(all.filter(n => n.id !== article.id).slice(0, 3))
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [article.id])

  useEffect(() => {
    if (isPausedCards || !cardsInView.current) return
    const timer = setTimeout(() => {
      setActiveCard((prev) => (prev + 1) % 3)
    }, AUTO_ROTATE_MS)
    return () => clearTimeout(timer)
  }, [activeCard, isPausedCards])

  const cardsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = cardsRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { cardsInView.current = entry.isIntersecting },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleCardHover = useCallback((i: number) => {
    setIsPausedCards(true)
    setActiveCard(i)
  }, [])

  const handleCardLeave = useCallback(() => {
    setIsPausedCards(false)
  }, [])

  const CategoryIcon = categoryIcons[article.category] || Newspaper
  const readingTime = Math.ceil(article.content.length / 1500)

  return (
    <main className="min-h-screen bg-white">
      {/* ═══ Hero ═══ */}
      <PageHeader
        badge={categoryLabels[article.category] || article.category}
        title={article.title}
        titleHighlight=""
        subtitle={article.excerpt}
        backgroundImage={article.featuredImage}
      />

      {/* ═══ Overview Section ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left: Image with decorative elements */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#3d9a8b]/40 z-20" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#3d9a8b]/40 z-20" />

              <div className="relative h-[480px] overflow-hidden shadow-2xl">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2540]/60 via-transparent to-transparent" />

                <motion.div
                  className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-10 h-10 bg-[#3d9a8b]/30 flex items-center justify-center">
                    <CategoryIcon className="w-5 h-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold leading-tight">
                      {categoryLabels[article.category] || article.category}
                    </p>
                    <p className="text-[#3d9a8b] text-xs font-semibold">TAMEFOR Noticias</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="absolute -top-6 -right-6 z-30 bg-gradient-to-br from-[#3d9a8b] to-[#2a7a6c] px-6 py-5 shadow-2xl text-center"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              >
                <div className="text-2xl font-black text-white leading-none">
                  {new Date(article.publishDate).getDate()}
                </div>
                <div className="text-white/80 text-xs font-bold uppercase tracking-widest mt-1">
                  {new Date(article.publishDate).toLocaleDateString('es-ES', { month: 'short' })}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-[#3d9a8b]" />
                <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">
                  Artículo
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] leading-tight">
                {article.title}
              </h2>

              {article.subtitle && (
                <p className="text-[#3d9a8b] font-medium text-lg">
                  {article.subtitle}
                </p>
              )}

              <p className="text-[#1a3a5c]/70 leading-relaxed text-[15px] border-l-2 border-[#3d9a8b]/50 pl-4">
                {article.excerpt}
              </p>

              {/* Quick Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#1a3a5c]">Información del Artículo</h3>
                {[
                  { icon: Calendar, label: 'Fecha', value: new Date(article.publishDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) },
                  { icon: User, label: 'Autor', value: article.author.name },
                  { icon: Clock, label: 'Lectura', value: `${readingTime} min` },
                  { icon: CategoryIcon, label: 'Categoría', value: categoryLabels[article.category] || article.category },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-8 h-8 border border-[#3d9a8b]/50 bg-[#3d9a8b]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-[#3d9a8b]" />
                    </div>
                    <div>
                      <span className="text-xs text-[#1a3a5c]/50 uppercase tracking-wider font-semibold">{item.label}</span>
                      <p className="text-[#1a3a5c]/80 text-sm font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Author role badge */}
              {article.author.role && (
                <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider bg-[#3d9a8b]/10 text-[#3d9a8b] border border-[#3d9a8b]/30">
                  <User className="h-4 w-4" />
                  {article.author.role}
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/noticias">
                  <motion.button
                    className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                               bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                               shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                               transition-shadow duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Volver a Noticias
                  </motion.button>
                </Link>
                <Link href="/contacto">
                  <motion.button
                    className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-[#1a3a5c]
                               border-2 border-[#1a3a5c]/20 hover:border-[#3d9a8b] hover:text-[#3d9a8b]
                               transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Contáctanos
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Detail Cards Section (Resumen / Contenido / Etiquetas) ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-24">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />
        <motion.div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px]" />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={Layers}
            subtitle="Vista Rápida"
            title="Explora el"
            titleHighlight="Contenido"
            description="Un vistazo rápido al resumen, contenido y etiquetas de este artículo"
            centered
            dark
          />

          <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-14">
            {tabLabels.map((_, index) => (
              <ContentCard
                key={index}
                article={article}
                tabIndex={index}
                isActive={activeCard === index}
                onHover={() => handleCardHover(index)}
                onLeave={handleCardLeave}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Stats Section ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-20 border-t border-white/5">
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <AnimatedStat icon={Clock} value={readingTime} suffix=" min" label="Tiempo de Lectura" delay={0} />
            <AnimatedStat icon={FileText} value={article.content.split('\n').filter(l => l.trim()).length} label="Secciones" delay={0.1} />
            <AnimatedStat icon={Tag} value={article.tags?.length || 0} label="Etiquetas" delay={0.2} />
            <AnimatedStat icon={Eye} value={1} suffix="" label="Categoría" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ═══ Full Article Content ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={containerVariants}
              >
                {/* Introduction Card */}
                <motion.div variants={itemVariants} className="bg-white p-8 md:p-10 border-l-4 border-[#3d9a8b] shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#1a3a5c] flex items-center justify-center border-t-2 border-[#3d9a8b]">
                      <FileText className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <h2 className="font-sans text-2xl font-bold text-[#1a3a5c]">
                      Resumen
                    </h2>
                  </div>
                  <p className="text-xl text-[#1a3a5c]/70 leading-relaxed">
                    {article.excerpt}
                  </p>
                </motion.div>

                {/* Main Content */}
                <motion.div variants={itemVariants} className="bg-white p-8 md:p-10 border-l-4 border-[#3d9a8b] shadow-lg mt-8">
                  <div className="space-y-6">
                    {parseContent(article.content)}
                  </div>
                </motion.div>
              </motion.div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12 pt-8 border-t-2 border-[#3d9a8b]/20"
                >
                  <h3 className="text-sm font-semibold text-[#1a3a5c] mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Tag className="h-4 w-4 text-[#3d9a8b]" />
                    Etiquetas
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {article.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        className="bg-[#1a3a5c]/10 text-[#1a3a5c] text-sm px-5 py-2.5 border-l-4 border-[#3d9a8b] font-semibold hover:bg-[#1a3a5c]/20 transition-colors cursor-default"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Article Info Card */}
              <motion.div
                className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2540] p-8 shadow-2xl sticky top-6"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center">
                    <Newspaper className="h-5 w-5 text-[#3d9a8b]" />
                  </div>
                  <h3 className="text-white font-bold text-xl">Información</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Calendar, label: 'Fecha de Publicación', value: new Date(article.publishDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) },
                    { icon: Clock, label: 'Tiempo de Lectura', value: `${readingTime} min` },
                    { icon: User, label: 'Autor', value: article.author.name, sub: article.author.role },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-[#3d9a8b]" />
                        <div>
                          <span className="text-white/50 text-xs uppercase tracking-wider font-semibold">{item.label}</span>
                          <p className="text-white/90 text-sm font-medium">{item.value}</p>
                          {'sub' in item && item.sub && <p className="text-white/50 text-xs">{item.sub}</p>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Category Badge */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="bg-white/5 p-4 border-l-4 border-[#3d9a8b]">
                    <p className="text-xs font-semibold text-white/50 mb-1 uppercase tracking-wider">Categoría</p>
                    <p className="text-lg font-bold text-[#3d9a8b] uppercase">
                      {categoryLabels[article.category] || article.category}
                    </p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Compartir Artículo</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      className="flex items-center justify-center gap-2 bg-white/5 hover:bg-[#1877F2] border border-white/10 hover:border-[#1877F2] text-white/70 hover:text-white text-xs py-2.5 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      <Facebook className="h-3.5 w-3.5" />
                      Facebook
                    </motion.button>
                    <motion.button
                      className="flex items-center justify-center gap-2 bg-white/5 hover:bg-[#1DA1F2] border border-white/10 hover:border-[#1DA1F2] text-white/70 hover:text-white text-xs py-2.5 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
                    >
                      <Twitter className="h-3.5 w-3.5" />
                      Twitter
                    </motion.button>
                    <motion.button
                      className="flex items-center justify-center gap-2 bg-white/5 hover:bg-[#0A66C2] border border-white/10 hover:border-[#0A66C2] text-white/70 hover:text-white text-xs py-2.5 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      LinkedIn
                    </motion.button>
                    <motion.button
                      className="flex items-center justify-center gap-2 bg-white/5 hover:bg-[#D44638] border border-white/10 hover:border-[#D44638] text-white/70 hover:text-white text-xs py-2.5 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open(`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </motion.button>
                  </div>
                  <motion.button
                    className="w-full mt-2 flex items-center justify-center gap-2 bg-white/5 hover:bg-[#3d9a8b]/20 border border-white/10 hover:border-[#3d9a8b]/40 text-white/70 hover:text-white text-xs py-2.5 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      alert('Enlace copiado al portapapeles')
                    }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copiar Enlace
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Gallery ═══ */}
      {article.gallery && article.gallery.length > 0 && (
        <section className="section-padding bg-[#f8fafb] relative overflow-hidden">
          <div className="container-max relative z-10">
            <SectionHeader
              icon={Layers}
              subtitle="Galería"
              title="Imágenes del"
              titleHighlight="Artículo"
              description="Registro fotográfico que acompaña esta publicación"
              centered
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-14">
              {article.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative h-56 md:h-72 overflow-hidden">
                    <img
                      src={image}
                      alt={`${article.title} - Imagen ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ Other News ═══ */}
      {otherNews.length > 0 && (
        <section className="section-padding bg-white relative overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          />

          <div className="container-max relative z-10">
            <SectionHeader
              icon={Newspaper}
              subtitle="Más Noticias"
              title="Explora Otras"
              titleHighlight="Publicaciones"
              description="Descubre más artículos y noticias del sector forestal y ambiental"
              centered
            />

            <div className="grid md:grid-cols-3 gap-6 mt-14">
              {otherNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/noticias/${news.slug}`}>
                    <div className="group relative overflow-hidden bg-white border border-[#1a3a5c]/10 hover:shadow-xl transition-all duration-500">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={news.featuredImage}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2540]/80 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="text-[#3d9a8b] text-xs font-bold uppercase tracking-widest">
                            {categoryLabels[news.category] || news.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="h-3 w-3 text-[#1a3a5c]/40" />
                          <span className="text-xs text-[#1a3a5c]/50">
                            {new Date(news.publishDate).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <h3 className="text-[#1a3a5c] font-bold text-lg mb-2 group-hover:text-[#3d9a8b] transition-colors duration-300 line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-[#1a3a5c]/60 text-sm leading-relaxed mb-4 line-clamp-2">
                          {news.excerpt}
                        </p>
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d9a8b] group-hover:gap-3 transition-all duration-300">
                          Leer Artículo
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-700" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA Banner ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c] py-20">
        <motion.div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        <motion.div className="absolute -bottom-40 -left-40 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px]" />

        <div className="container-max relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div className="inline-flex items-center gap-2 mb-6" variants={itemVariants}>
              <div className="w-8 h-1 bg-white/40" />
              <span className="text-white/80 font-semibold uppercase tracking-wider text-sm">Mantente Informado</span>
              <div className="w-8 h-1 bg-white/40" />
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              ¿Quieres Más Información?
            </motion.h2>

            <motion.p
              className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Contáctanos para conocer más sobre el sector forestal y ambiental del Ecuador.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link href="/contacto">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-[#1a3a5c]
                             bg-white shadow-lg shadow-black/10
                             hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contáctanos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
              <Link href="/noticias">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                             border-2 border-white/30 hover:border-white hover:bg-white/10
                             transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Ver Todas las Noticias
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
