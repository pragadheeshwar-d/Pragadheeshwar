"use client";

import { motion } from "framer-motion";
import { certificates } from "@/data/content";
import { ExternalLink, Download, Award } from "lucide-react";

export function Certificates() {
  return (
    <section id="certificates" className="py-16 px-6 relative scroll-mt-16">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-2/ rounded-full blur-[120px] -z-10" />
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Certifications</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Credentials that validate my expertise</p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-1 to-accent-2 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card p-4 flex flex-col gap-3 group cursor-default hover:border-accent-1/"
            >
              <div className={`w-10 h-10 rounded-xl bg-background/80 flex items-center justify-center ${cert.color}`}>
                <Award className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground font-semibold text-sm mb-1 group-hover:text-accent-1 transition-colors leading-snug">{cert.title}</h4>
                <p className={`text-xs font-medium mb-2 ${cert.color}`}>{cert.issuer}</p>
                <p className="text-muted text-xs leading-relaxed">{cert.desc}</p>
              </div>
              <div className="flex gap-2 mt-auto pt-3 border-t border-border/50">
                <a href={cert.viewUrl || "#"} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-medium text-foreground hover:text-foreground bg-card hover:bg-accent-1/ hover:border-accent-1/ border border-transparent rounded-lg transition-all">
                  <ExternalLink className="w-3 h-3" /> View
                </a>
                <a href={cert.downloadUrl || "#"} download className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-medium text-foreground hover:text-foreground bg-card hover:bg-accent-2/ hover:border-violet-500/30 border border-transparent rounded-lg transition-all">
                  <Download className="w-3 h-3" /> Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
