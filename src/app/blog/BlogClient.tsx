"use client";

import { motion } from "framer-motion";
import { 
  Search, ArrowUpRight, Clock, User, Filter, 
  ChevronRight, Calendar
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as any }
};

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    className="w-full"
    variants={{
      ...fadeUp,
      animate: { ...fadeUp.animate, transition: { ...fadeUp.transition, delay } }
    }}
  >
    {children}
  </motion.div>
);

export default function BlogClient({ posts }: { posts: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-white overflow-hidden border-b border-black/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <FadeUp>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00BAFF] block mb-8">
              The BE. Journal
            </span>
            <h1 className="text-[clamp(28px,8vw,110px)] font-black leading-[0.85] tracking-[-0.05em] text-black mb-10 break-words">
              Insights for the
              <br />
              <span className="text-black/10">Modern Builder.</span>
            </h1>
            <p className="max-w-2xl text-[17px] md:text-[19px] text-black/40 leading-relaxed font-medium">
              Deep dives into engineering, design, and AI. No fluff, just actionable insights from the front lines of product development.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="sticky top-[80px] z-20 bg-white/80 backdrop-blur-xl border-b border-black/[0.05] py-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-4 md:pb-0 scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "text-black/30 hover:bg-black/5 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-[#00BAFF] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-black/[0.05] rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-[#00BAFF]/30 transition-all"
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Featured Post */}
          {featuredPost && (
            <FadeUp>
              <a href={`/blog/${featuredPost.slug}`} className="group block relative mb-24 rounded-[40px] overflow-hidden bg-black aspect-square md:aspect-[21/9] min-h-[350px] md:min-h-[400px]">
                <img 
                  src={featuredPost.image || "/blog.png"} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 md:p-16 flex flex-col justify-end">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 rounded-lg bg-[#00BAFF] text-[10px] font-black uppercase tracking-widest text-white">Featured</span>
                      <span className="text-[12px] font-bold text-white/60 tracking-wide">{featuredPost.category}</span>
                    </div>
                    <h2 className="text-xl md:text-5xl lg:text-6xl font-black text-white leading-[1.2] mb-6 group-hover:text-[#00BAFF] transition-colors break-words">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg text-white/40 leading-relaxed mb-8 hidden md:block">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-[14px] font-bold text-white">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black">
                          {featuredPost.author[0]}
                        </div>
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2 text-[14px] font-bold text-white/30">
                        <Clock size={16} /> {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </FadeUp>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {otherPosts.map((post, i) => (
              <FadeUp key={post.id} delay={i * 0.1}>
                <a href={`/blog/${post.slug}`} className="group block h-full bg-white rounded-[32px] overflow-hidden border border-black/[0.05] hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[16/10] overflow-hidden bg-black/5">
                    <img 
                      src={post.image || "/blog.png"} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                  <div className="p-8 lg:p-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#00BAFF]">
                        {post.category}
                      </span>
                      <div className="text-[11px] font-bold text-black/20 flex items-center gap-1">
                        <Clock size={12} /> {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-[#00BAFF] transition-colors">{post.title}</h3>
                    <p className="text-black/40 text-[15px] leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-black/[0.03]">
                      <div className="flex items-center gap-2 text-[13px] font-bold">
                        <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center text-[10px] font-black">
                          {post.author[0]}
                        </div>
                        {post.author}
                      </div>
                      <div className="w-10 h-10 rounded-full border border-black/[0.05] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-black/40 text-xl font-bold">No results found.</p>
            </div>
          )}
        </div>
      </section>
      {/* Newsletter */}
      <section className="py-20 bg-white px-6">
        <FadeUp>
          <div className="max-w-4xl mx-auto bg-[#050505] rounded-[40px] p-8 md:p-16 relative overflow-hidden text-center">
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00BAFF] block mb-6">
                Stay Ahead
              </span>
              <h2 className="text-[clamp(24px,5vw,40px)] font-black text-white leading-[1.1] tracking-tight mb-6">
                Get the builder&apos;s
                <br />
                blueprint.
              </h2>
              <p className="max-w-lg mx-auto text-white/40 text-[15px] md:text-[17px] leading-relaxed mb-10">
                Join 5,000+ builders getting our weekly breakdown on tech, design, and product scaling.
              </p>
              
              <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#00BAFF]/50 transition-all text-sm"
                />
                <button className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#00BAFF] hover:text-white transition-all duration-300">
                  Join
                </button>
              </form>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
