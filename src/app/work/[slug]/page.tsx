import { getCaseStudyBySlug } from "@/app/actions/case-studies";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Globe, Smartphone, Bot, ArrowUpRight } from "lucide-react";

import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const res = await getCaseStudyBySlug(slug);

  if (!res.success || !res.data) {
    return {
      title: "Case Study Not Found",
    };
  }

  const study = res.data;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.techbe.online";

  return {
    title: `${study.title} | ${study.client}`,
    description: study.desc,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: `${study.title} - BE. Tech Agency`,
      description: study.desc,
      url: `${baseUrl}/work/${slug}`,
      type: "article",
      images: study.image ? [{ url: study.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} - BE. Tech Agency`,
      description: study.desc,
      images: study.image ? [study.image] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await getCaseStudyBySlug(slug);
  
  if (!res.success || !res.data) {
    notFound();
  }

  const study = res.data;

  return (
    <main className="min-h-screen bg-white text-black pt-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: study.title,
              description: study.desc,
              image: study.image ? [study.image] : [],
              datePublished: new Date(study.createdAt).toISOString(),
              dateModified: new Date(study.updatedAt).toISOString(),
              author: [{
                "@type": "Organization",
                name: "BE. Tech Agency",
              }],
            }),
          }}
        />
      <Navbar forceTheme="dark" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .case-study-content h1, .case-study-content h2, .case-study-content h3 {
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-top: 2.5em;
          margin-bottom: 1em;
          color: #000;
        }
        .case-study-content h2 { font-size: 2.5rem; }
        .case-study-content h3 { font-size: 1.75rem; }
        .case-study-content p {
          font-size: 1.25rem;
          line-height: 1.8;
          margin-bottom: 1.5em;
          color: #333;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          overflow-wrap: break-word;
          word-break: break-word;
        }
        .case-study-content ul, .case-study-content ol {
          margin-bottom: 2em;
          padding-left: 1.5em;
        }
        .case-study-content li {
          font-size: 1.2rem;
          margin-bottom: 0.75em;
          color: #444;
          list-style-type: disc;
        }
        .case-study-content strong {
          font-weight: 800;
          color: #000;
        }
        .case-study-content blockquote {
          border-left: 4px solid #00BAFF;
          padding: 1.5rem 2rem;
          background: #f0faff;
          font-style: italic;
          margin: 3rem 0;
          border-radius: 0 1rem 1rem 0;
        }
        .case-study-content img {
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
        .case-study-content table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
          min-width: 800px; /* Force scrollable width */
          table-layout: auto;
          margin: 0;
          display: table;
        }
        .case-study-content table td,
        .case-study-content table th {
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
        .case-study-content table td:last-child {
          white-space: normal !important;
          min-width: 300px;
        }
        .case-study-content table th {
          background-color: #fcfcfc;
          font-weight: 900;
          color: #000;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          padding: 1.5rem;
          white-space: nowrap;
        }
        .case-study-content table tr:last-child td {
          border-bottom: none;
        }
        .case-study-content table tr:hover td {
          background-color: rgba(0, 186, 255, 0.02);
        }

        /* Code Block Styles */
        .case-study-content pre {
          background: #0d0d0d !important;
          color: #fff !important;
          font-family: 'JetBrainsMono', monospace;
          padding: 3rem 1.5rem 1.5rem;
          border-radius: 1rem;
          margin: 2rem 0;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow-x: auto;
          white-space: pre !important; /* Force horizontal scroll if too long */
        }
        .case-study-content pre::before {
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
        .case-study-content pre + pre {
          margin-top: -2.5rem;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          padding-top: 1rem;
        }
        .case-study-content pre + pre::before {
          display: none;
        }

        .case-study-content pre code {
          color: inherit;
          padding: 0;
          background: none;
          font-size: 0.95rem;
          line-height: 1.7;
        }
        /* Inline Code Styles */
        .case-study-content :not(pre) > code {
          background: rgba(0, 0, 0, 0.05);
          padding: 0.2em 0.4em;
          border-radius: 0.4em;
          font-family: monospace;
          font-size: 0.9em;
          color: #e11d48;
        }

        /* Highlight JS Colors - More robust selectors */
        .case-study-content pre .hljs-comment,
        .case-study-content pre .hljs-quote { color: #616161 !important; }
        .case-study-content pre .hljs-variable,
        .case-study-content pre .hljs-template-variable,
        .case-study-content pre .hljs-attribute,
        .case-study-content pre .hljs-tag,
        .case-study-content pre .hljs-name,
        .case-study-content pre .hljs-regexp,
        .case-study-content pre .hljs-link,
        .case-study-content pre .hljs-selector-id,
        .case-study-content pre .hljs-selector-class { color: #f98181 !important; }
        .case-study-content pre .hljs-number,
        .case-study-content pre .hljs-meta,
        .case-study-content pre .hljs-built_in,
        .case-study-content pre .hljs-builtin-name,
        .case-study-content pre .hljs-literal,
        .case-study-content pre .hljs-type,
        .case-study-content pre .hljs-params { color: #fbbc88 !important; }
        .case-study-content pre .hljs-string,
        .case-study-content pre .hljs-symbol,
        .case-study-content pre .hljs-bullet { color: #b9f18d !important; }
        .case-study-content pre .hljs-title,
        .case-study-content pre .hljs-section { color: #faf594 !important; }
        .case-study-content pre .hljs-keyword,
        .case-study-content pre .hljs-selector-tag { color: #70cff8 !important; }
        .case-study-content pre .hljs-emphasis { font-style: italic !important; }
        .case-study-content pre .hljs-strong { font-weight: 700 !important; }
      `}} />
      
      <div className="max-w-4xl mx-auto px-6 mb-24">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <a href="/work" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors">
            <ArrowLeft size={14} /> Back to Work
          </a>

          {study.link && (
            <a 
              href={study.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-black text-white px-6 py-3 rounded-xl hover:bg-[#00BAFF] hover:text-white transition-all shadow-lg active:scale-95"
            >
              Visit Project <ArrowUpRight size={14} />
            </a>
          )}
        </div>

        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1.5 rounded-lg bg-black/[0.03] text-[10px] font-black uppercase tracking-widest text-black/60 border border-black/[0.04]">
              {study.category}
            </span>
            <span className="text-[12px] font-bold text-[#00BAFF] uppercase tracking-widest">
              {study.client}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1]">
            {study.title}
          </h1>

          <p className="text-lg md:text-xl text-black/60 leading-relaxed max-w-2xl">
            {study.desc}
          </p>
        </header>

        {study.image && (
          <div className="w-full h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden mb-16 border border-black/[0.05] bg-black/5">
            <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 p-8 md:p-12 bg-[#F7F8FA] rounded-[40px] border border-black/[0.05]">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-black/30 mb-6">Key Results</h3>
            <ul className="space-y-4">
              {study.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] font-bold">
                  <span className="text-[#00BAFF] font-black mt-0.5">•</span>
                  {result}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-black/30 mb-6">Tech Stack</h3>
            <div className="flex flex-wrap gap-2.5">
              {study.stack.map(s => (
                <span key={s} className="px-4 py-2 rounded-xl bg-white text-[12px] font-bold text-black/60 border border-black/[0.04] shadow-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="case-study-content">
          <div dangerouslySetInnerHTML={{ 
            __html: study.content.replace(/<table>/g, '<div class="table-wrapper"><table>').replace(/<\/table>/g, '</table></div>') 
          }} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
