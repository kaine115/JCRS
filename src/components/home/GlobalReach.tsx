"use client";

import { motion } from "framer-motion";
import { Globe, Server, Code, Zap, ShieldCheck, ArrowRight } from "lucide-react";

interface ReachService {
  title: string;
  icon: React.ReactNode;
  detail: string;
}

const TECH_PILLARS: ReachService[] = [
  { 
    title: "Global Engineering", 
    icon: <Globe size={18} />, 
    detail: "Cross-border search execution across major tech hubs in the UK, EU, and US." 
  },
  { 
    title: "Systems Infrastructure", 
    icon: <Server size={18} />, 
    detail: "Specialist sourcing for Cloud Architects, Site Reliability, and Platform Engineers." 
  },
  { 
    title: "Full-Stack Development", 
    icon: <Code size={18} />, 
    detail: "Technical talent mapping from low-level systems to modern frontend frameworks." 
  },
  { 
    title: "High-Performance Computing", 
    icon: <Zap size={18} />, 
    detail: "Specialist placement for C++, Rust, and low-latency engineering teams." 
  },
];

export default function GlobalReach() {
  return (
    <section id="global" className="relative py-20 md:py-28 px-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Descriptive Header */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-blue-600" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-blue-600">
              Technical Footprint
            </span>
          </div>
          
          <h2 className="text-[clamp(2.5rem,7vw,4.5rem)] font-black tracking-tighter text-slate-950 uppercase leading-[0.9] mb-10">
            Global <br /> <span className="text-slate-300 italic">Network.</span>
          </h2>
          
          <p className="text-slate-500 text-[12px] font-bold leading-relaxed uppercase tracking-tight max-w-md mb-12">
            Our search capability bridges major tech ecosystems. We operate where the talent lives, 
            connecting high-growth engineering teams with vetted technical experts worldwide.
          </p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="group flex items-center justify-between p-8 rounded-3xl bg-slate-950 text-white shadow-2xl cursor-pointer transition-all hover:bg-blue-600"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60">System Status</p>
                <p className="text-base font-black uppercase tracking-tight">Active Search Coverage</p>
              </div>
            </div>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
          </motion.div>
        </div>

        {/* Quadrant Matrix: Symmetrical Grid */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TECH_PILLARS.map((pillar) => (
              <div 
                key={pillar.title} 
                className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {pillar.icon}
                  </div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-950">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-slate-500 text-[11px] font-bold leading-relaxed uppercase tracking-tight">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}