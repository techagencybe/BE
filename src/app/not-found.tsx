"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden">
      <Navbar />
      
      {/* Background patterns */}
      <div 
        aria-hidden 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 40px)" }}
      />
      <div 
        aria-hidden 
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,186,255,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00BAFF] block mb-8">
            Error 404
          </span>
          <h1 className="text-[clamp(80px,20vw,180px)] font-black leading-[0.8] tracking-[-0.08em] mb-8">
            Lost in the
            <br />
            <span className="text-white/60">System.</span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/40 max-w-md mx-auto mb-12 leading-relaxed">
            The page you are looking for has been moved, deleted, or never existed in this dimension.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/"
              className="inline-flex items-center gap-3 bg-white text-black text-[13px] font-black uppercase tracking-widest px-10 py-5 rounded-full hover:bg-[#00BAFF] hover:text-white transition-all duration-300 active:scale-95"
            >
              <Home size={18} /> Back to Base
            </a>
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 text-[13px] font-bold text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-widest"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Go Back
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer-like decoration */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center opacity-10">
        <div className="flex items-center gap-1">
          <span className="text-xl font-black tracking-tighter uppercase">BE</span>
          <span className="text-xl font-black text-[#00BAFF]">.</span>
        </div>
      </div>
    </main>
  );
}
