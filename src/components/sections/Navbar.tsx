"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

const navLinks: { label: string; path: string }[] = [
  { label: "About",        path: "/about" },
  { label: "Coding Profile", path: "/coding-profile" },
  { label: "Projects",     path: "/projects" },
  { label: "Education & Skills", path: "/timeline" },
  { label: "Certificates", path: "/certificates" },
  { label: "Contact",      path: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleMobileNav() {
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
            <Link
              href="/"
              className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              Pragadheeshwar
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      pathname === link.path
                        ? "text-accent-1 bg-accent-1/10 border border-accent-1/30"
                        : "text-muted hover:text-foreground hover:bg-card/60"
                    }`}
                  >
                    {link.label}
                  </Link>
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
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-accent-1 to-accent-2 text-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Hire Me
              </Link>
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
                  <Link
                    href={link.path}
                    onClick={handleMobileNav}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                      pathname === link.path
                        ? "text-accent-1 bg-accent-1/10"
                        : "text-foreground hover:bg-card"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contact"
                  onClick={handleMobileNav}
                  className="block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-accent-1 to-accent-2 text-foreground text-center font-semibold"
                >
                  Hire Me
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
