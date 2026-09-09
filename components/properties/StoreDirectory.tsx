"use client"

import React, { useState, useMemo } from "react"
import { Search, Building, Phone } from "lucide-react"
import { Property, Store } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface StoreDirectoryProps {
  property: Property
  className?: string
}

export function StoreDirectory({ property, className }: StoreDirectoryProps) {
  const { t } = useLocaleStore()
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
              {t("storeDirectory.storesSubtitle")}
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
              "group inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors select-none",
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "border border-border/70 bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <span>{t("storeDirectory.filterAll")}</span>
            <span
              className={cn(
                "py-0.2 inline-flex items-center justify-center rounded-md px-1.5 text-[10px] font-semibold tabular-nums",
                selectedCategory === "all"
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted/70 text-muted-foreground"
              )}
            >
              {stores.length}
            </span>
          </button>

          {categories.map((catName) => {
            const count = stores.filter((s) => s.category.en === catName).length
            const isSelected = selectedCategory === catName
            const localizedCat = stores.find((s) => s.category.en === catName)
              ?.category || {
              en: catName,
              ar: catName,
            }

            return (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={cn(
                  "group inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-colors select-none",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "border border-border/70 bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <span>{t(localizedCat)}</span>
                <span
                  className={cn(
                    "py-0.2 inline-flex items-center justify-center rounded-md px-1.5 text-[10px] font-semibold tabular-nums",
                    isSelected
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted/70 text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Stores Directory Index Table */}
      {filteredStores.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/70 p-12 text-center">
          <Building className="mx-auto size-8 text-muted-foreground/60" />
          <p className="mt-3 text-sm font-medium text-foreground">
            {t("storeDirectory.noStores")}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View (>= lg: 1024px) */}
          <div className="hidden lg:block rounded-xl border border-border/70 bg-card overflow-hidden">
            <Table className="text-xs">
              <TableHeader>
                <TableRow className="border-b border-border/80 bg-muted/30 hover:bg-muted/30">
                  <TableHead className="py-3.5 ps-5 pe-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase text-start">
                    {t("propertyDetail.unit")}
                  </TableHead>
                  <TableHead className="px-4 py-3.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase text-start">
                    {t("storeDirectory.allTenants")}
                  </TableHead>
                  <TableHead className="px-4 py-3.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase text-start">
                    {t("propertyDetail.floor")}
                  </TableHead>
                  <TableHead className="px-4 py-3.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase text-start">
                    {t("contactForm.inquiryTypeLabel")}
                  </TableHead>
                  <TableHead className="py-3.5 ps-4 pe-5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase text-end">
                    {t("storeDirectory.directPhoneLabel")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.map((store: Store) => (
                  <TableRow
                    key={store.id}
                    className="transition-colors hover:bg-muted/20"
                  >
                    <TableCell
                      className="py-4 ps-5 pe-3 font-mono font-semibold whitespace-nowrap text-primary"
                      dir="ltr"
                    >
                      {store.unitNumber || "—"}
                    </TableCell>
                    <TableCell className="px-4 py-4 font-bold text-foreground">
                      <div>{t(store.name)}</div>
                      {store.description && (
                        <div className="mt-0.5 text-[11px] font-normal text-muted-foreground">
                          {t(store.description)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-4 whitespace-nowrap text-muted-foreground">
                      {t(store.floor)}
                    </TableCell>
                    <TableCell className="px-4 py-4 whitespace-nowrap text-muted-foreground">
                      {t(store.category)}
                    </TableCell>
                    <TableCell className="py-4 ps-4 pe-5 text-end whitespace-nowrap">
                      {store.phone ? (
                        <a
                          href={`tel:${store.phone.replace(/\s+/g, "")}`}
                          className="font-mono text-xs font-semibold text-foreground transition-colors hover:text-primary"
                        >
                          <PhoneNumber phone={store.phone} />
                        </a>
                      ) : (
                        <span className="text-muted-foreground/60">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Tablet & Phone Card Grid (< lg: 1024px) */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:hidden">
            {filteredStores.map((store: Store) => (
              <div
                key={store.id}
                className="flex flex-col justify-between rounded-xl border border-border/70 bg-card p-4.5 transition-colors hover:border-primary/40 shadow-xs"
              >
                <div className="space-y-3">
                  {/* Top Bar: Unit Pill + Floor / Level Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="inline-flex items-center font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/25 rounded-md px-2.5 py-0.5"
                      dir="ltr"
                    >
                      {store.unitNumber || "—"}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground truncate">
                      {t(store.floor)}
                    </span>
                  </div>

                  {/* Tenant Name + Category + Description */}
                  <div>
                    <h4 className="text-sm font-bold text-foreground sm:text-base leading-snug">
                      {t(store.name)}
                    </h4>
                    <span className="mt-1 inline-block text-[11px] font-medium text-primary">
                      {t(store.category)}
                    </span>
                    {store.description && (
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {t(store.description)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer / Touch Action */}
                <div className="mt-4 border-t border-border/50 pt-3">
                  {store.phone ? (
                    <a
                      href={`tel:${store.phone.replace(/\s+/g, "")}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/80 bg-secondary/40 py-2.5 px-3 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-secondary hover:text-primary active:scale-98"
                    >
                      <Phone className="size-3.5 text-primary rtl:-scale-x-100" />
                      <PhoneNumber phone={store.phone} />
                    </a>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-muted-foreground py-1">
                      <span className="text-[11px] uppercase tracking-wider">{t("propertyDetail.executiveConcierge")}</span>
                      <span className="text-[11px] font-semibold text-primary/80">{t("storeDirectory.statusOpen")}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
