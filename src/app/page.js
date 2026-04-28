import Contact from "@/components/Contact";
import ExploreCarousel from "@/components/ExploreCarousel";
import ExclusiveAccessBand from "@/components/ExclusiveAccessBand";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import SpringPromo from "@/components/SpringPromo";
import TrainingOfferings from "@/components/TrainingOfferings";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <TrainingOfferings />
      <ExclusiveAccessBand />
      <ExploreCarousel />
      <SpringPromo />
      <Testimonial />
      <Contact />
      <Footer />
    </>
  );
}
