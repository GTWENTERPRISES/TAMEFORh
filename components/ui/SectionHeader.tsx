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
          className={`inline-flex items-center justify-center size-12 bg-secondary/15 mb-5 ${centered ? "" : ""} ${dark ? "rounded-xl" : "rounded-2xl"}`}
          whileHover={{ rotate: dark ? 0 : 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-6 h-6 text-secondary" />
        </motion.div>
      )}

      {subtitle && (
        <p className={`text-sm font-semibold text-secondary uppercase tracking-wider mb-2`}>
          {subtitle}
        </p>
      )}

      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${dark ? "text-white" : "text-primary"}`}>
        {title}
        {titleHighlight && (
          <span className="text-secondary"> {titleHighlight}</span>
        )}
      </h2>

      {description && (
        <p className={`text-lg max-w-2xl ${dark ? "text-white/70" : "text-primary/70"} ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
