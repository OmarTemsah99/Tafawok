/**
 * TAFAWOK Commercial Real Estate (CRE) Type Definitions
 */

export interface LocalizedString {
  en: string
  ar: string
}

export type Locale = "en" | "ar"

export interface PropertySpec {
  label: LocalizedString
  value: string
  unit?: LocalizedString
  iconName?: string
}

export interface StoreItem {
  id: string
  name: LocalizedString
  category: LocalizedString
  floor: LocalizedString
  unitNumber?: string
  status: "open" | "coming_soon" | "leased"
  description?: LocalizedString
  phone?: string
}

export interface Property {
  id: string
  slug: string
  name: LocalizedString
  tagline: LocalizedString
  category: LocalizedString
  description: LocalizedString
  fullOverview: LocalizedString
  mainImage: string
  gallery: string[]
  location: {
    address: LocalizedString
    city: LocalizedString
    country: LocalizedString
    coordinates: {
      lat: number
      lng: number
    }
    googleMapsEmbedUrl: string
    googleMapsDirectUrl: string
  }
  contact: {
    phone: string
    altPhone?: string
    email: string
    leasingOffice: LocalizedString
  }
  keyStats: {
    gla: string // Gross Leasable Area
    builtUpArea: string
    floors: string
    parkingCapacity: string
    occupancyRate: string
    zoning: LocalizedString
  }
  specs: PropertySpec[]
  highlights: LocalizedString[]
  stores: StoreItem[]
  amenities: LocalizedString[]
}

export interface OwnerContact {
  name: LocalizedString
  role: LocalizedString
  company: LocalizedString
  experience: LocalizedString
  phone: string
  altPhone: string
  email: string
  whatsapp: string
  headquarters: LocalizedString
  visionSnippet: LocalizedString
}

export interface NavItem {
  key: string
  href: string
  label: LocalizedString
  subItems?: {
    href: string
    label: LocalizedString
    description?: LocalizedString
  }[]
}

export interface CorporateMetric {
  value: number
  suffix: string
  label: LocalizedString
  description: LocalizedString
}

export interface ClientPartner {
  name: string
  category: "energy" | "epc" | "commercial" | "manufacturer"
  country: string
}
