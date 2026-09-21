"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Phone, Mail, MapPin, Facebook, Linkedin, Home, Users, Briefcase, Users2, GraduationCap, FolderOpen, Newspaper, CreditCard, MessageSquare, LayoutDashboard, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Inicio", href: "/", icon: Home, sectionId: "hero" },
  { label: "Nosotros", href: "/nosotros", icon: Users, sectionId: "about" },
  { label: "Servicios", href: "/servicios", icon: Briefcase, sectionId: "services" },
  { label: "Cursos", href: "/cursos", icon: GraduationCap, sectionId: "courses" },
  { label: "Proyectos", href: "/proyectos", icon: FolderOpen, sectionId: "projects" },
  { label: "Noticias", href: "/noticias", icon: Newspaper },
  { label: "Contacto", href: "/contacto", icon: MessageSquare },
]

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1RuJ5kuMfs/", name: "Facebook" },
  { icon: Linkedin, href: "https://ec.linkedin.com/company/tamefor", name: "LinkedIn" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll spy con IntersectionObserver
  useEffect(() => {
    const sections = navLinks
      .filter(link => link.sectionId)
      .map(link => document.getElementById(link.sectionId))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50%" }
    )

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  return (
    <header className="w-full">
      {/* Top Bar - Dinámico y Profesional */}
      <motion.div 
        className="bg-[#1a3a5c] text-white py-3 border-b border-[#3d9a8b]/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-max">
          {/* Desktop: Layout horizontal mejorado */}
          <div className="hidden md:flex justify-between items-center text-sm">
            <div className="flex items-center gap-8">
              {/* Eslogan con animación */}
              <motion.div 
                className="flex items-center gap-2.5 group cursor-default"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="p-2 bg-[#3d9a8b]/20 rounded-lg group-hover:bg-[#3d9a8b]/30 transition-smooth"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className="h-4 w-4 text-[#3d9a8b] flex-shrink-0" />
                </motion.div>
                <span className="font-semibold text-white/90 group-hover:text-white transition-smooth">
                  Soluciones Forestales y Ambientales
                </span>
              </motion.div>

              {/* Email con hover effect mejorado */}
              <Link href="mailto:info@tamefor.com" className="group">
                <motion.div 
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-[#3d9a8b]/10 transition-smooth"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail className="h-4 w-4 text-[#3d9a8b] flex-shrink-0" />
                  </motion.div>
                  <span className="text-white/80 group-hover:text-[#3d9a8b] transition-smooth font-medium">
                    info@tamefor.com
                  </span>
                </motion.div>
              </Link>
            </div>

            {/* Derecha: Teléfono y Redes Sociales */}
            <div className="flex items-center gap-6">
              {/* Teléfono con efecto llamativo */}
              <Link href="tel:+593969934651" className="group">
                <motion.div 
                  className="flex items-center gap-2.5 px-4 py-1.5 rounded-lg bg-[#3d9a8b]/10 hover:bg-[#3d9a8b]/20 transition-smooth"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: [0, -15, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Phone className="h-4 w-4 text-[#3d9a8b] flex-shrink-0" />
                  </motion.div>
                  <span className="text-white font-semibold whitespace-nowrap group-hover:text-[#3d9a8b] transition-smooth">
                    +593 96 993 4651
                  </span>
                </motion.div>
              </Link>

              {/* Redes Sociales mejoradas */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 hover:bg-[#3d9a8b] transition-smooth group"
                        aria-label={`Visitar ${social.name}`}
                      >
                        <Icon className="h-4 w-4 text-white group-hover:scale-110 transition-smooth" />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile & Tablet: Layout optimizado */}
          <motion.div 
            className="md:hidden space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Línea 1: Eslogan con badge style */}
            <div className="flex items-center justify-center">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3d9a8b]/20 rounded-full"
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="h-3.5 w-3.5 text-[#3d9a8b] flex-shrink-0" />
                <span className="font-semibold text-xs">Soluciones Forestales y Ambientales</span>
              </motion.div>
            </div>
            
            {/* Línea 2: Email y Teléfono en cards */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 text-xs">
              <Link href="mailto:info@tamefor.com" className="flex-1 sm:flex-none">
                <motion.div 
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-[#3d9a8b]/20 transition-smooth"
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="h-3.5 w-3.5 text-[#3d9a8b] flex-shrink-0" />
                  <span className="font-medium">info@tamefor.com</span>
                </motion.div>
              </Link>
              
              <Link href="tel:+593969934651" className="flex-1 sm:flex-none">
                <motion.div 
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-[#3d9a8b]/20 transition-smooth"
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="h-3.5 w-3.5 text-[#3d9a8b] flex-shrink-0" />
                  <span className="font-semibold">+593 96 993 4651</span>
                </motion.div>
              </Link>
            </div>
            
            {/* Línea 3: Redes Sociales mejoradas */}
            <div className="flex items-center justify-center gap-2">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <motion.div
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#3d9a8b]/20 hover:bg-[#3d9a8b] transition-smooth group"
                      aria-label={`Visitar ${social.name}`}
                    >
                      <Icon className="h-4 w-4 text-white group-hover:scale-110 transition-smooth" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Navigation - Dinámico y Profesional con efecto scroll */}
      <motion.nav 
        className={`bg-white shadow-md sticky top-0 z-50 border-b-2 border-[#3d9a8b]/20 transition-all duration-300 ${
          scrolled ? "py-2 backdrop-blur-md bg-white/95 shadow-xl" : "py-3 md:py-4"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="container-max flex justify-between items-center">
          {/* Logo con efecto de brillo mejorado */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="flex items-center gap-3 relative"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5K5il-aXvgEgMRMsZLVxpjVmIlhZEkfwsKOQ.jpg"
                  alt="TAMEFOR Logo"
                  className="h-12 sm:h-14 md:h-16 w-auto hover:drop-shadow-xl transition-smooth relative z-10"
                />
                {/* Efecto de resplandor en hover */}
                <motion.div
                  className="absolute inset-0 bg-[#3d9a8b]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-smooth"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                />
              </motion.div>
              
              {/* Texto al lado del logo - Solo visible en móvil */}
              <div className="flex flex-col lg:hidden">
                <span className="text-[#1a3a5c] font-bold text-sm sm:text-base leading-tight">TAMEFOR</span>
                <span className="text-[#3d9a8b] font-semibold text-xs sm:text-sm leading-tight">Soluciones Forestales</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu - Links mejorados con scroll spy */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => {
              const Icon = link.icon
              const isActive = link.sectionId && activeSection === link.sectionId
              return (
                <motion.div 
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <Link href={link.href}>
                    <motion.div
                      className={`font-semibold text-sm transition-smooth relative group flex items-center gap-2 py-2 px-3 ${
                        isActive 
                          ? "text-[#3d9a8b]" 
                          : "text-[#1a3a5c] hover:text-[#3d9a8b]"
                      }`}
                      whileHover={{ y: -3, backgroundColor: "rgba(61, 154, 139, 0.05)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.div>
                      <span>{link.label}</span>
                      
                      {/* Indicador activo/hover */}
                      <motion.span 
                        className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#3d9a8b] to-transparent"
                        initial={{ width: 0, x: "-50%" }}
                        animate={{ 
                          width: isActive ? "100%" : 0,
                          x: "-50%"
                        }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Botones CTA con efectos mejorados */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/plataforma-interna">
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Button className="rounded-none px-6 py-2.5 bg-[#3d9a8b] hover:bg-[#2d8a7b] text-white font-semibold shadow-md hover:shadow-xl transition-smooth flex items-center gap-2 min-h-[44px] relative overflow-hidden">
                  {/* Efecto de brillo deslizante */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <LayoutDashboard className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">Plataforma</span>
                </Button>
                
                {/* Anillo de pulso sutil */}
                <motion.div
                  className="absolute inset-0 rounded-none border-2 border-[#3d9a8b] opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </Link>
            
            <Link href="https://aulavirtual.tamefor.com/login/index.php" target="_blank" rel="noopener noreferrer">
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Button className="rounded-none px-6 py-2.5 bg-[#1a3a5c] hover:bg-[#0f2a45] text-white font-semibold shadow-md hover:shadow-xl transition-smooth flex items-center gap-2 min-h-[44px] relative overflow-hidden">
                  {/* Efecto de brillo deslizante */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <BookOpen className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">Aula Virtual</span>
                </Button>
                
                {/* Anillo de pulso sutil */}
                <motion.div
                  className="absolute inset-0 rounded-none border-2 border-[#1a3a5c] opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button - Mejorado */}
          <motion.button
            className="lg:hidden p-2 text-[#3d9a8b] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-[#3d9a8b]/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Abrir menú"
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu - Animación stagger mejorada */}
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-white border-t-2 border-[#3d9a8b]/20 mt-4 py-4 max-h-[calc(100vh-120px)] overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-max flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <motion.div 
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.div
                        className="text-[#1a3a5c] hover:text-[#3d9a8b] font-semibold py-3 px-4 text-base transition-smooth flex items-center gap-3 rounded-lg hover:bg-[#3d9a8b]/10 min-h-[48px] border-l-4 border-transparent hover:border-[#3d9a8b]"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.div>
                        {link.label}
                      </motion.div>
                    </Link>
                  </motion.div>
                )
              })}
              
              {/* Botones CTA móviles */}
              <motion.div 
                className="flex flex-col gap-3 pt-4 mt-2 border-t-2 border-[#3d9a8b]/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
              >
                <Link href="/plataforma-interna" className="w-full">
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full rounded-none bg-[#3d9a8b] hover:bg-[#2d8a7b] text-white font-semibold shadow-md hover:shadow-lg transition-smooth flex items-center justify-center gap-2 min-h-[48px] text-base">
                      <LayoutDashboard className="h-5 w-5" />
                      Plataforma
                    </Button>
                  </motion.div>
                </Link>
                <Link href="https://aulavirtual.tamefor.com/login/index.php" target="_blank" rel="noopener noreferrer" className="w-full">
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full rounded-none bg-[#1a3a5c] hover:bg-[#0f2a45] text-white font-semibold shadow-md hover:shadow-lg transition-smooth flex items-center justify-center gap-2 min-h-[48px] text-base">
                      <BookOpen className="h-5 w-5" />
                      Aula Virtual
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </header>
  )
}
