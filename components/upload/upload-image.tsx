"use client";

import { uploadImage } from "@/server/upload-image";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";

export default function UploadImage() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const updateLayer = useLayerStore((state) => state.updateLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/webp": [".webp"],
      "image/jpeg": [".jpeg"],
    },
    onDrop: async (acceptFiles, fileRejections) => {
      if (acceptFiles.length) {
        const formData = new FormData();
        formData.append("image", acceptFiles[0]);
        const objectUrl = URL.createObjectURL(acceptFiles[0]);
        setGenerating(true);
        updateLayer({
          id: activeLayer.id,
          url: objectUrl,
          width: 0,
          height: 0,
          name: "uploading",
          publicId: "",
          format: "",
          resourceType: "image",
        });

        setActiveLayer(activeLayer.id);
        //STATE MANAGEMENT
        const res = await uploadImage({ image: formData });
        if (res?.data?.success) {
          updateLayer({
            id: activeLayer.id,
            url: res.data.success.url,
            width: res.data.success.width,
            height: res.data.success.height,
            name: res.data.success.original_filename,
            publicId: res.data.success.public_id,
            format: res.data.success.format,
            resourceType: res.data.success.resource_type,
          });
          setActiveLayer(activeLayer.id);
          setGenerating(false);
        }
        if (res?.data?.error) {
          setGenerating(false);
        }
      }
    },
  });
  if (!activeLayer.url) {
    return (
      <Card
        className={cn(
          "hover:cursor-pointer hover:bg-secondary hover:border-primary transition-all ease-in-out duration-300 border-2 border-dashed",
          `${isDragActive ? "animate-pulse border-primary bg-secondary scale-[1.02]" : "border-muted-foreground/25"}`
        )}
        {...getRootProps()}
      >
        <CardContent className="flex flex-col h-full items-center justify-center px-2 py-24 text-xs gap-6">
          <input {...getInputProps()} />
          <div className="flex items-center flex-col justify-center gap-4">
            <div className={cn(
              "rounded-full bg-primary/10 p-8 transition-all duration-300",
              isDragActive && "bg-primary/20 scale-110"
            )}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("text-primary", isDragActive && "animate-bounce")}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="text-center space-y-2">
              <p className="text-foreground text-2xl font-semibold">
                {isDragActive
                  ? "Drop your image here!"
                  : "Drag & Drop or Click to Upload"}
              </p>
              <p className="text-muted-foreground text-sm">
                Supported formats: <span className="font-medium">.jpg, .png, .webp, .jpeg</span>
              </p>
              <p className="text-muted-foreground text-xs">
                Transform your images with AI-powered editing tools
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
