"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CongressSection } from "@/components/congress-section"
import { StatisticsSection } from "@/components/statistics-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { DirectiveSection } from "@/components/directive-section"
import { CoursesSection } from "@/components/courses-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ProjectsSection } from "@/components/projects-section"
import { NewsSection } from "@/components/news-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function HomePageClient() {
  return (
    <motion.main
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Header />
      </motion.div>
      <motion.div variants={itemVariants}>
        <HeroSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <CongressSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <StatisticsSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <AboutSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <ServicesSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <DirectiveSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <CoursesSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <TestimonialsSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <ProjectsSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <NewsSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <ContactSection />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Footer />
      </motion.div>
    </motion.main>
  )
}
