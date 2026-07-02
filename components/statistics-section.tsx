"use client"

import { TrendingUp, Leaf, Users, Award } from "lucide-react"
import { motion } from "framer-motion"

export function StatisticsSection() {
  const stats = [
    { icon: TrendingUp, value: "25+", label: "Proyectos" },
    { icon: Leaf, value: "1800+", label: "Hectáreas" },
    { icon: Users, value: "200+", label: "Miembros" },
    { icon: Award, value: "2035+", label: "Asistencias Técnicas" }
  ]

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

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex items-center justify-center gap-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-full bg-[#3d9a8b]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
              </svg>
            </div>
            <span className="text-[#3d9a8b] font-medium text-sm uppercase tracking-wider">Estadísticas</span>
          </motion.div>
          <motion.h2 
            className="font-sans text-4xl md:text-5xl text-[#1a3a5c] leading-tight mb-4 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Cifras que Reflejan Nuestro<br />Compromiso Forestal
          </motion.h2>
          <motion.p 
            className="text-[#1a3a5c]/70 max-w-2xl mx-auto text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Números que demuestran nuestro impacto en el sector forestal y el desarrollo sostenible.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center group"
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -10 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#3d9a8b] flex items-center justify-center group-hover:border-[#1a3a5c] group-hover:bg-[#3d9a8b]/10 transition-all duration-300 shadow-lg group-hover:shadow-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-9 h-9 text-[#1a3a5c] group-hover:text-[#3d9a8b] transition-colors" />
              </motion.div>
              <motion.div 
                className="text-4xl md:text-5xl font-sans font-bold text-[#1a3a5c] mb-2 group-hover:text-[#3d9a8b] transition-colors"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <div className="text-[#3d9a8b]/70 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
