"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Building2,
  ShoppingBag,
  Warehouse,
  Phone,
} from "lucide-react"
import { PROPERTIES } from "@/content/cre-data"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { cn } from "@/lib/utils"

interface PropertyDropdownProps {
  className?: string
  onItemClick?: () => void
}

const PROPERTY_ICONS: Record<string, React.ElementType> = {
  "building-360-business-park": Building2,
  "tafawok-retail-center": ShoppingBag,
  "tafawok-logistics-park": Warehouse,
}

export function PropertyDropdown({
  className,
  onItemClick,
}: PropertyDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  // Close on Escape or click outside
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleLinkClick = () => {
    setIsOpen(false)
    onItemClick?.()
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors select-none",
          isOpen
            ? "bg-primary/5 text-primary"
            : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
        )}
      >
        <span>{isArabic ? "الأصول التجارية" : "Commercial Assets"}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200 ease-out",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>

      {/* Origin-aware Mega-Menu Card */}
      <div
        className={cn(
          "absolute top-full left-1/2 z-50 mt-2 w-[92vw] max-w-[620px] origin-top -translate-x-1/2 rounded-2xl border border-border bg-background p-4 text-foreground shadow-2xl transition-all duration-200 ease-out sm:w-[580px]",
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        )}
      >
        {/* Header summary */}
        <div className="mb-2 flex items-center justify-between border-b border-border/50 px-3 py-2">
          <div>
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              {isArabic ? "محفظة تفوق العقارية" : "TAFAWOK Asset Portfolio"}
            </span>
            <p className="text-[11px] text-muted-foreground">
              {isArabic
                ? "3 صروح تجارية واستثمارية رائدة في مواقع استراتيجية"
                : "3 Flagship Commercial Hubs Developed & Owned by TAFAWOK"}
            </p>
          </div>
          <Link
            href="/properties"
            onClick={handleLinkClick}
            className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <span>{isArabic ? "عرض الكل" : "View All"}</span>
            <ArrowIcon className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>

        {/* 3 Flagship Properties List */}
        <div className="space-y-1.5">
          {PROPERTIES.map((prop) => {
            const Icon = PROPERTY_ICONS[prop.slug] || Building2
            return (
              <Link
                key={prop.id}
                href={`/properties/${prop.slug}`}
                onClick={handleLinkClick}
                className="group flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-150 hover:border-border/60 hover:bg-secondary/70"
              >
                {/* Thumbnail Image */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-muted">
                  <Image
                    src={prop.mainImage}
                    alt={t(prop.name)}
                    fill
                    sizes="64px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute start-1 bottom-1 text-white">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="truncate text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                      {t(prop.name)}
                    </h4>
                    <span className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      {prop.keyStats.gla}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                    {t(prop.tagline)}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-[11px] font-medium text-muted-foreground/80">
                    <span>{t(prop.category)}</span>
                    <span>•</span>
                    <span>{t(prop.location.city)}</span>
                    <span>•</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {prop.keyStats.occupancyRate}{" "}
                      {isArabic ? "إشغال" : "Leased"}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom Fast Action Bar */}
        <div className="mt-3 flex flex-col items-center justify-between gap-2 border-t border-border/50 px-2 pt-2.5 text-xs sm:flex-row">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Phone className="phone-icon h-3 w-3 text-primary" />
            <span>
              {isArabic ? "مكتب التأجير المركزي:" : "Central Leasing Desk:"}
            </span>
            <PhoneNumber
              phone="+20 110 042 4829"
              showIcon={false}
              className="font-semibold text-foreground hover:text-primary"
            />
          </div>
          <Link
            href="/contact"
            onClick={handleLinkClick}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          >
            <span>
              {isArabic ? "طلب استئجار / موعد معاينة" : "Schedule Asset Tour"}
            </span>
            <ArrowIcon className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
