import { HeroSection } from "@/components/home/HeroSection"
import { MetricsSection } from "@/components/home/MetricsSection"
import { ScrollExpandShowcase } from "@/components/home/ScrollExpandShowcase"
import { FeaturedProperties } from "@/components/home/FeaturedProperties"
import { CeoQuoteSection } from "@/components/home/CeoQuoteSection"
import { ParallaxScrollBands } from "@/components/motion/ParallaxScrollBands"
import { ClientMarquee } from "@/components/home/ClientMarquee"

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <MetricsSection />
      <ScrollExpandShowcase />
      <FeaturedProperties />
      <CeoQuoteSection />
      <ParallaxScrollBands />
      <ClientMarquee />
    </div>
  )
}
