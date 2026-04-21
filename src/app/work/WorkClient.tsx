"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, Users, Terminal, Sparkles,
  ChevronRight, ArrowRight
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as any }
};

export default function WorkClient({ studies }: { studies: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(studies.map(s => s.category)))];

  const filteredStudies = studies.filter(s => 
    selectedCategory === "All" || s.category === selectedCategory
  );

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#050505] overflow-hidden">
        {/* Geometric Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
             style={{ 
               backgroundImage: `linear-gradient(to right, #ffffff0a 1px, transparent 1px), 
                                 linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)`,
               backgroundSize: '80px 80px' 
             }} />
             
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00BAFF]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00BAFF]/3 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeUp}>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00BAFF] block mb-8">
              Case Studies
            </span>
            <h1 className="text-[clamp(32px,10vw,120px)] font-black leading-[0.85] tracking-[-0.05em] text-white mb-10">
              Proof in the
              <br />
              <span className="text-white/10">Performance.</span>
            </h1>
            <p className="max-w-xl mx-auto text-[17px] md:text-[19px] text-white/40 leading-relaxed font-medium">
              We don&apos;t just build features; we solve business problems. Explore how we&apos;ve helped our clients scale with high-performance software and bespoke design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[80px] z-30 bg-white/80 backdrop-blur-xl border-y border-black/[0.05] py-8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all duration-500 border ${
                  selectedCategory === cat
                    ? "bg-[#00BAFF] border-[#00BAFF] text-white shadow-[0_0_30px_rgba(0,186,255,0.3)]"
                    : "border-black/10 text-black/40 hover:border-black/20 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-32 relative bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="space-y-24">
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study, i) => (
                <motion.div
                  key={study.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a href={`/work/${study.slug}`} className="group block relative rounded-[48px] overflow-hidden bg-white border border-black/[0.05] hover:border-[#00BAFF]/40 transition-all duration-1000 shadow-sm hover:shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Image Section */}
                      <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-black/5">
                        <img 
                          src={study.image || "/work.png"} 
                          alt={study.title} 
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
                      </div>

                      {/* Content Section */}
                      <div className="p-10 lg:p-20 relative z-10 flex flex-col justify-center bg-white">
                        <div className="flex items-center gap-4 mb-8">
                          <span className="px-4 py-1.5 rounded-xl bg-black/5 border border-black/10 text-[10px] font-black uppercase tracking-widest text-black/40">
                            {study.category}
                          </span>
                          <div className="w-1 h-1 rounded-full bg-black/10" />
                          <span className="text-[10px] font-bold text-black/20 uppercase tracking-widest">{study.client}</span>
                        </div>

                        <h3 className="text-4xl lg:text-[56px] font-black text-black leading-[1.1] tracking-tight mb-8 group-hover:text-[#00BAFF] transition-colors duration-500">
                          {study.title}
                        </h3>
                        
                        <p className="text-black/40 text-[18px] lg:text-[20px] leading-relaxed mb-12 max-w-xl">
                          {study.desc}
                        </p>

                        <div className="grid grid-cols-2 gap-10 mb-12">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/20">
                              <Terminal size={14} className="text-[#00BAFF]" /> Tech Stack
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {study.stack.slice(0, 3).map((t: string) => (
                                <span key={t} className="text-[13px] font-bold text-black/60">{t}</span>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/20">
                              <Sparkles size={14} className="text-[#00BAFF]" /> Impact
                            </div>
                            <div className="text-[13px] font-bold text-[#00BAFF] leading-relaxed">
                              {study.results[0]}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-black group-hover:gap-4 transition-all duration-300">
                          View Full Case Study <ArrowRight size={20} className="text-[#00BAFF]" />
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredStudies.length === 0 && (
            <div className="py-40 text-center">
              <h2 className="text-4xl font-black text-black/10 mb-4">No Projects Found</h2>
              <p className="text-black/40 font-medium">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-24 bg-[#050505] px-6 relative overflow-hidden text-center border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ 
               backgroundImage: `linear-gradient(to right, #ffffff0a 1px, transparent 1px), 
                                 linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)`,
               backgroundSize: '40px 40px' 
             }} />
             
        {/* Bottom Blue Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[200px] bg-gradient-to-t from-[#00BAFF]/10 to-transparent blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00BAFF]/20 to-transparent" />
        <motion.div {...fadeUp} className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00BAFF] block mb-6">
            Success Stories
          </span>
          <h2 className="text-[clamp(28px,7vw,56px)] font-black text-white leading-[0.9] tracking-[-0.05em] mb-12">
            Your project could
            <br />
            be our next win.
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="/start"
              className="px-12 py-5 bg-[#00BAFF] text-black font-black uppercase tracking-widest text-[11px] rounded-full hover:bg-white hover:scale-105 transition-all duration-500 shadow-[0_0_50px_rgba(0,186,255,0.3)]"
            >
              Start a Project
            </a>
            <a 
              href="/about"
              className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              Meet the Team <ChevronRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
