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
              <span className="text-white/60">Performance.</span>
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
      <section className="py-24 relative bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
                  <div className="group flex flex-col h-full bg-white border border-black/[0.05] rounded-[32px] overflow-hidden hover:border-[#00BAFF]/40 transition-all duration-700 shadow-sm hover:shadow-xl">
                    {/* Image Section */}
                    <a href={`/work/${study.slug}`} className="relative aspect-[16/11] overflow-hidden bg-black/5 block">
                      <img 
                        src={study.image || "/work.png"} 
                        alt={study.title} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {study.link && (
                        <a 
                          href={study.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black hover:bg-[#00BAFF] hover:text-white transition-all duration-300 shadow-lg z-20"
                          title="Visit Live Project"
                        >
                          <ArrowUpRight size={18} />
                        </a>
                      )}
                    </a>

                    {/* Content Section */}
                    <div className="p-6 lg:p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="px-2.5 py-1 rounded-lg bg-black/5 border border-black/10 text-[8px] font-black uppercase tracking-widest text-black/40">
                          {study.category}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-black/10" />
                        <span className="text-[8px] font-bold text-black/20 uppercase tracking-widest">{study.client}</span>
                      </div>

                      <a href={`/work/${study.slug}`} className="block group/title">
                        <h3 className="text-xl lg:text-2xl font-black text-black leading-tight mb-4 group-hover/title:text-[#00BAFF] transition-colors duration-500">
                          {study.title}
                        </h3>
                      </a>
                      
                      <p className="text-black/40 text-[14px] leading-relaxed mb-6 line-clamp-2 font-medium">
                        {study.desc}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6 mt-auto border-t border-black/[0.03] pt-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-black/20">
                            <Terminal size={10} className="text-[#00BAFF]" /> Tech
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {study.stack.slice(0, 2).map((t: string) => (
                              <span key={t} className="text-[10px] font-bold text-black/60">{t}</span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-black/20">
                            <Sparkles size={10} className="text-[#00BAFF]" /> Impact
                          </div>
                          <div className="text-[10px] font-bold text-[#00BAFF] leading-tight line-clamp-2">
                            {study.results[0]}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <a 
                          href={`/work/${study.slug}`} 
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black hover:text-[#00BAFF] transition-all duration-300"
                        >
                          View Details <ArrowRight size={14} />
                        </a>
                        
                        {study.link && (
                          <a 
                            href={study.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-black uppercase tracking-widest text-[#00BAFF]/40 hover:text-[#00BAFF] transition-all duration-300"
                          >
                            Live Site
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
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
