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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  const [open, setOpen] = React.useState(false)
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  const handleLinkClick = () => {
    setOpen(false)
    onItemClick?.()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 xl:px-3.5 text-xs xl:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 select-none hover:bg-secondary/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
          open
            ? "bg-secondary/80 text-foreground font-semibold"
            : "text-foreground/75",
          className
        )}
      >
        <span>{isArabic ? "الأصول التجارية" : "Commercial Assets"}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ease-out",
            open && "rotate-180 text-foreground"
          )}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={8}
        className="w-[92vw] sm:w-[580px] max-w-[620px] rounded-2xl border border-border bg-background p-4 text-foreground shadow-2xl overflow-hidden"
      >
        {/* Header summary */}
        <div className="mb-2 flex items-center justify-between border-b border-border/50 px-2 py-1.5">
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
                className="group flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-150 hover:border-border/60 hover:bg-secondary/70 cursor-pointer"
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
                    <Badge
                      variant="outline"
                      className="border-primary/30 bg-primary/10 text-[10px] font-semibold text-primary px-2 py-0.5 h-5"
                    >
                      {prop.keyStats.gla}
                    </Badge>
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

        <Separator className="my-2" />

        {/* Bottom Fast Action Bar */}
        <div className="flex flex-col items-center justify-between gap-2 px-1 pt-1 text-xs sm:flex-row">
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
