"use client";

import { useLayerStore } from "@/lib/layer-store";
import { useState } from "react";
import UploadImage from "./upload-image";

export default function UploadForm() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const [selectedType, setSelectedType] = useState("image");

  if (!activeLayer.url) {
    return (
      <div className="w-full p-4 sm:p-8 md:p-12 lg:p-24 flex flex-col justify-center h-full min-h-[50vh] lg:min-h-0">
        {selectedType === "image" ? <UploadImage /> : null}
      </div>
    );
  }
}
