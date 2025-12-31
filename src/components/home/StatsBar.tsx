"use client";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value }: { value: number }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 80 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        (ref.current as HTMLElement).textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function StatsBar() {
  const stats = [
    { label: 'Engineering Mandates', value: 1200, suffix: '+' },
    { label: 'Verification Accuracy', value: 99, suffix: '%' },
    { label: 'Success Rate', value: 94, suffix: '%' },
    { label: 'Years Experience', value: 15, suffix: 'yr' },
  ];

  return (
    <section className="bg-slate-950 py-24 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-2">
              <Counter value={stat.value} />{stat.suffix}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}