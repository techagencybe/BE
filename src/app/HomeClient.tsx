"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Palette,
  Bot,
  Command,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";
import BookCallModal from "@/components/BookCallModal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Data ─── */
const SERVICES = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Blazing-fast Next.js applications, e-commerce platforms, SaaS dashboards, and everything in between.",
    tag: "Full-Stack",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Cross-platform iOS & Android apps built with React Native — one codebase, native performance.",
    tag: "iOS & Android",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Interfaces that feel alive. From wireframes to polished Figma designs your devs will love.",
    tag: "Design Systems",
  },
  {
    icon: Bot,
    title: "AI Integration",
    desc: "Embed LLMs, build agents, and automate workflows so your team focuses on what matters.",
    tag: "LLMs & Agents",
  },
  {
    icon: Command,
    title: "Business Automation",
    desc: "Eliminate repetitive tasks and operational overhead with custom automation pipelines.",
    tag: "Ops & Workflows",
  },
  {
    icon: ShieldCheck,
    title: "Security & Scale",
    desc: "Enterprise-grade architecture, cloud infrastructure, and security audits that protect you.",
    tag: "DevOps",
  },
];

const CLIENT_NEEDS = [
  {
    title: "Business Automation",
    desc: "I want to eliminate repetitive tasks and unnecessary operational cost",
  },
  {
    title: "Product Engineering",
    desc: "I want to develop, deploy & go to market quickly with my web or mobile application",
  },
  {
    title: "Technology Strategy",
    desc: "I want to take my business online or significantly increase sales",
  },
  {
    title: "Team Augmentation",
    desc: "I want to extend my team with senior engineers without breaking the bank",
  },
  {
    title: "AI & Automation",
    desc: "I want to integrate AI tools and agents into my existing product or workflow",
  },
];

const STATS = [
  { number: "50+", label: "Products Shipped" },
  { number: "3×", label: "Faster to Market" },
  { number: "98%", label: "Client Retention" },
  { number: "24/7", label: "Expert Support" },
];

export default function HomeClient({ initialStudies }: { initialStudies: any[] }) {
  const [bookCallOpen, setBookCallOpen] = useState(false);

  return (
    <main>
      <Navbar />
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden pt-12 md:pt-0">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,186,255,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as any }}
            className="text-[clamp(52px,11vw,140px)] font-black leading-[0.85] tracking-[-0.05em] mb-10"
          >
            Don&apos;t just build.
            <br />
            <span className="text-[#00BAFF] drop-shadow-[0_0_40px_rgba(0,186,255,0.4)]">BE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-base md:text-[19px] text-white/45 max-w-xl mx-auto mb-10 md:mb-14 leading-relaxed font-medium px-4 md:px-0"
          >
            We deliver the finished state of existence for your vision.
            Custom software, high performance, zero compromises.
            <span className="text-white/80 block mt-4 italic text-sm md:text-[16px]">&ldquo;You dream it, we help you BE it.&rdquo;</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-6 md:px-0"
          >
            <a
              id="hero-cta-primary"
              href="/start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black text-[12px] md:text-[13px] font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-[#00BAFF] hover:text-white transition-all duration-300 hover:gap-3 active:scale-95"
            >
              Share your idea <ArrowRight size={15} />
            </a>
            <button
              id="hero-book-call-btn"
              onClick={() => setBookCallOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white text-[12px] md:text-[13px] font-black uppercase tracking-wider px-8 py-4 rounded-full hover:border-[#00BAFF] hover:text-[#00BAFF] transition-all duration-300 active:scale-95"
            >
              <PhoneCall size={14} /> Book a Call
            </button>
          </motion.div>
        </div>

        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #050505)",
          }}
        />
      </section>

      {/* STATS BAR */}
      <div className="bg-[#050505] border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/[0.07]">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center md:px-8 border-r border-white/[0.07] last:border-0 md:border-0"
            >
              <div className="text-[32px] md:text-[42px] font-black text-white tracking-tight leading-none">
                {s.number}
              </div>
              <div className="text-[9px] md:text-[12px] text-white/35 uppercase tracking-widest mt-1.5 font-semibold">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SERVICES GRID */}
      <Section id="services" className="bg-white py-28 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <motion.span variants={fadeUp} custom={0} className="text-[11px] font-black uppercase tracking-[0.18em] text-[#00BAFF] block mb-3">
                Service Offering
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="text-[clamp(36px,5vw,72px)] font-black leading-[0.92] tracking-[-0.03em] text-black">
                Customized Product
                <br />
                Development
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} custom={2} className="text-black/50 text-[16px] max-w-xs leading-relaxed md:text-right">
              Build confidently with a product development team that helps you succeed.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <motion.a
                key={s.title}
                href="#contact"
                custom={i}
                variants={fadeUp}
                className="group relative p-7 rounded-2xl border border-black/[0.07] hover:border-[#00BAFF]/30 overflow-hidden transition-all duration-300 cursor-pointer bg-white"
              >
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-gradient-to-br from-[#00BAFF]/0 to-[#00BAFF]/[0.15] blur-2xl group-hover:scale-150 group-hover:to-[#00BAFF]/30 transition-transform duration-700 ease-out pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#00BAFF]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div aria-hidden className="absolute inset-0 opacity-[0.2] group-hover:opacity-[0.4] transition-opacity duration-500 pointer-events-none mix-blend-multiply"
                  style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 12px, rgba(0,0,0,0.03) 12px, rgba(0,0,0,0.03) 13px)" }} />

                <div className="relative z-10">
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.15em] text-black/30 bg-black/[0.04] px-3 py-1.5 rounded-full mb-6 group-hover:bg-[#00BAFF]/10 group-hover:text-[#00BAFF] transition-colors duration-300">
                    {s.tag}
                  </span>
                  <div className="relative w-12 h-12 mb-6">
                    <div className="absolute inset-0 bg-[#00BAFF]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-full h-full rounded-xl bg-black/[0.03] border border-black/[0.05] group-hover:bg-white group-hover:border-[#00BAFF]/20 flex items-center justify-center transition-all duration-300 shadow-sm">
                      <s.icon size={22} className="text-black/40 group-hover:text-[#00BAFF] transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-[20px] font-black text-black tracking-tight mb-3 group-hover:text-[#00BAFF] transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-black/50 leading-relaxed mb-6 font-medium">
                    {s.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[12px] font-bold text-black/25 group-hover:text-[#00BAFF] transition-colors duration-300">
                    <span className="relative overflow-hidden inline-flex">
                      <span className="group-hover:-translate-y-full transition-transform duration-300">Explore capability</span>
                      <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">Explore capability</span>
                    </span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </Section>

      {/* BE. LABS / CASE STUDIES */}
      {initialStudies && initialStudies.length > 0 && (
        <Section className="bg-[#050505] py-32 px-6 border-y border-white/[0.06] overflow-hidden relative">
          <div aria-hidden className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="text-center mb-20">
              <motion.span variants={fadeUp} custom={0} className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00BAFF] block mb-4">
                BE. Labs
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="text-[clamp(40px,5vw,72px)] font-black leading-[0.9] tracking-[-0.03em] text-white">
                Building the future,
                <br />
                <span className="text-white/30">one node at a time.</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {initialStudies.slice(0, 2).map((study, i) => (
                <motion.a
                  key={study.id}
                  href={`/work/${study.slug}`}
                  variants={fadeUp}
                  custom={i + 2}
                  className="group relative rounded-3xl overflow-hidden bg-black border border-white/[0.08] min-h-[400px] md:min-h-[520px] flex flex-col justify-end p-8 md:p-14 transition-all duration-500 hover:border-[#00BAFF]/40 hover:shadow-[0_0_40px_rgba(0,186,255,0.15)]"
                >
                  <div className="absolute inset-0 z-0">
                    <img src={study.image || "/work.png"} alt={study.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00BAFF]/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>

                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1.5 rounded-lg bg-[#00BAFF]/10 border border-[#00BAFF]/20 text-[10px] font-black uppercase tracking-widest text-[#00BAFF] mb-4 md:mb-6">
                      {study.category}
                    </span>
                    <h3 className="text-2xl md:text-[40px] font-black text-white leading-tight tracking-tight mb-3 md:mb-4 group-hover:text-[#00BAFF] transition-colors duration-300">
                      {study.title}
                    </h3>
                    <p className="text-[14px] md:text-[16px] text-white/50 max-w-md leading-relaxed font-medium mb-6 md:mb-8 line-clamp-2">
                      {study.description}
                    </p>
                    <div className="flex items-center gap-2 text-[12px] font-bold text-white uppercase tracking-wider group-hover:text-[#00BAFF] transition-colors">
                      Read Case Study <ArrowUpRight size={16} />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CLIENT GOALS */}
      <Section className="bg-[#F7F8FA] py-28 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <motion.span variants={fadeUp} custom={0} className="text-[11px] font-black uppercase tracking-[0.18em] text-[#00BAFF] block mb-4">
              Client Goals
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-[clamp(40px,5vw,80px)] font-black leading-[0.9] tracking-[-0.03em] text-black">
              What most
              <br />
              of our clients
              <br />
              ask for
            </motion.h2>
            <p className="text-black/45 mt-6 text-[16px] leading-relaxed max-w-sm">
              We&apos;ve heard it all. Here are the goals our clients come to us with — and we deliver.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 mt-10 bg-black text-white text-[12px] font-black uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-[#00BAFF] transition-all duration-300 active:scale-95">
              Start Building Today <ArrowRight size={14} />
            </a>
          </div>

          <div className="space-y-0 divide-y divide-black/[0.06]">
            {CLIENT_NEEDS.map((need, i) => (
              <motion.div key={need.title} custom={i} variants={fadeUp} className="group py-7 cursor-pointer">
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={20} className="text-[#00BAFF] flex-shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h3 className="text-[17px] font-black text-black tracking-tight group-hover:text-[#00BAFF] transition-colors duration-300">
                      {need.title}
                    </h3>
                    <p className="text-[14px] text-black/45 mt-1 leading-relaxed">
                      {need.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden bg-[#050505] py-32 px-6 text-white">
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,186,255,0.15) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.span variants={fadeUp} custom={0} className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00BAFF] block mb-5">
            Let&apos;s Work Together
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-[clamp(44px,7vw,96px)] font-black leading-[0.88] tracking-[-0.04em] mb-8">
            Have a project
            <br />
            in mind?
          </motion.h2>
          <p className="text-white/45 text-[17px] leading-relaxed max-w-md mx-auto mb-12">
            Tell us your idea. We&apos;ll respond within 24 hours with a plan, timeline, and quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/start" className="inline-flex items-center gap-2.5 bg-[#00BAFF] text-white text-[14px] font-black uppercase tracking-wider px-12 py-5 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:gap-4 shadow-2xl active:scale-95">
              Start Your Project <ArrowRight size={18} />
            </a>
            <button onClick={() => setBookCallOpen(true)} className="text-[14px] font-bold text-white/40 hover:text-white transition-colors tracking-widest uppercase">
              or book a call
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <BookCallModal isOpen={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </main>
  );
}
