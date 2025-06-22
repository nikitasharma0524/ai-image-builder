import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Crop, Eraser, Image } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";
import { genRemove } from "@/server/gen-remove";
import { format } from "path";
import { bgRemoval } from "@/server/bg-remove";
import { genFill } from "@/server/gen-fill";

export default function GenerativeFill() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const [activeTag, setActiveTag] = useState("");
  const generating = useImageStore((state) => state.generating);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const PREVIEW_SIZE = 250;
  const EXPANSION_THRESHOLD = 250;

  const previewStyle = useMemo(() => {
    if (!activeLayer.width || !activeLayer.height) return {};

    const newWidth = activeLayer.width + width;
    const newHeight = activeLayer.height + height;
    const scale = Math.min(PREVIEW_SIZE / newWidth, PREVIEW_SIZE / newHeight);

    return {
      width: `${newWidth * scale}px`,
      height: `${newHeight * scale}px`,

      backgroundImage: `url(${activeLayer.url})`,
      backgroundSize: `${activeLayer.width * scale}px ${
        activeLayer.height * scale
      }px`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative" as const,
    };
  }, [activeLayer, width, height]);

  const previewOverlayStyle = useMemo(() => {
    if (!activeLayer.width || !activeLayer.height) return {};

    const scale = Math.min(
      PREVIEW_SIZE / (activeLayer.width + width),
      PREVIEW_SIZE / (activeLayer.height + height)
    );

    const leftWidth = width > 0 ? `${(width / 2) * scale}px` : "0";
    const rightWidth = width > 0 ? `${(width / 2) * scale}px` : "0";
    const topHeight = height > 0 ? `${(height / 2) * scale}px` : "0";
    const bottomHeight = height > 0 ? `${(height / 2) * scale}px` : "0";

    return {
      position: "absolute" as const,
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      boxShadow: `
      inset ${leftWidth} ${topHeight} 0 rgba(48, 119, 255, 1),
      inset -${rightWidth} ${topHeight} 0 rgba(48, 119, 255, 1),
      inset ${leftWidth} -${bottomHeight} 0 rgba(48, 119, 255, 1),
      inset -${rightWidth} -${bottomHeight} 0 rgba(48, 119, 255, 1)
    `,
    };
  }, [activeLayer, width, height]);

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="p-8">
          <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
            Generative Fill <Crop size={20} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex flex-col h-full">
          <div className="space-y-2 pb-4">
            <h3>Generative Fill</h3>
            <p className="text-sm text-muted-foreground">
              Remove the background of an image with one simple click
            </p>
          </div>
          {activeLayer.width && activeLayer.height ? (
            <div className="flex justify-evenly">
              <div className="flex flex-col items-center">
                <span className="text-xs">Current Size:</span>
                <p className="text-sm text-primary font-bold">
                  {activeLayer.width}×{activeLayer.height}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs">New Size</span>
                <p className="text-sm text-primary font-bold">
                  {activeLayer.width}×{activeLayer.height + height}
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="text-center">
            <Label htmlFor="width">Modify Width</Label>
            <Input
              name="width"
              type="range"
              max={activeLayer.width}
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              className="h-8"
            />
          </div>
          <div className="preview-container flex-grow"></div>
          <div className="flex gap-2 items-center justify-center">
            <div className="text-center">
              <Label htmlFor="width">Modify Height</Label>
              <Input
                name="height"
                type="range"
                max={activeLayer.height}
                min={-activeLayer.height! + 100}
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="h-8"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: `${PREVIEW_SIZE}px`,
            height: `${PREVIEW_SIZE}px`,
          }}
          className="preview-container flex-grow flex justify-center items-center overflow-hidden m-auto"
        >
          <div style={previewStyle}>
            <div className="animate-pulse" style={previewOverlayStyle}></div>
          </div>
        </div>

        <Button
          disabled={!activeLayer?.url || generating}
          onClick={async () => {
            if (!activeLayer?.url) return;
            const newLayerId = crypto.randomUUID();

            setGenerating(true);
            const res = await genFill({
              aspect: "1:1",
              height: height + activeLayer.height!,
              width: width + activeLayer.width!,
              activeImage: activeLayer.url!,
            });

            if (res?.data?.success) {
              setGenerating(false);
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: activeLayer.format,
                height: activeLayer.height! + height,
                width: activeLayer.width! + width,
                name: `genFill_${activeLayer.name}`,
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
          {generating ? "Generating..." : "Generative fill"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
