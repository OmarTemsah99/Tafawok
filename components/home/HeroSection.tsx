"use client"

import React from "react"
import Link from "next/link"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { UI_DICTIONARY } from "@/content/cre-data"
import { buttonVariants } from "@/components/ui/button"
import { MotionFade } from "@/components/motion/MotionFade"
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  ShieldCheck,
  Phone,
  TrendingUp,
} from "lucide-react"

export function HeroSection() {
  const { locale, t } = useLocaleStore()
  const isRtl = locale === "ar"
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-background pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Master Architectural Headline */}
          <MotionFade delay={0.1} direction="up">
            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl lg:leading-[1.06]">
              {t(UI_DICTIONARY.home.heroTitle)}
            </h1>
          </MotionFade>

          {/* Subtitle with High-Caliber Authority */}
          <MotionFade delay={0.2} direction="up">
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg md:text-xl">
              {t(UI_DICTIONARY.home.heroSubtitle)}
            </p>
          </MotionFade>

          {/* Dual Action CTAs */}
          <MotionFade delay={0.3} direction="up">
            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/properties"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "cursor-target w-full gap-2.5 rounded-xl px-7 py-5 sm:px-8 sm:py-6 text-xs sm:text-sm font-bold shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] sm:w-auto",
                })}
              >
                <span>{t(UI_DICTIONARY.home.exploreAssets)}</span>
                <ArrowIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>

              <Link
                href="/ceo-message"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "cursor-target w-full gap-2.5 rounded-xl border-border bg-card/80 px-6 py-5 sm:px-7 sm:py-6 text-xs sm:text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/60 hover:bg-primary/5 active:scale-[0.98] sm:w-auto",
                })}
              >
                <Phone className="phone-icon size-4 shrink-0 text-primary" />
                <span>{t(UI_DICTIONARY.home.reachOwner)}</span>
              </Link>
            </div>
          </MotionFade>

          {/* Fast Credentials Bar — Pill Badges on Mobile, Inline Dots on Desktop */}
          <MotionFade delay={0.4} direction="up">
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-x-8 sm:gap-y-2 text-xs text-muted-foreground sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 backdrop-blur-xs sm:border-0 sm:bg-transparent sm:p-0">
                <Building2 className="size-3.5 text-primary shrink-0" />
                <span>
                  {isRtl ? "3 أصول تجارية كبرى مملوكة" : "3 Flagship Commercial Assets"}
                </span>
              </div>
              <span className="hidden text-border sm:inline">•</span>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 backdrop-blur-xs sm:border-0 sm:bg-transparent sm:p-0">
                <ShieldCheck className="size-3.5 text-primary shrink-0" />
                <span>
                  {isRtl ? "سجل إنجاز يمتد لـ 25+ عاماً" : "25+ Years Proven Track Record"}
                </span>
              </div>
              <span className="hidden text-border sm:inline">•</span>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 backdrop-blur-xs sm:border-0 sm:bg-transparent sm:p-0">
                <TrendingUp className="size-3.5 text-primary shrink-0" />
                <span>
                  {isRtl ? "مساحات تأجير تفوق 77,500 م²" : "77,500+ m² Commercial GLA"}
                </span>
              </div>
            </div>
          </MotionFade>
        </div>
      </div>
    </section>
  )
}
