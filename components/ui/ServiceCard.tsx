import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  number?: string
  title: string
  description: string
  image?: string
  icon?: React.ReactNode
  href?: string
  className?: string
  index?: number
}

export function ServiceCard({
  number,
  title,
  description,
  image,
  icon,
  href,
  className,
  index = 0,
}: ServiceCardProps) {
  const content = (
    <motion.div
      className={cn(
        "group relative rounded-3xl overflow-hidden bg-white border-2 border-[#3d9a8b]/20 shadow-lg hover:shadow-2xl transition-all duration-300 h-full",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Image Background */}
      {image && (
        <div className="relative overflow-hidden h-64 bg-gradient-to-br from-[#3d9a8b]/20 to-[#1a3a5c]/10">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-125 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="space-y-4">
          {/* Number Badge */}
          {number && (
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3d9a8b] to-[#2d7a6b] text-white font-bold text-lg shadow-md"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.15, rotate: 360 }}
            >
              {number}
            </motion.div>
          )}

          {icon && (
            <motion.div
              className="mb-2"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              {icon}
            </motion.div>
          )}

          <motion.h3 
            className="text-2xl font-bold text-[#1a3a5c] leading-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.1 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-[#1a3a5c]/70 text-base leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.15 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
        </div>

        {/* Footer */}
        {href && (
          <motion.div
            className="flex items-center gap-2 text-[#3d9a8b] font-bold mt-6 group-hover:gap-4 transition-all pt-4 border-t border-[#3d9a8b]/20"
            whileHover={{ x: 5 }}
          >
            <span>Más información</span>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>
        )}

        {/* Decorative accent line */}
        <motion.div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#3d9a8b] to-[#2d7a6b] w-0 group-hover:w-full transition-all duration-500"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
        />
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}
