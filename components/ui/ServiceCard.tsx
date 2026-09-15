import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  number?: string
  title: string
  description: string
  features?: string[]
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
  features,
  image,
  icon,
  href,
  className,
  index = 0,
}: ServiceCardProps) {
  const content = (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border/70 border-l-4 border-l-secondary shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Image Background */}
      {image && (
        <div className="relative overflow-hidden h-52 bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/75 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-7 h-full flex flex-col">
        {/* Header */}
        <div className="space-y-4 mb-6">
          {/* Number Badge */}
          {number && (
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center size-10 rounded-xl bg-secondary/12 text-secondary font-bold text-base">
                {number}
              </div>
              <div className="eyebrow">
                Servicio
              </div>
            </div>
          )}

          {icon && <div className="mb-2">{icon}</div>}

          <h3 className="text-xl font-bold text-card-foreground leading-tight">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features */}
        {features && features.length > 0 && (
          <div className="space-y-2 mb-6 flex-grow">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3d9a8b] mt-2 flex-shrink-0" />
                <span className="text-[#1a3a5c]/70 text-xs">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-[#1a3a5c]/10">
          <Link href={href || "/servicios"}>
            <div className="flex items-center justify-between text-[#3d9a8b] font-semibold text-sm cursor-pointer group-hover:gap-2 transition-all">
              <span>Ver Más</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  )

  return content
}
