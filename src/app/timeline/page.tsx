import type { Metadata } from "next";
import { Timeline } from "@/components/sections/Timeline";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "A chronological journey through Pragadheeshwar D's academic milestones, internships, work experience, and key career achievements.",
  openGraph: {
    title: "Timeline | Pragadheeshwar D",
    description:
      "A chronological journey through Pragadheeshwar D's academic milestones, internships, work experience, and key career achievements.",
    url: "https://pragadheesh-portfolio-v2.vercel.app/timeline",
  },
};

export default function TimelinePage() {
  return (
    <>
      <Timeline />
      <Footer />
    </>
  );
}
