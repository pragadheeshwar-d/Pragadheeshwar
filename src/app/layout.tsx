import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pragadheeshwar D | AI Engineer & Python Developer",
  description: "Portfolio of Pragadheeshwar D, an AI Engineer specializing in Voice AI, Python, NLP, and modern web development.",
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased selection:bg-accent-1/30">
        <ThemeProvider>
          {children}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
