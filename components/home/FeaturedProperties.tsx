"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PROPERTIES, UI_DICTIONARY } from "@/content/cre-data"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MotionFade } from "@/components/motion/MotionFade"
import {
  AccordionGallery,
  type AccordionGalleryItem,
} from "@/components/motion/AccordionGallery"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  MapPin,
  Layers,
  ArrowUpRight,
} from "lucide-react"

export function FeaturedProperties() {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  const galleryItems: AccordionGalleryItem[] = useMemo(() => {
    return [
      {
        image: PROPERTIES[0].mainImage,
        label: isRtl
          ? "مبنى 360 للأعمال — القاهرة الجديدة (45,000 م²)"
          : "Building 360 Business Park — New Cairo (45,000 m²)",
        link: `/properties/${PROPERTIES[0].slug}`,
        alt: t(PROPERTIES[0].name),
      },
      {
        image: PROPERTIES[1].mainImage,
        label: isRtl
          ? "مركز تفوق التجاري — وجهة التسوق والترفيه (28,000 م²)"
          : "Tafawok Retail Center — Destination Retail Hub (28,000 m²)",
        link: `/properties/${PROPERTIES[1].slug}`,
        alt: t(PROPERTIES[1].name),
      },
      {
        image: PROPERTIES[2].mainImage,
        label: isRtl
          ? "مجمع تفوق اللوجستي — محور الصناعة والتجارة (62,000 م²)"
          : "Tafawok Logistics Park — Industrial & Trade Hub (62,000 m²)",
        link: `/properties/${PROPERTIES[2].slug}`,
        alt: t(PROPERTIES[2].name),
      },
      {
        image:
          "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80",
        label: isRtl
          ? "المقاولات العامة والإنشاءات المتكاملة (EPC Execution)"
          : "Turnkey EPC Execution & Engineering Precision",
        link: "/properties",
        alt: "Turnkey EPC Execution",
      },
      {
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
        label: isRtl
          ? "الأصول متعددة الاستخدامات والاستثمار التجاري"
          : "Prime Mixed-Use Commercial & Hospitality Hubs",
        link: "/properties",
        alt: "Mixed-Use Developments",
      },
    ]
  }, [isRtl, t])

  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-muted/20 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <MotionFade delay={0.05} direction="up" className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-bold tracking-wider text-primary uppercase">
              <Building2 className="size-3.5" />
              <span>
                {isRtl
                  ? "الأصول التجارية الرائدة"
                  : "Flagship Commercial Portfolio"}
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {t(UI_DICTIONARY.home.portfolioTitle)}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {t(UI_DICTIONARY.home.portfolioSubtitle)}
            </p>
          </MotionFade>

          <MotionFade delay={0.15} direction="up">
            <Link
              href="/properties"
              className={buttonVariants({
                variant: "outline",
                className:
                  "gap-2 rounded-xl border-border bg-background/80 font-semibold shadow-xs transition-all hover:border-primary hover:text-primary active:scale-[0.98]",
              })}
            >
              <span>
                {isRtl
                  ? "استعراض كافة الأصول (3 مجمعات)"
                  : "View Complete Directory (3 Hubs)"}
              </span>
              <ArrowIcon className="size-4" />
            </Link>
          </MotionFade>
        </div>

        {/* 1. Interactive 3D Accordion Gallery (from prompt.md) */}
        <div className="mt-12">
          <AccordionGallery
            items={galleryItems}
            defaultIndex={0}
            expandRatio={0.52}
            height={480}
            gap={12}
            radius={24}
            trigger="hover"
            accentColor="oklch(0.553 0.195 38.402)"
            grayscale={true}
          />
        </div>

        {/* 2. Three Flagship Quick Cards with shadcn Card Composition */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROPERTIES.map((property, idx) => {
            return (
              <MotionFade
                key={property.id}
                delay={0.1 * (idx + 1)}
                direction="up"
                className="flex"
              >
                <Card className="cursor-target architectural-card group relative flex w-full flex-col justify-between overflow-hidden border-border/80 bg-card shadow-sm transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="border-primary/25 bg-primary/5 font-mono text-xs font-bold text-primary"
                      >
                        0{idx + 1} {"//"} {t(property.category)}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="font-mono text-xs font-bold text-muted-foreground"
                      >
                        <BiDiIsolate>
                          {property.keyStats.builtUpArea}
                        </BiDiIsolate>
                      </Badge>
                    </div>

                    <CardTitle className="mt-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {t(property.name)}
                    </CardTitle>

                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0 text-primary" />
                      <span>{t(property.location.address)}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardDescription className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {t(property.description)}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between border-t border-border/60 bg-muted/20 py-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <Layers className="size-3.5 text-primary" />
                      <span>
                        GLA: <BiDiIsolate>{property.keyStats.gla}</BiDiIsolate>
                      </span>
                    </div>

                    <Link
                      href={`/properties/${property.slug}`}
                      className="cursor-target inline-flex items-center gap-1 text-xs font-bold text-primary transition-transform group-hover:translate-x-1"
                    >
                      <span>{isRtl ? "استكشف الأصل" : "Explore"}</span>
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </MotionFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}
