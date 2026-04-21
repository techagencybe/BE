"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData): Promise<{ success: true, url: string } | { success: false, error: string }> {
  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "be-agency",
        },
        (error, result) => {
          if (error || !result?.secure_url) {
            console.error("Cloudinary upload error:", error);
            resolve({ success: false, error: error?.message || "Upload failed - no URL returned" });
          } else {
            resolve({ success: true, url: result.secure_url });
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Upload action error:", error);
    return { success: false, error: "Internal server error" };
  }
}
