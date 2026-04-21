"use client";

import { useEffect, useState } from "react";
import { getCaseStudies, deleteCaseStudy } from "@/app/actions/case-studies";
import { 
  Plus, Trash2, Edit3, Loader2, Briefcase, 
  ExternalLink, Layers, Users
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminCaseStudies() {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudies();
  }, []);

  async function fetchStudies() {
    const res = await getCaseStudies();
    if (res.success && res.data) {
      setStudies(res.data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    const res = await deleteCaseStudy(id);
    if (res.success) fetchStudies();
    else alert(res.error);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-[#00BAFF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] p-6 lg:p-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Case Studies</h1>
          <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">Showcase your best work</p>
        </div>
        <a 
          href="/admin/case-studies/new"
          className="inline-flex items-center gap-2 bg-[#00BAFF] text-black px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,186,255,0.2)] active:scale-95"
        >
          <Plus size={18} /> New Case Study
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {studies.map((study) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group bg-[#0A0A0A] border border-white/[0.05] rounded-[40px] overflow-hidden hover:border-[#00BAFF]/30 transition-all duration-500 flex flex-col"
          >
            <div className="aspect-[16/10] relative overflow-hidden">
              <img 
                src={study.image || "/work.png"} 
                alt={study.title} 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                  {study.category}
                </span>
              </div>
            </div>

            <div className="p-10 flex-1 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00BAFF]">
                  <Users size={14} /> {study.client}
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  {new Date(study.createdAt).getFullYear()}
                </div>
              </div>

              <h3 className="text-2xl font-black mb-4 group-hover:text-[#00BAFF] transition-colors">{study.title}</h3>
              <p className="text-white/40 text-[15px] mb-8 line-clamp-2 leading-relaxed">{study.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-10">
                {study.stack.slice(0, 3).map((tech: string) => (
                  <span key={tech} className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] font-bold text-white/40">
                    {tech}
                  </span>
                ))}
                {study.stack.length > 3 && (
                  <span className="text-[10px] font-bold text-white/20 px-2 py-1">+{study.stack.length - 3}</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-white/[0.05] mt-auto">
                <div className="flex items-center gap-2">
                  <a 
                    href={`/work/${study.slug}`}
                    target="_blank"
                    className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                  >
                    View Project <ExternalLink size={14} />
                  </a>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDelete(study.id)}
                    className="p-3 rounded-2xl hover:bg-red-500/10 text-white/20 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                  <a 
                    href={`/admin/case-studies/edit/${study.id}`}
                    className="p-3 rounded-2xl hover:bg-white/5 text-white/20 hover:text-white transition-all"
                  >
                    <Edit3 size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {studies.length === 0 && (
          <div className="col-span-full py-32 text-center bg-[#0A0A0A] border border-white/[0.05] border-dashed rounded-[48px]">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/10">
              <Briefcase size={40} />
            </div>
            <h2 className="text-2xl font-black mb-2">No Case Studies</h2>
            <p className="text-white/20 text-sm mb-8">Your portfolio is empty. Add your first project success story.</p>
            <a 
              href="/admin/case-studies/new"
              className="inline-flex bg-white/5 px-8 py-4 rounded-2xl text-[#00BAFF] font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all"
            >
              Add Case Study
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
