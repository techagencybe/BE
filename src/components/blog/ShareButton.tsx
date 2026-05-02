"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title,
      text: text || `Check out this article: ${title}`,
      url: url || window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
      // Fallback to clipboard if share fails (e.g. user cancelled)
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (copyErr) {
        console.error("Clipboard fallback failed:", copyErr);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="w-10 h-10 rounded-full border border-black/[0.05] flex items-center justify-center text-black/30 hover:text-black hover:border-black/20 transition-all relative group"
      title="Share article"
    >
      {copied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
      
      {copied && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-2">
          Link Copied!
        </span>
      )}
    </button>
  );
}
