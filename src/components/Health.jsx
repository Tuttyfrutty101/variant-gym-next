"use client";

import Link from "next/link";
import {
  HEALTH_APPROACH_PILLARS,
  HEALTH_OWNERSHIP_BG,
} from "@/data/healthPageContent";
import { useInView } from "@/hooks/useInView";
import styles from "./Health.module.css";

const HERO_BG =
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1800&q=80";

function ApproachPillar({ pillar, index }) {
  const [ref, visible] = useInView({ threshold: 0.12 });

  return (
    <li
      ref={ref}
      className={`${styles.pillar} ${visible ? styles.pillarVisible : ""}`}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <span className={styles.pillarStep} aria-hidden>
        {pillar.step}
      </span>
      <h3 className={styles.pillarTitle}>{pillar.title}</h3>
      <p className={styles.pillarBody}>{pillar.body}</p>
    </li>
  );
}

export default function Health() {
  const [heroRef, heroVisible] = useInView();
  const [philosophyRef, philosophyVisible] = useInView();
  const [approachRef, approachVisible] = useInView();
  const [ownershipRef, ownershipVisible] = useInView();

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
          <h1 className={styles.heroMainTitle}>Health Built for the Long Game</h1>
          <p className={styles.heroSupport}>
            A proactive approach to strength, movement, recovery, and performance
            designed to help the body function better now and hold up for decades
            to come.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section
        ref={philosophyRef}
        className={`${styles.philosophy} ${philosophyVisible ? styles.blockVisible : ""}`}
        aria-labelledby="health-philosophy-heading"
      >
        <div className={styles.philosophyInner}>
          <h2 id="health-philosophy-heading" className={styles.sectionHeading}>
            Health Is More Than the Absence of Pain.
          </h2>
          <p className={styles.prose}>
            True health is the ability to continue doing what matters most with
            energy, confidence, strength, and independence.
          </p>
          <p className={styles.prose}>
            It is waking up without limitation. Traveling without hesitation.
            Staying active with family. Continuing to compete, perform, explore,
            and move freely through life.
          </p>
          <p className={styles.closingLines}>
            <span>The goal is not simply to add years.</span>
            <span>It is to preserve quality within them.</span>
          </p>
        </div>
      </section>

      <section
        ref={approachRef}
        className={`${styles.approach} ${approachVisible ? styles.blockVisible : ""}`}
        aria-labelledby="health-approach-heading"
      >
        <div className={styles.approachInner}>
          <header className={styles.approachHeader}>
            <p className={styles.eyebrow}>The Variant Approach</p>
            <h2 id="health-approach-heading" className={styles.sectionTitle}>
              An engineered approach to long-term performance
            </h2>
          </header>
          <ul className={styles.pillarGrid}>
            {HEALTH_APPROACH_PILLARS.map((pillar, i) => (
              <ApproachPillar key={pillar.step} pillar={pillar} index={i} />
            ))}
          </ul>
        </div>
      </section>

      <section
        ref={ownershipRef}
        className={`${styles.ownership} ${ownershipVisible ? styles.blockVisible : ""}`}
        aria-labelledby="health-ownership-heading"
      >
        <div
          className={styles.ownershipBg}
          style={{ backgroundImage: `url(${HEALTH_OWNERSHIP_BG})` }}
          aria-hidden
        />
        <div className={styles.ownershipOverlay} aria-hidden />
        <div className={styles.ownershipInner}>
          <h2 id="health-ownership-heading" className={styles.ownershipHeading}>
            Built for People Who Refuse to Age Passively.
          </h2>
          <p className={styles.ownershipBody}>
            Most people wait until pain, injury, or fatigue forces change.
            Variant exists for those who want to take ownership earlier —
            building a stronger, more resilient body before limitations appear.
          </p>
          <p className={styles.ownershipClosing}>
            <span>Because longevity is not passive.</span>
            <span>It is trained.</span>
          </p>
        </div>
      </section>
    </>
  );
}
