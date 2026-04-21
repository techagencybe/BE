"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getPostBySlug(slug: string) {
  try {
    const post = await db.post.findUnique({
      where: { slug },
    });
    return { success: true, data: post };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return { success: false, error: "Failed to fetch post" };
  }
}

export async function getPostById(id: string) {
  try {
    const post = await db.post.findUnique({
      where: { id },
    });
    return { success: true, data: post };
  } catch (error) {
    console.error("Error fetching post by id:", error);
    return { success: false, error: "Failed to fetch post" };
  }
}


export async function getPosts() {
  try {
    const posts = await db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { success: false, error: "Failed to fetch posts" };
  }
}

export async function createPost(formData: FormData, content: string) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const author = formData.get("author") as string;
  const readTime = formData.get("readTime") as string;
  const image = formData.get("image") as string;
  const featured = formData.get("featured") === "true";

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  try {
    const post = await db.post.create({
      data: {
        slug,
        title,
        excerpt,
        category,
        author,
        readTime,
        content,
        image,
        featured,
      },
    });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true, data: post };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Failed to create post" };
  }
}

export async function updatePost(id: string, formData: FormData, content: string) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const author = formData.get("author") as string;
  const readTime = formData.get("readTime") as string;
  const image = formData.get("image") as string;
  const featured = formData.get("featured") === "true";

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  try {
    const post = await db.post.update({
      where: { id },
      data: {
        slug,
        title,
        excerpt,
        category,
        author,
        readTime,
        content,
        image,
        featured,
      },
    });
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");
    return { success: true, data: post };
  } catch (error) {
    console.error("Error updating post:", error);
    return { success: false, error: "Failed to update post" };
  }
}

export async function deletePost(id: string) {
  try {
    await db.post.delete({ where: { id } });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}
