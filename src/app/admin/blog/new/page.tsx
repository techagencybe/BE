"use client";

import { useState } from "react";
import { createPost } from "@/app/actions/blog";
import { uploadImage } from "@/app/actions/upload";
import Editor from "@/components/admin/Editor";
import { 
  ArrowLeft, Save, Image as ImageIcon, 
  Loader2, X, Check, Globe
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewPost() {
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
    formData.append("upload_preset", "ml_default"); // You might need to set this up in Cloudinary

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
    
    const res = await createPost(formData, content);
    setIsSubmitting(false);

    if (res.success) {
      router.push("/admin/blog");
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] p-6 lg:p-10">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
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
              <h1 className="text-2xl font-black tracking-tight">Create New Article</h1>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Editor v1.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#00BAFF] text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Publish Post
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <input
                name="title"
                required
                placeholder="Enter an impactful title..."
                className="w-full bg-transparent text-[clamp(32px,5vw,56px)] font-black tracking-tight text-white placeholder:text-white/10 focus:outline-none border-b border-white/10 pb-6 focus:border-[#00BAFF] transition-all"
              />
              <textarea
                name="excerpt"
                required
                rows={3}
                placeholder="Write a compelling excerpt for the feed..."
                className="w-full bg-transparent text-xl text-white/60 placeholder:text-white/10 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <Editor content={content} onChange={setContent} />
          </div>

          {/* Sidebar / Meta */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-[32px] p-8">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-6">Featured Image</label>
              
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
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
                        <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">Upload Image</span>
                      </>
                    )}
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                  </label>
                )}
              </div>
              <p className="mt-4 text-[10px] text-white/20 leading-relaxed">
                Recommended size: 1200x630px. Max file size: 5MB.
              </p>
            </div>

            {/* Post Details */}
            <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-[32px] p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block ml-1">Category</label>
                <select 
                  name="category"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00BAFF]/50"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Strategy">Strategy</option>
                  <option value="News">News</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block ml-1">Author</label>
                <input 
                  name="author"
                  defaultValue="Benjamin E."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00BAFF]/50"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block ml-1">Read Time</label>
                <input 
                  name="readTime"
                  defaultValue="5 min read"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00BAFF]/50"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input type="checkbox" name="featured" value="true" id="featured" className="w-5 h-5 rounded border-white/10 bg-white/5 text-[#00BAFF] focus:ring-0" />
                <label htmlFor="featured" className="text-[12px] font-bold text-white/60">Mark as Featured</label>
              </div>
            </div>

            {/* Publishing Card */}
            <div className="bg-[#00BAFF]/10 border border-[#00BAFF]/20 rounded-[32px] p-8">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={18} className="text-[#00BAFF]" />
                <span className="text-[11px] font-black uppercase tracking-widest text-white">Public Visibility</span>
              </div>
              <p className="text-[12px] text-white/50 leading-relaxed mb-6">
                This article will be visible to everyone on the BE. Agency blog once published.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00BAFF]">
                <Check size={14} /> Ready to go live
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
