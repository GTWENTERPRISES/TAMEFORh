'use client'

import { Lock, ArrowLeft } from "lucide-react"
import { LoginForm } from "@/components/LoginFormModal"
import Link from "next/link"
import { motion } from "framer-motion"

export function PlataformaInternaPageClient() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a3a5c] via-[#0f2a45] to-[#0a1f35] flex flex-col items-center justify-center px-4 py-12">
      {/* Volver al sitio */}
      <div className="w-full max-w-md mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al sitio
        </Link>
      </div>

      {/* Login Card */}
      <motion.div
        className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5K5il-aXvgEgMRMsZLVxpjVmIlhZEkfwsKOQ.jpg"
            alt="TAMEFOR Logo"
            className="h-16 w-auto mx-auto mb-6 rounded-lg"
          />
          <div className="w-14 h-14 bg-[#3d9a8b] rounded-full mx-auto flex items-center justify-center mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-sans text-3xl text-white font-bold mb-2">
            Plataforma Interna
          </h1>
          <p className="text-white/70 text-sm">
            Acceso exclusivo para clientes y equipo de TAMEFOR S.A.S B.I.C
          </p>
        </div>

        <LoginForm variant="dark" redirectTo="/plataforma-interna/dashboard" />
      </motion.div>

      <p className="mt-8 text-white/40 text-xs text-center">
        © {new Date().getFullYear()} TAMEFOR S.A.S B.I.C — Todos los derechos reservados
      </p>
    </main>
  )
}
