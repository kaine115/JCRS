"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Briefcase, Code, Cpu, ArrowRight } from "lucide-react";

const TECH_STACKS = [
  "Full-Stack Engineering",
  "DevOps & Infrastructure",
  "Cloud Architecture",
  "Data Engineering & AI",
  "Cybersecurity Specialists",
] as const;

export default function AboutSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TECH_STACKS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Technical Focus Visual */}
        <div className="lg:col-span-5 relative">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden group"
          >
            <Image 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070" 
              alt="IT Recruitment Excellence"
              fill
              className="object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex flex-col justify-end p-8 md:p-10">
              <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
                Core Specialisms
              </span>
              <div className="h-10 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-lg md:text-xl font-black text-white uppercase tracking-tighter"
                  >
                    {TECH_STACKS[index]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* The IT Recruitment Ledger */}
        <div className="lg:col-span-7 flex flex-col pt-2">
          <header className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-blue-600">
                IT Recruitment Partners
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tighter leading-[0.9] text-slate-950 uppercase">
              Scale Your <br />
              <span className="text-slate-300 italic">Technical Edge.</span>
            </h2>
          </header>

          {/* Clean Ledger Grid - No generic template boxes */}
          <div className="flex flex-col border-t border-slate-100 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 py-8 md:py-10 border-b border-slate-100 gap-4 md:gap-8 items-start">
              <div className="md:col-span-4 flex items-center gap-3 text-blue-600">
                <Code size={18} strokeWidth={3} />
                <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-950">Direct Search</h3>
              </div>
              <p className="md:col-span-8 text-slate-500 text-[12px] font-bold uppercase leading-relaxed tracking-tight">
                We don't just post jobs; we headhunt the top 1% of IT talent. Our network includes vetted developers and architects who aren't on the open market.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 py-8 md:py-10 border-b border-slate-100 gap-4 md:gap-8 items-start">
              <div className="md:col-span-4 flex items-center gap-3 text-blue-600">
                <Cpu size={18} strokeWidth={3} />
                <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-950">Technical Vetting</h3>
              </div>
              <p className="md:col-span-8 text-slate-500 text-[12px] font-bold uppercase leading-relaxed tracking-tight">
                Our recruiters speak your language. Every candidate undergoes rigorous technical screening to ensure they have the stack proficiency your project demands.
              </p>
            </div>
          </div>

          {/* IT Performance Metric */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 px-8 md:px-12 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 uppercase leading-none mb-1">Engineered</p>
              <p className="text-[9px] uppercase font-black text-slate-400 tracking-[0.2em]">Talent Solutions for Tech Leaders</p>
            </div>
            <button className="flex items-center gap-4 text-slate-950 hover:text-blue-600 transition-colors font-black text-[11px] uppercase tracking-widest group">
              View Capabilities <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}