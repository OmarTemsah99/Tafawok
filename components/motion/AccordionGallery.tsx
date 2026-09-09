"use client"

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
} from "react"
import Image from "next/image"
import { gsap } from "gsap"

export interface AccordionGalleryItem {
  image: string
  label?: string
  link?: string
  alt?: string
}

export interface AccordionGalleryProps {
  items?: AccordionGalleryItem[]
  defaultIndex?: number
  accentColor?: string
  overlayColor?: string
  textColor?: string
  height?: number
  gap?: number
  radius?: number
  expandRatio?: number
  orientation?: "horizontal" | "vertical"
  duration?: number
  ease?: string
  parallax?: number
  tilt?: number
  stagger?: number
  trigger?: "hover" | "click"
  showLabels?: boolean
  grayscale?: boolean
  className?: string
}

const DEFAULT_ITEMS: AccordionGalleryItem[] = [
  {
    image: "https://picsum.photos/id/1015/900/1200",
    label: "Canyon",
    link: "#",
  },
  {
    image: "https://picsum.photos/id/1018/900/1200",
    label: "Ridgeline",
    link: "#",
  },
  {
    image: "https://picsum.photos/id/1039/900/1200",
    label: "Falls",
    link: "#",
  },
  {
    image: "https://picsum.photos/id/1043/900/1200",
    label: "Harbour",
    link: "#",
  },
  {
    image: "https://picsum.photos/id/1044/900/1200",
    label: "Skyline",
    link: "#",
  },
]

export function AccordionGallery({
  items = DEFAULT_ITEMS,
  defaultIndex = 0,
  accentColor = "oklch(0.553 0.195 38.402)",
  overlayColor = "#08060a",
  textColor = "#ffffff",
  height = 460,
  gap = 12,
  radius = 20,
  expandRatio = 0.54,
  orientation = "horizontal",
  duration = 0.65,
  ease = "power3.out",
  parallax = 0.55,
  tilt = 6,
  stagger = 0.06,
  trigger = "hover",
  showLabels = true,
  grayscale = true,
  className = "",
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLElement | null)[]>([])
  const mediaRefs = useRef<(HTMLElement | null)[]>([])
  const barRefs = useRef<(HTMLElement | null)[]>([])
  const textRefs = useRef<(HTMLElement | null)[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const firstRunRef = useRef(true)
  const mediaSizeRef = useRef(320)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const vertical = orientation === "vertical"
  const effectiveVertical = vertical || isSmallScreen
  const count = items.length
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), count - 1)
  )

  useEffect(() => {
    const updateSize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const overlayBg = `linear-gradient(180deg, transparent 45%, color-mix(in srgb, ${overlayColor} 78%, transparent) 100%), color-mix(in srgb, ${overlayColor} calc(var(--ag-dim, 0.35) * 100%), transparent)`

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current
      if (!panels.length) return

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9)
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1
      const mediaSize = mediaSizeRef.current

      tlRef.current?.kill()
      const dur = animate ? duration : 0
      const tl = gsap.timeline()

      panels.forEach((panel, i) => {
        if (!panel) return
        const isActive = i === active
        const media = mediaRefs.current[i]
        const bar = barRefs.current[i]
        const text = textRefs.current[i]

        const rot = isActive ? 0 : i < active ? tilt : -tilt
        const rotProp = effectiveVertical ? { rotateX: -rot } : { rotateY: rot }

        tl.to(
          panel,
          { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease },
          0
        )

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i))
          const shift = drift * parallax * mediaSize * 0.06
          const gray = grayscale ? (isActive ? 0 : 1) : 0
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: effectiveVertical ? 0 : isActive ? 0 : shift,
              y: effectiveVertical ? (isActive ? 0 : shift) : 0,
              "--ag-gray": gray,
              "--ag-dim": isActive ? 0 : 0.35,
              duration: dur,
              ease,
            },
            0
          )
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to(
              [bar, text],
              { opacity: 1, x: 0, duration: dur, ease, stagger },
              0
            )
          } else {
            tl.to(
              [bar, text],
              { opacity: 0, x: -14, duration: dur * 0.6, ease },
              0
            )
          }
        }
      })

      tlRef.current = tl
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      effectiveVertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
    ]
  )

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const total = effectiveVertical ? rect.height : rect.width
      const usable = Math.max(total - gap * (count - 1), 120)
      const size = Math.max(
        140,
        usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22
      )
      mediaSizeRef.current = size
      el.style.setProperty("--ag-media-size", `${size}px`)
      applyLayout(!firstRunRef.current)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [applyLayout, gap, count, expandRatio, effectiveVertical])

  useEffect(() => {
    applyLayout(!firstRunRef.current)
    firstRunRef.current = false
  }, [applyLayout])

  useEffect(
    () => () => {
      tlRef.current?.kill()
    },
    []
  )

  const handleEnter = (i: number) => {
    if (trigger === "hover") setActive(i)
  }

  const handleClick = (i: number, e: MouseEvent) => {
    if (i !== active) {
      e.preventDefault()
      setActive(i)
    }
  }

  const handleKeyDown = (i: number, e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i + 1) % count)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i - 1 + count) % count)
    }
  }

  return (
    <div
      ref={rootRef}
      className={`flex ${effectiveVertical ? "flex-col" : "flex-row"} w-full max-w-full ${effectiveVertical ? "perspective-none" : "perspective-[1400px]"} ${className}`}
      style={{
        gap: `${gap}px`,
        height: effectiveVertical
          ? `${Math.max(540, Math.round(height * 1.3))}px`
          : `${height}px`,
      }}
      role="list"
      aria-label="Commercial Real Estate Portfolio Gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active
        const Tag = (item.link ? "a" : "div") as "a"
        return (
          <Tag
            key={i}
            ref={(el: HTMLElement | null) => {
              panelRefs.current[i] = el
            }}
            className={`cursor-target group relative block min-h-0 min-w-0 flex-[1_1_0] origin-center cursor-pointer overflow-hidden bg-card no-underline [box-shadow:0_10px_30px_-18px_rgba(0,0,0,0.6)] outline-none transform-3d focus-visible:[box-shadow:0_0_0_2px_var(--ag-accent),0_10px_30px_-18px_rgba(0,0,0,0.6)] ${
              effectiveVertical ? "min-h-20 transform-none!" : ""
            }`}
            style={
              {
                borderRadius: `${radius}px`,
                "--ag-accent": accentColor,
                willChange: "flex-grow, transform",
              } as CSSProperties
            }
            href={item.link || undefined}
            onClick={(e) => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
          >
            <span className="absolute inset-0 overflow-hidden rounded-[inherit]">
              <span
                ref={(el: HTMLElement | null) => {
                  mediaRefs.current[i] = el
                }}
                className="absolute top-1/2 left-1/2 filter-[grayscale(var(--ag-gray,1))]"
                style={{
                  width: effectiveVertical
                    ? "100%"
                    : "var(--ag-media-size, 320px)",
                  height: effectiveVertical
                    ? "var(--ag-media-size, 320px)"
                    : "100%",
                  willChange: "transform, filter",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.alt || item.label || ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  draggable={false}
                  className="block h-full w-full object-cover transition-transform duration-700 select-none [-webkit-user-drag:none] group-hover:scale-105"
                />
              </span>
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: overlayBg }}
                aria-hidden="true"
              />
            </span>
            {showLabels && (
              <span
                className="pointer-events-none absolute inset-x-5 bottom-5 z-10 flex items-center gap-3"
                aria-hidden="true"
              >
                <span
                  ref={(el: HTMLElement | null) => {
                    barRefs.current[i] = el
                  }}
                  className="h-7 w-[3.5px] flex-none rounded-full opacity-0"
                  style={{
                    background: accentColor,
                    boxShadow: `0 0 14px color-mix(in srgb, ${accentColor} 70%, transparent)`,
                  }}
                />
                <span
                  ref={(el: HTMLElement | null) => {
                    textRefs.current[i] = el
                  }}
                  className="overflow-hidden text-base font-bold tracking-tight text-ellipsis whitespace-nowrap opacity-0 [text-shadow:0_2px_14px_rgba(0,0,0,0.85)] sm:text-lg"
                  style={{ color: textColor }}
                >
                  {item.label}
                </span>
              </span>
            )}
          </Tag>
        )
      })}
    </div>
  )
}

export default AccordionGallery
