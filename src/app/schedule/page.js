import ClassSchedule from "@/components/ClassSchedule";
import Footer from "@/components/Footer";
import { getClassSchedule } from "@/lib/siteContent";

export const metadata = {
  title: "Schedule",
  description:
    "View Variant Training Lab class offerings by day. Times and class names updated regularly.",
};

export const revalidate = 60;

export default async function SchedulePage() {
  const days = await getClassSchedule();

  return (
    <>
      <main className="homeMarketingDark siteBelowNav">
        <ClassSchedule days={days} />
        <Footer />
      </main>
    </>
  );
}
