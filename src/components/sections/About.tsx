"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/content";
import { Mail, Phone, MapPin } from "lucide-react";

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
      {subtitle && <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>}
      <div className="w-16 h-1 bg-gradient-to-r from-accent-1 to-accent-2 mx-auto mt-4 rounded-full" />
    </motion.div>
  );
}

export function About() {

  return (
    <section id="about" className="py-24 px-6 relative scroll-mt-16">
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent-2/10 rounded-full blur-[100px] -z-10" />
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="About Me" subtitle="Passionate AI Engineer crafting intelligent systems" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-muted leading-relaxed text-base"
          >
            <p>
              I am <span className="text-accent-1 font-semibold">Pragadheeshwar D</span>, a passionate AI Engineer and competitive programmer from Pudukkottai, India, currently pursuing my degree at <span className="text-foreground font-medium">Karpagam College of Engineering, Coimbatore</span>.
            </p>
            <p>
              With deep expertise in Python, C++, and modern web technologies, I engineer intelligent systems that scale — from Voice AI assistants to LLM-powered applications. My background in advanced competitive programming fuels my ability to design optimized, robust algorithms.
            </p>
            <p>
              My journey is fueled by a desire to learn, innovate, and contribute — whether through building applications, securing systems, or sharing knowledge with peers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { icon: <Mail className="w-4 h-4 text-accent-1" />, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
              { icon: <MapPin className="w-4 h-4 text-accent-1" />, label: "Location", value: personal.location, href: "#" },
            ].map(({ icon, label, value, href }) => (
              <a key={label} href={href} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-accent-1/50 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center group-hover:bg-accent-1/20 transition-colors">{icon}</div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
                  <p className="text-foreground font-medium">{value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
