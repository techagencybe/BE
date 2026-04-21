"use client";
import { useEffect, useState } from "react";
import { getLeads, scheduleMeeting, logoutAdmin, deleteLead } from "@/app/actions/admin";
import { 
  Loader2, Calendar, Mail, FileText, CheckCircle2, LogOut, 
  Trash2, LayoutDashboard, Users, Briefcase, Settings, ChevronRight,
  Menu, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Lead = {
  id: string;
  type: string;
  name: string | null;
  email: string;
  details: string | null;
  status: string;
  meetingLink: string | null;
  meetingTime: Date | null;
  createdAt: Date;
};

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [scheduleModal, setScheduleModal] = useState<Lead | null>(null);
  const [meetLink, setMeetLink] = useState("");
  const [meetDate, setMeetDate] = useState("");
  const [meetTime, setMeetTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (scheduleModal && scheduleModal.details) {
      // Parse details: "Date: April 22, Time: 10:00 AM"
      const dateMatch = scheduleModal.details.match(/Date: (.*?), Time:/);
      const timeMatch = scheduleModal.details.match(/Time: (.*?)\./);

      if (dateMatch && dateMatch[1]) {
        const dateStr = dateMatch[1]; // e.g. "April 22"
        const year = new Date().getFullYear();
        const d = new Date(`${dateStr} ${year}`);
        if (!isNaN(d.getTime())) {
          setMeetDate(d.toISOString().split("T")[0]);
        }
      }

      if (timeMatch && timeMatch[1]) {
        const timeStr = timeMatch[1]; // e.g. "10:00 AM"
        // Convert "10:00 AM" to "10:00" or "22:00"
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":");
        if (hours === "12") hours = "00";
        if (modifier === "PM") hours = (parseInt(hours, 10) + 12).toString();
        const formattedTime = `${hours.padStart(2, "0")}:${minutes}`;
        setMeetTime(formattedTime);
      }
    } else {
      setMeetDate("");
      setMeetTime("");
      setMeetLink("");
    }
  }, [scheduleModal]);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const res = await getLeads();
    if (res.success && res.leads) {
      setLeads(res.leads);
    }
    setLoading(false);
  }

  async function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    if (!scheduleModal) return;
    
    setIsSubmitting(true);
    const dateObj = new Date(`${meetDate}T${meetTime}`);
    const res = await scheduleMeeting(scheduleModal.id, meetLink, dateObj);
    setIsSubmitting(false);

    if (res.success) {
      setScheduleModal(null);
      fetchLeads();
    } else {
      alert(res.error || "Failed to schedule meeting");
    }
  }

  async function handleDeleteLead(id: string) {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    const res = await deleteLead(id);
    if (res.success) {
      fetchLeads();
    } else {
      alert(res.error || "Failed to delete lead");
    }
  }

  async function handleLogout() {
    await logoutAdmin();
    window.location.href = "/admin/login";
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#050505]"><Loader2 className="animate-spin text-[#00BAFF]" /></div>;
  }

  const navItems = [
    { label: "Leads", icon: Users, active: true },
    { label: "Case Studies", icon: Briefcase },
    { label: "Blog", icon: FileText },
    { label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden p-6 border-b border-white/[0.05] flex items-center justify-between sticky top-0 z-30 bg-[#050505]/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tight uppercase text-white">BE</span>
          <span className="text-lg font-black text-[#00BAFF]">.</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 bg-white/5 rounded-lg text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-72 border-r border-white/[0.05] flex-col fixed inset-y-0 bg-[#080808]">
        <div className="p-8 text-white">
          <div className="flex items-center gap-2 mb-10">
            <span className="text-xl font-black tracking-tight uppercase">BE</span>
            <span className="text-xl font-black text-[#00BAFF]">.</span>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-2 border border-white/10 px-2 py-0.5 rounded">Admin</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                  item.active ? "bg-[#00BAFF]/10 text-[#00BAFF]" : "text-white/40 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} />
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                </div>
                {item.active && <div className="w-1.5 h-1.5 rounded-full bg-[#00BAFF] shadow-[0_0_10px_#00BAFF]" />}
              </button>
            ))}
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
              <div className="p-8 flex flex-col h-full text-white">
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
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                        item.active ? "bg-[#00BAFF]/10 text-[#00BAFF]" : "text-white/40 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} />
                        <span className="text-sm font-bold tracking-tight">{item.label}</span>
                      </div>
                      {item.active && <div className="w-1.5 h-1.5 rounded-full bg-[#00BAFF]" />}
                    </button>
                  ))}
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

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 text-white">
        <header className="p-6 lg:p-8 border-b border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#050505]/80 backdrop-blur sticky top-[73px] lg:top-0 z-20">
          <div>
            <h1 className="text-xl font-black tracking-tight">Inbound Leads</h1>
            <p className="text-[11px] text-white/30 font-medium uppercase tracking-widest">Manage your potential clients</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-[10px] font-black uppercase tracking-wider text-white/40 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live Updates Active
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          <div className="space-y-4">
            {leads.map((lead) => (
              <div 
                key={lead.id} 
                className="group bg-[#0A0A0A] border border-white/[0.05] rounded-2xl lg:rounded-3xl p-5 lg:p-8 hover:bg-[#0F0F0F] hover:border-[#00BAFF]/20 transition-all duration-500 relative overflow-hidden text-white"
              >
                {/* Status Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] pointer-events-none opacity-20 ${
                  lead.status === "SCHEDULED" ? "bg-green-500" : "bg-[#00BAFF]"
                }`} />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 relative z-10">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-lg ${
                        lead.type === "BOOKING" ? "bg-[#00BAFF]/10 text-[#00BAFF]" :
                        lead.type === "PROJECT" ? "bg-purple-500/10 text-purple-400" :
                        "bg-green-500/10 text-green-400"
                      }`}>
                        {lead.type}
                      </span>
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-lg border ${
                        lead.status === "SCHEDULED" 
                          ? "bg-green-500/10 text-green-400 border-green-500/20" 
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }`}>
                        {lead.status}
                      </span>
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                        {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl lg:text-2xl font-black tracking-tight mb-1">{lead.name || "Unknown Lead"}</h3>
                      <div className="flex items-center gap-2 text-white/40 font-medium text-xs lg:text-sm truncate">
                        <Mail size={14} className="text-[#00BAFF]" /> {lead.email}
                      </div>
                    </div>

                    {lead.details && (
                      <div className="bg-white/[0.03] border border-white/[0.05] p-4 lg:p-5 rounded-xl lg:rounded-2xl text-[13px] lg:text-[14px] text-white/60 leading-relaxed max-w-2xl">
                        <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-2">Requirements / Details</div>
                        {lead.details}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 lg:gap-4">
                    {lead.type === "BOOKING" && lead.status !== "SCHEDULED" && (
                      <button 
                        onClick={() => setScheduleModal(lead)}
                        className="w-full lg:w-48 bg-[#00BAFF] text-black text-[11px] font-black uppercase tracking-widest py-3.5 lg:py-4 rounded-xl lg:rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,186,255,0.2)] active:scale-[0.98]"
                      >
                        Schedule Meeting
                      </button>
                    )}
                    {lead.status === "SCHEDULED" && lead.meetingLink && (
                      <a 
                        href={lead.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full lg:w-48 bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-widest py-3.5 lg:py-4 rounded-xl lg:rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Join Meeting <Calendar size={14} />
                      </a>
                    )}
                    <button 
                      onClick={() => handleDeleteLead(lead.id)}
                      className="w-full lg:w-48 border border-white/5 text-white/30 text-[10px] font-black uppercase tracking-widest py-3.5 lg:py-4 rounded-xl lg:rounded-2xl hover:text-red-400 hover:border-red-400/20 hover:bg-red-400/5 transition-all flex items-center justify-center gap-2"
                    >
                      Delete Lead <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {leads.length === 0 && (
              <div className="py-24 lg:py-32 text-center">
                <div className="text-white/10 font-black text-4xl lg:text-6xl mb-4">Empty</div>
                <p className="text-white/30 font-medium text-sm">No leads have been submitted yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 text-white">
          <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl max-w-md w-full relative overflow-hidden">
             {/* Modal Header */}
            <h2 className="text-xl font-black mb-2">Schedule Meeting</h2>
            <p className="text-white/40 text-sm mb-6">Send a Google Meet invite to {scheduleModal.name || scheduleModal.email}.</p>
            
            <form onSubmit={handleSchedule} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block ml-1">Google Meet Link</label>
                <input
                  type="url"
                  required
                  value={meetLink}
                  onChange={e => setMeetLink(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#00BAFF] focus:outline-none transition-all placeholder:text-white/10"
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block ml-1">Date</label>
                  <input
                    type="date"
                    required
                    value={meetDate}
                    onChange={e => setMeetDate(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#00BAFF] focus:outline-none transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block ml-1">Time</label>
                  <input
                    type="time"
                    required
                    value={meetTime}
                    onChange={e => setMeetTime(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#00BAFF] focus:outline-none transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setScheduleModal(null)}
                  className="flex-1 border border-white/5 text-white/40 text-[12px] font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-white/5 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#00BAFF] text-black text-[12px] font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,186,255,0.2)] disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
