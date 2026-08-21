"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Download, ExternalLink, Mail } from "lucide-react";
import { personal, projects, certificates, codingStats } from "@/data/content";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// ─── Tech Stack Badges ───────────────────────────────────────────────────────

const techStack = [
  { label: "HTML",                      color: "from-orange-500/20 to-red-500/20",     border: "border-orange-500/40",  text: "text-orange-400", icon: "🌐" },
  { label: "CSS",                       color: "from-blue-500/20 to-indigo-500/20",    border: "border-blue-500/40",    text: "text-blue-400",   icon: "🎨" },
  { label: "JavaScript",               color: "from-yellow-400/20 to-amber-500/20",   border: "border-yellow-400/40",  text: "text-yellow-400", icon: "⚡" },
  { label: "Python",                   color: "from-sky-500/20 to-blue-600/20",       border: "border-sky-500/40",     text: "text-sky-400",    icon: "🐍" },
  { label: "Java",                     color: "from-rose-500/20 to-red-600/20",       border: "border-rose-500/40",    text: "text-rose-400",   icon: "☕" },
  { label: "C++",                      color: "from-violet-500/20 to-purple-600/20",  border: "border-violet-500/40",  text: "text-violet-400", icon: "⚙️" },
  { label: "Flask",                    color: "from-slate-400/20 to-zinc-500/20",     border: "border-slate-400/40",   text: "text-slate-300",  icon: "🧪" },
  { label: "MySQL",                    color: "from-cyan-500/20 to-teal-600/20",      border: "border-cyan-500/40",    text: "text-cyan-400",   icon: "🗄️" },
  { label: "DSA",                      color: "from-emerald-500/20 to-green-600/20",  border: "border-emerald-500/40", text: "text-emerald-400",icon: "🌳" },
  { label: "Git",                      color: "from-orange-600/20 to-red-700/20",     border: "border-orange-600/40",  text: "text-orange-500", icon: "🔀" },
  { label: "GitHub",                   color: "from-zinc-400/20 to-neutral-600/20",   border: "border-zinc-400/40",    text: "text-zinc-300",   icon: "🐙" },
  { label: "VS Code",                  color: "from-blue-600/20 to-sky-500/20",       border: "border-blue-600/40",    text: "text-blue-400",   icon: "💻" },
];

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.55v-1.93c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.18-1.48 3.14-1.17 3.14-1.17.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.15v3.19c0 .3.21.66.8.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.27V1.73C24 .77 23.21 0 22.23 0z"/>
    </svg>
  );
}

export function Hero() {
  const [solvedCount, setSolvedCount] = useState<string | number>(codingStats.totalSolved);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/codolio-stats")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (isMounted && data?.totalQuestions) {
          setSolvedCount(data.totalQuestions + "+");
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="relative w-full pt-12 md:pt-16 lg:pt-16 pb-12 overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-1/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-2/20 rounded-full blur-[120px] -z-10" />

      <div className="container px-6 mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-20">
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[55%] xl:w-[60%] max-w-2xl text-center lg:text-left"
        >
          <h1 className="mb-4 leading-tight">
            <span className="block text-3xl md:text-4xl font-medium text-muted-foreground/80 tracking-tight mb-2">Hi, I'm</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-gradient pb-1">Pragadheeshwar D</span>
          </h1>

          <div className="inline-block px-6 py-2 mb-6 rounded-2xl bg-card border border-border shadow-sm">
            <div className="h-10 md:h-12 text-2xl md:text-4xl font-bold text-foreground flex items-center">
              <TypeAnimation
                sequence={[
                  "AI Engineer",
                  2000,
                  "Full-Stack Developer",
                  2000,
                  "LLM & Voice AI Builder",
                  2000,
                  "Competitive Programmer",
                  2000,
                  "Ethical Hacker",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-accent-1"
              />
            </div>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-5 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Building next-generation intelligence. I bridge the gap between complex algorithms and seamless user experiences through advanced AI systems and full-stack development.
          </p>

          {/* Tech Stack Badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {techStack.map((tech, i) => (
              <motion.span
                key={tech.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + i * 0.06, duration: 0.35 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${tech.color} border ${tech.border} ${tech.text} backdrop-blur-sm hover:scale-105 transition-transform duration-200 cursor-default select-none`}
              >
                <span>{tech.icon}</span>
                <span>{tech.label}</span>
              </motion.span>
            ))}
          </motion.div>

          <motion.div 
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-1 to-accent-2 text-white font-semibold hover:opacity-95 transition-all shadow-[0_0_20px_rgba(67,56,202,0.3)] hover:shadow-[0_0_30px_rgba(13,148,136,0.5)] active:scale-95"
            >
              <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              View Projects
            </Link>
            <a
              href="/assets/resume.pdf"
              className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-accent-1 text-accent-1 font-semibold hover:text-white transition-all duration-300 shadow-sm active:scale-95"
            >
              <span className="absolute inset-0 bg-accent-1 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Download className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
              <span className="relative z-10">Download Resume</span>
            </a>
            <div className="flex gap-4 ml-0 lg:ml-4 mt-4 lg:mt-0">
              <a href={personal.github} target="_blank" rel="noreferrer" className="p-3.5 bg-card border border-border/50 rounded-full hover:bg-accent-1/10 hover:border-accent-1 hover:text-accent-1 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1.5 hover:scale-110">
                <GithubIcon />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="p-3.5 bg-card border border-border/50 rounded-full hover:bg-accent-1/10 hover:border-accent-1 hover:text-accent-1 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1.5 hover:scale-110">
                <LinkedinIcon />
              </a>
              <a href={`mailto:${personal.email}`} className="p-3.5 bg-card border border-border/50 rounded-full hover:bg-accent-1/10 hover:border-accent-1 hover:text-accent-1 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1.5 hover:scale-110">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Stat Strip */}
          <motion.div
            className="mt-8 pt-6 border-t border-border/50 flex flex-wrap justify-center lg:justify-start gap-6 md:gap-10 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-2xl md:text-3xl font-bold text-foreground">{solvedCount}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">Problems Solved</span>
            </div>
            <div className="w-px h-12 bg-border/50 hidden md:block"></div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-2xl md:text-3xl font-bold text-foreground">{projects.length}+</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">Projects Built</span>
            </div>
            <div className="w-px h-12 bg-border/50 hidden md:block"></div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-2xl md:text-3xl font-bold text-foreground">{certificates.length}+</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">Certifications</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[45%] xl:w-[40%] flex justify-center lg:justify-center"
        >
          <div className="relative w-64 md:w-80 lg:w-[380px] aspect-[4/5] max-h-[500px] rounded-[2rem] md:rounded-[3rem] p-1.5 bg-gradient-to-tr from-accent-1 to-accent-2 shadow-2xl shadow-accent-1/20 transform lg:rotate-3 hover:rotate-0 transition-all duration-500 animate-float">
            <div className="relative w-full h-full rounded-[1.8rem] md:rounded-[2.8rem] overflow-hidden border-4 border-background bg-card">
              <Image
                src="/profile-v3.jpg"
                alt="Profile Photo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 380px"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
