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

const bgRemoveSchema = z.object({
  activeImage: z.string().nonempty(),
  format: z.string(),
});

export const bgRemoval = actionClient
  .schema(bgRemoveSchema)
  .action(async ({ parsedInput: { activeImage, format } }) => {
    const form = activeImage.split(format);
    const pngConvert = form[0] + "png";
    const parts = pngConvert.split("/upload/");

    const bgRemoveUrl = `${parts[0]}/upload/e_background_removal/${parts[1]}`;

    const maxAttempts = 20;
    const delay = 500;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const isProcessed = await checkImageProcessing(bgRemoveUrl);
      if (isProcessed) {
        return {
          success: bgRemoveUrl,
        };
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    throw new Error("Image processing timeout");
  });
