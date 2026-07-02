"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"
import Image from "next/image"
import { containerVariants, itemVariants } from "@/lib/animations"
import { IconBadge } from "@/components/ui/IconBadge"

const quickLinks = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Directiva", href: "/directiva" },
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
  { label: "Miembros", href: "/miembros" },
]

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-[#1a3a5c] text-white">
      <motion.div
        className="container-max section-padding"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/" className="inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5K5il-aXvgEgMRMsZLVxpjVmIlhZEkfwsKOQ.jpg"
                  alt="TAMEFOR Logo"
                  width={140}
                  height={56}
                  className="bg-white/90 rounded-lg p-2 hover:shadow-lg transition-smooth"
                />
              </Link>
            </motion.div>
            <p className="text-white/80 leading-relaxed text-sm">
              TAMEFOR S.A.S B.I.C - Consultora forestal y ambiental. Ofrecemos servicios de gestión ambiental, consultoría forestal y capacitaciones certificadas para empresas y profesionales en Ecuador.
            </p>
            <motion.div
              className="bg-[#3d9a8b]/20 rounded-lg p-4 border border-[#3d9a8b]/30 hover:border-[#3d9a8b] transition-smooth"
              whileHover={{ borderColor: "#3d9a8b" }}
            >
              <p className="font-bold text-white text-sm mb-2">¡Estamos Disponibles!</p>
              <p className="text-white/70 text-sm">
                Lun-Sáb: <span className="text-white font-medium">10:00am a 07:30pm</span>
              </p>
            </motion.div>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.div key={i} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center hover:bg-[#3d9a8b] transition-smooth"
                  >
                    <social.icon className="h-4 w-4 text-white" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <MapPin className="w-5 h-5 text-[#3d9a8b]" />
              </motion.div>
              <h3 className="font-sans text-lg font-bold text-white">Enlaces Rápidos</h3>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <motion.li key={i} whileHover={{ x: 8 }}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#3d9a8b] transition-smooth flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#3d9a8b]" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Mail className="w-5 h-5 text-[#3d9a8b]" />
              </motion.div>
              <h3 className="font-sans text-lg font-bold text-white">Servicios</h3>
            </div>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <motion.li key={i} whileHover={{ x: 8 }}>
                  <Link
                    href={service.href}
                    className="text-white/70 hover:text-[#3d9a8b] transition-smooth flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#3d9a8b]" />
                    {service.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Phone className="w-5 h-5 text-[#3d9a8b]" />
              </motion.div>
              <h3 className="font-sans text-lg font-bold text-white">Contacto</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#3d9a8b] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-white">Ubicación</p>
                  <p className="text-sm text-white/70">Cdla. El Guayacán, Mz C5, villa 6 y 7 III Etapa<br />Quevedo, Los Ríos 120501, Ecuador</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#3d9a8b] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-white">Email</p>
                  <p className="text-sm text-white/70">info@tamefor.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#3d9a8b] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-white">Teléfono</p>
                  <p className="text-sm text-white/70">+593 96 226 5426</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-[#3d9a8b]/20 my-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          variants={itemVariants}
        >
          <p className="text-sm text-white/70">
            © 2025 TAMEFOR S.A.S B.I.C. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/politica-privacidad" className="text-sm text-white/70 hover:text-[#3d9a8b] transition-smooth">
              Política de Privacidad
            </Link>
            <Link href="/terminos-uso" className="text-sm text-white/70 hover:text-[#3d9a8b] transition-smooth">
              Términos de Uso
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
