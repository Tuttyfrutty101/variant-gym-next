import Footer from "@/components/Footer";
import Health from "@/components/Health";

export const metadata = {
  title: "Health",
  description:
    "Personalized longevity plans at Variant Training Lab — coordinated assessments, proprietary methodology, and integrated care in Santa Barbara.",
};

export default function HealthPage() {
  return (
    <>
      <main className="siteBelowNav">
        <Health />
      </main>
      <Footer />
    </>
  );
}
