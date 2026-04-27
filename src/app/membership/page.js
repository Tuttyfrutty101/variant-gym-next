import Footer from "@/components/Footer";
import SimpleMarketingSection from "@/components/SimpleMarketingSection";
import styles from "@/components/SimpleMarketingSection.module.css";

export const metadata = {
  title: "Membership",
  description:
    "Membership at Variant Training Lab — concierge onboarding, training, and recovery in Santa Barbara.",
};

export default function MembershipPage() {
  return (
    <>
      <main className="siteBelowNav">
        <SimpleMarketingSection
          kicker="Join the Lab"
          title="Membership"
          primaryCta={{ label: "Apply Now", href: "/contact" }}
          secondaryCta={{ label: "View Schedule", href: "/schedule" }}
        >
          <p className={styles.body}>
            Every membership begins with a comprehensive onboarding alongside
            our Lab Technicians and Physical Therapy team. We build a program
            around your goals, schedule, and baseline assessment — then refine
            it continuously as you progress.
          </p>
          <p className={styles.body}>
            Full access includes performance training floor time, recovery
            modalities, and ongoing collaboration with your coaching team.
            For details on tiers, corporate options, and family add-ons, reach
            out and we will walk you through what fits best.
          </p>
        </SimpleMarketingSection>
      </main>
      <Footer />
    </>
  );
}
