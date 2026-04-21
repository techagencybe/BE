"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAdminSetup, sendSetupOTP, verifySetupOTP } from "@/app/actions/admin";
import { Loader2 } from "lucide-react";

export default function AdminSetup() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAdminSetup().then((res) => {
      if (!res.needsSetup) {
        router.push("/admin/login");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  async function handleSendOTP(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await sendSetupOTP(email);
    setLoading(false);
    if (res.success) {
      setStep(2);
    } else {
      setError(res.error || "Failed to send OTP");
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await verifySetupOTP(email, otp, password);
    setLoading(false);
    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "Failed to verify");
    }
  }

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#00BAFF]" /></div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-2xl font-black mb-2">Master Admin Setup</h1>
        <p className="text-white/40 text-sm mb-6">Initialize the BE. Agency dashboard.</p>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-6">{error}</div>}

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-2">Official Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00BAFF] focus:outline-none transition-colors"
                placeholder="techagency.be@gmail.com"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#00BAFF] text-black font-black uppercase tracking-wider text-xs py-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-2">Enter OTP</label>
              <input
                type="text"
                required
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00BAFF] focus:outline-none transition-colors"
                placeholder="123456"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-2">Create Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00BAFF] focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#00BAFF] text-black font-black uppercase tracking-wider text-xs py-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Create"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
