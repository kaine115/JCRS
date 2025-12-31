"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion"; // THIS WAS MISSING
import { Lock, Mail, ArrowRight, ShieldAlert, Fingerprint } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const logoUrl = "https://i.ibb.co/SbMB2rj/Chat-GPT-Image-Dec-30-2025-11-51-22-PM-removebg-preview.png";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      setError("Invalid Access Credentials.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-[0.03] -z-10" />
      
      <div className="w-full max-w-[440px]">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="relative w-16 h-16 mb-8">
            <Image src={logoUrl} alt="JCR Group" fill className="object-contain" priority />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-950 mb-3">
            Management <br />
            <span className="text-slate-200 italic text-3xl">Access Portal</span>
          </h1>
          <div className="h-[1px] w-12 bg-blue-600 mx-auto mb-4" />
        </div>

        <div className="bg-white border border-slate-100 p-10 md:p-12 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.04)] relative">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Work Email</label>
              <div className="relative border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-2">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  type="email" 
                  placeholder="admin@jcr-solutions.com" 
                  className="w-full bg-transparent py-2 pl-8 pr-4 text-sm font-bold text-slate-950 outline-none placeholder:text-slate-200 uppercase tracking-widest"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Security Key</label>
              <div className="relative border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-2">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-transparent py-2 pl-8 pr-4 text-sm font-bold text-slate-950 outline-none placeholder:text-slate-200 tracking-[0.5em]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-red-500 bg-red-50/50 p-4 rounded-2xl border border-red-100"
              >
                <ShieldAlert size={14} />
                <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
              </motion.div>
            )}

            <button 
              disabled={loading}
              type="submit" 
              className="w-full py-6 bg-slate-950 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-blue-600 transition-all flex items-center justify-center gap-4 group disabled:opacity-50 shadow-xl shadow-slate-950/10"
            >
              {loading ? "Authenticating..." : "Sign into JCR Group"} 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-blue-500" />
            </button>
          </form>

          <div className="absolute -top-6 -right-6 w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-200 shadow-sm">
            <Fingerprint size={20} />
          </div>
        </div>
      </div>
    </main>
  );
}