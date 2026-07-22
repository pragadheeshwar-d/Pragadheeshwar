"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { CodingProfile } from "@/components/sections/CodingProfile";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export type PageKey = "home" | "about" | "skills" | "codingProfile" | "projects" | "timeline" | "certificates" | "contact";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function Home() {
  const [activePage, setActivePage] = useState<PageKey>("home");

  const renderPage = () => {
    switch (activePage) {
      case "home":    return <Hero onNavigate={setActivePage} />;
      case "about":   return <About />;
      case "skills":  return <Skills />;
      case "codingProfile": return <CodingProfile />;
      case "projects": return <Projects />;
      case "timeline": return <Timeline />;
      case "certificates": return <Certificates />;
      case "contact": return <Contact />;
      default:        return <Hero onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-y-auto pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="min-h-[calc(100vh-4rem)]"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      {activePage !== "home" && <Footer />}
    </div>
  );
}
