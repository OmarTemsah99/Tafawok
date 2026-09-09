"use client"

import React, { useState, useMemo } from "react"
import { Search, Car, MapPin, Layers, Building2 } from "lucide-react"
import { Property } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PropertyCard } from "@/components/properties/PropertyCard"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"
import { MotionFade } from "@/components/motion/MotionFade"
import { cn } from "@/lib/utils"

interface PropertiesDirectoryClientProps {
  properties: Property[]
}

export function PropertiesDirectoryClient({
  properties,
}: PropertiesDirectoryClientProps) {
  const { t } = useLocaleStore()

  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const filterTabs = [
    { id: "all", label: t("propertiesPage.filterAll") },
    { id: "office", label: t("propertiesPage.filterOffice") },
    { id: "retail", label: t("propertiesPage.filterRetail") },
    { id: "logistics", label: t("propertiesPage.filterLogistics") },
  ]

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesType = activeFilter === "all" || p.type === activeFilter
      if (!matchesType) return false

      if (!searchQuery.trim()) return true
      const query = searchQuery.toLowerCase().trim()
      const nameEn = p.name.en.toLowerCase()
      const nameAr = p.name.ar.toLowerCase()
      const tagEn = p.tagline.en.toLowerCase()
      const tagAr = p.tagline.ar.toLowerCase()
      const locEn = p.location.city.en.toLowerCase()
      const locAr = p.location.city.ar.toLowerCase()

      return (
        nameEn.includes(query) ||
        nameAr.includes(query) ||
        tagEn.includes(query) ||
        tagAr.includes(query) ||
        locEn.includes(query) ||
        locAr.includes(query)
      )
    })
  }, [properties, activeFilter, searchQuery])

  return (
    <div className="flex flex-col">
      {/* Directory Page Header */}
      <section className="relative overflow-hidden border-b border-border/80 bg-linear-to-b from-secondary/40 via-background to-background py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionFade direction="up" delay={0.05}>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                <span className="size-1.5 rounded-full bg-primary" />
                <span>{t("propertiesPage.badge")}</span>
              </span>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("propertiesPage.title")}
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("propertiesPage.subtitle")}
              </p>
            </div>
          </MotionFade>
        </div>
      </section>

      {/* Directory Content Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          {/* Portfolio Overview Summary Strip */}
          <MotionFade direction="up" delay={0.1}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
                <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Layers className="size-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {t("propertiesPage.totalGla")}
                  </span>
                  <p className="mt-0.5 text-xl font-extrabold whitespace-nowrap text-foreground tabular-nums">
                    <BiDiIsolate>
                      {t("propertiesPage.totalGlaValue")}
                    </BiDiIsolate>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
                <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Car className="size-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {t("propertiesPage.totalParking")}
                  </span>
                  <p className="mt-0.5 text-xl font-extrabold whitespace-nowrap text-foreground tabular-nums">
                    <BiDiIsolate>
                      {t("propertiesPage.totalParkingValue")}
                    </BiDiIsolate>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
                <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {t("propertiesPage.activeHubs")}
                  </span>
                  <p className="mt-0.5 text-xl font-extrabold whitespace-nowrap text-foreground tabular-nums">
                    3 {t("propertiesPage.flagshipHubsCount")}
                  </p>
                </div>
              </div>
            </div>
          </MotionFade>

          {/* Filter and Search Controls */}
          <MotionFade direction="up" delay={0.2}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 rounded-xl border border-border/70 bg-secondary/30 p-1.5">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={cn(
                      "rounded-lg px-4 py-2 text-xs font-semibold transition-all select-none",
                      activeFilter === tab.id
                        ? "bg-background text-primary shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("propertiesPage.searchPlaceholder")}
                  className="w-full rounded-xl border border-border/80 bg-background py-2.5 ps-9 pe-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
            </div>
          </MotionFade>

          {/* Property Cards Grid */}
          {filteredProperties.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-16 text-center">
              <Building2 className="mx-auto size-10 text-muted-foreground/50" />
              <h4 className="mt-3 text-base font-bold text-foreground">
                {t("propertiesPage.noResults")}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("propertiesPage.noResultsHint")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property, idx) => (
                <MotionFade
                  key={property.id}
                  direction="up"
                  delay={0.1 * (idx + 1)}
                >
                  <PropertyCard property={property} priority={idx === 0} />
                </MotionFade>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
