"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { CEO_PROFILE } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"

export function CeoHeroSection() {
  const { t } = useLocaleStore()

  return (
    <section
      id="executive-profile"
      className="relative overflow-hidden border-b border-border/70 bg-linear-to-b from-secondary/40 via-background to-background pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24"
    >
      {/* Background architectural pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <MotionFade direction="up" delay={0.05}>
          {/* Executive Header */}
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {t(CEO_PROFILE.name)}
            </h1>
            <p className="mt-2 text-base font-bold text-primary sm:text-lg">
              {t(CEO_PROFILE.role)}
            </p>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{t(CEO_PROFILE.company)}</span>
              <span aria-hidden="true">•</span>
              <span>{t("ceoMessage.leadershipTenure")}</span>
            </div>
          </div>

          {/* Highlight Quote Banner - Architectural Unboxed Editorial */}
          <div className="mt-8 rounded-e-2xl border-s-3 border-primary bg-muted/20 py-4 ps-6 pe-5">
            <blockquote className="text-base leading-relaxed font-bold text-foreground italic sm:text-lg md:text-xl lg:text-2xl">
              &ldquo;{t("ceoMessage.quoteHighlight")}&rdquo;
            </blockquote>
          </div>
        </MotionFade>
      </div>
    </section>
  )
}
