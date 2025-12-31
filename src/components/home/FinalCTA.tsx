"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function FinalCTA() {
  const logoUrl = "https://i.ibb.co/SbMB2rj/Chat-GPT-Image-Dec-30-2025-11-51-22-PM-removebg-preview.png";

  return (
    <section className="px-6 py-16 bg-white">
      {/* Reduced max-width and height (py-20 instead of py-32) */}
      <div className="max-w-6xl mx-auto relative rounded-[2.5rem] overflow-hidden bg-slate-950 p-12 md:py-20 md:px-16 text-center text-white shadow-2xl">
        
        {/* Ultra-subtle Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden">
          <div className="relative w-[80%] h-[80%] -rotate-12">
            <Image src={logoUrl} alt="" fill className="object-contain" />
          </div>
        </div>
        
        <div className="relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-[0.4em] mb-8 inline-block text-blue-500"
          >
            GARANTEES
          </motion.span>
          
          {/* Shrunk from text-8xl to text-6xl */}
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase leading-[0.9]">
            We'll Always Be the <br /> 
            <span className="text-slate-500">Cheapest Option</span>
          </h2>
          
          {/* Smaller, more contained paragraph */}
          <p className="text-slate-400 max-w-lg mx-auto mb-10 text-sm font-medium leading-relaxed">
            We feel that the recruitment industry has gone a little crazy. The recruitment industry used to operate very differently, where adverts and headhunting were significantly more difficult prior to the internet with regards to both time and cost. Now, everything has changed, except the price, and that needs to change.
          </p>
          
          <div className="flex justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all flex items-center gap-3 group shadow-xl">
              SPEAK TO US TODAY 
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}