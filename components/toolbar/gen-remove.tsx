import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Eraser } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { genRemove } from "@/server/gen-remove";

export default function GenRemove() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const [activeTag, setActiveTag] = useState("");
  const generating = useImageStore((state) => state.generating);

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="py-8 w-full hover:scale-105 transition-transform duration-200 hover:shadow-md">
          <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
            Smart Remove <Eraser size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Smart AI Remove</h3>
          <p className="text-sm text-muted-foreground">
            Remove any object from your image using AI. Just describe what you want to remove (e.g., "person", "car", "watermark") and let AI do the magic!
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="selection">What to remove?</Label>
          <Input
            id="selection"
            placeholder="e.g., person, car, text..."
            className="h-10"
            value={activeTag}
            onChange={(e) => setActiveTag(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Be specific for best results</p>
        </div>
        <Button
          onClick={async () => {
            if (!activeLayer?.url) return;
            const newLayerId = crypto.randomUUID();

            setGenerating(true);
            const res = await genRemove({
              prompt: activeTag,
              activeImage: activeLayer.url,
            });

            if (res?.data?.success) {
              setGenerating(false);
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: activeLayer.format,
                height: activeLayer.height,
                width: activeLayer.width,
                name: `genRemoved_${activeLayer.name}`,
                publicId: activeLayer.publicId,
                resourceType: "image",
              });
              setActiveLayer(newLayerId);
            }
          }}
          className="w-full"
          disabled={!activeTag.trim() || generating}
        >
          {generating ? "Removing..." : "Magic Remove"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
