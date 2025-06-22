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

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="p-8">
          <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
            Content Aware <Eraser size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div>
          <h3>Smart AI Remove</h3>
          <p className="text-sm text-muted-foreground">
            Generatively remove any part of the image
          </p>
        </div>
        <div className="grid grid-cols-3 items-center gap-2 mt-2">
          <Label htmlFor="selection">Selection</Label>
          <Input
            id="selection"
            className="col-span-2 h-8"
            value={activeTag}
            onChange={(e) => setActiveTag(e.target.value)}
          />
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
          className="w-full mt-4"
        >
          Magic Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
}
