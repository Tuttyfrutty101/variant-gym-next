import Footer from "@/components/Footer";
import SimpleMarketingSection from "@/components/SimpleMarketingSection";
import styles from "@/components/SimpleMarketingSection.module.css";

export const metadata = {
  title: "Schedule",
  description:
    "Training hours and class schedule at Variant Training Lab, Santa Barbara.",
};

export default function SchedulePage() {
  return (
    <>
      <main className="siteBelowNav">
        <SimpleMarketingSection
          kicker="Plan Your Week"
          title="Schedule"
          primaryCta={{ label: "Get Started", href: "/contact" }}
          secondaryCta={{ label: "Membership", href: "/membership" }}
        >
          <p className={styles.body}>
            The floor is open for members according to tier and booking
            priority. Peak coaching hours are typically mornings and early
            evenings — we will confirm exact windows when you onboard.
          </p>
          <ul className={styles.list}>
            <li>Monday – Friday: early open through evening sessions</li>
            <li>Saturday: select morning blocks</li>
            <li>Sunday: recovery-focused hours by appointment</li>
          </ul>
          <p className={styles.body}>
            Class blocks and small-group sessions are updated seasonally. For
            the latest calendar or to hold a specific slot, contact the front
            desk or submit a request through our team.
          </p>
        </SimpleMarketingSection>
      </main>
      <Footer />
    </>
  );
}
