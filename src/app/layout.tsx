import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.techbe.online";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "BE. — Tech Agency",
    template: "%s | BE.",
  },
  description: "We build high-performance web & mobile applications for startups, scale-ups, and enterprises. Zero compromises on quality.",
  keywords: ["tech agency", "web development", "mobile apps", "UI/UX design", "Next.js", "React"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BE. — Tech Agency",
    description: "We build high-performance web & mobile applications for startups, scale-ups, and enterprises. Zero compromises on quality.",
    url: baseUrl,
    siteName: "BE. Tech Agency",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BE. — Tech Agency",
    description: "We build high-performance web & mobile applications for startups, scale-ups, and enterprises. Zero compromises on quality.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Satoshi Font */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BE. Tech Agency",
              url: baseUrl,
              logo: `${baseUrl}/icon.png`, // Assuming you might have an icon.png generated from icon.tsx
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`} style={{ fontFamily: "Satoshi, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}