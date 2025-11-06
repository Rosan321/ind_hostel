import AboutUs from "@/components/AboutUs";
import FeaturedProperties from "@/components/FeaturedProerties";
import HeroSection from "@/components/HeroSection";
import LocationExplorer from "@/components/LocationExplorer";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LocationExplorer />
      <FeaturedProperties />
      <AboutUs />
      <WhyChooseUs />
    </>
  );
}
