"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, Globe, ArrowUpRight, Clock, UserCheck, Target } from "lucide-react";
import Footer from "@/components/home/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const performanceStats = [
    { label: "Initial Briefing", value: "24h", icon: <Clock size={14}/>, detail: "Response Time" },
    { label: "Shortlist Delivery", value: "72h", icon: <Target size={14}/>, detail: "Avg. Turnaround" },
    { label: "Final Placement", value: "21d", icon: <UserCheck size={14}/>, detail: "Avg. Cycle" },
  ];

  return (
    <>
      <main className="min-h-screen bg-white pt-44 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <header className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-blue-600"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Consultancy Access</p>
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-slate-950 uppercase leading-[0.8] mb-12">
              Secure <br />
              <span className="text-slate-200">Partnership.</span>
            </h1>
          </header>

          {/* Performance Intelligence Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 border-y border-slate-100 py-12">
            {performanceStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  {stat.icon}
                  <span className="text-[9px] font-black uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="text-4xl font-black text-slate-950 tracking-tighter mb-1">{stat.value}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Left: Direct Access */}
            <div className="lg:col-span-4 space-y-16">
              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-8 block">Direct Lines</span>
                <div className="space-y-10">
                  <a href="mailto:James@jcr-solutions.com" className="group block">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Inquiries</p>
                    <p className="text-lg md:text-xl font-black text-slate-950 group-hover:text-blue-600 transition-colors uppercase break-words">James@jcr-solutions.com</p>
                  </a>
                  <a href="tel:+447972842676" className="group block">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Direct Dial</p>
                    <p className="text-2xl font-black text-slate-950 group-hover:text-blue-600 transition-colors">+44 (0) 7972 842 676</p>
                  </a>
                </div>
              </div>

              <div className="px-10">
                <p className="text-xl font-black text-slate-950 uppercase italic mb-2">Global Operations</p>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                  Headquartered in London <br />
                  Serving UK, EU & North America
                </p>
              </div>
            </div>

            {/* Right: The Terminal Form */}
            <div className="lg:col-span-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-4">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Name</label>
                      <input required type="text" className="w-full bg-transparent text-slate-950 font-bold text-sm outline-none" placeholder="Full Name" />
                    </div>
                    <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-4">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Company Email</label>
                      <input required type="email" className="w-full bg-transparent text-slate-950 font-bold text-sm outline-none" placeholder="Corporate Address" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-4">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Service Required</label>
                      <select className="w-full bg-transparent text-slate-950 font-bold text-sm outline-none appearance-none cursor-pointer">
                        <option>Permanent Search</option>
                        <option>Executive Headhunting</option>
                        <option>Interim Solutions</option>
                        <option>Market Intelligence</option>
                      </select>
                    </div>
                    <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-4">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Priority Level</label>
                      <select className="w-full bg-transparent text-slate-950 font-bold text-sm outline-none appearance-none cursor-pointer">
                        <option>Standard Search</option>
                        <option>High Priority / Urgent</option>
                        <option>Confidential / Discreet</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-4">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Brief Description of Mandate</label>
                    <textarea required rows={3} className="w-full bg-transparent text-slate-950 font-bold text-sm outline-none resize-none" placeholder="Outline your requirements..." />
                  </div>

                  <button type="submit" className="bg-slate-950 text-white px-12 py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-blue-600 transition-all group">
                    Send <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] p-20 text-center">
                  <div>
                    <h3 className="text-3xl font-black text-slate-950 uppercase mb-4 tracking-tighter">Transmission Successful.</h3>
                    <p className="text-slate-500 font-bold text-sm mb-8">We will reach out to the provided email within the next 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="text-blue-600 font-black text-[10px] uppercase tracking-widest">Send another briefing</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}