import type { Metadata } from "next";
import { CodingProfile } from "@/components/sections/CodingProfile";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Coding Profile",
  description:
    "View Pragadheeshwar D's competitive programming profiles on LeetCode, Codeforces, and other platforms — ratings, streaks, and problem-solving stats.",
  openGraph: {
    title: "Coding Profile | Pragadheeshwar D",
    description:
      "View Pragadheeshwar D's competitive programming profiles on LeetCode, Codeforces, and other platforms — ratings, streaks, and problem-solving stats.",
    url: "https://pragadheesh-portfolio-v2.vercel.app/coding-profile",
  },
};

export default function CodingProfilePage() {
  return (
    <>
      <CodingProfile />
      <Footer />
    </>
  );
}
