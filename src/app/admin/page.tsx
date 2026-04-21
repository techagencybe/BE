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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${
                lead.type === "BOOKING" ? "bg-[#00BAFF]/10 text-[#00BAFF]" :
                lead.type === "PROJECT" ? "bg-purple-500/10 text-purple-400" :
                "bg-green-500/10 text-green-400"
              }`}>
                {lead.type}
              </span>
              <span className="text-xs text-white/30">{new Date(lead.createdAt).toLocaleDateString()}</span>
            </div>
            
            <h3 className="text-lg font-bold mb-1">{lead.name || "Unknown"}</h3>
            <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
              <Mail size={14} /> {lead.email}
            </div>

            {lead.details && (
              <div className="bg-white/5 p-3 rounded-lg text-sm text-white/70 mb-4 whitespace-pre-wrap flex-1">
                {lead.details}
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                Status: <span className={lead.status === "SCHEDULED" ? "text-green-400" : "text-yellow-400"}>{lead.status}</span>
              </span>
              {lead.type === "BOOKING" && lead.status !== "SCHEDULED" && (
                <button 
                  onClick={() => setScheduleModal(lead)}
                  className="bg-[#00BAFF] text-black text-xs font-bold uppercase px-4 py-2 rounded-lg hover:bg-white transition-colors"
                >
                  Schedule
                </button>
              )}
            </div>
          </div>
        ))}
        {leads.length === 0 && (
          <div className="col-span-full py-20 text-center text-white/30">
            No leads yet.
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl max-w-md w-full">
            <h2 className="text-xl font-black mb-2">Schedule Meeting</h2>
            <p className="text-white/40 text-sm mb-6">Send a Google Meet invite to {scheduleModal.name || scheduleModal.email}.</p>
            
            <form onSubmit={handleSchedule} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-2">Google Meet Link</label>
                <input
                  type="url"
                  required
                  value={meetLink}
                  onChange={e => setMeetLink(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00BAFF] focus:outline-none"
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={meetDate}
                    onChange={e => setMeetDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00BAFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-2">Time</label>
                  <input
                    type="time"
                    required
                    value={meetTime}
                    onChange={e => setMeetTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00BAFF] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setScheduleModal(null)}
                  className="flex-1 border border-white/10 text-white py-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#00BAFF] text-black font-bold uppercase tracking-wider text-xs py-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50"
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
