import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Image } from "lucide-react";
import { Button } from "../ui/button";
import { bgRemoval } from "@/server/bg-remove";

export default function BgRemove() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const generating = useImageStore((state) => state.generating);

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="py-8 w-full hover:scale-105 transition-transform duration-200 hover:shadow-md">
          <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
            Background Remove
            <Image size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Background Removal</h3>
          <p className="text-sm text-muted-foreground">
            Instantly remove the background from your image with AI. Perfect for creating transparent PNGs, product photos, and professional portraits.
          </p>
        </div>
        <Button
          disabled={!activeLayer?.url || generating}
          onClick={async () => {
            if (!activeLayer?.url) return;
            const newLayerId = crypto.randomUUID();

            setGenerating(true);
            const res = await bgRemoval({
              activeImage: activeLayer.url,
              format: activeLayer.format!,
            });

            if (res?.data?.success) {
              setGenerating(false);
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: "png",
                height: activeLayer.height,
                width: activeLayer.width,
                name: `genRemoved_${activeLayer.name}`,
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
          className="w-full mt-4"
        >
          {generating ? "Removing Background..." : "Remove Background"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
