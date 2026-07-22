"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export function Button({ children, href, variant = "primary", className, onClick, icon }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300";
  
  const variants = {
    primary: "bg-gradient-to-r from-sky-400 to-violet-500 text-white shadow-lg hover:shadow-sky-500/25 hover:scale-105",
    secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700 shadow-md hover:scale-105 border border-slate-700",
    outline: "border-2 border-sky-400 text-sky-400 hover:bg-sky-400/10 hover:scale-105",
  };

  const Element = href ? "a" : "button";
  
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
      <Element
        href={href}
        onClick={onClick}
        className={twMerge(baseStyles, variants[variant], className)}
      >
        {icon}
        {children}
      </Element>
    </motion.div>
  );
}
