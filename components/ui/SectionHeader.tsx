import { motion } from "framer-motion"
import { itemVariants } from "@/lib/animations"
import { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  icon?: LucideIcon
  subtitle?: string
  title: string
  titleHighlight?: string
  description?: string
  centered?: boolean
  dark?: boolean
  className?: string
}

export function SectionHeader({
  icon: Icon,
  subtitle,
  title,
  titleHighlight,
  description,
  centered = true,
  dark = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`${centered ? "text-center" : ""} ${className}`}
      variants={itemVariants}
    >
      {Icon && (
        <motion.div
          className={`inline-flex items-center justify-center w-12 h-12 bg-[#3d9a8b]/20 mb-4 ${centered ? "" : ""} ${dark ? "rounded-none" : "rounded-full"}`}
          whileHover={{ rotate: dark ? 0 : 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-6 h-6 text-[#3d9a8b]" />
        </motion.div>
      )}

      {subtitle && (
        <p className={`text-sm font-semibold text-[#3d9a8b] uppercase tracking-wider mb-2`}>
          {subtitle}
        </p>
      )}

      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${dark ? "text-white" : "text-[#1a3a5c]"}`}>
        {title}
        {titleHighlight && (
          <span className="text-[#3d9a8b]"> {titleHighlight}</span>
        )}
      </h2>

      {description && (
        <p className={`text-lg max-w-2xl ${dark ? "text-white/70" : "text-[#1a3a5c]/70"} ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
