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
import { FaqSection } from "@/components/home/FaqSection";
import { HomeContactCTA } from "@/components/home/HomeContactCTA";

export const metadata: Metadata = buildMetadata({
  title: "Inicio",
  path: "/",
  description:
    "¿Buscas dónde comprar productos Sika en Guayaquil? Tradesika es distribuidor autorizado Sika en Ecuador: impermeabilizantes, selladores, morteros, aditivos y pisos industriales, al por menor y por mayor, con asesoría técnica.",
  keywords: [
    "productos Sika Ecuador",
    "impermeabilizante Guayaquil",
    "Sikaflex Ecuador",
    "comprar productos Sika Guayaquil",
  ],
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
      <FaqSection categoryNames={categories.map((c) => c.name)} />
      <HomeContactCTA />
    </>
  );
}
