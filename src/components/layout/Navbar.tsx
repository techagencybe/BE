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
        icon: Palette,
        title: "UI/UX Design",
        desc: "Interfaces people love to use",
      },
      {
        icon: Code2,
        title: "MVP Development",
        desc: "Launch fast, iterate faster",
      },
    ],
  },
  scale: {
    label: "SCALE",
    items: [
      {
        icon: Server,
        title: "Cloud Architecture",
        desc: "Scalable, resilient infrastructure",
      },
      {
        icon: Database,
        title: "Database Design",
        desc: "Postgres, Redis & beyond",
      },
      {
        icon: ShieldCheck,
        title: "Security Audit",
        desc: "Enterprise-grade protection",
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
};

export default function Navbar({ forceTheme }: { forceTheme?: "light" | "dark" }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);
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
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isDark
          ? "bg-white/95 backdrop-blur-xl border-b border-black/[0.06] shadow-sm"
          : scrolled
          ? "bg-black/60 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
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
            <button
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
            </button>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                  className="absolute top-[calc(100%+16px)] -left-8 w-[720px] bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] border border-black/[0.06] overflow-hidden"
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

                  {/* Three columns */}
                  <div className="grid grid-cols-3 divide-x divide-black/[0.05]">
                    {Object.values(SERVICES_MENU).map((col) => (
                      <div key={col.label} className="p-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/30 mb-4">
                          {col.label}
                        </p>
                        <div className="space-y-1">
                          {col.items.map((item) => (
                            <a
                              key={item.title}
                              href="#"
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
      </div>
    </nav>
    <BookCallModal isOpen={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </>
  );
}