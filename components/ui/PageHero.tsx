"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"

interface PageHeroProps {
  badge?: string
  title: string
  titleHighlight?: string
  description: string
  image: string
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

export function PageHero({ badge, title, titleHighlight, description, image }: PageHeroProps) {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45]">
      <div className="absolute inset-0 opacity-10">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {badge && (
            <motion.div className="flex items-center justify-center gap-2 mb-6" variants={itemVariants}>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">{badge}</span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </motion.div>
          )}
          <motion.h1
            className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
            variants={itemVariants}
          >
            {title}
            {titleHighlight && (
              <>
                <br />
                <span className="text-[#3d9a8b]">{titleHighlight}</span>
              </>
            )}
          </motion.h1>
          <motion.p className="text-white/80 text-xl max-w-2xl mx-auto" variants={itemVariants}>
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
