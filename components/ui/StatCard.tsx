import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: LucideIcon
  value: string
  label: string
  className?: string
  index?: number
}

export function StatCard({
  icon: Icon,
  value,
  label,
  className,
  index = 0,
}: StatCardProps) {
  return (
    <motion.div
      className={cn(
        "relative text-center p-8 rounded-3xl bg-gradient-to-br from-[#1a3a5c]/40 to-[#1a3a5c]/20 border border-[#3d9a8b]/30 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group",
        className
      )}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.05 }}
    >
      {/* Decorative background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#3d9a8b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon Badge */}
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3d9a8b] to-[#2d7a6b] mb-6 shadow-lg"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Value */}
        <motion.div
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-[#3d9a8b] to-[#5db8a3] bg-clip-text text-transparent">
            {value}
          </span>
        </motion.div>

        {/* Label */}
        <motion.p
          className="text-white/80 text-sm md:text-base font-semibold leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {label}
        </motion.p>
      </div>

      {/* Border accent on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-[#3d9a8b] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  )
}
