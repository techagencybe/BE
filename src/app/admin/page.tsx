"use client";
import { useEffect, useState } from "react";
import { getLeads, scheduleMeeting, logoutAdmin } from "@/app/actions/admin";
import { Loader2, Calendar, Mail, FileText, CheckCircle2, LogOut } from "lucide-react";

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

  async function handleLogout() {
    await logoutAdmin();
    window.location.href = "/admin/login";
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#00BAFF]" /></div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black">Admin Dashboard</h1>
          <p className="text-white/40">Manage your leads and case studies.</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Tabs (Placeholder for RBAC Compartments) */}
      <div className="flex border-b border-white/10 mb-8">
        <button className="px-6 py-3 border-b-2 border-[#00BAFF] text-white font-bold">Leads</button>
        <button className="px-6 py-3 text-white/40 font-bold hover:text-white">Case Studies</button>
        <button className="px-6 py-3 text-white/40 font-bold hover:text-white">Blog</button>
        <button className="px-6 py-3 text-white/40 font-bold hover:text-white">Team</button>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div 
            key={lead.id} 
            className="group bg-[#0A0A0A] border border-white/[0.05] rounded-3xl p-8 hover:bg-[#0F0F0F] hover:border-[#00BAFF]/20 transition-all duration-500 relative overflow-hidden"
          >
            {/* Status Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] pointer-events-none opacity-20 ${
              lead.status === "SCHEDULED" ? "bg-green-500" : "bg-[#00BAFF]"
            }`} />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg ${
                    lead.type === "BOOKING" ? "bg-[#00BAFF]/10 text-[#00BAFF]" :
                    lead.type === "PROJECT" ? "bg-purple-500/10 text-purple-400" :
                    "bg-green-500/10 text-green-400"
                  }`}>
                    {lead.type}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border ${
                    lead.status === "SCHEDULED" 
                      ? "bg-green-500/10 text-green-400 border-green-500/20" 
                      : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  }`}>
                    {lead.status}
                  </span>
                  <span className="text-[11px] font-bold text-white/20 uppercase tracking-widest">
                    {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black tracking-tight mb-1">{lead.name || "Unknown Lead"}</h3>
                  <div className="flex items-center gap-2 text-white/40 font-medium text-sm">
                    <Mail size={14} className="text-[#00BAFF]" /> {lead.email}
                  </div>
                </div>

                {lead.details && (
                  <div className="bg-white/[0.03] border border-white/[0.05] p-5 rounded-2xl text-[14px] text-white/60 leading-relaxed max-w-2xl">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Requirements / Details</div>
                    {lead.details}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4">
                {lead.type === "BOOKING" && lead.status !== "SCHEDULED" && (
                  <button 
                    onClick={() => setScheduleModal(lead)}
                    className="w-full lg:w-48 bg-[#00BAFF] text-black text-[12px] font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,186,255,0.2)] active:scale-[0.98]"
                  >
                    Schedule Meeting
                  </button>
                )}
                {lead.status === "SCHEDULED" && lead.meetingLink && (
                  <a 
                    href={lead.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full lg:w-48 bg-white/5 border border-white/10 text-white text-[12px] font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Join Meeting <Calendar size={14} />
                  </a>
                )}
                <button className="w-full lg:w-48 border border-white/5 text-white/30 text-[11px] font-black uppercase tracking-widest py-4 rounded-2xl hover:text-white hover:border-white/10 transition-all">
                  Archive Lead
                </button>
              </div>
            </div>
          </div>
        ))}
        {leads.length === 0 && (
          <div className="py-32 text-center">
            <div className="text-white/10 font-black text-6xl mb-4">Empty</div>
            <p className="text-white/30 font-medium">No leads have been submitted yet.</p>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl max-w-md w-full">
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
