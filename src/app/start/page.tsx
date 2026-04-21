"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Send,
  CheckCircle2,
  Asterisk,
  Command,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import BookCallModal from "@/components/BookCallModal";
import { startProject } from "@/app/actions/leads";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function StartProjectPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const res = await startProject(formData);
    setIsSubmitting(false);
    
    if (res.success) {
      setSubmitted(true);
    } else {
      alert(res.error || "Something went wrong.");
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
        <Navbar />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-[#00BAFF]/20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-[#00BAFF]" />
          </div>
          <h1 className="text-4xl font-black mb-4 tracking-tight">We&apos;re on it.</h1>
          <p className="text-white/50 leading-relaxed mb-8">
            Thanks for reaching out. We&apos;ve received your project details 
            and one of our founders (Euodia or Bolaji) will be in touch within 24 hours.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-widest text-[#00BAFF] hover:text-white transition-colors"
          >
            Back to Home <ArrowRight size={16} />
          </a>
        </motion.div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white text-black pt-24 md:pt-32 pb-16 md:pb-20 px-6">
        <Navbar forceTheme="dark" />
        {/* Background decoration */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
        {/* Left Side: Context */}
        <div className="max-w-md mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00BAFF] block mb-6">
              Start Your Evolution
            </span>
            <h1 className="text-[48px] md:text-[60px] lg:text-[72px] font-black leading-[0.9] tracking-[-0.05em] mb-6 md:mb-10">
              Let&apos;s build
              <br />
              <span className="text-black/20">something.</span>
            </h1>
            <p className="text-black/50 text-base md:text-[18px] leading-relaxed mb-8 md:mb-12">
              Tell us about your vision. Whether it&apos;s a complex SaaS platform, 
              a custom AI agent, or a mobile revolution, we&apos;re ready to help you BE it.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                  <Command size={20} className="text-[#00BAFF]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-black uppercase tracking-tight">Rapid Deployment</h4>
                  <p className="text-[13px] text-black/40">From concept to launch in weeks, not months.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={20} className="text-[#00BAFF]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-black uppercase tracking-tight">Founder-Led</h4>
                  <p className="text-[13px] text-black/40">Direct access to Euodia and Bolaji throughout the build.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] flex items-center justify-center flex-shrink-0">
                  <Asterisk size={20} className="text-[#00BAFF]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-black uppercase tracking-tight">Performance First</h4>
                  <p className="text-[13px] text-black/40">Zero-compromise engineering for scale and speed.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="bg-[#F7F8FA] rounded-3xl md:rounded-[40px] p-6 md:p-12 border border-black/[0.04] shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-black/30 block mb-3">
                  What&apos;s your name?
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white border border-black/[0.06] rounded-2xl px-6 py-4 text-[15px] font-medium focus:outline-none focus:border-[#00BAFF] transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-black/30 block mb-3">
                  Work Email
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  className="w-full bg-white border border-black/[0.06] rounded-2xl px-6 py-4 text-[15px] font-medium focus:outline-none focus:border-[#00BAFF] transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-black/30 block mb-3">
                  Project Type
                </label>
                <select name="projectType" className="w-full bg-white border border-black/[0.06] rounded-2xl px-6 py-4 text-[15px] font-medium focus:outline-none focus:border-[#00BAFF] transition-all appearance-none">
                  <option value="SaaS / Web App">SaaS / Web App</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="AI & Automation">AI & Automation</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Design System">Design System</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-black/30 block mb-3">
                  How can we help you BE more?
                </label>
                <textarea
                  required
                  name="details"
                  rows={4}
                  placeholder="Tell us about your goals, timelines, and technical challenges..."
                  className="w-full bg-white border border-black/[0.06] rounded-2xl px-6 py-4 text-[15px] font-medium focus:outline-none focus:border-[#00BAFF] transition-all resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white rounded-full py-5 text-[14px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#00BAFF] transition-all duration-300 group shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : (
                <>Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
              )}
            </button>

            <p className="text-center text-[12px] text-black/30 font-medium">
              Prefer a quick chat? <button type="button" onClick={() => setBookCallOpen(true)} className="text-black font-bold hover:text-[#00BAFF] transition-colors">Book a call instead</button>.
            </p>
          </form>
        </motion.div>
      </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black/[0.05] px-6 py-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-black">
          <div className="flex items-center gap-1">
            <span className="text-lg font-black tracking-tight uppercase">BE</span>
            <span className="text-lg font-black text-[#00BAFF]">.</span>
          </div>
          <p className="text-[12px] text-black/25">
            © {new Date().getFullYear()} BE. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[12px] text-black/35 font-semibold">
            <a href="#" className="hover:text-black transition-colors">RSS Feed</a>
            <a href="#" className="hover:text-black transition-colors">Newsletter</a>
            <a href="mailto:hello@be.agency" className="hover:text-[#00BAFF] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <BookCallModal isOpen={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </>
  );
}
