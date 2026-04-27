import About from "@/components/About";
import Footer from "@/components/Footer";
import Philosophy from "@/components/Philosophy";

export const metadata = {
  title: "Health",
  description:
    "Integrated health, prevention, and longevity-focused services at Variant Training Lab.",
};

export default function HealthPage() {
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
