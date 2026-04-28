import Footer from "@/components/Footer";
import Methodology from "@/components/Methodology";
import TrainingFormatsShowcase from "@/components/training/TrainingFormatsShowcase";
import TrainingPageHero from "@/components/training/TrainingPageHero";

export const metadata = {
  title: "Training",
  description:
    "Personal training, signature classes, small group privates, and open training at Variant Training Lab in Santa Barbara.",
};

export default function TrainingPage() {
  return (
    <>
      <main className="siteBelowNav">
        <TrainingPageHero />
        <TrainingFormatsShowcase />
        <Methodology />
      </main>
      <Footer />
    </>
  );
}
