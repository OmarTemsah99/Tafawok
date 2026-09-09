"use client"

import React, { useState, useMemo } from "react"
import { Search, Building, MapPin, Tag } from "lucide-react"
import { Property, Store } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StoreDirectoryProps {
  property: Property
  className?: string
}

export function StoreDirectory({ property, className }: StoreDirectoryProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const stores = useMemo(() => property.stores || [], [property.stores])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>()
    stores.forEach((s) => {
      set.add(s.category.en)
    })
    return Array.from(set)
  }, [stores])

  // Filter stores based on search query and category
  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesCategory =
        selectedCategory === "all" || store.category.en === selectedCategory

      if (!matchesCategory) return false

      if (!searchQuery.trim()) return true

      const query = searchQuery.toLowerCase().trim()
      const nameEn = store.name.en.toLowerCase()
      const nameAr = store.name.ar.toLowerCase()
      const unit = (store.unitNumber || "").toLowerCase()
      const descEn = (store.description?.en || "").toLowerCase()
      const descAr = (store.description?.ar || "").toLowerCase()

      return (
        nameEn.includes(query) ||
        nameAr.includes(query) ||
        unit.includes(query) ||
        descEn.includes(query) ||
        descAr.includes(query)
      )
    })
  }, [stores, selectedCategory, searchQuery])

  if (stores.length === 0) {
    return null
  }

  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {t("propertyDetail.storesTitle")}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {isArabic
                ? "دليل شامل للشركات والجهات المصرفية والمحلات والمرافق المتواجدة بالمبنى"
                : "Directory of commercial tenants, banking centers, retail flagships, and amenities"}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("storeDirectory.searchPlaceholder")}
              className="w-full rounded-xl border border-border/80 bg-background/80 py-2 ps-9 pe-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "rounded-lg px-3 py-1.5 font-medium transition-colors select-none",
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "border border-border/70 bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {t("storeDirectory.allCategories")} ({stores.length})
          </button>

          {categories.map((catName) => {
            const count = stores.filter((s) => s.category.en === catName).length
            const isSelected = selectedCategory === catName
            const localizedCat =
              stores.find((s) => s.category.en === catName)?.category || {
                en: catName,
                ar: catName,
              }

            return (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={cn(
                  "rounded-lg px-3 py-1.5 font-medium transition-colors select-none",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "border border-border/70 bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {t(localizedCat)} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Stores Listing */}
      {filteredStores.length === 0 ? (
        <Card className="border-dashed p-12 text-center">
          <Building className="mx-auto size-8 text-muted-foreground/60" />
          <p className="mt-3 text-sm font-medium text-foreground">
            {t("storeDirectory.noStores")}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStores.map((store: Store) => (
            <Card
              key={store.id}
              className="flex flex-col justify-between border-border/70 bg-card transition-all duration-200 hover:border-primary/40 hover:shadow-md"
            >
              <CardHeader className="p-5 pb-2">
                {/* Header with Unit & Status */}
                <div className="flex items-center justify-between gap-2">
                  {store.unitNumber ? (
                    <Badge variant="outline" className="font-mono text-[11px] font-bold text-primary border-primary/25 bg-primary/5">
                      {t("propertyDetail.unit")} {store.unitNumber}
                    </Badge>
                  ) : <span />}
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {store.status === "open"
                      ? t("storeDirectory.statusOpen")
                      : t("storeDirectory.statusComingSoon")}
                  </span>
                </div>

                {/* Name & Category */}
                <CardTitle className="mt-2 text-base font-bold text-foreground">
                  {t(store.name)}
                </CardTitle>

                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-primary/90">
                  <Tag className="size-3 shrink-0" />
                  <span>{t(store.category)}</span>
                </div>
              </CardHeader>

              <CardContent className="px-5 py-2">
                {store.description && (
                  <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                    {t(store.description)}
                  </CardDescription>
                )}
              </CardContent>

              {/* Footer with Floor & Direct Phone */}
              <CardFooter className="flex flex-col items-stretch gap-2 border-t border-border/50 bg-muted/15 p-4 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0 text-muted-foreground/70" />
                  <span className="truncate">{t(store.floor)}</span>
                </div>

                {store.phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {isArabic ? "هاتف الوحدة:" : "Direct Phone:"}
                    </span>
                    <a
                      href={`tel:${store.phone.replace(/\s+/g, "")}`}
                      className="font-mono text-xs font-semibold text-primary hover:underline"
                    >
                      <PhoneNumber phone={store.phone} />
                    </a>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
