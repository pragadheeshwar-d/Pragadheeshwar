import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Pragadheeshwar D — AI Engineer and Python developer passionate about Voice AI, NLP, and full-stack development.",
  openGraph: {
    title: "About | Pragadheeshwar D",
    description:
      "Learn about Pragadheeshwar D — AI Engineer and Python developer passionate about Voice AI, NLP, and full-stack development.",
    url: "https://pragadheesh-portfolio-v2.vercel.app/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Footer />
    </>
  );
}
