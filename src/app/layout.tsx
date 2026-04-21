import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BE. — Software Agency",
  description: "We build high-performance web & mobile applications for startups, scale-ups, and enterprises. Zero compromises on quality.",
  keywords: ["software agency", "web development", "mobile apps", "UI/UX design", "Next.js", "React"],
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
      </head>
      <body className={`${inter.variable} antialiased`} style={{ fontFamily: "Satoshi, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}