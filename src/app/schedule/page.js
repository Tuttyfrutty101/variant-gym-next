import Footer from "@/components/Footer";
import ScheduleBooking from "@/components/ScheduleBooking";

export const metadata = {
  title: "Schedule",
  description:
    "Book a consultation at Variant Training Lab — reserve a time through our online scheduler for non-members in Santa Barbara.",
};

export default function SchedulePage() {
  return (
    <>
      <main className="siteBelowNav">
        <ScheduleBooking />
      </main>
      <Footer />
    </>
  );
}
