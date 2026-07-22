"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import type { PageKey } from "@/app/page";
import { useTheme } from "@/components/ThemeProvider";

const navLinks: { label: string; key: PageKey }[] = [
  { label: "About",        key: "about" },
  { label: "Coding Profile", key: "codingProfile" },
  { label: "Projects",     key: "projects" },
  { label: "Education & Skills", key: "timeline" },
  { label: "Certificates", key: "certificates" },
  { label: "Contact",      key: "contact" },
];

interface NavbarProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
}

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNav(key: PageKey) {
    onNavigate(key);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg"
            : "bg-background/70 backdrop-blur-md border-b border-border/30"
        }`}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNav("home")}
              className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              Pragadheeshwar
            </button>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activePage === link.key
                        ? "text-accent-1 bg-accent-1/10 border border-accent-1/30"
                        : "text-muted hover:text-foreground hover:bg-card/60"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-muted hover:text-foreground hover:bg-card transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Hire Me button */}
              <button
                onClick={() => handleNav("contact")}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-accent-1 to-accent-2 text-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Hire Me
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-muted hover:text-foreground hover:bg-card transition-colors"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-card transition-colors"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50 md:hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activePage === link.key
                        ? "text-accent-1 bg-accent-1/10"
                        : "text-foreground hover:bg-card"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => handleNav("contact")}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-accent-1 to-accent-2 text-foreground text-center font-semibold"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
