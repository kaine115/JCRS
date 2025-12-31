"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, ArrowUpRight, Search, 
  MessageSquare, RefreshCcw, Globe, Laptop, Banknote
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase"; 
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Footer from "@/components/home/Footer";

export default function JobsPage() {
  const [mandates, setMandates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const logoUrl = "https://i.ibb.co/SbMB2rj/Chat-GPT-Image-Dec-30-2025-11-51-22-PM-removebg-preview.png";

  const categories = [
    "All",
    "Software Engineering",
    "Quantitative Trading",
    "Cyber Security",
    "Data Science & AI",
    "Cloud & Infrastructure",
    "DevOps & SRE",
    "Blockchain & Web3",
    "Product Management",
    "Mobile Development"
  ];

  useEffect(() => {
    const q = query(collection(db, "mandates"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMandates(jobData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredJobs = mandates.filter(job => {
    const matchesCategory = filter === "All" || job.category === filter;
    const matchesSearch = 
      job.title?.toLowerCase().includes(search.toLowerCase()) || 
      job.firm?.toLowerCase().includes(search.toLowerCase()) ||
      job.techStack?.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const resetFilters = () => {
    setSearch("");
    setFilter("All");
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative w-16 h-16 animate-pulse mb-4">
        <Image src={logoUrl} alt="Loading..." fill className="object-contain" />
      </div>
      <p className="uppercase font-black text-[10px] tracking-[0.4em] text-slate-400">Syncing Pipeline...</p>
    </div>
  );

  return (
    <>
      <main className="min-h-screen bg-white pt-44 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <header className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-blue-600" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">Global Mandates</p>
            </div>
            <h1 className="text-[clamp(3.5rem,10vw,8.5rem)] font-black tracking-tighter text-slate-950 uppercase leading-[0.8] mb-16">
              Live <br /> <span className="text-slate-200 italic">Opportunities.</span>
            </h1>
            
            <div className="flex flex-col gap-6 p-4 bg-slate-50 border border-slate-100 rounded-[3rem]">
              <div className="relative">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="FILTER BY STACK, ROLE, OR FIRM..."
                  className="w-full bg-white border border-slate-200 rounded-[2rem] py-8 pl-20 pr-8 text-xs font-black text-slate-950 uppercase tracking-widest outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-4 px-2 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                      filter === cat 
                        ? "bg-slate-950 text-white border-slate-950 shadow-xl shadow-slate-200" 
                        : "bg-white text-slate-400 border-slate-200 hover:border-blue-600 hover:text-blue-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="min-h-[500px]">
            <AnimatePresence mode="popLayout">
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                  {filteredJobs.map((m) => (
                    <motion.div layout key={m.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="group">
                      <Link href={`/jobs/${m.id}`}>
                        <div className="p-10 rounded-[3.5rem] bg-white border border-slate-100 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hover:border-blue-500/30 flex flex-col h-full relative overflow-hidden">
                          
                          <div className="flex justify-between items-start mb-12">
                            {/* Brand Logo Container */}
                            <div className="w-16 h-16 bg-white border border-slate-100 rounded-[1.5rem] flex items-center justify-center p-3 group-hover:border-blue-100 group-hover:shadow-sm transition-all duration-500">
                              <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500">
                                <Image src={logoUrl} alt="JCR" fill className="object-contain" />
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {m.isRemote && (
                                <span className="flex items-center gap-1.5 text-[8px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">
                                  <Globe size={10} /> Remote
                                </span>
                              )}
                              {m.isHybrid && (
                                <span className="flex items-center gap-1.5 text-[8px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-blue-100">
                                  <Laptop size={10} /> Hybrid
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex-1">
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 italic leading-none">{m.category}</p>
                            <h3 className="text-3xl font-black text-slate-950 mb-3 uppercase tracking-tighter leading-[0.85] group-hover:text-blue-600 transition-colors duration-500">
                              {m.title}
                            </h3>
                            <p className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em] mb-12">{m.firm}</p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-12">
                              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Location</p>
                                <div className="flex items-center gap-2 text-slate-950">
                                  <MapPin size={12} className="text-blue-500" />
                                  <p className="text-[11px] font-black uppercase leading-none">{m.location}</p>
                                </div>
                              </div>
                              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Package</p>
                                <div className="flex items-center gap-2 text-slate-950">
                                  <Banknote size={12} className="text-emerald-500" />
                                  <p className="text-[11px] font-black uppercase leading-none">£{m.salaryMax}K+</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex flex-wrap gap-2 max-w-[70%]">
                              {m.techStack?.slice(0, 3).map((tag: string, idx: number) => (
                                <span key={idx} className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">#{tag}</span>
                              ))}
                            </div>
                            <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-950 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500 transform group-hover:rotate-45 shadow-sm">
                              <ArrowUpRight size={20} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-44 text-center">
                  <div className="relative w-32 h-32 mb-10 opacity-10">
                    <Image src={logoUrl} alt="Logo" fill className="object-contain grayscale" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-950 mb-4">Pipeline Empty</h3>
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.3em] mb-12 leading-relaxed">Adjust your search parameters or <br /> clear filters to reset the transmission.</p>
                  <button 
                    onClick={resetFilters}
                    className="flex items-center gap-4 px-12 py-6 bg-slate-950 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-2xl shadow-blue-500/10"
                  >
                    <RefreshCcw size={16} /> Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <section className="mt-32 mb-16">
            <div className="flex flex-col lg:flex-row items-stretch justify-between bg-slate-950 rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl">
              <div className="flex-1 p-16 md:p-24 lg:p-32 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="flex items-center gap-4 mb-10 text-blue-500">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-[0.5em]">Confidential Talent Access</span>
                </div>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[ -0.05em] text-white uppercase leading-[0.8] mb-12">
                  Role not <br /> <span className="text-blue-600 italic">Here?</span>
                </h2>
                <p className="text-sm uppercase font-black text-slate-500 tracking-[0.1em] max-w-lg leading-relaxed">
                  We manage exclusive headhunting mandates that aren't listed publicly. Submit your CV for confidential placement in elite firms.
                </p>
              </div>
              
              <Link href="/contact" className="flex items-center justify-center p-16 md:p-24 bg-white/5 group hover:bg-blue-600 transition-all duration-1000">
                <div className="flex flex-col items-center text-center gap-8 text-white">
                   <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                      <MessageSquare size={32} />
                   </div>
                   <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/50 group-hover:text-white transition-colors block mb-4">Direct Channel</span>
                    <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter block">Send Your CV</span>
                   </div>
                   <ArrowUpRight size={48} className="group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700" />
                </div>
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}