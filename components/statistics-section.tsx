"use client"

import { TrendingUp, Leaf, Users, Award } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { SectionHeader } from "@/components/ui"
import { containerVariants } from "@/lib/animations"

// Custom hook: counts from 0 to `end` EVERY TIME the element enters the viewport
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const startAnimation = () => {
      // Cancel any running animation first
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
      setCount(0)

      const startTime = performance.now()

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * end))

        if (progress < 1) {
          rafId.current = requestAnimationFrame(step)
        } else {
          setCount(end)
          rafId.current = null
        }
      }

      rafId.current = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation()
        } else {
          // Element left the viewport — cancel animation and reset
          if (rafId.current !== null) {
            cancelAnimationFrame(rafId.current)
            rafId.current = null
          }
          setCount(0)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [end, duration])

  return { count, ref }
}

// Individual stat card with count-up animation
function StatCard({
  icon: Icon,
  numericValue,
  suffix,
  label,
  index,
}: {
  icon: React.ElementType
  numericValue: number
  suffix: string
  label: string
  index: number
}) {
  const { count, ref } = useCountUp(numericValue, 2000 + index * 200)

  return (
    <motion.div
      className="text-center group"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      whileHover={{ scale: 1.08, y: -10 }}
    >
      <motion.div
        className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#3d9a8b] flex items-center justify-center group-hover:border-[#1a3a5c] group-hover:bg-[#3d9a8b]/10 transition-all duration-300 shadow-lg group-hover:shadow-xl"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-9 h-9 text-[#1a3a5c] group-hover:text-[#3d9a8b] transition-colors" />
      </motion.div>

      {/* Number display with count-up */}
      <div
        ref={ref}
        className="text-4xl md:text-5xl font-sans font-bold text-[#1a3a5c] mb-2 group-hover:text-[#3d9a8b] transition-colors tabular-nums"
      >
        {count}
        {suffix}
      </div>

      <div className="text-[#3d9a8b]/70 text-sm font-medium">{label}</div>
    </motion.div>
  )
}

export function StatisticsSection() {
  const stats = [
    { icon: TrendingUp, numericValue: 25,   suffix: "+", label: "Proyectos" },
    { icon: Leaf,        numericValue: 1800, suffix: "+", label: "Hectáreas" },
    { icon: Users,       numericValue: 200,  suffix: "+", label: "Miembros" },
    { icon: Award,       numericValue: 2035, suffix: "+", label: "Asistencias Técnicas" },
  ]

  return (
    <section className="section-padding bg-white relative overflow-hidden">
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

      <div className="container-max relative z-10">
        <SectionHeader
          icon={TrendingUp}
          subtitle="Estadísticas"
          title="Cifras que Reflejan Nuestro"
          titleHighlight="Compromiso Forestal"
          description="Números que demuestran nuestro impacto en el sector forestal y el desarrollo sostenible"
          centered
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

