"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { Property } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { cn } from "@/lib/utils"

interface PropertyGalleryProps {
  property: Property
  className?: string
}

export function PropertyGallery({ property, className }: PropertyGalleryProps) {
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
      if (e.key === "Escape") {
        setLightboxOpen(false)
      } else if (e.key === "ArrowRight") {
        if (isArabic) handlePrev()
        else handleNext()
      } else if (e.key === "ArrowLeft") {
        if (isArabic) handleNext()
        else handlePrev()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    // Lock body scroll
    const origOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = origOverflow
    }
  }, [lightboxOpen, isArabic, handleNext, handlePrev])

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {t("propertyDetail.galleryTitle")}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {isArabic
              ? "معاينة معمارية عالية الدقة للمشروع والواجهات والمساحات الداخلية"
              : "High-resolution architectural photography of exteriors, atriums, and interior floorplates"}
          </p>
        </div>

        <button
          onClick={() => setLightboxOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-secondary"
        >
          <Maximize2 className="size-3.5 text-primary" />
          <span>{isArabic ? "معاينة مكبرة" : "Fullscreen Gallery"}</span>
        </button>
      </div>

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
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "relative aspect-16/10 overflow-hidden rounded-lg border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              activeIndex === idx
                ? "border-primary shadow-md"
                : "border-transparent opacity-60 hover:opacity-100"
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

      {/* Full-Screen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-xl animate-in fade-in-0 duration-200"
        >
          {/* Top Bar with Counter & Close */}
          <div className="absolute inset-x-6 top-6 flex items-center justify-between text-foreground">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-primary">
                {activeIndex + 1} / {images.length}
              </span>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                • {t(property.name)}
              </span>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              aria-label={t("propertyGallery.close")}
              className="flex size-10 items-center justify-center rounded-full border border-border/80 bg-secondary/80 text-foreground transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label={t("propertyGallery.prev")}
            className="absolute inset-s-6 z-10 flex size-12 items-center justify-center rounded-full border border-border/70 bg-card/80 text-foreground shadow-lg backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="size-6 rtl:rotate-180" />
          </button>

          <button
            onClick={handleNext}
            aria-label={t("propertyGallery.next")}
            className="absolute inset-e-6 z-10 flex size-12 items-center justify-center rounded-full border border-border/70 bg-card/80 text-foreground shadow-lg backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="size-6 rtl:rotate-180" />
          </button>

          {/* Main Modal Image */}
          <div className="relative h-[80vh] w-full max-w-6xl overflow-hidden rounded-2xl">
            <Image
              src={images[activeIndex]}
              alt={`${t(property.name)} - ${activeIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}
