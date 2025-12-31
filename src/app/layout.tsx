import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // Added Space Grotesk
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space',
});

export const metadata: Metadata = {
  title: "JCR Solutions | Precision Technical Recruitment",
  description: "Bespoke recruitment solutions for Tier-1 Quant, FinTech, and Engineering mandates.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-white text-slate-950 antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}