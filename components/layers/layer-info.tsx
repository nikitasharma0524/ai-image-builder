"use client";

import { Layer, useLayerStore } from "@/lib/layer-store";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { EllipsisIcon, Trash2 } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

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

  const handleDelete = () => {
    // If this is the last layer, don't delete it
    if (layers.length === 1) {
      return;
    }

    // Set active layer to another layer before deleting
    const otherLayer = layers.find((l, index) => index !== layerIndex);
    if (otherLayer) {
      setActiveLayer(otherLayer.id);
    }

    // Remove the layer
    removeLayer(layer.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="sm">
          <EllipsisIcon size={14}></EllipsisIcon>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Layer Information</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-2">
          <p>
            <span className="font-bold">Filename:</span> {layer.name || "Untitled"}
          </p>
          <p>
            <span className="font-bold">Format:</span> {layer.format || "N/A"}
          </p>
          <p>
            <span className="font-bold">Size:</span> {layer.width || 0} × {layer.height || 0}
          </p>
        </div>
        <Button
          className="flex items-center justify-center gap-2 w-full"
          variant={layers.length === 1 ? "outline" : "destructive"}
          onClick={handleDelete}
          disabled={layers.length === 1}
        >
          <Trash2 size={14} />
          <span>{layers.length === 1 ? "Cannot Delete Last Layer" : "Delete Layer"}</span>
        </Button>
        {layers.length === 1 && (
          <p className="text-xs text-center text-muted-foreground">
            You must have at least one layer
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
