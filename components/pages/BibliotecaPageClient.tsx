'use client'

import { Search, BookOpen, FileText, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getAllDocumentos } from "@/lib/api/biblioteca"
import type { Document } from "@/lib/documentsData"

const categories = [
  { name: "Artículos Científicos", count: 45, icon: FileText },
  { name: "Libros Forestales", count: 32, icon: BookOpen },
  { name: "Legislación Forestal", count: 28, icon: FileText },
  { name: "Guías Técnicas", count: 56, icon: Download }
]

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

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function BibliotecaPageClient() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function loadDocuments() {
      try {
        const docs = await getAllDocumentos()
        setDocuments(docs)
      } catch (error) {
        console.error('Error al cargar documentos:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadDocuments()
  }, [])

  // Contar documentos por categoría
  const categoryCounts = documents.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categories = [
    { name: "Artículos Científicos", count: categoryCounts["Artículos Científicos"] || 0, icon: FileText },
    { name: "Libros Forestales", count: categoryCounts["Libros"] || 0, icon: BookOpen },
    { name: "Legislación Forestal", count: categoryCounts["Legislación"] || 0, icon: FileText },
    { name: "Guías Técnicas", count: categoryCounts["Guías Técnicas"] || 0, icon: Download }
  ]

  // Filtrar documentos destacados
  const featuredDocs = documents.filter(doc => doc.featured).slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507842217343-583f20270319?q=80&w=2070"
            alt="Biblioteca"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a5c]/95 via-[#1a3a5c]/80 to-[#1a3a5c]/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
              </svg>
              <span className="text-white font-medium">Recursos Digitales</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Biblioteca Digital<br />
              <span className="text-white">TAMEFOR</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Accede a recursos especializados en gestión forestal y conservación ambiental
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar en la biblioteca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 text-lg"
                />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#3d9a8b]/10 flex items-center justify-center mb-4 group-hover:bg-[#3d9a8b] transition-colors">
                    <category.icon className="h-6 w-6 text-[#3d9a8b] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-[#1a3a5c] mb-2">{category.name}</h3>
                  <p className="text-3xl font-bold text-white">{category.count}</p>
                  <p className="text-sm text-muted-foreground">recursos disponibles</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Featured Resources */}
            <motion.div
              className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] rounded-2xl p-8 md:p-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 className="font-sans text-3xl text-white mb-8" variants={itemVariants}>
                {isLoading ? 'Cargando recursos...' : 'Recursos Destacados'}
              </motion.h2>
              <motion.div className="grid md:grid-cols-2 gap-6" variants={containerVariants}>
                {isLoading ? (
                  <div className="col-span-2 text-center py-8">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
                    <p className="mt-4 text-white/70">Cargando documentos...</p>
                  </div>
                ) : featuredDocs.length === 0 ? (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-white/70">No hay recursos destacados disponibles</p>
                  </div>
                ) : (
                  featuredDocs.map((resource, index) => (
                    <motion.a
                      key={index}
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between hover:bg-white/20 transition-all duration-300 group hover:scale-105"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-white" />
                        <div>
                          <p className="text-white font-semibold text-sm">{resource.title}</p>
                          <p className="text-white/60 text-xs">{resource.fileType?.toUpperCase() || 'PDF'} • {resource.fileSize || 'N/A'}</p>
                        </div>
                      </div>
                      <Download className="h-5 w-5 text-white cursor-pointer hover:scale-110 transition-transform group-hover:text-[#3d9a8b]" />
                    </motion.a>
                  ))
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
