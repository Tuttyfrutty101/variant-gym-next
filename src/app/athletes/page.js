import Footer from "@/components/Footer";
import Testimonial from "@/components/Testimonial";

export const metadata = {
  title: "Athletes",
  description:
    "How Variant Training Lab supports dedicated athletes with data-driven coaching in Santa Barbara.",
};

export default function AthletesPage() {
  return (
    <>
      <main className="siteBelowNav">
        <Testimonial />
      </main>
      <Footer />
    </>
  );
}
