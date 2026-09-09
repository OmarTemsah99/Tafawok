"use client"

import React from "react"
import { ExternalLink, MapPin, Compass } from "lucide-react"
import { Property } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { cn } from "@/lib/utils"

interface PropertyMapProps {
  property: Property
  className?: string
}

export function PropertyMap({ property, className }: PropertyMapProps) {
  const { t } = useLocaleStore()
  const location = property.location

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {t("propertyDetail.mapTitle")}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("propertyDetail.mapSubtitle")}
          </p>
        </div>

        {location.googleMapsDirectUrl && (
          <a
            href={location.googleMapsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <ExternalLink className="size-3.5" />
            <span>{t("propertyDetail.getDirections")}</span>
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Location Info Box */}
        <div className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 lg:col-span-1">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                <MapPin className="size-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {t("propertyDetail.locationAddress")}
                </span>
                <p className="mt-1 text-sm font-bold text-foreground">
                  {t(location.address)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t(location.city)}, {t(location.country)}
                </p>
              </div>
            </div>

            {location.coordinates && (
              <div className="flex items-start gap-3 pt-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-secondary/50 text-muted-foreground">
                  <Compass className="size-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {t("propertyDetail.gpsCoordinates")}
                  </span>
                  <p
                    className="mt-1 font-mono text-xs text-foreground tabular-nums"
                    dir="ltr"
                  >
                    {location.coordinates.lat.toFixed(4)}° N,{" "}
                    {location.coordinates.lng.toFixed(4)}° E
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-border/60 pt-4">
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              {t("propertyDetail.siteVisitsNote")}
            </p>
          </div>
        </div>

        {/* Embedded Map Container */}
        <div className="relative min-h-80 w-full overflow-hidden rounded-2xl border border-border/80 bg-muted shadow-sm lg:col-span-2">
          {location.googleMapsEmbedUrl ? (
            <iframe
              src={location.googleMapsEmbedUrl}
              title={`${t(property.name)} Location Map`}
              className="absolute inset-0 size-full border-0 contrast-105 grayscale-15 dark:hue-rotate-180 dark:invert-90"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex size-full items-center justify-center p-8 text-center text-xs text-muted-foreground">
              <span>{t("propertyDetail.mapUpdating")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
