"use client"

import { Calendar, ArrowRight, Newspaper } from "lucide-react"
import Link from "next/link"
import { getLatestNews } from "@/lib/newsData"
import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/ui"
import { containerVariants, itemVariants } from "@/lib/animations"

export function NewsSection() {
  const latestNews = getLatestNews(3)

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%)' }}>
      {/* Diagonal stripe decoration */}
      <div className="absolute w-[200%] h-[2px] pointer-events-none opacity-[0.08] top-[20%] left-[-50%] -rotate-[3deg]" style={{ background: 'linear-gradient(90deg, transparent, #3d9a8b, transparent)' }} />
      <div className="absolute w-[200%] h-[2px] pointer-events-none opacity-[0.08] bottom-[30%] left-[-50%] rotate-[2deg]" style={{ background: 'linear-gradient(90deg, transparent, #1a3a5c, transparent)' }} />

      <div className="container-max relative z-10">
        <SectionHeader
          icon={Newspaper}
          subtitle="Últimas Noticias"
          title="Mantente"
          titleHighlight="Informado"
          description="Descubre las últimas actualizaciones, eventos y novedades del sector forestal y ambiental"
          centered
        />

        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/noticias">
            <motion.button
              className="group inline-flex items-center gap-3 px-10 py-4 font-semibold text-white
                         bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                         shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                         transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver Todas las Noticias
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* News Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {latestNews.map((article, index) => (
            <motion.div
              key={article.id}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {/* Glow ring on hover */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-[#3d9a8b] via-[#1a3a5c] to-[#3d9a8b] opacity-0 group-hover:opacity-100 blur-[3px] transition-opacity duration-500" />

              {/* News Card */}
              <div className="relative bg-gradient-to-b from-[#1a3a5c] to-[#0f2a45] transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#3d9a8b]/25 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-[14s] ease-in-out group-hover:scale-110"
                    style={{ animationDelay: `${index * 2.5}s` }}
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a45] to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Category Badge */}
                  <div className="inline-block mb-4">
                    <span className="text-[#3d9a8b] text-xs font-bold uppercase tracking-[0.15em]">
                      {article.category}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
                    <Calendar className="h-4 w-4 text-[#3d9a8b]" />
                    <span className="font-medium">{new Date(article.publishDate).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-xl text-white mb-4 font-semibold leading-tight">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">
                    {article.excerpt}
                  </p>

                  {/* Button */}
                  <Link href={`/noticias/${article.slug}`} className="mt-auto">
                    <motion.button
                      className="w-full py-3 font-semibold text-sm text-white
                                 bg-transparent border-2 border-[#3d9a8b]
                                 hover:bg-[#3d9a8b] transition-all duration-300
                                 inline-flex items-center justify-center gap-2 group/btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Leer Más
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
