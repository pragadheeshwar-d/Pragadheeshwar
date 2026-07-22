"use client";

import { motion } from "framer-motion";
import { timeline, whyHireMe, education, skills } from "@/data/content";
import { CheckCircle } from "lucide-react";

export function Timeline() {
  return (
    <section id="timeline" className="py-24 px-6 relative scroll-mt-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-2/ rounded-full blur-[120px] -z-10" />
      <div className="container mx-auto max-w-6xl">

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">Education</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-1 to-accent-2 mx-auto mt-4 mb-12 rounded-full" />
          <div className="relative">
            {/* Horizontal Line for Desktop (Bottom) */}
            <div className="hidden lg:block absolute bottom-0 left-[16%] right-[16%] h-1 bg-gradient-to-r from-violet-500 to-sky-400 opacity-30 rounded-full" />
            
            {/* Vertical Line for Mobile/Tablet */}
            <div className="lg:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-1 to-accent-2 opacity-30" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 pb-0 lg:pb-12">
              {education.map((item, i) => (
                <div key={item.institution} className="relative pl-14 lg:pl-0 h-full">
                  {/* Desktop Dot & Stem (Bottom) */}
                  <div className="hidden lg:block absolute -bottom-[50px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-violet-400 border-2 border-[#0f111a] shadow-[0_0_12px_rgba(139,92,246,0.8)] z-10" />
                  <div className="hidden lg:block absolute -bottom-[45px] left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-t from-violet-400 to-transparent opacity-40" />

                  {/* Mobile Dot */}
                  <div className="lg:hidden absolute left-[22.5px] top-6 w-3 h-3 rounded-full bg-sky-400 border-2 border-[#0f111a] shadow-[0_0_8px_rgba(56,189,248,0.6)] z-10" />

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="glass-card p-6 flex flex-col h-full hover:border-violet-400/40 group relative z-10"
                  >
                    <div className="mb-4">
                      <span className="text-xs text-accent-1 font-medium bg-accent-1/ px-3 py-1 rounded-full">{item.duration}</span>
                    </div>
                    <h4 className="text-foreground font-bold text-lg mb-3 group-hover:text-violet-400 transition-colors">{item.institution}</h4>
                    <p className="text-muted text-sm leading-relaxed flex-1">{item.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>


        {/* Journey Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">My Journey</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-1 to-accent-2 mx-auto mt-4 mb-16 rounded-full" />
          
          <div className="relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-0 left-[10%] right-[10%] h-1 bg-gradient-to-r from-accent-1 to-accent-2 opacity-30 rounded-full" />
            
            {/* Vertical Line for Mobile/Tablet */}
            <div className="lg:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-1 to-accent-2 opacity-30" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 pt-0 lg:pt-12">
              {timeline.map((item, i) => (
                <div key={item.year} className="relative pl-14 lg:pl-0">
                  {/* Desktop Dot & Stem */}
                  <div className="hidden lg:block absolute -top-[50px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-sky-400 border-2 border-[#0f111a] shadow-[0_0_12px_rgba(56,189,248,0.8)] z-10" />
                  <div className="hidden lg:block absolute -top-[45px] left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-sky-400 to-transparent opacity-40" />

                  {/* Mobile Dot */}
                  <div className="lg:hidden absolute left-[22.5px] top-6 w-3 h-3 rounded-full bg-sky-400 border-2 border-[#0f111a] shadow-[0_0_8px_rgba(56,189,248,0.6)] z-10" />

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="glass-card p-5 h-full flex flex-col text-left lg:text-center hover:border-accent-1/ group"
                  >
                    <div className="text-xl lg:text-lg xl:text-xl font-black text-gradient mb-1 whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">{item.year}</div>
                    <h4 className="text-foreground font-bold text-sm lg:text-base mb-2 group-hover:text-accent-1 transition-colors leading-tight">{item.title}</h4>
                    <p className="text-muted text-xs lg:text-sm leading-relaxed flex-1">{item.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        {/* Skills Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">My Skills</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-1 to-accent-2 mx-auto mt-4 mb-12 rounded-full" />
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { title: "Programming Languages", icon: "💻", items: skills.programming, delay: 0 },
              { title: "Web Development", icon: "🌐", items: skills.web, delay: 0.1 },
              { title: "Database", icon: "🗄️", items: skills.database, delay: 0.2 },
              { title: "Tools & Platforms", icon: "🛠️", items: skills.tools, delay: 0.3 },
              { title: "Core Concepts", icon: "🧠", items: skills.coreConcepts, delay: 0.4 },
              { title: "AI & Emerging Technologies", icon: "🤖", items: skills.ai, delay: 0.5 },
            ].map((cat) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: cat.delay }}
                className="glass-card p-6 sm:p-8 hover:border-violet-500/40 group transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent-1 transition-colors">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: cat.delay + i * 0.05 }}
                      className="px-4 py-2 bg-card hover:bg-background/80 border border-border/50 hover:border-accent-1/ rounded-xl text-foreground hover:text-foreground text-sm font-semibold transition-all cursor-default shadow-sm hover:shadow-sky-500/10"
                    >
                      {item.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Hire Me */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">Why Hire Me?</h2>
          <p className="text-muted text-center mb-3 max-w-xl mx-auto">What sets me apart from the rest</p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-1 to-accent-2 mx-auto mt-4 mb-10 rounded-full" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whyHireMe.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.04, y: -3 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-green-400/50 hover:bg-green-400/5 transition-all"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-foreground font-medium text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
