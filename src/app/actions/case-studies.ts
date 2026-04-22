"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCaseStudyBySlug(slug: string) {
  try {
    const study = await db.caseStudy.findUnique({
      where: { slug },
    });
    return { success: true, data: study };
  } catch (error) {
    console.error("Error fetching case study by slug:", error);
    return { success: false, error: "Failed to fetch case study" };
  }
}

export async function getCaseStudyById(id: string) {
  try {
    const study = await db.caseStudy.findUnique({
      where: { id },
    });
    return { success: true, data: study };
  } catch (error) {
    console.error("Error fetching case study by id:", error);
    return { success: false, error: "Failed to fetch case study" };
  }
}


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

export async function createCaseStudy(formData: FormData, content: string) {
  const title = formData.get("title") as string;
  const client = formData.get("client") as string;
  const category = formData.get("category") as string;
  const desc = formData.get("desc") as string;
  const results = (formData.get("results") as string).split(",").map(s => s.trim());
  const stack = (formData.get("stack") as string).split(",").map(s => s.trim());
  const image = formData.get("image") as string;
  const link = formData.get("link") as string;

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  try {
    const study = await db.caseStudy.create({
      data: {
        slug,
        title,
        client,
        category,
        desc,
        results,
        stack,
        content,
        image,
        link,
      },
    });
    revalidatePath("/work");
    revalidatePath("/admin/case-studies");
    return { success: true, data: study };
  } catch (error) {
    console.error("Error creating case study:", error);
    return { success: false, error: "Failed to create case study" };
  }
}

export async function updateCaseStudy(id: string, formData: FormData, content: string) {
  const title = formData.get("title") as string;
  const client = formData.get("client") as string;
  const category = formData.get("category") as string;
  const desc = formData.get("desc") as string;
  const results = (formData.get("results") as string).split(",").map(s => s.trim());
  const stack = (formData.get("stack") as string).split(",").map(s => s.trim());
  const image = formData.get("image") as string;
  const link = formData.get("link") as string;

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  try {
    const study = await db.caseStudy.update({
      where: { id },
      data: {
        slug,
        title,
        client,
        category,
        desc,
        results,
        stack,
        content,
        image,
        link,
      },
    });
    revalidatePath("/work");
    revalidatePath(`/work/${slug}`);
    revalidatePath("/admin/case-studies");
    return { success: true, data: study };
  } catch (error) {
    console.error("Error updating case study:", error);
    return { success: false, error: "Failed to update case study" };
  }
}

export async function deleteCaseStudy(id: string) {
  try {
    await db.caseStudy.delete({ where: { id } });
    revalidatePath("/work");
    revalidatePath("/admin/case-studies");
    return { success: true };
  } catch (error) {
    console.error("Error deleting case study:", error);
    return { success: false, error: "Failed to delete case study" };
  }
}
