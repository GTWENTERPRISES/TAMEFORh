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

export function TerminosUsoPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070"
            alt="Términos de Uso"
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
              Términos de<br />
              <span className="text-white">Uso</span>
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
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">1. Aceptación de los Términos</h2>
                <p className="text-muted-foreground mb-8">
                  Al acceder y utilizar el sitio web de TAMEFOR Los Ríos, usted acepta estar sujeto a estos términos de uso. Si no está de acuerdo con alguno de estos términos, no debe utilizar este sitio.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">2. Uso del Sitio Web</h2>
                <p className="text-muted-foreground mb-6">
                  Usted se compromete a utilizar este sitio web únicamente para fines legales y de manera que no infrinja los derechos de terceros ni restrinja o inhiba el uso y disfrute del sitio por parte de otros.
                </p>
                <p className="text-muted-foreground mb-8">
                  Está prohibido:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-8">
                  <li>Utilizar el sitio de manera fraudulenta o ilegal</li>
                  <li>Intentar acceder a áreas restringidas sin autorización</li>
                  <li>Transmitir virus o código malicioso</li>
                  <li>Recopilar datos de otros usuarios sin su consentimiento</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">3. Propiedad Intelectual</h2>
                <p className="text-muted-foreground mb-8">
                  Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad de TAMEFOR Los Ríos o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">4. Registro y Cuentas</h2>
                <p className="text-muted-foreground mb-8">
                  Para acceder a ciertos servicios, puede ser necesario crear una cuenta. Usted es responsable de mantener la confidencialidad de su información de cuenta y de todas las actividades que ocurran bajo su cuenta.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">5. Limitación de Responsabilidad</h2>
                <p className="text-muted-foreground mb-8">
                  TAMEFOR Los Ríos no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar este sitio web.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">6. Modificaciones</h2>
                <p className="text-muted-foreground mb-8">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">7. Ley Aplicable</h2>
                <p className="text-muted-foreground mb-8">
                  Estos términos se regirán e interpretarán de acuerdo con las leyes de la República del Ecuador.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="font-sans text-3xl text-[#1a3a5c] mb-6">8. Contacto</h2>
                <p className="text-muted-foreground mb-4">
                  Para cualquier consulta sobre estos términos de uso, puede contactarnos en:
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
