import Footer from "@/components/Footer";
import Athletes from "@/components/athletes/Athletes";

export const metadata = {
  title: "Athletes",
  description:
    "Sport- and position-specific training at Variant Training Lab — injury prevention, performance targets, and coaching aligned to your competitive calendar in Santa Barbara.",
};

export default function AthletesPage() {
  return (
    <>
      <main className="siteBelowNav">
        <Athletes />
      </main>
      <Footer />
    </>
  );
}
