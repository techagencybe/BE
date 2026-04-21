"use client";

import { useEffect, useState } from "react";
import { getPosts, deletePost } from "@/app/actions/blog";
import { 
  Plus, Search, Filter, MoreVertical, 
  Trash2, Edit3, Eye, Loader2, FileText
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const res = await getPosts();
    if (res.success && res.data) {
      setPosts(res.data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const res = await deletePost(id);
    if (res.success) fetchPosts();
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
          <h1 className="text-3xl font-black tracking-tight mb-1">Blog Management</h1>
          <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">Create and manage your articles</p>
        </div>
        <a 
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-[#00BAFF] text-black px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,186,255,0.2)] active:scale-95"
        >
          <Plus size={18} /> New Article
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-[#0A0A0A] border border-white/[0.05] rounded-[32px] overflow-hidden hover:border-[#00BAFF]/30 transition-all duration-500"
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={post.image || "/blog.png"} 
                alt={post.title} 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-black mb-3 line-clamp-2 group-hover:text-[#00BAFF] transition-colors">{post.title}</h3>
              <p className="text-white/40 text-sm mb-6 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00BAFF]/10 flex items-center justify-center text-[#00BAFF] text-[10px] font-black">
                    {post.author[0]}
                  </div>
                  <span className="text-xs font-bold text-white/60">{post.author}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="p-2.5 rounded-xl hover:bg-red-500/10 text-white/20 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                  <a 
                    href={`/admin/blog/edit/${post.id}`}
                    className="p-2.5 rounded-xl hover:bg-white/5 text-white/20 hover:text-white transition-all"
                  >
                    <Edit3 size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {posts.length === 0 && (
          <div className="col-span-full py-32 text-center bg-[#0A0A0A] border border-white/[0.05] border-dashed rounded-[40px]">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-white/20" />
            </div>
            <h2 className="text-2xl font-black mb-2 text-white/40">No Articles Yet</h2>
            <p className="text-white/20 text-sm mb-8">Start sharing your thoughts with the world.</p>
            <a 
              href="/admin/blog/new"
              className="text-[#00BAFF] font-black uppercase tracking-widest text-[11px] hover:underline"
            >
              Create your first post
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
