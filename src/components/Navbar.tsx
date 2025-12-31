"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const logoUrl = "https://i.ibb.co/SbMB2rj/Chat-GPT-Image-Dec-30-2025-11-51-22-PM-removebg-preview.png";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Roles", href: "/jobs" },
  ];

  return (
    <nav className="fixed top-8 left-0 right-0 z-[100] px-6">
      <div className="max-w-fit mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            relative flex items-center gap-8 px-6 py-3 rounded-full transition-all duration-500
            ${scrolled 
              ? "bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]" 
              : "bg-white/10 backdrop-blur-md border border-white/5 shadow-xl"
            }
          `}
        >
          {/* Logo - Replaced Text with your Image Link */}
          <Link href="/" className="flex items-center mr-2">
            <div className="relative w-10 h-10 overflow-hidden">
              <Image 
                src={logoUrl} 
                alt="JCR Group" 
                fill 
                className={`object-contain transition-all duration-500 ${scrolled ? "brightness-0 invert" : ""}`}
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
                  pathname === link.href 
                    ? "text-blue-500" 
                    : scrolled ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-950"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <Link href="/contact" className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all group">
            Contact <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${scrolled ? "text-white" : "text-slate-950"}`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-24 left-6 right-6 bg-slate-950 rounded-[2rem] p-8 border border-white/10 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-black text-white uppercase tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white p-4 rounded-xl text-center font-black uppercase tracking-widest text-xs"
              >
                Contact Today
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}