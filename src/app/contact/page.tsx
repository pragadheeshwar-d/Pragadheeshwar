import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pragadheeshwar D for collaboration, job opportunities, or just to say hello.",
  openGraph: {
    title: "Contact | Pragadheeshwar D",
    description:
      "Get in touch with Pragadheeshwar D for collaboration, job opportunities, or just to say hello.",
    url: "https://pragadheesh-portfolio-v2.vercel.app/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Contact />
      <Footer />
    </>
  );
}
