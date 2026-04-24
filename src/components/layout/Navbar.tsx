"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Globe,
  Smartphone,
  Palette,
  Server,
  Database,
  ShieldCheck,
  Bot,
  BarChart3,
  Command,
  Code2,
  Layers,
  ArrowRight,
  PhoneCall,
  Menu,
  X,
  MessageCircle,
  Infinity,
  Lock,
  ShieldAlert,
} from "lucide-react";
import BookCallModal from "@/components/BookCallModal";

const SERVICES_MENU = {
  build: {
    label: "BUILD",
    items: [
      {
        icon: Globe,
        title: "Web Development",
        desc: "Next.js, React & full-stack apps",
      },
      {
        icon: Smartphone,
        title: "Mobile Apps",
        desc: "iOS, Android & cross-platform",
      },
      {
        icon: MessageCircle,
        title: "Telegram Mini Apps",
        desc: "TMA ecosystems & bots",
      },
      {
        icon: Palette,
        title: "UI/UX Design",
        desc: "Interfaces people love to use",
      },
    ],
  },
  scale: {
    label: "SCALE",
    items: [
      {
        icon: Server,
        title: "Robust Infrastructure",
        desc: "Scalable VPS & managed servers",
      },
      {
        icon: Infinity,
        title: "CI/CD Pipelines",
        desc: "Automated continuous delivery",
      },
      {
        icon: BarChart3,
        title: "Performance",
        desc: "Sub-second load times",
      },
    ],
  },
  innovate: {
    label: "INNOVATE",
    items: [
      {
        icon: Bot,
        title: "AI Integration",
        desc: "LLMs, agents & automation",
      },
      {
        icon: Command,
        title: "Business Automation",
        desc: "Eliminate repetitive ops costs",
      },
      {
        icon: Layers,
        title: "System Integration",
        desc: "Connect any stack or API",
      },
    ],
  },
  security: {
    label: "SECURITY",
    items: [
      {
        icon: ShieldCheck,
        title: "Security Audit",
        desc: "Enterprise-grade protection",
      },
      {
        icon: Lock,
        title: "Data Encryption",
        desc: "Secure data at rest & transit",
      },
      {
        icon: ShieldAlert,
        title: "App Hardening",
        desc: "OWASP & industry standards",
      },
    ],
  },
};

export default function Navbar({ forceTheme }: { forceTheme?: "light" | "dark" }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let closeTimeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const onScroll = () => {
      const heroH = window.innerHeight * 0.85;
      setScrolled(window.scrollY > 20);
      setPastHero(window.scrollY > heroH);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    clearTimeout(closeTimeout);
    setIsServicesOpen(true);
  };

  const closeMenu = () => {
    closeTimeout = setTimeout(() => setIsServicesOpen(false), 120);
  };

  // Theme logic
  // forceTheme="dark" -> we want dark text (on white bg)
  // forceTheme="light" -> we want white text (on dark bg)
  const isDark = forceTheme === "dark" || (pastHero && forceTheme !== "light");
  
  const textBase = !isDark ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black";
  const textActive = !isDark ? "text-white" : "text-black";
  const logoText = !isDark ? "text-white" : "text-black";

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-500 ${
        isDark
          ? "bg-white/95 backdrop-blur-xl border-b border-black/[0.06] shadow-sm"
          : scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.05]"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 md:px-10 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-0.5 group">
          <span className={`text-xl font-black tracking-[-0.05em] uppercase transition-colors duration-300 ${logoText}`}>
            BE
          </span>
          <span className="text-xl font-black text-[#00BAFF]">.</span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className={`text-[13px] font-semibold transition-colors duration-300 tracking-wide ${textBase}`}
          >
            Home
          </a>

          <a
            href="/about"
            className={`text-[13px] font-semibold transition-colors duration-300 tracking-wide ${textBase}`}
          >
            About
          </a>

          {/* Services Mega Dropdown */}
          <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <a
              href="/services"
              className={`flex items-center gap-1.5 text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                isServicesOpen ? textActive : textBase
              }`}
            >
              Services
              <motion.span
                animate={{ rotate: isServicesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={14} strokeWidth={2.5} />
              </motion.span>
            </a>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                  className="absolute top-[calc(100%+16px)] -left-64 w-[960px] bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] border border-black/[0.06] overflow-hidden"
                >
                  {/* Top header strip */}
                  <div className="px-8 pt-6 pb-4 border-b border-black/[0.05]">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/30">
                      What we do
                    </p>
                    <p className="text-[13px] text-black/50 mt-0.5">
                      Full-cycle software development — from idea to scaled product.
                    </p>
                  </div>

                  {/* Four columns */}
                  <div className="grid grid-cols-4 divide-x divide-black/[0.05]">
                    {Object.values(SERVICES_MENU).map((col) => (
                      <div key={col.label} className="p-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/30 mb-4">
                          {col.label}
                        </p>
                        <div className="space-y-1">
                          {col.items.map((item) => (
                            <a
                              key={item.title}
                              href={`/services#${col.label.toLowerCase()}`}
                              onClick={() => setIsServicesOpen(false)}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#00BAFF]/[0.06] group/item transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-black/[0.04] group-hover/item:bg-[#00BAFF]/10 flex items-center justify-center flex-shrink-0 transition-colors">
                                <item.icon
                                  size={15}
                                  className="text-black/40 group-hover/item:text-[#00BAFF] transition-colors"
                                />
                              </div>
                              <div>
                                <div className="text-[13px] font-bold text-black/80 group-hover/item:text-black transition-colors leading-tight">
                                  {item.title}
                                </div>
                                <div className="text-[11px] text-black/40 mt-0.5 leading-snug">
                                  {item.desc}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom CTA strip */}
                  <div className="px-8 py-4 bg-black/[0.02] border-t border-black/[0.05] flex items-center justify-between">
                    <p className="text-[12px] text-black/40">
                      Not sure what you need?{" "}
                      <span className="text-[#00BAFF] font-semibold">
                        Let&apos;s talk.
                      </span>
                    </p>
                    <a
                      href="#contact"
                      className="flex items-center gap-2 text-[12px] font-bold text-black hover:text-[#00BAFF] transition-colors"
                    >
                      Start a project <ArrowRight size={13} />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="/work"
            className={`text-[13px] font-semibold transition-colors duration-300 tracking-wide ${textBase}`}
          >
            Case Studies
          </a>


          <a
            href="/blog"
            className={`text-[13px] font-semibold transition-colors duration-300 tracking-wide ${textBase}`}
          >
            Blog
          </a>
        </div>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="nav-book-call-btn"
            onClick={() => setBookCallOpen(true)}
            className={`flex items-center gap-2 text-[12px] font-black uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all duration-300 active:scale-95 ${
              isDark
                ? "border-black/20 text-black hover:border-[#00BAFF] hover:text-[#00BAFF]"
                : "border-white/30 text-white hover:border-[#00BAFF] hover:text-[#00BAFF]"
            }`}
          >
            <PhoneCall size={12} /> Book a Call
          </button>
          <a
            href="/start"
            id="nav-cta-btn"
            className={`flex items-center gap-2 text-[12px] font-black uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 active:scale-95 ${
              isDark
                ? "bg-black text-white hover:bg-[#00BAFF]"
                : "bg-white text-black hover:bg-[#00BAFF] hover:text-white"
            }`}
          >
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-3 -mr-3 rounded-xl transition-all duration-300 z-[130] active:scale-90 ${
            isMobileMenuOpen 
              ? "text-black bg-black/5" 
              : isDark ? "text-black hover:bg-black/5" : "text-white hover:bg-white/10"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Fullscreen Top-drop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 35, stiffness: 350 }}
            className="fixed inset-0 w-full h-screen bg-white z-[120] md:hidden flex flex-col"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-0.5">
                  <span className="text-2xl font-black tracking-tight uppercase text-black">BE</span>
                  <span className="text-2xl font-black text-[#00BAFF]">.</span>
                </div>
                {/* Spacer for the absolute positioned X button in the nav bar above */}
                <div className="w-10 h-10" />
              </div>

              <nav className="flex-1 flex flex-col justify-center space-y-8 pb-20">
                <motion.a 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  href="/" 
                  className="block text-5xl font-black tracking-tighter text-black hover:text-[#00BAFF] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </motion.a>
                <motion.a 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  href="/about" 
                  className="block text-5xl font-black tracking-tighter text-black hover:text-[#00BAFF] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </motion.a>
                <motion.a 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  href="/services" 
                  className="block text-5xl font-black tracking-tighter text-black hover:text-[#00BAFF] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </motion.a>
                <motion.a 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  href="/work" 
                  className="block text-5xl font-black tracking-tighter text-black hover:text-[#00BAFF] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Case Studies
                </motion.a>
                <motion.a 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  href="/blog" 
                  className="block text-5xl font-black tracking-tighter text-black hover:text-[#00BAFF] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </motion.a>
              </nav>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-4 pt-8 border-t border-black/[0.05]"
              >
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setBookCallOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-black/5 text-black text-[14px] font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-black/10 transition-all"
                >
                  <PhoneCall size={16} /> Book a Call
                </button>
                <a
                  href="/start"
                  className="w-full flex items-center justify-center gap-3 bg-[#00BAFF] text-black text-[14px] font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-black hover:text-white transition-all shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Project <ArrowRight size={18} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    <BookCallModal isOpen={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </>
  );
}