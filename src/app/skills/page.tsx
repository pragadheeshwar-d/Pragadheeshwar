import type { Metadata } from "next";
import { Skills } from "@/components/sections/Skills";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Explore the technical skills of Pragadheeshwar D — Python, AI/ML, NLP, Voice AI, React, Next.js, and more.",
  openGraph: {
    title: "Skills | Pragadheeshwar D",
    description:
      "Explore the technical skills of Pragadheeshwar D — Python, AI/ML, NLP, Voice AI, React, Next.js, and more.",
    url: "https://pragadheesh-portfolio-v2.vercel.app/skills",
  },
};

export default function SkillsPage() {
  return (
    <>
      <Skills />
      <Footer />
    </>
  );
}
