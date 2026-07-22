"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/content";
import { ExternalLink, X } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.55v-1.93c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.18-1.48 3.14-1.17 3.14-1.17.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.15v3.19c0 .3.21.66.8.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
    </svg>
  );
}

type Project = typeof projects[0];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-16 px-6 relative scroll-mt-16">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent-1/10 rounded-full blur-[120px] -z-10" />
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">What I've Built</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Real projects. Real impact.</p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-1 to-accent-2 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
              className="glass-card overflow-hidden group flex flex-col cursor-pointer border-transparent hover:border-accent-1/30 transition-all"
            >
              {/* Banner */}
              <div className={`h-32 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                {project.icon.startsWith("/") ? <img src={project.icon} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300" /> : <span className="text-5xl filter drop-shadow-lg transition-transform group-hover:scale-110 duration-300">{project.icon}</span>}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              <div className="p-5 flex flex-col flex-1 text-center items-center justify-center">
                <p className="text-[10px] font-bold text-accent-1 uppercase tracking-wider mb-2">{project.category}</p>
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent-1 transition-colors">
                  {project.title}
                </h3>
                
                {/* Tech Stack Preview */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-auto mb-4">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] px-2 py-1 rounded-md bg-card text-foreground border border-border/50 shadow-sm">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[10px] px-2 py-1 rounded-md bg-card text-muted border border-border/50 shadow-sm">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="flex w-full gap-2 mt-auto pt-4 border-t border-border/30" onClick={(e) => e.stopPropagation()}>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 rounded-lg bg-accent-1/10 hover:bg-accent-1/20 text-accent-1 text-xs font-semibold transition-colors"
                    >
                      View Live
                    </a>
                  ) : (
                    <span className="flex-1 text-center py-2 rounded-lg bg-card border border-border/30 text-muted text-xs font-semibold">
                      No Demo
                    </span>
                  )}
                  {(project as any).githubUrl && (
                    <a
                      href={(project as any).githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 rounded-lg bg-card hover:bg-card/80 border border-border/50 text-foreground text-xs font-semibold transition-colors"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer" 
              onClick={() => setSelectedProject(null)} 
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-foreground transition-colors backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className={`h-48 sm:h-64 bg-gradient-to-br ${selectedProject.color} flex items-center justify-center relative overflow-hidden shrink-0`}>
                {selectedProject.icon.startsWith("/") ? <img src={selectedProject.icon} alt={selectedProject.title} className="w-full h-full object-cover" /> : <span className="text-8xl filter drop-shadow-xl">{selectedProject.icon}</span>}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <span className="text-xs px-3 py-1.5 rounded-full bg-black/40 text-foreground border border-white/20 backdrop-blur-md">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-10">
                <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-foreground text-base sm:text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-8 mb-10">
                  <div>
                    <p className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Key Features
                    </p>
                    <ul className="space-y-3">
                      {selectedProject.features.map((f, fi) => (
                        <li key={fi} className="text-[15px] text-foreground flex items-start gap-3 leading-snug">
                          <span className="text-accent-1 mt-0.5 font-bold">›</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedProject.tech.map((t) => (
                        <span key={t} className="text-sm px-3.5 py-1.5 rounded-xl bg-card text-foreground border border-border/50 shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-border/50">
                  {selectedProject.liveUrl ? (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-1 to-accent-2 text-foreground font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-sky-500/20 transition-all active:scale-95"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Live Project
                    </a>
                  ) : (
                    <span className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-card text-muted font-medium border border-border/50 cursor-not-allowed">
                      Demo Coming Soon
                    </span>
                  )}
                  {(selectedProject as typeof selectedProject & { githubUrl?: string }).githubUrl && (
                    <a
                      href={(selectedProject as typeof selectedProject & { githubUrl?: string }).githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-card text-foreground font-medium border border-border/50 hover:bg-card/80 hover:border-white/30 transition-all active:scale-95"
                    >
                      <GithubIcon className="w-5 h-5" />
                      View on GitHub
                    </a>
                  )}
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 sm:flex-none flex items-center justify-center px-8 py-3.5 rounded-xl bg-transparent text-foreground font-medium border border-border/50 hover:bg-card hover:text-foreground transition-all"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
