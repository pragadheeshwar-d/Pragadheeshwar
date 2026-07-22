"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/content";

function SkillCategory({ title, items, icon, delay }: { title: string; items: { name: string; level: number }[]; icon: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass-card p-6 sm:p-8 hover:border-violet-500/40 group transition-colors"
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">{icon}</span>
        <h3 className="text-xl font-bold text-foreground group-hover:text-accent-1 transition-colors">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + i * 0.05 }}
            className="px-4 py-2 bg-card hover:bg-background/80 border border-border/50 hover:border-accent-1/ rounded-xl text-foreground hover:text-foreground text-sm font-semibold transition-all cursor-default shadow-sm hover:shadow-sky-500/10"
          >
            {item.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const categories = [
    { title: "Programming", icon: "💻", items: skills.programming, delay: 0 },
    { title: "Web Development", icon: "🌐", items: skills.web, delay: 0.1 },
    { title: "AI & Machine Learning", icon: "🤖", items: skills.ai, delay: 0.2 },
    { title: "Tools & DevOps", icon: "🛠️", items: skills.tools, delay: 0.3 },
  ];

  return (
    <section id="skills" className="py-24 px-6 relative scroll-mt-16">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-1/ rounded-full blur-[100px] -z-10" />
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">My Skills</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Technologies and tools I work with daily</p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-1 to-accent-2 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {categories.map((cat) => (
            <SkillCategory key={cat.title} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
