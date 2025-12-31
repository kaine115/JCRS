"use client";

import React from "react";
import { MessageSquare, ArrowRight } from "lucide-react";

export default function StatsBar() {
  return (
    /* mt-16 and pb-[75px] maintain the strict vertical rhythm required for the site layout */
    <div className="mt-16 pb-[75px] w-full max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-stretch justify-between bg-slate-950 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
        
        {/* Business Inquiry Side */}
        <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
          <div className="flex items-center gap-2 mb-4 text-blue-500">
            <MessageSquare size={14} />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Client Services</span>
          </div>
          
          {/* text-[8vw] used here to ensure the longer sentence doesn't break mobile bounds */}
          <p className="text-[8vw] md:text-5xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-4">
            Are you a business <br /> 
            <span className="text-blue-600">looking for top talent?</span>
          </p>
          
          <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] leading-tight">
            Reach out to our specialist team today <br /> to scale your engineering capacity.
          </p>
        </div>

        {/* Action Side: Contact Trigger */}
        <div className="flex items-center justify-center p-8 md:p-12 bg-white/5 group cursor-pointer hover:bg-blue-600 transition-all duration-500">
          <button className="flex flex-col items-start gap-2 w-full md:w-auto">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50">Get Started</span>
            <div className="flex items-center justify-between w-full gap-12 text-white">
              <span className="text-xl font-black uppercase tracking-tight whitespace-nowrap">Contact Now</span>
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-500" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
}