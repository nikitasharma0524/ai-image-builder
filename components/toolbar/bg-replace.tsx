import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { ImageOff } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { bgReplace } from "@/server/bg-replace";

export default function BackgroundReplace() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const generating = useImageStore((state) => state.generating);
  const [prompt, setPrompt] = useState("");
  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="py-8 w-full hover:scale-105 transition-transform duration-200 hover:shadow-md">
          <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
            BG Replace <ImageOff size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">AI Background Replace</h3>
          <p className="text-sm text-muted-foreground">
            Replace your background with AI-generated scenes. Describe the setting you want (e.g., "sunset beach", "office room", "forest path").
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="prompt">New Background</Label>
          <Input
            id="prompt"
            placeholder="e.g., sunset beach, office, forest..."
            className="h-10"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Describe the scene you envision</p>
        </div>
        <Button
          disabled={!activeLayer?.url || generating || !prompt.trim()}
          onClick={async () => {
            if (!activeLayer?.url) return;
            const newLayerId = crypto.randomUUID();

            setGenerating(true);
            const res = await bgReplace({
              activeImage: activeLayer.url,
              prompt: prompt,
            });

            if (res?.data?.success) {
              setGenerating(false);
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: activeLayer.format,
                height: activeLayer.height,
                width: activeLayer.width,
                name: "bg-replaced" + activeLayer.name,
                publicId: activeLayer.publicId,
                resourceType: "image",
              });
              setActiveLayer(newLayerId);
              setGenerating(false);
              if (res?.serverError) {
                setGenerating(false);
              }
            }
          }}
          className="w-full"
        >
          {generating ? "Generating..." : "Replace Background"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
