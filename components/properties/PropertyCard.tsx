"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Building2, Car, MapPin } from "lucide-react"
import { Property, PropertyType } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  property: Property
  className?: string
  priority?: boolean
}

export function PropertyCard({
  property,
  className,
  priority = false,
}: PropertyCardProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  const propType: PropertyType = property.type || "office"

  const typeLabels: Record<PropertyType, { en: string; ar: string }> = {
    office: { en: "Corporate Office Hub", ar: "مجمع إداري للشركات" },
    retail: { en: "Destination Retail Mall", ar: "مركز تجاري ومول" },
    logistics: { en: "Logistics & Trade Complex", ar: "مجمع لوجستي وتجاري" },
  }

  return (
    <Card
      className={cn(
        "group relative flex flex-col overflow-hidden border-border/80 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl dark:bg-card/90",
        className
      )}
    >
      {/* Visual Asset Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <Image
          src={property.mainImage}
          alt={t(property.name)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/25 to-transparent" />

        {/* Top Badges */}
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className="border-border/60 bg-background/85 text-[11px] font-semibold text-foreground backdrop-blur-md"
          >
            <span className="me-1.5 size-1.5 rounded-full bg-primary" />
            {t(typeLabels[propType])}
          </Badge>
          <Badge
            variant="secondary"
            className="border-border/60 bg-background/80 font-mono text-[10px] font-semibold text-muted-foreground backdrop-blur-md"
          >
            <BiDiIsolate>{property.keyStats.builtUpArea}</BiDiIsolate>
          </Badge>
        </div>

        {/* Location chip pinned over bottom of image */}
        <div className="absolute inset-x-4 bottom-3 flex items-center gap-1.5 text-xs font-medium text-foreground/90 drop-shadow-xs">
          <MapPin className="size-3.5 shrink-0 text-primary" />
          <span className="truncate">{t(property.location.address)}</span>
        </div>
      </div>

      {/* Card Header */}
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          <Link
            href={`/properties/${property.slug}`}
            className="focus:outline-none"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {t(property.name)}
          </Link>
        </CardTitle>
        <p className="line-clamp-1 text-xs font-medium text-primary/90">
          {t(property.tagline)}
        </p>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="px-6 pt-0 pb-4">
        <CardDescription className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {t(property.description)}
        </CardDescription>

        {/* Architectural Specs Summary */}
        <div className="mt-5 grid grid-cols-3 gap-2 rounded-lg border border-border/60 bg-muted/25 py-3 text-center">
          <div className="flex min-w-0 flex-col items-center px-1">
            <span className="max-w-full truncate text-[10px] font-medium text-muted-foreground">
              {t("propertyCard.glaLabel")}
            </span>
            <span className="mt-0.5 font-mono text-xs font-bold text-foreground">
              <BiDiIsolate>{property.keyStats.gla}</BiDiIsolate>
            </span>
          </div>

          <div className="flex min-w-0 flex-col items-center border-x border-border/40 px-1">
            <span className="max-w-full truncate text-[10px] font-medium text-muted-foreground">
              {t("propertyCard.floorsLabel")}
            </span>
            <span
              className="mt-0.5 max-w-full truncate text-xs font-semibold text-foreground"
              title={t(property.keyStats.floors)}
            >
              {t(property.keyStats.floors)}
            </span>
          </div>

          <div className="flex min-w-0 flex-col items-center px-1">
            <span className="max-w-full truncate text-[10px] font-medium text-muted-foreground">
              {t("propertyCard.buaLabel")}
            </span>
            <span className="mt-0.5 font-mono text-xs font-bold text-foreground">
              <BiDiIsolate>{property.keyStats.builtUpArea}</BiDiIsolate>
            </span>
          </div>
        </div>
      </CardContent>

      <Separator />

      {/* Card Footer */}
      <CardFooter className="flex items-center justify-between bg-muted/15 px-6 py-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Car className="size-3.5 text-muted-foreground/80" />
            <BiDiIsolate>{t(property.keyStats.parkingCapacity)}</BiDiIsolate>
          </span>
          {property.stores && (
            <span className="inline-flex items-center gap-1">
              <Building2 className="size-3.5 text-muted-foreground/80" />
              <span>
                {property.stores.length} {t("propertiesPage.tenantsCount")}
              </span>
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          <span>{t("propertiesPage.viewAsset")}</span>
          <ArrowIcon className="size-3.5 shrink-0" />
        </span>
      </CardFooter>
    </Card>
  )
}
