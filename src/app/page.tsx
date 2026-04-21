import { db } from "@/lib/db";
import HomeClient from "./HomeClient";

export const revalidate = 60;

export default async function Home() {
  let studies: any[] = [];
  try {
    studies = await db.caseStudy.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 2
    });
  } catch (error) {
    console.error("Home studies fetch error:", error);
  }

  return <HomeClient initialStudies={studies} />;
}