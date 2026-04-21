"use client";

import { motion } from "framer-motion";
import { Send, Globe, Share2, ArrowUpRight, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] pt-32 pb-16 overflow-hidden border-t border-white/5">
      {/* Decorative Glows for "Mixture of Black and Blue" */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00BAFF]/10 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00BAFF]/5 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-28">
          {/* Logo & Vision */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 mb-8">
              <span className="text-3xl font-black tracking-tighter uppercase text-white">BE</span>
              <span className="text-3xl font-black text-[#00BAFF]">.</span>
            </div>
            <p className="text-white/60 text-[16px] leading-relaxed mb-10 max-w-xs font-medium">
              We deliver the finished state of existence for your vision. High-performance software with zero compromises.
            </p>
            <div className="flex items-center gap-4">
              {[Send, Globe, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00BAFF] hover:border-[#00BAFF]/40 hover:bg-[#00BAFF]/5 transition-all duration-500">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00BAFF] mb-10">Navigation</h4>
            <ul className="space-y-5">
              {["Work", "About", "Blog", "Start Project"].map((link) => (
                <li key={link}>
                  <a href={link === "Start Project" ? "/start" : `/${link.toLowerCase()}`} className="text-white/60 hover:text-white text-[15px] font-bold transition-all duration-300 flex items-center gap-2 group">
                    {link} <ArrowUpRight size={14} className="text-[#00BAFF] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00BAFF] mb-10">Get in Touch</h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00BAFF]/10 flex items-center justify-center text-[#00BAFF] flex-shrink-0"><Mail size={18} /></div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Email Support</div>
                  <a href="mailto:techagency.be@gmail.com" className="text-white font-black hover:text-[#00BAFF] transition-colors tracking-tight">techagency.be@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00BAFF]/10 flex items-center justify-center text-[#00BAFF] flex-shrink-0"><Phone size={18} /></div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Direct Line</div>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+2349155029959" className="text-white font-black hover:text-[#00BAFF] transition-colors tracking-tight">+234 915 502 9959</a>
                    <a href="tel:+2349169877083" className="text-white font-black hover:text-[#00BAFF] transition-colors tracking-tight">+234 916 987 7083</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00BAFF] mb-10">The Insight</h4>
            <p className="text-white/60 text-[14px] leading-relaxed mb-8 font-medium">
              Join 2,000+ visionaries receiving our weekly product & engineering deep dives.
            </p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-6 pr-16 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#00BAFF]/50 transition-all duration-500"
              />
              <button className="absolute right-2 top-2 bottom-2 aspect-square bg-[#00BAFF] text-black rounded-xl flex items-center justify-center hover:bg-white transition-all duration-300">
                <ArrowRight size={20} strokeWidth={3} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="text-white/40 text-[12px] font-bold">
              &copy; {currentYear} BE. Tech Agency.
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20 hidden md:block" />
            <div className="text-white/20 text-[11px] font-medium tracking-wide">
              Handcrafted with precision.
            </div>
          </div>
          <div className="flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
