"use client";

import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, Sparkles, Wand2 } from "lucide-react";

export default function Loading() {
  const generating = useImageStore((state) => state.generating);
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);

  return (
    <Dialog open={generating} onOpenChange={setGenerating}>
      <DialogContent className="sm:max-w-[440px] flex flex-col items-center gap-6 p-8">
        <DialogHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="relative">
              <Wand2 className="h-16 w-16 text-primary animate-bounce" />
              <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <DialogTitle className="text-2xl">AI is Working Its Magic</DialogTitle>
          <DialogDescription className="text-base">
            Transforming <span className="font-semibold text-primary">{activeLayer.name || "your image"}</span> with AI...
          </DialogDescription>
        </DialogHeader>

        <div className="w-full space-y-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span>Processing with Cloudinary AI</span>
          </div>

          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-pulse rounded-full w-full"></div>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            This typically takes 5-15 seconds depending on image complexity
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
