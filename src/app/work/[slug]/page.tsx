import { getCaseStudyBySlug } from "@/app/actions/case-studies";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Globe, Smartphone, Bot } from "lucide-react";
import Link from "next/link";

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await getCaseStudyBySlug(slug);
  
  if (!res.success || !res.data) {
    notFound();
  }

  const study = res.data;

  return (
    <main className="min-h-screen bg-white text-black pt-32 pb-24">
      <Navbar forceTheme="dark" />
      
      <div className="max-w-4xl mx-auto px-6 mb-24">
        <Link href="/work" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Work
        </Link>

        {/* ... existing header ... */}
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

        {/* ... existing hero image ... */}
        {study.image && (
          <div className="w-full h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden mb-16 border border-black/[0.05] bg-black/5">
            <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* ... existing meta info ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 p-8 bg-[#F7F8FA] rounded-3xl border border-black/[0.05]">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-black/30 mb-4">Results</h3>
            <ul className="space-y-3">
              {study.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold">
                  <span className="text-[#00BAFF] font-black mt-0.5">•</span>
                  {result}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-black/30 mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {study.stack.map(s => (
                <span key={s} className="px-3 py-1.5 rounded-lg bg-white text-[11px] font-bold text-black/60 border border-black/[0.04] shadow-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none prose-h2:font-black prose-h2:tracking-tight prose-h3:font-bold prose-p:text-black/70">
          <div dangerouslySetInnerHTML={{ __html: study.content }} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
