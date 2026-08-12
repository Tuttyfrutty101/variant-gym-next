import Footer from "@/components/Footer";
import SecondOpinionAssessment from "@/components/second-opinion/SecondOpinionAssessment";
import SecondOpinionModal from "@/components/second-opinion/SecondOpinionModal";
import SecondOpinionHero from "@/components/second-opinion/SecondOpinionHero";
import SecondOpinionVsOnboarding from "@/components/second-opinion/SecondOpinionVsOnboarding";
import TrainingJoinCta from "@/components/training/TrainingJoinCta";

export const metadata = {
  title: { absolute: "Second Opinion Assessment: Strength & Movement Testing | Santa Barbara" },
  description:
    "Most people don't need another workout. They need answers. Our Second Opinion Assessment pairs a physical therapy consultation with functional movement and strength testing to uncover what's holding you back. Santa Barbara.",
};

export default function SecondOpinionPage() {
  return (
    <main className="homeMarketingDark siteBelowNav">
      <SecondOpinionHero />
      <SecondOpinionAssessment />
      <SecondOpinionVsOnboarding />
      <TrainingJoinCta />
      <SecondOpinionModal />
      <Footer />
    </main>
  );
}
