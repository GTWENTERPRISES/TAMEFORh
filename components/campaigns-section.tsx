"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Users, Calendar as CalendarIcon, Sparkles, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"
import { coursesData } from "@/lib/coursesData"
import { newsData } from "@/lib/newsData"
import Link from "next/link"

interface CampaignsSectionProps {
  variant?: 'default' | 'latest-news' | 'latest-course'
}

export function CampaignsSection({ variant = 'default' }: CampaignsSectionProps) {
  // Obtener la última noticia
  const latestNews = newsData.length > 0 ? newsData[0] : null
  
  // Obtener el último curso
  const latestCourse = coursesData.length > 0 ? coursesData[0] : null

  // Banner de Última Noticia
  if (variant === 'latest-news' && latestNews) {
    return (
      <section id="latest-news-banner" className="py-12 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="container-max">
          <motion.div 
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Left Content */}
            <motion.div className="max-w-2xl" variants={itemVariants}>
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#3d9a8b] text-white px-6 py-2 font-bold uppercase tracking-wider text-sm mb-6"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Última Noticia</span>
              </motion.div>

              <motion.h2 
                className="text-4xl md:text-5xl text-[#1a3a5c] font-bold leading-tight mb-4"
                variants={itemVariants}
              >
                {latestNews.title}
              </motion.h2>

              <motion.p 
                className="text-[#1a3a5c]/70 text-lg md:text-xl mb-12 leading-relaxed line-clamp-3"
                variants={itemVariants}
              >
                {latestNews.excerpt}
              </motion.p>

              <motion.div className="space-y-4 mb-12" variants={containerVariants}>
                <motion.div 
                  className="flex items-start gap-4 p-4 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b]"
                  variants={itemVariants}
                >
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-5 h-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-[#1a3a5c]/60 text-sm font-medium mb-1">Fecha de Publicación</p>
                    <p className="text-[#1a3a5c] font-bold text-base">{latestNews.publishDate}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 p-4 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b]"
                  variants={itemVariants}
                >
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-[#1a3a5c]/60 text-sm font-medium mb-1">Categoría</p>
                    <p className="text-[#1a3a5c] font-bold text-base">{latestNews.category}</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`/noticias/${latestNews.slug}`}>
                  <Button className="bg-[#1a3a5c] hover:bg-[#163250] text-white rounded-none px-10 py-4 font-bold text-lg group transition-all shadow-lg hover:shadow-xl border-2 border-[#1a3a5c]">
                    Leer Noticia Completa
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative h-96 lg:h-full min-h-96 overflow-hidden shadow-2xl border-4 border-[#3d9a8b]/30"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={latestNews.featuredImage}
                alt={latestNews.title}
                fill
                className="object-cover"
                priority
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/40 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  // Banner de Último Curso
  if (variant === 'latest-course' && latestCourse) {
    return (
      <section id="latest-course-banner" className="py-12 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="container-max">
          <motion.div 
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Left Content */}
            <motion.div className="max-w-2xl" variants={itemVariants}>
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#3d9a8b] text-white px-6 py-2 font-bold uppercase tracking-wider text-sm mb-6"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Nuevo Curso Disponible</span>
              </motion.div>

              <motion.h2 
                className="text-4xl md:text-5xl text-[#1a3a5c] font-bold leading-tight mb-4"
                variants={itemVariants}
              >
                {latestCourse.title}
              </motion.h2>

              <motion.h3 
                className="text-xl md:text-2xl text-[#3d9a8b] mb-6 font-semibold"
                variants={itemVariants}
              >
                {latestCourse.subtitle}
              </motion.h3>

              <motion.p 
                className="text-[#1a3a5c]/70 text-lg md:text-xl mb-12 leading-relaxed line-clamp-3"
                variants={itemVariants}
              >
                {latestCourse.shortDescription}
              </motion.p>

              <motion.div className="space-y-4 mb-12" variants={containerVariants}>
                <motion.div 
                  className="flex items-start gap-4 p-4 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b]"
                  variants={itemVariants}
                >
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-[#1a3a5c]/60 text-sm font-medium mb-1">Carga Horaria</p>
                    <p className="text-[#1a3a5c] font-bold text-base">{latestCourse.cargaHoraria} horas académicas</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 p-4 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b]"
                  variants={itemVariants}
                >
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-[#1a3a5c]/60 text-sm font-medium mb-1">Modalidad</p>
                    <p className="text-[#1a3a5c] font-bold text-base">{latestCourse.modality.join(', ')}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 p-4 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b]"
                  variants={itemVariants}
                >
                  <div className="w-10 h-10 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#3d9a8b]" />
                  </div>
                  <div>
                    <p className="text-[#1a3a5c]/60 text-sm font-medium mb-1">Precio</p>
                    <p className="text-[#1a3a5c] font-bold text-base">${latestCourse.price.regular} USD</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`/cursos/${latestCourse.slug}`}>
                  <Button className="bg-[#1a3a5c] hover:bg-[#163250] text-white rounded-none px-10 py-4 font-bold text-lg group transition-all shadow-lg hover:shadow-xl border-2 border-[#1a3a5c]">
                    Ver Detalles del Curso
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative h-96 lg:h-full min-h-96 overflow-hidden shadow-2xl border-4 border-[#3d9a8b]/30"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
                alt={latestCourse.title}
                fill
                className="object-cover"
                priority
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/40 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  // Banner de la Feria (default)
  return (
    <section id="campaigns" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="container-max">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Left Content */}
          <motion.div className="max-w-2xl" variants={itemVariants}>
            {/* Title */}
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] font-bold leading-tight mb-3 sm:mb-4"
              variants={itemVariants}
            >
              Expo Forestal<br />
              <span className="text-[#3d9a8b]">TAMEFOR</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.h3 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#1a3a5c]/80 mb-6 sm:mb-7 md:mb-8 font-semibold"
              variants={itemVariants}
            >
              Feria de Innovación y Sostenibilidad Ambiental
            </motion.h3>

            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-[#3d9a8b] text-white px-4 sm:px-5 md:px-6 py-2 font-bold uppercase tracking-wider text-xs sm:text-sm mb-5 sm:mb-6"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Feria Anual</span>
            </motion.div>

            {/* Event Name */}
            <motion.h4 
              className="text-2xl sm:text-3xl md:text-4xl text-[#1a3a5c] font-bold leading-tight mb-4 sm:mb-5"
              variants={itemVariants}
            >
              Expo Forestal<br />
              <span className="text-[#3d9a8b]">TAMEFOR 2026</span>
            </motion.h4>

            {/* Description */}
            <motion.p 
              className="text-[#1a3a5c]/70 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 leading-relaxed"
              variants={itemVariants}
            >
              La feria más grande de tecnología forestal, maquinaria, insumos y servicios ambientales. Encuentra proveedores, descubre innovaciones y establece alianzas estratégicas para tu negocio.
            </motion.p>

            {/* Event Details */}
            <motion.div 
              className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {/* Dates */}
              <motion.div 
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b] hover:border-[#3d9a8b] transition-all duration-300"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                  <CalendarIcon className="w-5 h-5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-[#1a3a5c]/60 text-xs sm:text-sm font-medium mb-1">Fechas</p>
                  <p className="text-[#1a3a5c] font-bold text-sm sm:text-base">15-17 de Septiembre, 2026</p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div 
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b] hover:border-[#3d9a8b] transition-all duration-300"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-[#1a3a5c]/60 text-xs sm:text-sm font-medium mb-1">Ubicación</p>
                  <p className="text-[#1a3a5c] font-bold text-sm sm:text-base">Centro de Convenciones, Quevedo</p>
                </div>
              </motion.div>

              {/* Participants */}
              <motion.div 
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-[#3d9a8b]/10 border-l-4 border-[#3d9a8b] hover:border-[#3d9a8b] transition-all duration-300"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-[#1a3a5c]/60 text-xs sm:text-sm font-medium mb-1">Expositores</p>
                  <p className="text-[#1a3a5c] font-bold text-sm sm:text-base">+80 empresas del sector forestal</p>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link href="/contacto" className="block w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-[#1a3a5c] hover:bg-[#163250] text-white rounded-none px-8 sm:px-10 py-3.5 sm:py-4 font-bold text-base sm:text-lg group transition-all shadow-lg hover:shadow-xl border-2 border-[#1a3a5c] min-h-[52px]">
                    Más Información
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link href="/contacto" className="block w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-[#3d9a8b] hover:bg-[#358578] text-white rounded-none px-8 sm:px-10 py-3.5 sm:py-4 font-bold text-base sm:text-lg group transition-all shadow-lg hover:shadow-xl border-2 border-[#3d9a8b] min-h-[52px]">
                    Inscríbete
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative h-80 sm:h-96 lg:h-full min-h-80 sm:min-h-96 overflow-hidden shadow-2xl border-4 border-[#3d9a8b]/30 order-first lg:order-last"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/arboles.webp"
              alt="Expo Forestal TAMEFOR 2026 - Bosque sostenible"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/40 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
