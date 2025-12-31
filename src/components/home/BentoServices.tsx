"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Zap, Users, 
  Briefcase, Globe, ChevronDown 
} from "lucide-react";
import Image from "next/image";

interface ServiceMandate {
  title: string;
  icon: React.ReactNode;
  span: string;
  theme: string;
  description: string;
  isLogo?: boolean;
}

export default function BentoServices() {
  const [isExpanded, setIsExpanded] = useState(false);
  const logoUrl = "https://i.ibb.co/SbMB2rj/Chat-GPT-Image-Dec-30-2025-11-51-22-PM-removebg-preview.png";

  const SERVICE_REGISTRY: ServiceMandate[] = [
    { title: "Permanent Placement", icon: <Users />, span: "lg:col-span-2", theme: "bg-blue-600", description: "Strategic technical leadership and specialist engineering integration." },
    { title: "Contract Staffing", icon: <Zap />, span: "col-span-1", theme: "bg-slate-800", description: "Rapid scaling for mission-critical project delivery." },
    { title: "Executive Search", icon: <Search />, span: "col-span-1", theme: "bg-slate-900", description: "Retained search for C-Suite and VP-level technical talent." },
    { title: "IT Augmentation", icon: <Briefcase />, span: "lg:col-span-2", theme: "bg-slate-900", description: "Elite contributors embedded directly into your development lifecycle." },
    { title: "Technical Vetting", icon: null, isLogo: true, span: "col-span-1", theme: "bg-slate-800", description: "Deep-dive architectural evaluations and rigorous code assessment." },
    { title: "Managed Services", icon: <Globe />, span: "col-span-1", theme: "bg-slate-800", description: "Comprehensive ownership of end-to-end technical work packages." },
  ];

  const visibleItems = useMemo(() => isExpanded ? SERVICE_REGISTRY : SERVICE_REGISTRY.slice(0, 6), [isExpanded, SERVICE_REGISTRY]);

  return (
    <section id="expertise" className="py-24 md:py-32 px-6 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12">
          <div className="max-w-2xl">
            <span className="inline-block mb-4 md:mb-6 text-blue-500 font-black text-[10px] uppercase tracking-[0.5em]">Scope of Authority</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.9] md:leading-none">
              Technical <br /> <span className="text-slate-800 italic">SERVICES.</span>
            </h2>
          </div>
          
          <div className="hidden md:block border-l border-white/10 pl-8 h-20 flex items-end">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[240px] leading-relaxed">
              Architecting technical teams for the 2026 digital landscape.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((service, idx) => (
              <motion.div 
                key={service.title}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className={`relative group ${service.span} min-h-[280px] md:min-h-[320px] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] ${service.theme} border border-white/5 overflow-hidden transition-all duration-500 cursor-default hover:bg-white/5`}
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white transition-all duration-700 group-hover:bg-white group-hover:text-slate-950 ${idx === 0 ? 'group-hover:rotate-3' : 'group-hover:rotate-6'}`}>
                    {service.isLogo ? (
                      <div className="relative w-8 h-8 group-hover:invert transition-all">
                        <Image src={logoUrl} alt="JCR" fill className="object-contain" />
                      </div>
                    ) : (
                      React.cloneElement(service.icon as React.ReactElement, { size: 24 })
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl md:text-lg font-black text-white uppercase tracking-tight mb-3 md:mb-4">{service.title}</h3>
                    <p className="text-white/40 text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!isExpanded && SERVICE_REGISTRY.length > 6 && (
          <footer className="mt-12 md:mt-16 flex justify-center">
            <button 
              onClick={() => setIsExpanded(true)}
              className="group flex flex-col items-center gap-4 md:gap-6 text-white/40 hover:text-blue-500 transition-colors"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Show all services</span>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-500">
                <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
              </div>
            </button>
          </footer>
        )}
      </div>
    </section>
  );
}