"use client"

import { useLocaleStore } from "@/stores/useLocaleStore"
import { CORPORATE_METRICS, UI_DICTIONARY } from "@/content/cre-data"
import { CounterTicker } from "@/components/motion/CounterTicker"
import { MotionFade } from "@/components/motion/MotionFade"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Briefcase, Building, Users } from "lucide-react"

export function MetricsSection() {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const getMetricIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Award className="size-5 text-primary" />
      case 1:
        return <Briefcase className="size-5 text-primary" />
      case 2:
        return <Building className="size-5 text-primary" />
      case 3:
      default:
        return <Users className="size-5 text-primary" />
    }
  }

  return (
    <section className="relative border-b border-border/70 bg-card py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionFade
          delay={0.05}
          direction="up"
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="outline" className="mb-2 uppercase tracking-widest text-primary border-primary/30">
            {isRtl ? "سجل إنجاز موثوق" : "Track Record & Scale"}
          </Badge>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t(UI_DICTIONARY.home.metricsTitle)}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            {t(UI_DICTIONARY.home.metricsSubtitle)}
          </p>
        </MotionFade>

        {/* 4-Metric Grid with Standardized shadcn Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORPORATE_METRICS.map((metric, index) => (
            <MotionFade
              key={index}
              delay={0.1 + index * 0.08}
              direction="up"
              className="flex"
            >
              <Card className="cursor-target architectural-card flex w-full flex-col justify-between border-border/80 bg-background/70 shadow-sm transition-all duration-200 hover:border-primary/60 hover:bg-background hover:shadow-lg hover:shadow-primary/5">
                <CardHeader className="pb-2">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10">
                    {getMetricIcon(index)}
                  </div>
                  <div className="flex items-baseline gap-1 text-3xl font-black tracking-tight sm:text-4xl text-bronze-gradient">
                    <CounterTicker
                      value={metric.value}
                      suffix={metric.suffix}
                      suffixClassName="font-bold text-2xl sm:text-3xl text-primary"
                    />
                  </div>
                  <CardTitle className="mt-2 text-base font-bold text-foreground">
                    {t(metric.label)}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                    {t(metric.description)}
                  </CardDescription>
                </CardContent>

                <CardFooter className="border-t border-border/40 bg-muted/20 py-2.5 text-[11px] font-mono text-muted-foreground">
                  <span>METRIC // 0{index + 1}</span>
                </CardFooter>
              </Card>
            </MotionFade>
          ))}
        </div>
      </div>
    </section>
  )
}
