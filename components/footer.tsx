"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Facebook, Linkedin, ArrowRight, Leaf } from "lucide-react"
import Image from "next/image"
import { containerVariants, itemVariants } from "@/lib/animations"
import { IconBadge } from "@/components/ui/IconBadge"

const quickLinks = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Cursos", href: "/cursos" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Noticias", href: "/noticias" },
  { label: "Contacto", href: "/contacto" },
]

const services = [
  { label: "Certificación Profesional", href: "/servicios" },
  { label: "Consultoría Técnica", href: "/servicios" },
  { label: "Capacitación", href: "/cursos" },
  { label: "Asesoría Legal", href: "/servicios" },
  { label: "Gestión Forestal", href: "/servicios" },
]

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1RuJ5kuMfs/", name: "Facebook" },
  { icon: Linkedin, href: "https://ec.linkedin.com/company/tamefor", name: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1a3a5c] text-white">
      {/* Fondo dinámico: gradiente sutil + blobs animados */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a5c] via-[#1a3a5c] to-[#12293f]" />
        <motion.div
          className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#3d9a8b]/20 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-[#3d9a8b]/10 blur-3xl"
          animate={{ x: [0, -25, 0], y: [0, -15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <motion.div
        className="container relative z-10 mx-auto px-4 py-10 sm:py-12 md:py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand */}
          <motion.div className="space-y-4 sm:space-y-5 md:space-y-6" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/" className="inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5K5il-aXvgEgMRMsZLVxpjVmIlhZEkfwsKOQ.jpg"
                  alt="TAMEFOR Logo"
                  width={140}
                  height={56}
                  className="bg-white/90 rounded-lg p-2 shadow-md hover:shadow-[0_0_25px_rgba(61,154,139,0.45)] transition-all duration-300 w-28 sm:w-32 md:w-40"
                />
              </Link>
            </motion.div>
            <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
              TAMEFOR TAPIA & MENA SOLUCIONES FORESTALES Y AMBIENTALES S.A.S. B.I.C - Consultora forestal y ambiental. Ofrecemos servicios de gestión ambiental, consultoría forestal y capacitaciones certificadas para empresas y profesionales en Ecuador.
            </p>
            <motion.div
              className="relative overflow-hidden bg-[#3d9a8b]/20 rounded-lg p-3 sm:p-4 border border-[#3d9a8b]/30 hover:border-[#3d9a8b] transition-smooth"
              whileHover={{ borderColor: "#3d9a8b", scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, ease: "easeInOut" }}
              />
              <p className="relative font-bold text-white text-xs sm:text-sm mb-1 sm:mb-2 flex items-center gap-2">
                <motion.span
                  className="inline-block h-2 w-2 rounded-full bg-[#3d9a8b]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
                />
                ¡Estamos Disponibles!
              </p>
              <p className="relative text-white/70 text-xs sm:text-sm">
                Lun-Sáb: <span className="text-white font-medium">10:00am a 07:30pm</span>
              </p>
            </motion.div>
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social, i) => (
                <motion.div key={i} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center hover:bg-[#3d9a8b] hover:shadow-[0_0_18px_rgba(61,154,139,0.6)] transition-all duration-300"
                    aria-label={`Visitar ${social.name}`}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4 sm:space-y-5 md:space-y-6" variants={itemVariants}>
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360, backgroundColor: "rgba(61,154,139,0.35)" }}
                transition={{ duration: 0.6 }}
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#3d9a8b]" />
              </motion.div>
              <h3 className="font-sans text-sm sm:text-base md:text-lg font-bold text-white">Enlaces Rápidos</h3>
            </div>
            <ul className="space-y-1 sm:space-y-2">
              {quickLinks.map((link, i) => (
                <motion.li key={i} whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#3d9a8b] transition-smooth flex items-center gap-2 group text-xs sm:text-sm py-2 min-h-[44px]"
                  >
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#3d9a8b]" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#3d9a8b] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div className="space-y-4 sm:space-y-5 md:space-y-6" variants={itemVariants}>
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360, backgroundColor: "rgba(61,154,139,0.35)" }}
                transition={{ duration: 0.6 }}
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#3d9a8b]" />
              </motion.div>
              <h3 className="font-sans text-sm sm:text-base md:text-lg font-bold text-white">Servicios</h3>
            </div>
            <ul className="space-y-1 sm:space-y-2">
              {services.map((service, i) => (
                <motion.li key={i} whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Link
                    href={service.href}
                    className="text-white/70 hover:text-[#3d9a8b] transition-smooth flex items-center gap-2 group text-xs sm:text-sm py-2 min-h-[44px]"
                  >
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#3d9a8b]" />
                    <span className="relative">
                      {service.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#3d9a8b] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="space-y-4 sm:space-y-5 md:space-y-6" variants={itemVariants}>
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360, backgroundColor: "rgba(61,154,139,0.35)" }}
                transition={{ duration: 0.6 }}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#3d9a8b]" />
              </motion.div>
              <h3 className="font-sans text-sm sm:text-base md:text-lg font-bold text-white">Contacto</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <motion.div className="flex items-start gap-2 sm:gap-3" whileHover={{ x: 4 }}>
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#3d9a8b] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white mb-1">Ubicación</p>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Cdla. El Guayacán, Mz C5, villa 6 y 7 III Etapa
                    <br />
                    Quevedo, Los Ríos 120501, Ecuador
                  </p>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-2 sm:gap-3 min-h-[44px]" whileHover={{ x: 4 }}>
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#3d9a8b] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white mb-1">Email</p>
                  <Link
                    href="mailto:info@tamefor.com"
                    className="text-xs sm:text-sm text-white/70 hover:text-[#3d9a8b] transition-smooth inline-block py-1"
                  >
                    info@tamefor.com
                  </Link>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-2 sm:gap-3 min-h-[44px]" whileHover={{ x: 4 }}>
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#3d9a8b] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white mb-1">Teléfono</p>
                  <Link
                    href="tel:+593969934651"
                    className="text-xs sm:text-sm text-white/70 hover:text-[#3d9a8b] transition-smooth inline-block py-1"
                  >
                    +593 96 993 4651
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Divider con brillo animado */}
        <motion.div
          className="relative h-px my-6 sm:my-8 md:my-10 lg:my-12 bg-[#3d9a8b]/20 overflow-hidden"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#3d9a8b] to-transparent"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear", repeatDelay: 1 }}
          />
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-5 md:gap-6"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs sm:text-sm text-white/70 text-center md:text-left flex items-center gap-1.5">
              <Leaf className="h-3.5 w-3.5 text-[#3d9a8b]" />
              © 2025 TAMEFOR TAPIA & MENA SOLUCIONES FORESTALES Y AMBIENTALES S.A.S. B.I.C. Todos los derechos reservados.
            </p>
            <p className="text-xs text-white/50 text-center md:text-left">
              Powered by{" "}
              <a
                href="https://peertopeeracademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3d9a8b] hover:text-[#3d9a8b]/80 transition-smooth font-semibold"
              >
                Peer-to-Peer Academy
              </a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
            <Link
              href="/politica-privacidad"
              className="text-xs sm:text-sm text-white/70 hover:text-[#3d9a8b] transition-smooth text-center min-h-[44px] flex items-center justify-center px-2"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/terminos-uso"
              className="text-xs sm:text-sm text-white/70 hover:text-[#3d9a8b] transition-smooth text-center min-h-[44px] flex items-center justify-center px-2"
            >
              Términos de Uso
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
