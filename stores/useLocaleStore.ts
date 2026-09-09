"use client"

import { createContext, useContext } from "react"
import { createStore, useStore, type StoreApi } from "zustand"
import { Locale, LocalizedString } from "@/types/cre"
import en from "@/locales/en.json"
import ar from "@/locales/ar.json"

export type LocaleMessages = typeof en

export const dictionaries: Record<Locale, LocaleMessages> = { en, ar }

function lookupDictionary(
  dict: Record<string, unknown>,
  path: string
): string | undefined {
  const parts = path.split(".")
  let current: unknown = dict
  for (const part of parts) {
    if (
      current &&
      typeof current === "object" &&
      part in (current as Record<string, unknown>)
    ) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return undefined
    }
  }
  return typeof current === "string" ? current : undefined
}

export interface LocaleState {
  locale: Locale
  messages: LocaleMessages
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (input: LocalizedString | string | undefined) => string
}

export type LocaleStore = StoreApi<LocaleState>

export const STORAGE_KEY = "tafawok_locale"

export function updateDocumentAttributes(locale: Locale) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
  }
}

export function writeLocaleCookie(locale: Locale) {
  if (typeof document !== "undefined") {
    document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=31536000; SameSite=Lax`
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // Ignore storage write errors in restricted environments
    }
    updateDocumentAttributes(locale)
  }
}

export const createLocaleStore = (initialLocale: Locale = "ar") => {
  return createStore<LocaleState>()((set, get) => ({
    locale: initialLocale,
    messages: dictionaries[initialLocale] || ar,

    setLocale: (locale: Locale) => {
      writeLocaleCookie(locale)
      set({ locale, messages: dictionaries[locale] || ar })
    },

    toggleLocale: () => {
      const nextLocale: Locale = get().locale === "ar" ? "en" : "ar"
      get().setLocale(nextLocale)
    },

    t: (input: LocalizedString | string | undefined): string => {
      if (!input) return ""
      const currentLocale = get().locale

      // Object with { en, ar }
      if (typeof input === "object") {
        return input[currentLocale] || input.en || ""
      }

      // Dot-notation key in JSON dictionaries
      const dict = (dictionaries[currentLocale] ||
        dictionaries.en) as unknown as Record<string, unknown>
      const found = lookupDictionary(dict, input)
      if (found !== undefined) return found

      // Fallback to English dictionary
      const fallback = lookupDictionary(
        dictionaries.en as unknown as Record<string, unknown>,
        input
      )
      if (fallback !== undefined) return fallback

      return input
    },
  }))
}

export const LocaleContext = createContext<LocaleStore | null>(null)

// Fallback store for usage outside of LocaleContext or in tests/utilities
const fallbackStore = createLocaleStore("ar")

export function useLocaleStore(): LocaleState
export function useLocaleStore<T>(selector: (state: LocaleState) => T): T
export function useLocaleStore<T>(
  selector?: (state: LocaleState) => T
): T | LocaleState {
  const contextStore = useContext(LocaleContext)
  const store = contextStore ?? fallbackStore
  return useStore(store, selector ?? ((s) => s as unknown as T))
}

useLocaleStore.getState = () => fallbackStore.getState()
useLocaleStore.setState = (partial: Partial<LocaleState>) =>
  fallbackStore.setState(partial)
