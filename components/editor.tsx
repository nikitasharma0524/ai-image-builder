"use client";

import { ModeToggle } from "@/components/theme/mode-toggle";
import Layers from "./layers/layers";
import ActiveImage from "./active-image";
import UploadForm from "./upload/upload-form";
import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";
import ImageTools from "./toolbar/image-toolbar";
import Loading from "./loading-screen";
import { Sparkles } from "lucide-react";

export default function Editor() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  return (
    <div className="flex h-full">
      <div className="py-6 px-4 basis-[240px] shrink-0 border-r border-border bg-card/50">
        <div className="pb-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              AI Image Builder
            </h1>
            <p className="text-xs text-muted-foreground">Powered by Cloudinary AI</p>
          </div>
          <ModeToggle />
        </div>
        <div className="flex flex-col gap-4">
          {activeLayer.resourceType === "image" ? (
            <div className="space-y-2">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2">
                AI Tools
              </h2>
              <ImageTools />
            </div>
          ) : null}
        </div>
      </div>
      <UploadForm />
      <ActiveImage />
      <Layers />
      <Loading />
    </div>
  );
}
