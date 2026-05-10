import Footer from "@/components/Footer";
import ScheduleBooking from "@/components/ScheduleBooking";

export const metadata = {
  title: "Consultation",
  description:
    "Book a consultation at Variant Training Lab — reserve a time through our online scheduler for non-members in Santa Barbara.",
};

export default function ConsultationPage() {
  return (
    <>
      <main className="siteBelowNav">
        <ScheduleBooking />
      </main>
      <Footer />
    </>
  );
}
