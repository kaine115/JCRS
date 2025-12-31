"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Users, ShieldCheck, BarChart3, Briefcase, UserPlus, Globe, TrendingUp, Fingerprint, ChevronDown } from "lucide-react";

const allServices = [
  { title: "Permanent Placement", icon: <Users />, size: "lg:col-span-2", color: "bg-blue-600", desc: "Long-term technical leadership and specialist engineering hires." },
  { title: "Contract Staffing", icon: <Zap />, size: "col-span-1", color: "bg-slate-800", desc: "Agile scaling for critical project sprints." },
  { title: "Executive Search", icon: <Search />, size: "col-span-1", color: "bg-slate-900", desc: "C-Suite and VP-level technical headhunting." },
  { title: "IT Staff Augmentation", icon: <Briefcase />, size: "lg:col-span-2", color: "bg-slate-900", desc: "Directly embedding elite talent into your dev cycles." },
  { title: "Technical Assessments", icon: <ShieldCheck />, size: "col-span-1", color: "bg-slate-800", desc: "Deep-dive code vetting and architectural evaluations." },
  { title: "Managed Services", icon: <Globe />, size: "col-span-1", color: "bg-slate-800", desc: "End-to-end delivery of technical work packages." },
  { title: "Market Insights", icon: <BarChart3 />, size: "col-span-1", color: "bg-slate-800", desc: "Salary benchmarking and talent availability mapping." },
  { title: "RPO Solutions", icon: <TrendingUp />, size: "col-span-1", color: "bg-slate-800", desc: "Dedicated internal recruitment partnerships." },
];

export default function BentoServices() {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? allServices : allServices.slice(0, 6);

  return (
    <section id="expertise" className="py-32 px-6 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">WE COVER</span>
            <h2 className="font-heading text-5xl md:text-8xl font-bold tracking-tighter text-white uppercase leading-[0.85]">
              SERVICES<br />
            </h2>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] max-w-[200px] leading-relaxed border-l border-white/10 pl-6 mb-2">
            Integrated technical recruitment for the 2026 digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {visibleServices.map((s, i) => (
              <motion.div 
                key={s.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className={`${s.size} p-10 rounded-[2.5rem] ${s.color} border border-white/5 flex flex-col justify-between group min-h-[280px] transition-all cursor-pointer relative overflow-hidden shadow-2xl`}
              >
                {/* DYNAMIC HOVER BACKGROUND: The "Flashlight" Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Secondary Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-slate-950 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                    {s.icon}
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] leading-tight mb-4">{s.title}</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-[180px] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    {s.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="h-[1px] w-12 bg-white/10 group-hover:w-full group-hover:bg-blue-500/50 transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!showAll && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-12 flex justify-center">
            <button 
              onClick={() => setShowAll(true)}
              className="group flex flex-col items-center gap-4 text-white/50 hover:text-blue-500 transition-colors"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Expand Capabilities</span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all">
                <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}