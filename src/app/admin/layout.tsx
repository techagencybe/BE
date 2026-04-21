"use client";

import { ReactNode, useState } from "react";
import { 
  Users, Briefcase, FileText, Settings, LogOut, Menu, X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/app/actions/admin";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") return <>{children}</>;

  const navItems = [
    { label: "Leads", icon: Users, href: "/admin" },
    { label: "Case Studies", icon: Briefcase, href: "/admin/case-studies" },
    { label: "Blog", icon: FileText, href: "/admin/blog" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row text-white">
      {/* Mobile Header */}
      <div className="lg:hidden p-6 border-b border-white/[0.05] flex items-center justify-between sticky top-0 z-30 bg-[#050505]/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tight uppercase">BE</span>
          <span className="text-lg font-black text-[#00BAFF]">.</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 bg-white/5 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-72 border-r border-white/[0.05] flex-col fixed inset-y-0 bg-[#080808]">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-10">
            <span className="text-xl font-black tracking-tight uppercase">BE</span>
            <span className="text-xl font-black text-[#00BAFF]">.</span>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-2 border border-white/10 px-2 py-0.5 rounded">Admin</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive ? "bg-[#00BAFF]/10 text-[#00BAFF]" : "text-white/40 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#00BAFF] shadow-[0_0_10px_#00BAFF]" />}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/[0.05]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
          >
            <LogOut size={18} />
            <span className="text-sm font-bold tracking-tight">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar (Slide-over) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#080808] z-50 lg:hidden flex flex-col border-r border-white/10 shadow-2xl"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-tight uppercase">BE</span>
                    <span className="text-xl font-black text-[#00BAFF]">.</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-lg">
                    <X size={20} />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                          isActive ? "bg-[#00BAFF]/10 text-[#00BAFF]" : "text-white/40 hover:bg-white/[0.03] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={18} />
                          <span className="text-sm font-bold tracking-tight">{item.label}</span>
                        </div>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#00BAFF]" />}
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-auto pt-8 border-t border-white/[0.05]">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-bold tracking-tight">Logout</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72">
        {children}
      </div>
    </div>
  );
}
