"use client"

import React from "react"
import Link from "next/link"
import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react"
import { Property, PropertyType } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PropertySpecs } from "@/components/properties/PropertySpecs"
import { PropertyGallery } from "@/components/properties/PropertyGallery"
import { StoreDirectory } from "@/components/properties/StoreDirectory"
import { PropertyMap } from "@/components/properties/PropertyMap"
import { PropertyLeasingCard } from "@/components/properties/PropertyLeasingCard"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"
import { MotionFade } from "@/components/motion/MotionFade"

interface PropertyDetailClientProps {
  property: Property
}

export function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ChevronIcon = isArabic ? ChevronLeft : ChevronRight

  const propType: PropertyType = property.type || "office"

  const typeLabels: Record<PropertyType, { en: string; ar: string }> = {
    office: { en: "Corporate Office Hub", ar: "مجمع إداري للشركات" },
    retail: { en: "Destination Retail Mall", ar: "مركز تجاري ومول" },
    logistics: { en: "Logistics & Trade Complex", ar: "مجمع لوجستي وتجاري" },
  }

  const cleanPhone = property.contact.phone.replace(/[^+\d]/g, "")

  return (
    <div className="flex flex-col">
      {/* Property Hero & Header Section */}
      <section className="relative overflow-hidden border-b border-border/80 bg-linear-to-b from-secondary/40 via-background to-background pt-10 pb-16 sm:pt-14 sm:pb-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              {t("nav.home")}
            </Link>
            <ChevronIcon className="size-3 text-muted-foreground/60" />
            <Link href="/properties" className="transition-colors hover:text-foreground">
              {t("nav.properties")}
            </Link>
            <ChevronIcon className="size-3 text-muted-foreground/60" />
            <span className="font-semibold text-foreground truncate max-w-50 sm:max-w-none">
              {t(property.name)}
            </span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <MotionFade direction="up" delay={0.1}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                    <span className="size-1.5 rounded-full bg-primary" />
                    <span>{t(typeLabels[propType])}</span>
                  </span>

                  <span className="inline-flex items-center rounded-full border border-border/70 bg-secondary/50 px-3 py-1 font-mono text-xs font-semibold text-foreground">
                    {t(property.keyStats.zoning)}
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {t(property.name)}
                </h1>

                <p className="mt-3 text-base font-semibold text-primary sm:text-lg">
                  {t(property.tagline)}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <MapPin className="size-4 shrink-0 text-primary" />
                  <span>{t(property.location.address)}</span>
                </div>

                {/* Key Stat Chips */}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-border/70 bg-card/70 p-3 text-center">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {t("propertyCard.glaLabel")}
                    </span>
                    <p className="mt-0.5 font-mono text-sm font-bold text-foreground">
                      <BiDiIsolate>{property.keyStats.gla}</BiDiIsolate>
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-card/70 p-3 text-center">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {t("propertyCard.floorsLabel")}
                    </span>
                    <p className="mt-0.5 truncate text-xs font-bold text-foreground">
                      {t(property.keyStats.floors)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-card/70 p-3 text-center">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {isArabic ? "مواقف السيارات" : "Parking Slots"}
                    </span>
                    <p className="mt-0.5 font-mono text-sm font-bold text-foreground">
                      <BiDiIsolate>{property.keyStats.parkingCapacity}</BiDiIsolate>
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-card/70 p-3 text-center">
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {t("propertyCard.occupancyLabel")}
                    </span>
                    <p className="mt-0.5 font-mono text-sm font-bold text-primary">
                      <BiDiIsolate>{property.keyStats.occupancyRate}</BiDiIsolate>
                    </p>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/contact?property=${property.slug}`}
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <span>{t("propertyDetail.inquireLease")}</span>
                  </Link>

                  <a
                    href={`tel:${cleanPhone}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background px-5 py-3 text-xs font-bold text-foreground transition-all hover:border-primary/50 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <Phone className="size-3.5 text-primary rtl:-scale-x-100" />
                    <span>{t("propertyDetail.callNow")}</span>
                  </a>

                  {property.location.googleMapsDirectUrl && (
                    <a
                      href={property.location.googleMapsDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/40 px-5 py-3 text-xs font-semibold text-muted-foreground transition-all hover:border-border hover:text-foreground"
                    >
                      <MapPin className="size-3.5 text-primary" />
                      <span>{t("propertyDetail.getDirections")}</span>
                    </a>
                  )}
                </div>
              </MotionFade>
            </div>

            {/* Quick Hero Feature Highlight Card */}
            <div className="lg:col-span-5">
              <MotionFade direction="up" delay={0.2}>
                <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl sm:p-8">
                  <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck className="size-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {isArabic ? "ضمانات الجودة والمواصفات" : "Institutional Grade Assurance"}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-foreground">
                    {t("propertyDetail.overviewTitle")}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {t(property.description)}
                  </p>

                  <div className="mt-6 space-y-3 border-t border-border/60 pt-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{isArabic ? "المساحة البنائية الإجمالية:" : "Built-Up Area (BUA):"}</span>
                      <span className="font-mono font-bold text-foreground"><BiDiIsolate>{property.keyStats.builtUpArea}</BiDiIsolate></span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{isArabic ? "مستوى التصنيف التجاري:" : "Commercial Classification:"}</span>
                      <span className="font-semibold text-primary">{t(property.keyStats.zoning)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{isArabic ? "جاهزية الاستلام والتأجير:" : "Leasing Availability:"}</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{isArabic ? "متاح للتأجير الفوري" : "Immediate Availability"}</span>
                    </div>
                  </div>
                </div>
              </MotionFade>
            </div>
          </div>
        </div>
      </section>

      {/* Main Detail Content */}
      <div className="py-14 sm:py-20">
        <div className="container mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {/* Section 1: Visual Photo Gallery & Lightbox */}
          <MotionFade direction="up">
            <PropertyGallery property={property} />
          </MotionFade>

          {/* Section 2: Architectural & Engineering Specs */}
          <MotionFade direction="up">
            <PropertySpecs property={property} />
          </MotionFade>

          {/* Section 3: Stores & Tenants Directory (if applicable) */}
          {property.stores && property.stores.length > 0 && (
            <MotionFade direction="up">
              <StoreDirectory property={property} />
            </MotionFade>
          )}

          {/* Section 4: Location & Embedded Map */}
          <MotionFade direction="up">
            <PropertyMap property={property} />
          </MotionFade>

          {/* Section 5: Direct Leasing & Owner Reach */}
          <MotionFade direction="up">
            <PropertyLeasingCard property={property} />
          </MotionFade>
        </div>
      </div>
    </div>
  )
}
