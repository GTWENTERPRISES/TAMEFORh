"use client"

import { MapPin, Mail, Phone, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

export function ContactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const contactItems = [
    {
      icon: MapPin,
      title: "Dirección",
      content: "Cdla. El Guayacán, Mz C5, villa 6 y 7 III Etapa, Quevedo, Los Ríos 120501, Ecuador",
      href: null
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@tamefor.com",
      href: "mailto:info@tamefor.com"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+593 96 226 5426",
      href: "tel:+593962265426"
    },
    {
      icon: Clock,
      title: "Horario de Atención",
      content: "Lunes - Viernes: 9:00 - 18:00 | Sábado: 9:00 - 13:00",
      href: null
    }
  ]

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-48 -mt-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
            </svg>
            <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Contáctanos</span>
          </div>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl text-[#1a3a5c] leading-tight font-bold mb-4">
            Estamos Aquí<br />
            <span className="text-[#3d9a8b]">Para Ayudarte</span>
          </h2>
          <p className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-lg">
            Ponte en contacto con nosotros para más información sobre nuestros servicios
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Información de contacto */}
          <motion.div 
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {contactItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-start gap-6 group"
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <motion.div 
                  className="w-20 h-20 rounded-full bg-[#3d9a8b]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#3d9a8b] transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <item.icon className="h-8 w-8 text-[#3d9a8b] group-hover:text-white transition-colors" />
                </motion.div>
                <div>
                  <h3 className="font-sans font-bold text-[#1a3a5c] mb-2 text-xl">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-[#3d9a8b] hover:text-[#1a3a5c] transition-colors font-medium">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-[#1a3a5c]/70 font-medium">{item.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div 
            className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] rounded-3xl shadow-2xl p-10 border border-[#3d9a8b]/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(61, 154, 139, 0.3)" }}
          >
            <motion.h3 
              className="text-3xl font-sans font-bold text-white mb-8"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Enviar Mensaje
            </motion.h3>
            <form className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Input placeholder="Nombre completo" className="w-full bg-white border-white text-[#1a3a5c] placeholder:text-white font-medium rounded-lg h-12" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Input type="email" placeholder="Correo electrónico" className="w-full bg-white border-white text-[#1a3a5c] placeholder:text-white font-medium rounded-lg h-12" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Input placeholder="Asunto" className="w-full bg-white border-white text-[#1a3a5c] placeholder:text-white font-medium rounded-lg h-12" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Textarea placeholder="Mensaje" rows={5} className="w-full bg-white border-white text-[#1a3a5c] placeholder:text-white font-medium rounded-lg" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full bg-[#3d9a8b] hover:bg-white text-white hover:text-[#1a3a5c] rounded-full font-bold py-3 text-lg group transition-all duration-300 shadow-lg hover:shadow-xl">
                  Enviar Mensaje
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


