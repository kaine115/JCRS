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

  // Pages that have a white background at the very top
  const isWhitePage = pathname !== "/";

  const logoUrl = "https://i.ibb.co/SbMB2rj/Chat-GPT-Image-Dec-30-2025-11-51-22-PM-removebg-preview.png";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if the navbar should show the "Dark Text / White Bg" style
  const showSolidState = scrolled || isWhitePage;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Roles", href: "/jobs" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        showSolidState 
          ? "py-4 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm" 
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo - Inverts based on background color */}
        <Link href="/" className="flex items-center">
          <div className="relative w-10 h-10 overflow-hidden">
            <Image 
              src={logoUrl} 
              alt="JCR Group" 
              fill 
              className={`object-contain transition-all duration-500 ${
                showSolidState ? "brightness-0" : "brightness-0 invert"
              }`}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                  pathname === link.href 
                    ? "text-blue-600" 
                    : showSolidState ? "text-slate-950/60 hover:text-slate-950" : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${pathname === link.href ? "w-full" : ""}`} />
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <Link 
            href="/contact" 
            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 group shadow-lg ${
              showSolidState 
                ? "bg-slate-950 text-white hover:bg-blue-600 shadow-slate-950/10" 
                : "bg-blue-600 text-white hover:bg-white hover:text-slate-950 shadow-blue-600/20"
            }`}
          >
            Contact Now 
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 transition-colors ${showSolidState ? "text-slate-950" : "text-white"}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-slate-950 border-b border-white/10 p-8 flex flex-col gap-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-black uppercase tracking-tighter transition-colors ${
                    pathname === link.href ? "text-blue-500" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="bg-blue-600 text-white py-5 rounded-2xl text-center font-black uppercase tracking-widest text-xs"
            >
              Contact Today
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}