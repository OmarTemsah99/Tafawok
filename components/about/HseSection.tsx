"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { HSE_CHARTER } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import { Separator } from "@/components/ui/separator"
import { Award, FileText } from "lucide-react"

export function HseSection() {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"

  return (
    <section
      id="hse"
      className="relative border-b border-border/70 bg-card py-20 md:py-28"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <MotionFade delay={0.05} direction="up" className="max-w-2xl">
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {t("about.hseTitle")}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {t("about.hseSubtitle")}
            </p>
          </MotionFade>

          <MotionFade delay={0.15} direction="up">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
              <span>{t("about.hseZeroHarm")}</span>
            </div>
          </MotionFade>
        </div>

        {/* Corporate Safety Charter Monograph Card */}
        <div className="mt-12">
          <MotionFade direction="up" delay={0.1}>
            <div className="rounded-2xl border border-border/80 bg-background p-6 shadow-sm sm:p-8 md:p-10">
              <div className="flex flex-col justify-between gap-4 pb-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="size-4 text-primary" />
                  <span
                    className={
                      isRtl ? "" : "font-mono tracking-widest uppercase"
                    }
                  >
                    {t("about.hsePolicyNote")}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <Award className="size-3.5" />
                  <span>
                    {isRtl
                      ? "ميثاق معتمد ومطبق ميدانياً"
                      : "Official Enforced Charter"}
                  </span>
                </span>
              </div>

              <Separator className="opacity-70" />

              {/* Policy Statement Quote */}
              <div className="my-6 rounded-e-xl border-s-3 border-emerald-500 bg-muted/20 py-4 ps-6 pe-5">
                <blockquote className="text-base leading-relaxed font-bold text-foreground italic sm:text-lg lg:text-xl">
                  &ldquo;{t(HSE_CHARTER.policyStatement)}&rdquo;
                </blockquote>
              </div>

              <Separator className="opacity-70" />

              {/* Signatory Byline (Typographic, No Avatar) */}
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <span
                    className={`text-[11px] font-semibold text-muted-foreground ${isRtl ? "" : "tracking-wider uppercase"}`}
                  >
                    {t("about.hseSignedBy")}
                  </span>
                  <div className="text-base font-extrabold text-foreground">
                    {t(HSE_CHARTER.signatory.name)}
                  </div>
                  <div className="text-xs font-medium text-primary">
                    {t(HSE_CHARTER.signatory.role)}
                  </div>
                </div>

                {/* ISO Standards Cluster */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {HSE_CHARTER.standards.map((std, idx) => (
                    <span
                      key={idx}
                      className="rounded border border-border/80 px-2 py-0.5 font-mono text-[11px] font-bold text-muted-foreground"
                    >
                      {std.code}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </MotionFade>
        </div>

        {/* 6 Operational Commitments - Swiss Editorial Numbered Rows */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <h3 className="text-lg font-extrabold text-foreground sm:text-xl">
              {isRtl
                ? "الالتزامات التشغيلية لميثاق السلامة"
                : "Operational Safety Commitments"}
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              01 – 06
            </span>
          </div>

          <div className="divide-y divide-border/60">
            {HSE_CHARTER.principles.map((principle, idx) => (
              <MotionFade
                key={principle.id}
                direction="up"
                delay={0.06 + idx * 0.03}
              >
                <div className="group -mx-2 grid grid-cols-1 gap-4 rounded-xl px-2 py-5 transition-colors duration-200 hover:bg-muted/20 sm:-mx-4 sm:gap-6 sm:px-4 sm:py-6 md:grid-cols-12">
                  <div className="flex items-center gap-3 md:col-span-3">
                    <span className="font-mono text-xl font-bold text-primary/70">
                      0{idx + 1}
                    </span>
                    {principle.standardCode && (
                      <span className="font-mono text-[11px] font-bold text-muted-foreground">
                        [{principle.standardCode}]
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-4">
                    <h4 className="text-sm font-bold text-foreground transition-colors group-hover:text-primary sm:text-base">
                      {t(principle.title)}
                    </h4>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {t(principle.description)}
                    </p>
                  </div>
                </div>
              </MotionFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
