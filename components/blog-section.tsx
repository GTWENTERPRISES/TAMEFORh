"use client"

import { motion } from "framer-motion"
import { ArrowRight, Share2, Newspaper, Facebook, Twitter, Linkedin, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/SectionHeader"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getLatestNoticias } from "@/lib/api/noticias"
import type { NewsArticle } from "@/lib/newsData"
import {
  containerVariants,
  itemVariants,
  imageVariants,
} from "@/lib/animations"

export function BlogSection() {
  const [posts, setPosts] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [openShareMenu, setOpenShareMenu] = useState<string | null>(null)

  useEffect(() => {
    async function loadNoticias() {
      try {
        const noticias = await getLatestNoticias(3)
        setPosts(noticias)
      } catch (error) {
        console.error('Error al cargar noticias recientes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadNoticias()
  }, [])

  const handleShare = (platform: string, post: NewsArticle) => {
    const shareUrl = `${window.location.origin}/noticias/${post.slug}`
    const shareText = `${post.title} - ${post.excerpt}`

    let url = ""
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
        break
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case "copy":
        navigator.clipboard.writeText(shareUrl)
        alert("¡Enlace copiado al portapapeles!")
        setOpenShareMenu(null)
        return
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400")
      setOpenShareMenu(null)
    }
  }

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('es-ES', { month: 'short' }),
      year: date.getFullYear().toString()
    }
  }

  return (
    <section id="blog" className="section-padding bg-primary">
      <div className="container-max">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Left Side - Header */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <SectionHeader
                icon={Newspaper}
                subtitle="Noticias y Blog"
                title="Últimas"
                titleHighlight="Publicaciones"
                description="Mantente informado con nuestras últimas noticias, eventos y actualizaciones del sector forestal."
                centered={false}
              />

              <motion.div
                className="mt-8"
                variants={itemVariants}
              >
                <Button className="bg-secondary hover:bg-secondary/90 text-primary rounded-full px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all">
                  Explorar Todo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side - Blog Cards */}
            <motion.div
              className="lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={containerVariants}
            >
              {isLoading ? (
                <div className="col-span-full text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-secondary border-r-transparent"></div>
                  <p className="mt-4 text-foreground/70">Cargando noticias...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-foreground/70">No hay noticias disponibles</p>
                </div>
              ) : (
                posts.map((post, index) => {
                  const dateInfo = formatDate(post.publishDate)
                  return (
                    <motion.div
                      key={post.id}
                      className="group rounded-2xl overflow-hidden bg-card border border-secondary/20 shadow-md hover:shadow-xl transition-all duration-300"
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      {/* Image Container */}
                      <motion.div
                        className="relative overflow-hidden h-56 bg-muted"
                        variants={imageVariants}
                      >
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />

                        {/* Category Badge */}
                        <motion.div
                          className="absolute top-4 left-4 bg-secondary text-primary px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          {post.category}
                        </motion.div>

                        {/* Date Badge */}
                        <motion.div
                          className="absolute bottom-4 right-4 bg-secondary rounded-xl p-3 text-center shadow-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <div className="text-2xl font-bold text-primary">{dateInfo.day}</div>
                          <div className="text-xs text-primary/80 font-medium">{dateInfo.month}</div>
                          <div className="text-xs text-primary/60 border-t border-primary/20 pt-1 mt-1">
                            {dateInfo.year}
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Content */}
                      <motion.div className="p-6" variants={itemVariants}>
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-secondary hover:text-secondary hover:bg-secondary/10 rounded-full font-semibold"
                              asChild
                            >
                              <a href={`/noticias/${post.slug}`}>
                                Leer Más
                                <ArrowRight className="ml-2 h-3 w-3" />
                              </a>
                            </Button>
                          </motion.div>
                          
                          {/* Share Button with Menu */}
                          <div className="relative">
                            <motion.button
                              className="flex items-center gap-2 text-muted-foreground text-sm hover:text-secondary transition-colors"
                              whileHover={{ scale: 1.1 }}
                              onClick={() => setOpenShareMenu(openShareMenu === post.slug ? null : post.slug)}
                            >
                              <Share2 className="w-4 h-4" />
                              <span className="font-medium">Compartir</span>
                            </motion.button>

                            {/* Share Menu Dropdown */}
                            {openShareMenu === post.slug && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                className="absolute right-0 bottom-full mb-2 bg-white rounded-xl shadow-2xl border border-secondary/20 p-3 z-50 min-w-48"
                              >
                                <div className="space-y-2">
                                  <button
                                    onClick={() => handleShare("facebook", post)}
                                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#1877f2]/10 text-[#1877f2] transition-colors"
                                  >
                                    <Facebook className="w-5 h-5" />
                                    <span className="font-medium text-sm">Facebook</span>
                                  </button>
                                  <button
                                    onClick={() => handleShare("twitter", post)}
                                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#1da1f2]/10 text-[#1da1f2] transition-colors"
                                  >
                                    <Twitter className="w-5 h-5" />
                                    <span className="font-medium text-sm">Twitter</span>
                                  </button>
                                  <button
                                    onClick={() => handleShare("linkedin", post)}
                                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#0a66c2]/10 text-[#0a66c2] transition-colors"
                                  >
                                    <Linkedin className="w-5 h-5" />
                                    <span className="font-medium text-sm">LinkedIn</span>
                                  </button>
                                  <button
                                    onClick={() => handleShare("copy", post)}
                                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-secondary/10 text-secondary transition-colors"
                                  >
                                    <Link2 className="w-5 h-5" />
                                    <span className="font-medium text-sm">Copiar enlace</span>
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
