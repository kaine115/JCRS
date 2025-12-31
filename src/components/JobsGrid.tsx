"use client";
import { motion } from "framer-motion";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";

export default function JobsGrid({ jobs }: { jobs: any[] }) {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-serif mb-12">Open Opportunities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={job.id} 
            className="p-8 border border-neutral-200 hover:border-black transition-all rounded-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-500">{job.sector}</span>
              <h3 className="text-2xl font-medium mt-2 mb-4">{job.title}</h3>
              <div className="flex gap-4 text-sm text-neutral-600 mb-6">
                <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                <span className="flex items-center gap-1"><Briefcase size={14}/> {job.type}</span>
              </div>
            </div>
            <button className="flex items-center gap-2 font-semibold group">
              View Role <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}