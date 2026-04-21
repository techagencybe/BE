"use server";

import { db } from "@/lib/db";

export async function getCaseStudies() {
  try {
    const studies = await db.caseStudy.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: studies };
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return { success: false, error: "Failed to fetch case studies" };
  }
}

export async function getCaseStudyBySlug(slug: string) {
  try {
    const study = await db.caseStudy.findUnique({
      where: { slug },
    });
    if (!study) return { success: false, error: "Not found" };
    return { success: true, data: study };
  } catch (error) {
    console.error("Error fetching case study:", error);
    return { success: false, error: "Failed to fetch case study" };
  }
}
