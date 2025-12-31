"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowUpRight, Circle, Banknote, Tag } from "lucide-react";

export default function LiveJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Logo from Navbar
  const jcrLogo = "https://i.ibb.co/SbMB2rj/Chat-GPT-Image-Dec-30-2025-11-51-22-PM-removebg-preview.png";

  useEffect(() => {
    async function fetchJobs() {
      try {
        const q = query(
          collection(db, "mandates"), 
          orderBy("createdAt", "desc"),
          limit(6)
        );
        const snap = await getDocs(q);
        setJobs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (loading) return (
    <div className="py-32 text-center flex flex-col items-center justify-center">
      <div className="relative w-12 h-12 mb-4 animate-pulse">
        <Image src={jcrLogo} alt="Loading..." fill className="object-contain" />
      </div>
      <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">Syncing Live Roles</p>
    </div>
  );

  return (
    <section id="jobs" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <div className="max-w-xl text-left">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <Circle size={8} className="fill-blue-600 text-blue-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Active Roles</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-950 uppercase leading-[0.9] md:leading-[0.85]">
              Live <br /> <span className="text-slate-300">Openings.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-[10px] md:text-[11px] font-bold uppercase tracking-widest max-w-[280px] leading-relaxed md:border-l md:border-slate-100 md:pl-8">
            The latest high-impact engineering and leadership opportunities.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {jobs.map((j, idx) => (
              <motion.div
                key={j.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <Link href={`/jobs/${j.id}`} className="group block h-full">
                  <div className="bg-[#fafafa] border border-slate-100 p-8 rounded-[2.5rem] hover:bg-white hover:shadow-2xl transition-all duration-500 h-full flex flex-col relative">
                    
                    {/* Header: Logo & Work Arrangement */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-2.5 transition-all duration-500 group-hover:border-blue-100 group-hover:shadow-sm">
                        <Image 
                          src={jcrLogo} 
                          alt="JCR" 
                          width={32} 
                          height={32} 
                          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        {j.isRemote && (
                          <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-widest border border-emerald-100">Remote</span>
                        )}
                        {j.isHybrid && (
                          <span className="text-[8px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-widest border border-blue-100">Hybrid</span>
                        )}
                      </div>
                    </div>

                    {/* Job Title & Firm */}
                    <div className="mb-4">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 block">
                        {j.firm}
                      </span>
                      <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                        {j.title}
                      </h3>
                    </div>

                    {/* Location Info */}
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                      <MapPin size={12} className="text-blue-600" />
                      {j.location}
                    </div>

                    {/* Description Section */}
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed mb-8 line-clamp-3">
                      {j.description || "Leading technical strategy and execution for high-growth engineering teams."}
                    </p>
                    
                    {/* Salary Visualization */}
                    <div className="mt-auto mb-6">
                      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm transition-all group-hover:border-blue-50">
                         <div className="flex items-center gap-2">
                           <Banknote size={14} className="text-blue-600" />
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Salary</span>
                         </div>
                         <span className="text-sm font-black text-slate-950 tracking-tighter">
                           £{j.salaryMin}k — £{j.salaryMax}k
                         </span>
                      </div>
                    </div>

                    {/* Footer: Tags & Explore */}
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {j.techStack?.slice(0, 2).map((tag: string, i: number) => (
                          <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[8px] font-black text-slate-600 uppercase tracking-widest">
                            {tag}
                          </div>
                        ))}
                      </div>
                      
                      <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:bg-blue-600 transition-all shadow-lg transform group-hover:translate-x-1">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}