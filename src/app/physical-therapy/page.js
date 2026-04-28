import About from "@/components/About";
import Footer from "@/components/Footer";
import Philosophy from "@/components/Philosophy";

export const metadata = {
  title: "Physical Therapy",
  description:
    "Expert physical therapy and integrated clinical care at Variant Training Lab in Santa Barbara.",
};

export default function PhysicalTherapyPage() {
  return (
    <>
      <main className="siteBelowNav">
        <Philosophy />
        <About />
      </main>
      <Footer />
    </>
  );
}
