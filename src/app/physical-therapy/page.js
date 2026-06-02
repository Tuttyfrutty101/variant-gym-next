import Footer from "@/components/Footer";
import PhysicalTherapy from "@/components/physical-therapy/PhysicalTherapy";

export const metadata = {
  title: "Physical Therapy",
  description:
    "No wait times. Physical therapy included with membership at Variant Training Lab. Clinical rehab and prevention in Santa Barbara.",
};

export default function PhysicalTherapyPage() {
  return (
    <>
      <main className="homeMarketingDark siteBelowNav">
        <PhysicalTherapy />
        <Footer />
      </main>
    </>
  );
}
