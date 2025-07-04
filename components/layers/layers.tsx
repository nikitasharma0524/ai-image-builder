"use client";

import { useLayerStore } from "@/lib/layer-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useImageStore } from "@/lib/image-store";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowRight, Layers2 } from "lucide-react";
import LayerImage from "./layer-image";
import LayerInfo from "./layer-imfo";
import { useMemo } from "react";
import Image from "next/image";

export default function Layers() {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const generating = useImageStore((state) => state.generating);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const layerComparisonMode = useLayerStore(
    (state) => state.layerComparisonMode
  );
  const setLayerComparisonMode = useLayerStore(
    (state) => state.setLayerComparisonMode
  );

  const comparedLayers = useLayerStore((state) => state.comparedLayers);
  const toggleComparedLayer = useLayerStore(
    (state) => state.toggleComparedLayer
  );
  const setComparedLayers = useLayerStore((state) => state.setComparedLayers);
  const getLayerName = useMemo(() => {
    return (id: string) => {
      const layer = layers.find((l) => l.id === id);
      return layer ? layer.url : "Nothing here";
    };
  }, [layers]);
  const visibleLayers = useMemo(() => {
    return layerComparisonMode
      ? layers.filter((layer) => layer.url && layer.resourceType === "image")
      : layers;
  }, [layerComparisonMode, layers]);

  return (
    <Card className="h-full basis-[320px] shrink-0 scrollbar-thin scrollbar-track-secondary overflow-y-scroll scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-hidden relative flex flex-col shadow-2xl">
      <CardHeader className="sticky top-0 z-50 px-4 py-6 min-h-24 bg-card shadow-sm">
        {layerComparisonMode ? (
          <div>
            <CardTitle className="text-sm pb-2">Comparing...</CardTitle>
            <CardDescription className="flex gap-2 items-center">
              <Image
                alt="compare"
                width={32}
                height={32}
                src={getLayerName(comparedLayers[0]) as string}
              />

              {comparedLayers.length > 0 && <ArrowRight />}

              {comparedLayers.length > 1 ? (
                <Image
                  alt="compare"
                  width={32}
                  height={32}
                  src={getLayerName(comparedLayers[1]) as string}
                />
              ) : null}
            </CardDescription>
          </div>
        ) : null}

        <div>
          <CardTitle className="text-sm">
            {activeLayer.name || "Layers"}
          </CardTitle>
          {activeLayer.width && activeLayer.height ? (
            <CardDescription>
              {activeLayer.width}x{activeLayer.height}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {visibleLayers.map((layer, index) => (
          <div
            className={cn(
              "cursor-pointer ease-in-out hover:bg-secondary border border-transparent",
              {
                "animate-pulse": generating,
                "border-primary": layerComparisonMode
                  ? comparedLayers.includes(layer.id)
                  : activeLayer.id === layer.id,
              }
            )}
            key={layer.id}
            onClick={() => {
              if (generating) return;

              if (layerComparisonMode) {
                toggleComparedLayer(layer.id);
              } else {
                setActiveLayer(layer.id);
              }
            }}
          >
            <div className="relative p-4 flex items-center">
              <div className="flex gap-2 items-center h-8 w-full justify-between">
                {!layer.url ? (
                  <p className="text-xs font-medium justify-self-end">
                    New Layer
                  </p>
                ) : null}
                <LayerImage layer={layer} />
                <LayerInfo layer={layer} layerIndex={index} />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <div className="flex justify-around">
        <Button
          onClick={() => {
            addLayer({
              id: crypto.randomUUID(),
              url: "",
              height: 0,
              width: 0,
              publicId: "",
              name: "",
              format: "",
            });
          }}
          className="flex gap-2"
          variant={"outline"}
        >
          <span>Create Layers</span>
          <Layers2 className="text-secondary-foreground" size={18} />
        </Button>
        <Button
          className="flex items-center gap-2"
          variant={"outline"}
          onClick={() => {
            if (layerComparisonMode) {
              setLayerComparisonMode(!layerComparisonMode);
            } else {
              setComparedLayers([activeLayer.id]);
            }
          }}
        >
          <span>
            {layerComparisonMode ? "Stop Comparing" : "Compare Layers"}
          </span>
        </Button>
      </div>
    </Card>
  );
}
