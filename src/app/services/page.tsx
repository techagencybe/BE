import { db } from "@/lib/db";
import ServicesClient from "./ServicesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore the range of high-impact engineering and design services provided by BE. Tech Agency, from bespoke software to scalable architectures.",
  alternates: {
    canonical: "/services",
  },
};

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
