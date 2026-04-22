"use client";

import { useEffect, useState, use } from "react";
import { getCaseStudyById, updateCaseStudy } from "@/app/actions/case-studies";
import { uploadImage } from "@/app/actions/upload";
import Editor from "@/components/admin/Editor";
import { 
  ArrowLeft, Save, Image as ImageIcon, 
  Loader2, X, Users, Layers, Trophy, Globe
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [study, setStudy] = useState<any>(null);
  
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchStudy();
    }
  }, [id]);

  async function fetchStudy() {
    const res = await getCaseStudyById(id);
    if (res.success && res.data) {
      setStudy(res.data);
      setContent(res.data.content || "");
      setImageUrl(res.data.image || "");
    } else {
      alert("Failed to load case study");
      router.push("/admin/case-studies");
    }
    setLoading(false);
  }

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
    
    const res = await updateCaseStudy(id, formData, content);
    setIsSubmitting(false);

    if (res.success) {
      router.push("/admin/case-studies");
    } else {
      alert(res.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-[#00BAFF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] p-6 lg:p-10">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-6">
            <button 
              type="button"
              onClick={() => router.back()}
              className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Edit Case Study</h1>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Refining project details</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#00BAFF] text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all duration-300 disabled:opacity-50 shadow-[0_0_40px_rgba(0,186,255,0.2)]"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Save Changes
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Title & Basics */}
            <div className="space-y-8">
              <input
                name="title"
                defaultValue={study?.title}
                required
                placeholder="Project Name / Title..."
                className="w-full bg-transparent text-4xl lg:text-6xl font-black tracking-tight text-white placeholder:text-white/10 focus:outline-none border-b border-white/10 pb-6 focus:border-[#00BAFF] transition-all"
              />
              <textarea
                name="desc"
                defaultValue={study?.desc}
                required
                rows={4}
                placeholder="Provide a high-level summary of the challenge and solution..."
                className="w-full bg-transparent text-xl text-white/60 placeholder:text-white/10 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-[40px] p-10 space-y-8">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#00BAFF]">Project Body</h2>
              <Editor content={content} onChange={setContent} />
            </div>
          </div>

          {/* Sidebar / Meta */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-[40px] p-8">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-6">Case Study Cover</label>
              
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 group">
                {imageUrl ? (
                  <>
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImageUrl("")}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] transition-colors">
                    {isUploading ? (
                      <Loader2 className="animate-spin text-[#00BAFF]" />
                    ) : (
                      <>
                        <ImageIcon className="text-white/20 mb-3" size={40} />
                        <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest text-center px-6">Upload Project Cover</span>
                      </>
                    )}
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                  </label>
                )}
              </div>
            </div>

            {/* Metadata Card */}
            <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-[40px] p-8 space-y-8">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">
                  <Users size={14} /> Client Name
                </label>
                <input 
                  name="client"
                  defaultValue={study?.client}
                  required
                  placeholder="e.g. Acme Corp"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#00BAFF]"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">
                  <Layers size={14} /> Category
                </label>
                <select 
                  name="category"
                  defaultValue={study?.category}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#00BAFF]"
                >
                  <option value="Web Platform">Web Platform</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Brand Identity">Brand Identity</option>
                  <option value="AI Solution">AI Solution</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">
                  <Trophy size={14} /> Results (Comma separated)
                </label>
                <input 
                  name="results"
                  defaultValue={study?.results.join(", ")}
                  placeholder="e.g. +40% Conversion, 2M+ Users"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#00BAFF]"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block ml-1">Tech Stack (Comma separated)</label>
                <input 
                  name="stack"
                  defaultValue={study?.stack.join(", ")}
                  placeholder="e.g. Next.js, TypeScript, OpenAI"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#00BAFF]"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">
                  <Globe size={14} /> Project Link (Optional)
                </label>
                <input 
                  name="link"
                  defaultValue={study?.link}
                  placeholder="https://example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#00BAFF]"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
