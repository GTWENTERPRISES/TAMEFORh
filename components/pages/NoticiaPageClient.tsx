'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowLeft, Share2, Clock, FileText, Facebook, Twitter, Linkedin, Mail, Copy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NewsArticle } from "@/lib/newsData"
import { motion } from "framer-motion"

interface NoticiaPageClientProps {
  article: NewsArticle
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

function parseContent(content: string) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  
  lines.forEach((line, index) => {
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="font-sans text-2xl font-bold text-[#1a3a5c] mt-8 mb-4 flex items-center gap-3">
          <div className="w-8 h-1 bg-[#3d9a8b]" />
          {line.substring(3)}
        </h2>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={index} className="flex items-start gap-3 text-[#1a3a5c]/70">
          <span className="w-1.5 h-1.5 bg-[#3d9a8b] mt-2 flex-shrink-0" />
          {line.substring(2)}
        </li>
      );
    } else if (line.trim() !== '') {
      elements.push(
        <p key={index} className="text-[#1a3a5c]/70 leading-relaxed text-lg">
          {line}
        </p>
      );
    }
  });
  
  return elements;
}

export function NoticiaPageClient({ article }: NoticiaPageClientProps) {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Article Header */}
      <section className="py-32 bg-gradient-to-r from-[#1a3a5c] via-[#163250] to-[#0f2a45] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/10 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-5xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Link href="/noticias">
                <Button variant="ghost" className="mb-8 text-white hover:text-[#3d9a8b] flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver a noticias
                </Button>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-6">
              <span className="bg-[#3d9a8b] text-white text-xs font-bold px-4 py-2 uppercase tracking-wider inline-block border-t-2 border-white/20">
                {article.category.toUpperCase()}
              </span>
            </motion.div>
            
            <motion.h1
              className="font-sans text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              {article.title}
            </motion.h1>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-8 text-white/90"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                  <Calendar className="h-4.5 w-4.5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider">Fecha</p>
                  <p className="font-semibold">{new Date(article.publishDate).toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                  <User className="h-4.5 w-4.5 text-[#3d9a8b]" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider">Autor</p>
                  <p className="font-semibold">{article.author.name}</p>
                  <p className="text-xs text-white/70">{article.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="ghost" className="text-white hover:text-[#3d9a8b]">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Article Image */}
      <section className="py-0 bg-white">
        <div className="w-full h-[500px] relative">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
              >
                {/* Introduction */}
                <motion.div variants={itemVariants} className="bg-white p-10 border-l-4 border-[#3d9a8b] shadow-lg">
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
                <motion.div variants={itemVariants} className="bg-white p-10 border-l-4 border-[#3d9a8b] shadow-lg mt-8">
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
                  <h3 className="text-sm font-semibold text-[#1a3a5c] mb-4 uppercase tracking-wider">
                    Etiquetas:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#1a3a5c]/10 text-[#1a3a5c] text-sm px-5 py-2.5 border-l-4 border-[#3d9a8b] font-semibold hover:bg-[#1a3a5c]/20 transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Article Info */}
              <div className="bg-white p-8 border-l-4 border-[#3d9a8b] shadow-lg sticky top-6">
                <h3 className="font-bold text-[#1a3a5c] mb-8 text-xl flex items-center gap-3">
                  <div className="w-8 h-1 bg-[#3d9a8b]" />
                  Información
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                      <Calendar className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <div className="pt-1">
                      <p className="text-xs text-[#1a3a5c]/60 uppercase tracking-wider font-semibold mb-1">
                        Fecha de Publicación
                      </p>
                      <p className="text-[#1a3a5c]/80 font-semibold">
                        {new Date(article.publishDate).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                      <Clock className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <div className="pt-1">
                      <p className="text-xs text-[#1a3a5c]/60 uppercase tracking-wider font-semibold mb-1">
                        Tiempo de Lectura
                      </p>
                      <p className="text-[#1a3a5c]/80 font-semibold">
                        {Math.ceil(article.content.length / 1500)} min
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 border-t-2 border-[#3d9a8b]">
                      <User className="h-5 w-5 text-[#3d9a8b]" />
                    </div>
                    <div className="pt-1">
                      <p className="text-xs text-[#1a3a5c]/60 uppercase tracking-wider font-semibold mb-1">
                        Autor
                      </p>
                      <p className="text-[#1a3a5c]/80 font-semibold">
                        {article.author.name}
                      </p>
                      <p className="text-xs text-[#1a3a5c]/60">
                        {article.author.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mt-8 pt-8 border-t border-[#3d9a8b]/20">
                  <div className="bg-gradient-to-r from-[#1a3a5c] via-[#163250] to-[#0f2a45] p-6 border-l-4 border-[#3d9a8b]">
                    <p className="text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
                      Categoría
                    </p>
                    <p className="text-xl font-bold text-[#3d9a8b] uppercase">
                      {article.category}
                    </p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-8 pt-8 border-t border-[#3d9a8b]/20">
                  <h4 className="text-sm font-semibold text-[#1a3a5c] mb-4 uppercase tracking-wider">
                    Compartir
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-2 border-[#1877F2] hover:border-[#1877F2]/90"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button 
                      className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white border-2 border-[#1DA1F2] hover:border-[#1DA1F2]/90"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button 
                      className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white border-2 border-[#0A66C2] hover:border-[#0A66C2]/90"
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button 
                      className="bg-[#D44638] hover:bg-[#D44638]/90 text-white border-2 border-[#D44638] hover:border-[#D44638]/90"
                      onClick={() => window.open(`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(window.location.href)}`, '_blank')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                  <div className="mt-4">
                    <Button 
                      className="w-full bg-[#1a3a5c] hover:bg-[#3d9a8b] text-white border-2 border-[#1a3a5c] hover:border-[#3d9a8b]"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Enlace copiado al portapapeles');
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar Enlace
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
