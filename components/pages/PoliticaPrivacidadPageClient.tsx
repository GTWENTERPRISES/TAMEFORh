'use client'

import Image from "next/image"
import { motion } from "framer-motion"

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

export function PoliticaPrivacidadPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070"
            alt="Política de Privacidad"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a5c]/95 via-[#1a3a5c]/80 to-[#1a3a5c]/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Política de<br />
              <span className="text-white">Privacidad</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Última actualización: Enero 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <motion.div
              className="bg-card rounded-2xl shadow-lg p-8 md:p-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">1. Información que Recopilamos</h2>
                <p className="text-muted-foreground mb-6">
                  En TAMEFOR Los Ríos, recopilamos información personal que usted nos proporciona voluntariamente cuando:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-8">
                  <li>Se registra como miembro del colegio</li>
                  <li>Se inscribe en nuestros cursos y eventos</li>
                  <li>Utiliza nuestros servicios profesionales</li>
                  <li>Se comunica con nosotros</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">2. Uso de la Información</h2>
                <p className="text-muted-foreground mb-6">
                  Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-8">
                  <li>Gestionar su membresía y servicios</li>
                  <li>Procesar inscripciones y pagos</li>
                  <li>Enviar comunicaciones importantes</li>
                  <li>Mejorar nuestros servicios</li>
                  <li>Cumplir con obligaciones legales</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">3. Protección de Datos</h2>
                <p className="text-muted-foreground mb-8">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, pérdida o alteración.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">4. Compartir Información</h2>
                <p className="text-muted-foreground mb-8">
                  No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios o cuando la ley lo requiera.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">5. Sus Derechos</h2>
                <p className="text-muted-foreground mb-6">
                  Usted tiene derecho a:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-8">
                  <li>Acceder a su información personal</li>
                  <li>Corregir datos inexactos</li>
                  <li>Solicitar la eliminación de sus datos</li>
                  <li>Oponerse al procesamiento de sus datos</li>
                  <li>Retirar su consentimiento en cualquier momento</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">6. Contacto</h2>
                <p className="text-muted-foreground mb-4">
                  Para cualquier consulta sobre esta política de privacidad, puede contactarnos en:
                </p>
                <div className="bg-[#3d9a8b]/10 rounded-xl p-6">
                  <p className="text-foreground"><strong>Email:</strong> informacion@tameforlosrios.org</p>
                  <p className="text-foreground"><strong>Teléfono:</strong> +593 96 226 5426</p>
                  <p className="text-foreground"><strong>Dirección:</strong> Quevedo, Los Ríos, Ecuador</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
