"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { membersData } from "@/lib/membersData"
import Image from "next/image"
import { motion } from "framer-motion"

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

export function MiembrosPageClient() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = membersData.filter((member) => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return true
    return (
      member.fullName?.toLowerCase().includes(query) ||
      member.credentialNumber?.toLowerCase().includes(query) ||
      member.cedula?.toLowerCase().includes(query)
    )
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070"
            alt="Miembros"
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
              <span className="text-white font-medium">Nuestra Comunidad</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Miembros Registrados<br />
              <span className="text-white">TAMEFOR Los Ríos</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Profesionales certificados y consultores de TAMEFOR S.A.S B.I.C
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Members List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o credencial..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>

            {/* Members Table */}
            <motion.div
              className="bg-card rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1a3a5c] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Nombre Completo</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Credencial</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Cédula</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Categoría</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredMembers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          {membersData.length === 0
                            ? "Próximamente se publicará la lista de miembros registrados."
                            : `No se encontraron miembros para "${searchQuery}".`}
                        </td>
                      </tr>
                    ) : (
                      filteredMembers.slice(0, 20).map((member, index) => (
                        <motion.tr
                          key={member.id}
                          className="hover:bg-muted/50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-foreground">{member.fullName}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{member.credentialNumber}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{member.cedula}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#3d9a8b]/10 text-[#3d9a8b]">
                              {member.category || 'Adherente'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              member.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {member.status === 'active' ? 'Habilitado' : 'Inhabilitado'}
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Pagination Info */}
            {filteredMembers.length > 0 && (
              <motion.div
                className="mt-6 text-center text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Mostrando 1-{Math.min(20, filteredMembers.length)} de {filteredMembers.length} miembros registrados
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
