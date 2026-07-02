'use client'

import { CreditCard, Building, Smartphone, Check, Upload, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

const paymentConcepts = [
  { title: "Aportación mensual", description: "Pago mensual", amount: "$3" },
  { title: "Aportación semestral", description: "Cada 6 meses", amount: "$18" },
  { title: "Aportación anual", description: "Pago de todo el año", amount: "$36" },
  { title: "Eventos Deportivos", description: "Aportación extra", amount: "$50" },
  { title: "Evento social de Navidad", description: "Aportación extra", amount: "$25" },
  { title: "Inscripción nuevo miembro", description: "Inscripción según año de graduación", amount: "$50" },
]

const fines = [
  { title: "Sanciones por no votar", description: "Equivalente a una nueva matrícula", amount: "$10" },
  { title: "Multa por inasistencia", description: "No justificada a reuniones", amount: "$3" },
]

const courses = [
  {
    title: "Sistemas de Información Geográfica Aplicados a la Gestión Forestal",
    subtitle: "ArcGIS – Niveles I a IV",
    price: "$125 por nivel",
    levels: ["Nivel 2", "Nivel 3", "Nivel 4"]
  },
  {
    title: "Modelación, Biometría y Manejo de Datos",
    subtitle: "Niveles I a IV",
    price: "$125 por nivel",
    levels: ["Nivel 2", "Nivel 3", "Nivel 4"]
  },
  {
    title: "Fertilidad de Suelos y Nutrición Vegetal",
    subtitle: "Niveles I a III",
    price: "$100 por nivel",
    levels: ["Nivel 2", "Nivel 3"]
  },
  {
    title: "Tecnología y Manejo del Riego",
    subtitle: "Niveles I a IV",
    price: "$100 por nivel",
    levels: ["Nivel 2"]
  },
  {
    title: "Sanidad Vegetal Sostenible",
    subtitle: "Niveles I a IV",
    price: "$120 por nivel",
    levels: ["Nivel 2"]
  },
  {
    title: "Gestión Técnica y Comercial de Agroquímicos",
    subtitle: "Niveles I a IV",
    price: "$100 por nivel",
    levels: ["Nivel 2"]
  },
  {
    title: "Gestión Integrada ISO en la Industria Forestal",
    subtitle: "Niveles I a III",
    price: "$125 por nivel",
    levels: ["Nivel 2", "Nivel 3"]
  },
]

export function PagosPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070"
            alt="Pagos"
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
            <motion.div className="flex items-center gap-2 mb-6" variants={itemVariants}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
              </svg>
              <span className="text-white font-medium uppercase tracking-wider text-sm">Sistema de Pagos</span>
            </motion.div>
            <motion.h1
              className="font-sans text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              variants={headerVariants}
            >
              Pagos y<br />
              <span className="text-white">Aportaciones</span>
            </motion.h1>
            <motion.p className="text-white/80 text-xl" variants={itemVariants}>
              Pagos de servicios, cursos y consultoría de TAMEFOR S.A.S B.I.C
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Payment System */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">

            {/* Course Pricing */}
            <motion.div
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div className="text-center mb-12" variants={containerVariants}>
                <motion.div className="flex items-center justify-center gap-2 mb-4" variants={itemVariants}>
                  <svg className="w-5 h-5 text-[#3d9a8b]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 8 12 8C10.5 8 9 6.5 9 5C9 3.5 10.5 2 12 2ZM17 7C17 7 21 10 21 14C21 18 17 22 12 22C7 22 3 18 3 14C3 10 7 7 7 7" />
                  </svg>
                  <span className="text-[#3d9a8b] font-medium uppercase tracking-wider text-sm">Cursos</span>
                </motion.div>
                <motion.h2
                  className="font-sans text-4xl md:text-5xl text-[#1a3a5c] leading-tight font-bold mb-4"
                  variants={headerVariants}
                >
                  Pagos de Cursos<br />
                  <span className="text-[#3d9a8b]">(Por Nivel)</span>
                </motion.h2>
                <motion.p className="text-[#1a3a5c]/70 text-lg font-medium" variants={itemVariants}>
                  Tipo de Precio: Regular | Estudiante (15%) | Miembro CIFOR (20%) | Afiliado CONIFOR (10%) | Miembro Habilitado (35%)
                </motion.p>
              </motion.div>

              <motion.div className="space-y-4" variants={containerVariants}>
                {courses.map((course, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] rounded-2xl p-6 shadow-lg border border-[#3d9a8b]/20 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-sans text-lg text-white mb-1 font-bold">{course.title}</h3>
                        <p className="text-white/70 text-sm">{course.subtitle}</p>
                      </div>
                      <div className="text-2xl font-bold text-[#3d9a8b] ml-4">{course.price}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {course.levels.map((level, idx) => (
                        <span key={idx} className="bg-[#3d9a8b]/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-[#3d9a8b]/50">
                          {level}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              className="grid lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {/* Form Section */}
              <motion.div className="lg:col-span-2" variants={itemVariants}>
                <div className="bg-gradient-to-br from-white to-[#f8fafb] rounded-3xl shadow-lg p-10 border border-[#3d9a8b]/10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-[#3d9a8b] flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-sans text-2xl text-[#1a3a5c] font-bold">Datos del Pago</h3>
                  </div>

                  <form className="space-y-6">
                    {/* Official Registration Number */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-3">
                        Número de Registro Oficial *
                      </label>
                      <p className="text-[#1a3a5c]/70 text-sm mb-3 font-medium">
                        Ingresa tu número de registro oficial como miembro del Colegio de Ingenieros Forestales.
                      </p>
                      <Input 
                        placeholder="Número de registro profesional" 
                        className="w-full bg-white border-[#3d9a8b]/20 text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 rounded-lg h-12 font-medium"
                      />
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-3">
                        Método de pago utilizado
                      </label>
                      <div className="flex items-center gap-3 p-4 bg-[#3d9a8b]/10 rounded-lg border border-[#3d9a8b]/20">
                        <div className="w-5 h-5 rounded-full border-2 border-[#3d9a8b] bg-[#3d9a8b]" />
                        <span className="text-[#1a3a5c] font-semibold">Banco Pichincha (QR)</span>
                      </div>
                    </div>

                    {/* Receipt Number */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-3">
                        Número de comprobante de pago
                      </label>
                      <p className="text-[#1a3a5c]/70 text-sm mb-3 font-medium">
                        Ingresa el número de comprobante, referencia o transacción de tu transferencia bancaria.
                      </p>
                      <Input 
                        placeholder="Referencia / número de transacción" 
                        className="w-full bg-white border-[#3d9a8b]/20 text-[#1a3a5c] placeholder:text-[#1a3a5c]/50 rounded-lg h-12 font-medium"
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-[#1a3a5c] font-semibold mb-3">
                        Comprobante de pago (captura o PDF)
                      </label>
                      <p className="text-[#1a3a5c]/70 text-sm mb-3 font-medium">
                        Sube una imagen o PDF del comprobante de pago de tu transferencia bancaria para verificar el pago.
                      </p>
                      <div className="border-2 border-dashed border-[#3d9a8b]/30 rounded-lg p-8 text-center hover:border-[#3d9a8b]/60 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-[#3d9a8b] mx-auto mb-3" />
                        <p className="text-[#1a3a5c] font-semibold mb-1">Subir archivo</p>
                        <p className="text-[#1a3a5c]/70 text-sm">
                          Formatos permitidos: JPG, PNG, PDF. Tamaño máximo recomendado 5MB.
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button className="w-full bg-[#3d9a8b] hover:bg-[#1a3a5c] text-white rounded-full py-3 font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                      Registrar pago
                    </Button>

                    {/* Info Message */}
                    <div className="flex items-start gap-3 p-4 bg-[#3d9a8b]/10 rounded-lg border border-[#3d9a8b]/20">
                      <AlertCircle className="w-5 h-5 text-[#3d9a8b] mt-0.5 flex-shrink-0" />
                      <p className="text-[#1a3a5c] text-sm font-medium">
                        Este registro será validado por el Colegio. Conserve su comprobante original hasta que el pago sea confirmado.
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div className="space-y-6" variants={containerVariants}>
                {/* Payment Instructions */}
                <motion.div
                  className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] rounded-3xl shadow-lg p-8 border border-[#3d9a8b]/20"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="font-sans text-xl text-white mb-6 font-bold">Formas de pago</h3>
                  <ol className="space-y-4 text-white/90 text-sm font-medium">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3d9a8b] flex items-center justify-center text-white text-xs font-bold">1</span>
                      <span>Escanea el código QR de Banco Pichincha con tu aplicación bancaria.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3d9a8b] flex items-center justify-center text-white text-xs font-bold">2</span>
                      <span>Realiza la transferencia por el monto exacto indicado según el concepto seleccionado.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3d9a8b] flex items-center justify-center text-white text-xs font-bold">3</span>
                      <span>Guarda el comprobante (captura o PDF) y súbelo en este formulario.</span>
                    </li>
                  </ol>
                </motion.div>

                {/* QR Code */}
                <motion.div
                  className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2a45] rounded-3xl shadow-lg p-8 border border-[#3d9a8b]/20"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="font-sans text-xl text-white mb-6 font-bold">QR Banco Pichincha</h3>
                  <div className="bg-[#0f2a45] rounded-xl p-8 flex items-center justify-center min-h-[200px] border border-[#3d9a8b]/30">
                    <p className="text-white/60 text-center text-sm">
                      Aquí puedes colocar la imagen del QR de la cuenta de Banco Pichincha del Colegio.
                    </p>
                  </div>
                </motion.div>

                {/* Amount to Pay */}
                <motion.div
                  className="bg-gradient-to-br from-[#3d9a8b] to-[#2d7a6b] rounded-3xl shadow-lg p-8 border border-[#3d9a8b]/50"
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <p className="text-white/90 text-sm font-medium mb-2">MONTO A PAGAR</p>
                  <div className="text-4xl font-bold text-white">$3.00</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
