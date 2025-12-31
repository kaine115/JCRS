"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, Target, ShieldCheck, Zap } from 'lucide-react';

const strategicPillars = [
  "Executive Search & Leadership",
  "High-Growth Team Scaling",
  "Niche Technical Mandates",
  "Strategic Talent Advisory",
  "Retention & Culture Mapping"
];

export default function AboutSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % strategicPillars.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* LEFT SIDE: The Strategy Visual */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl group">
            <Image 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070" 
              alt="JCR Strategic Recruitment"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            {/* The Strategy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-10">
              <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Strategic Specialism</span>
              <div className="h-14 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-2xl font-black text-white uppercase tracking-tighter leading-tight"
                  >
                    {strategicPillars[index]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Partnership Manifesto */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">The Recruitment Authority</span>
          </div>

          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.8] text-slate-950 uppercase">
            WE ARCHITECT <br />
            <span className="text-slate-300 italic">DOMINANT TEAMS.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600">
                <Target size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Precision Search</span>
              </div>
              <p className="text-slate-600 text-sm font-bold leading-relaxed uppercase tracking-tight">
                Beyond the CV. We execute precision-based headhunting for technical roles where standard recruitment fails. Our network is built on years of trust at the highest level.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-600">
                <ShieldCheck size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Mandate Integrity</span>
              </div>
              <p className="text-slate-600 text-sm font-bold leading-relaxed uppercase tracking-tight">
                We operate as an extension of your board. Every placement is a strategic move designed to strengthen your technical culture and long-term delivery capabilities.
              </p>
            </div>

            {/* Metrics Row */}
            <div className="pt-8 border-t border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Briefcase size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Client Success</span>
              </div>
              <p className="text-4xl font-black text-slate-950 tracking-tighter uppercase">Bespoke</p>
              <p className="text-[9px] uppercase font-black text-slate-400 tracking-[0.2em] leading-tight">Tailored Engagement <br /> Frameworks</p>
            </div>

            <div className="pt-8 border-t border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Zap size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Global Reach</span>
              </div>
              <p className="text-4xl font-black text-slate-950 tracking-tighter uppercase">Unlimited</p>
              <p className="text-[9px] uppercase font-black text-slate-400 tracking-[0.2em] leading-tight">Cross-Border <br /> Talent Mobility</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}