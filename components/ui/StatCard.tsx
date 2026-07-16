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
        "relative text-center p-8 bg-white/10 border-l-4 border-[#3d9a8b] backdrop-blur-md hover:shadow-xl transition-all duration-300 overflow-hidden",
        className
      )}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Content */}
      <div className="relative z-10">
        {/* Icon Badge */}
        <motion.div
          className="inline-flex items-center justify-center w-14 h-14 bg-[#3d9a8b]/20 mb-6 border border-[#3d9a8b]/30"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Icon className="w-7 h-7 text-[#3d9a8b]" />
        </motion.div>

        {/* Value */}
        <motion.div
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {value}
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
    </motion.div>
  )
}
