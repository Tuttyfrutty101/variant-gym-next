import Footer from "@/components/Footer";
import Programs from "@/components/programs/Programs";

export const metadata = {
  title: "Programs",
  description:
    "Program library at Variant Training Lab—longevity, strength, rehab, sport-specific pathways, and more.",
};

export default function ProgramsPage() {
  return (
    <>
      <main className="siteBelowNav">
        <Programs />
      </main>
      <Footer />
    </>
  );
}
