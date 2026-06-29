import type { Metadata } from "next";
import {
  getCategoriesWithCounts,
  getBestSellers,
} from "@/lib/catalog/catalog.repository";
import { buildMetadata, itemListJsonLd } from "@/lib/seo/seo";
import { JsonLd } from "@/components/common/JsonLd";
import { HomeHero } from "@/components/home/HomeHero";
import { BrandStrip } from "@/components/home/BrandStrip";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { BestSellers } from "@/components/home/BestSellers";
import { WhyTradesika } from "@/components/home/WhyTradesika";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { HomeTechInfo } from "@/components/home/HomeTechInfo";
import { HomeContactCTA } from "@/components/home/HomeContactCTA";

export const metadata: Metadata = buildMetadata({
  title: "Inicio",
  path: "/",
  description:
    "Tradesika, distribuidor autorizado Sika en Ecuador. Impermeabilizantes, selladores, morteros, aditivos y pisos industriales con asesoría técnica en Guayaquil. Al por menor y por mayor.",
  keywords: ["productos Sika Ecuador", "impermeabilizante Guayaquil", "Sikaflex Ecuador"],
});

export default async function HomePage() {
  const [categories, bestSellers] = await Promise.all([
    getCategoriesWithCounts(),
    getBestSellers(6),
  ]);

  return (
    <>
      <JsonLd data={itemListJsonLd(bestSellers, "/")} />
      <HomeHero />
      <BrandStrip />
      <SolutionsGrid categories={categories} />
      <BestSellers products={bestSellers} />
      <WhyTradesika />
      <AboutTeaser />
      <HomeTechInfo />
      <HomeContactCTA />
    </>
  );
}
