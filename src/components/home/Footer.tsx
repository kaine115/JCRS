"use client";
import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Facebook, Send } from "lucide-react";

export default function Footer() {
  const jcrLogo = "https://i.ibb.co/SbMB2rj/Chat-GPT-Image-Dec-30-2025-11-51-22-PM-removebg-preview.png";
  const kmLogo = "https://i.ibb.co/C3JZSmTX/Background-2.png";

  return (
    <footer className="bg-slate-950 text-white pt-24 md:pt-32 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Fixed: items-start on mobile prevents the "shoved right" look */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          
          {/* Contact Details */}
          <div className="flex flex-col items-start">
            <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Contact</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 md:mb-12 uppercase leading-[0.9]">
              Let’s Work <br /> Together
            </h2>
            
            <div className="space-y-4 mb-12">
              <a href="mailto:James@jcr-solutions.com" className="text-xl md:text-2xl font-bold hover:text-blue-500 transition-colors block break-all">
                James@jcr-solutions.com
              </a>
              <a href="tel:+447972842676" className="text-xl md:text-2xl font-bold hover:text-blue-500 transition-colors block">
                +44 7972 842 676
              </a>
            </div>

            <div className="flex gap-6">
              {[
                { Icon: Linkedin, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Facebook, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="text-slate-500 hover:text-white transition-colors">
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 relative overflow-hidden">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                <input type="text" placeholder="NAME" className="w-full bg-transparent border-b border-white/10 pb-4 text-[10px] font-bold tracking-widest focus:border-blue-500 outline-none uppercase placeholder:text-slate-700" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-white/10 pb-4 text-[10px] font-bold tracking-widest focus:border-blue-500 outline-none uppercase placeholder:text-slate-700" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Message</label>
                <textarea rows={3} placeholder="HOW CAN WE HELP?" className="w-full bg-transparent border-b border-white/10 pb-4 text-[10px] font-bold tracking-widest focus:border-blue-500 outline-none uppercase resize-none placeholder:text-slate-700" />
              </div>
              <button className="flex items-center gap-3 text-blue-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors group pt-4">
                Submit Enquiry <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-4">
             <Image src={jcrLogo} alt="JCR" width={24} height={24} className="brightness-0 invert opacity-20" />
             <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">© 2026 JCR SOLUTIONS LTD</span>
           </div>

           <div className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity">
             <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Created by</span>
             <Link href="https://kmdigital.co.uk/" target="_blank">
               <Image 
                 src={kmLogo} 
                 alt="KM Digital" 
                 width={20} 
                 height={15} 
                 className="object-contain brightness-0 invert" 
               />
             </Link>
           </div>
        </div>
      </div>
    </footer>
  );
}