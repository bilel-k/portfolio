// src/app/certifications/page.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, FileDown, X } from "lucide-react"
import Image from "next/image"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { useLanguage } from "@/components/language-provider"

export default function Certifications() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const { t } = useLanguage()

  const certMeta = [
    { issuer: "LINKEDIN LEARNING",           id: "4cd3c7ea427f4188e01a8789fd5542b67bfcbd07f55733ba648bb11489c0d115", image: "/certificats/linkedin.png", pdf: "/certificats/CertificatDaccomplissement_DevOps Foundations DevSecOps (1).pdf" },
    { issuer: "FORTINET",                   id: "7185383506BK", image: "/certificats/fund-cybersecurity.png",          pdf: "/certificats/Fortinet Certified Fundamentals in Cybersecurity.pdf" },
    { issuer: "CISCO NETWORKING ACADEMY",   id: "—",           image: "/certificats/hackerethic.png",                 pdf: "/certificats/Ethical_Hacker_certificate_bilel-kaoulala-satom-ch_c781f950-f995-492a-b2d0-793206c67e16.pdf" },
    { issuer: "CISCO NETWORKING ACADEMY",   id: "—",           image: "/certificats/introduction_to_cybersecurity.png",pdf: "/certificats/Introduction_to_Cybersecurity_certificate_bilel-kaoulala-satom-ch_08e1f6c8-451f-4a1c-b482-b4792d898678.pdf" },
  ]

  const certifications = t.certifications.items.map((item, i) => ({ ...item, ...certMeta[i] }))

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemAnim = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 max-w-[1440px] relative overflow-hidden">
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
        className="mb-20 md:text-center relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-6">{t.certifications.title}<span className="gradient-text-animated">.</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
          {t.certifications.subtitle}
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid gap-6">
        {certifications.map((cert, index) => (
           <motion.div variants={itemAnim} key={index}>
            <SpotlightCard
              onClick={() => setSelectedPdf(cert.pdf)}
              className="w-full text-left group flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-8 md:items-center border rounded-[2rem] glass-panel card-hover hover:shadow-2xl relative overflow-hidden cursor-pointer"
            >
              
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src={cert.image} 
                  alt={cert.title} 
                  fill 
                  className="object-contain p-2"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-muted-foreground font-semibold mb-4 tracking-wide uppercase text-sm">{cert.issuer}</p>
                
                <div className="flex flex-wrap gap-3 text-sm font-medium">
                  <div className="inline-flex items-center px-3 py-1 bg-secondary rounded-lg text-secondary-foreground">
                    <span className="opacity-70 mr-2">{t.certifications.issued}:</span> {cert.date}
                  </div>
                  {cert.expires && (
                    <div className="inline-flex items-center px-3 py-1 bg-secondary rounded-lg text-secondary-foreground">
                      <span className="opacity-70 mr-2">{t.certifications.expires}:</span> {cert.expires}
                    </div>
                  )}
                  {cert.id !== "—" && (
                    <div className="inline-flex items-center px-3 py-1 bg-muted/50 border rounded-lg text-muted-foreground font-mono">
                      <span className="opacity-70 mr-2">ID:</span> {cert.id}
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden md:flex ml-auto pl-6 flex-col items-center gap-2 opacity-50 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-500 ease-out">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <FileDown className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-primary">{t.certifications.viewPdf}</span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedPdf(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[80vh] sm:h-[85vh] bg-card border shadow-2xl rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                <h3 className="font-semibold px-2">{t.certifications.pdfViewer}</h3>
                <button
                  onClick={() => setSelectedPdf(null)}
                  className="p-2 bg-background hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 w-full bg-muted/10">
                <iframe
                  src={`${selectedPdf}#toolbar=0`}
                  className="w-full h-full border-none"
                  title="PDF Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

