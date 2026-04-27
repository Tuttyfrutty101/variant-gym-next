import Footer from "@/components/Footer";
import Methodology from "@/components/Methodology";
import Services from "@/components/Services";

export const metadata = {
  title: "Training",
  description:
    "Performance training, classes, and concierge coaching at Variant Training Lab in Santa Barbara.",
};

export default function TrainingPage() {
  return (
    <>
      <main className="siteBelowNav">
        <Services />
        <Methodology />
      </main>
      <Footer />
    </>
  );
}
