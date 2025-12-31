"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ShieldCheck, Target, Zap, Globe, ArrowUpRight, 
  UserCheck, BarChart3, Fingerprint, Search, Award 
} from "lucide-react";
import Footer from "@/components/home/Footer";

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-white pt-44 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* SECTION 1: THE REAL STORY */}
          <section className="relative mb-60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 z-10">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-12 h-[1px] bg-blue-600"></span>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">What we actually do</p>
                  </div>
                  <h1 className="text-7xl md:text-[110px] font-black tracking-tighter text-slate-950 uppercase leading-[0.85] mb-12">
                    Finding the <br /> 
                    <span className="text-slate-200 italic">People</span> <br /> 
                    who build.
                  </h1>
                  <p className="text-xl font-bold text-slate-500 max-w-xl leading-relaxed">
                    JCR Group was started because the standard recruitment model is broken. Most agencies just spam LinkedIn; we actually know the market. We find the engineers and leaders that other firms can't reach, and we get them to the table.
                  </p>
                </motion.div>
              </div>

              {/* IMAGE COMPOSITION */}
              <div className="lg:col-span-5 relative">
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1 }}
                   className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.12)]"
                >
                  <Image 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" 
                    alt="JCR Office" 
                    fill 
                    className="object-cover"
                  />
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 z-20 hidden md:block"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <UserCheck size={24} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Result</p>
                      <p className="text-2xl font-black text-slate-950 uppercase">Candidate <br/> Placed</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SECTION 2: HOW WE WORK (NO BUZZWORDS) */}
          <section className="mb-60">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-16">
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6 italic">The Approach</h2>
                  <h3 className="text-5xl font-black text-slate-950 uppercase tracking-tighter">No Fluff. <br />Just Results.</h3>
                </div>

                <div className="space-y-12">
                  {[
                    { 
                      title: "Direct Headhunting", 
                      desc: "We don't wait for people to apply. We go directly to the top performers in the best firms and pitch them your role.", 
                      icon: <Target size={28} /> 
                    },
                    { 
                      title: "Technical Knowledge", 
                      desc: "We actually understand the tech stacks we hire for. No sending CVs just because they have the right keywords.", 
                      icon: <Zap size={28} /> 
                    },
                    { 
                      title: "Market Intelligence", 
                      desc: "We'll tell you honestly what the market looks like—who's moving, what they're being paid, and how to win them.", 
                      icon: <BarChart3 size={28} /> 
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-2 italic">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 font-bold text-sm leading-relaxed max-w-md">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHY US TERMINAL */}
              <div className="relative">
                 <div className="bg-slate-950 rounded-[4rem] p-16 md:p-20 relative overflow-hidden text-white shadow-2xl">
                    <div className="absolute inset-0 neural-grid opacity-10"></div>
                    <div className="relative z-10">
                       <h4 className="text-5xl font-black uppercase tracking-tighter mb-10 leading-none">Why use <br /> <span className="text-blue-500">JCR Group?</span></h4>
                       <div className="space-y-8">
                         {[
                           { t: "Deep Networks", d: "We have spent years building relationships with the best in the industry.", i: <Fingerprint size={18} /> },
                           { t: "Fast Turnaround", d: "You'll see a shortlist of qualified people in days, not months.", i: <Zap size={18} /> },
                           { t: "Done Right", d: "We handle the headhunting, the vetting, and the offer management.", i: <ShieldCheck size={18} /> }
                         ].map((point, idx) => (
                           <div key={idx} className="flex gap-4 items-start">
                             <div className="text-blue-500 mt-1">{point.i}</div>
                             <div>
                               <p className="text-xs font-black uppercase tracking-widest mb-1">{point.t}</p>
                               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{point.d}</p>
                             </div>
                           </div>
                         ))}
                       </div>
                       <button className="mt-16 w-full py-6 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:border-blue-600 transition-all">
                          Hire your next lead
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="text-center pb-20">
             <h2 className="text-6xl md:text-8xl font-black text-slate-950 uppercase tracking-tighter mb-12">
               Stop Searching. <br /> Start <span className="text-slate-200 italic">Hiring.</span>
             </h2>
             <button className="bg-slate-950 text-white px-16 py-8 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-2xl inline-flex items-center gap-4 group">
               Contact Us <ArrowUpRight size={20} />
             </button>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}