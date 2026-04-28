import ExclusiveAmenities from "@/components/ExclusiveAmenities";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Exclusive Amenities",
  description:
    "Member amenities and elevated details at Variant Training Lab in Santa Barbara.",
};

export default function ExclusiveAmenitiesPage() {
  return (
    <>
      <main className="siteBelowNav">
        <ExclusiveAmenities />
      </main>
      <Footer />
    </>
  );
}
