"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./Health.module.css";

const HERO_BG =
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1800&q=80";

const DETAIL_IMG =
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80";

export default function Health() {
  const [heroRef, heroVisible] = useInView();
  const [detailRef, detailVisible] = useInView();

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
          <h1 className={styles.heroMainTitle}>Health</h1>
          <p className={styles.heroSupport}>
            Personalized health and longevity plans built on our unique proprietary
            method designed to help you achieve your long-term wellness goals.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section
        ref={detailRef}
        className={`${styles.details} ${detailVisible ? styles.detailsVisible : ""}`}
        aria-labelledby="health-approach-heading"
      >
        <div className={styles.detailsGrid}>
          <div className={styles.detailsVisual}>
            <span className={styles.detailsFrame} aria-hidden />
            <div className={styles.detailsImageWrap}>
              <Image
                src={DETAIL_IMG}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 42vw"
                className={styles.detailsImage}
              />
            </div>
          </div>
          <div className={styles.detailsCopy}>
            <h2 id="health-approach-heading" className={styles.detailsHeading}>
              Longevity that fits your real life
            </h2>
            <p className={styles.detailsLead}>
              Assessments, habit change, and clinical insight roll into one roadmap—so
              training, recovery, and day-to-day health stay aligned instead of competing.
            </p>
            <ul className={styles.bullets}>
              <li>
                <strong>Whole-person baseline</strong> — We factor in lifestyle load,
                goals, and constraints before recommending changes you can sustain.
              </li>
              <li>
                <strong>One coordinated plan</strong> — Coaches and clinicians share
                context so your protocols aren&apos;t siloed or contradictory.
              </li>
              <li>
                <strong>Measured progress</strong> — Check-ins and adjustments keep the
                plan honest as seasons and priorities shift.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
