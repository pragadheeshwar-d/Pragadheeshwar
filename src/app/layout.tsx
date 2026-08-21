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
  metadataBase: new URL("https://pragadheesh-portfolio-v2.vercel.app"),
  title: {
    default: "Pragadheeshwar D | AI Engineer & Python Developer",
    template: "%s | Pragadheeshwar D",
  },
  description:
    "Portfolio of Pragadheeshwar D, an AI Engineer specializing in Voice AI, Python, NLP, and modern web development.",
  keywords: [
    "Pragadheeshwar",
    "AI Engineer",
    "Python Developer",
    "Voice AI",
    "NLP",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: "Pragadheeshwar D" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pragadheesh-portfolio-v2.vercel.app",
    siteName: "Pragadheeshwar D | Portfolio",
    title: "Pragadheeshwar D | AI Engineer & Python Developer",
    description:
      "Portfolio of Pragadheeshwar D, an AI Engineer specializing in Voice AI, Python, NLP, and modern web development.",
    images: [
      {
        url: "/profile-v3.jpg",
        width: 1200,
        height: 630,
        alt: "Pragadheeshwar D — AI Engineer & Python Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pragadheeshwar D | AI Engineer & Python Developer",
    description:
      "Portfolio of Pragadheeshwar D, an AI Engineer specializing in Voice AI, Python, NLP, and modern web development.",
    images: ["/profile-v3.jpg"],
  },
  verification: {
    google: "MyXx7iv5sC_UlmaZfZmEHhzXs7oMxY9RkzN2hcE1R4s",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/sections/Navbar";

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
      <head>
        <meta name="google-site-verification" content="MyXx7iv5sC_UlmaZfZmEHhzXs7oMxY9RkzN2hcE1R4s" />
      </head>
      <body className="min-h-screen font-sans antialiased selection:bg-accent-1/30">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 overflow-x-hidden pt-16">
              {children}
            </main>
          </div>
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
