import { getPostBySlug } from "@/app/actions/blog";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import Link from "next/link";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await getPostBySlug(slug);
  
  if (!res.success || !res.data) {
    notFound();
  }

  const post = res.data;

  return (
    <main className="min-h-screen bg-white">
      <Navbar forceTheme="dark" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content h1, .blog-content h2, .blog-content h3 {
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-top: 2.5em;
          margin-bottom: 1em;
          color: #000;
        }
        .blog-content h2 { font-size: 2.5rem; }
        .blog-content h3 { font-size: 1.75rem; }
        .blog-content p {
          font-size: 1.25rem;
          line-height: 1.8;
          margin-bottom: 1.5em;
          color: #333;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 2em;
          padding-left: 1.5em;
        }
        .blog-content li {
          font-size: 1.2rem;
          margin-bottom: 0.75em;
          color: #444;
          list-style-type: disc;
        }
        .blog-content strong {
          font-weight: 800;
          color: #000;
        }
        .blog-content blockquote {
          border-left: 4px solid #00BAFF;
          padding: 1.5rem 2rem;
          background: #f0faff;
          font-style: italic;
          margin: 3rem 0;
          border-radius: 0 1rem 1rem 0;
        }
        .blog-content img {
          border-radius: 2rem;
          margin: 3rem 0;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }
      `}} />

      <div className="pt-40 pb-24">
        <article className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black/30 hover:text-black transition-colors mb-12">
            <ArrowLeft size={16} /> Back to Insights
          </Link>

          <header className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-2 rounded-xl bg-[#00BAFF] text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(0,186,255,0.2)]">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-[12px] font-bold text-black/20">
                <Clock size={14} /> {post.readTime}
              </div>
            </div>

            <h1 className="text-[clamp(32px,6vw,72px)] font-black text-black leading-[1] tracking-tight mb-12">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-6 pt-12 border-t border-black/[0.05]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-black/30 font-black text-lg">
                  {post.author[0]}
                </div>
                <div>
                  <div className="text-[14px] font-black text-black tracking-tight">{post.author}</div>
                  <div className="text-[12px] font-bold text-black/30 uppercase tracking-widest">
                    Published {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full border border-black/[0.05] flex items-center justify-center text-black/30 hover:text-black hover:border-black/20 transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </header>

          {post.image && (
            <div className="aspect-[21/9] rounded-[40px] overflow-hidden bg-black/5 border border-black/[0.05] mb-20">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>

      <Footer />
    </main>
  );
}
