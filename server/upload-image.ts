"use server";

import { actionClient } from "@/lib/safe-action";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import z from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const formData = z.object({
  image: z.instanceof(FormData),
});

type UploadResult =
  | { success: UploadApiResponse; error?: never }
  | { error: string; success?: never };

export const uploadImage = actionClient
  .schema(formData)
  .action(async ({ parsedInput: { image } }): Promise<UploadResult> => {
    const formImage = image.get("image");

    if (!formImage || !(formImage instanceof File)) {
      return { error: "No valid image was provided" };
    }

    try {
      const arrayBuffer = await formImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise<UploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          },
          (error, result) => {
            if (error || !result) {
              resolve({ error: "Something went wrong while uploading" });
            } else {
              resolve({ success: result });
            }
          }
        );
        uploadStream.end(buffer);
      });
    } catch (err: any) {
      return {
        error:
          typeof err === "string"
            ? err
            : err?.message || "Unknown error occurred",
      };
    }
  });
