"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight, ShieldCheck, Search, Cpu, Globe, Clock, AlertCircle, Zap } from "lucide-react";
import Link from "next/link";
// Using your central Firebase config
import { db } from "@/lib/firebase"; 
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function JobsPage() {
  const [mandates, setMandates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Real-time listener synced to your Admin collection
    const q = query(collection(db, "mandates"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMandates(jobData);
      setLoading(false);
    }, (err) => {
      console.error("Firebase Sync Error:", err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories = ["All", "Software", "Infrastructure", "Executive", "Data"];

  const filteredJobs = mandates.filter(job => {
    const matchesCategory = filter === "All" || job.category === filter;
    const matchesSearch = 
      job.title?.toLowerCase().includes(search.toLowerCase()) || 
      job.firm?.toLowerCase().includes(search.toLowerCase()) ||
      job.techTags?.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Syncing Roles...</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-6 neural-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Search Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-blue-600"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">FIND YOUR ROLE</p>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-950 uppercase mb-12">
            Active <span className="text-slate-300">Roles.</span>
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 p-4 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Title, Tech, or Firm..."
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-16 pr-6 text-sm font-bold text-slate-950 outline-none focus:border-blue-600 transition-all shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    filter === cat ? "bg-slate-950 text-white shadow-xl" : "bg-white text-slate-500 border border-slate-200 hover:border-blue-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((m, i) => (
              <motion.div 
                layout
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group h-full"
              >
                <Link href={`/jobs/${m.id}`}>
                  <div className="p-10 rounded-[3.5rem] bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.07)] transition-all duration-500 flex flex-col h-full relative overflow-hidden">
                    
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white group-hover:bg-blue-600 transition-all shadow-lg">
                        <ShieldCheck size={20} />
                      </div>
                      <div className="bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[8px] font-black text-emerald-600 uppercase">Active</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap size={10} className="text-blue-600" />
                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{m.category}</span>
                      </div>
                      
                      <h3 className="text-2xl font-black text-slate-950 mb-1 leading-tight uppercase group-hover:text-blue-600 transition-colors">
                        {m.title}
                      </h3>
                      <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-8">{m.firm}</p>
                      
                      <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3 text-xs font-black text-slate-950 uppercase tracking-widest">
                          <MapPin size={14} className="text-blue-600" /> {m.location}
                        </div>
                        <div className="text-[11px] font-mono font-bold text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                           <span className="text-slate-400">RANGE</span>
                           <span className="text-slate-950">£{m.salaryMin}k — £{m.salaryMax}k</span>
                        </div>
                      </div>
                    </div>

                    {/* Tech Tags from Admin */}
                    <div className="pt-8 border-t border-slate-50 flex items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-2 max-w-[70%]">
                        {m.techTags?.slice(0, 2).map((tag: string, idx: number) => (
                          <span key={idx} className="text-[8px] font-black text-slate-300 uppercase">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all transform group-hover:rotate-45">
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
    </main>
  );
}