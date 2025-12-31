"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Cpu, MessageSquare } from "lucide-react";
import Footer from "@/components/home/Footer";

const services = [
  { 
    title: "Permanent Search", 
    desc: "Precision headhunting for long-term technical leadership and specialist engineering roles within high-growth technology firms.",
    points: ["Success-based and Retained models", "Cultural alignment vetting", "Global candidate mapping"],
    ref: "01"
  },
  { 
    title: "Executive Search", 
    desc: "Discreet search mandates for C-Suite, VP, and Director-level appointments requiring absolute confidentiality and strategic vetting.",
    points: ["Board-level advisory", "Confidential headhunting", "Leadership assessment"],
    ref: "02"
  },
  { 
    title: "Interim Solutions", 
    desc: "Agile delivery of high-impact contractors for critical project scaling, digital transformation, and interim leadership gaps.",
    points: ["Rapid shortlist delivery", "Compliance management", "Specialist project scaling"],
    ref: "03"
  },
  { 
    title: "Advisory & Insight", 
    desc: "Comprehensive talent mapping, salary benchmarking, and competitor intelligence to inform your long-term hiring strategy.",
    points: ["Market salary auditing", "Competitor talent mapping", "Retention strategy"],
    ref: "04"
  }
];

export default function ServicesPage() {
  return (
    <>
      <main className="min-h-screen bg-white pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Minimalist Header - Aligned with About page */}
          <header className="mb-24 md:mb-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-blue-600" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">Capabilities</p>
            </div>
            <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black tracking-tighter text-slate-950 uppercase leading-[0.85] mb-12">
              Strategic <br />
              <span className="text-slate-300 italic">Execution.</span>
            </h1>
            <p className="max-w-xl text-slate-500 font-bold text-[13px] leading-relaxed uppercase tracking-tight">
              We provide a sophisticated approach to technical recruitment, operating as a strategic partner to the world's most ambitious technology teams.
            </p>
          </header>

          {/* Clean List-Based Grid - Improved Spacing and Responsiveness */}
          <div className="space-y-0">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group border-t border-slate-100 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start hover:bg-slate-50/50 transition-colors px-6 -mx-6 rounded-[2.5rem]"
              >
                {/* Reference Number */}
                <div className="lg:col-span-1 hidden lg:block">
                  <span className="text-[11px] font-black text-blue-600 font-mono">[{s.ref}]</span>
                </div>

                {/* Service Title & Description */}
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-3 lg:hidden mb-4">
                     <span className="text-[10px] font-black text-blue-600 font-mono">[{s.ref}]</span>
                     <div className="h-px w-4 bg-slate-200" />
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black text-slate-950 uppercase tracking-tighter mb-6 group-hover:text-blue-600 transition-colors leading-none">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 font-bold text-[12px] uppercase leading-relaxed tracking-tight max-w-lg mb-8">
                    {s.desc}
                  </p>
                  
                  <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-950 group/btn">
                    Enquire Now 
                    <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform text-blue-600" />
                  </button>
                </div>

                {/* Key Points Column - Terminal Style Typography */}
                <div className="lg:col-span-5 space-y-5 pt-2">
                  {s.points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                         <CheckCircle2 size={12} className="text-blue-600" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            <div className="border-t border-slate-100"></div>
          </div>

          {/* FINAL CTA - Matching StatsBar Aesthetic and About page footer */}
          <section className="mt-32 md:mt-48 mb-20">
            <div className="flex flex-col md:flex-row items-stretch justify-between bg-slate-950 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
              
              {/* Text Side */}
              <div className="flex-1 p-10 md:p-16 border-b md:border-b-0 md:border-r border-white/10">
                <p className="text-[8vw] md:text-5xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-4">
                  Start your <br /> 
                  <span className="text-blue-600 italic">Technical Search.</span>
                </p>
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] leading-tight">
                  Confidentiality guaranteed by default. <br /> Reach out to our team to begin the process.
                </p>
              </div>

              {/* Action Side */}
              <div className="flex items-center justify-center p-10 md:p-16 bg-white/5 group cursor-pointer hover:bg-blue-600 transition-all duration-500">
                <button className="flex flex-col items-start gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Next Step</span>
                  <div className="flex items-center gap-8 text-white">
                    <span className="text-2xl font-black uppercase tracking-tight">Contact Now</span>
                    <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}