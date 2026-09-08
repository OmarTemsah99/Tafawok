"use client"

import { useLocaleStore } from "@/stores/useLocaleStore"
import {
  COMPANY_IDENTITY,
  OWNER_DETAILS,
  PROPERTIES,
  UI_DICTIONARY,
} from "@/content/cre-data"
import { Button } from "@/components/ui/button"
import {
  Globe,
  ArrowRight,
  ArrowLeft,
  Phone,
  MapPin,
  Building2,
} from "lucide-react"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { FormattedUnit } from "@/components/shared/FormattedUnit"

export default function Page() {
  const { locale, toggleLocale, t } = useLocaleStore()
  const isRtl = locale === "ar"

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center p-6 md:p-12">
      {/* Header Banner */}
      <div className="mb-8 flex w-full flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 shadow-sm md:flex-row">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Globe className="size-3.5" />
            <span>Phase 1: i18n & Data Architecture Verified</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {t(COMPANY_IDENTITY.name)}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(COMPANY_IDENTITY.tagline)}
          </p>
        </div>

        {/* Locale Toggle */}
        <Button
          onClick={toggleLocale}
          variant="outline"
          size="lg"
          className="shrink-0 gap-2 border-primary font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Globe className="size-4" />
          <span>{locale === "ar" ? "English (LTR)" : "العربية (RTL)"}</span>
          {isRtl ? (
            <ArrowLeft className="size-4" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </Button>
      </div>

      {/* Owner Access Card Preview */}
      <div className="mb-8 w-full rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {t(UI_DICTIONARY.owner.reachOwnerTitle)}
            </span>
            <h2 className="text-xl font-bold text-foreground">
              {t(OWNER_DETAILS.name)}
            </h2>
            <p className="text-sm font-medium text-primary">
              {t(OWNER_DETAILS.role)}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={`tel:${OWNER_DETAILS.phone}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Phone className="size-3.5 shrink-0" />
              <PhoneNumber phone={OWNER_DETAILS.phone} />
            </a>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          &ldquo;{t(OWNER_DETAILS.visionSnippet)}&rdquo;
        </p>
      </div>

      {/* 3 Commercial Properties Preview */}
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Building2 className="size-5 text-primary" />
            <span>{t(UI_DICTIONARY.home.portfolioTitle)}</span>
          </h3>
          <span className="text-xs text-muted-foreground">
            3 {isRtl ? "أصول تجارية رئيسية" : "Flagship Locations"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PROPERTIES.map((prop) => (
            <div
              key={prop.id}
              className="flex flex-col justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <div>
                <span className="mb-2 inline-block rounded bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                  {t(prop.category)}
                </span>
                <h4 className="mb-1 text-base font-bold">{t(prop.name)}</h4>
                <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
                  {t(prop.tagline)}
                </p>
              </div>

              <div className="space-y-1.5 border-t border-border/60 pt-3 text-xs">
                <div className="flex items-baseline justify-between text-muted-foreground">
                  <span>{t(UI_DICTIONARY.propertyCard.glaLabel)}:</span>
                  <FormattedUnit
                    value={prop.specs[0].value}
                    unit={prop.specs[0].unit}
                    locale={locale}
                  />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <MapPin className="size-3 shrink-0 text-primary" />
                  <span className="truncate">{t(prop.location.address)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    {isRtl ? "المتاجر المتواجدة:" : "Directory Stores:"}
                  </span>
                  <strong className="text-primary">{prop.stores.length}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
