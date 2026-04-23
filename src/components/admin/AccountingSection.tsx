"use client";
import { useState, useEffect } from "react";
import { 
  Plus, Calendar, Trash2, Loader2, TrendingUp, 
  TrendingDown, DollarSign, History, AlertCircle, CheckCircle2, Circle
} from "lucide-react";
import { 
  getTransactions, 
  addTransaction, 
  deleteTransaction, 
  getAccountingStats,
  toggleRepayment
} from "@/app/actions/accounting";

type Transaction = {
  id: string;
  type: "REVENUE" | "EXPENSE";
  amount: number;
  description: string;
  externalFunding: number;
  isRepaid: boolean;
  date: Date;
};

export default function AccountingSection() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    revenue: 0,
    expenses: 0,
    profit: 0,
    totalExternalFunding: 0,
    totalPendingRepayments: 0
  });
  
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    type: "REVENUE" as "REVENUE" | "EXPENSE",
    amount: "",
    description: "",
    externalFunding: "",
    date: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  async function fetchData() {
    setLoading(true);
    const [tRes, sRes] = await Promise.all([
      getTransactions(selectedMonth, selectedYear),
      getAccountingStats(selectedMonth, selectedYear)
    ]);

    if (tRes.success && tRes.transactions) {
      setTransactions(tRes.transactions as Transaction[]);
    }
    if (sRes.success && sRes.stats) {
      setStats(sRes.stats);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const invested = parseFloat(formData.amount) || 0;
    const borrowed = parseFloat(formData.externalFunding) || 0;
    
    const res = await addTransaction({
      ...formData,
      amount: invested + borrowed,
      externalFunding: borrowed
    });
    setIsSubmitting(false);

    if (res.success) {
      setShowAddModal(false);
      setFormData({
        type: "REVENUE",
        amount: "",
        description: "",
        externalFunding: "",
        date: new Date().toISOString().split("T")[0]
      });
      fetchData();
    } else {
      alert(res.error || "Failed to add record");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this record?")) return;
    const res = await deleteTransaction(id);
    if (res.success) fetchData();
  }

  async function handleToggleRepaid(id: string, current: boolean) {
    const res = await toggleRepayment(id, !current);
    if (res.success) fetchData();
  }

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#00BAFF] mb-4" size={32} />
        <p className="text-white/30 font-black uppercase tracking-widest text-[10px]">Syncing Ledgers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Pending Alert */}
      {stats.totalPendingRepayments > 0 && (
        <div className="bg-[#00BAFF]/10 border border-[#00BAFF]/20 p-4 rounded-2xl flex items-center justify-between gap-4 animate-bounce-subtle">
          <div className="flex items-center gap-3">
            <div className="bg-[#00BAFF] p-2 rounded-lg">
              <AlertCircle size={18} className="text-black" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#00BAFF]">Debt Alert</p>
              <p className="text-sm font-bold text-white">Pending Repayments: {formatNaira(stats.totalPendingRepayments)}</p>
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-white/30 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            Awaiting Revenue
          </div>
        </div>
      )}

      {/* Month/Year Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-[#0A0A0A] border border-white/[0.1] p-2 rounded-2xl shadow-inner">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="bg-[#111] text-sm font-bold text-white px-4 py-2 rounded-xl focus:outline-none transition-all cursor-pointer appearance-none border border-white/5"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1} className="bg-[#111] text-white">
                {new Date(0, i).toLocaleString("en-US", { month: "long" })}
              </option>
            ))}
          </select>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="bg-[#111] text-sm font-bold text-white px-4 py-2 rounded-xl focus:outline-none transition-all cursor-pointer appearance-none border border-white/5"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={now.getFullYear() - i} className="bg-[#111] text-white">
                {now.getFullYear() - i}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#00BAFF] text-black px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all shadow-[0_0_20px_rgba(0,186,255,0.2)]"
        >
          <Plus size={16} /> Add Record
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Revenue", value: stats.revenue, icon: TrendingUp, color: "text-[#00BAFF]", bg: "bg-[#00BAFF]/5" },
          { label: "Total Expenses", value: stats.expenses, icon: TrendingDown, color: "text-red-400", bg: "bg-red-400/5" },
          { label: "Net Profit", value: stats.profit, icon: DollarSign, color: "text-green-400", bg: "bg-green-400/5" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0A0A0A] border border-white/[0.05] p-6 rounded-3xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-10 ${stat.bg}`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{stat.label}</p>
                <stat.icon size={16} className={stat.color} />
              </div>
              <p className={`text-2xl font-black ${stat.color}`}>{formatNaira(stat.value)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions List */}
      <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-[32px] overflow-hidden">
        <div className="px-8 py-6 border-b border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={18} className="text-[#00BAFF]" />
            <h3 className="text-sm font-black uppercase tracking-widest">Transaction History</h3>
          </div>
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
            {transactions.length} Records found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30">Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30">Category</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30">Description</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30 text-right">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white/30"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold whitespace-nowrap">
                      {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                      t.type === "REVENUE" ? "bg-[#00BAFF]/10 text-[#00BAFF]" : "bg-red-400/10 text-red-400"
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="max-w-xs lg:max-w-md">
                      <p className="text-sm text-white/70 font-medium line-clamp-1">{t.description}</p>
                      {t.externalFunding > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[8px] font-black uppercase tracking-widest flex items-center gap-1 ${
                            t.isRepaid ? "text-green-400" : "text-[#00BAFF]"
                          }`}>
                            <AlertCircle size={8} /> Borrowed: {formatNaira(t.externalFunding)}
                          </span>
                          <button 
                            onClick={() => handleToggleRepaid(t.id, t.isRepaid)}
                            className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border transition-all ${
                              t.isRepaid 
                                ? "bg-green-400/10 border-green-400/20 text-green-400" 
                                : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                            }`}
                          >
                            {t.isRepaid ? "Repaid" : "Mark Repaid"}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={`text-sm font-black ${
                      t.type === "EXPENSE" ? "text-red-400" : "text-green-400"
                    }`}>
                      {t.type === "EXPENSE" ? "-" : "+"}{formatNaira(t.amount)}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleDelete(t.id)}
                      className="p-2 text-white/10 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <History className="text-white/10" size={24} />
              </div>
              <p className="text-white/20 font-black uppercase tracking-widest text-sm">No records for this period</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-[40px] max-w-lg w-full relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00BAFF]/10 blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-1">New Entry</h2>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">Record Financial Movement</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {["REVENUE", "EXPENSE"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type as any })}
                      className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        formData.type === type 
                          ? "bg-white text-black border-white" 
                          : "bg-white/5 text-white/40 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Business Funds (Invested)</label>
                    <input
                      type="number"
                      required
                      value={formData.amount}
                      onChange={e => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-[#00BAFF] focus:outline-none transition-all placeholder:text-white/10 text-white font-bold"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Borrowed Funds (Loan)</label>
                    <input
                      type="number"
                      value={formData.externalFunding}
                      onChange={e => setFormData({ ...formData, externalFunding: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-[#00BAFF] focus:outline-none transition-all placeholder:text-white/10 text-white"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Description / Comment</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-[#00BAFF] focus:outline-none transition-all placeholder:text-white/10 text-white resize-none"
                    placeholder="Details about this transaction..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-xs focus:border-[#00BAFF] focus:outline-none transition-all text-white [color-scheme:dark]"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 border border-white/5 text-white/30 text-[11px] font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-2 bg-[#00BAFF] text-black text-[11px] font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,186,255,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                    Post Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
