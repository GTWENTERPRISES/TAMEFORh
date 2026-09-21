'use client'

import { Search, BookOpen, FileText, Download, Library, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getAllDocumentos } from "@/lib/api/biblioteca"
import type { Document } from "@/lib/documentsData"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionHeader } from "@/components/ui"
import { containerVariants, itemVariants } from "@/lib/animations"

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

  const featuredDocs = documents.filter(doc => doc.featured).slice(0, 4)

  return (
    <>
      <PageHeader
        badge="Recursos Digitales"
        title="Biblioteca Digital"
        titleHighlight="TAMEFOR"
        subtitle="Accede a recursos especializados en gestión forestal y conservación ambiental"
        backgroundImage="https://images.unsplash.com/photo-1507842217343-583f20270319?q=80&w=2070"
      />

      {/* ═══ Search & Categories ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative blobs */}
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a3a5c]/5 rounded-full blur-3xl -ml-48 -mb-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={Library}
            subtitle="Explora Nuestros Recursos"
            title="Categorías de"
            titleHighlight="Documentos"
            description="Encuentra recursos especializados organizados por temática"
            centered
          />

          {/* Search Bar */}
          <motion.div
            className="mt-10 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1a3a5c]/40" />
              <input
                placeholder="Buscar en la biblioteca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-[#1a3a5c]/10 bg-white text-[#1a3a5c]
                           focus:outline-none focus:border-[#3d9a8b] focus:ring-2 focus:ring-[#3d9a8b]/20
                           placeholder:text-[#1a3a5c]/40 transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden bg-white border border-[#1a3a5c]/10 shadow-md p-7 hover:shadow-xl transition-all duration-500 cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {/* Shine sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
                  <div className="h-full w-2/5 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] via-[#5bc4b1] to-[#3d9a8b] transition-all duration-700" />
                </div>

                <motion.div
                  className="w-14 h-14 bg-[#3d9a8b]/10 flex items-center justify-center mb-4 group-hover:bg-[#3d9a8b] transition-colors duration-500"
                  animate={{}}
                >
                  <category.icon className="h-7 w-7 text-[#3d9a8b] group-hover:text-white transition-colors duration-500" />
                </motion.div>
                <h3 className="font-bold text-[#1a3a5c] mb-2 text-lg">{category.name}</h3>
                <p className="text-4xl font-black text-[#1a3a5c] mb-1 tabular-nums">{category.count}</p>
                <p className="text-sm text-[#1a3a5c]/60 font-medium">recursos disponibles</p>

                {/* Bottom animated line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ Featured Resources ═══ */}
      <section className="section-padding bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] relative overflow-hidden">
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />
        <motion.div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px]" />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={BookOpen}
            subtitle="Destacados"
            title="Recursos"
            titleHighlight="Destacados"
            description="Los documentos más relevantes para profesionales del sector forestal"
            centered
            dark
          />

          <motion.div
            className="grid md:grid-cols-2 gap-6 mt-10 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {isLoading ? (
              <div className="col-span-2 text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent" />
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
                  className="group bg-white/10 backdrop-blur-sm p-6 flex items-center justify-between hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-[#3d9a8b]/40"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-[#3d9a8b]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm group-hover:text-[#3d9a8b] transition-colors">{resource.title}</p>
                      <p className="text-white/50 text-xs mt-1">{resource.fileType?.toUpperCase() || 'PDF'} &bull; {resource.fileSize || 'N/A'}</p>
                    </div>
                  </div>
                  <Download className="h-5 w-5 text-white/40 group-hover:text-[#3d9a8b] transition-all group-hover:scale-110" />
                </motion.a>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══ Stats Banner ═══ */}
      <section className="relative overflow-hidden bg-[#0f2540] py-20">
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <motion.div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#3d9a8b]/8 rounded-full blur-[120px]" />
        <motion.div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#1a3a5c]/40 rounded-full blur-[100px]" />

        <div className="container-max relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: String(documents.length || "160+"), label: "Documentos Disponibles" },
              { value: "4", label: "Categorías Temáticas" },
              { value: "100%", label: "Acceso Gratuito" },
              { value: "PDF", label: "Formato Digital" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-[#3d9a8b] mb-2">{stat.value}</p>
                <p className="text-white/60 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section className="relative overflow-hidden bg-white py-20">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mt-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              variants={itemVariants}
            >
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">
                ¿Necesitas Más Recursos?
              </span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-6"
              variants={itemVariants}
            >
              ¿No encontraste lo que{" "}
              <span className="text-[#3d9a8b]">buscabas?</span>
            </motion.h2>

            <motion.p
              className="text-[#1a3a5c]/70 text-lg mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Contáctanos y nuestro equipo te ayudará a encontrar los recursos y documentación que necesitas para tu proyecto forestal o ambiental.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link href="/contacto">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                             bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                             shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                             transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contáctanos Ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
