"use client";

import { useState } from "react";
import { createCaseStudy } from "@/app/actions/case-studies";
import { uploadImage } from "@/app/actions/upload";
import Editor from "@/components/admin/Editor";
import { 
  ArrowLeft, Save, Image as ImageIcon, 
  Loader2, X, Plus, Terminal, Users, 
  Layout, Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewCaseStudy() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const res = await uploadImage(formData);
      if (res.success) {
        setImageUrl(res.url);
      } else {
        alert(res.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("image", imageUrl);
    
    const res = await createCaseStudy(formData, content);
    setIsSubmitting(false);

    if (res.success) {
      router.push("/admin/case-studies");
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] p-6 lg:p-10">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <button 
              type="button"
              onClick={() => router.back()}
              className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Post Case Study</h1>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Showcase your impact</p>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-[#00BAFF] text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all duration-300 disabled:opacity-50 shadow-[0_0_40px_rgba(0,186,255,0.2)]"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            Publish Case Study
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Title & Basics */}
            <div className="space-y-8">
              <input
                name="title"
                required
                placeholder="Project Name / Title..."
                className="w-full bg-transparent text-4xl lg:text-6xl font-black tracking-tight text-white placeholder:text-white/10 focus:outline-none border-b border-white/10 pb-6 focus:border-[#00BAFF] transition-all"
              />
              <textarea
                name="desc"
                required
                rows={4}
                placeholder="Provide a high-level summary of the challenge and solution..."
                className="w-full bg-transparent text-xl text-white/60 placeholder:text-white/10 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Rich Content Editor */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block ml-1">Full Story / Details</label>
              <Editor content={content} onChange={setContent} />
            </div>
          </div>

          <div className="space-y-8">
            {/* Cover Image */}
            <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-[32px] p-8">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-6">Cover Image</label>
              
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                {imageUrl ? (
                  <>
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImageUrl("")}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] transition-colors">
                    {isUploading ? (
                      <Loader2 className="animate-spin text-[#00BAFF]" />
                    ) : (
                      <>
                        <ImageIcon className="text-white/20 mb-3" size={32} />
                        <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">Upload Cover</span>
                      </>
                    )}
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                  </label>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-[32px] p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2 block ml-1">
                  <Users size={12} /> Client Name
                </label>
                <input 
                  name="client"
                  required
                  placeholder="e.g. Acme Corp"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00BAFF]/50"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2 block ml-1">
                  <Layout size={12} /> Industry/Category
                </label>
                <input 
                  name="category"
                  required
                  placeholder="e.g. Fintech, E-commerce"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00BAFF]/50"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2 block ml-1">
                  <Terminal size={12} /> Tech Stack (Comma separated)
                </label>
                <input 
                  name="stack"
                  required
                  placeholder="React, Next.js, Node.js"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00BAFF]/50"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2 block ml-1">
                  <Sparkles size={12} /> Key Results (Comma separated)
                </label>
                <textarea 
                  name="results"
                  required
                  rows={3}
                  placeholder="40% Revenue Increase, 10k Active Users"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00BAFF]/50 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
