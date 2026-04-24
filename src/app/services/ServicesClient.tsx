"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Layers,
  Zap,
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  Bot,
  Repeat,
  ArrowUpRight,
  MessageCircle,
  Infinity,
  Terminal,
  Activity,
  Lock,
  ShieldAlert
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useRef, useState } from "react";
import BookCallModal from "@/components/BookCallModal";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as any }
};

const SectionHeader = ({ title, desc, dark = false }: { title: string, desc: string, dark?: boolean }) => (
  <div className="mb-20">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-[clamp(32px,5vw,72px)] font-black leading-[0.92] tracking-[-0.04em] ${dark ? 'text-white' : 'text-black'} mb-8`}
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className={`text-lg ${dark ? 'text-white/40' : 'text-black/50'} max-w-2xl leading-relaxed font-medium`}
    >
      {desc}
    </motion.p>
  </div>
);

const CaseStudyCitation = ({ study }: { study: any }) => (
  <motion.a
    href={`/work/${study.slug}`}
    className="group relative flex items-center gap-6 p-6 rounded-3xl border border-black/[0.05] hover:border-[#00BAFF]/30 hover:bg-white transition-all duration-500 overflow-hidden"
  >
    <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
      <img src={study.image || "/work.png"} alt={study.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
    </div>
    <div className="flex-1 min-w-0">
      <span className="text-[9px] font-black uppercase tracking-widest text-[#00BAFF] mb-1 block">{study.category}</span>
      <h4 className="text-black font-black text-lg truncate group-hover:text-[#00BAFF] transition-colors">{study.title}</h4>
      <div className="flex items-center gap-2 text-[11px] font-bold text-black/30 group-hover:text-black/60 transition-colors mt-1">
        View Project <ArrowUpRight size={12} />
      </div>
    </div>
  </motion.a>
);

export default function ServicesClient({ studies }: { studies: any[] }) {
  const [bookCallOpen, setBookCallOpen] = useState(false);

  // Helper to find relevant studies for a pillar
  const getCitations = (keywords: string[]) => {
    return studies.filter(s =>
      keywords.some(k =>
        s.title.toLowerCase().includes(k.toLowerCase()) ||
        s.category.toLowerCase().includes(k.toLowerCase()) ||
        s.stack.some((st: string) => st.toLowerCase().includes(k.toLowerCase()))
      )
    ).slice(0, 2);
  };

  const buildCitations = getCitations(['Web', 'Mobile', 'Next.js', 'React', 'App', 'Frontend', 'Telegram']);
  const scaleCitations = getCitations(['Cloud', 'Scale', 'AWS', 'Infrastructure', 'Performance', 'Database', 'Backend']);
  const innovateCitations = getCitations(['AI', 'Automation', 'LLM', 'GPT', 'Agent', 'Integration', 'Mini App']);
  const securityCitations = getCitations(['Security', 'Audit', 'Encryption', 'Auth', 'Protection', 'Privacy', 'Hardening']);

  return (
    <main className="bg-[#050505]">
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00BAFF]/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-[clamp(42px,8vw,96px)] font-black leading-[0.9] tracking-[-0.05em] text-white mb-10"
          >
            High Performance
            <br />
            <span className="text-white/60">Digital Architecture.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-medium mb-12"
          >
            From rapid MVP builds to enterprise scaling and AI innovation,
            we engineer the infrastructure of the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/50"
          >
            <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#00BAFF] shadow-[0_0_10px_#00BAFF]" /> Build</div>
            <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#00BAFF] shadow-[0_0_10px_#00BAFF]" /> Scale</div>
            <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#00BAFF] shadow-[0_0_10px_#00BAFF]" /> Innovate</div>
            <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#00BAFF] shadow-[0_0_10px_#00BAFF]" /> Security</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-px h-16 bg-gradient-to-b from-[#00BAFF] to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          PILLAR 1: BUILD
      ══════════════════════════════════════════ */}
      <section id="build" className="bg-white py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            title="BUILD. Foundations for Growth."
            desc="We don't just write code; we craft digital experiences. Our build phase focuses on speed-to-market without sacrificing architectural integrity."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-7 space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group">
                  <div className="w-12 h-12 bg-black/[0.03] border border-black/[0.05] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00BAFF] group-hover:text-white transition-all duration-500">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">Web Ecosystems</h3>
                  <p className="text-black/50 leading-relaxed font-medium">
                    High-conversion landing pages, complex SaaS platforms, and headless CMS solutions built on the modern stack (Next.js, Tailwind, TypeScript).
                  </p>
                </div>
                <div className="group">
                  <div className="w-12 h-12 bg-black/[0.03] border border-black/[0.05] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00BAFF] group-hover:text-white transition-all duration-500">
                    <Smartphone size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">Mobile First</h3>
                  <p className="text-black/50 leading-relaxed font-medium">
                    Native-feeling iOS and Android applications using React Native. We focus on fluid animations, offline capabilities, and perfect UI.
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-12 bg-[#F7F8FA] rounded-[40px] border border-black/[0.03] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:scale-110 group-hover:opacity-[0.08] transition-all duration-700">
                  <MessageCircle size={120} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-4">Telegram Mini Apps (TMA)</h3>
                  <p className="text-black/60 leading-relaxed max-w-lg font-medium">
                    We've pioneered the development of high-performance Telegram Mini Apps. Reaching users directly within their chat interface with native-like web applications that integrate seamlessly with the Telegram ecosystem.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 ml-2">Building in Practice</h5>
                {buildCitations.length > 0 ? (
                  buildCitations.map(study => <CaseStudyCitation key={study.id} study={study} />)
                ) : (
                  <div className="p-10 border-2 border-dashed border-black/[0.05] rounded-[40px] text-center">
                    <p className="text-black/20 font-black uppercase tracking-widest text-[10px]">Real-world examples appearing soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PILLAR 2: SCALE
      ══════════════════════════════════════════ */}
      <section id="scale" className="bg-[#050505] py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)", backgroundSize: "100px 100px" }} />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionHeader
            title="SCALE. Infinite Growth."
            desc="Code is only as good as the infrastructure it runs on. we architect resilient systems that handle millions of requests without breaking a sweat."
            dark
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="sticky top-32 space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">Architecture in Action</h5>
                {scaleCitations.length > 0 ? (
                  scaleCitations.map(study => (
                    <motion.a
                      key={study.id}
                      href={`/work/${study.slug}`}
                      className="group block p-8 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-[#00BAFF]/50 transition-all duration-500"
                    >
                      <h4 className="text-white font-black text-xl mb-2 group-hover:text-[#00BAFF] transition-colors">{study.title}</h4>
                      <p className="text-white/30 text-sm font-medium line-clamp-2 mb-4">{study.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {study.stack.slice(0, 3).map((tech: string) => (
                          <span key={tech} className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-white/5 text-white/40">{tech}</span>
                        ))}
                      </div>
                    </motion.a>
                  ))
                ) : (
                  <div className="p-10 border-2 border-dashed border-white/[0.05] rounded-[40px] text-center">
                    <p className="text-white/10 font-black uppercase tracking-widest text-[10px]">Case studies incoming</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center mb-6 text-[#00BAFF]">
                    <Cloud size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">Robust Infrastructure</h3>
                  <p className="text-white/40 leading-relaxed font-medium">
                    Optimized VPS environments and cloud-managed services. We focus on scalability, database resilience, and perfect server-side configuration.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center mb-6 text-[#00BAFF]">
                    <Activity size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">Performance</h3>
                  <p className="text-white/40 leading-relaxed font-medium">
                    Database optimization, Edge caching, and sub-second load times. We ensure your product feels fast globally, regardless of traffic spikes.
                  </p>
                </div>
              </div>

              <div className="p-10 md:p-14 rounded-[48px] bg-gradient-to-br from-[#00BAFF]/20 to-transparent border border-[#00BAFF]/20 relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 opacity-[0.1] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                  <Infinity size={240} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#00BAFF] mb-4 block">Standard Procedure</span>
                  <h3 className="text-3xl font-black text-white mb-6">CI/CD Continuous Engineering</h3>
                  <p className="text-white/60 leading-relaxed max-w-xl font-medium mb-8">
                    Automation is in our DNA. We implement robust CI/CD pipelines in all our projects, ensuring that every deployment is tested, secure, and zero-downtime. Continuous delivery means faster iterations and zero deployment anxiety.
                  </p>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/50 uppercase tracking-widest">GitHub Actions</div>
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/50 uppercase tracking-widest">Docker</div>
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/50 uppercase tracking-widest">Terraform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PILLAR 3: INNOVATE
      ══════════════════════════════════════════ */}
      <section id="innovate" className="bg-[#F7F8FA] py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            title="INNOVATE. Beyond the Curve."
            desc="We bridge the gap between current business needs and future technology. AI is not an add-on; it's a fundamental shift in how products work."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-7 space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group p-10 rounded-[32px] bg-white border border-black/[0.03] hover:shadow-xl transition-all duration-500">
                  <div className="w-12 h-12 bg-black/[0.03] border border-black/[0.05] rounded-xl flex items-center justify-center mb-6 text-[#00BAFF]">
                    <Bot size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">AI Integration</h3>
                  <p className="text-black/50 leading-relaxed font-medium">
                    Smart automation pipelines that use AI to streamline business workflows, reduce manual overhead, and optimize administrative tasks.
                  </p>
                </div>
                <div className="group p-10 rounded-[32px] bg-white border border-black/[0.03] hover:shadow-xl transition-all duration-500">
                  <div className="w-12 h-12 bg-black/[0.03] border border-black/[0.05] rounded-xl flex items-center justify-center mb-6 text-[#00BAFF]">
                    <Repeat size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">Agentic Workflows</h3>
                  <p className="text-black/50 leading-relaxed font-medium">
                    Autonomous agents that handle complex business logic, from automated customer support to intelligent data analysis.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Terminal, label: "System Integration" },
                  { icon: ShieldCheck, label: "Security Audits" },
                  { icon: Layers, label: "Tech Strategy" }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-black/[0.05] flex items-center gap-4 bg-white">
                    <item.icon size={20} className="text-[#00BAFF]" />
                    <span className="text-[12px] font-black uppercase tracking-widest text-black/40">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30 ml-2">Innovation Studies</h5>
                {innovateCitations.length > 0 ? (
                  innovateCitations.map(study => <CaseStudyCitation key={study.id} study={study} />)
                ) : (
                  <div className="p-10 border-2 border-dashed border-black/[0.05] rounded-[40px] text-center">
                    <p className="text-black/20 font-black uppercase tracking-widest text-[10px]">The future is loading</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PILLAR 4: SECURITY
      ══════════════════════════════════════════ */}
      <section id="security" className="bg-[#050505] py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#00BAFF 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00BAFF]/5 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionHeader
            title="SECURITY. Hardened by Design."
            desc="We follow industry-standard security protocols to ensure your application is protected from day one. We don't just build; we protect your digital assets."
            dark
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="sticky top-32 space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">Secure Architectures</h5>
                {securityCitations.length > 0 ? (
                  securityCitations.map(study => (
                    <motion.a
                      key={study.id}
                      href={`/work/${study.slug}`}
                      className="group block p-8 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-[#00BAFF]/50 transition-all duration-500"
                    >
                      <h4 className="text-white font-black text-xl mb-2 group-hover:text-[#00BAFF] transition-colors">{study.title}</h4>
                      <p className="text-white/30 text-sm font-medium line-clamp-2 mb-4">{study.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {study.stack.slice(0, 3).map((tech: string) => (
                          <span key={tech} className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-white/5 text-white/40">{tech}</span>
                        ))}
                      </div>
                    </motion.a>
                  ))
                ) : (
                  <div className="p-10 border-2 border-dashed border-white/[0.05] rounded-[40px] text-center">
                    <p className="text-white/10 font-black uppercase tracking-widest text-[10px]">Security case studies incoming</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center mb-6 text-[#00BAFF]">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">Application Hardening</h3>
                  <p className="text-white/40 leading-relaxed font-medium">
                    Implementation of OWASP Top 10 security standards, secure authentication flows (OAuth, Auth.js), and end-to-end data encryption.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center mb-6 text-[#00BAFF]">
                    <Lock size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">Infrastructure Security</h3>
                  <p className="text-white/40 leading-relaxed font-medium">
                    Strict IAM policies, network isolation, and encrypted databases. We architect your cloud presence to be a fortress, not just a server.
                  </p>
                </div>
              </div>

              <div className="p-10 md:p-14 rounded-[48px] border border-white/10 bg-white/[0.02] relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 opacity-[0.05] group-hover:scale-110 transition-all duration-700">
                  <ShieldAlert size={200} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#00BAFF] mb-4 block">Our Standard</span>
                  <h3 className="text-3xl font-black text-white mb-6">Security-First Engineering</h3>
                  <p className="text-white/60 leading-relaxed max-w-xl font-medium mb-8">
                    We don't treat security as an afterthought. It is woven into every line of code we write and every architectural decision we make. We follow regular web and application security industry practices to ensure your platform stays ahead of modern cyber threats.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/50 uppercase tracking-widest">OWASP Compliance</div>
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/50 uppercase tracking-widest">Data Privacy</div>
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/50 uppercase tracking-widest">Regular Audits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT CALL TO ACTION
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#050505] py-40 px-6 text-white text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,186,255,0.1),transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00BAFF] block mb-8"
          >
            Ready to Build?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[clamp(36px,6vw,84px)] font-black leading-[0.9] tracking-[-0.05em] mb-12"
          >
            Let&apos;s architect your
            <br />
            <span className="text-white/60">next success.</span>
          </motion.h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/start" className="inline-flex items-center gap-2.5 bg-[#00BAFF] text-white text-[14px] font-black uppercase tracking-wider px-12 py-5 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:gap-4 shadow-2xl active:scale-95">
              Start Project <ArrowRight size={18} />
            </a>
            <button
              onClick={() => setBookCallOpen(true)}
              className="px-10 py-5 text-[14px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              Book a Strategy Call
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <BookCallModal isOpen={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </main>
  );
}
