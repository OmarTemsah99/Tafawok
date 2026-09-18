import type { Metadata } from "next"
import { PROPERTIES } from "@/content/cre-data"
import { PropertiesDirectoryClient } from "@/components/properties/PropertiesDirectoryClient"

export const metadata: Metadata = {
  title: "Commercial Properties & Real Estate Developments",
  description:
    "Explore TAFAWOK's premier commercial real estate developments in Egypt — Fagala Plaza in Nasr City, Mall ChillOut in El Shorouk, and October Festival Mall on Gamal Abdel Nasser Axis in the Northern Expansions. Prime wholesale stationery plazas, destination retail malls, and brand showrooms.",
  keywords: [
    "Commercial Real Estate Egypt",
    "Fagala Plaza Nasr City",
    "فجالة بلازا مدينة نصر",
    "Mall ChillOut El Shorouk",
    "مول شل أوت الشروق",
    "October Festival Mall",
    "مول أكتوبر فيستيفال",
    "محور جمال عبد الناصر",
    "التوسعات الشمالية 6 أكتوبر",
    "Stationery Wholesale Egypt",
    "أدوات مكتبية ومدرسية جملة",
    "Seoudi Supermarket El Shorouk",
    "سعودي ماركت الشروق",
    "Z Arcade Egypt",
    "Commercial Leasing Cairo",
    "محلات تجارية للإيجار",
  ],
}

export default function PropertiesPage() {
  return <PropertiesDirectoryClient properties={PROPERTIES} />
}
