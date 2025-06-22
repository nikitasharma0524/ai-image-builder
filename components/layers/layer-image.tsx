"use client";

import { Layer, layerStore } from "@/lib/layer-store";
import Image from "next/image";

export default function LayerImage({ layer }: { layer: Layer }) {
  if (!layer.url) return null;

  return (
    <>
      <div className="h-12 gap-2 flex items-center justify-center">
        <Image
          className="w-full object-contain h-full rounded-sm"
          alt="dd"
          src={layer.format === "mp4" ? layer.poster || layer.url : layer.url}
          width={50}
          height={50}
        />
        <div>
          <p className="text-xs">
            {`${layer.name?.slice(0, 15)}.${layer.format}`}
          </p>
        </div>
      </div>
    </>
  );
}
