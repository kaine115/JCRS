"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, ShieldCheck, GraduationCap, 
  ArrowLeft, Briefcase, 
  Clock, Zap, MessageSquare, Cpu, ArrowUpRight,
  Code2, TrendingUp, Lock, BrainCircuit, Cloud, 
  Terminal, Blocks, Box, Smartphone, Settings, Globe, Laptop
} from "lucide-react";
import Footer from "@/components/home/Footer";

export default function JobDetails() {
  const { id } = useParams();
  const [role, setRole] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logoUrl = "https://i.ibb.co/SbMB2rj/Chat-GPT-Image-Dec-30-2025-11-51-22-PM-removebg-preview.png";

  useEffect(() => {
    const fetchRole = async () => {
      const docRef = doc(db, "mandates", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setRole(docSnap.data());
      setLoading(false);
    };
    if (id) fetchRole();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative w-16 h-16 animate-pulse">
        <Image src={logoUrl} alt="Loading..." fill className="object-contain" />
      </div>
      <p className="uppercase font-black text-[9px] tracking-[0.4em] text-slate-400 mt-4">Syncing Role...</p>
    </div>
  );

  if (!role) return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="text-center flex flex-col items-center max-w-md">
        <div className="relative w-24 h-24 mb-10 opacity-10 grayscale">
          <Image src={logoUrl} alt="JCR" fill className="object-contain" />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-950 mb-4">Position Filled</h3>
        <button onClick={() => router.push('/jobs')} className="w-full bg-slate-950 text-white py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all">
          Return to Board
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-2xl border-b border-slate-100 px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => router.push('/jobs')} className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-blue-600 transition-all">
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Board
          </button>
          <div className="relative w-10 h-10">
            <Image src={logoUrl} alt="JCR" fill className="object-contain" />
          </div>
        </div>
      </nav>

      <div className="pt-56 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <header className="mb-24">
          <div className="flex items-center gap-6 mb-10">
            <div className="relative w-20 h-20">
              <Image src={logoUrl} alt="JCR" fill className="object-contain" />
            </div>
          </div>
          
          <h1 className="text-[clamp(3.5rem,8vw,7.5rem)] font-black uppercase tracking-tighter leading-[0.8] text-slate-950 mb-16">
            {role.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-12 pt-12 border-t border-slate-100">
            <div className="flex flex-col gap-2">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Employer</p>
              <div className="flex items-center gap-2 text-slate-950 font-black text-xs uppercase tracking-tight">
                <Briefcase size={14} className="text-blue-600" /> {role.firm}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Location</p>
              <div className="flex items-center gap-3 text-slate-950 font-black text-xs uppercase tracking-tight">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-blue-600" /> {role.location}
                </div>
                {role.isRemote && <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-widest border border-emerald-100 leading-none">Remote</span>}
                {role.isHybrid && <span className="text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-widest border border-blue-100 leading-none">Hybrid</span>}
              </div>
            </div>
            <div className="flex flex-col gap-2 ml-auto">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Status</p>
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-tight">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Role
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7 space-y-32">
            <section>
              <div className="flex items-center gap-6 mb-12">
                <span className="text-[4rem] font-black text-slate-100 leading-none">01</span>
                <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-950 italic">Overview</h2>
              </div>
              <div className="text-slate-500 text-sm font-bold leading-[1.8] uppercase tracking-tight whitespace-pre-wrap max-w-2xl">
                {role.description}
              </div>
            </section>

            <section className="pt-24 border-t border-slate-100">
              <div className="flex items-center gap-6 mb-12">
                <span className="text-[4rem] font-black text-slate-100 leading-none">02</span>
                <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-950 italic">Key Stack</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {role.techStack?.map((tag: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-blue-600 transition-all">
                    <Zap size={16} className="text-blue-600 transition-transform" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">{tag}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-40">
              <div className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="space-y-12 relative z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-6 text-blue-500">
                      <Cpu size={16} />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Structure</span>
                    </div>
                    <p className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
                      £{role.salaryMin}k <span className="text-slate-700 italic">—</span> {role.salaryMax}k
                    </p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Annual Renumeration</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                      <p className="text-[9px] font-black text-slate-500 uppercase mb-3 tracking-widest">Bonus</p>
                      <p className="text-[11px] font-black uppercase tracking-widest text-white">{role.bonus || "Performance"}</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                      <p className="text-[9px] font-black text-slate-500 uppercase mb-3 tracking-widest">Equity</p>
                      <p className="text-[11px] font-black uppercase tracking-widest text-white">{role.equity || "Available"}</p>
                    </div>
                  </div>

                  <button className="w-full py-8 bg-blue-600 hover:bg-white hover:text-slate-950 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.4em] transition-all flex items-center justify-center gap-4 group shadow-xl shadow-blue-600/20">
                    Apply Now <ArrowUpRight size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-40 mb-16">
          <div className="flex flex-col md:flex-row items-stretch justify-between bg-slate-950 rounded-[3rem] overflow-hidden border border-white/5 shadow-xl max-w-5xl mx-auto">
            <div className="flex-1 p-12 md:p-16 border-b md:border-b-0 md:border-r border-white/10">
              <div className="flex items-center gap-3 mb-6 text-blue-500">
                <MessageSquare size={16} />
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Direct Engagement</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none mb-6">
                Consult on <span className="text-blue-600 italic">This Role.</span>
              </h2>
              <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.1em] max-w-sm leading-relaxed">
                Connect with our specialist partners regarding this requirement.
              </p>
            </div>
            
            <Link href="/contact" className="flex items-center justify-center px-12 md:px-20 bg-white/5 group hover:bg-blue-600 transition-all duration-700">
              <div className="flex items-center gap-6 text-white">
                 <span className="text-xl font-black uppercase tracking-tight">Contact Partner</span>
                 <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
              </div>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}