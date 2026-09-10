import type { Metadata } from "next"
import { AboutUsClient } from "@/components/about/AboutUsClient"

export const metadata: Metadata = {
  title:
    "About TAFAWOK | 25+ Years Corporate Heritage & Engineering Leadership",
  description:
    "Discover the corporate heritage of TAFAWOK Real Estate Investment & Contracting. Rooted in 5 decades of Gulf megaproject execution, we develop premier commercial offices, retail hubs, and logistics parks with strict Zero-Harm HSE compliance.",
  keywords: [
    "TAFAWOK Real Estate Investment",
    "About TAFAWOK",
    "Commercial Real Estate Developer Egypt",
    "Eng Tarek Ahmed",
    "Gulf Construction Heritage",
    "Zero Harm HSE Policy",
    "New Cairo Commercial Developer",
    "شركة تفوق للاستثمار العقاري والمقاولات",
    "تاريخ شركة تفوق",
    "م طارق أحمد",
  ],
  openGraph: {
    title: "About TAFAWOK | Corporate Heritage & CRE Excellence",
    description:
      "Backed by 25+ years of multidisciplinary execution and five decades of regional Gulf heritage, TAFAWOK develops enduring commercial assets in Egypt.",
    type: "website",
    url: "https://tafawok.co/about",
  },
}

export default function AboutPage() {
  return <AboutUsClient />
}
