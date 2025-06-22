"use client";

import { Layer, useLayerStore } from "@/lib/layer-store";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { EllipsisIcon, Trash2 } from "lucide-react";
import { DialogContent } from "../ui/dialog";

export default function LayerInfo({
  layer,
  layerIndex,
}: {
  layer: Layer;
  layerIndex: number;
}) {
  const layers = useLayerStore((state) => state.layers);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const removeLayer = useLayerStore((state) => state.removeLayer);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <EllipsisIcon size={14}></EllipsisIcon>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className="text-lg font-medium text-center mb-2">
          Layer {layer.id}
        </h3>
        <div className="py-4 space-y-0.5">
          <p>
            <span className="font-bold">Filename:</span> {layer.name}
          </p>
          <p>
            <span className="font-bold">Format:</span> {layer.format}
          </p>
          <p>
            <span className="font-bold">Size:</span> {layer.width}X
            {layer.height}
          </p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation;
            setActiveLayer(layerIndex === 0 ? layers[1].id : layers[0].id);
            removeLayer(layer.id);
          }}
        >
          <span>Delete Layer</span>
          <Trash2 size={14}></Trash2>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
