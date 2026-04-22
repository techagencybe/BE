"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/mailer";

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

    // Broadcast to all unique emails in the system
    try {
      const allLeads = await db.lead.findMany({
        select: { email: true }
      });
      
      // Get unique emails
      const uniqueEmails = Array.from(new Set(allLeads.map(l => l.email)));
      
      if (uniqueEmails.length > 0) {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://be-agency.com";
        const postUrl = `${baseUrl}/blog/${slug}`;

        await sendEmail({
          to: uniqueEmails,
          subject: `New Insight: ${title}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
              <div style="text-align: center; margin-bottom: 30px;">
                <span style="font-weight: 900; font-size: 24px; letter-spacing: -1px;">BE<span style="color: #00BAFF;">.</span> LABS</span>
              </div>
              <h2 style="color: #00BAFF; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.1;">${title}</h2>
              <p>Hi there,</p>
              <p>We just published a new piece on engineering, design, and product growth that we think you'll find valuable.</p>
              
              <div style="background: #f7f8fa; padding: 30px; border-radius: 20px; margin: 30px 0; border: 1px solid #eee;">
                <p style="color: #666; font-size: 15px; margin-bottom: 25px; line-height: 1.6;">${excerpt}</p>
                <a href="${postUrl}" style="display: inline-block; background: #00BAFF; color: #000; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: 900; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Read the article</a>
              </div>
              
              <p>We're building the future of software, one insight at a time. Thanks for being part of the journey.</p>
              <br/>
              <p style="margin: 0; font-weight: bold; color: #000;">Best Regards,</p>
              <p style="margin: 0; color: #666;">Euodia & Bolaji</p>
              <p style="margin: 0; color: #00BAFF; font-weight: bold;">The BE. Agency Team</p>
            </div>
          `
        });
      }
    } catch (broadcastError) {
      console.error("Failed to broadcast new post email:", broadcastError);
      // We don't fail the post creation if broadcast fails
    }

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
