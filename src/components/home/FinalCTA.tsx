"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function FinalCTA() {
  const logoUrl = "https://i.ibb.co/SbMB2rj/Chat-GPT-Image-Dec-30-2025-11-51-22-PM-removebg-preview.png";

  return (
    <section className="px-6 py-12 bg-white">
      <div className="max-w-6xl mx-auto relative rounded-[2rem] overflow-hidden bg-slate-950 p-8 md:p-16 border border-slate-900">
        
        {/* Subtle texture - no massive watermarks */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`, backgroundSize: '32px 32px' }} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Side: Content (3/5 width) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Guarantee</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-[0.95] mb-6">
              The Industry <span className="text-slate-600">Evolved.</span><br />
              The Price <span className="text-blue-600 italic">Should Too.</span>
            </h2>

            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-md mb-8">
              Recruitment used to be slow and manual. Now it’s instant. We’ve automated the overhead so we can provide Tier-1 talent at the lowest cost in the UK.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all duration-300 flex items-center gap-3">
                Talk to an Expert
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Side: The Proof (2/5 width) */}
          <div className="lg:col-span-2">
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <Image src={logoUrl} alt="JCR" width={32} height={32} className="brightness-0 invert opacity-50" />
              </div>

              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">
                "We will always be the <span className="text-blue-500">cheapest option</span> for our clients."
              </h3>

              <div className="space-y-3">
                {[
                  "No Hidden Placement Fees",
                  "Automated Headhunting Savings",
                  "Performance-Based Billing"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <ShieldCheck size={14} className="text-blue-600" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}