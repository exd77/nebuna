import Categories from "@/components/sections/Categories";
import FAQSection from "@/components/sections/FAQSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import PromoBanner from "@/components/sections/PromoBanner";
import TrustSection from "@/components/sections/TrustSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <HowItWorks />
      <TrustSection />
      <FAQSection />
    </>
  );
}
