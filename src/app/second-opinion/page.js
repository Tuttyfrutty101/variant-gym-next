import Footer from "@/components/Footer";
import SecondOpinionModal from "@/components/second-opinion/SecondOpinionModal";
import TrainerSessionLanding from "@/components/second-opinion/TrainerSessionLanding";

export const metadata = {
  title: { absolute: "Second Opinion Assessment: Strength & Movement Testing | Santa Barbara" },
  description:
    "Most people don't need another workout. They need answers. Our Second Opinion Assessment pairs a physical therapy consultation with functional movement and strength testing to uncover what's holding you back. Santa Barbara.",
};

export default function SecondOpinionPage() {
  return (
    <main className="homeMarketingDark siteBelowNav">
      <TrainerSessionLanding />
      <SecondOpinionModal />
      <Footer />
    </main>
  );
}
