import Contact from "@/components/Contact";
import DigitalAccessSection from "@/components/DigitalAccessSection";
import ExploreCarousel from "@/components/ExploreCarousel";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import SpringPromo from "@/components/SpringPromo";
import TrainingOfferings from "@/components/TrainingOfferings";
import Testimonial from "@/components/Testimonial";
import {
  FALLBACK_HOMEPAGE_TESTIMONIAL,
  getHomepageTestimonials,
} from "@/lib/homepageTestimonial";
import { getSiteContent } from "@/lib/siteContent";

export const revalidate = 60;

export default async function Home() {
  const fromDb = await getHomepageTestimonials();
  const testimonials =
    fromDb && fromDb.length > 0 ? fromDb : [FALLBACK_HOMEPAGE_TESTIMONIAL];
  const site = await getSiteContent();

  return (
    <main className="homeMarketingDark">
      <Hero />
      <Philosophy />
      <TrainingOfferings />
      <DigitalAccessSection />
      <ExploreCarousel />
      {site.promotion.visible !== false ? (
        <SpringPromo promotion={site.promotion} />
      ) : null}
      <Testimonial testimonials={testimonials} />
      <Contact contactInfo={site.contact} hours={site.hours} />
      <Footer />
    </main>
  );
}
