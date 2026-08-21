import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse projects built by Pragadheeshwar D — Voice AI agents, DSA visualizers, resume analyzers, solution generators, and more.",
  openGraph: {
    title: "Projects | Pragadheeshwar D",
    description:
      "Browse projects built by Pragadheeshwar D — Voice AI agents, DSA visualizers, resume analyzers, solution generators, and more.",
    url: "https://pragadheesh-portfolio-v2.vercel.app/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Projects />
      <Footer />
    </>
  );
}
