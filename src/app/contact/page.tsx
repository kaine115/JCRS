"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, Phone, Mail, Globe, ArrowUpRight, 
  Clock, UserCheck, Target, ShieldCheck, 
  MapPin, Cpu, CheckCircle2, MessageSquare 
} from "lucide-react";
import Footer from "@/components/home/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const performanceStats = [
    { label: "Response Time", value: "24h", icon: <Clock size={14}/>, detail: "Initial Inquiry" },
    { label: "Shortlist Delivery", value: "72h", icon: <Target size={14}/>, detail: "Average Turnaround" },
    { label: "Hiring Cycle", value: "21d", icon: <UserCheck size={14}/>, detail: "Average Placement" },
  ];

  const protocols = [
    { step: "01", title: "Consultation", desc: "Detailed analysis of your technical and cultural requirements." },
    { step: "02", title: "Market Mapping", desc: "Identifying top-tier talent across global technical hubs." },
    { step: "03", title: "Selection", desc: "Rigorous technical vetting and competency assessment." },
    { step: "04", title: "Placement", desc: "Managing the offer process and successful onboarding." }
  ];

  return (
    <>
      <main className="min-h-screen bg-white pt-44 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <header className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-blue-600"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">Contact Us</p>
            </div>
            <h1 className="text-[clamp(3.5rem,10vw,8.5rem)] font-black tracking-tighter text-slate-950 uppercase leading-[0.8] mb-12">
              Start a <br />
              <span className="text-slate-200 italic">Conversation.</span>
            </h1>
            <p className="max-w-xl text-slate-500 font-bold text-[13px] leading-relaxed uppercase tracking-tight">
              Partner with us to secure the technical leadership and engineering talent your business requires. Our team operates with professional discretion across all searches.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 border-y border-slate-100 py-16">
            {performanceStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-start">
                <div className="flex items-center gap-3 text-blue-600 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">{stat.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="text-5xl font-black text-slate-950 tracking-tighter mb-2">{stat.value}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-40">
            {/* Left Column: Direct Contact & Process */}
            <div className="lg:col-span-5 space-y-12">
              <div className="bg-slate-950 p-10 md:p-12 rounded-[2.5rem] text-white relative overflow-hidden">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-12 block">Direct Contact</span>
                <div className="space-y-12 relative z-10">
                  <div className="group block">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Email</p>
                    <a href="mailto:James@jcr-solutions.com" className="text-xl md:text-2xl font-black hover:text-blue-500 transition-colors uppercase">James@jcr-solutions.com</a>
                  </div>
                  <div className="group block">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Phone</p>
                    <a href="tel:+447972842676" className="text-2xl font-black hover:text-blue-500 transition-colors">+44 (0) 7972 842 676</a>
                  </div>
                </div>
              </div>

              <div className="p-10 border border-slate-100 rounded-[2.5rem] bg-slate-50">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10 italic">Our Process</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {protocols.map((p) => (
                    <div key={p.step}>
                      <p className="text-blue-600 font-mono text-[10px] font-black mb-2">{p.step}</p>
                      <p className="text-slate-950 font-black text-[11px] uppercase tracking-widest mb-1">{p.title}</p>
                      <p className="text-slate-400 font-bold text-[9px] uppercase leading-tight">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7 bg-white p-2 md:p-10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-6">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Full Name</label>
                      <input required type="text" className="w-full bg-transparent text-slate-950 font-bold text-sm outline-none" placeholder="Your Name" />
                    </div>
                    <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-6">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Work Email</label>
                      <input required type="email" className="w-full bg-transparent text-slate-950 font-bold text-sm outline-none" placeholder="email@company.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-6">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Service Type</label>
                      <select className="w-full bg-transparent text-slate-950 font-bold text-sm outline-none appearance-none cursor-pointer">
                        <option>Permanent Hiring</option>
                        <option>Executive Search</option>
                        <option>Contract Solutions</option>
                        <option>Advisory</option>
                      </select>
                    </div>
                    <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-6">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Inquiry Type</label>
                      <select className="w-full bg-transparent text-slate-950 font-bold text-sm outline-none appearance-none cursor-pointer">
                        <option>General Inquiry</option>
                        <option>Urgent Requirement</option>
                        <option>Confidential Search</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-b border-slate-200 focus-within:border-blue-600 transition-colors pb-6">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 block">How can we help?</label>
                    <textarea required rows={4} className="w-full bg-transparent text-slate-950 font-bold text-sm outline-none resize-none" placeholder="Describe your requirements..." />
                  </div>

                  <button type="submit" className="w-full md:w-auto bg-slate-950 text-white px-16 py-8 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-6 hover:bg-blue-600 transition-all group shadow-2xl">
                    Send Message <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              ) : (
                <div className="h-full min-h-[500px] flex items-center justify-center border border-slate-100 rounded-[3rem] p-12 text-center bg-slate-50/50">
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-4xl font-black text-slate-950 uppercase mb-4 tracking-tighter">Message Received.</h3>
                    <p className="text-slate-500 font-bold text-sm mb-10 max-w-sm mx-auto uppercase tracking-tight">Thank you for reaching out. A member of our team will respond to your inquiry within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="text-blue-600 font-black text-[10px] uppercase tracking-widest border-b-2 border-blue-600 pb-1">Send another message</button>
                  </motion.div>
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