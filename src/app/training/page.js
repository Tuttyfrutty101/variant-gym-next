import Footer from "@/components/Footer";
import Methodology from "@/components/Methodology";
import TrainingFormatsShowcase from "@/components/training/TrainingFormatsShowcase";
import TrainingJoinCta from "@/components/training/TrainingJoinCta";
import TrainingPageHero from "@/components/training/TrainingPageHero";
import TrainingWelcomeWeek from "@/components/training/TrainingWelcomeWeek";

export const metadata = {
  title: "Training",
  description:
    "Personal training, signature classes, small group privates, and open training at Variant Training Lab in Santa Barbara.",
};

export default function TrainingPage() {
  return (
    <main className="homeMarketingDark siteBelowNav">
      <TrainingPageHero />
      <TrainingFormatsShowcase />
      <Methodology />
      <TrainingWelcomeWeek />
      <TrainingJoinCta />
      <Footer />
    </main>
  );
}
