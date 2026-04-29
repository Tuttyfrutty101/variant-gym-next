"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./Membership.module.css";

const HERO_BG =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80";

const ONBOARDING = [
  { title: "Baseline testing", detail: "1 hour" },
  { title: "Medical assessments", detail: "1 hour" },
  { title: "1:1 Introductory session", detail: "1 hour" },
];

const MONTHLY_BENEFITS = [
  { text: "Unlimited Open Training" },
  { text: "Unlimited Signature Classes" },
  { text: "Flexible Small Group Privates" },
  { text: "Work with a trainer up to 5x/week" },
  { text: "Physical Therapy" },
  {
    text: "Continuous Program Design",
    linkAfter: { label: "See programs", href: "/programs" },
  },
  { text: "Trainer Check-ins (1:1)" },
  { text: "Nutrition Guidance" },
  { text: "Unlimited Inbody Scans" },
  { text: "Mild Hyperbaric Oxygen Therapy" },
  {
    text: "Contrast Room (private cold plunge + infrared sauna)",
  },
  { text: "Red Light Therapy" },
];

export default function Membership() {
  const [heroRef, heroVisible] = useInView();
  const [onboardingRef, onboardingVisible] = useInView();
  const [monthlyRef, monthlyVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();

  return (
    <>
      <header
        ref={heroRef}
        className={`${styles.hero} ${heroVisible ? styles.heroVisible : ""}`}
      >
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url(${HERO_BG})` }}
          aria-hidden
        />
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroInner}>
          <h1 className={styles.heroMainTitle}>Membership with Benefits</h1>
          <p className={styles.heroSubheader}>Flexible time commitments</p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Join Variant
            </Link>
          </div>
        </div>
      </header>

      <section
        ref={onboardingRef}
        className={`${styles.onboarding} ${onboardingVisible ? styles.blockVisible : ""}`}
        aria-labelledby="onboarding-heading"
      >
        <div className={styles.onboardingInner}>
          <h2 id="onboarding-heading" className={styles.sectionTitle}>
            New member benefits when you join
          </h2>
          <ul className={styles.onboardingGrid}>
            {ONBOARDING.map((item) => (
              <li key={item.title} className={styles.onboardingCard}>
                <span className={styles.onboardingDuration}>{item.detail}</span>
                <span className={styles.onboardingLabel}>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        ref={monthlyRef}
        className={`${styles.monthly} ${monthlyVisible ? styles.blockVisible : ""}`}
        aria-labelledby="monthly-heading"
      >
        <div className={styles.monthlyInner}>
          <h2 id="monthly-heading" className={styles.monthlyTitle}>
            Join Variant today and unlock exclusive monthly member benefits:
          </h2>
          <ul className={styles.benefitsList}>
            {MONTHLY_BENEFITS.map((item) => (
              <li key={item.text} className={styles.benefitItem}>
                <span className={styles.check} aria-hidden>
                  ✓
                </span>
                <span className={styles.benefitText}>
                  {item.text}
                  {item.linkAfter ? (
                    <>
                      {" "}
                      <span className={styles.benefitInlineWrap}>
                        (
                        <Link
                          href={item.linkAfter.href}
                          className={styles.inlineLink}
                        >
                          {item.linkAfter.label}
                        </Link>
                        )
                      </span>
                    </>
                  ) : null}
                </span>
              </li>
            ))}
            <li className={styles.benefitItem}>
              <span className={styles.check} aria-hidden>
                ✓
              </span>
              <span className={`${styles.benefitText} ${styles.more}`}>+ more</span>
            </li>
          </ul>
        </div>
      </section>

      <section
        ref={ctaRef}
        className={`${styles.ctaBand} ${ctaVisible ? styles.blockVisible : ""}`}
        aria-labelledby="membership-cta-heading"
      >
        <div className={styles.ctaBandInner}>
          <h2 id="membership-cta-heading" className={styles.ctaBandTitle}>
            Join Variant today
          </h2>
          <Link href="/contact" className={styles.ctaBandButton}>
            Get started
          </Link>
        </div>
      </section>
    </>
  );
}
