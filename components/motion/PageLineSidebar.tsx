"use client"

import React, { useState, useEffect, useCallback } from "react"
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

  // Track active section via scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          const top = rect.top + window.scrollY
          if (top <= scrollPosition) {
            setActiveSection(i)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  const handleItemClick = useCallback(
    (index: number) => {
      setActiveSection(index)
      const target = items[index]
      if (!target) return
      const el = document.getElementById(target.id)
      if (el) {
        const rect = el.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const top = rect.top + scrollTop - 75
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
