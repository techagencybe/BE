"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Search,
  ChevronRight,
  Clock,
  User,
  Tag,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { subscribeNewsletter } from "@/app/actions/leads";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */
const POSTS = [
  {
    id: "nextjs-15",
    title: "Why Next.js 15 is a Game Changer for Enterprise SaaS",
    excerpt: "Exploring the latest features in Next.js 15 and how they solve complex state management and performance issues in large-scale applications.",
    category: "Engineering",
    author: "Benjamin E.",
    date: "April 12, 2026",
    readTime: "8 min read",
    image: "/blog.png",
    featured: true,
  },
  {
    id: "ai-agents",
    title: "Building Autonomous Agents: Lessons from the Field",
    excerpt: "What we learned from implementing custom AI agents for supply chain automation and how to avoid common pitfalls in LLM integration.",
    category: "AI",
    author: "Amara J.",
    date: "April 08, 2026",
    readTime: "12 min read",
    image: "/blog.png",
  },
  {
    id: "design-systems",
    title: "Scaling Design Systems in a Multi-Platform World",
    excerpt: "A deep dive into our process for creating unified design systems that span Web, iOS, and Android without sacrificing native feel.",
    category: "Design",
    author: "Kwame O.",
    date: "April 02, 2026",
    readTime: "6 min read",
    image: "/blog.png",
  },
  {
    id: "performance-budget",
    title: "Why Your Lighthouse Score is Actually Costing You Money",
    excerpt: "The direct correlation between page load speed and conversion rates in modern e-commerce, and how to optimize for real-world users.",
    category: "Optimization",
    author: "Sasha L.",
    date: "March 28, 2026",
    readTime: "10 min read",
    image: "/blog.png",
  },
  {
    id: "security-saas",
    title: "Zero-Trust Architecture for Modern SaaS Platforms",
    excerpt: "Securing your application in 2026 requires more than just a firewall. Here is our blueprint for implementing zero-trust security.",
    category: "Security",
    author: "Benjamin E.",
    date: "March 15, 2026",
    readTime: "15 min read",
    image: "/blog.png",
  },
];

/* ─── Page ─── */
export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeStatus("idle");
    const formData = new FormData(e.currentTarget);
    const res = await subscribeNewsletter(formData);
    setIsSubscribing(false);
    if (res.success) setSubscribeStatus("success");
    else setSubscribeStatus("error");
  };

  const featuredPost = POSTS.find(p => p.featured);
  const regularPosts = POSTS.filter(p => !p.featured);

  return (
    <main className="bg-[#F8F9FA]">
      <Navbar forceTheme="dark" />
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative pt-40 pb-20 bg-white border-b border-black/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <FadeUp>
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#00BAFF] block mb-4">
                  The BE. Journal
                </span>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h1 className="text-[clamp(44px,7vw,92px)] font-black leading-[0.9] tracking-[-0.04em] text-black mb-8">
                  Insights for the
                  <br />
                  <span className="text-black/20">Modern Builder.</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="text-[17px] text-black/50 max-w-lg leading-relaxed">
                  Deep dives into engineering, design, and AI. No fluff, just 
                  actionable insights from the front lines of product development.
                </p>
              </FadeUp>
            </div>

            {/* Search */}
            <FadeUp delay={0.24} className="w-full md:w-80">
              <div className="relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-[#00BAFF] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#F8F9FA] border border-black/[0.06] text-[14px] font-medium focus:outline-none focus:border-[#00BAFF] focus:bg-white transition-all"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED POST
      ══════════════════════════════════════════ */}
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <a href={`/blog/${featuredPost.id}`} className="group relative block rounded-[40px] overflow-hidden bg-black aspect-[16/9] md:aspect-[21/8]">
                {/* Image */}
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000"
                  style={{ objectPosition: "center" }}
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="px-4 py-2 rounded-xl bg-[#00BAFF] text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(0,186,255,0.4)]">
                        Featured Insight
                      </span>
                      <span className="text-[12px] md:text-[14px] font-bold text-white/60 tracking-wide">{featuredPost.category}</span>
                    </div>
                    <h2 className="text-[clamp(32px,5vw,64px)] font-black text-white leading-[1] tracking-tight mb-8 group-hover:text-[#00BAFF] transition-colors duration-500">
                      {featuredPost.title}
                    </h2>
                    <p className="text-[16px] md:text-[20px] text-white/60 leading-relaxed mb-10 hidden md:block max-w-2xl">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3 text-[13px] md:text-[15px] font-bold text-white">
                        <div className="w-10 h-10 rounded-full bg-[#00BAFF]/20 flex items-center justify-center text-[#00BAFF]">
                          {featuredPost.author[0]}
                        </div>
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2 text-[13px] md:text-[15px] font-bold text-white/40">
                        <Clock size={16} /> {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover arrow */}
                <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-10 transition-all duration-700 shadow-2xl">
                  <ArrowUpRight size={32} className="text-black" />
                </div>
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          POST GRID
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, i) => (
              <FadeUp key={post.id} delay={i * 0.1}>
                <a href={`/blog/${post.id}`} className="group block bg-white rounded-3xl border border-black/[0.06] overflow-hidden hover:border-[#00BAFF]/30 hover:shadow-xl transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] bg-black overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      style={{ objectPosition: i === 0 ? "top right" : i === 1 ? "bottom left" : "center" }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/90">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-[11px] font-bold text-black/30 uppercase tracking-widest mb-4">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-[22px] font-black text-black leading-tight tracking-tight mb-4 group-hover:text-[#00BAFF] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[14px] text-black/45 leading-relaxed mb-8 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-black/[0.05]">
                      <div className="flex items-center gap-2 text-[12px] font-bold text-black/70">
                        <div className="w-6 h-6 rounded-full bg-black/[0.05] flex items-center justify-center text-[10px]">
                          {post.author[0]}
                        </div>
                        {post.author}
                      </div>
                      <span className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-black/30 group-hover:text-[#00BAFF] transition-colors">
                        Read more <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-20 text-center">
            <FadeUp>
              <button className="px-10 py-4 rounded-full border border-black/[0.1] text-[13px] font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-300">
                Load more articles
              </button>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="relative overflow-hidden rounded-[40px] bg-[#050505] p-12 md:p-20 text-center text-white">
            {/* Grid */}
            <div 
              aria-hidden 
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1.5px, transparent 1.5px)", backgroundSize: "40px 40px" }}
            />
            {/* Glow */}
            <div 
              aria-hidden 
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,186,255,0.1) 0%, transparent 70%)" }}
            />

            <div className="relative z-10">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00BAFF] block mb-6">
                Stay Ahead
              </span>
              <h2 className="text-[36px] md:text-[56px] font-black leading-[1] tracking-[-0.03em] mb-8">
                Get the builder&apos;s
                <br />
                blueprint.
              </h2>
              <p className="text-white/40 text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
                Join 5,000+ builders getting our weekly breakdown on tech, design, and product scaling.
              </p>
              
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="Email address"
                  className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-[14px] font-medium focus:outline-none focus:border-[#00BAFF] transition-all"
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="px-10 py-4 rounded-full bg-white text-black text-[13px] font-black uppercase tracking-widest hover:bg-[#00BAFF] hover:text-white transition-all duration-300 disabled:opacity-50"
                >
                  {isSubscribing ? "Wait..." : subscribeStatus === "success" ? "Done!" : "Join"}
                </button>
              </form>
              {subscribeStatus === "error" && <p className="text-red-400 text-sm mt-3">Failed to subscribe. Please try again.</p>}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black/[0.05] px-6 py-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-black">
          <div className="flex items-center gap-1">
            <span className="text-lg font-black tracking-tight uppercase">BE</span>
            <span className="text-lg font-black text-[#00BAFF]">.</span>
          </div>
          <p className="text-[12px] text-black/25">
            © {new Date().getFullYear()} BE. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[12px] text-black/35 font-semibold">
            <a href="#" className="hover:text-black transition-colors">RSS Feed</a>
            <a href="#" className="hover:text-black transition-colors">Newsletter</a>
            <a href="mailto:hello@be.agency" className="hover:text-[#00BAFF] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
