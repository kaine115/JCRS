"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight, Mail, Briefcase, Cpu } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070"
];

export default function Hero() {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000); // 10 seconds for professional calm
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden neural-grid">
      {/* Background Architectural Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            src={heroImages[imgIndex]}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-[100px] font-black tracking-tighter leading-[0.85] text-slate-950 mb-8 uppercase"
          >
            Vetted <br />
            <span className="text-slate-400">Intelligence.</span> <br />
            Precise Hires.
          </motion.h1>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-5"
          >
            <button className="bg-slate-950 text-white px-10 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-4 group shadow-2xl">
              <Mail size={16} /> Contact Us
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-slate-200 bg-white text-slate-950 px-10 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-4">
              <Briefcase size={16} /> View Vacancies
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}