"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import styles from "./Athletes.module.css";

const HERO_BG =
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1800&q=80";

const DETAIL_IMG =
  "https://images.unsplash.com/photo-1517649763962-0c62306601b7?w=1200&q=80";

export default function Athletes() {
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
          <h1 className={styles.heroMainTitle}>Athletes</h1>
          <p className={styles.heroSupport}>
            Offering sport &amp; position-specific programs designed to reach
            one&apos;s highest potential. Supports injury prevention while
            enhancing performance tailored to individual goals.
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
        aria-labelledby="athletes-program-heading"
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
            <h2 id="athletes-program-heading" className={styles.detailsHeading}>
              Programming that respects your sport
            </h2>
            <p className={styles.detailsLead}>
              Competition schedules, travel, and load tolerance vary by athlete—we map
              volume and intensity to where you are in the season, not a generic block
              plan borrowed from another sport.
            </p>
            <ul className={styles.bullets}>
              <li>
                <strong>Sport- &amp; position-specific blocks</strong> — Sessions reflect
                the forces and patterns of your role so strength and conditioning carry
                over where it matters.
              </li>
              <li>
                <strong>Injury prevention in the workflow</strong> — Screening and
                prep work are baked into the week alongside performance targets—not an
                afterthought when something flares.
              </li>
              <li>
                <strong>Goals you own</strong> — Milestones, testing, and adjustments are
                tracked with your coaches so progress stays visible between competitions.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
