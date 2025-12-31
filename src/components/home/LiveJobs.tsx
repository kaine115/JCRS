"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; //
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowUpRight, ShieldCheck, Clock } from "lucide-react";

export default function LiveJobs() {
  const [mandates, setMandates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMandates = async () => {
      try {
        // Querying the real database
        const q = query(collection(db, "mandates"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setMandates(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Database sync failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMandates();
  }, []);

  if (loading) return (
    <div className="py-32 text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 animate-pulse">Synchronizing Mandates...</p>
    </div>
  );

  return (
    <section id="mandates" className="py-32 px-6 bg-slate-50 relative overflow-hidden font-sans">
      {/* Background Vector Motif */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 C30,80 70,80 100,100" stroke="blue" fill="transparent" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Strategic Opportunities</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-950 uppercase leading-[0.85]">
              Live <br /> <span className="text-slate-300 italic">Roles.</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right hidden sm:block">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filling Positions</p>
               <p className="text-[10px] font-black text-slate-950 uppercase italic">UK / EU / USA</p>
             </div>
             <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
                View All <ArrowUpRight size={14} />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mandates.length === 0 ? (
            <div className="col-span-full py-20 border-2 border-dashed border-slate-200 rounded-[3rem] text-center bg-white/50">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Currently screening new mandates...</p>
            </div>
          ) : mandates.map((m, i) => (
            <Link href={`/jobs/${m.id}`} key={m.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 relative group overflow-hidden cursor-pointer h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between mb-8">
                    <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">STATUS</p>
                      <p className="text-[9px] font-black text-emerald-500 uppercase flex items-center justify-end gap-1">
                        <Clock size={10}/> Active Now
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <span className="text-[8px] font-black px-2 py-0.5 bg-slate-50 text-blue-600 rounded border border-slate-100 uppercase tracking-widest mb-3 inline-block">
                      {m.category || "General"}
                    </span>
                    <h3 className="text-2xl font-black text-slate-950 mb-2 leading-tight uppercase group-hover:text-blue-600 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">{m.firm}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-black text-slate-950 uppercase tracking-widest">
                      <MapPin size={14} className="text-blue-600" /> {m.location}
                    </div>
                    <div className="text-[11px] font-mono font-bold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
                      <span>GBP</span>
                      <span className="text-slate-950">£{m.salaryMin} — {m.salaryMax}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2 max-w-[75%]">
                      {m.techStack?.slice(0, 2).map((tag: string, idx: number) => (
                        <span key={idx} className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}