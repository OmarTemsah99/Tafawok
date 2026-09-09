"use client"

import React from "react"
import { CheckCircle2, ShieldCheck, Ruler, Building, Zap, Layers, Car, Sparkles } from "lucide-react"
import { Property, PropertySpec } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { FormattedUnit } from "@/components/shared/FormattedUnit"
import { cn } from "@/lib/utils"

interface PropertySpecsProps {
  property: Property
  className?: string
}

export function PropertySpecs({ property, className }: PropertySpecsProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"

  const specIcons: Record<string, React.ReactNode> = {
    "Gross Leasable Area": <Building className="size-4 text-primary" />,
    "Floorplate Span": <Layers className="size-4 text-primary" />,
    "Clear Ceiling Height": <Ruler className="size-4 text-primary" />,
    "Passenger Elevators": <Sparkles className="size-4 text-primary" />,
    "Backup Power Generators": <Zap className="size-4 text-primary" />,
    "Underground Parking": <Car className="size-4 text-primary" />,
    "Total Site Area": <Building className="size-4 text-primary" />,
    "Clear Eaves Height": <Ruler className="size-4 text-primary" />,
    "Heavy Vehicle Loading Docks": <Layers className="size-4 text-primary" />,
    "Floor Slab Load Capacity": <Zap className="size-4 text-primary" />,
    "Commercial Showrooms": <Sparkles className="size-4 text-primary" />,
    "Perimeter Security & Weighbridge": <ShieldCheck className="size-4 text-primary" />,
    "Retail Anchor Footprint": <Building className="size-4 text-primary" />,
    "Total Commercial Units": <Layers className="size-4 text-primary" />,
    "Outdoor Plaza & Promenade": <Sparkles className="size-4 text-primary" />,
    "Secure Parking Bays": <Car className="size-4 text-primary" />,
  }

  return (
    <div className={cn("space-y-10", className)}>
      {/* Specifications Grid */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {t("propertyDetail.specsTitle")}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {isArabic
                ? "بيانات هندسية ومعمارية معتمدة وفق أعلى معايير التطوير التجاري"
                : "Certified architectural metrics adhering to institutional commercial development standards"}
            </p>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs font-semibold text-primary sm:inline-flex">
            <ShieldCheck className="size-3.5" />
            <span>ISO 9001 / Grade A</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {property.specs.map((spec: PropertySpec, index: number) => {
            const labelEn = spec.label.en
            const icon = specIcons[labelEn] || <Building className="size-4 text-primary" />

            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card/60 p-5 transition-all duration-200 hover:border-primary/40 hover:bg-card hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {t(spec.label)}
                  </span>
                  <div className="flex size-8 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                    {icon}
                  </div>
                </div>

                <div className="mt-4 flex items-baseline">
                  <FormattedUnit
                    value={spec.value}
                    unit={spec.unit}
                    locale={locale}
                    className="text-2xl font-extrabold tracking-tight text-foreground"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Engineering Highlights & Standards */}
      {property.highlights && property.highlights.length > 0 && (
        <div className="rounded-2xl border border-border/80 bg-secondary/15 p-6 sm:p-8 dark:bg-card/40">
          <h4 className="flex items-center gap-2 text-base font-bold text-foreground sm:text-lg">
            <ShieldCheck className="size-5 text-primary" />
            <span>{t("propertyDetail.keyHighlightsTitle")}</span>
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            {isArabic
              ? "مواصفات تشغيلية وبنية تحتية مجهزة لضمان استمرارية الأعمال بنسبة 100%"
              : "Mission-critical infrastructure specifications ensuring 100% operational uptime"}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {property.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/60 p-4 transition-colors hover:border-border"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-xs leading-relaxed font-medium text-foreground/90">
                  {t(highlight)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
