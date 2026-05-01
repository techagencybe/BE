import { getCaseStudyBySlug } from "@/app/actions/case-studies";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Globe, Smartphone, Bot, ArrowUpRight } from "lucide-react";
import Link from "next/link";
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
      <head>
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
      </head>
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
      `}} />
      
      <div className="max-w-4xl mx-auto px-6 mb-24">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <Link href="/work" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors">
            <ArrowLeft size={14} /> Back to Work
          </Link>

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
          <div dangerouslySetInnerHTML={{ __html: study.content }} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
