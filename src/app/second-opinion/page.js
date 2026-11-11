import Footer from "@/components/Footer";
import SecondOpinionModal from "@/components/second-opinion/SecondOpinionModal";
import TrainerSessionLanding from "@/components/second-opinion/TrainerSessionLanding";

export const metadata = {
  title: { absolute: "Meet with a Trainer in Santa Barbara | Variant Training Lab" },
  description:
    "Meet with an expert trainer for 60 minutes in Santa Barbara. Find out if we're the right fit, and leave with a plan.",
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
