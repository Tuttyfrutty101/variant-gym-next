import Footer from "@/components/Footer";
import Methodology from "@/components/Methodology";
import SecondOpinionHero from "@/components/second-opinion/SecondOpinionHero";
import TrainingJoinCta from "@/components/training/TrainingJoinCta";

export const metadata = {
  title: "Second Opinion",
  description:
    "Most people don't need another workout — they need answers. At Variant Training Lab in Santa Barbara, our Test Treat Train system uncovers what's holding you back.",
};

export default function SecondOpinionPage() {
  return (
    <main className="homeMarketingDark siteBelowNav">
      <SecondOpinionHero />
      <Methodology />
      <TrainingJoinCta />
      <Footer />
    </main>
  );
}
