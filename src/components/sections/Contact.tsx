"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { personal } from "@/data/content";
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader } from "lucide-react";

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.55v-1.93c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.18-1.48 3.14-1.17 3.14-1.17.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.15v3.19c0 .3.21.66.8.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
    </svg>
  );
}

function CodeforcesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 7.5A1.5 1.5 0 0 1 6 6h2a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 8 18H6a1.5 1.5 0 0 1-1.5-1.5v-9zm6.5-4A1.5 1.5 0 0 1 12.5 2h2A1.5 1.5 0 0 1 16 3.5v13a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 11 16.5v-13zm6.5 7A1.5 1.5 0 0 1 19 9h2a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 21 18h-2a1.5 1.5 0 0 1-1.5-1.5v-6z"/>
    </svg>
  );
}

function CodolioIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
    </svg>
  );
}

function Code360Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://formspree.io/f/mbdpgpkw", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  const developerLinks = [
    { icon: <GithubIcon />, label: "GitHub", href: personal.github, color: "hover:border-white/50" },
  ];

  const socialLinks = [
    { icon: <InstagramIcon />, label: "Instagram", href: personal.instagram, color: "hover:border-pink-500/50" },
    { icon: <FacebookIcon />, label: "Facebook", href: personal.facebook, color: "hover:border-blue-500/50" },
    { icon: <XIcon />, label: "X (Twitter)", href: personal.twitter, color: "hover:border-sky-400/50" },
  ];

  const codingLinks = [
    { icon: <LeetCodeIcon />, label: "LeetCode", href: personal.leetcode, color: "hover:border-orange-400/50" },
    { icon: <span className="text-base font-bold">GFG</span>, label: "GeeksForGeeks", href: personal.gfg, color: "hover:border-green-400/50" },
    { icon: <span className="text-base">🏆</span>, label: "CodeChef", href: personal.codechef, color: "hover:border-yellow-400/50" },
    { icon: <CodeforcesIcon />, label: "Codeforces", href: personal.codeforces, color: "hover:border-blue-400/50" },
    { icon: <CodolioIcon />, label: "Codolio", href: personal.codolio, color: "hover:border-purple-400/50" },
    { icon: <Code360Icon />, label: "Code360", href: personal.code360, color: "hover:border-orange-500/50" },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-accent-1/10 rounded-full blur-[120px] -z-10" />
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Get In Touch</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Have a project or opportunity? I'd love to hear from you.</p>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-1 to-accent-2 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Contact Info</h3>
              <div className="space-y-4">
                {[
                  { icon: <Mail className="w-5 h-5 text-accent-1" />, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                  { icon: <MapPin className="w-5 h-5 text-accent-1" />, label: "Location", value: personal.location, href: "#" },
                ].map(({ icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-accent-1/50">
                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">{icon}</div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
                      <p className="text-foreground font-medium text-sm">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* All Profiles — one line */}
            <div>
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Profiles</h3>
              <div className="flex flex-wrap items-center gap-3">
                {[
                  ...developerLinks,
                  { isSeparator: true },
                  ...socialLinks,
                  { isSeparator: true },
                  ...codingLinks
                ].map((item: any, i) => {
                  if (item.isSeparator) return <span key={`sep-${i}`} className="w-px h-6 bg-border/50 mx-1" />;
                  return (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                      className={`group relative w-10 h-10 flex items-center justify-center rounded-xl glass-card border border-border/50 ${item.color} transition-all hover:scale-110`}
                    >
                      <span className="text-foreground">{item.icon}</span>
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-card border border-border/50 text-[10px] text-foreground rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form — Formspree */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
              <h3 className="text-xl font-bold text-foreground mb-2">Send a Message</h3>

              <div>
                <label className="block text-xs text-muted uppercase tracking-wider mb-1.5">Your Name</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-3 bg-background/60 border border-border/50 rounded-xl text-foreground text-sm placeholder-muted focus:outline-none focus:border-accent-1 transition-colors disabled:opacity-50"
                  placeholder="Pragadheeshwar D"
                />
              </div>

              <div>
                <label className="block text-xs text-muted uppercase tracking-wider mb-1.5">Email Address</label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-3 bg-background/60 border border-border/50 rounded-xl text-foreground text-sm placeholder-muted focus:outline-none focus:border-accent-1 transition-colors disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-xs text-muted uppercase tracking-wider mb-1.5">Message</label>
                <textarea
                  required rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-3 bg-background/60 border border-border/50 rounded-xl text-foreground text-sm placeholder-muted focus:outline-none focus:border-accent-1 transition-colors resize-none disabled:opacity-50"
                  placeholder="Hi Pragadheeshwar, I'd love to talk about..."
                />
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Something went wrong. Please try again or email directly.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-accent-1 to-accent-2 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.35)]"
              >
                {status === "submitting" ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
