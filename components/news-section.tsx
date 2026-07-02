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
    <section className="py-20 bg-[#1a3a5c] relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -mr-48 -mt-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -ml-48 -mb-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
              </svg>
              <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Actualidad Forestal</span>
            </div>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-bold">
              Últimas Noticias<br />
              <span className="text-[#3d9a8b]">Del Sector</span>
            </h2>
          </div>
          <div className="mt-6 lg:mt-0 lg:text-right">
            <p className="text-white/70 mb-4 max-w-sm text-lg">
              Mantente informado sobre las novedades y desarrollos en el ámbito forestal
            </p>
            <Link href="/noticias">
              <motion.div whileHover={{ x: 5 }}>
                <Button variant="link" className="text-[#3d9a8b] p-0 hover:text-white font-semibold text-lg">
                  Ver Todas las Noticias <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* News Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {latestNews.map((article) => (
            <motion.div 
              key={article.id} 
              className="group relative h-[480px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              {/* Background Image */}
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/98 via-[#1a3a5c]/70 to-transparent" />
              
              {/* Category Badge */}
              <motion.div 
                className="absolute top-6 left-6"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="bg-[#3d9a8b] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                  {article.category}
                </span>
              </motion.div>
              
              {/* Content */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
                  <Calendar className="h-5 w-5 text-[#3d9a8b]" />
                  <span className="font-medium">{new Date(article.publishDate).toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <h3 className="font-sans text-2xl font-bold text-white mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-white/80 text-sm mb-6 line-clamp-2 font-medium">
                  {article.excerpt}
                </p>
                <Link href={`/noticias/${article.slug}`}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="bg-[#3d9a8b] hover:bg-white text-white hover:text-[#1a3a5c] rounded-full font-bold py-2 px-6 group transition-all duration-300">
                      Leer Más
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


