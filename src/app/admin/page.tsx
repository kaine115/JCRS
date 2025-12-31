"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase"; 
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { 
  Plus, Trash2, LogOut, MapPin, X, ShieldCheck, 
  Briefcase, Zap, Edit3, Save, Layout, Search, Users, ClipboardList
} from "lucide-react";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const [techInput, setTechInput] = useState("");
  const [techTags, setTechTags] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "", firm: "", location: "", category: "Software",
    salaryMin: "", salaryMax: "", bonus: "", equity: "",
    universityReq: "", certifications: "", securityClearance: "None",
    experienceYears: "", description: ""
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.push("/login");
      else fetchJobs();
    });
    return () => unsubscribe();
  }, [router]);

  const fetchJobs = async () => {
    const q = query(collection(db, "mandates"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    setJobs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "mandates", editingId), { ...formData, techStack: techTags });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "mandates"), { ...formData, techStack: techTags, createdAt: new Date().toISOString() });
      }
      resetForm();
      fetchJobs();
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const startEdit = (job: any) => {
    setEditingId(job.id);
    setFormData({ ...job });
    setTechTags(job.techStack || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: "", firm: "", location: "", category: "Software", salaryMin: "", salaryMax: "", bonus: "", equity: "", universityReq: "", certifications: "", securityClearance: "None", experienceYears: "", description: "" });
    setTechTags([]);
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-blue-600"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">JCR Group Management</p>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-950">
              Active <span className="text-slate-200">Mandates</span>
            </h1>
          </div>
          <button 
            onClick={() => auth.signOut()} 
            className="flex items-center gap-3 px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all"
          >
            End Session <LogOut size={14}/>
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: FORM PANEL */}
          <div className="lg:col-span-8">
            <div className="bg-slate-50/50 rounded-[3rem] border border-slate-100 p-10 md:p-12 shadow-sm">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  {editingId ? <Edit3 size={18}/> : <Plus size={18}/>}
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-slate-950">
                  {editingId ? "Modify Brief" : "Create New Mandate"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* Section: Basic Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-3">
                    <label className="admin-label">Position Title</label>
                    <input type="text" className="admin-input-clean" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required placeholder="e.g. Lead Engineer" />
                  </div>
                  <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-3">
                    <label className="admin-label">Hiring Firm</label>
                    <input type="text" className="admin-input-clean" value={formData.firm} onChange={e => setFormData({...formData, firm: e.target.value})} required placeholder="e.g. Tier-1 FinTech" />
                  </div>
                  <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-3">
                    <label className="admin-label">Location</label>
                    <input type="text" className="admin-input-clean" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required placeholder="e.g. London / Remote" />
                  </div>
                </div>

                {/* Section: Remuneration */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                  <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-3">
                    <label className="admin-label">Min Base (£)</label>
                    <input type="text" className="admin-input-clean" value={formData.salaryMin} onChange={e => setFormData({...formData, salaryMin: e.target.value})} />
                  </div>
                  <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-3">
                    <label className="admin-label">Max Base (£)</label>
                    <input type="text" className="admin-input-clean" value={formData.salaryMax} onChange={e => setFormData({...formData, salaryMax: e.target.value})} />
                  </div>
                  <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-3">
                    <label className="admin-label">Bonus %</label>
                    <input type="text" className="admin-input-clean" value={formData.bonus} onChange={e => setFormData({...formData, bonus: e.target.value})} />
                  </div>
                  <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-3">
                    <label className="admin-label">Equity</label>
                    <input type="text" className="admin-input-clean" value={formData.equity} onChange={e => setFormData({...formData, equity: e.target.value})} />
                  </div>
                </div>

                {/* Section: Technical Stack */}
                <div className="space-y-4">
                  <label className="admin-label">Requirements / Stack (Press Enter)</label>
                  <div className="flex flex-wrap gap-2 min-h-[50px]">
                    {techTags.map((t, i) => (
                      <span key={i} className="bg-slate-950 text-white text-[9px] font-black px-4 py-2 rounded-full flex items-center gap-2 uppercase tracking-widest">
                        {t} <X size={10} className="cursor-pointer hover:text-red-400" onClick={() => setTechTags(techTags.filter((_, idx) => idx !== i))}/>
                      </span>
                    ))}
                    <input 
                      className="flex-1 bg-transparent outline-none text-[11px] font-bold uppercase tracking-widest p-2 border-b border-slate-200 focus:border-blue-600" 
                      value={techInput} 
                      onChange={e => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (techInput.trim() && !techTags.includes(techInput.trim().toUpperCase())) {
                            setTechTags([...techTags, techInput.trim().toUpperCase()]);
                            setTechInput("");
                          }
                        }
                      }}
                      placeholder="Add Tech/Skill..." 
                    />
                  </div>
                </div>

                {/* Section: Full Description */}
                <div className="space-y-4">
                  <label className="admin-label">Full Mandate Briefing</label>
                  <textarea rows={10} className="w-full bg-white border border-slate-200 rounded-[2rem] p-8 text-sm font-medium leading-relaxed outline-none focus:border-blue-600 transition-colors resize-none shadow-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required placeholder="Enter full role details and context..." />
                </div>

                <div className="flex gap-4 pt-6">
                  <button type="submit" className="flex-1 py-6 bg-slate-950 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-950/10">
                    {editingId ? 'Update Live Brief' : 'Publish Mandate'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetForm} className="px-10 py-6 bg-white border border-slate-200 text-slate-400 rounded-[2rem] font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT: INVENTORY LIST */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                  <ClipboardList size={14}/> Live Mandates ({jobs.length})
                </h3>
              </div>
              
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-blue-600 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <h4 className="text-sm font-black uppercase text-slate-950 leading-tight mb-2 tracking-tighter">{job.title}</h4>
                        <div className="flex flex-col gap-1">
                           <div className="flex items-center gap-2">
                              <span className="w-4 h-[1px] bg-blue-600"></span>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{job.firm}</p>
                           </div>
                           <div className="flex items-center gap-1.5 text-slate-300 ml-6">
                              <MapPin size={10} />
                              <p className="text-[9px] font-black uppercase tracking-widest">{job.location || 'N/A'}</p>
                           </div>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEdit(job)} className="p-3 text-slate-400 hover:text-blue-600 transition-colors"><Edit3 size={16}/></button>
                        <button onClick={() => { if(confirm("Permanently delete this mandate?")) deleteDoc(doc(db, "mandates", job.id)).then(fetchJobs) }} className="p-3 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {job.techStack?.slice(0, 4).map((t: string, i: number) => (
                         <span key={i} className="text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-tighter">#{t}</span>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-input-clean { 
          @apply w-full bg-transparent py-2 text-sm font-bold uppercase tracking-widest text-slate-950 outline-none placeholder:text-slate-200;
        }
        .admin-label { 
          @apply text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </main>
  );
}