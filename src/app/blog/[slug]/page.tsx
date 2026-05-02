import { getPostBySlug } from "@/app/actions/blog";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";

import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const res = await getPostBySlug(slug);

  if (!res.success || !res.data) {
    return {
      title: "Post Not Found",
    };
  }

  const post = res.data;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.techbe.online";

  return {
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>?/gm, ''),
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>?/gm, ''),
      url: `${baseUrl}/blog/${slug}`,
      type: "article",
      publishedTime: new Date(post.createdAt).toISOString(),
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>?/gm, ''),
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await getPostBySlug(slug);
  
  if (!res.success || !res.data) {
    notFound();
  }

  const post = res.data;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.techbe.online";

  return (
    <main className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              image: post.image ? [post.image] : [],
              datePublished: new Date(post.createdAt).toISOString(),
              dateModified: new Date(post.updatedAt).toISOString(),
              author: [{
                "@type": "Person",
                name: post.author,
              }],
            }),
          }}
        />
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
          overflow-wrap: break-word;
          word-break: break-word;
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

        /* Table Styles */
        .table-wrapper {
          width: 100%;
          overflow-x: auto;
          margin: 4rem 0;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .blog-content table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
          min-width: 800px; /* Force scrollable width */
          table-layout: auto;
          margin: 0;
          display: table;
        }
        .blog-content table td,
        .blog-content table th {
          border-bottom: 1px solid rgba(0,0,0,0.05);
          border-right: 1px solid rgba(0,0,0,0.02);
          padding: 1.25rem 1.5rem;
          text-align: left;
          word-break: keep-all !important;
          overflow-wrap: normal !important;
          white-space: nowrap !important; /* Force single line for most stuff */
          font-size: 1.1rem;
        }
        /* Allow description cell to wrap if it's long */
        .blog-content table td:last-child {
          white-space: normal !important;
          min-width: 300px;
        }
        .blog-content table th {
          background-color: #fcfcfc;
          font-weight: 900;
          color: #000;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          padding: 1.5rem;
          white-space: nowrap;
        }
        .blog-content table tr:last-child td {
          border-bottom: none;
        }
        .blog-content table tr:hover td {
          background-color: rgba(0, 186, 255, 0.02);
        }

        /* Code Block Styles */
        .blog-content pre {
          background: #0d0d0d !important;
          color: #fff !important;
          font-family: 'JetBrainsMono', monospace;
          padding: 3rem 1.5rem 1.5rem;
          border-radius: 1rem;
          margin: 2rem 0;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow-x: auto;
          white-space: pre !important; /* Use pre for code instead of pre-wrap to force horizontal scroll if too long */
        }
        .blog-content pre::before {
          content: "";
          position: absolute;
          top: 1rem;
          left: 1rem;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff5f56;
          box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27c93f;
        }
        /* Visual Merge for adjacent pre blocks */
        .blog-content pre + pre {
          margin-top: -2.5rem;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          padding-top: 1rem;
        }
        .blog-content pre + pre::before {
          display: none;
        }

        .blog-content pre code {
          color: inherit;
          padding: 0;
          background: none;
          font-size: 0.95rem;
          line-height: 1.7;
        }
        /* Inline Code Styles */
        .blog-content :not(pre) > code {
          background: rgba(0, 0, 0, 0.05);
          padding: 0.2em 0.4em;
          border-radius: 0.4em;
          font-family: monospace;
          font-size: 0.9em;
          color: #e11d48;
        }

        /* Highlight JS Colors - More robust selectors */
        .blog-content pre .hljs-comment,
        .blog-content pre .hljs-quote { color: #616161 !important; }
        .blog-content pre .hljs-variable,
        .blog-content pre .hljs-template-variable,
        .blog-content pre .hljs-attribute,
        .blog-content pre .hljs-tag,
        .blog-content pre .hljs-name,
        .blog-content pre .hljs-regexp,
        .blog-content pre .hljs-link,
        .blog-content pre .hljs-selector-id,
        .blog-content pre .hljs-selector-class { color: #f98181 !important; }
        .blog-content pre .hljs-number,
        .blog-content pre .hljs-meta,
        .blog-content pre .hljs-built_in,
        .blog-content pre .hljs-builtin-name,
        .blog-content pre .hljs-literal,
        .blog-content pre .hljs-type,
        .blog-content pre .hljs-params { color: #fbbc88 !important; }
        .blog-content pre .hljs-string,
        .blog-content pre .hljs-symbol,
        .blog-content pre .hljs-bullet { color: #b9f18d !important; }
        .blog-content pre .hljs-title,
        .blog-content pre .hljs-section { color: #faf594 !important; }
        .blog-content pre .hljs-keyword,
        .blog-content pre .hljs-selector-tag { color: #70cff8 !important; }
        .blog-content pre .hljs-emphasis { font-style: italic !important; }
        .blog-content pre .hljs-strong { font-weight: 700 !important; }
      `}} />

      <div className="pt-40 pb-24">
        <article className="max-w-3xl mx-auto px-6">
          <a href="/blog" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black/30 hover:text-black transition-colors mb-12">
            <ArrowLeft size={16} /> Back to Insights
          </a>

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
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(/<table>/g, '<div class="table-wrapper"><table>').replace(/<\/table>/g, '</table></div>') 
            }}
          />
        </article>
      </div>

      <Footer />
    </main>
  );
}
