import { db } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import BlogClient from "@/app/blog/BlogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Updates",
  description: "Read the latest thoughts, insights, and updates from the team at BE. Tech Agency regarding technology, business, and scalable engineering.",
  alternates: {
    canonical: "/blog",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await db.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Blog fetch error:", error);
  }

  return (
    <main className="bg-[#F8F9FA]">
      <Navbar forceTheme="dark" />
      <BlogClient posts={posts} />
      <Footer />
    </main>
  );
}
