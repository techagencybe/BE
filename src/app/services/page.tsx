import { db } from "@/lib/db";
import ServicesClient from "./ServicesClient";

export const revalidate = 60;

export default async function ServicesPage() {
  let studies: any[] = [];
  try {
    studies = await db.caseStudy.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Services fetch error:", error);
  }

  return <ServicesClient studies={studies} />;
}
