"use client";
import { motion } from "framer-motion";
import { Globe, Server, Code, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export default function GlobalReach() {
  const quadrants = [
    { title: "UK / EU / US Markets", icon: <Globe size={18} />, detail: "Transatlantic mandate execution across London, Berlin, and New York." },
    { title: "Infrastructure Scaling", icon: <Server size={18} />, detail: "Specialist sourcing for Cloud Architects and Platform Reliability Leads." },
    { title: "Full-Stack Authority", icon: <Code size={18} />, detail: "Comprehensive talent mapping from Kernel-level to Reactive Frontends." },
    { title: "HFT & Low Latency", icon: <Zap size={18} />, detail: "Elite C++ and FPGA placement for Tier-1 Quant and Trading institutions." },
  ];

  return (
    <section id="global" className="py-32 px-6 bg-[#fafafa] relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Strategic Footprint</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-950 uppercase mb-8 leading-[0.85]">
            Global <br /> <span className="text-slate-300">Technical</span> <br /> Placement.
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed mb-12">
            JCR Solutions operates as a bespoke conduit for technical excellence. We don't just "fill roles"—we engineer high-performance teams for the world's most demanding technology environments.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-200 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl">
            {quadrants.map((q, i) => (
              <div key={i} className="p-10 border-slate-100 border-b md:border-b-0 md:even:border-l hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/5 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {q.icon}
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-950">{q.title}</h3>
                </div>
                <p className="text-slate-400 text-xs font-bold leading-relaxed">{q.detail}</p>
              </div>
            ))}
          </div>

          {/* THE BLUE BADGE - Replaces the small image */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="mt-8 p-8 rounded-[2.5rem] bg-blue-600 text-white shadow-2xl shadow-blue-500/30 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                <ShieldCheck size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">Mandate Status</p>
                <p className="text-lg font-black uppercase tracking-tight">Active Coverage: 24/7 UK & US</p>
              </div>
            </div>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}