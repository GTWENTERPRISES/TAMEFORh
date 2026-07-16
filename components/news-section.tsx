"use client"

import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getLatestNews } from "@/lib/newsData"
import Image from "next/image"
import { motion } from "framer-motion"

export function NewsSection() {
  const latestNews = getLatestNews(3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#1a3a5c] via-[#163250] to-[#0f2a45] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 -ml-48 -mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="w-12 h-[2px] bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-[0.2em] text-sm">Actualidad Forestal</span>
              <div className="w-12 h-[2px] bg-[#3d9a8b]" />
            </div>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-bold text-center lg:text-left">
              Últimas Noticias<br />
              <span className="text-[#3d9a8b]">Del Sector</span>
            </h2>
          </div>
          <div className="mt-8 lg:mt-0 lg:text-right">
            <p className="text-white/70 mb-6 max-w-sm text-lg text-center lg:text-right">
              Mantente informado sobre las novedades y desarrollos en el ámbito forestal
            </p>
            <Link href="/noticias">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#3d9a8b] hover:bg-[#2d7a6b] text-white rounded-none px-10 py-4 font-semibold text-base transition-all duration-300 shadow-none border-2 border-[#3d9a8b] hover:border-[#2d7a6b]">
                  Ver Todas las Noticias
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* News Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {latestNews.map((article) => (
            <motion.div 
              key={article.id} 
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {/* News Card */}
              <div className="bg-white/95 backdrop-blur-sm border border-[#3d9a8b]/30 transition-all duration-500 hover:shadow-xl h-full flex flex-col">
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/60 to-transparent" />
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
                  <div className="flex items-center gap-2 text-sm text-[#1a3a5c]/60 mb-4">
                    <Calendar className="h-4 w-4 text-[#3d9a8b]" />
                    <span className="font-medium">{new Date(article.publishDate).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-xl text-[#1a3a5c] mb-4 font-semibold leading-tight">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#1a3a5c]/70 text-sm leading-relaxed mb-6 flex-grow">
                    {article.excerpt}
                  </p>

                  {/* Button */}
                  <Link href={`/noticias/${article.slug}`} className="mt-auto">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white rounded-none font-semibold text-sm transition-all duration-300 border-2 border-[#1a3a5c] hover:border-[#3d9a8b] group/btn">
                        Leer Más
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
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
