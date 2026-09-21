'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Shield, ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import { PageHeader } from "@/components/ui/PageHeader"
import { SectionHeader } from "@/components/ui"
import { containerVariants, itemVariants } from "@/lib/animations"

const sections = [
  {
    title: "1. Información que Recopilamos",
    content: "En TAMEFOR, recopilamos información personal que usted nos proporciona voluntariamente cuando:",
    list: [
      "Se registra como miembro del colegio",
      "Se inscribe en nuestros cursos y eventos",
      "Utiliza nuestros servicios profesionales",
      "Se comunica con nosotros",
    ],
  },
  {
    title: "2. Uso de la Información",
    content: "Utilizamos la información recopilada para:",
    list: [
      "Gestionar su membresía y servicios",
      "Procesar inscripciones y pagos",
      "Enviar comunicaciones importantes",
      "Mejorar nuestros servicios",
      "Cumplir con obligaciones legales",
    ],
  },
  {
    title: "3. Protección de Datos",
    content: "Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, pérdida o alteración.",
  },
  {
    title: "4. Compartir Información",
    content: "No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios o cuando la ley lo requiera.",
  },
  {
    title: "5. Sus Derechos",
    content: "Usted tiene derecho a:",
    list: [
      "Acceder a su información personal",
      "Corregir datos inexactos",
      "Solicitar la eliminación de sus datos",
      "Oponerse al procesamiento de sus datos",
      "Retirar su consentimiento en cualquier momento",
    ],
  },
  {
    title: "6. Contacto",
    content: "Para cualquier consulta sobre esta política de privacidad, puede contactarnos en:",
    contact: true,
  },
]

export function PoliticaPrivacidadPageClient() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Política de"
        titleHighlight="Privacidad"
        subtitle="Última actualización: Septiembre 2026"
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070"
      />

      {/* ═══ Content ═══ */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative blobs */}
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3d9a8b]/5 rounded-full blur-3xl -mr-64 -mt-64"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1a3a5c]/5 rounded-full blur-3xl -ml-48 -mb-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <SectionHeader
            icon={Shield}
            subtitle="Privacidad y Seguridad"
            title="Protegemos Tu"
            titleHighlight="Información"
            description="Conoce cómo recopilamos, usamos y protegemos tu información personal"
            centered
          />

          <motion.div
            className="max-w-4xl mx-auto mt-12 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden bg-white border border-[#1a3a5c]/10 shadow-md p-8 hover:shadow-xl transition-all duration-500"
                variants={itemVariants}
                whileHover={{ y: -3 }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
                  <div className="h-full w-2/5 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] via-[#5bc4b1] to-[#3d9a8b] transition-all duration-700" />
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#3d9a8b]/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#3d9a8b] transition-colors duration-500">
                    <span className="text-[#3d9a8b] font-bold text-sm group-hover:text-white transition-colors duration-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-2xl text-[#1a3a5c] mb-4">{section.title}</h2>
                    <p className="text-[#1a3a5c]/70 leading-relaxed mb-4">{section.content}</p>

                    {section.list && (
                      <ul className="space-y-2">
                        {section.list.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-[#3d9a8b] rounded-full mt-2 flex-shrink-0" />
                            <span className="text-[#1a3a5c]/70">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.contact && (
                      <div className="bg-[#1a3a5c]/5 p-6 border-l-4 border-[#3d9a8b] mt-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-[#3d9a8b]" />
                            <span className="text-[#1a3a5c]">informacion@tameforlosrios.org</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-[#3d9a8b]" />
                            <span className="text-[#1a3a5c]">+593 96 993 4651</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-[#3d9a8b]" />
                            <span className="text-[#1a3a5c]">Quevedo, Los Ríos, Ecuador</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom animated line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#3d9a8b] to-[#5bc4b1] transition-all duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section className="relative overflow-hidden bg-white py-20">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-[#3d9a8b]/5 rounded-full blur-3xl -ml-48 -mt-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="container-max relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              variants={itemVariants}
            >
              <div className="w-8 h-1 bg-[#3d9a8b]" />
              <span className="text-[#3d9a8b] font-semibold uppercase tracking-wider text-sm">
                ¿Tienes Dudas?
              </span>
              <div className="w-8 h-1 bg-[#3d9a8b]" />
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] mb-6"
              variants={itemVariants}
            >
              ¿Necesitas más información sobre{" "}
              <span className="text-[#3d9a8b]">tu privacidad?</span>
            </motion.h2>

            <motion.p
              className="text-[#1a3a5c]/70 text-lg mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Nuestro equipo está disponible para resolver cualquier consulta relacionada con el manejo de tu información personal.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link href="/contacto">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 font-semibold text-white
                             bg-gradient-to-r from-[#3d9a8b] to-[#2a7a6c]
                             shadow-lg shadow-[#3d9a8b]/25 hover:shadow-[#3d9a8b]/50
                             transition-shadow duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contáctanos Ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
