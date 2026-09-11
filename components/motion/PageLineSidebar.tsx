"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { LineSidebar } from "@/components/motion/LineSidebar"

export interface PageLineSidebarItem {
  id: string
  label: string
}

export interface PageLineSidebarProps {
  items: PageLineSidebarItem[]
  title?: string
  className?: string
}

export function PageLineSidebar({
  items,
  title,
  className = "",
}: PageLineSidebarProps) {
  const { locale } = useLocaleStore()
  const isRtl = locale === "ar"
  const [activeSection, setActiveSection] = useState<number>(0)

  const isClickScrollingRef = useRef(false)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Track active section via viewport bounding area and scroll position
  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      ticking = false

      if (!items || items.length === 0) return
      if (isClickScrollingRef.current) return

      const scrollY = window.scrollY || document.documentElement.scrollTop
      const innerHeight = window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight
      const scrollBottom = scrollY + innerHeight
      const remainingScroll = scrollHeight - scrollBottom

      // 1. If at the very top of the page (within 60px)
      if (scrollY <= 60) {
        setActiveSection(0)
        return
      }

      // 2. If at or near the complete end of the page (within 60px)
      if (remainingScroll <= 60) {
        setActiveSection(items.length - 1)
        return
      }

      // Viewport focal line: where user attention sits (~35% down viewport)
      const focalLine = Math.min(innerHeight * 0.35, 280)

      // 3. Last section early-entry check:
      // If the last section is in view and cannot scroll further to reach focalLine, activate it
      const lastIndex = items.length - 1
      const lastEl = document.getElementById(items[lastIndex]?.id)
      if (lastEl) {
        const lastRect = lastEl.getBoundingClientRect()
        if (
          lastRect.top < innerHeight * 0.7 &&
          remainingScroll < Math.max(0, lastRect.top - focalLine)
        ) {
          setActiveSection(lastIndex)
          return
        }
      }

      // 4. Bounding area detection across all sections:
      // First check if any section's bounding area directly contains the focal line
      let matchedIndex = -1
      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id)
        if (!el) continue
        const rect = el.getBoundingClientRect()

        if (rect.top <= focalLine && rect.bottom > focalLine) {
          matchedIndex = i
          break
        }
      }

      // If between sections or in an untracked gap, find the most recently entered section
      if (matchedIndex === -1) {
        for (let i = items.length - 1; i >= 0; i--) {
          const el = document.getElementById(items[i].id)
          if (!el) continue
          const rect = el.getBoundingClientRect()
          if (rect.top <= focalLine) {
            matchedIndex = i
            break
          }
        }
      }

      if (matchedIndex !== -1) {
        setActiveSection(matchedIndex)
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateActiveSection)
      }
    }

    // Cancel click-scroll lock on manual user scroll interaction
    const onUserScroll = () => {
      if (isClickScrollingRef.current) {
        isClickScrollingRef.current = false
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    window.addEventListener("wheel", onUserScroll, { passive: true })
    window.addEventListener("touchmove", onUserScroll, { passive: true })

    // Initial check on mount
    updateActiveSection()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      window.removeEventListener("wheel", onUserScroll)
      window.removeEventListener("touchmove", onUserScroll)
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    }
  }, [items])

  const handleItemClick = useCallback(
    (index: number) => {
      setActiveSection(index)
      isClickScrollingRef.current = true
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false
      }, 1000)

      const target = items[index]
      if (!target) return
      const el = document.getElementById(target.id)
      if (el) {
        const rect = el.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const top = Math.max(0, rect.top + scrollTop - 75)
        window.scrollTo({ top, behavior: "smooth" })
      }
    },
    [items]
  )

  if (!items || items.length === 0) return null

  return (
    <aside
      aria-label={title || "Page Navigation"}
      className={`fixed inset-s-6 top-1/2 z-30 hidden -translate-y-1/2 select-none min-[1440px]:block 2xl:inset-s-10 ${className}`}
    >
      {title && (
        <div className="mb-2 px-1 font-mono text-[10px] font-bold text-muted-foreground uppercase">
          <span className={isRtl ? "" : "tracking-wider"}>{title}</span>
        </div>
      )}
      <LineSidebar
        items={items.map((i) => i.label)}
        activeItem={activeSection}
        onItemClick={handleItemClick}
      />
    </aside>
  )
}
