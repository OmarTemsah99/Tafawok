"use client"

import React from "react"
import { Check } from "lucide-react"
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

  return (
    <div className={cn("space-y-12", className)}>
      {/* Specifications Editorial Hairline Table */}
      <div>
        <div className="mb-8 border-b border-border/80 pb-4">
          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("propertyDetail.specsTitle")}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("propertyDetail.specsSubtitle")}
          </p>
        </div>

        {/* Hairline Grid of Technical Specs */}
        <div className="grid grid-cols-1 gap-x-12 divide-y divide-border/40 md:grid-cols-2 md:divide-y-0 lg:grid-cols-3">
          {property.specs.map((spec: PropertySpec, index: number) => (
            <div
              key={index}
              className="flex items-baseline justify-between border-b border-border/40 py-4 transition-colors hover:border-primary/40"
            >
              <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                {t(spec.label)}
              </span>
              <FormattedUnit
                value={spec.value}
                unit={spec.unit}
                locale={locale}
                className="text-sm font-bold text-foreground tabular-nums sm:text-base"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Highlights & Standards Checklist */}
      {property.highlights && property.highlights.length > 0 && (
        <div className="border-t border-border/80 pt-8">
          <h4 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {t("propertyDetail.keyHighlightsTitle")}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("propertyDetail.highlightsSubtitle")}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            {property.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 border-b border-border/30 py-3"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-xs leading-relaxed text-foreground/90 sm:text-sm">
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
