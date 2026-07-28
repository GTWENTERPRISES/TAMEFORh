"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Home, Users, Briefcase, Users2, GraduationCap, FolderOpen, Newspaper, CreditCard, MessageSquare, LayoutDashboard, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Nosotros", href: "/nosotros", icon: Users },
  { label: "Servicios", href: "/servicios", icon: Briefcase },
  { label: "Equipo", href: "/equipo", icon: Users2 },
  { label: "Cursos", href: "/cursos", icon: GraduationCap },
  { label: "Proyectos", href: "/proyectos", icon: FolderOpen },
  { label: "Noticias", href: "/noticias", icon: Newspaper },
  { label: "Contacto", href: "/contacto", icon: MessageSquare },
]

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full">
      {/* Top Bar - Dark Blue Background */}
      <div className="bg-[#1a3a5c] text-white py-2 md:py-3 border-b border-[#3d9a8b]/30">
        <div className="container-max">
          {/* Móvil: Layout simplificado */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2 sm:gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 w-full sm:w-auto">
              <motion.div 
                className="flex items-center gap-2 hover:text-[#3d9a8b] transition-smooth cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-4 w-4 text-white flex-shrink-0" />
                <span className="font-semibold hidden md:inline">Soluciones Forestales y Ambientales</span>
                <span className="font-semibold md:hidden">TAMEFOR Ecuador</span>
              </motion.div>
              <Link href="mailto:info@tamefor.com" className="hidden md:flex items-center gap-2 hover:text-[#3d9a8b] transition-smooth">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="h-4 w-4 text-white flex-shrink-0" />
                  <span>info@tamefor.com</span>
                </motion.div>
              </Link>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="tel:+593962265426" className="hidden sm:flex items-center gap-2 hover:text-[#3d9a8b] transition-smooth min-h-[44px]">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="h-4 w-4 text-white flex-shrink-0" />
                  <span className="whitespace-nowrap">+593 96 226 5426</span>
                </motion.div>
              </Link>
              <div className="flex items-center gap-2 sm:gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#3d9a8b] transition-smooth flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto"
                        aria-label={`Visitar ${social.icon.name}`}
                      >
                        <Icon className="h-4 w-4 sm:h-4 sm:w-4" />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md py-3 md:py-4 sticky top-0 z-50 border-b-2 border-[#3d9a8b]/20">
        <div className="container-max flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/" className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5K5il-aXvgEgMRMsZLVxpjVmIlhZEkfwsKOQ.jpg"
                alt="TAMEFOR Logo"
                className="h-12 sm:h-14 md:h-16 w-auto hover:drop-shadow-lg transition-smooth"
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <motion.div key={link.href} whileHover={{ y: -2 }}>
                  <Link
                    href={link.href}
                    className="text-[#1a3a5c] hover:text-[#3d9a8b] font-semibold text-xs transition-smooth relative group flex items-center gap-2 py-2"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3d9a8b] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/plataforma-interna">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="rounded-full px-6 py-2.5 bg-[#3d9a8b] hover:bg-[#3d9a8b]/90 text-white font-semibold shadow-md hover:shadow-lg transition-smooth flex items-center gap-2 min-h-[44px]">
                  <LayoutDashboard className="h-4 w-4" />
                  Plataforma
                </Button>
              </motion.div>
            </Link>
            <Link href="https://aulavirtual.tamefor.com/login/index.php" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="rounded-full px-6 py-2.5 bg-[#3d9a8b] hover:bg-[#3d9a8b]/90 text-white font-semibold shadow-md hover:shadow-lg transition-smooth flex items-center gap-2 min-h-[44px]">
                  <BookOpen className="h-4 w-4" />
                  Aula Virtual
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-[#3d9a8b] min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-white border-t-2 border-[#3d9a8b]/20 mt-4 py-4 max-h-[calc(100vh-120px)] overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="container-max flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.div key={link.href} whileHover={{ x: 5 }}>
                    <Link
                      href={link.href}
                      className="text-[#1a3a5c] hover:text-[#3d9a8b] font-semibold py-3 px-4 text-base transition-smooth block flex items-center gap-3 rounded-md hover:bg-[#3d9a8b]/5 min-h-[48px]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
              <div className="flex flex-col gap-3 pt-4 mt-2 border-t-2 border-[#3d9a8b]/20">
                <Link href="/plataforma-interna" className="w-full">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full rounded-full bg-[#3d9a8b] hover:bg-[#3d9a8b]/90 text-white font-semibold shadow-md hover:shadow-lg transition-smooth flex items-center justify-center gap-2 min-h-[48px] text-base">
                      <LayoutDashboard className="h-5 w-5" />
                      Plataforma
                    </Button>
                  </motion.div>
                </Link>
                <Link href="https://aulavirtual.tamefor.com/login/index.php" target="_blank" rel="noopener noreferrer" className="w-full">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full rounded-full bg-[#3d9a8b] hover:bg-[#3d9a8b]/90 text-white font-semibold shadow-md hover:shadow-lg transition-smooth flex items-center justify-center gap-2 min-h-[48px] text-base">
                      <BookOpen className="h-5 w-5" />
                      Aula Virtual
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}
