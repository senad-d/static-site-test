"use client";

import * as React from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ProjectGalleryProps = {
  imagePaths: string[];
  title: string;
};

/**
 * ProjectGallery
 *
 * Responsive gallery for project images.
 * - On mobile: horizontal scrollable strip.
 * - On larger screens: simple grid.
 * - Each image opens a full-screen lightbox when clicked.
 */
export function ProjectGallery({ imagePaths, title }: ProjectGalleryProps) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (!imagePaths || imagePaths.length === 0) {
    return null;
  }

  const hasMultipleImages = imagePaths.length > 1;
  const currentSrc = imagePaths[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? imagePaths.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === imagePaths.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          Project photos
        </p>
        <div
          className={cn(
            "flex gap-3 overflow-x-auto pb-2",
            "md:grid md:grid-cols-2 md:overflow-visible md:pb-0",
          )}
        >
          {imagePaths.map((src, index) => (
            <DialogTrigger asChild key={src}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative h-40 min-w-[72%] overflow-hidden rounded-md border border-border/60 bg-muted/40 md:h-40 md:min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Image
                  src={src}
                  alt={`${title} photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-[1.02] group-active:scale-[0.98]"
                  sizes="(max-width: 768px) 75vw, 50vw"
                />
                <span className="sr-only">
                  Open larger view of {title} photo {index + 1}
                </span>
              </button>
            </DialogTrigger>
          ))}
        </div>
      </div>

      <DialogContent
        showCloseButton={false}
        className="bg-transparent border-none shadow-none p-0"
      >
        <DialogTitle className="sr-only">
          {title} photo {activeIndex + 1}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Enlarged project photo {activeIndex + 1} of {imagePaths.length} for {title}.
        </DialogDescription>

        <DialogClose asChild>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="fixed top-4 right-4 z-50 rounded-full bg-background/80 shadow-md hover:bg-background"
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close image</span>
          </Button>
        </DialogClose>

        <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 pt-10">
          <div className="relative w-full h-[70vh] max-h-[90vh]">
            <Image
              src={currentSrc}
              alt={`${title} photo ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          {hasMultipleImages && (
            <div className="mt-2 flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrev}
              >
                Previous
              </Button>
              <span className="text-xs text-muted-foreground">
                {activeIndex + 1} / {imagePaths.length}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleNext}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}