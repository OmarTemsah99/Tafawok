"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { Property } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface PropertyGalleryProps {
  property: Property
  className?: string
  showHeading?: boolean
}

export function PropertyGallery({
  property,
  className,
  showHeading = true,
}: PropertyGalleryProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"

  // Consolidate mainImage and gallery array
  const images = React.useMemo(() => {
    const list = [property.mainImage, ...(property.gallery || [])]
    return Array.from(new Set(list))
  }, [property])

  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        if (isArabic) handlePrev()
        else handleNext()
      } else if (e.key === "ArrowLeft") {
        if (isArabic) handleNext()
        else handlePrev()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [lightboxOpen, isArabic, handleNext, handlePrev])

  return (
    <div className={cn("space-y-4", className)}>
      {showHeading && (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {t("propertyDetail.galleryTitle")}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("propertyGallery.gallerySubtitle")}
            </p>
          </div>

          <button
            onClick={() => setLightboxOpen(true)}
            className="cursor-target inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-secondary"
          >
            <Maximize2 className="size-3.5 text-primary" />
            <span>{t("propertyGallery.fullscreenBtn")}</span>
          </button>
        </div>
      )}

      {/* Main Feature Image */}
      <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border/80 bg-muted sm:aspect-21/9">
        <Image
          src={images[activeIndex]}
          alt={`${t(property.name)} - ${activeIndex + 1}`}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
          className="cursor-pointer object-cover transition-transform duration-700 ease-out group-hover:scale-102"
          onClick={() => setLightboxOpen(true)}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

        {/* Floating Top Right Fullscreen Button when heading is omitted */}
        {!showHeading && (
          <div className="absolute inset-x-4 top-4 flex justify-end">
            <button
              onClick={() => setLightboxOpen(true)}
              className="cursor-target inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/80"
            >
              <Maximize2 className="size-3.5 text-primary" />
              <span>{t("propertyGallery.fullscreenBtn")}</span>
            </button>
          </div>
        )}

        {/* Floating Controls on Main Image */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
          <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-xs font-semibold backdrop-blur-md">
            {activeIndex + 1} {t("propertyGallery.imageOf")} {images.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label={t("propertyGallery.prev")}
              className="flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-primary"
            >
              <ChevronLeft className="size-4 rtl:rotate-180" />
            </button>
            <button
              onClick={handleNext}
              aria-label={t("propertyGallery.next")}
              className="flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-primary"
            >
              <ChevronRight className="size-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "relative aspect-16/10 h-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:h-18",
              activeIndex === idx
                ? "border-primary opacity-100 shadow-md"
                : "border-transparent opacity-50 hover:opacity-90"
            )}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 20vw, 150px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* shadcn Dialog Full-Screen Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton={false}
          className="flex h-[92vh] max-h-[92vh] w-[96vw] max-w-[96vw] flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-background/98 p-0 shadow-2xl backdrop-blur-2xl sm:w-[92vw] sm:max-w-6xl"
        >
          <DialogTitle className="sr-only">
            {t(property.name)} — {t("propertyDetail.galleryTitle")}
          </DialogTitle>
          <DialogDescription className="sr-only">
            High-resolution architectural photography showcase
          </DialogDescription>

          {/* Top Bar with Counter & Close */}
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-6 py-3.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-primary">
                {activeIndex + 1} / {images.length}
              </span>
              <span className="text-xs text-muted-foreground">
                • {t(property.name)}
              </span>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              aria-label={t("propertyGallery.close")}
              className="flex size-9 items-center justify-center rounded-lg border border-border/70 bg-secondary/80 text-foreground transition-colors hover:border-primary/40 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Main Modal Image Area with Navigation Arrows */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden p-2 sm:p-4">
            <button
              onClick={handlePrev}
              aria-label={t("propertyGallery.prev")}
              className="cursor-target absolute inset-s-4 z-20 flex size-11 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground shadow-lg backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="size-5 rtl:rotate-180" />
            </button>

            <button
              onClick={handleNext}
              aria-label={t("propertyGallery.next")}
              className="cursor-target absolute inset-e-4 z-20 flex size-11 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground shadow-lg backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="size-5 rtl:rotate-180" />
            </button>

            <div className="relative h-full w-full">
              <Image
                src={images[activeIndex]}
                alt={`${t(property.name)} - ${activeIndex + 1}`}
                fill
                sizes="(max-width: 1200px) 95vw, 1200px"
                className="object-contain select-none"
                priority
              />
            </div>
          </div>

          {/* Bottom Filmstrip Thumbnails */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto border-t border-border/60 bg-muted/20 p-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all select-none sm:h-14 sm:w-20",
                  activeIndex === idx
                    ? "border-primary shadow-sm ring-1 ring-primary/40"
                    : "border-transparent opacity-50 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
