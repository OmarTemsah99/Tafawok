"use client"

import { ReactNode } from "react"

interface MarqueeProps {
  children: ReactNode
  className?: string
  trackClassName?: string
  duration?: number // duration in seconds
  pauseOnHover?: boolean
  mask?: boolean
}

export function Marquee({
  children,
  className = "",
  trackClassName = "",
  duration = 35,
  pauseOnHover = true,
  mask = true,
}: MarqueeProps) {
  return (
    <div
      dir="ltr"
      className={`relative w-full overflow-hidden ${
        mask
          ? "mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          : ""
      } ${className}`}
    >
      <div
        className={`animate-marquee flex items-center ${
          pauseOnHover ? "hover:paused" : ""
        } ${trackClassName}`}
        style={
          {
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center gap-6 pe-6">{children}</div>
        <div
          className="flex shrink-0 items-center gap-6 pe-6"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
