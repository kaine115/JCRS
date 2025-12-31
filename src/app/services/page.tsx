"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/home/Footer";

const services = [
  { 
    title: "Permanent Search", 
    desc: "Precision headhunting for long-term technical leadership and specialist engineering roles within Tier-1 financial and technology firms.",
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
    points: ["48-hour shortlist delivery", "IR35 & Compliance management", "Specialist project scaling"],
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
      <main className="min-h-screen bg-white pt-44 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Minimalist Header */}
          <header className="mb-32">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-blue-600"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Capabilities</p>
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-slate-950 uppercase leading-[0.8] mb-12">
              Strategic <br />
              <span className="text-slate-200">Execution.</span>
            </h1>
            <p className="max-w-xl text-slate-500 font-bold text-lg leading-relaxed">
              We provide a sophisticated approach to technical recruitment, operating as a strategic partner to the world's most ambitious technology teams.
            </p>
          </header>

          {/* Clean List-Based Grid */}
          <div className="space-y-0">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group border-t border-slate-100 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start hover:bg-slate-50/50 transition-colors px-4 -mx-4 rounded-3xl"
              >
                {/* Reference Number */}
                <div className="lg:col-span-1">
                  <span className="text-[11px] font-black text-blue-600 font-mono">[{s.ref}]</span>
                </div>

                {/* Service Title & Description */}
                <div className="lg:col-span-6">
                  <h3 className="text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-6 group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 font-bold text-base leading-relaxed max-w-lg mb-8">
                    {s.desc}
                  </p>
                  
                  {/* Action Link */}
                  <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-950 group/btn">
                    View Service Details 
                    <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform text-blue-600" />
                  </button>
                </div>

                {/* Key Points Column */}
                <div className="lg:col-span-5 space-y-4 pt-2">
                  {s.points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <CheckCircle2 size={14} className="text-slate-200 group-hover:text-blue-600 transition-colors" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            <div className="border-t border-slate-100"></div>
          </div>

          {/* Modern CTA */}
          <section className="mt-40 mb-20 bg-slate-950 rounded-[3rem] p-16 md:p-24 relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 neural-grid"></div>
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
               <div>
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                    Start your <br /> <span className="text-blue-500">Search.</span>
                  </h2>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest italic">Confidentiality guaranteed by default.</p>
               </div>
               <button className="bg-white text-slate-950 px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap">
                 Start Today
               </button>
             </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}