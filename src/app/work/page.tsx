import { db } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import WorkClient from "@/app/work/WorkClient";

export const revalidate = 60;

export default async function WorkPage() {
  let studies: any[] = [];
  try {
    studies = await db.caseStudy.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database connection error:", error);
    // Return empty array to allow the page to render without crashing
  }

  return (
    <main className="bg-[#050505]">
      <Navbar />
      <WorkClient studies={studies} />
      <Footer />
    </main>
  );
}
