import type { Metadata } from "next";
import { Certificates } from "@/components/sections/Certificates";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Certifications earned by Pragadheeshwar D in AI, machine learning, Python, cloud technologies, and software development.",
  openGraph: {
    title: "Certificates | Pragadheeshwar D",
    description:
      "Certifications earned by Pragadheeshwar D in AI, machine learning, Python, cloud technologies, and software development.",
    url: "https://pragadheesh-portfolio-v2.vercel.app/certificates",
  },
};

export default function CertificatesPage() {
  return (
    <>
      <Certificates />
      <Footer />
    </>
  );
}
