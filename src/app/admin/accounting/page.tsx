"use client";
import AccountingSection from "@/components/admin/AccountingSection";

export default function AccountingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="p-6 lg:p-10 border-b border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#050505]/80 backdrop-blur sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Financial Ledgers</h1>
          <p className="text-[10px] text-[#00BAFF] font-black uppercase tracking-[0.2em] mt-1">Agency Accounting Command</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#00BAFF]/10 border border-[#00BAFF]/20 rounded-full text-[10px] font-black uppercase tracking-wider text-[#00BAFF] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00BAFF] animate-pulse" />
            Audit Ready
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-7xl mx-auto pb-32">
        <AccountingSection />
      </div>
    </div>
  );
}
