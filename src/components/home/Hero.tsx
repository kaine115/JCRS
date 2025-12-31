"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MessageSquare, ShieldCheck } from "lucide-react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-auto md:min-h-screen flex items-start overflow-hidden bg-slate-950 pt-16 md:pt-24 pb-[75px]">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[index]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-start text-left">
          

          {/* Title - Downscaled to 11vw for mobile safety */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11vw] md:text-[10rem] font-black tracking-tighter text-white uppercase leading-[0.9] md:leading-[0.8] mb-10 md:mb-12"
          >
            Elite <br />
            <span className="text-blue-600">Engineering</span> <br />
            <span className="text-slate-500 italic">Network.</span>
          </motion.h1>

          <div className="w-full border-t border-white/10" />

          {/* Action Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full flex flex-col md:flex-row items-start gap-6 md:gap-16 mt-6 md:mt-8"
          >
            <button className="bg-blue-600 text-white w-full md:w-auto px-10 py-6 md:px-12 md:py-7 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all duration-300 flex items-center justify-center gap-4">
              Hire Elite Talent <ArrowUpRight size={20} />
            </button>
            
            <button className="group flex items-center gap-5 text-white p-2">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-500 transition-all">
                <MessageSquare size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] whitespace-nowrap">Partner With Us</span>
                <span className="text-[8px] md:text-[9px] text-slate-500 uppercase font-bold tracking-widest whitespace-nowrap">Client Enquiries</span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}