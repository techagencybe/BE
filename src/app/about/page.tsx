"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  PhoneCall,
  Command,
  Globe,
  CheckCircle2,
  Cpu,
  TrendingUp,
  Asterisk,
  ShieldCheck,
  Rocket,
  Search,
  MessageSquare,
  Repeat,
  User,
} from "lucide-react";
import BookCallModal from "@/components/BookCallModal";
import Navbar from "@/components/layout/Navbar";

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
const PHILOSOPHY = [
  {
    word: "Efficient",
    icon: Command,
    desc: "Automating those messy workflows you discussed. We turn operational friction into fluid systems.",
  },
  {
    word: "Scalable",
    icon: TrendingUp,
    desc: "Building the tech that grows with you. Infrastructure designed for tomorrow's traffic, today.",
  },
  {
    word: "Digital",
    icon: Globe,
    desc: "Bridging the gap for traditional businesses. We translate your legacy into a modern digital powerhouse.",
  },
];

const TIMELINE = [
  {
    year: "2021",
    title: "The Genesis",
    desc: "Euodia and Bolaji founded BE. with a mission to bridge the gap between bold ideas and engineering reality.",
  },
  {
    year: "2022",
    title: "The Build Engine",
    desc: "Developed our proprietary internal framework that allows us to ship enterprise-grade SaaS 3x faster.",
  },
  {
    year: "2023",
    title: "Global Reach",
    desc: "Expanded operations to support visionaries across Europe, North America, and Africa.",
  },
  {
    year: "2024",
    title: "AI Integration",
    desc: "Successfully launched 15+ products with integrated custom AI agents and automation pipelines.",
  },
];

const PRINCIPLES = [
  {
    title: "Uncompromising Craft",
    desc: "We don't do 'good enough'. Every line of code and every pixel is a testament to our commitment to excellence.",
    icon: Asterisk,
  },
  {
    title: "Radical Transparency",
    desc: "No black boxes. You're part of our Slack, our Jira, and our process. We win together.",
    icon: Search,
  },
  {
    title: "Speed as a Feature",
    desc: "In a world that moves fast, we move faster. We deliver momentum, not just milestones.",
    icon: Rocket,
  },
  {
    title: "Long-term Partnership",
    desc: "We aren't just a vendor; we're your technical co-founders. Your success is the only metric that matters.",
    icon: Repeat,
  },
];

const TEAM = [
  {
    name: "Euodia",
    role: "Co-founder & Business Lead",
    bio: "Euodia handles the strategy, operations, and business growth. She ensures our blueprint aligns perfectly with your market objectives and navigates the complexity of scaling businesses.",
    // image: "/images/EUODIA.png",
  },
  {
    name: "Bolaji",
    role: "Co-founder & Tech Lead",
    bio: "Bolaji is the 'Build Engine' behind the tech. He leads our engineering efforts, transforming complex business problems into elegant, scalable software solutions.",
    // image: "/images/Bolaji.jpg",
  },
];

const STACK = [
  "Next.js", "React", "TypeScript", "Node.js", "Python",
  "React Native", "PostgreSQL", "Redis", "AWS", "Vercel",
  "OpenAI", "Supabase", "Docker", "Terraform",
];

const STATS = [
  { number: "50+", label: "Products shipped" },
  { number: "3×", label: "Faster to market" },
  { number: "98%", label: "Client retention" },
  { number: "24/7", label: "Expert support" },
];

/* ─── Page ─── */
export default function AboutPage() {
  const [bookCallOpen, setBookCallOpen] = useState(false);

  return (
    <main className="bg-white">
      <Navbar />
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden pt-24">
        {/* Grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Radial glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,186,255,0.12) 0%, transparent 75%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <span className="w-12 h-[1px] bg-white/20" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00BAFF]">
              Blueprint & Execution
            </span>
            <span className="w-12 h-[1px] bg-white/20" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="text-[clamp(52px,11vw,140px)] font-black leading-[0.85] tracking-[-0.05em] mb-12"
          >
            Don&apos;t just build.
            <br />
            <span className="text-[#00BAFF] drop-shadow-[0_0_40px_rgba(0,186,255,0.3)]">BE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-[17px] md:text-[20px] text-white/45 max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed font-medium px-4 md:px-0"
          >
            BE is more than a name; it&apos;s an aspirational promise.
            We shift the focus from what we do to what we enable.
            We deliver the finished state of existence for your business.
            <span className="text-white/80 block mt-4 md:mt-5 italic text-base md:text-[18px]">&ldquo;You dream it, we help you BE it.&rdquo;</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 px-6 md:px-0"
          >
            <button
              onClick={() => setBookCallOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black text-[13px] md:text-[14px] font-black uppercase tracking-wider px-10 md:px-12 py-5 rounded-full hover:bg-[#00BAFF] hover:text-white transition-all duration-300 active:scale-95"
            >
              <PhoneCall size={18} /> Book a call
            </button>
            <a
              href="/start"
              className="group flex items-center justify-center gap-2 text-[13px] md:text-[14px] font-bold text-white/50 hover:text-white transition-colors duration-300 uppercase tracking-widest"
            >
              Start Your Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <div className="bg-[#050505] border-y border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-[36px] md:text-[52px] font-black text-white tracking-tighter leading-none mb-1.5 md:mb-2">{s.number}</div>
              <div className="text-[9px] md:text-[11px] text-white/30 uppercase tracking-[0.25em] font-black">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STATE OF BEING (PHILOSOPHY)
      ══════════════════════════════════════════ */}
      <section className="bg-white py-32 px-6 relative overflow-hidden">
        {/* Diagonal stripes subtle background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 20px)",
          }}
        />

        <div className="max-w-[1400px] mx-auto">
          <FadeUp className="mb-20">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00BAFF] block mb-4">Our Philosophy</span>
            <h2 className="text-[clamp(40px,5vw,72px)] font-black leading-[0.9] tracking-[-0.04em] text-black">
              Defining your next
              <br />
              <span className="text-black/20">State of BEing.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PHILOSOPHY.map((item, i) => (
              <FadeUp key={item.word} delay={i * 0.1}>
                <div className="group p-8 md:p-12 rounded-3xl md:rounded-[40px] border border-black/[0.06] bg-[#F7F8FA] hover:border-[#00BAFF]/30 hover:bg-white hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="text-[10px] md:text-[11px] font-black text-[#00BAFF] uppercase tracking-[0.2em] mb-4 md:mb-6">BE [{item.word}]</div>
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-black/[0.04] flex items-center justify-center mb-6 md:mb-8 group-hover:bg-[#00BAFF] group-hover:text-white transition-all duration-300">
                    <item.icon size={22} className="md:w-[26px] md:h-[26px]" />
                  </div>
                  <h3 className="text-[24px] md:text-[28px] font-black text-black tracking-tight mb-4 md:mb-5">{item.word}</h3>
                  <p className="text-black/50 text-sm md:text-[16px] leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STORY (TIMELINE)
      ══════════════════════════════════════════ */}
      <section className="bg-[#050505] text-white py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <FadeUp>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00BAFF] block mb-6">The Journey</span>
                <h2 className="text-[clamp(40px,5vw,64px)] font-black leading-[0.9] tracking-[-0.04em] mb-10">
                  Building the engine
                  <br />
                  <span className="text-white/30">brick by brick.</span>
                </h2>
                <p className="text-white/45 text-[18px] leading-relaxed max-w-lg">
                  What started as a shared passion for high-end engineering between
                  Euodia and Bolaji has evolved into a powerhouse for digital transformation.
                  We don&apos;t just deliver software; we deliver evolution.
                </p>
              </FadeUp>
            </div>

            <div className="space-y-12 relative">
              {/* Vertical line */}
              <div className="absolute left-[11px] top-4 bottom-4 w-[1px] bg-white/10" />

              {TIMELINE.map((item, i) => (
                <FadeUp key={item.year} delay={i * 0.1} className="relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#050505] border-2 border-[#00BAFF] shadow-[0_0_15px_rgba(0,186,255,0.5)] z-10" />
                  <div className="text-[14px] font-black text-[#00BAFF] mb-2">{item.year}</div>
                  <h3 className="text-[24px] font-black mb-3">{item.title}</h3>
                  <p className="text-white/40 text-[15px] leading-relaxed">{item.desc}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRINCIPLES (VALUES)
      ══════════════════════════════════════════ */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <FadeUp>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00BAFF] block mb-4">Our Principles</span>
              <h2 className="text-[clamp(36px,5vw,60px)] font-black tracking-tight text-black">What keeps the engine running.</h2>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRINCIPLES.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.1}>
                <div className="p-10 rounded-[32px] bg-[#F7F8FA] border border-black/[0.04] h-full flex flex-col hover:border-[#00BAFF]/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-8 shadow-sm">
                    <p.icon size={22} className="text-[#00BAFF]" />
                  </div>
                  <h3 className="text-[20px] font-black text-black mb-4 tracking-tight">{p.title}</h3>
                  <p className="text-black/50 text-[14px] leading-relaxed">{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOUNDERS
      ══════════════════════════════════════════ */}
      <section className="bg-[#050505] text-white py-32 px-6 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <FadeUp>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00BAFF] block mb-6">The Founders</span>
              <h2 className="text-[clamp(40px,5vw,72px)] font-black leading-[0.9] tracking-[-0.04em] mb-10">
                Blueprint &
                <br />
                <span className="text-white/30">Execution.</span>
              </h2>
              <p className="text-white/45 text-[18px] leading-relaxed mb-10">
                Euodia handles the vision and business evolution, while Bolaji builds the engine.
                Together, they lead a lean, high-impact team dedicated to your product&apos;s success.
              </p>
              <div className="flex gap-4">
                <div className="px-6 py-2 rounded-full border border-white/10 text-[12px] font-bold uppercase tracking-widest text-[#00BAFF]">Euodia — Business</div>
                <div className="px-6 py-2 rounded-full border border-white/10 text-[12px] font-bold uppercase tracking-widest text-white/50">Bolaji — Tech</div>
              </div>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {TEAM.map((founder, i) => (
              <FadeUp key={founder.name} delay={i * 0.15}>
                <div className="group relative rounded-3xl md:rounded-[40px] border border-white/[0.08] bg-[#0A0A0A] overflow-hidden hover:bg-[#111] hover:border-[#00BAFF]/30 transition-all duration-500 p-8 md:p-14 min-h-[340px] md:min-h-[380px] flex flex-col justify-end">
                  {/* Subtle Top-Right Accent */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00BAFF]/0 to-[#00BAFF]/[0.08] rounded-full blur-3xl group-hover:to-[#00BAFF]/20 group-hover:scale-150 transition-all duration-700 ease-out pointer-events-none" />

                  {/* Top Quote Icon / Decor */}
                  <div className="absolute top-10 left-10 text-white/[0.03] group-hover:text-[#00BAFF]/10 transition-colors duration-500">
                    <User size={60} className="md:w-20 md:h-20" strokeWidth={1} />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white/50 text-[18px] md:text-[20px] font-black group-hover:bg-[#00BAFF]/10 group-hover:text-[#00BAFF] group-hover:border-[#00BAFF]/30 transition-all duration-300">
                        {founder.name[0]}
                      </div>
                      <div>
                        <h3 className="text-[22px] md:text-[28px] font-black text-white leading-tight mb-0.5 md:mb-1">{founder.name}</h3>
                        <div className="text-[10px] md:text-[11px] font-black text-[#00BAFF] uppercase tracking-[0.2em]">{founder.role}</div>
                      </div>
                    </div>
                    <p className="text-sm md:text-[16px] text-white/45 leading-relaxed font-medium">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          THE ENGINE (TECH STACK)
      ══════════════════════════════════════════ */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeUp>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00BAFF] block mb-12 text-center">The Build Engine</span>
          </FadeUp>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {STACK.map((tech, i) => (
              <FadeUp key={tech} delay={i * 0.05}>
                <div className="px-8 py-4 rounded-2xl bg-[#F7F8FA] border border-black/[0.05] text-[15px] font-black text-black/50 hover:text-black hover:border-[#00BAFF] hover:bg-white hover:shadow-lg transition-all cursor-default text-center">
                  {tech}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APPROACH STRIP
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8F9FA] border-y border-black/[0.04] px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
          <FadeUp className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="text-[#00BAFF]" size={28} />
            </div>
            <div>
              <h4 className="text-[16px] font-black text-black uppercase tracking-tight mb-1">Remote First</h4>
              <p className="text-[13px] text-black/40 font-medium">Distributed excellence across time zones.</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1} className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="text-[#00BAFF]" size={28} />
            </div>
            <div>
              <h4 className="text-[16px] font-black text-black uppercase tracking-tight mb-1">Agile Logic</h4>
              <p className="text-[13px] text-black/40 font-medium">Weekly iterations, zero surprises.</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.2} className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
              <MessageSquare className="text-[#00BAFF]" size={28} />
            </div>
            <div>
              <h4 className="text-[16px] font-black text-black uppercase tracking-tight mb-1">Partner Focused</h4>
              <p className="text-[13px] text-black/40 font-medium">Direct access to our senior leadership.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white py-40 px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00BAFF]/10 text-[#00BAFF] text-[12px] font-black uppercase tracking-[0.2em] mb-10 text-center">
              <Asterisk size={14} /> Join the Evolution
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-[clamp(44px,7vw,88px)] font-black leading-[0.9] tracking-[-0.05em] text-black mb-12">
              Ready to BE
              <br />
              <span className="text-black/20">something more?</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <button
              onClick={() => setBookCallOpen(true)}
              className="inline-flex items-center gap-3 bg-black text-white text-[15px] font-black uppercase tracking-wider px-14 py-6 rounded-full hover:bg-[#00BAFF] transition-all duration-300 shadow-2xl active:scale-95"
            >
              Start Your Journey <ArrowRight size={20} />
            </button>
          </FadeUp>
        </div>
      </section>

      <footer className="bg-[#050505] text-white py-16 px-6 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-[24px] font-black tracking-tighter">BE<span className="text-[#00BAFF]">.</span></div>
          <div className="text-[13px] text-white/30 font-medium text-center md:text-left">© {new Date().getFullYear()} BE. Agency. High-Performance Software.</div>
          <div className="flex gap-10 text-[13px] font-black uppercase tracking-[0.25em] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>
      </footer>

      <BookCallModal isOpen={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </main>
  );
}
