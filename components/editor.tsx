"use client";

import { ModeToggle } from "@/components/theme/mode-toggle";
import Layers from "./layers/layers";
import ActiveImage from "./active-image";
import UploadForm from "./upload/upload-form";
import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";
import ImageTools from "./toolbar/image-toolbar";
import Loading from "./loading-screen";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Editor() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLayers, setShowLayers] = useState(false);

  return (
    <div className="flex h-full relative">
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Left Sidebar - Tools */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-40
          py-6 px-4 w-[280px] lg:basis-[240px] shrink-0
          border-r border-border bg-card/95 backdrop-blur-sm lg:bg-card/50
          transform transition-transform duration-300 ease-in-out
          ${showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="pb-8 text-center space-y-4 mt-12 lg:mt-0">
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              AI Image Builder
            </h1>
            <p className="text-xs text-muted-foreground">Powered by Cloudinary AI</p>
          </div>
          <ModeToggle />
        </div>
        <div className="flex flex-col gap-4">
          {activeLayer.resourceType === "image" ? (
            <div className="space-y-2">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2">
                AI Tools
              </h2>
              <ImageTools />
            </div>
          ) : null}
        </div>
      </div>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <UploadForm />
        <ActiveImage />
      </div>

      {/* Mobile Layers Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 lg:hidden"
        onClick={() => setShowLayers(!showLayers)}
      >
        <Sparkles className="h-4 w-4" />
      </Button>

      {/* Right Sidebar - Layers */}
      <div
        className={`
          fixed lg:relative inset-y-0 right-0 z-40
          w-full sm:w-[360px] lg:w-auto
          transform transition-transform duration-300 ease-in-out
          ${showLayers ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
      >
        <Layers onClose={() => setShowLayers(false)} />
      </div>

      {/* Overlay for mobile layers */}
      {showLayers && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setShowLayers(false)}
        />
      )}

      <Loading />
    </div>
  );
}
