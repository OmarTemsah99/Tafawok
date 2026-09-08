"use client"

import { create } from "zustand"

interface UiState {
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
  toggleMobileNav: () => void

  selectedPropertyFilter: string
  setSelectedPropertyFilter: (filter: string) => void

  lightboxImage: string | null
  openLightbox: (imageUrl: string) => void
  closeLightbox: () => void
}

export const useUiStore = create<UiState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open: boolean) => set({ mobileNavOpen: open }),
  toggleMobileNav: () =>
    set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),

  selectedPropertyFilter: "all",
  setSelectedPropertyFilter: (filter: string) =>
    set({ selectedPropertyFilter: filter }),

  lightboxImage: null,
  openLightbox: (imageUrl: string) => set({ lightboxImage: imageUrl }),
  closeLightbox: () => set({ lightboxImage: null }),
}))
