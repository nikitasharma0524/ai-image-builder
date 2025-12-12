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

const bgReplaceSchema = z.object({
  activeImage: z.string().nonempty(),
  prompt: z.string(),
});

export const bgReplace = actionClient
  .schema(bgReplaceSchema)
  .action(async ({ parsedInput: { activeImage, prompt } }) => {
    const parts = activeImage.split("/upload/");

    const bgReplaceUrl = prompt
      ? `${parts[0]}/upload/e_gen_background_replace:prompt_${prompt}/${parts[1]}`
      : `${parts[0]}/upload/e_gen_background_replace/${parts[1]}`;

    const maxAttempts = 20;
    const delay = 500;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const isProcessed = await checkImageProcessing(bgReplaceUrl);
      if (isProcessed) {
        return {
          success: bgReplaceUrl,
        };
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    throw new Error("Image processing timeout");
  });
