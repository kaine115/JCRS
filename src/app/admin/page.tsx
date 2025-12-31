"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase"; 
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { 
  Plus, Trash2, LogOut, MapPin, X, ShieldCheck, 
  Briefcase, Zap, Edit3, Save, Layout, Search, Users, ClipboardList,
  Building2, Banknote, History, GraduationCap, Sparkles, Globe, Laptop, Layers
} from "lucide-react";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const [techInput, setTechInput] = useState("");
  const [techTags, setTechTags] = useState<string[]>([]);

  // 10 Key IT Recruitment Sectors
  const sectors = [
    "Software Engineering",
    "Quantitative Trading",
    "Cyber Security",
    "Data Science & AI",
    "Cloud & Infrastructure",
    "DevOps & SRE",
    "Blockchain & Web3",
    "Product Management",
    "Mobile Development",
    "ERP & CRM (SAP/Salesforce)"
  ];

  const [formData, setFormData] = useState({
    title: "", firm: "", location: "", category: sectors[0],
    salaryMin: "", salaryMax: "", bonus: "", equity: "",
    universityReq: "", certifications: "", securityClearance: "None",
    experienceYears: "", description: "", benefits: "",
    employmentType: "Permanent", seniority: "Senior",
    isRemote: false, isHybrid: false
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

  const processTags = (input: string) => {
    const newTags = input
      .split(/[,\n\s]+/)
      .map(tag => tag.trim().toUpperCase())
      .filter(tag => tag.length > 0 && !techTags.includes(tag));
    
    if (newTags.length > 0) {
      setTechTags([...techTags, ...newTags]);
      setTechInput("");
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    processTags(pastedData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData, techStack: techTags, updatedAt: new Date().toISOString() };
      if (editingId) {
        await updateDoc(doc(db, "mandates", editingId), payload);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "mandates"), { ...payload, createdAt: new Date().toISOString() });
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
    setFormData({ 
      title: "", firm: "", location: "", category: sectors[0], 
      salaryMin: "", salaryMax: "", bonus: "", equity: "", 
      universityReq: "", certifications: "", securityClearance: "None", 
      experienceYears: "", description: "", benefits: "",
      employmentType: "Permanent", seniority: "Senior",
      isRemote: false, isHybrid: false
    });
    setTechTags([]);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 font-sans antialiased text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 py-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
              <Briefcase size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Role Management</h1>
              <p className="text-sm text-slate-500 font-medium">Create and manage active hiring roles</p>
            </div>
          </div>
          <button 
            onClick={() => auth.signOut()} 
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            Sign Out <LogOut size={16} />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <h2 className="text-lg font-bold mb-8">Role Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Job Title</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                      required 
                      placeholder="e.g. Lead Software Engineer" 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      value={formData.firm} 
                      onChange={e => setFormData({...formData, firm: e.target.value})} 
                      required 
                      placeholder="Hiring Firm" 
                    />
                  </div>

                  {/* SECTOR CATEGORY SELECT */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Sector / Category</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        {sectors.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <Layers className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" size={16} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Base Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        value={formData.location} 
                        onChange={e => setFormData({...formData, location: e.target.value})} 
                        required 
                        placeholder="e.g. London, UK" 
                      />
                    </div>
                  </div>

                  <div className="flex gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={formData.isRemote}
                        onChange={e => setFormData({...formData, isRemote: e.target.checked})}
                      />
                      <span className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        <Globe size={14} className="text-slate-400" /> Remote
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={formData.isHybrid}
                        onChange={e => setFormData({...formData, isHybrid: e.target.checked})}
                      />
                      <span className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                        <Laptop size={14} className="text-slate-400" /> Hybrid
                      </span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Min Salary (£)</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        value={formData.salaryMin} 
                        onChange={e => setFormData({...formData, salaryMin: e.target.value})} 
                        placeholder="100000" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Max Salary (£)</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        value={formData.salaryMax} 
                        onChange={e => setFormData({...formData, salaryMax: e.target.value})} 
                        placeholder="150000" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Employment Type</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                      value={formData.employmentType} 
                      onChange={e => setFormData({...formData, employmentType: e.target.value})}
                    >
                      <option value="Permanent">Permanent</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Skills / Tech Stack (Paste or Enter)</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {techTags.map((t, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 border border-blue-100">
                        {t} 
                        <X size={12} className="cursor-pointer hover:text-blue-900" onClick={() => setTechTags(techTags.filter((_, idx) => idx !== i))} />
                      </span>
                    ))}
                  </div>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    value={techInput} 
                    onChange={e => setTechInput(e.target.value)}
                    onPaste={handlePaste}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        processTags(techInput);
                      }
                    }}
                    placeholder="Python, React, AWS..." 
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Role Description</label>
                    <textarea 
                      rows={8} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium leading-relaxed focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                      value={formData.description} 
                      onChange={e => setFormData({...formData, description: e.target.value})} 
                      required 
                      placeholder="Describe the role requirements and daily responsibilities..." 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Benefits & Perks</label>
                    <textarea 
                      rows={4} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium leading-relaxed focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                      value={formData.benefits} 
                      onChange={e => setFormData({...formData, benefits: e.target.value})} 
                      placeholder="Bonus, Equity, Healthcare, etc." 
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button 
                    type="submit" 
                    className="flex-1 bg-slate-950 text-white py-4 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                  >
                    {editingId ? 'Update Role' : 'Publish Role'}
                  </button>
                  {editingId && (
                    <button 
                      type="button" 
                      onClick={resetForm} 
                      className="px-8 py-4 border border-slate-200 text-slate-500 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <ClipboardList size={16} /> Active Roles ({jobs.length})
                </h3>
              </div>
              
              <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">{job.firm}</p>
                        <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{job.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 italic">{job.category}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                            <MapPin size={12} /> {job.location}
                          </span>
                          {(job.isRemote || job.isHybrid) && (
                            <span className="text-[10px] font-bold text-emerald-600 uppercase">
                              {job.isRemote ? 'Remote' : 'Hybrid'}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEdit(job)} className="p-2 text-slate-400 hover:text-blue-600 transition-all"><Edit3 size={16}/></button>
                        <button onClick={() => { if(confirm("Delete?")) deleteDoc(doc(db, "mandates", job.id)).then(fetchJobs) }} className="p-2 text-slate-400 hover:text-red-600 transition-all"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}