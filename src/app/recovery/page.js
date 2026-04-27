import Footer from "@/components/Footer";
import Recovery from "@/components/Recovery";

export const metadata = {
  title: "Recovery",
  description:
    "Recovery modalities, therapy integration, and restorative services at Variant Training Lab.",
};

export default function RecoveryPage() {
  return (
    <>
      <main className="siteBelowNav">
        <Recovery />
      </main>
      <Footer />
    </>
  );
}
