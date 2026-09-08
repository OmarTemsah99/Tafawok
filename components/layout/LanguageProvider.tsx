"use client"

import React, { useEffect } from "react"
import { useLocaleStore, initLocaleFromStorage } from "@/stores/useLocaleStore"

interface LanguageProviderProps {
  children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const locale = useLocaleStore((state) => state.locale)

  useEffect(() => {
    initLocaleFromStorage()
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
    }
  }, [locale])

  return <>{children}</>
}
