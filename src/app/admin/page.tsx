"use client";
import { useEffect, useState } from "react";
import { getLeads, scheduleMeeting, deleteLead, respondToLead } from "@/app/actions/admin";
import { 
  Loader2, Calendar, Mail, CheckCircle2, 
  Trash2, ChevronRight, MessageCircle, Send, X
} from "lucide-react";

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
  const [responseModal, setResponseModal] = useState<Lead | null>(null);
  const [meetLink, setMeetLink] = useState("");
  const [meetDate, setMeetDate] = useState("");
  const [meetTime, setMeetTime] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"ALL" | "PROJECT" | "BOOKING" | "NEWSLETTER" | "EMAILS">("ALL");

  useEffect(() => {
    if (scheduleModal && scheduleModal.details) {
      const dateMatch = scheduleModal.details.match(/Date: (.*?), Time:/);
      const timeMatch = scheduleModal.details.match(/Time: (.*?)\./);

      if (dateMatch && dateMatch[1]) {
        const dateStr = dateMatch[1];
        const year = new Date().getFullYear();
        const d = new Date(`${dateStr} ${year}`);
        if (!isNaN(d.getTime())) {
          setMeetDate(d.toISOString().split("T")[0]);
        }
      }

      if (timeMatch && timeMatch[1]) {
        const timeStr = timeMatch[1];
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

  async function handleResponse(e: React.FormEvent) {
    e.preventDefault();
    if (!responseModal) return;

    setIsSubmitting(true);
    const res = await respondToLead(responseModal.id, responseMsg);
    setIsSubmitting(false);

    if (res.success) {
      setResponseModal(null);
      setResponseMsg("");
      fetchLeads();
    } else {
      alert(res.error || "Failed to send response");
    }
  }

  async function handleDeleteLead(id: string) {
    if (!confirm("Move this lead to archives? (Email will be retained in the Emails tab)")) return;
    
    const res = await deleteLead(id);
    if (res.success) {
      fetchLeads();
    } else {
      alert(res.error || "Failed to delete lead");
    }
  }

  const filteredLeads = leads.filter(l => {
    if (activeTab === "EMAILS") return true;
    if (activeTab === "ALL") return l.status !== "ARCHIVED";
    return l.type === activeTab && l.status !== "ARCHIVED";
  });
  
  const stats = {
    total: leads.filter(l => l.status !== "ARCHIVED").length,
    projects: leads.filter(l => l.type === "PROJECT" && l.status !== "ARCHIVED").length,
    bookings: leads.filter(l => l.type === "BOOKING" && l.status !== "ARCHIVED").length,
    newsletter: leads.filter(l => l.type === "NEWSLETTER").length,
    archived: leads.filter(l => l.status === "ARCHIVED").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-[#00BAFF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="p-6 lg:p-10 border-b border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#050505]/80 backdrop-blur sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Inbound Leads</h1>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">Growth Command Center</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-black uppercase tracking-wider text-green-400 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Database Synced
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10 pb-32">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Leads", value: stats.total, color: "text-[#00BAFF]" },
            { label: "Projects", value: stats.projects, color: "text-purple-400" },
            { label: "Bookings", value: stats.bookings, color: "text-green-400" },
            { label: "Newsletter", value: stats.newsletter, color: "text-orange-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0A0A0A] border border-white/[0.05] p-6 rounded-3xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-[#0A0A0A] p-1.5 rounded-2xl border border-white/[0.05] w-fit">
          {["ALL", "PROJECT", "BOOKING", "NEWSLETTER", "EMAILS"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? "bg-[#00BAFF] text-black shadow-[0_0_20px_rgba(0,186,255,0.2)]" 
                  : "text-white/30 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "EMAILS" ? (
          <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-[32px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/30">Lead Name</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/30">Email Address</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/30">Type</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/30">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-5 text-sm font-bold">{lead.name || "N/A"}</td>
                      <td className="px-8 py-5 text-sm text-[#00BAFF] font-medium">{lead.email}</td>
                      <td className="px-8 py-5">
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 text-white/40">
                          {lead.type}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold capitalize">
                        <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                          lead.status === "ARCHIVED" ? "bg-red-400/10 text-red-400" : "bg-green-500/10 text-green-400"
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredLeads.length === 0 && (
              <div className="py-20 text-center text-white/20 font-bold uppercase tracking-widest text-sm">No emails collected yet</div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div 
                key={lead.id} 
                className="group bg-[#0A0A0A] border border-white/[0.05] rounded-2xl lg:rounded-3xl p-5 lg:p-8 hover:bg-[#0F0F0F] hover:border-[#00BAFF]/20 transition-all duration-500 relative overflow-hidden"
              >
              <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] pointer-events-none opacity-20 ${
                lead.status === "SCHEDULED" ? "bg-green-500" : 
                lead.status === "COMPLETED" ? "bg-purple-500" : "bg-[#00BAFF]"
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
                      lead.status === "SCHEDULED" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                      lead.status === "COMPLETED" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
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
                  {lead.type === "PROJECT" && lead.status === "PENDING" && (
                    <button 
                      onClick={() => setResponseModal(lead)}
                      className="w-full lg:w-48 bg-purple-500 text-white text-[11px] font-black uppercase tracking-widest py-3.5 lg:py-4 rounded-xl lg:rounded-2xl hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      Respond via Email <MessageCircle size={14} />
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
                    Archive Lead <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredLeads.length === 0 && (
            <div className="py-24 lg:py-32 text-center">
              <div className="text-white/10 font-black text-4xl lg:text-6xl mb-4">Empty</div>
              <p className="text-white/30 font-medium text-sm">No {activeTab.toLowerCase()} leads yet.</p>
            </div>
          )}
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl max-w-md w-full relative overflow-hidden">
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
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#00BAFF] focus:outline-none transition-all placeholder:text-white/10 text-white"
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
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#00BAFF] focus:outline-none transition-all [color-scheme:dark] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block ml-1">Time</label>
                  <input
                    type="time"
                    required
                    value={meetTime}
                    onChange={e => setMeetTime(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-[#00BAFF] focus:outline-none transition-all [color-scheme:dark] text-white"
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

      {/* Response Modal */}
      {responseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl max-w-2xl w-full relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black mb-1">Send Response</h2>
                <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">Replying to {responseModal.name || responseModal.email}</p>
              </div>
              <button onClick={() => setResponseModal(null)} className="text-white/20 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleResponse} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block ml-1">Email Content</label>
                <textarea
                  required
                  rows={8}
                  value={responseMsg}
                  onChange={e => setResponseMsg(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:border-purple-500 focus:outline-none transition-all placeholder:text-white/10 text-white resize-none leading-relaxed"
                  placeholder="Type your professional response here..."
                />
              </div>

              <div className="bg-white/5 p-4 rounded-xl text-[10px] text-white/40 leading-relaxed italic border border-white/[0.05]">
                Note: This message will be wrapped in a premium BE. Agency template and sent directly to the user.
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setResponseModal(null)}
                  className="flex-1 border border-white/5 text-white/40 text-[12px] font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-white/5 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-purple-500 text-white text-[12px] font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                  Send Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
