"use client";
import { Layer } from "@/lib/layer-store";
import {
  ReactCompareSliderImage,
  ReactCompareSlider,
} from "react-compare-slider";

export default function ImageComparision({ layers }: { layers: Layer[] }) {
  if (layers.length === 0) {
    return <div>No layers to be compared</div>;
  }
  if (layers.length === 1) {
    return (
      <div className="h-full">
        <ReactCompareSliderImage
          src={layers[0].url || ""}
          srcSet={layers[0].url || ""}
          alt={layers[0].name || "Single image"}
          className="rounded-lg object-contain"
        />
      </div>
    );
  }
  return (
    <ReactCompareSlider
      itemOne={
        <ReactCompareSliderImage
          src={layers[0].url || ""}
          srcSet={layers[0].url || ""}
          alt={layers[0].name || "Image one"}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={layers[1].url || ""}
          srcSet={layers[1].url || ""}
          alt={layers[1].name || "Image two"}
        />
      }
    />
  );
}
