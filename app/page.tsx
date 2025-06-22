"use client";
import Editor from "@/components/editor";
import { ImageStore } from "@/lib/image-store";
import { layerStore } from "@/lib/layer-store";

export default function Home() {
  return (
    <div className="h-full">
      <layerStore.Provider
        initialValue={{
          layerComparisonMode: false,
          layers: [
            {
              id: crypto.randomUUID(),
              url: "",
              height: 0,
              width: 0,
              publicId: "",
            },
          ],
        }}
      >
        <ImageStore.Provider initialValue={{ generating: false }}>
          <main className="h-full">
            <Editor />
          </main>
        </ImageStore.Provider>
      </layerStore.Provider>
    </div>
  );
}
