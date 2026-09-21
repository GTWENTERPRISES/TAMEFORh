"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface PageHeaderProps {
  badge?: string
  title: string
  titleHighlight?: string
  subtitle: string
  backgroundImage: string
}

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

export function PageHeader({
  badge = "Sobre Nosotros",
  title,
  titleHighlight,
  subtitle,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a5c]/95 via-[#1a3a5c]/80 to-[#1a3a5c]/60" />
      </div>
      <div className="container-max relative z-10">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
            <div className="w-8 h-1 bg-[#3d9a8b]" />
            <span className="text-white font-semibold uppercase tracking-wider text-sm">
              {badge}
            </span>
          </motion.div>
          <motion.h1
            className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
            variants={headerVariants}
          >
            {title}
            {titleHighlight && (
              <>
                <br />
                <span className="text-[#3d9a8b]">{titleHighlight}</span>
              </>
            )}
          </motion.h1>
          <motion.p className="text-white/80 text-xl" variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
