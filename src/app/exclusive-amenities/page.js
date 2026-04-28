import ExclusiveAmenities from "@/components/ExclusiveAmenities";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Exclusive Amenities",
  description:
    "Premium locker rooms, cold plunge, infrared sauna, red light therapy, hyperbaric oxygen, and more — included with membership at Variant Training Lab.",
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
