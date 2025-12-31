"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { 
  MapPin, ShieldCheck, GraduationCap, 
  ArrowLeft, Award, Briefcase, ChevronRight,
  Clock, CheckCircle2, Zap
} from "lucide-react";
import Footer from "@/components/home/Footer";

export default function JobDetails() {
  const { id } = useParams();
  const [role, setRole] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 animate-pulse">Loading Briefing...</div>
    </div>
  );

  if (!role) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Position filled or no longer active</p>
        <button onClick={() => router.push('/jobs')} className="text-blue-600 font-black uppercase text-[10px] tracking-widest border-b border-blue-600">Back to Board</button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Refined Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => router.back()} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-all">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Search
          </button>
          <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">JCR Group Mandate Briefing</div>
        </div>
      </nav>

      <div className="pt-44 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header: Architectural & Clean */}
        <header className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-10 h-[1px] bg-blue-600"></span>
            <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] italic">{role.category}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-slate-950 mb-10">
            {role.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-12">
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400">
              <Briefcase size={16} className="text-blue-600" /> {role.firm}
            </div>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400">
              <MapPin size={16} className="text-blue-600" /> {role.location}
            </div>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-emerald-600">
              <CheckCircle2 size={16} /> Accepting Applications
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-20">
            
            <section className="space-y-8">
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">The Role</h2>
              <div className="text-slate-600 text-lg leading-relaxed font-medium whitespace-pre-wrap max-w-2xl">
                {role.description}
              </div>
            </section>

            <section className="space-y-10 pt-16 border-t border-slate-100">
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">Key Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {role.techStack?.map((tag: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-600 transition-colors">
                    <Zap size={16} className="text-blue-600" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-900">{tag}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: Floating Package Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              
              {/* Requirements Dossier */}
              <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">Mandate Details</h3>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <GraduationCap className="text-blue-600 shrink-0" size={20} />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Education</p>
                      <p className="text-xs font-black uppercase text-slate-950 tracking-tight">{role.universityReq || "Degree Required"}</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <ShieldCheck className="text-blue-600 shrink-0" size={20} />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Vetting</p>
                      <p className="text-xs font-black uppercase text-slate-950 tracking-tight">{role.securityClearance || "Standard Background Check"}</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <Clock className="text-blue-600 shrink-0" size={20} />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                      <p className="text-xs font-black uppercase text-slate-950 tracking-tight">{role.experienceYears || "Industry Expert"} Level</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package & Apply */}
              <div className="bg-slate-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 space-y-10">
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Total Compensation</p>
                    <p className="text-5xl font-black tracking-tighter">£{role.salaryMin} — {role.salaryMax}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[8px] font-black text-slate-500 uppercase mb-2">Bonus Structure</p>
                      <p className="text-[10px] font-black uppercase tracking-widest">{role.bonus || "Performance-led"}</p>
                    </div>
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[8px] font-black text-slate-500 uppercase mb-2">Equity/Options</p>
                      <p className="text-[10px] font-black uppercase tracking-widest">{role.equity || "Available"}</p>
                    </div>
                  </div>

                  <button className="w-full py-7 bg-blue-600 hover:bg-white hover:text-slate-950 rounded-2xl font-black uppercase text-xs tracking-[0.3em] transition-all flex items-center justify-center gap-4">
                    Contact regarding role <ArrowLeft className="rotate-180" size={18} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}