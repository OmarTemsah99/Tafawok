"use client"

import * as React from "react"
import Link from "next/link"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  iconOnly?: boolean
  onClick?: () => void
}

/**
 * Architectural Emblem SVG for TAFAWOK CRE
 * Vector geometry representing structural precision, isometric towers, and foundation stones.
 */
export function TafawokEmblem({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="72 31 456.9 454.9"
      className={cn(
        "h-9 w-9 transition-transform duration-200 group-hover:scale-105",
        className
      )}
      fill="currentColor"
      aria-hidden="true"
    >
      <g
        transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path d="M2620 5315 l-375 -375 253 -253 252 -252 -128 -128 -128 -127 -255 249 -256 250 -124 -125 -124 -124 375 -375 c206 -206 378 -374 382 -373 3 2 291 286 638 632 l633 628 -374 374 c-206 206 -378 374 -384 374 -6 0 -179 -169 -385 -375z m516 -499 c-69 -69 -130 -126 -134 -126 -4 0 -63 56 -132 125 l-125 125 130 130 130 130 129 -129 129 -129 -127 -126z" />
        <path d="M3642 4307 c-204 -204 -372 -377 -372 -382 0 -6 54 -64 120 -130 l120 -120 380 380 380 380 -122 122 c-68 68 -125 123 -128 123 -3 0 -173 -168 -378 -373z" />
        <path d="M1097 3792 l-377 -377 123 -123 122 -122 378 378 377 377 -123 123 -122 122 -378 -378z" />
        <path d="M4410 4045 l-125 -125 253 -253 252 -252 -130 -130 -130 -130 -253 252 -252 251 -380 -374 -380 -374 252 -252 253 -253 -385 -385 -385 -385 -130 130 -130 130 250 250 c137 138 250 255 250 260 0 6 -73 82 -162 170 -90 88 -259 254 -376 370 l-212 210 -253 -253 -252 -252 -128 128 -128 129 250 254 250 254 -122 123 -122 122 -377 -377 -378 -378 882 -882 c486 -486 886 -882 889 -881 4 2 520 514 1147 1138 l1141 1136 -377 377 -377 377 -125 -125z m-257 -1013 l127 -127 -128 -128 -127 -127 -130 130 -130 130 125 125 c69 69 127 125 130 125 3 0 63 -57 133 -128z m-1528 -757 c-71 -68 -132 -124 -135 -125 -3 0 -61 56 -130 125 l-125 125 130 130 130 130 130 -130 130 -131 -130 -124z" />
        <path d="M2877 3542 l-128 -128 127 -123 126 -124 127 127 126 126 -125 125 -125 125 -128 -128z" />
      </g>
    </svg>
  )
}

/**
 * Enterprise Brand Logo for TAFAWOK CRE
 * Features architectural mark and high-contrast bilingual typography.
 */
export function Logo({ className, iconOnly = false, onClick }: LogoProps) {
  const { locale } = useLocaleStore()
  const isArabic = locale === "ar"

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "group -m-1 inline-flex items-center gap-3 rounded-md p-1 transition-opacity outline-none select-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
      aria-label="TAFAWOK Real Estate Investment & Contracting - Home"
    >
      {/* Brand Icon Emblem */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/15">
        <TafawokEmblem className="h-6 w-6 text-primary" />
      </div>

      {/* Brand Typography */}
      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className="text-lg font-extrabold tracking-wider text-foreground uppercase transition-colors group-hover:text-primary lg:text-xl">
              {isArabic ? "تَفَـوُّق" : "TAFAWOK"}
            </span>
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-widest text-primary uppercase">
              CRE
            </span>
          </div>
          <span className="mt-0.5 text-[10px] font-medium tracking-tight whitespace-nowrap text-muted-foreground sm:text-[11px]">
            {isArabic
              ? "للاستثمار العقاري والمقاولات"
              : "Real Estate & Contracting Co."}
          </span>
        </div>
      )}
    </Link>
  )
}
