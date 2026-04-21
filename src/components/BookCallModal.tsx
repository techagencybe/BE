"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Clock, CheckCircle2, Calendar, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import { bookCall } from "@/app/actions/leads";

/* ─── Types ─── */
type Step = 1 | 2 | 3 | 4;

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM",
];

const MEETING_TYPES = [
  { id: "intro", label: "Intro Call", duration: "15 min", desc: "Get to know each other & explore fit" },
  { id: "discovery", label: "Discovery Session", duration: "30 min", desc: "Deep dive into your project requirements" },
  { id: "technical", label: "Technical Review", duration: "45 min", desc: "Architecture, stack & feasibility review" },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

/* ─── Step indicators ─── */
const STEPS = ["Meeting Type", "Date & Time", "Your Details", "Confirmed"];

/* ─── Modal ─── */
export default function BookCallModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const today = new Date();
  const [step, setStep] = useState<Step>(1);
  const [meetingType, setMeetingType] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  function reset() {
    setStep(1);
    setMeetingType(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: "", email: "", message: "" });
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 400);
  }

  function prevMonth() {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  }
  function nextMonth() {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  }

  const isPastDay = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };
  const isWeekend = (day: number) => {
    const dow = new Date(currentYear, currentMonth, day).getDay();
    return dow === 0 || dow === 6;
  };

  const selectedMeetingType = MEETING_TYPES.find(m => m.id === meetingType);

  async function handleConfirm() {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("company", `Meeting Type: ${selectedMeetingType?.label}, Date: ${MONTHS[currentMonth]} ${selectedDate}, Time: ${selectedTime}. Message: ${form.message}`);
    
    const res = await bookCall(formData);
    setIsSubmitting(false);
    
    if (res.success) {
      setStep(4);
    } else {
      alert(res.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-6 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-[680px] bg-white rounded-2xl md:rounded-3xl shadow-[0_32px_100px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col"
              style={{ maxHeight: "92vh" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 md:px-7 py-4 md:py-5 border-b border-black/[0.06] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00BAFF]/10 flex items-center justify-center">
                    <Calendar size={15} className="text-[#00BAFF]" />
                  </div>
                  <div>
                    <h2 className="text-[14px] md:text-[15px] font-black text-black tracking-tight leading-tight">Book a Call</h2>
                    <p className="text-[10px] md:text-[11px] text-black/40">BE. Software Agency</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center transition-colors"
                >
                  <X size={14} className="text-black/50" />
                </button>
              </div>

              {/* Step Progress */}
              <div className="px-5 md:px-7 py-3 md:py-4 border-b border-black/[0.06] flex-shrink-0">
                <div className="flex items-center gap-0">
                  {STEPS.map((label, i) => {
                    const stepNum = (i + 1) as Step;
                    const isActive = step === stepNum;
                    const isDone = step > stepNum;
                    return (
                      <div key={label} className="flex items-center flex-1 min-w-0">
                        <div className="flex flex-col items-center gap-1 flex-shrink-0">
                          <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-black transition-colors duration-300 ${
                            isDone ? "bg-[#00BAFF] text-white" :
                            isActive ? "bg-black text-white" :
                            "bg-black/[0.06] text-black/30"
                          }`}>
                            {isDone ? <CheckCircle2 size={10} className="md:w-3 md:h-3" /> : stepNum}
                          </div>
                          <span className={`text-[8px] md:text-[9px] font-bold uppercase tracking-wider whitespace-nowrap ${
                            isActive ? "text-black" : "text-black/30"
                          }`}>{label}</span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className={`h-[1px] flex-1 mx-1.5 md:mx-2 transition-colors duration-300 ${
                            isDone ? "bg-[#00BAFF]" : "bg-black/[0.08]"
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {/* STEP 1: Meeting Type */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 md:p-7"
                    >
                      <h3 className="text-[17px] md:text-[18px] font-black text-black mb-1">What kind of call?</h3>
                      <p className="text-[12px] md:text-[13px] text-black/45 mb-5 md:mb-6">Choose the meeting type that fits your needs.</p>
                      <div className="space-y-2 md:space-y-3">
                        {MEETING_TYPES.map(mt => (
                          <button
                            key={mt.id}
                            onClick={() => setMeetingType(mt.id)}
                            className={`w-full text-left p-3.5 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all duration-200 ${
                              meetingType === mt.id
                                ? "border-[#00BAFF] bg-[#00BAFF]/[0.04]"
                                : "border-black/[0.07] hover:border-black/20"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[14px] md:text-[15px] font-black text-black">{mt.label}</span>
                              <span className={`text-[10px] md:text-[11px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                                meetingType === mt.id ? "bg-[#00BAFF]/10 text-[#00BAFF]" : "bg-black/[0.05] text-black/40"
                              }`}>
                                <Clock size={10} /> {mt.duration}
                              </span>
                            </div>
                            <p className="text-[11px] md:text-[12px] text-black/45 mt-0.5 md:mt-1">{mt.desc}</p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Date & Time */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 md:p-7"
                    >
                      <h3 className="text-[17px] md:text-[18px] font-black text-black mb-1">Pick a date & time</h3>
                      <p className="text-[12px] md:text-[13px] text-black/45 mb-5 md:mb-6 leading-tight">All times shown in your local timezone.</p>

                      {/* Calendar */}
                      <div className="bg-[#F8F9FA] rounded-xl md:rounded-2xl p-4 md:p-5 mb-4 md:mb-5">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[13px] md:text-[14px] font-black text-black">
                            {MONTHS[currentMonth]} {currentYear}
                          </span>
                          <div className="flex gap-1">
                            <button onClick={prevMonth} className="w-7 h-7 rounded-lg bg-white border border-black/[0.08] flex items-center justify-center hover:bg-black/[0.04] transition-colors">
                              <ChevronLeft size={13} />
                            </button>
                            <button onClick={nextMonth} className="w-7 h-7 rounded-lg bg-white border border-black/[0.08] flex items-center justify-center hover:bg-black/[0.04] transition-colors">
                              <ChevronRight size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Day headers */}
                        <div className="grid grid-cols-7 mb-1 md:mb-2">
                          {DAYS.map(d => (
                            <div key={d} className="text-center text-[9px] md:text-[10px] font-bold text-black/30 uppercase tracking-wider py-1">
                              {d}
                            </div>
                          ))}
                        </div>

                        {/* Day grid */}
                        <div className="grid grid-cols-7 gap-y-1">
                          {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const past = isPastDay(day);
                            const weekend = isWeekend(day);
                            const disabled = past || weekend;
                            const selected = selectedDate === day;
                            return (
                              <button
                                key={day}
                                disabled={disabled}
                                onClick={() => setSelectedDate(day)}
                                className={`h-7 md:h-8 w-full rounded-lg text-[12px] md:text-[13px] font-semibold transition-all duration-150 ${
                                  selected
                                    ? "bg-[#00BAFF] text-white font-black"
                                    : disabled
                                    ? "text-black/15 cursor-not-allowed"
                                    : "hover:bg-white hover:shadow-sm text-black/70 hover:text-black"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time slots */}
                      {selectedDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-[11px] font-bold text-black/40 uppercase tracking-wider mb-2.5">
                            Available times — {MONTHS[currentMonth]} {selectedDate}
                          </p>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 md:gap-2">
                            {TIME_SLOTS.map(t => (
                              <button
                                key={t}
                                onClick={() => setSelectedTime(t)}
                                className={`py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-[11px] font-bold border transition-all duration-150 ${
                                  selectedTime === t
                                    ? "bg-[#00BAFF] text-white border-[#00BAFF]"
                                    : "border-black/[0.08] text-black/60 hover:border-[#00BAFF]/40 hover:text-[#00BAFF]"
                                }`}
                              >
                                {t.replace(" AM", "AM").replace(" PM", "PM")}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 3: Details */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.2 }}
                      className="p-7"
                    >
                      {/* Booking summary */}
                      <div className="bg-[#00BAFF]/[0.06] border border-[#00BAFF]/20 rounded-2xl p-4 mb-6 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#00BAFF]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar size={16} className="text-[#00BAFF]" />
                        </div>
                        <div>
                          <p className="text-[13px] font-black text-black">{selectedMeetingType?.label}</p>
                          <p className="text-[11px] text-black/50 mt-0.5">
                            {MONTHS[currentMonth]} {selectedDate}, {currentYear} · {selectedTime} · {selectedMeetingType?.duration}
                          </p>
                        </div>
                      </div>

                      <h3 className="text-[18px] font-black text-black mb-1">Your details</h3>
                      <p className="text-[13px] text-black/45 mb-5">We'll send a calendar invite to your email.</p>

                      <div className="space-y-3">
                        <div className="relative">
                          <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
                          <input
                            type="text"
                            placeholder="Full name"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-black/[0.1] bg-[#F8F9FA] text-[14px] font-medium placeholder:text-black/30 focus:outline-none focus:border-[#00BAFF] transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
                          <input
                            type="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-black/[0.1] bg-[#F8F9FA] text-[14px] font-medium placeholder:text-black/30 focus:outline-none focus:border-[#00BAFF] transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <MessageSquare size={14} className="absolute left-4 top-4 text-black/30" />
                          <textarea
                            placeholder="What would you like to discuss? (optional)"
                            value={form.message}
                            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                            rows={3}
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-black/[0.1] bg-[#F8F9FA] text-[14px] font-medium placeholder:text-black/30 focus:outline-none focus:border-[#00BAFF] transition-colors resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Confirmed */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-7 flex flex-col items-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 rounded-full bg-[#00BAFF]/10 flex items-center justify-center mb-6 mt-4"
                      >
                        <CheckCircle2 size={36} className="text-[#00BAFF]" />
                      </motion.div>
                      <h3 className="text-[24px] font-black text-black mb-2">You&apos;re booked!</h3>
                      <p className="text-[14px] text-black/50 max-w-sm leading-relaxed mb-6">
                        We&apos;ve received your booking request. A calendar invite will be sent to{" "}
                        <span className="font-bold text-black">{form.email}</span> shortly.
                      </p>
                      <div className="bg-[#F8F9FA] rounded-2xl p-5 w-full text-left mb-6 space-y-2">
                        <div className="flex justify-between text-[12px]">
                          <span className="text-black/40 font-semibold">Meeting</span>
                          <span className="font-black text-black">{selectedMeetingType?.label}</span>
                        </div>
                        <div className="flex justify-between text-[12px]">
                          <span className="text-black/40 font-semibold">Date</span>
                          <span className="font-black text-black">{MONTHS[currentMonth]} {selectedDate}, {currentYear}</span>
                        </div>
                        <div className="flex justify-between text-[12px]">
                          <span className="text-black/40 font-semibold">Time</span>
                          <span className="font-black text-black">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between text-[12px]">
                          <span className="text-black/40 font-semibold">Duration</span>
                          <span className="font-black text-black">{selectedMeetingType?.duration}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleClose}
                        className="bg-black text-white text-[12px] font-black uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-[#00BAFF] transition-colors duration-300"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer actions */}
              {step !== 4 && (
                <div className="px-5 md:px-7 py-4 md:py-5 border-t border-black/[0.06] flex items-center justify-between flex-shrink-0">
                  <button
                    onClick={() => step > 1 ? setStep(s => (s - 1) as Step) : handleClose()}
                    className="flex items-center gap-1.5 text-[11px] md:text-[12px] font-bold text-black/40 hover:text-black transition-colors"
                  >
                    <ChevronLeft size={14} /> {step === 1 ? "Cancel" : "Back"}
                  </button>
                  <button
                    disabled={
                      (step === 1 && !meetingType) ||
                      (step === 2 && (!selectedDate || !selectedTime)) ||
                      (step === 3 && (!form.name.trim() || !form.email.trim())) ||
                      isSubmitting
                    }
                    onClick={() => {
                      if (step === 3) handleConfirm();
                      else setStep(s => (s + 1) as Step);
                    }}
                    className="bg-black text-white text-[11px] md:text-[12px] font-black uppercase tracking-wider px-6 md:px-7 py-3 md:py-3.5 rounded-full hover:bg-[#00BAFF] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black flex items-center justify-center min-w-[120px] md:min-w-[140px]"
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : step === 3 ? "Confirm Booking" : "Continue"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
