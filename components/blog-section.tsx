"use client"

import { motion } from "framer-motion"
import { ArrowRight, Share2, Newspaper, Facebook, Twitter, Linkedin, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/SectionHeader"
import Image from "next/image"
import { useState } from "react"
import {
  containerVariants,
  itemVariants,
  imageVariants,
  hoverLiftVariants,
} from "@/lib/animations"

const posts = [
  {
    id: "sistemas-gestion-ambiental",
    date: "15",
    month: "Ene",
    year: "2025",
    category: "Gestión Ambiental",
    title: "Sistemas de Gestión ISO 14001",
    excerpt: "Implementación de sistemas de gestión ambiental para empresas en Ecuador",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
    shares: 142,
    url: "/noticias/sistemas-gestion-ambiental",
  },
  {
    id: "capacitaciones-senecyt",
    date: "20",
    month: "Ene",
    year: "2025",
    category: "Capacitación",
    title: "Cursos Certificados SENECYT",
    excerpt: "Nueva oferta de capacitaciones certificadas para profesionales del sector",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
    shares: 98,
    url: "/noticias/capacitaciones-senecyt",
  },
  {
    id: "gestion-residuos-3",
    date: "15",
    month: "Mar",
  {
    id: "peritajes-judiciales",
    date: "25",
    month: "Ene",
    year: "2025",
    category: "Servicios Legales",
    title: "Peritajes Judiciales Ambientales",
    excerpt: "Servicios especializados de peritajes en impacto ambiental y topografía",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070",
    shares: 76,
    url: "/noticias/peritajes-judiciales",
  },
]

export function BlogSection() {
  const [openShareMenu, setOpenShareMenu] = useState<string | null>(null)

  const handleShare = (platform: string, post: typeof posts[0]) => {
    const shareUrl = `${window.location.origin}${post.url}`
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
                description="Cámaras avanzadas combinadas con gran pantalla, rendimiento rápido y alta calidad."
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
              {posts.map((post, index) => (
                <motion.div
                  key={index}
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
                      src={post.image}
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
                      <div className="text-2xl font-bold text-primary">{post.date}</div>
                      <div className="text-xs text-primary/80 font-medium">{post.month}</div>
                      <div className="text-xs text-primary/60 border-t border-primary/20 pt-1 mt-1">
                        {post.year}
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
                        >
                          Leer Más
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </motion.div>
                      
                      {/* Share Button with Menu */}
                      <div className="relative">
                        <motion.button
                          className="flex items-center gap-2 text-muted-foreground text-sm hover:text-secondary transition-colors"
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setOpenShareMenu(openShareMenu === post.id ? null : post.id)}
                        >
                          <Share2 className="w-4 h-4" />
                          <span className="font-medium">{post.shares}</span>
                        </motion.button>

                        {/* Share Menu Dropdown */}
                        {openShareMenu === post.id && (
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
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


