import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconBadgeProps {
  icon: LucideIcon
  label?: string
  variant?: "primary" | "secondary" | "accent"
  size?: "sm" | "md" | "lg"
  className?: string
  animated?: boolean
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
}

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
}

const variantClasses = {
  primary: "bg-primary/20 text-primary",
  secondary: "bg-secondary/20 text-secondary",
  accent: "bg-accent/20 text-accent",
}

export function IconBadge({
  icon: Icon,
  label,
  variant = "secondary",
  size = "md",
  className,
  animated = true,
}: IconBadgeProps) {
  const content = (
    <div
      className={cn(
        "rounded-full flex items-center justify-center transition-all duration-300",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <Icon className={iconSizes[size]} />
    </div>
  )

  if (!animated) {
    return label ? (
      <div className="flex items-center gap-2">
        {content}
        {label && <span className="text-sm font-medium">{label}</span>}
      </div>
    ) : (
      content
    )
  }

  return label ? (
    <motion.div
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
      {label && <span className="text-sm font-medium">{label}</span>}
    </motion.div>
  ) : (
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
    >
      {content}
    </motion.div>
  )
}
