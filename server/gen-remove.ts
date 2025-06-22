"use server";

import { checkImageProcessing } from "@/lib/check-processing";
import { actionClient } from "@/lib/safe-action";
import { v2 as cloudinary } from "cloudinary";
import z from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const genRemoveSchema = z.object({
  prompt: z.string().nonempty(),
  activeImage: z.string().nonempty(),
});

export const genRemove = actionClient
  .schema(genRemoveSchema)
  .action(async ({ parsedInput: { activeImage, prompt } }) => {
    const parts = activeImage.split("/upload/");
    if (parts.length !== 2) {
      throw new Error("Invalid Cloudinary URL format");
    }

    const removeUrl = `${parts[0]}/upload/e_gen_remove:${prompt}/${parts[1]}`;

    const maxAttempts = 20;
    const delay = 500;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const isProcessed = await checkImageProcessing(removeUrl);
      if (isProcessed) {
        return {
          success: removeUrl,
        };
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    throw new Error("Image processing timeout");
  });
