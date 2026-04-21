"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  Globe,
  Smartphone,
  Bot,
  Command,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import BookCallModal from "@/components/BookCallModal";
import { getCaseStudies } from "@/app/actions/case-studies";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */
const CATEGORIES = ["All", "Web", "Mobile", "AI"];

const PROJECTS = [
  {
    id: "vortex",
    title: "Vortex Pay",
    client: "Fintech Startup",
    category: "Web",
    desc: "A high-performance fintech dashboard built for real-time transaction monitoring and asset management.",
    results: ["40% increase in user retention", "Sub-100ms data latency", "Enterprise-grade security"],
    stack: ["Next.js", "TypeScript", "Redis", "Supabase"],
    color: "from-blue-500/20 to-cyan-500/20",
    image: "/work.png", // Will use object-fit to show part of the grid
  },
  {
    id: "luxe",
    title: "Luxe Retail",
    client: "E-commerce Giant",
    category: "Web",
    desc: "A premium headless e-commerce experience with bespoke animations and lightning-fast product filtering.",
    results: ["25% boost in conversion rate", "98 Lighthouse score", "Seamless cross-device checkout"],
    stack: ["React", "Shopify API", "Framer Motion", "Tailwind"],
    color: "from-purple-500/20 to-pink-500/20",
    image: "/work.png",
  },
  {
    id: "aura",
    title: "Aura AI",
    client: "Logistics SaaS",
    category: "AI",
    desc: "Intelligent automation platform that predicts supply chain bottlenecks and optimizes route planning.",
    results: ["$2M saved in operational costs", "95% accuracy in predictions", "Automated 80% of routine tasks"],
    stack: ["Python", "OpenAI", "Node.js", "PostgreSQL"],
    color: "from-emerald-500/20 to-teal-500/20",
    image: "/work.png",
  },
  {
    id: "health",
    title: "HealthSync",
    client: "Digital Health Co.",
    category: "Mobile",
    desc: "Comprehensive wellness app featuring real-time health tracking and personalized AI health coaching.",
    results: ["1M+ active downloads", "4.9 stars on App Store", "Integrated with 15+ wearables"],
    stack: ["React Native", "Firebase", "TensorFlow Lite", "AWS"],
    color: "from-orange-500/20 to-red-500/20",
    image: "/work.png",
  },
];

/* ─── Page ─── */
export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>(PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const res = await getCaseStudies();
      if (res.success && res.data && res.data.length > 0) {
        const mapped = res.data.map(study => ({
          id: study.slug,
          title: study.title,
          client: study.client,
          category: study.category,
          desc: study.desc,
          results: study.results,
          stack: study.stack,
          color: "from-blue-500/20 to-cyan-500/20",
          image: study.image || "/work.png",
        }));
        setProjects(mapped);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  return (
    <main>
      <Navbar />
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden pt-32 pb-20">
        {/* Grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,186,255,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-black uppercase tracking-[0.22em] text-[#00BAFF] mb-6"
          >
            Case Studies
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="text-[clamp(48px,8vw,100px)] font-black leading-[0.9] tracking-[-0.04em] mb-8"
          >
            Proof in the
            <br />
            <span className="text-white/25">Performance.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-[15px] md:text-[17px] text-white/45 max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed px-4 md:px-0"
          >
            We don&apos;t just build features; we solve business problems. 
            Explore how we&apos;ve helped our clients scale with high-performance 
            software and bespoke design.
          </motion.p>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 md:px-6 py-2 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-[#00BAFF] text-white shadow-[0_0_20px_rgba(0,186,255,0.4)]"
                    : "bg-white/[0.05] text-white/40 hover:bg-white/[0.1] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECT GRID
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {loading ? (
              <div className="col-span-full h-40 flex items-center justify-center text-black/50 font-bold">
                Loading case studies...
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease }}
                    className="group"
                  >
                  <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-black/[0.07] bg-[#F7F8FA] transition-all duration-500 hover:border-[#00BAFF]/30 hover:shadow-2xl">
                    {/* Visual Area */}
                    <div className="relative h-64 md:h-80 overflow-hidden bg-black">
                      {/* Diagonal pattern overlay */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-10 pointer-events-none z-10"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(135deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 16px)",
                        }}
                      />
                      {/* Gradient wash */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                      
                      {/* Image - mimicking different projects by shifting background position */}
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        style={{
                          objectPosition: i === 0 ? "top left" : i === 1 ? "top right" : i === 2 ? "bottom left" : "bottom right"
                        }}
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-6 left-6 z-20">
                        <span className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/90">
                          {p.category}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform duration-500">
                          <ExternalLink size={24} className="text-black" />
                        </div>
                      </div>
                    </div>

                    {/* Info Area */}
                    <div className="p-6 md:p-10 bg-white relative">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="flex-1">
                          <span className="text-[10px] md:text-[11px] font-bold text-[#00BAFF] uppercase tracking-widest block mb-2">
                            {p.client}
                          </span>
                          <h3 className="text-2xl md:text-[32px] font-black text-black tracking-tighter leading-tight mb-4 group-hover:text-[#00BAFF] transition-colors duration-300">
                            {p.title}
                          </h3>
                          <p className="text-[14px] md:text-[15px] text-black/55 leading-relaxed mb-6 md:mb-8 max-w-md">
                            {p.desc}
                          </p>

                          {/* Results */}
                          <div className="space-y-3 mb-8">
                            {p.results.map((res: string) => (
                              <div key={res} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-[#00BAFF]/10 flex items-center justify-center flex-shrink-0">
                                  <Command size={10} className="text-[#00BAFF]" />
                                </div>
                                <span className="text-[13px] font-bold text-black/70">{res}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="w-full md:w-40 flex flex-wrap md:flex-col gap-2">
                          <span className="text-[10px] font-black text-black/30 uppercase tracking-widest mb-1">Stack</span>
                          {p.stack.map((s: string) => (
                            <span key={s} className="px-3 py-1.5 rounded-lg bg-black/[0.03] text-[11px] font-bold text-black/60 border border-black/[0.04]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-black/[0.06] flex items-center justify-between">
                        <a href={`/work/${p.id}`} className="flex items-center gap-2 text-[11px] md:text-[12px] font-black uppercase tracking-wider text-black group-hover:text-[#00BAFF] transition-colors">
                          Full Case Study <ChevronRight size={14} />
                        </a>
                        <div className="flex items-center gap-2">
                          {p.category === "Web" && <Globe size={14} className="text-black/30" />}
                          {p.category === "Mobile" && <Smartphone size={14} className="text-black/30" />}
                          {p.category === "AI" && <Bot size={14} className="text-black/30" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#050505] py-32 px-6 text-white">
        {/* Grid pattern overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient wash */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 100% 100%, rgba(0,186,255,0.12) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeUp>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00BAFF] block mb-5">
              Success Stories
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="text-[clamp(40px,6vw,80px)] font-black leading-[0.9] tracking-[-0.04em] mb-10">
              Your project could
              <br />
              be our next win.
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href="/start"
                className="inline-flex items-center gap-3 bg-[#00BAFF] text-white text-[14px] font-black uppercase tracking-wider px-10 py-5 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(0,186,255,0.3)] active:scale-95"
              >
                Start a Project
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-[14px] font-bold text-white/50 hover:text-white transition-colors duration-300 uppercase tracking-widest"
              >
                Meet the team <ArrowRight size={16} />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/[0.06] px-6 py-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-1">
            <span className="text-lg font-black tracking-tight uppercase">BE</span>
            <span className="text-lg font-black text-[#00BAFF]">.</span>
          </div>
          <p className="text-[12px] text-white/25">
            © {new Date().getFullYear()} BE. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[12px] text-white/35 font-semibold">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:hello@be.agency" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <BookCallModal isOpen={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </main>
  );
}
